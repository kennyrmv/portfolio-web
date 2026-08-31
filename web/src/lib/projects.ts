export type Project = {
  slug: string;
  name: string;
  tagline: string;
  highlights: string[];
  stack: string[];
  status: string;
  href: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "auyan",
    name: "Auyan",
    tagline:
      "Agente de soporte para e-commerce, capaz de atender a varios negocios desde el mismo sistema, que resuelve tickets y ejecuta acciones reales sin salirse de límites de seguridad claros.",
    highlights: [
      "RAG por tenant",
      "Eval harness (LLM-as-judge)",
      "Human approval en acciones sensibles",
      "Supervisor pattern",
      "Observabilidad LangSmith",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Claude", "Supabase", "pgvector"],
    status: "En staging",
    href: "/proyectos/auyan",
    featured: true,
  },
  {
    slug: "maraca",
    name: "Maraca",
    tagline:
      "App móvil que convierte cualquier tema en un curso, generado y adaptado a tus errores por un agente de IA.",
    highlights: [
      "Grafo sin framework de grafos",
      "Generación perezosa + adaptativa (ZPD)",
      "Estado del agente tipado en Postgres",
      "Structured outputs + Zod",
    ],
    stack: ["Expo / React Native", "Supabase Edge Functions", "Postgres", "Claude Opus 4.8"],
    status: "Building in public",
    href: "/proyectos/maraca",
    featured: true,
  },
];
