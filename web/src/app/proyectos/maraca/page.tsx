import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MaracaArchitecture } from "@/components/maraca-architecture";
import { ProjectOutro } from "@/components/project-outro";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const project = projects.find((p) => p.slug === "maraca")!;

export const metadata: Metadata = {
  title: `${project.name} — Case study`,
  description: project.ogSummary,
  alternates: { canonical: project.href },
  // Ojo: declarar openGraph aquí NO se fusiona con el del layout raíz, lo
  // sustituye entero. Por eso siteName y locale se repiten — si se omiten,
  // desaparecen de la tarjeta y queda anónima.
  openGraph: {
    type: "article",
    locale: "es_ES",
    siteName: site.name,
    url: project.href,
    title: `${project.name} — Case study`,
    description: project.ogSummary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${project.name} — Case study`,
    description: project.ogSummary,
  },
};

const decisions: [string, string][] = [
  [
    "Es un grafo, pero sin framework de grafos",
    "El curso avanza por pasos encadenados y con un ciclo que se retroalimenta — que es, conceptualmente, un grafo. Pero con una sola bifurcación real y un solo ciclo, montar un framework de grafos y un servicio aparte habría sido infraestructura para un problema que no tengo. La base de datos guarda el estado, y cada paso es una función. Saber cuándo NO meter el framework de moda es parte del diseño. (Por dentro: Postgres como estado tipado, Realtime para el streaming y Edge Functions como nodos, en vez de LangGraph.)",
  ],
  [
    "El índice se genera entero; cada lección, al abrirla",
    "El esquema del curso se crea de una sola vez —es barato y deja ver el camino completo desde el principio—. El contenido de cada lección se escribe en el momento de abrirla, teniendo en cuenta lo que ya has fallado antes. Sale más barato y enseña mejor: una lección hecha a tu medida rinde más que una fija.",
  ],
  [
    "Lo que devuelve el modelo se valida dos veces",
    "La API garantiza que el JSON venga con la forma correcta, pero no que tenga sentido. Una segunda validación comprueba lo que la primera ignora — que los rangos sean válidos, que la respuesta marcada como correcta exista de verdad— y unifica cómo se nombra cada concepto, para que una variación del modelo no ensucie el registro de lo que sabes. (Por dentro: structured outputs de la API más esquemas Zod.)",
  ],
  [
    "El progreso lo lleva el servidor, no la app",
    "Los puntos, la racha y el desbloqueo de lecciones solo se escriben desde el servidor, y repetir la misma llamada no los duplica. La app no puede regalarse puntos ni saltarse el orden del curso aunque alguien la manipule.",
  ],
  [
    "Un solo modelo, esfuerzo variable",
    "Aquí no reparto el trabajo entre modelos baratos y caros: uso el mismo para todo, pero pidiéndole que piense más o menos según la tarea — a fondo para diseñar el curso, a medio gas para escribir una lección. En esta primera versión prioricé la calidad de lo que se enseña sobre el ahorro, porque el volumen todavía es bajo. (Por dentro: Claude Opus 4.8 con thinking adaptativo, effort alto y medio.)",
  ],
];
const stack = [
  "Expo / React Native",
  "Supabase Edge Functions (Deno)",
  "Postgres + RLS",
  "Claude Opus 4.8",
  "Structured outputs",
  "Zod",
  "Realtime",
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export default function MaracaPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <Link
        href="/#proyectos"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Proyectos
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="font-mono text-[11px] font-normal">
          {project.status}
        </Badge>
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Proyecto propio · app móvil
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Maraca
      </h1>
      <p className="mt-3 text-lg text-pretty text-muted-foreground">
        {project.tagline}
      </p>

      <section className="mt-10">
        <Eyebrow>Arquitectura · el agente</Eyebrow>
        <p className="mt-2 mb-4 text-sm text-pretty text-muted-foreground">
          El corazón de Maraca: los pasos que sigue el agente y el ciclo que
          adapta cada lección a los errores de quien aprende. Sin framework de
          grafos.
        </p>
        <MaracaArchitecture />
      </section>

      <section className="mt-12">
        <Eyebrow>El problema</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Las apps tipo Duolingo te hacen repetir hasta memorizar, pero rara vez
          te <em>enseñan</em>; y los cursos fijos no se adaptan a lo que tú,
          específicamente, no entiendes. Quise un tutor que genere el curso a tu
          medida —tu tema, tu nivel, tu meta— y que en cada lección ataque tus
          errores reales, enseñando con ejemplos resueltos antes de evaluar.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Decisiones de arquitectura</Eyebrow>
        <ul className="mt-4 space-y-4">
          {decisions.map(([title, body]) => (
            <li key={title} className="border-l-2 border-border pl-4">
              <p className="font-medium text-pretty">{title}</p>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <Eyebrow>Cómo se adapta · el loop</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Cuando terminas una lección, el servidor guarda una{" "}
          <strong className="font-medium text-foreground">
            ficha por concepto
          </strong>{" "}
          con dos cosas: qué dominaste y qué entendiste mal. La siguiente
          lección que abras lee esas fichas y se moldea a ellas — vuelve sobre
          lo que flojeas y da por sabido lo que ya controlas. Es una versión
          humilde de lo que hacen los sistemas que estiman qué sabe cada
          alumno: sin modelo estadístico detrás, pero buscando el mismo punto
          —ni tan fácil que aburra, ni tan difícil que frustre— que persigue el
          motor de Duolingo.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>La pedagogía no es decorativa</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          El método no sale de la intuición, sale de estudios que agregan
          cientos de experimentos. Cuatro ideas lo sostienen: los ejercicios te
          obligan a recordar en vez de releer, porque el esfuerzo de recuperar
          es lo que fija; cuesta un poco más de lo cómodo a propósito, porque
          lo fácil da sensación de aprender sin que quede nada; se enseña con
          ejemplos ya resueltos antes de pedirte que lo hagas tú; y cada
          lección cierra con un repaso obligatorio. Un tutor que adapta el
          orden a cada alumno se acerca al rendimiento de una clase
          particular — y lo que mueve la aguja es esa adaptación, no qué
          modelo de IA haya debajo.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Límites honestos</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Primera versión, construida en público. Hoy es la app la que decide
          si acertaste un ejercicio y se lo comunica al servidor; los puntos y
          la racha sí los controla el servidor, pero comprobar las respuestas
          contra el contenido real está pendiente. También quedan diseñados,
          pero sin construir: los repasos espaciados en el tiempo, las portadas
          de curso generadas, y distinguir un tema que se practica de uno que
          se estudia (que un curso de cocina no acabe siendo teoría).
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Qué aprendí</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Que “agente” no es sinónimo de “framework de agentes”. Guardar bien
          el estado en la base de datos y definir con cuidado el ciclo te da
          casi todo lo que promete la infraestructura de moda, sin montarla. Y
          que el reto de verdad no fue llamar al modelo —eso es lo fácil— sino
          diseñar cómo se guardan los datos para que cada lección dependa de
          verdad de la anterior.
        </p>
      </section>

      <section className="mt-12 border-t border-border/60 pt-6">
        <Eyebrow>Stack</Eyebrow>
        <p className="mt-2 font-mono text-sm text-pretty text-muted-foreground">
          {stack.join(" · ")}
        </p>
      </section>

      <ProjectOutro slug="maraca" />
    </article>
  );
}
