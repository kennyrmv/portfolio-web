import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects";

const project = projects.find((p) => p.slug === "maraca")!;

export const metadata: Metadata = {
  title: `${project.name} — Case study`,
  description: project.tagline,
};

export default function MaracaPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/#proyectos"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Proyectos
      </Link>

      <Badge
        variant="secondary"
        className="mt-6 font-mono text-[11px] font-normal"
      >
        {project.status}
      </Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {project.name}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>

      <p className="mt-10 font-mono text-sm text-muted-foreground">
        // Building in public — el case study crece a medida que construyo.
      </p>
    </article>
  );
}
