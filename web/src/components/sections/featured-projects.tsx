import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects";

export function FeaturedProjects() {
  return (
    <section
      id="proyectos"
      className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Proyectos
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Trabajo seleccionado
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects
          .filter((p) => p.featured)
          .map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group flex flex-col rounded-xl border border-border bg-card/40 p-6 transition-colors duration-200 hover:border-foreground/20 hover:bg-card"
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="font-mono text-[11px] font-normal"
                >
                  {p.status}
                </Badge>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">
                {p.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <p className="mt-5 font-mono text-[11px] text-muted-foreground">
                {p.stack.join(" · ")}
              </p>
            </Link>
          ))}
      </div>
    </section>
  );
}
