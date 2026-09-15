# Tarea para la sesión de grupoenjoy.es · Venta de entradas en la web

> **ESTADO (1-sep-2026, sesión grupoenjoy.es):**
> - **TAREA 1 HECHA y desplegada.** Captura de `fbclid`/`ttclid`/`gclid`/`utm_*` en `sessionStorage` (decisión de privacidad documentada en `src/lib/campaign-params.ts`: no es cookie de marketing, no requiere consentimiento, muere con la pestaña) + interceptor global en el layout raíz (`src/components/analytics/campaign-link-tracker.tsx`) que decora TODOS los enlaces a Fourvenues al pulsarlos. 5 tests e2e en `e2e/campaign-params.spec.ts`.
> - **Hallazgo crítico**: `web.fourvenues.com` redirige a **`site.fourvenues.com`** y esa redirección **PIERDE la query entera** — probable causa raíz de la atribución rota. Todos los enlaces de la web apuntan ya a `site.` directamente.
> - **Comprobación 1 de la Tarea 3 hecha**: `site.fourvenues.com` (microsite y páginas de evento) se sirve **sin** `X-Frame-Options` ni `frame-ancestors` → embebible hoy. PERO `web.fourvenues.com` está tras Cloudflare con desafío interactivo (Turnstile) que se sirve con `X-Frame-Options: SAMEORIGIN`: si el desafío salta dentro de un iframe, la compra muere en blanco. Y el 3-D Secure es obligatorio en tarjeta (GUIA §10.1).
> - **Dominio propio**: sin documentación pública en FV Academy → hay que preguntarlo (pregunta 3 del correo). **Correo al account manager: PENDIENTE DE ENVIAR por el dueño.**
> - Análisis completo y recomendación de arquitectura: entregados al dueño el 1-sep-2026 (resumen: subdominio propio como opción preferida, iframe como plan B condicionado, Thank You Page hacia grupoenjoy.es en ambos casos).
> - TAREA 2 (landing): pendiente.

> Encargo trasladado desde la sesión de **Meta Ads OUTXIDE** el 1-sep-2026 por orden del dueño: *"la tarea de la pasarela de pago redirígela a la sesión grupoenjoy.es anclada, allí hacemos estas tareas"*.
> Contexto completo y decisiones ya tomadas: `~/Downloads/claude-migracion (1)/meta-ads-outxide/` (`DECISIONES.md`, `REGLAS-DURAS.md`, `ESTADO-ACTUAL.md`).

## Estado (actualizado 1-sep-2026, 20:15 — el subdominio SIRVE la taquilla; todo el tráfico de compra pasa por él)

- **`entradas.grupoenjoy.es` ya no redirige: SIRVE la taquilla** (rewrite en src/proxy.ts, idioma por ?lang→prefijo→cookie→Accept-Language). El host canónico redirige /outxide/entradas al subdominio con ?lang SIEMPRE. Verificado en producción: 200 con la taquilla, ?lang=en → "Box office", iframe con auto-alto (1115px) y fbclid propagado, 11 CTA en /outxide y 17 en /agenda apuntando al subdominio, 0 enlaces directos a Fourvenues fuera de la salida de emergencia.
- **Cross-origen resuelto**: consentimiento de cookies y muro de edad espejados en cookies Domain=.grupoenjoy.es (gana la decisión más reciente; "Configurar cookies" borra ambos soportes; políticas ×5 al día) — el comprador no repite banner ni muro al pasar a la taquilla. "No soy mayor de edad" sale a la home canónica (en el subdominio "/" era bucle).
- **Móvil**: overflow-x clip global + viewport maximum-scale=1 (sin zoom ni scroll horizontal); formulario de newsletter del footer arreglado (sobresalía); logo del aviso de edad centrado. Barrido e2e de elementos cortados en 5 páginas.
- **Seguridad**: admin y /api/admin nunca se sirven por el subdominio (bypass del guard cazado en revisión); CSP con frame-ancestors propio sustituye a X-Frame-Options (el retorno post-pago en marco quedaba bloqueado).
- Commit `bccd3b2`. Dos rondas adversariales (16+21 agentes), 17 defectos corregidos pre-deploy.
- Pendiente del dueño: compra real de prueba (ahora en https://entradas.grupoenjoy.es) · correo al account manager · Tarea 2 (landing).

## Estado (actualizado 1-sep-2026, 18:20 — taquilla SIN scroll interno, CTA cambiados, subdominio a un paso)

- **Auto-alto en vivo**: la taquilla usa el iframe OFICIAL (`www.fourvenues.com/iframe/...`, protocolo postMessage con ingeniería inversa del cargador público): `addHeight` hace crecer el marco al contenido (verificado en producción: 877px reales frente a los 720 por defecto, `scrolling=no`) — sin deslizables dentro; `openUrl` navega la ventana (la Thank You Page sale del marco); el checkout recibe `_fbc/_fbp/ttclid` desde nuestro contexto (con `_fbc` sintetizado del fbclid propagado); `track` NO se reenvía (Purchase solo en /gracias). Commit `c957dc6`.
- **Regla del dueño aplicada**: TODO lo de entradas —normales y VIP— enlaza a `/outxide/entradas` (página del club, botón flotante, navbar, agenda, feed iCal). Excepción: salidas de emergencia. 26 tests e2e en verde.
- **Subdominio `entradas.grupoenjoy.es` OPERATIVO** (1-sep-2026, 18:45): dominio en el proyecto del equipo `outxideclub-9096s-projects` + CNAME `entradas → c4649cf00df5e5fd.vercel-dns-017.com` (DNS only) creado en el Cloudflare del club (cuenta Outxide.club@gmail.com). Verificado end-to-end: `https://entradas.grupoenjoy.es/?fbclid=X` → 307 → `https://www.grupoenjoy.es/outxide/entradas?fbclid=X` (query intacta, TLS propio). ES la URL para bio de Instagram y anuncios. Nota: aviso benigno de Cloudflare "origin IP partially exposed" por el registro DNS-only — mismo patrón que `vip.`, las IPs de Vercel son públicas.
- **NORMA GENERAL (guardada en memoria)**: la infra del club vive en el equipo Vercel `outxideclub-9096s-projects` + su Cloudflare; NO mezclar con cuentas personales (el CLI local autentica como sergibrierton-1734).
- Pendiente del dueño: compra real de prueba en la taquilla · correo al account manager (abajo).

## Estado (actualizado 15-sep-2026 — taquilla `/taquilla`: checkout desbloqueado y rendimiento móvil)

**Encargo de Jose:** "problema de rendimiento en la venta de entradas… que se pueda abrir el link desde cualquier sitio, incluido Instagram stories y bio… ha dado problemas continuamente en móvil… en PC tampoco deja terminar el checkout: se quedan borrosos los precios en el último paso". Diseño de la página intacto (orden expresa).

**Causa raíz del bloqueo (PC y móvil), confirmada con el cargador oficial de Fourvenues:** en el paso de cantidad el checkout pide a la página padre el parámetro `warranty` (`getQueryParam`) y **espera** `resultQueryParam` antes de pintar el resumen y activar «Continuar»; nuestro puente no contestaba. Además el checkout **cambia de host a mitad de compra** (`site.` → `web.fourvenues.com`) y la lista cerrada de orígenes descartaba todos sus mensajes; y en esos pasos la altura se comunica con la librería *seamless* (texto JSON, handshake `seamless_ready`→`seamless_connect` + acuse de `seamless_update`), que nadie atendía (marco clavado en 710 px → botón final fuera del marco).

**Hecho (commit de este día):**
- Ruta nueva `src/app/taquilla/` FUERA de `/outxide` (no hereda la consulta a Fourvenues en servidor, el skeleton ni el muro de edad). `src/proxy.ts`: `TICKETS_PATH=/taquilla`; `/outxide/entradas` sigue viva (rewrite en el subdominio, 307 en www y en local). Los CTA no cambian: siguen apuntando a `https://entradas.grupoenjoy.es/?event=…&lang=…`.
- Página de **servidor**: el iframe y sus parámetros (idioma, `?event`, fbclid/utm_*) salen en el HTML (`data-src`; el `src` lo asigna un script inline en cuanto React coloca el trozo transmitido — mover un iframe con `src` lo recarga; medido con CPU ×6). `preconnect` estático a `site.fourvenues.com` en el layout raíz.
- **Puente inline** `src/app/taquilla/fv-bridge.ts` con paridad total con `https://www.fourvenues.com/assets/iframe/outxide-club/events` + protocolo seamless: addHeight, forwardScroll, toTop, getQueryParam/resultQueryParam, setQueryParams (sin tocar event/lang/campaña), 3d-viewer, openUrl, currentUrl(Cli), getFBC/FBP/TTP/TTCLID, getCampaignsTracking, getTrackeableLinksTracking, setCookie (guest-token de sesión), getConsentCookies/getUTMParams → null. `track` NO se reenvía (Purchase solo en /gracias). Solo acepta mensajes de `https://*.fourvenues.com` **y** procedentes de nuestro marco (o popups abiertos por él). `FvBridgeFallback` reinyecta los scripts si algún día se llegase por navegación suave.
- CSP `frame-src https://*.fourvenues.com` (el marco salta a `pay.`). Navbar/Footer con enlaces absolutos a www en el subdominio (fin de los prefetch bloqueados por la CSP); banner de cookies ídem; selector de idioma conserva la query. JSON-LD de eventos: `offers.url` a la taquilla.
- **Muro de edad retirado de la taquilla** (decisión de rendimiento; Fourvenues muestra +18 en el evento; sigue en /outxide). Políticas de cookies (5 idiomas): fila `guest-token`, taquilla en `entradas.grupoenjoy.es`.
- Verificación: 47 e2e en verde (incl. hijo simulado en site./web./pay., CPU ×6 carga única, seamless, setQueryParams); recorrido real en build de producción local hasta el formulario de datos en escritorio, móvil y UA de Instagram: resumen `blur(0px)`, «Continuar» activo, alto del marco = alto del contenido en cada paso. Revisión adversarial de 3 agentes (código, SecOps, web-tecnología) con sus hallazgos aplicados.

**Medición móvil (Instagram Android, 3G rápido, CPU ×4) antes → después:** muro de edad visible → ninguno; iframe en el HTML inicial no → sí (una sola petición); petición al iframe a los 2,5 s → ~1,0 s; sin errores de consola (antes 7 por CSP).

**Pendiente:** (1) compra REAL de prueba de Jose en móvil hasta la Thank You Page (10,80 €) — único paso no verificable sin pagar (3DS/wallets a nivel de ventana vía `openUrl`); (2) vigilar iPhone/navegadores internos: en WebKit las cookies de terceros del iframe no persisten (la sesión de FV vive en memoria y se pierde si el marco recarga; VIP/listas recargan) — la salida de emergencia cubre el caso; (3) enlaces de RRPP con `link_id` NUNCA por el subdominio (el puente no consulta la API de FV para atribuirlos).

### Decisión de Jose (15-sep-2026) y plan futuro: checkout propio "estilo bananaclub.es"

**Referente analizado (informe completo en el scratchpad de la sesión):** bananaclub.es (Next.js en Vercel + Cloudflare) vende con Fourvenues **sin iframe ni subdominio**: checkout propio sobre la Channel Manager API proxificada por sus rutas `/api/fourvenues/*`; entradas → datos → resumen en su dominio y solo el pago redirige al `payment_url` de Fourvenues; sin muro de edad (casilla obligatoria "+18" en el formulario, más privacidad+condiciones de entrada e imágenes); ficha de evento propia con tarifas reales y JSON-LD; dataLayer ecommerce con `event_id` + CAPI propia. **No copiar** su sistema de cookies (Cookiebot en inglés, modal que bloquea la compra en móvil y píxeles cargando antes de consentir). Su parte legal (registro mercantil en el aviso legal, condiciones de entrada, política de imágenes) ya la tenemos salvo los datos registrales, que aporta Jose.

**Decisión:** *"De momento mantén el sistema actual en marcha si funciona; si vuelve a fallar lo cambiaremos, si no lo actualizamos cuando termine la temporada."* Alcance de esa versión futura: **entradas + mesas VIP + listas de invitados**.

**Requisitos ya verificados (solo lectura, con la clave actual `FOURVENUES_API_KEY` en `https://channels-service.fourvenues.com`; la base `channels-service-alpha` de la documentación rechaza nuestra clave):**
- `GET /auth` → canal OUTXIDE CLUB. `GET /events` (sin `ticket_rates` en el payload). **`GET /ticket-rates?event_id={id}`** (con guion; `/ticketrates` de la doc da 404) → tarifas completas: `_id`, `name`, `prices[]`/`current_price` (`price`, `fee_type: percentage`, `fee_quantity: 8`, `includes`, `valid_until`), `min`/`max`, `nominative`, `fields[]` (full_name/email/phone requeridos), `questions[]`, `supplements[]`, `warranty.enabled`, `availability`. `GET /ticket-rates/{id}/pricing-info?quantity=n` → desglose por `price_id`. `GET /tickets?event_id=…`, `GET /payments` (5 pagos, con `is_channel_manager`, `rate_id`, `resource_ids`, `status`), `GET /webhooks/endpoints` (vacío) → todo accesible. `GET /organizations`, `/locations` OK. Rutas que dan 404 con nuestra clave: `/listrates`, `/bookings/zones/{event}`, `/discount-codes`, `/eventgroups` (para VIP y listas hay que confirmar las rutas reales con Fourvenues antes de la fase 2).
- `POST /tickets/checkout` (no probado: crea sesión de pago): body `ticket_rate_id`, `redirect_url`, `error_url`, `tickets[]` (`price_id` requerido; `full_name`, `email`, `phone`, `birthday`, `personal_document_*`, `warranty`, `answers[]`, `supplements[]`), opcionales `discount_code`, `send_resources`, `metadata` (≤1 KB) → `payment_id`, `payment_url`, `total_amount`, `conditions_changed`, `tickets[]`. Confirmación: `POST /webhooks/endpoints` {name, url} → `sign_secret`; eventos firmados con `X-Webhook-Signature` = HMAC-SHA256(body); payload `payment.success` {payment_id, resource_type: ticket, resource_ids[], metadata, send_resources}; reintentos con backoff hasta 40.
- Docs: https://docs.fourvenues.com/channel-manager/recipes/creating-a-checkout-process , …/api-reference/tickets/checkout-tickets.md , …/recipes/listening-to-webhooks .

**Esbozo de la fase 2 (cuando toque):** ficha `/outxide/eventos/{slug}` SSR con tarifas; rutas `/api/fourvenues/{ticket-rates,pricing,checkout,vip,lists}` en servidor (clave nunca en cliente); formulario por asistente según `fields[]` + casillas +18 / privacidad+condiciones de entrada / imágenes + opt-in marketing desmarcado; `conditions_changed` → re-mostrar precio antes de redirigir a `payment_url`; `redirect_url` → `/gracias?order={payment_id}` y webhook `payment.success` verificado por HMAC como fuente de verdad del Purchase (dedupe por `event_id`); mesas VIP y listas con las rutas que confirme Fourvenues; e2e con Fourvenues simulado por `page.route` + compra real de prueba antes de conmutar; la taquilla iframe queda como vuelta atrás inmediata.

## Estado (actualizado 1-sep-2026, 16:45 — TAREA 3 fase 1 DESPLEGADA)

**La taquilla embebida está construida, desplegada y verificada en producción** (commit `72b4eb5`):

- **/outxide/entradas** — checkout de Fourvenues dentro de la web (iframe a `site.fourvenues.com`, tema oscuro), parámetros de campaña propagados al marco, `?event={slug-codigo}` para abrir un evento concreto (validado contra inyección), salida de emergencia a pestaña completa siempre visible, muro de edad heredado, noindex. **Verificada en producción con Chrome real: el checkout renderiza dentro de la página.**
- **/gracias** — Thank You Page: Purchase (Meta) + CompletePayment (TikTok) en contexto propio con _fbc/_fbp vivos, guardias anti-recarga y de segunda compra, relanzamiento con consentimiento tardío, y escape del marco (frame-breakout) si el pago acabó dentro del iframe.
- **/pago-cancelado** — Cancel Page con vuelta a la taquilla.
- **Panel de Fourvenues configurado** (guardado "Microsite actualizado correctamente"): Thank You → `https://www.grupoenjoy.es/gracias`, Cancel → `https://www.grupoenjoy.es/pago-cancelado`, tema Oscuro. **Hallazgo:** el panel conservaba la config del intento anterior apuntando a `/outxide/checkout/success|cancel`, rutas inexistentes → los compradores del iframe antiguo acababan en un 404 tras pagar. Otra pieza del porqué "no salió bien".
- CSP: `frame-src` amplía con `'self'` y `https://site.fourvenues.com` (sin esto el marco quedaba VACÍO — cazado en revisión adversarial de 16 agentes junto a 5 defectos más, todos corregidos pre-deploy).
- 8 tests e2e nuevos (`e2e/checkout-embed.spec.ts`); suite en verde.

**LO QUE FALTA para encender la venta embebida (decisión del dueño):**
1. **Compra real de prueba** en https://www.grupoenjoy.es/outxide/entradas — validar 3-D Secure y wallets DENTRO del marco (lo único no verificable sin pagar). Si algo falla, la salida de emergencia mantiene la venta viva.
2. Tras validar: **cambiar los CTA** de /outxide y /agenda hacia `/outxide/entradas?event={slug}` (cambio de una línea en cada sitio, vuelta atrás inmediata).
3. **Correo al account manager: SIGUE PENDIENTE DE ENVIAR** (borrador abajo). El subdominio `entradas.grupoenjoy.es` sigue siendo la arquitectura preferida a medio plazo; el iframe de hoy es el plan B funcionando.
4. Sesión de Meta Ads: el píxel del panel de Fourvenues NO debe disparar Purchase (lo dispara /gracias); dejarlo en PageView/InitiateCheckout, o deduplicar por eventID.

<!-- Estado anterior:
## Estado (actualizado 1-sep-2026, 15:50)

**TAREA 1 hecha y desplegada**, más un bug grave encontrado por el camino:

- `f4607a7` — captura de `fbclid/ttclid/gclid/utm_*` en `src/lib/campaign-params.ts` (sessionStorage, decisión de privacidad razonada) y decoración global de los enlaces a Fourvenues con `CampaignLinkTracker` en el layout raíz. Además cambia el host `web.fourvenues.com` → `site.fourvenues.com`. **Verificado en producción:** entrando con `?fbclid=TEST123` los parámetros quedan guardados y `site.` los conserva hasta el checkout.
- `2ab259c` — **arreglo de un 404 que estaba vivo en producción**: la ruta de un evento en Fourvenues es `{slug}-{code}`, y `eventTicketUrl` generaba solo `{slug}`. Todos los CTA de compra por evento (`/outxide`, `/agenda`, feed iCal y JSON-LD) apuntaban a una página inexistente, incluido el evento del viernes 4-sep. Con test de regresión.

**Ojo para quien siga:** el commit `f4607a7` lo escribió un agente de investigación que se salió de su encargo (debía auditar, no implementar). El código se ha revisado a mano después, pasa lint, typecheck y build, y su comportamiento está verificado en producción — pero conviene leerlo antes de construir encima.

Queda pendiente de las tareas 1 y 2: la bio de Instagram y la ficha de Facebook (son paneles, no código), y la landing.

-->

---

## La regla que origina todo

**Regla permanente del dueño (1-sep-2026):** toda promoción de eventos —anuncios de pago, stories, enlace de la bio— enlaza **primero a grupoenjoy.es**, y desde ahí se redirige a Fourvenues para la compra. Motivo: acumular el tráfico en el dominio del grupo en vez de regalárselo a la plataforma de ticketing.

**Objetivo declarado a medio plazo:** vender **dentro** de la web, con la pasarela de Fourvenues integrada, para dejar de redirigir tráfico fuera. Ya se intentó en su momento y no salió bien; hay que averiguar por qué y prepararlo bien.

Queda anotado también en `fourvenues/CONVENCIONES-OUTXIDE.md` §8.

---

## TAREA 1 (urgente, bloquea la publicidad) · Propagar los parámetros de campaña al saltar a Fourvenues

**El problema:** cuando alguien llega a `grupoenjoy.es/outxide` desde un anuncio de Meta, la URL trae `fbclid`. Al pulsar "comprar" y saltar a `web.fourvenues.com`, ese parámetro se pierde. Sin él, el píxel de Fourvenues no puede formar la cookie `_fbc` y **la venta deja de ser atribuible al anuncio**: Meta optimiza a ciegas y el club no sabe qué campaña vende.

Mientras la regla del dueño mande el tráfico por la web, esto es el precio a pagar — y esta tarea es la que lo cancela.

**Qué hay que hacer:**

1. Capturar de la query de entrada `fbclid`, `ttclid`, `gclid` y las `utm_*`, y conservarlas durante la sesión de navegación (el usuario puede ver dos eventos antes de comprar).
2. Añadirlas a la URL de destino de **todos** los CTA que van a Fourvenues (página del club, tarjetas de evento, botón de mesa VIP, enlaces del blog y de la agenda).
3. Respetar el modelo de consentimiento que ya existe (`src/lib/consent.ts`, `src/components/legal/cookie-banner.tsx`). Punto a decidir con criterio, no por inercia: `fbclid` es un identificador de campaña que **ya viaja en la URL** que el propio usuario abrió; reenviarlo en un enlace no es lo mismo que escribir una cookie de marketing. Lo prudente es no almacenarlo en `localStorage` sin consentimiento y usar `sessionStorage` o el estado de navegación; decidirlo explícitamente y dejarlo escrito.
4. Tests de Playwright que fijen el comportamiento: entrar con `?fbclid=TEST123`, pulsar comprar, comprobar que la URL de salida lo lleva. Ya hay `e2e/` y `playwright.config.ts` en el repo.

**Ficheros implicados** (punto de partida de la auditoría, no lista cerrada): `src/app/outxide/outxide-client.tsx`, `src/lib/events.ts`, `src/lib/fourvenues/client.ts`, `src/app/api/fourvenues/events/route.ts`, `src/lib/consent.ts`.

**Cómo sé que funcionó:** abrir `grupoenjoy.es/outxide?fbclid=TEST123`, pulsar comprar, y ver `fbclid=TEST123` en la URL de Fourvenues. Y que los tests e2e lo cubran.

---

## TAREA 2 · La página del club como landing de anuncio

Al pasar todo el tráfico pagado por la web, `/outxide` deja de ser una página informativa y se convierte en **la landing de la campaña**. Hay que tratarla como tal:

- **Primer scroll:** el evento próximo, la fecha y el precio **con gastos de gestión incluidos** (10 € → **10,80 €**; 15 € → **16,20 €**; mesa VIP 120 € → **129,60 €**). Anunciar el precio sin ellos es precio parcial y práctica engañosa (art. 60.2.c TRLGDCU, art. 5.1 Ley 3/1991).
- **Un solo CTA dominante.** Hoy compiten varios eventos por la atención.
- **Verificación de edad:** revisar cómo está montada. No se puede degradar ni quitar (es requisito legal para publicidad de alcohol y Meta revisa la landing), pero un muro intersticial que aparezca antes de ver nada mata la conversión del tráfico pagado. Buscar la forma que cumpla sin ser un muro.
- **Móvil y velocidad:** el 90% del tráfico de Meta es móvil.
- **Nada de disponibilidad.** Regla dura del dueño: no se muestra ni porcentaje ni cantidad de entradas, ni se menciona que un tramo esté capado.

---

## TAREA 3 · Vender dentro de la web (la pasarela integrada)

**Lo que ya se sabe y no hace falta volver a averiguar:**

- Fourvenues ofrece un **IFRAME oficial** para la web propia: en *Ajustes > Configuración web > sección IFRAME*, con tema claro/oscuro, **"Thank You Page"** (clave para medir conversiones con píxeles), **"Cancel Page"**, formato lista o calendario, y scripts autogenerados para pegar. Documentado en `~/Downloads/claude-migracion (1)/fourvenues/GUIA-FOURVENUES.md` §9.
- Fourvenues tiene además **Integrations API** (clientes, eventos, ventas, pagos, devoluciones, monedero, facturas) con API Keys desde *Settings > Developer Portal*, cabecera `X-Api-Key`. **La web ya la usa**: `src/lib/fourvenues/client.ts` y `.env.local` con `FOURVENUES_API_KEY` / `FOURVENUES_API_URL`.
- Fourvenues admite configurar **Pixel de Meta + token de CAPI + TikTok + GTM** en su propio panel.

**Lo que hay que investigar antes de escribir código:**

1. **¿Permite `web.fourvenues.com` ser embebido?** Es la comprobación que decide si la vía existe. Mirar las cabeceras `X-Frame-Options` y `Content-Security-Policy: frame-ancestors` de la página de un evento real. Si lo prohíbe, el iframe no es viable por mucho que el panel ofrezca la sección.
2. **¿Por qué falló el intento anterior?** Las causas más probables, en orden: cabeceras que impiden el embebido; cookies de terceros bloqueadas (Safari ITP, Firefox TCP, la situación actual de Chrome) que rompen la sesión de compra dentro del iframe; el 3-D Secure del banco redirigiendo fuera del iframe; altura del iframe y responsive; y la Thank You Page no disparando el píxel en el contexto correcto. Confirmar cuál fue, no adivinar.
3. **Si es cuestión de cookies:** evaluar CHIPS (cookies particionadas), Storage Access API y Related Website Sets. Son de aplicación del lado de Fourvenues, no del nuestro, así que probablemente haya que pedírselo a ellos.
4. **Medición dentro del iframe:** el píxel del dominio padre no ve lo que ocurre dentro de un iframe de otro dominio. La vía robusta es **CAPI desde servidor con `event_id` compartido** para deduplicar contra el píxel del navegador. Diseñarlo desde el principio, no después.
5. **Alternativa que puede ser mejor que el iframe:** pedir a Fourvenues un **subdominio propio** (`entradas.grupoenjoy.es` apuntando a su microsite). Resuelve de golpe cookies, 3DS y percepción de marca, y deja el tráfico en nuestro dominio a efectos de analítica. Merece preguntarlo antes de pelearse con el iframe.

**Qué preguntar al account manager de Fourvenues** (borrador para enviar):

> Hola, estamos integrando la venta de entradas dentro de nuestra web (grupoenjoy.es) para no sacar al usuario del dominio. Tres preguntas concretas:
> 1. ¿El iframe de venta está soportado hoy para dominios propios? ¿Hay que autorizar nuestro dominio en `frame-ancestors` por vuestra parte?
> 2. ¿Cómo se comporta el checkout embebido con las cookies de terceros bloqueadas en Safari y Firefox, y con el 3-D Secure del banco? ¿Tenéis clientes con esto funcionando en producción?
> 3. ¿Ofrecéis subdominio personalizado (tipo entradas.grupoenjoy.es) apuntando a nuestro microsite? Sería nuestra opción preferida si el iframe tiene limitaciones.

---

## Orden de trabajo recomendado

1. **Tarea 1** (propagación de parámetros). Es pequeña, no depende de nadie externo y desbloquea toda la medición publicitaria. Hacerla ya.
2. **Tarea 2** (landing). En paralelo, no bloquea.
3. **Tarea 3**: primero las dos comprobaciones de 10 minutos (cabeceras del iframe + correo a Fourvenues). Con la respuesta se decide arquitectura. **No empezar a construir el iframe antes de tener esas dos respuestas.**

## Regla que no se salta

**No se rompe la venta en temporada.** Cualquier cambio en el camino de compra se prueba con Playwright y se despliega con vuelta atrás inmediata. Estamos en septiembre, con eventos cada viernes y sábado.
