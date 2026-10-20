import { OUTXIDIOUS_CONTENT, isSlotApproved } from "@/lib/outxidious/content";

// Carga propia de la landing: hero ESTÁTICO (sin pulsos) y sin el skeleton cian
// de /outxide, que en el navegador de Instagram se vería como otra página. Usa
// el tema que diga content.ts: rojo con el hueco approved.theme encendido y
// theme="campana-roja" (provisional desde el 20-oct), si no el oscuro neutro;
// el mismo brillo que outxidious.css. Sin textos: no hay diccionario que pedir.
export default function OutxidiousLoading() {
  const red = isSlotApproved(OUTXIDIOUS_CONTENT, "theme") && OUTXIDIOUS_CONTENT.theme === "campana-roja";
  return (
    <div className={`min-h-screen ${red ? "bg-[#070707]" : "bg-[#0a0a0a]"}`} aria-busy="true">
      <div
        className="relative flex min-h-[70vh] items-center justify-center"
        style={{
          background: red
            ? "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(160, 7, 14, 0.26) 0%, rgba(7, 7, 7, 0) 75%)"
            : "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(255, 255, 255, 0.06) 0%, rgba(10, 10, 10, 0) 70%)",
        }}
      >
        <div className="flex flex-col items-center gap-4" aria-hidden>
          <div className="h-12 w-64 rounded bg-white/5" />
          <div className="h-6 w-48 rounded bg-white/5" />
          <div className="mt-4 h-12 w-56 rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}
