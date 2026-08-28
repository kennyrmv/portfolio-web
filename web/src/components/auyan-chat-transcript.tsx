import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ChatMessage = {
  from: "customer" | "agent";
  text: string;
  time: string;
};

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
    text: "Ya tengo el cambio preparado — solo necesito la confirmación de un compañero antes de aplicarlo porque toca datos de envío ya confirmados. En cuanto se apruebe, te aviso. Gracias por la paciencia.",
    time: "17:45",
  },
];

function Bubble({ message }: { message: ChatMessage }) {
  const isCustomer = message.from === "customer";
  return (
    <div className={cn("flex items-end gap-2", !isCustomer && "flex-row-reverse")}>
      <Avatar size="sm" className="mb-0.5">
        <AvatarFallback className={cn(isCustomer ? "" : "bg-brand/15 text-brand")}>
          {isCustomer ? "M" : "A"}
        </AvatarFallback>
      </Avatar>
      <div className={cn("flex max-w-[80%] flex-col gap-1", !isCustomer && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm text-pretty",
            isCustomer
              ? "rounded-bl-sm bg-secondary text-secondary-foreground"
              : "rounded-br-sm border border-brand/30 bg-brand/5",
          )}
        >
          {message.text}
        </div>
        <span className="px-1 font-mono text-[10px] text-muted-foreground">
          {message.time}
        </span>
      </div>
    </div>
  );
}

export function AuyanChatTranscript() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Marta Ruiz</p>
          <p className="text-xs text-muted-foreground">WhatsApp · Lunaria</p>
        </div>
        <span className="rounded-full border border-amber-500/30 bg-amber-500/5 px-2.5 py-1 font-mono text-[10px] tracking-wide text-amber-600 uppercase dark:text-amber-400">
          Pendiente de aprobación
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {MESSAGES.map((m, i) => (
          <Bubble key={i} message={m} />
        ))}
      </div>
    </div>
  );
}
