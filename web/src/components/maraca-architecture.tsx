import { type ReactNode } from "react";
import { ArrowDown, RotateCw } from "lucide-react";

import { cn } from "@/lib/utils";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
      {children}
    </span>
  );
}

function Node({
  n,
  name,
  type,
  children,
  tags,
}: {
  n: number;
  name: string;
  type: string;
  children: ReactNode;
  tags: string[];
}) {
  return (
    <div className="w-full rounded-lg border border-border bg-card/50 p-4">
      <div className="flex items-center gap-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[11px] text-muted-foreground">
          {n}
        </span>
        <span className="font-mono text-sm text-foreground">{name}</span>
        <span className="ml-auto font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {type}
        </span>
      </div>
      <p className="mt-2.5 text-sm text-pretty text-muted-foreground">
        {children}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  );
}

function Flow({
  label,
  accent = false,
  icon = "down",
}: {
  label: string;
  accent?: boolean;
  icon?: "down" | "loop";
}) {
  const Icon = icon === "loop" ? RotateCw : ArrowDown;
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 py-2",
        accent ? "text-brand" : "text-muted-foreground",
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", accent ? "" : "opacity-70")} />
      <span className="font-mono text-[10px] tracking-wide">{label}</span>
    </div>
  );
}

export function MaracaArchitecture() {
  return (
    <div className="rounded-xl border border-border bg-card/30 p-4 sm:p-6">
      <p className="mb-4 text-sm text-pretty text-muted-foreground">
        Conceptualmente es un grafo. En la práctica, los nodos son funciones y
        el estado es la base de datos — cero framework de grafos.
      </p>

      <div className="flex flex-col">
        {/* Cliente */}
        <div className="w-full rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm text-foreground">
              Cliente · Expo / React Native
            </span>
          </div>
          <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
            Manda un prompt (“quiero aprender X”) y observa el curso aparecer en
            vivo vía Realtime.
          </p>
        </div>

        <Flow label="POST · prompt" />

        <Node
          n={1}
          name="generate-course"
          type="Edge Function · Deno"
          tags={["Claude Opus 4.8", "effort: high", "1 llamada"]}
        >
          Clasifica idioma, nivel y misión, y genera el outline completo (3–5
          unidades, lecciones <code className="font-mono text-xs">pending</code>
          ). Adelanta la primera lección en background para un arranque
          instantáneo.
        </Node>

        <Flow label="escribe el índice del curso · las lecciones se generan al abrirlas" />

        {/* Estado compartido */}
        <div className="w-full rounded-lg border border-border bg-secondary/40 p-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm text-foreground">Postgres</span>
            <span className="ml-auto font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              estado compartido tipado
            </span>
          </div>
          <p className="mt-2.5 text-sm text-pretty text-muted-foreground">
            El estado del agente vive en la DB, no en memoria. RLS por usuario;
            Realtime emite cada cambio al cliente.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Tag>courses</Tag>
            <Tag>units</Tag>
            <Tag>lessons</Tag>
            <span className="rounded border border-brand/40 px-1.5 py-0.5 font-mono text-[10px] text-brand">
              learning_records
            </span>
          </div>
        </div>

        {/* Loop adaptativo */}
        <div className="mt-3 w-full rounded-xl border border-brand/30 bg-brand/[0.04] p-3 sm:p-4">
          <div className="mb-1 flex items-center gap-2">
            <RotateCw className="h-3.5 w-3.5 text-brand" />
            <span className="font-mono text-[11px] tracking-wider text-brand uppercase">
              El ciclo que adapta cada lección
            </span>
          </div>

          <Flow label="lee learning_records — lo que fallaste / ya dominas" accent />

          <Node
            n={2}
            name="generate-lesson"
            type="Edge Function · Deno"
            tags={["Claude Opus 4.8", "effort: medium", "on-demand"]}
          >
            Genera la lección al abrirla, apuntando a tu zona de desarrollo
            próximo: re-enseña los conceptos débiles y no sobre-explica los que
            ya dominas.
          </Node>

          <Flow label="el usuario resuelve las pantallas" />

          <Node
            n={3}
            name="complete_lesson"
            type="RPC · security definer"
            tags={["Postgres", "idempotente", "server-authoritative"]}
          >
            Computa el score, otorga XP y racha, desbloquea la siguiente
            lección. El servidor es la autoridad: el cliente no puede inflar su
            progreso.
          </Node>

          <Flow
            label="escribe nuevos learning_records → la próxima lección se adapta"
            accent
            icon="loop"
          />
        </div>
      </div>
    </div>
  );
}
