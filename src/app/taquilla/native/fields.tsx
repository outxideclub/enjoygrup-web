"use client";

import type { ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Controles de formulario del checkout propio. Móvil primero: altura ≥ 48 px
// en inputs y ≥ 44 px en botones; text-base evita el auto-zoom de iOS (además
// del cerrojo de globals.css). Cada error se anuncia por aria-live y se enlaza
// al control con aria-describedby / aria-invalid. Ningún texto funcional baja
// de 14 px (text-sm): el zoom está bloqueado en la web y esta es la única
// pantalla con dinero de por medio.

export const INPUT_CLASS =
  "w-full min-h-12 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-outxide/60 focus:ring-2 focus:ring-outxide/30 aria-[invalid=true]:border-red-500/60";

interface ShellProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, required, hint, children }: ShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
        {required && (
          <span aria-hidden className="text-outxide">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {/* Región viva SIEMPRE presente: el lector anuncia el error al aparecer. */}
      <div id={`${id}-error`} aria-live="polite">
        {error && (
          <p data-testid="field-error" className="mt-1 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids: string[] = [];
  if (error) ids.push(`${id}-error`);
  if (hint) ids.push(`${id}-hint`);
  return ids.length ? ids.join(" ") : undefined;
}

interface TextFieldProps {
  id: string;
  testId: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  hint?: string;
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  placeholder?: string;
  maxLength?: number;
}

export function TextField({
  id,
  testId,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  hint,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  maxLength = 200,
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} required={required} hint={hint}>
      <input
        id={id}
        data-testid={testId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy(id, error, hint)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        maxLength={maxLength}
        className={INPUT_CLASS}
      />
    </FieldShell>
  );
}

interface TextAreaFieldProps {
  id: string;
  testId: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
}

export function TextAreaField({
  id,
  testId,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  maxLength = 500,
}: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} required={required}>
      <textarea
        id={id}
        data-testid={testId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy(id, error)}
        maxLength={maxLength}
        rows={3}
        className={cn(INPUT_CLASS, "resize-y")}
      />
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: string;
  testId: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function SelectField({
  id,
  testId,
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  required,
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} required={required}>
      <select
        id={id}
        data-testid={testId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy(id, error)}
        className={cn(INPUT_CLASS, "appearance-none bg-zinc-950")}
      >
        <option value="">{placeholder ?? "—"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

interface CheckFieldProps {
  id: string;
  testId: string;
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  required?: boolean;
  /** Texto de error (ya traducido); su presencia marca aria-invalid. */
  error?: string;
  /** Contenido auxiliar bajo la etiqueta (enlaces legales), fuera del <label>. */
  description?: ReactNode;
}

/**
 * Casilla con etiqueta táctil (≥ 44 px de alto en toda la fila). El error se
 * dice con texto (no solo color) y se enlaza al control; los enlaces van en
 * `description`, fuera del label, para que pulsar la fila marque la casilla y
 * no abra otra pestaña.
 */
export function CheckField({ id, testId, label, checked, onChange, onBlur, required, error, description }: CheckFieldProps) {
  const ids: string[] = [];
  if (description) ids.push(`${id}-desc`);
  if (error) ids.push(`${id}-error`);
  return (
    <div>
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 py-1.5">
        <input
          id={id}
          data-testid={testId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : false}
          aria-describedby={ids.length ? ids.join(" ") : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 accent-outxide"
        />
        <span className={cn("text-sm leading-relaxed", error ? "text-red-300" : "text-white/80")}>{label}</span>
      </label>
      {description && (
        <div id={`${id}-desc`} className="pl-8 text-sm leading-relaxed text-white/70">
          {description}
        </div>
      )}
      <div id={`${id}-error`} aria-live="polite" className="pl-8">
        {error && (
          <p data-testid="field-error" className="mt-0.5 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

interface QtyStepperProps {
  /** Prefijo de los data-testid: qty-* (entradas) o people-* (mesas y listas). */
  prefix: "qty" | "people";
  /** Nombre del grupo, con contexto ("Cantidad · ENTRADA COPA"). */
  label: string;
  /** Nombres con palabras de los botones ("Quitar una entrada" / "Añadir una entrada"). */
  lessLabel: string;
  moreLabel: string;
  /** Texto que se anuncia al cambiar ("2 entradas"); si falta, el número. */
  valueLabel?: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
}

/**
 * Selector de cantidad. En los límites los botones quedan aria-disabled y no
 * hacen nada (no `disabled`): un botón que se deshabilita mientras tiene el
 * foco lo pierde hacia <body> y el usuario de teclado/lector se desorienta.
 */
export function QtyStepper({
  prefix,
  label,
  lessLabel,
  moreLabel,
  valueLabel,
  value,
  onMinus,
  onPlus,
  minusDisabled,
  plusDisabled,
}: QtyStepperProps) {
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 aria-disabled:cursor-not-allowed aria-disabled:opacity-30 aria-disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-outxide";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-0.5">
      <button
        type="button"
        data-testid={`${prefix}-minus`}
        onClick={() => {
          if (!minusDisabled) onMinus();
        }}
        aria-disabled={minusDisabled || undefined}
        aria-label={lessLabel}
        className={btn}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      {/* El número visible queda como texto puro (los e2e lo leen); el lector
          recibe el cambio con contexto ("2 entradas") desde la región sr-only. */}
      <span
        data-testid={`${prefix}-value`}
        aria-hidden={valueLabel ? true : undefined}
        aria-live={valueLabel ? undefined : "polite"}
        className="min-w-8 text-center text-base font-semibold tabular-nums text-white"
      >
        {value}
      </span>
      {valueLabel && (
        <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {valueLabel}
        </span>
      )}
      <button
        type="button"
        data-testid={`${prefix}-plus`}
        onClick={() => {
          if (!plusDisabled) onPlus();
        }}
        aria-disabled={plusDisabled || undefined}
        aria-label={moreLabel}
        className={btn}
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

/**
 * Honeypot anti-bots: campo "website" fuera de pantalla que un humano nunca
 * rellena. El servidor rechaza cualquier envío que llegue con valor.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
