import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AuyanDashboardPreview } from "@/components/auyan-dashboard-preview";
import { projects } from "@/lib/projects";

const project = projects.find((p) => p.slug === "auyan")!;

export const metadata: Metadata = {
  title: `${project.name} — Case study`,
  description: project.tagline,
};

const decisions: [string, string][] = [
  [
    "LangGraph con loop ReAct (11 nodos), no una cadena lineal",
    "El agente razona → decide si ejecuta una skill → responde o escala, con cada paso trazado.",
  ],
  [
    "Skills tipadas en 3 niveles con human approval en las L3",
    "L1 lectura, L2 escritura reversible, L3 destructiva. Un agente que puede reembolsar dinero no lo hace sin un gate.",
  ],
  [
    "Supervisor pattern por nivel de riesgo",
    "Sonnet supervisa lo rutinario, Opus lo sensible. Routing por riesgo, no por capricho.",
  ],
  [
    "Multi-tenant con RLS desde el día 1",
    "Aislamiento total entre clientes, cada uno con su propia knowledge base (RAG + pgvector).",
  ],
  [
    "Model routing por costo",
    "Haiku clasifica la intención, Sonnet por defecto, Opus solo donde rinde.",
  ],
];

const stack = [
  "Python",
  "FastAPI",
  "LangGraph",
  "Claude (Haiku/Sonnet/Opus)",
  "Supabase",
  "pgvector",
  "LangSmith",
  "Railway",
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export default function AuyanPage() {
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
          Proyecto propio · startup
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Auyan
      </h1>
      <p className="mt-3 text-lg text-pretty text-muted-foreground">
        {project.tagline}
      </p>

      <section className="mt-10">
        <Eyebrow>Demo · el producto real</Eyebrow>
        <p className="mt-2 mb-4 text-sm text-pretty text-muted-foreground">
          Así se ve el dashboard por dentro (datos de prueba, tenant ficticio):
          una conversación en curso y la cola de aprobaciones para acciones
          sensibles. Cambia de vista con el menú o los botones.
        </p>
        <AuyanDashboardPreview />
      </section>

      <section className="mt-12">
        <Eyebrow>El problema</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Los equipos de soporte de e-commerce se ahogan en lo repetitivo:
          consultar pedidos, iniciar devoluciones, responder las mismas veinte
          preguntas. La mayoría de los “chatbots” responden texto pero no{" "}
          <em>hacen</em> nada — y cuando actúan, no tienes cómo confiar en que no
          la rieguen. Quise un agente que tomara acciones reales con la seguridad
          de un sistema de producción.
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
        <Eyebrow>Cómo lo evalúo</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Un{" "}
          <strong className="font-medium text-foreground">Slow Agent</strong>{" "}
          analiza las conversaciones post-mortem con un LLM-as-judge de dos pasos
          (Sonnet → Opus si la confianza baja de 0.7), puntuando cuatro
          dimensiones: <em>Reasoning, Knowledge, Tools</em> y{" "}
          <em>Brand voice</em>. Un procedimiento no llega a producción hasta
          pasar un eval gate del 80%. Es la pieza que casi nadie muestra — y la
          que separa “parece que funciona” de “sé que funciona”.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Observabilidad</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Cada conversación queda trazada en LangSmith: qué pensó, qué nodo del
          grafo corrió, qué skill llamó, por qué escaló y cuántos tokens/€ costó
          — por conversación y por tenant.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Límites honestos</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Está en staging, sin clientes reales todavía, así que no tengo
          métricas de producción. La detección de alucinaciones vive en el Slow
          Agent (post-mortem), no en tiempo real — ese es el siguiente reto. La
          voz está fuera del alcance inicial.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Qué aprendí</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Que la diferencia entre un demo y un sistema de producción no es el
          modelo: es todo lo de alrededor — evals, approvals, aislamiento,
          trazas y la disciplina de no dejar que el agente actúe sin un gate.
          Construirlo con Claude Code me obligó a pensar el agente como un
          sistema con presupuesto, no como una caja mágica.
        </p>
      </section>

      <section className="mt-12 border-t border-border/60 pt-6">
        <Eyebrow>Stack</Eyebrow>
        <p className="mt-2 font-mono text-sm text-pretty text-muted-foreground">
          {stack.join(" · ")}
        </p>
      </section>
    </article>
  );
}
