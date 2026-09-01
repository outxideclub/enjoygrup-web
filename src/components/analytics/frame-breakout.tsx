/**
 * Escape del marco para las páginas de retorno del checkout (/gracias y
 * /pago-cancelado). El pago en la taquilla embebida (/outxide/entradas) ocurre
 * dentro de un iframe: la redirección de éxito/cancelación de Fourvenues
 * navega ESE marco, no la ventana. Este script (inline, antes de pintar nada)
 * sube la página a la ventana completa para que la confirmación no quede
 * anidada dentro del recuadro de la taquilla.
 *
 * Asignar top.location está permitido incluso con padres de otro origen, y
 * location.replace no deja el paso intermedio en el historial.
 */
export function FrameBreakout() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html:
          "if(window.top!==window.self){try{window.top.location.replace(window.location.href)}catch(e){}}",
      }}
    />
  );
}
