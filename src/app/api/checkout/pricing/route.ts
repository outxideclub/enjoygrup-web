import type { NextRequest } from "next/server";
import { FourVenuesClient } from "@/lib/fourvenues";
import { MAX_QUANTITY, fail, fourvenuesFailure, guard, isId, ok } from "../_shared";

// GET /api/checkout/pricing?rateId&quantity → { ok, lines: FVPricingLine[] }
// (CHECKOUT-PROPIO.md §4). Desglose oficial por entrada para que el resumen
// cuadre céntimo a céntimo con lo que cobra Fourvenues.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

// Se consulta en cada cambio de cantidad: límite holgado por IP cada 10 min.
const RL_LIMIT = 240;

export async function GET(request: NextRequest) {
  const blocked = guard(request, "pricing", RL_LIMIT);
  if (blocked) return blocked;

  const params = request.nextUrl.searchParams;
  const rateId = params.get("rateId");
  const rawQuantity = params.get("quantity");
  if (!isId(rateId) || rawQuantity === null || !/^\d{1,3}$/.test(rawQuantity)) {
    return fail("invalid_input", 400);
  }
  const quantity = Number(rawQuantity);
  if (quantity < 1 || quantity > MAX_QUANTITY) return fail("quantity_out_of_range", 400);

  try {
    const lines = await new FourVenuesClient().getPricingInfo(rateId, quantity);
    return ok({ lines: Array.isArray(lines) ? lines : [] });
  } catch (error) {
    return fourvenuesFailure("pricing", error);
  }
}
