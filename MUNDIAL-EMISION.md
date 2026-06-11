# Mundial 2026 — Guía de emisión (doble pantalla)

Montaje para retransmitir los partidos en **Outxide** (visibles desde la terraza de
**Enjoy**) durante la franja **17:00–23:00**, con **dos fuentes de vídeo simultáneas**:

1. **El partido** → pantallas grandes. Ya lo tienes montado con **OBS Studio + cámara virtual**.
2. **El marcador / info** → pantalla central del DJ. Es la web:
   **`https://grupoenjoy.es/mundial/directo`** (formato 16:9, marcador en vivo,
   próximo partido y mini-calendario, con la marca del grupo).

---

## A) Lo más simple y robusto (recomendado): navegador a pantalla completa

Si la pantalla central del DJ la mueve un **PC / mini-PC / portátil**, **no necesitas
cámara virtual**:

1. Abre Chrome/Edge en `https://grupoenjoy.es/mundial/directo`.
2. Pulsa **F11** (pantalla completa) o arranca en modo kiosko:
   - Windows: `chrome.exe --kiosk --app=https://grupoenjoy.es/mundial/directo`
   - macOS: `open -a "Google Chrome" --args --kiosk --app=https://grupoenjoy.es/mundial/directo`
3. Manda esa salida a la pantalla del DJ (HDMI / segundo monitor).

La página se actualiza sola (marcador cada ~20 s) y se centra a 16:9 con barras negras
si la pantalla no es exactamente 16:9.

> Con esto ya tienes las **dos emisiones simultáneas**: OBS → pantallas grandes,
> navegador → pantalla del DJ. No hace falta nada más.

---

## B) Si tu pipeline SOLO acepta entrada de cámara (segunda cámara virtual)

OBS Studio **solo puede emitir UNA cámara virtual** por instancia. Para tener una
**segunda** cámara virtual (la del marcador) tienes tres caminos:

### B1) mimoLive (recomendado si ya lo usas — hay `.mmfl` en el proyecto)
mimoLive **sí** permite varias salidas a la vez.
1. Nueva capa **Web / HTML** apuntando a `https://grupoenjoy.es/mundial/directo`.
2. Tamaño del documento **1920×1080**.
3. **Output Destinations → Virtual Camera** (o **NDI / Syphon**) para esa composición,
   en paralelo a la salida del partido.
4. En la pantalla del DJ selecciona esa cámara virtual / fuente NDI.

### B2) Segunda instancia de OBS (portable)
1. Instala una **copia portable** de OBS (carpeta aparte).
2. Lánzala con el flag de multi-instancia: `obs64.exe --multi`.
3. En esa instancia: **Fuente → Navegador (Browser Source)**, URL
   `https://grupoenjoy.es/mundial/directo`, 1920×1080.
4. **Iniciar cámara virtual** en esa segunda instancia.
   - En **Windows** funciona con dos cámaras virtuales (OBS + plugin).
   - En **macOS** la cámara virtual es una extensión de sistema y suele permitir
     solo una; en ese caso usa **B1 (mimoLive)** o **B3 (NDI)**.

### B3) NDI (sin cámara virtual)
1. En OBS: plugin **DistroAV (NDI)** → Browser Source con la URL del directo →
   **salida NDI dedicada**.
2. En la pantalla del DJ, un **NDI Monitor / Studio Monitor** muestra esa salida.

---

## C) Forzar un partido concreto en el marcador
Por defecto la página muestra el partido que se emite ahora; si no hay ninguno en
juego, muestra el **próximo** de Outxide. Para fijar uno manualmente añade su id:

```
https://grupoenjoy.es/mundial/directo?... (la API acepta ?matchId=<id> en /api/mundial/live)
```
Los ids están en `data/mundial/matches.json`.

---

## D) Marcador en vivo — fuente de datos
- Lo sirve `//api/mundial/live`, que consulta la **API pública de FIFA**
  (`api.fifa.com`) — **gratis y sin clave**. El servidor cachea ~25 s, así que aunque
  haya varias pantallas, FIFA recibe muy pocas peticiones.
- **Salvaguarda manual** (por si la API fallara en directo): define en Vercel la
  variable de entorno `MUNDIAL_SCORE_OVERRIDE` con un JSON, p. ej.:
  ```json
  {"matchId":"400021443","status":"LIVE","minute":"67'","home":2,"away":1}
  ```
  Mientras exista, esa variable tiene prioridad sobre la API. Bórrala para volver al
  modo automático. (Cambiarla requiere un redeploy en Vercel.)

---

## E) Reglas de programación (las aplica la web sola)
- Se marcan **"Se ve en Outxide"** los partidos cuyo saque cae entre **17:00 y 23:00**
  (hora de Mallorca, calculada automáticamente con cambios de horario incluidos).
- Si **dos partidos coinciden** a la misma hora dentro de la franja, la web destaca
  solo **uno** ("Partido de la noche") según una tabla de **interés turístico** de la
  zona (Alemania, Reino Unido, España, Francia, Italia, Países Bajos… + grandes
  selecciones como Brasil/Argentina) y la importancia de la fase. El otro queda como
  "Coincide — no se emite". La tabla está en `src/lib/mundial/index.ts` (`TOURISM`) por
  si quieres ajustar pesos.
