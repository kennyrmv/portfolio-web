export type ReplayEvent =
  | { kind: "user"; text: string }
  | { kind: "intent"; label: string; confidence: number; model: string }
  | { kind: "procedure"; label: string }
  | { kind: "reasoning"; text: string }
  | { kind: "skill"; name: string; level: "L1" | "L2" | "L3"; input: string; result?: string }
  | { kind: "approval"; action: string }
  | { kind: "escalation"; reason: string }
  | { kind: "response"; text: string }
  | { kind: "judge"; scores: { label: string; value: number }[] };

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  events: ReplayEvent[];
};

export const scenarios: Scenario[] = [
  {
    id: "order-status",
    title: "Consulta de pedido",
    summary:
      "Camino feliz: el agente lee el estado del pedido con una skill de solo lectura (L1) y responde.",
    events: [
      {
        kind: "user",
        text: "Hola, ¿dónde está mi pedido? Compré hace 4 días y no me llega nada.",
      },
      { kind: "intent", label: "consulta_envío", confidence: 0.97, model: "Haiku 4.5" },
      { kind: "procedure", label: "order-tracking" },
      {
        kind: "reasoning",
        text: "El cliente pregunta por el estado de un envío. Busco su pedido más reciente por email.",
      },
      {
        kind: "skill",
        name: "get_order",
        level: "L1",
        input: "email: a***@gmail.com",
        result: "#10472 · enviado · SEUR 8821… · entrega estimada: mañana",
      },
      {
        kind: "response",
        text: "¡Hola! Tu pedido #10472 ya va en camino con SEUR (seguimiento 8821…) y la entrega estimada es mañana. ¿Te ayudo con algo más?",
      },
      {
        kind: "judge",
        scores: [
          { label: "Reasoning", value: 98 },
          { label: "Knowledge", value: 96 },
          { label: "Tools", value: 99 },
          { label: "Brand voice", value: 95 },
        ],
      },
    ],
  },
  {
    id: "refund-approval",
    title: "Devolución con aprobación",
    summary:
      "Acción que mueve dinero: el reembolso (L3) queda detrás de un gate de aprobación humana.",
    events: [
      {
        kind: "user",
        text: "Quiero devolver las zapatillas, me quedan pequeñas. Y que me reembolsen, por favor.",
      },
      {
        kind: "intent",
        label: "devolución_reembolso",
        confidence: 0.93,
        model: "Haiku 4.5",
      },
      { kind: "procedure", label: "returns" },
      {
        kind: "reasoning",
        text: "Pide iniciar devolución y reembolso. La devolución (L2) es reversible; el reembolso (L3) mueve dinero y requiere aprobación humana.",
      },
      {
        kind: "skill",
        name: "start_return",
        level: "L2",
        input: "#10488 · zapatillas · motivo: talla",
        result: "RET-3391 creada · etiqueta de envío generada",
      },
      { kind: "approval", action: "Reembolso de 79,90€ · pedido #10488" },
      {
        kind: "skill",
        name: "issue_refund",
        level: "L3",
        input: "#10488 · 79,90€",
        result: "reembolso emitido · 3-5 días hábiles",
      },
      {
        kind: "response",
        text: "Listo: generé tu devolución (RET-3391) y te envié la etiqueta por email. El reembolso de 79,90€ quedó aprobado y lo verás en tu cuenta en 3-5 días hábiles.",
      },
      {
        kind: "judge",
        scores: [
          { label: "Reasoning", value: 97 },
          { label: "Knowledge", value: 94 },
          { label: "Tools", value: 99 },
          { label: "Brand voice", value: 96 },
        ],
      },
    ],
  },
  {
    id: "escalation",
    title: "Escala a un humano",
    summary:
      "El agente reconoce su límite: caso con criterio y riesgo de churn → escala con contexto completo.",
    events: [
      {
        kind: "user",
        text: "Llevo 3 emails sin respuesta, esto es vergonzoso. Quiero hablar con una persona YA o cancelo todo.",
      },
      { kind: "intent", label: "queja_escalado", confidence: 0.88, model: "Haiku 4.5" },
      { kind: "procedure", label: "complaint-handling" },
      {
        kind: "skill",
        name: "get_customer_history",
        level: "L1",
        input: "email: m***@gmail.com",
        result: "3 tickets en 5 días · cliente recurrente (12 pedidos)",
      },
      {
        kind: "reasoning",
        text: "Cliente recurrente molesto, con histórico de fricción y amenaza de cancelación. Requiere criterio humano: fuera del alcance seguro del agente.",
      },
      {
        kind: "escalation",
        reason:
          "Riesgo de churn + amenaza de cancelación. Escalo al equipo del cliente con el contexto completo y la razón registrada.",
      },
      {
        kind: "response",
        text: "Entiendo tu molestia y lo siento de verdad. Te estoy pasando ahora mismo con una persona del equipo que revisará tu caso completo; te responde en breve.",
      },
      {
        kind: "judge",
        scores: [
          { label: "Reasoning", value: 99 },
          { label: "Knowledge", value: 92 },
          { label: "Tools", value: 97 },
          { label: "Brand voice", value: 98 },
        ],
      },
    ],
  },
];
