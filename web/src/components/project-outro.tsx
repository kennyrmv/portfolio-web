import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

// Cierre de los case studies. Antes la página terminaba en el stack y luego el
// footer: la que más se lee no ofrecía nada que hacer justo donde el lector
// está más convencido. Dos salidas, ninguna intrusiva — escribir, o seguir
// leyendo el otro proyecto.
//
// La fila del otro proyecto repite a propósito el patrón de las filas de la
// home, para que se lea como la misma navegación y no como un banner.

export function ProjectOutro({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug)!;
  const next = projects.find((p) => p.slug !== slug);

  return (
    <section className="mt-14 border-t border-border/60 pt-10">
      <p className="max-w-xl text-lg text-pretty">{project.outro}</p>

      <div className="mt-5">
        <Button asChild className="h-10 px-5">
          <a href={`mailto:${site.email}`}>
            <Mail className="h-4 w-4" />
            Escríbeme
          </a>
        </Button>
      </div>

      {next ? (
        <div className="mt-12">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            El otro proyecto
          </p>
          <div className="mt-3 border-t border-border/60">
            <Link
              href={next.href}
              className="group flex items-start justify-between gap-4 border-b border-border/60 py-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="font-semibold tracking-tight transition-colors group-hover:text-brand">
                    {next.name}
                  </span>
                  <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    {next.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">
                  {next.tagline}
                </p>
              </div>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
