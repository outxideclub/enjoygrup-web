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
