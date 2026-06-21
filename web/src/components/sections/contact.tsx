import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contacto"
      className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16 sm:py-28"
    >
      <div className="rounded-2xl border border-border bg-card/40 p-8 text-center sm:p-12">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Contacto
        </p>
        <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          ¿Tienes un agente que necesita llegar a producción?
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          {site.availability}.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-10 px-5">
            <a href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" />
              Escríbeme
            </a>
          </Button>
          <Button size="lg" variant="outline" disabled className="h-10 px-5">
            Agendar llamada · pronto
          </Button>
        </div>
      </div>
    </section>
  );
}
