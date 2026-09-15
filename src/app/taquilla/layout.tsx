// Taquilla (servida en entradas.grupoenjoy.es vía src/proxy.ts). Vive FUERA de
// /outxide a propósito (15-sep-2026, rendimiento en móvil): ese segmento
// consulta Fourvenues en servidor, pinta un skeleton de carga y un muro de
// edad a pantalla completa — tres frenos antes de poder comprar. Aquí solo el
// tema visual del club; el diseño de la página es el de siempre.
export default function TaquillaLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-outxide">{children}</div>;
}
