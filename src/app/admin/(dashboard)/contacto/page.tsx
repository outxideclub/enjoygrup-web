"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Check, Phone, AtSign, Mail, MapPin, MessageCircle } from "lucide-react";
import { SaveErrorBanner, saveErrorFromResponse, type SaveError } from "../save-error";

interface VenueContact {
  phone: string;
  instagram: string;
  mapsUrl: string;
}

interface SiteContact {
  general: {
    email: string;
    privacyEmail: string;
    phone: string;
    whatsapp: string;
  };
  venues: {
    enjoy: VenueContact;
    outxide: VenueContact;
    hiru: VenueContact;
  };
}

type VenueKey = keyof SiteContact["venues"];

const VENUE_LABELS: { key: VenueKey; label: string; color: string }[] = [
  { key: "enjoy", label: "Enjoy Terrace", color: "text-pink-400" },
  { key: "outxide", label: "Outxide Club", color: "text-cyan-400" },
  { key: "hiru", label: "Hiru Food & Drinks", color: "text-amber-400" },
];

function Field({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: typeof Phone;
  hint?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 mb-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 text-zinc-500" />}
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
      />
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export default function ContactoAdminPage() {
  const [data, setData] = useState<SiteContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<SaveError | null>(null);

  useEffect(() => {
    // Abortar la carga si el componente se desmonta antes de terminar
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/site", { signal: ac.signal });
        if (!res.ok) throw new Error();
        setData(await res.json());
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return; // petición cancelada
        setError({ message: "No se pudo cargar la información." });
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) {
        setError(await saveErrorFromResponse(res, "Error al guardar"));
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError({ message: "Error de conexión al guardar" });
    } finally {
      setSaving(false);
    }
  }

  function updateGeneral(key: keyof SiteContact["general"], value: string) {
    setData((prev) => (prev ? { ...prev, general: { ...prev.general, [key]: value } } : prev));
  }

  function updateVenue(venue: VenueKey, key: keyof VenueContact, value: string) {
    setData((prev) =>
      prev
        ? { ...prev, venues: { ...prev.venues, [venue]: { ...prev.venues[venue], [key]: value } } }
        : prev,
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">Contacto y redes</h1>
        <button
          onClick={handleSave}
          disabled={saving || !data}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Guardando..." : saved ? "Guardado" : "Guardar"}
        </button>
      </div>
      <p className="text-sm text-zinc-500 mb-8">
        Teléfonos, WhatsApp, emails y redes sociales que se muestran en toda la web.
      </p>

      <SaveErrorBanner error={error} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* General */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-5">
              General
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="WhatsApp"
                icon={MessageCircle}
                value={data.general.whatsapp}
                onChange={(v) => updateGeneral("whatsapp", v)}
                placeholder="+34 657 87 89 17"
                hint="El enlace de WhatsApp se genera quitando espacios y símbolos."
              />
              <Field
                label="Teléfono (pie de página)"
                icon={Phone}
                value={data.general.phone}
                onChange={(v) => updateGeneral("phone", v)}
                placeholder="+34 971 853 932"
              />
              <Field
                label="Email de contacto"
                icon={Mail}
                value={data.general.email}
                onChange={(v) => updateGeneral("email", v)}
                placeholder="info@grupoenjoy.es"
              />
              <Field
                label="Email de privacidad"
                icon={Mail}
                value={data.general.privacyEmail}
                onChange={(v) => updateGeneral("privacyEmail", v)}
                placeholder="privacidad@grupoenjoy.es"
              />
            </div>
          </section>

          {/* Per venue */}
          {VENUE_LABELS.map((v) => (
            <section key={v.key} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className={`text-sm font-semibold uppercase tracking-wider mb-5 ${v.color}`}>
                {v.label}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Teléfono"
                  icon={Phone}
                  value={data.venues[v.key].phone}
                  onChange={(val) => updateVenue(v.key, "phone", val)}
                  placeholder="+34 ..."
                />
                <Field
                  label="Instagram (URL)"
                  icon={AtSign}
                  value={data.venues[v.key].instagram}
                  onChange={(val) => updateVenue(v.key, "instagram", val)}
                  placeholder="https://www.instagram.com/..."
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Google Maps (URL)"
                    icon={MapPin}
                    value={data.venues[v.key].mapsUrl}
                    onChange={(val) => updateVenue(v.key, "mapsUrl", val)}
                    placeholder="https://www.google.com/maps/..."
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
