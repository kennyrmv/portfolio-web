import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand animate-[dot-pulse_2.6s_ease-out_infinite]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
        {site.availability}
      </div>

      <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
        {site.headline}
      </h1>

      <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">
        {site.subheadline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg" className="h-10 px-5">
          <Link href="/#contacto">
            Hablemos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-10 px-5">
          <Link href="/#proyectos">Ver proyectos</Link>
        </Button>
      </div>

      <div className="mt-12 flex flex-wrap gap-x-3 gap-y-1 border-t border-border/60 pt-5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        <span>Agentes de producción</span>
        <span aria-hidden>·</span>
        <span>RAG</span>
        <span aria-hidden>·</span>
        <span>Evals</span>
        <span aria-hidden>·</span>
        <span>LangGraph</span>
        <span aria-hidden>·</span>
        <span>Observabilidad</span>
      </div>
    </section>
  );
}
