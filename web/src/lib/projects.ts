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
      "Agente multi-tenant de soporte para e-commerce que resuelve tickets y toma acciones reales con guardrails.",
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
      "Cursos en móvil estilo Duolingo, generados y adaptados al nivel del estudiante por agentes de IA.",
    highlights: [
      "Aprendizaje stateful",
      "Repetición espaciada",
      "Model routing por dificultad",
      "Gamificación",
    ],
    stack: ["Python", "Claude", "Agentes de IA"],
    status: "Building in public",
    href: "/proyectos/maraca",
    featured: true,
  },
];
