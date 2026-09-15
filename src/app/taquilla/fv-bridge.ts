// Puente postMessage con el iframe OFICIAL de Fourvenues, en JavaScript plano e
// INLINE en el HTML del servidor (15-sep-2026, rendimiento en móvil y fallos de
// checkout en PC y móvil).
//
// Por qué inline y no en un useEffect: el iframe sale con su src ya en el HTML,
// así que Fourvenues puede hablar ANTES de que la página hidrate (en el
// navegador de Instagram el JS tarda). Un listener de React perdería mensajes
// (el primer addHeight → marco cortado; una pregunta sin respuesta → checkout
// colgado). El script va antes del <iframe> en el documento: el listener existe
// antes de que el marco pueda enviar nada, y funciona aunque el JS de la página
// no llegue a cargar. La CSP del sitio ya permite scripts inline.
//
// PARIDAD con el cargador oficial https://www.fourvenues.com/assets/iframe/
// outxide-club/events (processChildMessage, releído el 15-sep-2026). El puente
// anterior solo cubría una parte y el checkout se colgaba en el último paso con
// los precios difuminados. Hijo → padre:
//   addHeight        → altura total del contenido (el marco crece, sin scroll interno)
//   forwardScroll    → la rueda del ratón sobre el marco desplaza la PÁGINA (deltaY)
//   toTop            → al cambiar de paso, volver al inicio del marco
//   getQueryParam    → pide un parámetro de la URL del padre y ESPERA la respuesta
//                      resultQueryParam {paramKey, value | false}
//   setQueryParams   → escribe {key, value} en la URL del padre (replaceState)
//   3d-viewer-enter/leave → bloquea/libera el scroll de la página (plano 3D)
//   openUrl          → navegación a nivel de ventana (así sale la Thank You Page)
//   currentUrl / currentUrlCli → URL del padre (objeto / string JSON legacy)
//   getFBC/getFBP/getTTP/getTTCLID → cookies de atribución (_fbc real o
//                      sintetizado del fbclid, formato oficial de Meta)
//   getCampaignsTracking / getTrackeableLinksTracking → almacenes propios de FV
//   setCookie        → guest-token de sesión de compra (cookie funcional, exenta)
//   navigate         → el cargador lo usa para deep-link por #hash; aquí el evento
//                      llega por ?event, así que no se toca la URL
//   track            → NO se reenvía: el Purchase se mide en /gracias (una sola
//                      fuente, sin duplicados)
// Además, los pasos servidos por web.fourvenues.com (entradas, cantidad,
// datos) miden la altura con la librería "seamless": mensajes en TEXTO JSON
// {type, data, callback}. El hijo repite seamless_ready cada 200 ms hasta que
// el padre contesta seamless_connect {id}; después manda seamless_update
// {height} y NO manda la siguiente altura hasta que el padre acusa recibo
// respondiendo al callback. Sin esto el marco se quedaba clavado en 710 px en
// el formulario de datos (visto el 15-sep-2026).
//
// Sin barras invertidas en el código del script: dentro de un template literal
// se comerían los escapes (por eso nada de \w ni de /^https:\/\//).

export const FV_IFRAME_ID = "fv-taquilla";

// Script que va justo DESPUÉS del <iframe>: le asigna el src en cuanto el marco
// está en su sitio definitivo. Next transmite el cuerpo de la página dentro de
// un trozo oculto (<div hidden id="S:0">) que un script de React mueve a su
// posición al terminar de leerlo ($RC). Mover un iframe con src ya asignado lo
// recarga: la primera petición a Fourvenues se abortaba y se repetía (visto el
// 15-sep-2026 instrumentando el DOM). Con data-src y esta espera hay UNA sola
// petición, lanzada en la microtarea siguiente a la colocación del marco.
// React revela el trozo en un rAF/timeout (hasta ~300 ms, más en CPU lenta):
// NUNCA se asigna el src mientras el marco siga dentro de un [hidden] — un
// fallback por DOMContentLoaded lo hacía y en CPU x6 (perfil Instagram) daba
// 5 de 6 cargas dobles (revisión de código, 15-sep-2026). Red de seguridad:
// sondeo cada 250 ms durante 10 s por si el observador no viera el cambio.
export const FV_IFRAME_SRC_SCRIPT = `(function () {
  var f = document.getElementById("${FV_IFRAME_ID}");
  if (!f || f.getAttribute("src")) return;
  var url = f.getAttribute("data-src");
  if (!url) return;
  var done = false;
  function parked() { return !!(f.closest && f.closest("[hidden]")); }
  function go() {
    if (done || parked()) return false;
    done = true;
    f.setAttribute("src", url);
    return true;
  }
  if (go()) return;
  var mo = new MutationObserver(function () { if (go()) { mo.disconnect(); clearInterval(timer); } });
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
  var tries = 0;
  var timer = setInterval(function () {
    if (go() || ++tries > 40) { clearInterval(timer); mo.disconnect(); }
  }, 250);
})();`;

// ORIGEN: cualquier subdominio https de fourvenues.com. El checkout cambia de
// host A MITAD de compra (site.fourvenues.com → web.fourvenues.com al elegir
// entrada, visto en producción el 15-sep-2026): con la lista cerrada anterior
// (www + site) todo mensaje del último paso se descartaba.
export const FV_BRIDGE_SCRIPT = `(function () {
  if (window.__fvBridge) return;
  window.__fvBridge = 1;
  var FV_SUFFIX = ".fourvenues.com";
  function isFourvenues(origin) {
    if (typeof origin !== "string" || origin.indexOf("https://") !== 0) return false;
    var host = origin.slice(8);
    return host === "fourvenues.com" ||
      (host.length > FV_SUFFIX.length && host.slice(-FV_SUFFIX.length) === FV_SUFFIX);
  }
  var NAV_OFFSET = 100;
  var lockedY = 0;
  var seamlessId = null;
  function frame() { return document.getElementById("${FV_IFRAME_ID}"); }
  function setHeight(px) {
    var f = frame();
    if (f && isFinite(px) && px > 200 && px < 60000) f.style.height = px + "px";
  }
  // Solo mensajes de NUESTRO marco (o de marcos anidados en él): una ventana
  // cualquiera de fourvenues.com con referencia a esta pestaña no puede
  // redirigirla ni escribir cookies (revisión SecOps, 15-sep-2026). El
  // WindowProxy del iframe es estable aunque el marco cambie de host.
  // También se acepta un popup abierto por el hijo (3DS, PayPal, Bizum…) que
  // hable directamente con esta pestaña: se sube por opener (propiedad
  // accesible entre orígenes) hasta 3 saltos.
  function fromOurFrame(src) {
    var f = frame();
    if (!f || !src) return false;
    try {
      var w = src;
      for (var hop = 0; hop < 3 && w; hop++) {
        var x = w;
        for (var i = 0; i < 8; i++) {
          if (x === f.contentWindow) return true;
          if (x === x.parent) break;
          x = x.parent;
        }
        w = x.opener;
      }
    } catch (_) {}
    return false;
  }
  // Claves de la URL que gobiernan la taquilla: el hijo no puede reescribirlas.
  var RESERVED = { event: 1, lang: 1, fbclid: 1, ttclid: 1, gclid: 1, utm_source: 1, utm_medium: 1, utm_campaign: 1, utm_content: 1, utm_term: 1 };
  function cookie(name) {
    var parts = document.cookie ? document.cookie.split("; ") : [];
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf("=");
      if (parts[i].slice(0, eq) !== name) continue;
      try { return decodeURIComponent(parts[i].slice(eq + 1)); } catch (_) { return parts[i].slice(eq + 1); }
    }
    return null;
  }
  function param(key) {
    try {
      var fromUrl = new URLSearchParams(window.location.search).get(key);
      if (fromUrl) return fromUrl;
      return JSON.parse(sessionStorage.getItem("ge_campaign_params") || "{}")[key] || null;
    } catch (_) { return null; }
  }
  function scrollInstant(top, relative) {
    try {
      var opts = { top: top, left: 0, behavior: "instant" };
      if (relative) window.scrollBy(opts); else window.scrollTo(opts);
    } catch (_) {
      if (relative) window.scrollBy(0, top); else window.scrollTo(0, top);
    }
  }
  window.addEventListener("message", function (e) {
    if (!isFourvenues(e.origin) || !fromOurFrame(e.source)) return;
    var child = e.source;
    function send(payload) {
      try { if (child) child.postMessage(payload, e.origin); } catch (_) {}
    }
    if (typeof e.data === "string") {
      var m = null;
      try { m = JSON.parse(e.data); } catch (_) { return; }
      if (!m || typeof m !== "object") return;
      if (m.type === "seamless_ready") {
        if (!seamlessId) seamlessId = "ge" + Date.now().toString(36);
        send(JSON.stringify({ type: "seamless_connect", data: { id: seamlessId, styles: [] } }));
      } else if (m.type === "seamless_update" && m.data) {
        var sh = Number(m.data.height);
        setHeight(sh);
        if (typeof m.callback === "string") {
          send(JSON.stringify({ type: m.callback, data: { height: isFinite(sh) ? sh : 0 } }));
        }
      }
      return;
    }
    var d = e.data && typeof e.data === "object" ? e.data : {};
    switch (d.key) {
      case "addHeight": {
        setHeight(typeof d.height === "number" ? d.height : parseInt(String(d.height || ""), 10));
        return;
      }
      case "forwardScroll": {
        var dy = Number(d.deltaY);
        if (!isFinite(dy) || dy === 0) return;
        var cap = window.innerHeight || 800;
        scrollInstant(Math.max(-cap, Math.min(cap, dy)), true);
        return;
      }
      case "toTop": {
        var t = frame();
        if (!t) return;
        var rectTop = t.getBoundingClientRect().top;
        // Solo si el inicio del marco quedó por encima de la pantalla: en la
        // carga inicial no se salta la cabecera de la página.
        if (rectTop < NAV_OFFSET) {
          try {
            window.scrollTo({ top: rectTop + window.scrollY - NAV_OFFSET, left: 0, behavior: "smooth" });
          } catch (_) {
            window.scrollTo(0, rectTop + window.scrollY - NAV_OFFSET);
          }
        }
        return;
      }
      case "getQueryParam": {
        var value = null;
        try { value = new URLSearchParams(window.location.search).get(String(d.paramKey)); } catch (_) {}
        return send({ key: "resultQueryParam", paramKey: d.paramKey, value: value === null ? false : value });
      }
      case "setQueryParams": {
        if (!d.params || typeof d.params.key !== "string" || RESERVED[d.params.key]) return;
        try {
          var u = new URL(window.location.href);
          u.searchParams.set(d.params.key, String(d.params.value));
          // Estado null como el cargador oficial: con el estado interno de Next
          // (__NA) su parche no actualiza la URL canónica y la restauraría luego
          // sin el parámetro (revisión de código, 15-sep-2026).
          window.history.replaceState(null, "", u.toString());
        } catch (_) {}
        return;
      }
      case "3d-viewer-enter": {
        lockedY = window.scrollY;
        var sbw = window.innerWidth - document.documentElement.clientWidth;
        var b = document.body.style;
        b.position = "fixed"; b.top = "-" + lockedY + "px"; b.left = "0"; b.right = "0";
        if (sbw > 0) b.paddingRight = sbw + "px";
        return;
      }
      case "3d-viewer-leave": {
        var s = document.body.style;
        s.position = ""; s.top = ""; s.left = ""; s.right = ""; s.paddingRight = "";
        scrollInstant(lockedY, false);
        return;
      }
      case "openUrl": {
        var url = typeof d.url === "string" ? d.url : "";
        if (url.indexOf("https://") !== 0) return;
        if (d.target === "_blank") window.open(url, "_blank", "noopener");
        else window.location.href = url;
        return;
      }
      case "currentUrl":
        return send({ key: "currentUrl", url: window.location.href });
      case "currentUrlCli":
        return send(JSON.stringify({ location: window.location.href }));
      case "getFBC": {
        var fbc = cookie("_fbc");
        var fbclid = fbc ? null : param("fbclid");
        return send({ key: "getFBC", value: fbc || (fbclid ? "fb.1." + Date.now() + "." + fbclid : null) });
      }
      case "getConsentCookies":
      case "getUTMParams":
        // requestFromParent del hijo: espera 500 ms y sigue con null. Se responde
        // null al instante (misma semántica, sin la espera en cada carga).
        return send({ key: d.key, value: null });
      case "getFBP":
        return send({ key: "getFBP", value: cookie("_fbp") });
      case "getTTP":
        return send({ key: "getTTP", value: cookie("_ttp") });
      case "getTTCLID":
        return send({ key: "getTTCLID", value: param("ttclid") });
      case "getCampaignsTracking":
        return send({ key: "getCampaignsTracking", value: [] });
      case "getTrackeableLinksTracking":
        return send({ key: "getTrackeableLinksTracking", value: {} });
      case "setCookie": {
        var token = typeof d.cookie === "string" ? d.cookie : "";
        if (/^[A-Za-z0-9_.-]{1,1024}$/.test(token)) {
          // Cookie de SESIÓN (como el cargador oficial): muere al cerrar el navegador.
          document.cookie = "guest-token=" + token + "; path=/; SameSite=Lax; Secure";
        }
        return;
      }
    }
  });
})();`;
