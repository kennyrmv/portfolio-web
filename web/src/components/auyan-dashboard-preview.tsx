"use client";

import { useState } from "react";
import { AlertTriangle, MessageSquare, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

type View = "conversacion" | "aprobaciones";

type Message = { from: "customer" | "agent"; text: string; time: string };

const CONVERSATION: Message[] = [
  {
    from: "customer",
    text: "¡Hola! Acabo de hacer el pedido #9034 pero me equivoqué en la dirección de envío. ¿Podéis cambiarla antes de que salga? Es urgente.",
    time: "17:41",
  },
  {
    from: "agent",
    text: "¡Hola Marta! Claro, dime la dirección correcta y la actualizo ahora mismo. El pedido #9034 todavía no ha salido del almacén, así que llegamos a tiempo.",
    time: "17:42",
  },
  {
    from: "customer",
    text: "Perfecto, es Calle Alcalá 145, 3ºB, 28009 Madrid (antes puse un número mal).",
    time: "17:44",
  },
  {
    from: "agent",
    text: "Ya tengo el cambio preparado — solo necesito la confirmación de un compañero antes de aplicarlo porque toca datos de envío ya confirmados. En cuanto se apruebe, te aviso.",
    time: "17:45",
  },
];

const APPROVALS = [
  {
    title: "Cambiar dirección de envío",
    detail: "Pedido 9034 · Calle Alcalá 145, 3ºB, 28009 Madrid",
    proc: "shopify-cambio-direccion (v1)",
    time: "hace 6 min",
  },
  {
    title: "Cancelar pedido",
    detail: "Pedido 7745 · Motivo: pedido duplicado, solicitado por el cliente",
    proc: "shopify-cancelaciones (v1)",
    time: "hace 6 min",
  },
];

const NAV_ITEMS: { label: string; icon: typeof MessageSquare; view: View }[] = [
  { label: "Conversaciones", icon: MessageSquare, view: "conversacion" },
  { label: "Escalaciones", icon: AlertTriangle, view: "conversacion" },
  { label: "Aprobaciones", icon: ShieldCheck, view: "aprobaciones" },
];

function Bubble({ message }: { message: Message }) {
  const isCustomer = message.from === "customer";
  return (
    <div className={cn("flex items-end gap-2", !isCustomer && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium",
          isCustomer ? "bg-neutral-200 text-neutral-600" : "bg-emerald-100 text-emerald-700",
        )}
      >
        {isCustomer ? "M" : "A"}
      </div>
      <div className={cn("flex max-w-[78%] flex-col gap-1", !isCustomer && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-[13px] leading-snug text-pretty",
            isCustomer
              ? "rounded-bl-sm bg-neutral-100 text-neutral-800"
              : "rounded-br-sm bg-emerald-500 text-white",
          )}
        >
          {message.text}
        </div>
        <span className="px-1 font-mono text-[10px] text-neutral-400">{message.time}</span>
      </div>
    </div>
  );
}

function ConversationView() {
  return (
    <>
      <header className="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-neutral-900">
            Cambio de dirección — pedido #9034
          </p>
          <p className="text-[11px] text-neutral-400">WhatsApp · Lunaria</p>
        </div>
        <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[9px] font-medium tracking-wide text-amber-700 uppercase">
          Pendiente
        </span>
      </header>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {CONVERSATION.map((m) => (
          <Bubble key={m.time} message={m} />
        ))}
      </div>
      <div className="border-t border-neutral-200 p-3">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[12px] text-neutral-400">
          Escribe una respuesta…
        </div>
      </div>
    </>
  );
}

function ApprovalsView() {
  return (
    <>
      <header className="border-b border-neutral-200 px-4 py-3">
        <p className="text-[13px] font-medium text-neutral-900">Aprobaciones</p>
        <div className="mt-2 flex gap-4 text-[12px]">
          <span className="border-b-2 border-neutral-900 pb-1.5 font-medium text-neutral-900">
            Pendientes
          </span>
          <span className="pb-1.5 text-neutral-400">Aprobadas</span>
          <span className="pb-1.5 text-neutral-400">Rechazadas</span>
        </div>
      </header>
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {APPROVALS.map((a) => (
          <div
            key={a.title}
            className="flex flex-col gap-2.5 rounded-lg border border-neutral-200 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[9px] font-medium tracking-wide text-amber-700 uppercase">
                  Pendiente
                </span>
                <p className="truncate text-[13px] font-medium text-neutral-900">{a.title}</p>
              </div>
              <p className="mt-1 truncate text-[11px] text-neutral-500">{a.detail}</p>
              <p className="mt-0.5 font-mono text-[10px] text-neutral-400">
                {a.proc} · {a.time}
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <button className="rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white">
                Aprobar
              </button>
              <button className="rounded-md border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function AuyanDashboardPreview() {
  const [view, setView] = useState<View>("conversacion");

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-secondary/60 to-transparent p-4 sm:p-8">
      {/* mobile view switcher */}
      <div className="mb-3 flex gap-1.5 sm:hidden">
        {(["conversacion", "aprobaciones"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide uppercase transition-colors",
              view === v
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground",
            )}
          >
            {v === "conversacion" ? "Conversación" : "Aprobaciones"}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/10 dark:border-white/10">
        <div className="flex h-[440px] sm:h-[460px]">
          <aside className="hidden w-44 shrink-0 flex-col gap-4 border-r border-neutral-200 bg-neutral-50 p-3 sm:flex">
            <div className="flex items-center gap-2 px-1">
              <div className="flex size-5 items-center justify-center rounded-md bg-emerald-500 font-mono text-[10px] font-bold text-white">
                A
              </div>
              <span className="text-sm font-semibold text-neutral-900">Auyan</span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-2 py-1.5">
              <div className="flex size-5 shrink-0 items-center justify-center rounded bg-neutral-200 text-[10px] font-medium text-neutral-600">
                L
              </div>
              <span className="truncate text-[11px] text-neutral-600">Lunaria — Ecommerce</span>
            </div>
            <div>
              <p className="px-1 pb-1 font-mono text-[10px] tracking-wider text-neutral-400 uppercase">
                Atención
              </p>
              <nav className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.view === view && item.label !== "Escalaciones";
                  return (
                    <button
                      key={item.label}
                      onClick={() => setView(item.view)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] transition-colors",
                        isActive
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-600 hover:bg-neutral-200/60",
                      )}
                    >
                      <item.icon className="size-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="mt-auto flex items-center gap-2 border-t border-neutral-200 px-1 pt-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-neutral-800 text-[10px] font-medium text-white">
                N
              </div>
              <span className="truncate text-[11px] text-neutral-500">super-admin@auyan…</span>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col bg-white">
            {view === "conversacion" ? <ConversationView /> : <ApprovalsView />}
          </div>
        </div>
      </div>
    </div>
  );
}
