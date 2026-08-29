"use client";

import { MessageCircle, Send } from "lucide-react";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { MessageAvatar, MessageGroup } from "@/components/ui/message";
import { cn } from "@/lib/utils";

// Widget de chat embebible tal y como lo vería un cliente de Lunaria en su
// propia web — misma paleta ("Cobalto Salto Ángel") que el dashboard de al
// lado, que es lo que vería el equipo de soporte. Conversación de ejemplo:
// consulta de envío resuelta por el agente sin escalar (skill L1, solo
// lectura) — dato ficticio, no viene de ningún cliente real.

type ChatMessage = { from: "customer" | "agent"; text: string; time: string };

const MESSAGES: ChatMessage[] = [
  {
    from: "customer",
    text: "¡Hola! Quería saber en qué punto está mi pedido #8821 — lo pedí hace 4 días y todavía no he recibido nada.",
    time: "12:03",
  },
  {
    from: "agent",
    text: "¡Hola Laura! Dame un segundo... Tu pedido #8821 salió del almacén ayer y va en camino con Correos Express. Entrega estimada: mañana antes de las 14:00.",
    time: "12:03",
  },
  {
    from: "customer",
    text: "Genial, gracias. ¿Me pasas el número de seguimiento?",
    time: "12:04",
  },
  {
    from: "agent",
    text: "Claro: ES00284471136 — con eso lo sigues en tiempo real. ¿Necesitas algo más?",
    time: "12:04",
  },
  {
    from: "customer",
    text: "No, eso era todo. ¡Gracias!",
    time: "12:05",
  },
  {
    from: "agent",
    text: "¡De nada, Laura! Que disfrutes tu pedido.",
    time: "12:05",
  },
];

export function AuyanChatWidget() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-950/10 [color-scheme:light]">
      <div className="flex items-center gap-2.5 bg-blue-600 px-4 py-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
          <MessageCircle className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-white">Lunaria — Ecommerce</p>
          <p className="flex items-center gap-1.5 text-[11px] text-blue-100">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Te responden en segundos
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-stone-50 p-4 [color-scheme:light]">
        <MessageGroup>
          {MESSAGES.map((m, i) => {
            const isCustomer = m.from === "customer";
            return (
              <div key={i} className={cn("flex items-end gap-2", !isCustomer && "flex-row-reverse")}>
                <MessageAvatar
                  className={cn(
                    "size-6 min-w-6",
                    isCustomer ? "bg-stone-200 text-stone-600" : "bg-blue-100 text-blue-700",
                  )}
                >
                  <span className="text-[10px] font-medium">{isCustomer ? "M" : "A"}</span>
                </MessageAvatar>
                <div className={cn("flex max-w-[75%] flex-col gap-1", !isCustomer && "items-end")}>
                  <Bubble variant="outline">
                    <BubbleContent
                      className={
                        isCustomer
                          ? "!border-stone-200 !bg-white !text-stone-800"
                          : "!border-transparent !bg-blue-600 !text-white"
                      }
                    >
                      {m.text}
                    </BubbleContent>
                  </Bubble>
                  <span className="px-1 font-mono text-[10px] text-stone-400">{m.time}</span>
                </div>
              </div>
            );
          })}
        </MessageGroup>
      </div>

      <div className="flex items-center gap-2 border-t border-stone-200 bg-white p-3">
        <div className="flex-1 truncate rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-[12px] text-stone-400">
          Escribe tu mensaje…
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
