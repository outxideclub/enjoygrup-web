import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const VALID_MAGIC = [
  { bytes: [0xFF, 0xD8, 0xFF], ext: "jpeg" },
  { bytes: [0x89, 0x50, 0x4E, 0x47], ext: "png" },
  { bytes: [0x47, 0x49, 0x46], ext: "gif" },
  { bytes: [0x52, 0x49, 0x46, 0x46], ext: "webp" },
];

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No se envió archivo" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Archivo demasiado grande (máx 5MB)" }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: "Formato no permitido" }, { status: 400 });
    }

    // Read file once into buffer for both validation and writing
    const buffer = Buffer.from(await file.arrayBuffer());

    // Magic bytes validation — reject files whose content doesn't match an image format
    const isValidMagic = VALID_MAGIC.some((m) =>
      m.bytes.every((b, i) => buffer[i] === b),
    );
    if (!isValidMagic) {
      return NextResponse.json({ error: "Invalid file content" }, { status: 400 });
    }

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;
    const filePath = path.join(UPLOAD_DIR, safeName);
    await writeFile(filePath, buffer);

    const publicUrl = `/images/uploads/${safeName}`;
    return NextResponse.json({ url: publicUrl });
  } catch {
    return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
  }
}
