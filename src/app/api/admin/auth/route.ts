import { NextRequest, NextResponse } from "next/server";
import { createSession, destroySession, checkPassword, isAllowedAdminOrigin } from "@/lib/auth";
import {
  getClientIp,
  isRateLimited,
  registerFailedAttempt,
  clearAttempts,
  failDelay,
} from "@/lib/admin-rate-limit";

export async function POST(req: NextRequest) {
  // Protección de fuerza bruta: máx. 5 intentos fallidos por IP cada 15 min.
  // (Límite por instancia en serverless — ver nota en src/lib/admin-rate-limit.ts)
  const ip = getClientIp(req);
  const { limited, retryAfterSeconds } = isRateLimited(ip);
  if (limited) {
    return NextResponse.json(
      { error: "Demasiados intentos fallidos. Vuelve a intentarlo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  if (!isAllowedAdminOrigin(req.headers.get("origin"), req.headers.get("host"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { password } = await req.json();
    if (!password || typeof password !== "string" || !checkPassword(password)) {
      registerFailedAttempt(ip);
      // Pequeño retardo constante para encarecer los intentos automatizados
      await failDelay();
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }
    clearAttempts(ip);
    await createSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error de autenticación" }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
