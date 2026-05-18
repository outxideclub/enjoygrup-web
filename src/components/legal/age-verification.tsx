"use client";

import { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { OutxideLogo } from "@/components/ui/logos";

const AGE_KEY = "ge_age_verified";

export function AgeVerification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const verified = sessionStorage.getItem(AGE_KEY);
    if (!verified) setShow(true);
  }, []);

  const confirm = () => {
    sessionStorage.setItem(AGE_KEY, "true");
    setShow(false);
  };

  const deny = () => {
    window.location.href = "/";
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950 p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-outxide/10 border border-outxide/20">
          <ShieldAlert className="h-8 w-8 text-outxide" />
        </div>

        <OutxideLogo className="h-10 mx-auto mb-6" />

        <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide mb-2">
          Verificación de edad
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          El acceso a Outxide Club está restringido a personas mayores de 18 años.
          ¿Confirmas que eres mayor de edad?
        </p>

        <div className="space-y-3">
          <button
            onClick={confirm}
            className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Sí, soy mayor de 18 años
          </button>
          <button
            onClick={deny}
            className="w-full rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          >
            No, soy menor de edad
          </button>
        </div>

        <p className="mt-6 text-[10px] text-muted-foreground leading-relaxed">
          Al confirmar, aceptas nuestra{" "}
          <a href="/legal/condiciones-entrada" className="underline underline-offset-2 hover:text-white transition-colors">
            normativa de acceso
          </a>
          {" "}y{" "}
          <a href="/legal/privacidad" className="underline underline-offset-2 hover:text-white transition-colors">
            política de privacidad
          </a>.
        </p>
      </div>
    </div>
  );
}
