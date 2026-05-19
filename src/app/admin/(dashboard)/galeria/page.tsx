"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Check,
  Upload,
  GripVertical,
} from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

type Venue = "enjoy" | "hiru" | "outxide";

const VENUES: { key: Venue; label: string }[] = [
  { key: "enjoy", label: "Enjoy Terrace" },
  { key: "hiru", label: "Hiru Food & Drinks" },
  { key: "outxide", label: "Outxide Club" },
];

export default function GaleriaAdminPage() {
  const [activeVenue, setActiveVenue] = useState<Venue>("enjoy");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadGallery = useCallback(async (venue: Venue) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?venue=${venue}`);
      const data = await res.json();
      setImages(data);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery(activeVenue);
  }, [activeVenue, loadGallery]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venue: activeVenue, images }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const { url } = await res.json();
      if (url) {
        setImages((prev) => [...prev, { src: url, alt: file.name.replace(/\.[^.]+$/, "") }]);
      }
    } catch {
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function updateImage(idx: number, field: keyof GalleryImage, value: string) {
    setImages((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function moveImage(idx: number, dir: -1 | 1) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= images.length) return;
    setImages((prev) => {
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  }

  function addImageByUrl() {
    setImages((prev) => [...prev, { src: "", alt: "" }]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Galería</h1>
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
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
              >
                {img.src && (
                  <div className="relative aspect-[3/2] bg-zinc-800">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-3 space-y-2">
                  <input
                    value={img.src}
                    onChange={(e) => updateImage(idx, "src", e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 focus:border-sky-500 focus:outline-none"
                    placeholder="URL de imagen (/images/...)"
                  />
                  <input
                    value={img.alt}
                    onChange={(e) => updateImage(idx, "alt", e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 focus:border-sky-500 focus:outline-none"
                    placeholder="Texto alternativo"
                  />
                  <input
                    value={(img as Record<string, string>).description ?? ""}
                    onChange={(e) => updateImage(idx, "description", e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 focus:border-sky-500 focus:outline-none"
                    placeholder="Descripcion (se muestra en lightbox)"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveImage(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                      >
                        <GripVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeImage(idx)}
                      className="p-1 text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-zinc-700 px-4 py-2.5 text-sm text-zinc-400 hover:border-sky-600/30 hover:text-sky-400 transition-colors"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Subiendo..." : "Subir imagen"}
            </button>
            <button
              onClick={addImageByUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-zinc-700 px-4 py-2.5 text-sm text-zinc-400 hover:border-sky-600/30 hover:text-sky-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Añadir por URL
            </button>
          </div>
        </>
      )}
    </div>
  );
}
