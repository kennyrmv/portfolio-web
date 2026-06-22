import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-12 px-6 py-12">
      {/* Intro */}
      <div id="sobre-mi" className="scroll-mt-20">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {site.role}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
          {site.intro}
        </p>
      </div>

      {/* Proyectos */}
      <div id="proyectos" className="scroll-mt-20">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Proyectos
        </p>
        <div className="mt-4 border-t border-border/60">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group flex items-start justify-between gap-4 border-b border-border/60 py-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <h2 className="font-semibold tracking-tight transition-colors group-hover:text-brand">
                    {p.name}
                  </h2>
                  <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    {p.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">
                  {p.tagline}
                </p>
              </div>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>

      {/* Contacto */}
      <div id="contacto" className="scroll-mt-20">
        <p className="text-pretty text-muted-foreground">
          ¿Tienes un agente que necesita llegar a producción?
        </p>
        <div className="mt-4">
          <Button asChild className="h-10 px-5">
            <a href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" />
              Escríbeme
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
