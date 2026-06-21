import { site } from "@/lib/site";

export function About() {
  return (
    <section
      id="sobre-mi"
      className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Sobre mí
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Construyo sistemas de agentes que llegan a producción, no a una demo.
        </h2>

        <div className="space-y-4 text-pretty text-muted-foreground">
          <p>
            Soy {site.name}, ingeniero de agentes de IA. Mi foco es lo que
            separa un prototipo de un sistema real: evaluación, observabilidad,
            guardrails y acciones con human-in-the-loop.
          </p>
          <p>
            Construí <span className="text-foreground">Auyan</span>, un agente
            multi-tenant de soporte para e-commerce con eval harness
            (LLM-as-judge), supervisor pattern y aprobación humana para acciones
            sensibles — y estoy construyendo{" "}
            <span className="text-foreground">Maraca</span> en público.
          </p>
          <p className="mt-2 border-t border-border/60 pt-4 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Built with Claude Code · Python · Next.js
          </p>
        </div>
      </div>
    </section>
  );
}
