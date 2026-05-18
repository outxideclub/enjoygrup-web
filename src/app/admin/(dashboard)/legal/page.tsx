"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface LegalSection {
  id: string;
  heading: string;
  content: string;
}

interface LegalPage {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const LEGAL_PAGES = [
  { slug: "aviso-legal", label: "Aviso Legal" },
  { slug: "privacidad", label: "Privacidad" },
  { slug: "cookies", label: "Cookies" },
  { slug: "imagenes", label: "Imágenes" },
  { slug: "condiciones-venta", label: "Condiciones de Venta" },
  { slug: "condiciones-entrada", label: "Condiciones de Entrada" },
];

export default function LegalAdminPage() {
  const [activeSlug, setActiveSlug] = useState("aviso-legal");
  const [page, setPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const loadPage = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/legal?slug=${slug}`);
      const data = await res.json();
      setPage(data);
      setExpandedSections(new Set(data.sections?.map((s: LegalSection) => s.id) || []));
    } catch {
      setPage(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(activeSlug);
  }, [activeSlug, loadPage]);

  async function handleSave() {
    if (!page) return;
    setSaving(true);
    setSaved(false);
    try {
      const updated = { ...page, lastUpdated: new Date().toISOString().split("T")[0] };
      await fetch("/api/admin/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: activeSlug, data: updated }),
      });
      setPage(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function updatePageField(field: keyof LegalPage, value: string) {
    setPage((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  function updateSection(idx: number, field: keyof LegalSection, value: string) {
    setPage((prev) => {
      if (!prev) return prev;
      const sections = [...prev.sections];
      sections[idx] = { ...sections[idx], [field]: value };
      return { ...prev, sections };
    });
  }

  function addSection() {
    const id = `section-${Date.now()}`;
    setPage((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: [...prev.sections, { id, heading: "Nueva sección", content: "" }],
      };
    });
    setExpandedSections((prev) => new Set([...prev, id]));
  }

  function removeSection(idx: number) {
    setPage((prev) => {
      if (!prev) return prev;
      return { ...prev, sections: prev.sections.filter((_, i) => i !== idx) };
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Contenido legal</h1>
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

      {/* Page tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {LEGAL_PAGES.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActiveSlug(p.slug)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeSlug === p.slug
                ? "bg-sky-600/20 text-sky-400 border border-sky-600/30"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
        </div>
      ) : page ? (
        <div className="space-y-4">
          {/* Page metadata */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Título</label>
              <input
                value={page.title}
                onChange={(e) => updatePageField("title", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                placeholder="Título de la página"
              />
            </div>
            <p className="text-xs text-zinc-500">
              Última actualización: {page.lastUpdated || "Sin fecha"}
            </p>
          </div>

          {/* Sections */}
          {page.sections.map((section, idx) => {
            const isExpanded = expandedSections.has(section.id);
            return (
              <div
                key={section.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="text-zinc-400 hover:text-white"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    value={section.heading}
                    onChange={(e) => updateSection(idx, "heading", e.target.value)}
                    className="flex-1 bg-transparent text-white font-semibold text-sm focus:outline-none"
                    placeholder="Título de sección"
                  />
                  <button
                    onClick={() => removeSection(idx)}
                    className="p-1 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-4 py-3">
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(idx, "content", e.target.value)}
                      rows={10}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 focus:border-sky-500 focus:outline-none resize-y font-mono"
                      placeholder="Contenido HTML de la sección..."
                    />
                    <p className="mt-1 text-xs text-zinc-500">
                      Puedes usar HTML: &lt;p&gt;, &lt;ul&gt;, &lt;table&gt;, etc.
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={addSection}
            className="flex items-center gap-2 rounded-xl border border-dashed border-zinc-700 px-4 py-3 text-sm text-zinc-400 hover:border-sky-600/30 hover:text-sky-400 transition-colors w-full justify-center"
          >
            <Plus className="h-4 w-4" />
            Añadir sección
          </button>
        </div>
      ) : (
        <p className="text-zinc-500">No se pudo cargar el contenido.</p>
      )}
    </div>
  );
}
