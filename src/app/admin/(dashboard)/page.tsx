"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Save,
  ChevronDown,
  ChevronRight,
  Loader2,
  Check,
} from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price?: string;
}

interface MenuSection {
  id: string;
  category: string;
  icon: string;
  subtitle?: string;
  type?: "cocktails" | "drinks";
  items: (MenuItem | string)[];
}

type MenuKey = "enjoy-drinks" | "enjoy-shisha" | "hiru";

const MENUS: { key: MenuKey; label: string }[] = [
  { key: "enjoy-drinks", label: "Enjoy · Cocktails & Bebidas" },
  { key: "enjoy-shisha", label: "Enjoy · Shisha" },
  { key: "hiru", label: "Hiru · Carta" },
];

export default function CartaAdminPage() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("hiru");
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const loadMenu = useCallback(async (menu: MenuKey) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/menus?menu=${menu}`);
      const data = await res.json();
      setSections(data);
      setExpandedSections(new Set(data.map((s: MenuSection) => s.id)));
    } catch {
      setSections([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenu(activeMenu);
  }, [activeMenu, loadMenu]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/menus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menu: activeMenu, sections }),
      });
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

  function updateSection(idx: number, field: keyof MenuSection, value: string) {
    setSections((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }

  function addSection() {
    const id = `section-${Date.now()}`;
    setSections((prev) => [
      ...prev,
      { id, category: "Nueva sección", icon: "Utensils", items: [] },
    ]);
    setExpandedSections((prev) => new Set([...prev, id]));
  }

  function removeSection(idx: number) {
    setSections((prev) => prev.filter((_, i) => i !== idx));
  }

  function moveSection(idx: number, dir: -1 | 1) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= sections.length) return;
    setSections((prev) => {
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  }

  function updateItem(sectionIdx: number, itemIdx: number, field: string, value: string) {
    setSections((prev) => {
      const next = [...prev];
      const section = { ...next[sectionIdx] };
      const items = [...section.items];
      const item = items[itemIdx];
      if (typeof item === "string") {
        items[itemIdx] = value;
      } else {
        items[itemIdx] = { ...item, [field]: value };
      }
      section.items = items;
      next[sectionIdx] = section;
      return next;
    });
  }

  function addItem(sectionIdx: number) {
    setSections((prev) => {
      const next = [...prev];
      const section = { ...next[sectionIdx] };
      const items = [...section.items];
      if (section.type === "drinks") {
        items.push("");
      } else {
        const hasPrice = activeMenu === "hiru";
        items.push({
          name: "",
          description: "",
          ...(hasPrice ? { price: "" } : {}),
        });
      }
      section.items = items;
      next[sectionIdx] = section;
      return next;
    });
  }

  function removeItem(sectionIdx: number, itemIdx: number) {
    setSections((prev) => {
      const next = [...prev];
      const section = { ...next[sectionIdx] };
      section.items = section.items.filter((_, i) => i !== itemIdx);
      next[sectionIdx] = section;
      return next;
    });
  }

  function moveItem(sectionIdx: number, itemIdx: number, dir: -1 | 1) {
    const section = sections[sectionIdx];
    const newIdx = itemIdx + dir;
    if (newIdx < 0 || newIdx >= section.items.length) return;
    setSections((prev) => {
      const next = [...prev];
      const s = { ...next[sectionIdx] };
      const items = [...s.items];
      [items[itemIdx], items[newIdx]] = [items[newIdx], items[itemIdx]];
      s.items = items;
      next[sectionIdx] = s;
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Carta / Menú</h1>
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

      {/* Menu selector tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {MENUS.map((m) => (
          <button
            key={m.key}
            onClick={() => setActiveMenu(m.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeMenu === m.key
                ? "bg-sky-600/20 text-sky-400 border border-sky-600/30"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section, si) => {
            const isExpanded = expandedSections.has(section.id);
            return (
              <div
                key={section.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
              >
                {/* Section header */}
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
                    value={section.category}
                    onChange={(e) => updateSection(si, "category", e.target.value)}
                    className="flex-1 bg-transparent text-white font-semibold text-sm focus:outline-none"
                    placeholder="Nombre de sección"
                  />

                  <span className="text-xs text-zinc-500">
                    {section.items.length} items
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveSection(si, -1)}
                      disabled={si === 0}
                      className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                      title="Mover arriba"
                    >
                      <GripVertical className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => removeSection(si)}
                      className="p-1 text-zinc-500 hover:text-red-400"
                      title="Eliminar sección"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Section items */}
                {isExpanded && (
                  <div className="px-4 py-3 space-y-2">
                    {section.subtitle !== undefined && (
                      <input
                        value={section.subtitle || ""}
                        onChange={(e) => updateSection(si, "subtitle", e.target.value)}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 focus:border-sky-500 focus:outline-none mb-3"
                        placeholder="Subtítulo (ej: Acompañados de patata frita)"
                      />
                    )}

                    {section.items.map((item, ii) =>
                      typeof item === "string" ? (
                        // Simple string item (spirits/drinks list)
                        <div key={ii} className="flex items-center gap-2">
                          <input
                            value={item}
                            onChange={(e) => updateItem(si, ii, "name", e.target.value)}
                            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                            placeholder="Nombre"
                          />
                          <button
                            onClick={() => moveItem(si, ii, -1)}
                            disabled={ii === 0}
                            className="p-1.5 text-zinc-500 hover:text-white disabled:opacity-30"
                          >
                            <GripVertical className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => removeItem(si, ii)}
                            className="p-1.5 text-zinc-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        // Object item (cocktails/food)
                        <div
                          key={ii}
                          className="flex flex-wrap items-start gap-2 rounded-lg border border-zinc-800 bg-zinc-800/30 p-3"
                        >
                          <input
                            value={item.name}
                            onChange={(e) => updateItem(si, ii, "name", e.target.value)}
                            className="flex-1 min-w-[140px] rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                            placeholder="Nombre"
                          />
                          <input
                            value={item.description}
                            onChange={(e) => updateItem(si, ii, "description", e.target.value)}
                            className="flex-[2] min-w-[200px] rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 focus:border-sky-500 focus:outline-none"
                            placeholder="Descripción"
                          />
                          {item.price !== undefined && (
                            <input
                              value={item.price || ""}
                              onChange={(e) => updateItem(si, ii, "price", e.target.value)}
                              className="w-24 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-sky-400 font-medium focus:border-sky-500 focus:outline-none"
                              placeholder="Precio"
                            />
                          )}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveItem(si, ii, -1)}
                              disabled={ii === 0}
                              className="p-1.5 text-zinc-500 hover:text-white disabled:opacity-30"
                            >
                              <GripVertical className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => removeItem(si, ii)}
                              className="p-1.5 text-zinc-500 hover:text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ),
                    )}

                    <button
                      onClick={() => addItem(si)}
                      className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 py-2 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Añadir item
                    </button>
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
      )}
    </div>
  );
}
