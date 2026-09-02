export const site = {
  name: "Kenny Medina",
  role: "Ingeniero de agentes de IA",
  // Fuente única de la URL pública. Alimenta metadataBase, el sitemap, el
  // robots.txt y las URLs absolutas de las imágenes OG. Al conectar el dominio
  // propio, cambiar SOLO esta línea — y después purgar la caché del Post
  // Inspector de LinkedIn, que guarda la preview vieja de forma agresiva.
  url: "https://portfolio-opal-rho-13.vercel.app",
  intro:
    "Construyo Auyan —un agente de soporte multi-tenant para e-commerce— y Maraca, una app que convierte cualquier tema en un curso con IA, que armo en público. Me enfoco en lo que lleva un agente a producción: evals, observabilidad y human-in-the-loop.",
  email: "kennyrmv@gmail.com",
  github: "https://github.com/kennyrmv",
  linkedin: "https://www.linkedin.com/in/kennymedina/",
  // Sin cuenta de booking todavía — placeholder hasta tenerla.
  booking: null as string | null,
} as const;
