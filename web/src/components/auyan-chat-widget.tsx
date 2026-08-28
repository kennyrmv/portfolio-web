"use client";

import { MessageCircle, Send } from "lucide-react";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { MessageAvatar, MessageGroup } from "@/components/ui/message";
import { cn } from "@/lib/utils";

// Widget de chat embebible tal y como lo vería un cliente de Lunaria en su
// propia web — misma conversación y misma paleta ("Cobalto Salto Ángel") que
// el panel de Auyan de al lado, que es lo que vería el equipo de soporte.

type ChatMessage = { from: "customer" | "agent"; text: string; time: string };

const MESSAGES: ChatMessage[] = [
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

export function AuyanChatWidget() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-950/10">
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

      <div className="flex-1 space-y-4 overflow-y-auto bg-stone-50 p-4">
        <MessageGroup>
          {MESSAGES.map((m) => {
            const isCustomer = m.from === "customer";
            return (
              <div key={m.time} className={cn("flex items-end gap-2", !isCustomer && "flex-row-reverse")}>
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
