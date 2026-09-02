import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AuyanDashboard } from "@/components/auyan-dashboard";
import { AuyanChatWidget } from "@/components/auyan-chat-widget";
import { projects } from "@/lib/projects";

const project = projects.find((p) => p.slug === "auyan")!;

export const metadata: Metadata = {
  title: `${project.name} — Case study`,
  description: project.tagline,
  alternates: { canonical: project.href },
  openGraph: {
    type: "article",
    url: project.href,
    title: `${project.name} — Case study`,
    description: project.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${project.name} — Case study`,
    description: project.tagline,
  },
};

const decisions: [string, string][] = [
  [
    "El agente piensa en pasos, no responde de un tirón",
    "Antes de contestar, decide qué necesita hacer, ejecuta esa acción (por ejemplo, consultar un pedido) y solo entonces responde — o pide ayuda a una persona si no está seguro. Cada paso queda registrado, así que siempre se puede ver por qué respondió lo que respondió. (Por dentro: un grafo de 11 pasos en LangGraph, con razonamiento tipo ReAct.)",
  ],
  [
    "Las acciones más delicadas necesitan luz verde de una persona",
    "Cada cosa que el agente puede hacer está clasificada por riesgo: solo consultar información, hacer un cambio reversible, o hacer algo sin vuelta atrás (como un reembolso). Cuanto más delicada la acción, más control humano exige — un reembolso nunca se ejecuta sin que alguien lo apruebe antes.",
  ],
  [
    "Un segundo chequeo revisa las decisiones más importantes",
    "Para lo rutinario decide un modelo de IA rápido y económico. Para lo sensible (una acción financiera, por ejemplo) interviene el modelo más cuidadoso disponible como segundo par de ojos, antes de que se ejecute nada.",
  ],
  [
    "Los datos de cada cliente están completamente separados",
    "Aunque el sistema atiende a varios negocios a la vez, es imposible que uno vea o toque los datos de otro — esa separación está garantizada a nivel de base de datos, no solo en el código de la aplicación, para que un error de programación nunca pueda filtrar datos entre clientes.",
  ],
  [
    "No todo necesita el modelo de IA más caro",
    "Las tareas simples y de mucho volumen (como identificar de qué trata un mensaje) usan un modelo rápido y barato; el razonamiento general usa uno intermedio; el más potente se reserva para los casos que de verdad lo justifican. Así el coste por conversación se mantiene bajo sin perder calidad donde importa.",
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
    <>
      <article className="mx-auto w-full max-w-3xl px-6 pt-14 sm:pt-20">
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
      </article>

      <section className="mt-10 w-full">
        <div className="mx-auto w-full max-w-3xl px-6">
          <Eyebrow>Demo · el producto real</Eyebrow>
          <p className="mt-2 mb-5 text-sm text-pretty text-muted-foreground">
            A la izquierda, el dashboard que usa el equipo de soporte de
            Lunaria (menú completo, vista de Reportes). A la derecha, el
            widget que ve el cliente en su propia web — misma conversación,
            mismo producto (datos de ejemplo, tenant ficticio en staging).
          </p>
        </div>
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-8">
          <div className="mx-auto grid max-w-[1400px] gap-4 md:h-[600px] md:grid-cols-[1fr_360px]">
            <AuyanDashboard />
            <AuyanChatWidget />
          </div>
        </div>
      </section>

      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-14 sm:pb-20">
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
          Después de cada conversación, un proceso aparte la revisa con calma
          (sin la presión de responder en segundos) y la califica en cuatro
          aspectos: si razonó bien, si usó la información correcta, si
          ejecutó las acciones adecuadas y si mantuvo el tono de la marca. Si
          algo no queda claro, un modelo más cuidadoso la vuelve a revisar.
          Un procedimiento nuevo no se activa para los clientes hasta que
          aprueba esa revisión con un 80% o más. Es la pieza que casi nadie
          muestra — y la que separa “parece que funciona” de “sé que
          funciona”.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Observabilidad</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          De cada conversación queda un registro completo: qué pensó el
          agente, qué pasos siguió, qué acción ejecutó, por qué decidió
          escalar a una persona (si lo hizo) y cuánto costó en euros. Nada de
          lo que hace el agente es una caja negra — se puede revisar
          conversación por conversación, y cliente por cliente.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Límites honestos</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Todavía está en fase de pruebas — ningún cliente real lo ha usado
          aún, así que no tengo métricas reales de uso. Hoy, detectar cuando
          el agente se inventa algo pasa en la revisión posterior, no en el
          momento — ese es el siguiente reto pendiente. Ajustar el tono de
          voz de marca quedó fuera del alcance de esta primera versión.
        </p>
      </section>

      <section className="mt-12">
        <Eyebrow>Qué aprendí</Eyebrow>
        <p className="mt-3 text-pretty text-muted-foreground">
          Que la diferencia entre un demo y un sistema real no es el modelo
          de IA: es todo lo de alrededor — las pruebas automáticas, las
          aprobaciones humanas, el aislamiento entre clientes, el registro de
          cada paso, y la disciplina de no dejar que el agente actúe sin que
          alguien lo apruebe primero. Construirlo con Claude Code me obligó a
          pensar el agente como un sistema con presupuesto, no como una caja
          mágica.
        </p>
      </section>

      <section className="mt-12 border-t border-border/60 pt-6">
        <Eyebrow>Stack</Eyebrow>
        <p className="mt-2 font-mono text-sm text-pretty text-muted-foreground">
          {stack.join(" · ")}
        </p>
      </section>
      </article>
    </>
  );
}
