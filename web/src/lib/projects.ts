export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /**
   * Resumen corto: alimenta la imagen Open Graph, la og:description y la meta
   * description. El tagline es demasiado largo para los tres sitios.
   */
  ogSummary: string;
  /** Pregunta de cierre del case study. Engancha con lo que se acaba de leer. */
  outro: string;
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
    ogSummary:
      "Agente de soporte para e-commerce que resuelve tickets y ejecuta acciones reales, con una persona aprobando lo delicado.",
    outro:
      "¿Tienes un agente que funciona en las pruebas pero no te atreves a soltarlo con clientes reales?",
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
    ogSummary:
      "App móvil que convierte cualquier tema en un curso y lo adapta a los errores de quien aprende.",
    outro:
      "¿Se te ocurre un producto donde la IA tenga que adaptarse a cada persona que lo usa?",
    stack: ["Expo / React Native", "Supabase Edge Functions", "Postgres", "Claude Opus 4.8"],
    status: "Building in public",
    href: "/proyectos/maraca",
    featured: true,
  },
];
