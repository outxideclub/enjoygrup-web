"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Check } from "lucide-react";
import { SaveErrorBanner, saveErrorFromResponse, type SaveError } from "../save-error";

interface VenueInfo {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  heroPoster?: string;
  hours: string;
  address: string;
  phone: string;
  instagram: string;
  googleMaps: string;
}

type Venue = "enjoy" | "hiru" | "outxide";

const VENUES: { key: Venue; label: string }[] = [
  { key: "enjoy", label: "Enjoy Terrace" },
  { key: "hiru", label: "Hiru Food & Drinks" },
  { key: "outxide", label: "Outxide Club" },
];

const FIELDS: { key: keyof VenueInfo; label: string; type?: "textarea" }[] = [
  { key: "name", label: "Nombre" },
  { key: "subtitle", label: "Subtítulo" },
  { key: "description", label: "Descripción", type: "textarea" },
  { key: "hours", label: "Horario" },
  { key: "address", label: "Dirección" },
  { key: "phone", label: "Teléfono" },
  { key: "instagram", label: "Instagram URL" },
  { key: "googleMaps", label: "Google Maps URL" },
  { key: "heroImage", label: "Imagen hero" },
  { key: "heroVideo", label: "Video hero (URL)" },
  { key: "heroPoster", label: "Poster del video" },
];

export default function InfoAdminPage() {
  const [activeVenue, setActiveVenue] = useState<Venue>("enjoy");
  const [info, setInfo] = useState<VenueInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<SaveError | null>(null);

  useEffect(() => {
    // AbortController evita la carrera al cambiar de local rápido:
    // la respuesta antigua se cancela y no puede pisar a la nueva
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/venues?venue=${activeVenue}`, {
          signal: ac.signal,
        });
        const data = await res.json();
        setInfo(data);
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return; // petición cancelada
        setInfo(null);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [activeVenue]);

  async function handleSave() {
    if (!info) return;
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/admin/venues", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venue: activeVenue, data: info }),
      });
      if (!res.ok) {
        setSaveError(await saveErrorFromResponse(res, "Error al guardar"));
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setSaveError({ message: "Error de conexión al guardar" });
    } finally {
      setSaving(false);
    }
  }

  function updateField(key: keyof VenueInfo, value: string) {
    setInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Información de locales</h1>
        <button
          onClick={handleSave}
          disabled={saving}
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

      <SaveErrorBanner error={saveError} />

      {/* Venue tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {VENUES.map((v) => (
          <button
            key={v.key}
            onClick={() => setActiveVenue(v.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeVenue === v.key
                ? "bg-sky-600/20 text-sky-400 border border-sky-600/30"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
        </div>
      ) : info ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-5">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={(info[field.key] as string) || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none resize-none"
                />
              ) : (
                <input
                  value={(info[field.key] as string) || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-500">No se pudo cargar la información.</p>
      )}
    </div>
  );
}
