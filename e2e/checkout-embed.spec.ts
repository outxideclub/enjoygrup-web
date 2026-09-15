import { test, expect } from "@playwright/test";

// TAREA-VENTA-EN-WEB §3: taquilla embebida (iframe OFICIAL de Fourvenues, con
// protocolo postMessage de auto-alto) + páginas de retorno del checkout.
// Regla dura: no se rompe la venta en temporada.
test.describe("Taquilla embebida /taquilla", () => {
  test("el iframe usa la versión oficial embebible con tema oscuro", async ({ page }) => {
    await page.goto("/taquilla");
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    const src = await iframe.getAttribute("src");
    expect(src).toMatch(/https:\/\/site\.fourvenues\.com\/(es|en|de|fr|it)\/iframe\/outxide-club\/events/);
    expect(src).toContain("theme=dark");
    expect(await iframe.getAttribute("scrolling")).toBe("no");
  });

  test("?event abre la taquilla en el evento y rechaza valores inyectados", async ({ page }) => {
    await page.goto("/taquilla?event=calenton--outxide-18-09-2026-ABCD");
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    expect(await iframe.getAttribute("src")).toContain(
      "/iframe/outxide-club/events/calenton--outxide-18-09-2026-ABCD",
    );

    await page.goto("/taquilla?event=https%3A%2F%2Fevil.example%2Fx");
    const iframe2 = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe2).toBeAttached({ timeout: 10_000 });
    const src2 = await iframe2.getAttribute("src");
    expect(src2).not.toContain("evil.example");
    expect(src2).toContain("/iframe/outxide-club/events?");
  });

  test("auto-alto: el marco crece con addHeight y solo desde orígenes de Fourvenues", async ({ page }) => {
    await page.goto("/taquilla");
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });

    // Mensaje legítimo (origen de Fourvenues Y ventana de nuestro marco) → el
    // iframe adopta la altura.
    const post = (origin: string, height: string, fromFrame: boolean) =>
      page.evaluate(
        ([origin, height, fromFrame]) => {
          const frame = document.querySelector<HTMLIFrameElement>('iframe[src*="/iframe/outxide-club"]');
          window.dispatchEvent(
            new MessageEvent("message", {
              origin: origin as string,
              data: { key: "addHeight", height },
              source: fromFrame ? frame?.contentWindow : window,
            }),
          );
        },
        [origin, height, fromFrame] as const,
      );
    await post("https://www.fourvenues.com", "2345px", true);
    await expect(iframe).toHaveCSS("height", "2345px", { timeout: 5_000 });

    // Otro origen → ignorado. Origen legítimo pero desde otra ventana → ignorado.
    await post("https://evil.example", "50px", true);
    await post("https://web.fourvenues.com", "60px", false);
    await page.waitForTimeout(300);
    await expect(iframe).toHaveCSS("height", "2345px");
  });

  test("la salida de emergencia (pestaña completa) está siempre visible", async ({ page }) => {
    await page.goto("/taquilla");
    const fallback = page.locator('main a[target="_blank"][href*="site.fourvenues.com"]');
    await expect(fallback).toBeVisible({ timeout: 10_000 });
  });

  // Rendimiento en móvil (15-sep-2026): el iframe y sus parámetros salen en el
  // HTML del servidor, así Fourvenues empieza a cargar mientras se lee la
  // página, sin esperar al JavaScript (lento en el navegador de Instagram).
  test("el HTML inicial ya trae el iframe con evento, campaña y preconnect", async ({ request }) => {
    const res = await request.get(
      "/taquilla?event=calenton--outxide-18-09-2026-ABCD&fbclid=SSR1&utm_source=ig",
      { headers: { "accept-language": "es-ES" }, maxRedirects: 0 },
    );
    expect(res.status()).toBe(200);
    const html = await res.text();
    // La URL viaja en data-src: el src lo pone un script inline en cuanto el
    // marco está colocado (Next mueve el cuerpo transmitido; mover un iframe
    // con src lo recargaría).
    expect(html).toContain(
      'data-src="https://site.fourvenues.com/es/iframe/outxide-club/events/calenton--outxide-18-09-2026-ABCD?theme=dark',
    );
    expect(html).toContain("fbclid=SSR1");
    expect(html).toContain("utm_source=ig");
    expect(html).toMatch(/<link(?=[^>]*rel="preconnect")(?=[^>]*href="https:\/\/site\.fourvenues\.com")[^>]*>/);
  });

  test("sin muro de edad a pantalla completa en la taquilla", async ({ page, request }) => {
    const html = await (await request.get("/taquilla")).text();
    expect(html).not.toContain("age-verification");
    await page.goto("/taquilla");
    await expect(page.locator('iframe[src*="/iframe/outxide-club"]')).toBeAttached({ timeout: 10_000 });
    await page.waitForTimeout(1_000);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("la ruta antigua /outxide/entradas lleva a la taquilla con la query intacta", async ({ page }) => {
    await page.goto("/outxide/entradas?event=calenton--outxide-18-09-2026-ABCD&fbclid=OLD1");
    await expect(page).toHaveURL(/\/taquilla\?/);
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    expect(await iframe.getAttribute("src")).toContain("fbclid=OLD1");
  });
});

test.describe("Páginas de retorno del checkout", () => {
  test("/gracias renderiza la confirmación con noindex", async ({ page }) => {
    await page.goto("/gracias");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    const robots = page.locator('meta[name="robots"]');
    expect(await robots.getAttribute("content")).toContain("noindex");
    await expect(page.locator('main a[href*="/agenda"]')).toBeAttached();
  });

  test("/pago-cancelado renderiza con vuelta a la taquilla", async ({ page }) => {
    await page.goto("/pago-cancelado");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('main a[href*="entradas.grupoenjoy.es"]')).toBeAttached();
  });

  test("/gracias dispara Purchase una vez y la recarga no lo repite", async ({ page }) => {
    await page.addInitScript(() => {
      // Doble de fbq para contar disparos sin cargar el píxel real. Se
      // reinstala en cada navegación: el contador es POR CARGA de página.
      (window as unknown as { fbq: (...a: unknown[]) => void }).fbq = (...a: unknown[]) => {
        (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls ??= [];
        (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls.push(a);
      };
    });
    const countPurchases = () =>
      page.evaluate(
        () =>
          ((window as unknown as { __fbqCalls?: unknown[][] }).__fbqCalls ?? []).filter(
            (c) => c[1] === "Purchase",
          ).length,
      );

    await page.goto("/gracias");
    await expect.poll(countPurchases, { timeout: 8_000 }).toBe(1);

    await page.reload();
    await page.waitForTimeout(1500);
    expect(await countPurchases()).toBe(0);

    // Compra nueva con referencia de pedido distinta: SÍ debe disparar.
    await page.goto("/gracias?order=PEDIDO-2");
    await expect.poll(countPurchases, { timeout: 8_000 }).toBe(1);
  });

  test("la CSP permite el iframe de Fourvenues y el retorno propio", async ({ page }) => {
    const resp = await page.goto("/taquilla");
    const csp = resp?.headers()["content-security-policy"] ?? "";
    const frameSrc = csp.split(";").find((d) => d.trim().startsWith("frame-src")) ?? "";
    // Cualquier subdominio: el checkout salta de site. a web. y a pay.
    expect(frameSrc).toContain("https://*.fourvenues.com");
    expect(frameSrc).toContain("'self'");
  });
});

// Checkout real (15-sep-2026): Fourvenues cambia de host A MITAD de compra
// (site. → web.) y en el paso de entradas PREGUNTA a la página por ?warranty
// esperando resultQueryParam. Sin respuesta, el resumen de precios se quedaba
// difuminado y no se podía terminar (PC y móvil). Hijo simulado con page.route
// sobre los orígenes reales, con la misma redirección que producción.
test.describe("Puente con el checkout de Fourvenues", () => {
  const CHILD = `<!doctype html><html><body style="height:3000px"><script>
    window.__replies = [];
    addEventListener("message", function (e) { window.__replies.push(e.data); });
    parent.postMessage({ key: "getQueryParam", paramKey: "warranty" }, "*");
    parent.postMessage({ key: "getQueryParam", paramKey: "ausente" }, "*");
    parent.postMessage({ key: "currentUrl" }, "*");
    parent.postMessage({ key: "addHeight", height: "1880px" }, "*");
    setTimeout(function () { parent.postMessage({ key: "forwardScroll", deltaY: 300 }, "*"); }, 400);
  </script></body></html>`;

  test.beforeEach(async ({ page }) => {
    // Como en producción: el marco arranca en site. y salta a web. dentro
    // del propio iframe (navegación del hijo, no redirección HTTP).
    await page.route("https://site.fourvenues.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `<!doctype html><script>location.replace("https://web.fourvenues.com/es/iframe/outxide-club/events/x/tickets/y")</script>`,
      }),
    );
    await page.route("https://web.fourvenues.com/**", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: CHILD }),
    );
  });

  test("el marco pide Fourvenues UNA sola vez (no se recarga al colocarse)", async ({ page }) => {
    // CPU x6 (gama media / navegador de Instagram): React revela el trozo
    // transmitido tarde y un src prematuro provocaba dos cargas.
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 6 });
    let hits = 0;
    await page.route("https://site.fourvenues.com/**", (route) => {
      hits++;
      return route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><p>fv</p>" });
    });
    await page.goto("/taquilla");
    await expect(page.locator('iframe[src*="/iframe/outxide-club"]')).toBeAttached({ timeout: 15_000 });
    await page.waitForTimeout(2_500);
    expect(hits).toBe(1);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  });

  // El hijo escribe ?warranty en la URL del padre y lo vuelve a pedir en el
  // paso siguiente; las claves que gobiernan la taquilla no puede tocarlas.
  test("setQueryParams → getQueryParam persiste y respeta las claves reservadas", async ({ page }) => {
    const CHILD_QS = `<!doctype html><html><body><script>
      window.__replies = [];
      addEventListener("message", function (e) { window.__replies.push(e.data); });
      parent.postMessage({ key: "setQueryParams", params: { key: "warranty", value: "true" } }, "*");
      parent.postMessage({ key: "setQueryParams", params: { key: "event", value: "hack" } }, "*");
      setTimeout(function () {
        parent.postMessage({ key: "getQueryParam", paramKey: "warranty" }, "*");
        parent.postMessage({ key: "getQueryParam", paramKey: "event" }, "*");
      }, 400);
    </script></body></html>`;
    await page.route("https://web.fourvenues.com/**", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: CHILD_QS }),
    );
    await page.goto("/taquilla?event=calenton--outxide-18-09-2026-ABCD");
    const replies = () => {
      const child = page.frames().find((f) => f.url().startsWith("https://web.fourvenues.com/"));
      return child
        ? child.evaluate(() => (window as unknown as { __replies: unknown[] }).__replies)
        : Promise.resolve([] as unknown[]);
    };
    await expect.poll(replies, { timeout: 10_000 }).toEqual(
      expect.arrayContaining([
        { key: "resultQueryParam", paramKey: "warranty", value: "true" },
        { key: "resultQueryParam", paramKey: "event", value: "calenton--outxide-18-09-2026-ABCD" },
      ]),
    );
    await expect(page).toHaveURL(/warranty=true/);
    await expect(page).not.toHaveURL(/hack/);
  });

  // El paso de pago puede llevar el marco a pay.fourvenues.com: la CSP del
  // padre (frame-src) también rige las navegaciones del hijo (revisión SecOps).
  test("el marco puede saltar a pay.fourvenues.com sin que la CSP lo bloquee", async ({ page }) => {
    await page.route("https://site.fourvenues.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `<!doctype html><script>location.replace("https://pay.fourvenues.com/checkout/x")</script>`,
      }),
    );
    await page.route("https://pay.fourvenues.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `<!doctype html><script>parent.postMessage({ key: "addHeight", height: "2222px" }, "*")</script>`,
      }),
    );
    await page.goto("/taquilla");
    await expect(page.locator('iframe[src*="/iframe/outxide-club"]')).toHaveCSS("height", "2222px", { timeout: 10_000 });
  });

  // Los pasos en web.fourvenues.com miden la altura con la librería seamless
  // (texto JSON): handshake + acuse de cada altura. Sin acuse, el hijo no
  // vuelve a mandar alturas y el formulario de datos queda cortado a 710 px.
  test("protocolo seamless: connect al ready y acuse de cada seamless_update", async ({ page }) => {
    const SEAMLESS_CHILD = `<!doctype html><html><body style="height:1990px"><script>
      window.__replies = [];
      addEventListener("message", function (e) {
        window.__replies.push(e.data);
        if (typeof e.data !== "string") return;
        var m = JSON.parse(e.data);
        if (m.type === "seamless_connect" && m.data && m.data.id) {
          parent.postMessage(JSON.stringify({ type: "seamless_update", data: { height: 1990, __id: m.data.id }, callback: "cb1" }), "*");
        }
      });
      parent.postMessage(JSON.stringify({ type: "seamless_ready", data: {} }), "*");
    </script></body></html>`;
    await page.route("https://web.fourvenues.com/**", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: SEAMLESS_CHILD }),
    );
    await page.goto("/taquilla");
    await expect(page.locator('iframe[src*="/iframe/outxide-club"]')).toHaveCSS("height", "1990px", { timeout: 10_000 });
    const replies = () => {
      const child = page.frames().find((f) => f.url().startsWith("https://web.fourvenues.com/"));
      return child
        ? child.evaluate(() =>
            (window as unknown as { __replies: unknown[] }).__replies
              .filter((r): r is string => typeof r === "string")
              .map((r) => JSON.parse(r) as { type: string; data?: { height?: number } }),
          )
        : Promise.resolve([]);
    };
    await expect.poll(replies, { timeout: 10_000 }).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "seamless_connect" }),
        { type: "cb1", data: { height: 1990 } },
      ]),
    );
  });

  test("responde getQueryParam, alto y scroll desde web.fourvenues.com", async ({ page }) => {
    await page.goto("/taquilla?warranty=1");
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toHaveCSS("height", "1880px", { timeout: 10_000 });

    const replies = () => {
      const child = page.frames().find((f) => f.url().startsWith("https://web.fourvenues.com/"));
      return child
        ? child.evaluate(() => (window as unknown as { __replies: unknown[] }).__replies)
        : Promise.resolve([] as unknown[]);
    };
    await expect
      .poll(replies, { timeout: 10_000 })
      .toEqual(
        expect.arrayContaining([
          { key: "resultQueryParam", paramKey: "warranty", value: "1" },
          { key: "resultQueryParam", paramKey: "ausente", value: false },
          expect.objectContaining({ key: "currentUrl" }),
        ]),
      );

    // La rueda sobre el marco (sin scroll interno) mueve la página.
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5_000 }).toBeGreaterThan(200);
  });
});
