import type { NextRequest } from "next/server";
import { FourVenuesClient, FourVenuesError, type FVDiscountCode } from "@/lib/fourvenues";
import { roundCents } from "@/lib/fourvenues/pricing";
import {
  MAX_QUANTITY,
  fail,
  fourvenuesFailure,
  guard,
  int,
  isId,
  isRecord,
  ok,
  optStr,
  readJsonBody,
} from "../_shared";

// POST /api/checkout/discount { code, rateId, quantity, supplementsTotal }
// → { ok:true, discount } | { ok:false, error:"invalid_code" } (§4).

export const runtime = "nodejs";
export const maxDuration = 20;

const RL_LIMIT = 240;
const CODE_MAX = 50;
// Ningún suplemento real se acerca; por encima es ruido (1e308 acabaría como
// Infinity en la query a Fourvenues).
const MAX_SUPPLEMENTS_TOTAL = 10_000;
// Letras/dígitos de cualquier alfabeto más . _ - : suficiente para códigos
// promocionales y deja fuera separadores de ruta y espacios.
const CODE_RE = /^[\p{L}\p{N}._-]{1,50}$/u;

/** Fourvenues contesta 400/404 (o 422) cuando el código no aplica. */
function isRejectedCode(error: unknown): boolean {
  return (
    error instanceof FourVenuesError &&
    (error.statusCode === 400 || error.statusCode === 404 || error.statusCode === 422)
  );
}

export async function POST(request: NextRequest) {
  const blocked = guard(request, "discount", RL_LIMIT);
  if (blocked) return blocked;

  const body = await readJsonBody(request);
  if (!body) return fail("invalid_input", 400);

  const code = optStr(body.code, CODE_MAX);
  if (!code || !CODE_RE.test(code) || !isId(body.rateId)) return fail("invalid_input", 400);
  const quantity = int(body.quantity);
  if (quantity === null) return fail("invalid_input", 400);
  if (quantity < 1 || quantity > MAX_QUANTITY) return fail("quantity_out_of_range", 400);
  const rawSupplements = body.supplementsTotal ?? 0;
  if (
    typeof rawSupplements !== "number" ||
    !Number.isFinite(rawSupplements) ||
    rawSupplements < 0 ||
    rawSupplements > MAX_SUPPLEMENTS_TOTAL
  ) {
    return fail("invalid_input", 400);
  }
  const supplementsTotal = roundCents(rawSupplements);

  try {
    const result: unknown = await new FourVenuesClient().validateTicketDiscount(
      code,
      body.rateId,
      quantity,
      supplementsTotal,
    );
    // La API devuelve una lista; si algún día contesta el objeto suelto, se acepta.
    const discount = (
      Array.isArray(result) ? result[0] : isRecord(result) && "code" in result ? result : undefined
    ) as FVDiscountCode | undefined;
    if (!discount || typeof discount.code !== "string") return fail("invalid_code", 404);
    return ok({ discount });
  } catch (error) {
    if (isRejectedCode(error)) return fail("invalid_code", 404);
    return fourvenuesFailure("discount", error);
  }
}
