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
    "Una sola decisión en runtime (routing) y un solo feedback loop no justifican LangGraph ni un servicio aparte. Postgres es el estado tipado, Realtime el streaming y las Edge Functions los nodos. Saber cuándo no meter el framework de moda es parte del diseño.",
  ],
  [
    "Generación perezosa + adaptativa",
    "El outline completo se genera de una (barato, deja el path visible). El contenido de cada lección se genera al abrirla, inyectando tus learning records recientes. Menos tokens y mejor pedagogía: contenido adaptado rinde más que contenido fijo.",
  ],
  [
    "Structured outputs con doble validación Zod",
    "La API garantiza la forma del JSON; Zod valida lo que structured outputs ignora (rangos, que el índice de la respuesta correcta exista) y normaliza los slugs de concepto para que una deriva del modelo no corrompa los learning records.",
  ],
  [
    "El progreso es autoritativo en el servidor",
    "XP, racha y desbloqueo se escriben solo vía un RPC security definer, idempotente. El cliente no puede otorgarse XP ni saltarse el orden del curso.",
  ],
  [
    "Un solo modelo, esfuerzo variable",
    "No hay model routing por costo: Opus 4.8 con thinking adaptativo y effort alto para el outline, medio para la lección. En v1 prioricé calidad pedagógica sobre ahorro, con volumen bajo.",
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
          El corazón de Maraca: un workflow con routing y un feedback loop que
          adapta cada lección a tus errores. Sin framework de grafos.
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
          Cuando terminas una lección, el servidor anota{" "}
          <strong className="font-medium text-foreground">
            learning records
          </strong>{" "}
          por concepto: <em>strength</em> si la bordaste, <em>misconception</em>{" "}
          en lo que fallaste. La próxima lección que abras los lee y se moldea a
          ellos —re-enseña lo débil, integra lo dominado—. Es un Bayesian
          knowledge tracing “de los pobres”: sin modelo probabilístico, pero
          apuntando a la misma zona de desarrollo próximo que persigue el
          Birdbrain de Duolingo.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>La pedagogía no es decorativa</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          El método sale de meta-análisis grandes, no de intuición: retrieval
          practice (los ejercicios obligan a recuperar de memoria, no a releer),
          dificultad deseable (storage strength sobre fluidez ilusoria), worked
          examples antes de evaluar, y un recap obligatorio al cierre. Los
          tutores que adaptan la secuencia rinden cerca de una tutoría humana
          1:1 — y la adaptación, no el modelo, es lo que mueve la aguja.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Límites honestos</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Building in public, v1. El cliente computa la corrección de cada
          ejercicio y la manda al RPC; el servidor es autoritativo en XP y racha,
          pero validar las respuestas contra el contenido es hardening
          pendiente. El repaso espaciado dirigido, las portadas generadas y el
          intent práctico/teórico (clasificar el tema para que un curso de cocina
          se practique, no se teorice) están diseñados pero aún en el roadmap.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Qué aprendí</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Que “agente” no es sinónimo de “framework de agentes”. Un estado
          tipado en la base de datos más un loop bien definido te dan casi todo
          lo que un grafo promete —estado compartido, streaming, persistencia—
          sin montar infra que no necesitas. Y que el reto de verdad no fue
          llamar al modelo, sino diseñar el contrato de datos que hace que cada
          lección dependa de la anterior.
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
