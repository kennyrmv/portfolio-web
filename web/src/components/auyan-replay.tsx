"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronRight, Pause, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scenarios, type ReplayEvent } from "@/lib/auyan-demo";

const STEP_MS = 1300;

const levelStyles: Record<"L1" | "L2" | "L3", string> = {
  L1: "border-emerald-500/30 text-emerald-400",
  L2: "border-amber-500/30 text-amber-400",
  L3: "border-red-500/40 text-red-400",
};

function Label({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
      {children}
    </div>
  );
}

function EventRow({ ev }: { ev: ReplayEvent }) {
  const anim = "animate-[fade-in-up_0.3s_ease-out]";

  switch (ev.kind) {
    case "user":
      return (
        <div className={anim}>
          <Label>Cliente</Label>
          <p className="rounded-lg bg-secondary px-3 py-2 text-sm">{ev.text}</p>
        </div>
      );
    case "intent":
      return (
        <div className={anim}>
          <Label>Intent · {ev.model}</Label>
          <div className="flex items-center gap-2 font-mono text-sm">
            <span>{ev.label}</span>
            <span className="rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground">
              {Math.round(ev.confidence * 100)}%
            </span>
          </div>
        </div>
      );
    case "procedure":
      return (
        <div className={anim}>
          <Label>Procedimiento (AOP)</Label>
          <p className="font-mono text-sm">{ev.label}</p>
        </div>
      );
    case "reasoning":
      return (
        <div className={anim}>
          <Label>Razonamiento</Label>
          <p className="text-sm text-pretty text-muted-foreground">{ev.text}</p>
        </div>
      );
    case "skill":
      return (
        <div className={anim}>
          <Label>Skill</Label>
          <div className="rounded-lg border border-border bg-card/50 p-3 font-mono text-[13px]">
            <div className="flex items-center gap-2">
              <span className="text-foreground">{ev.name}()</span>
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 text-[10px]",
                  levelStyles[ev.level],
                )}
              >
                {ev.level}
              </span>
            </div>
            <div className="mt-1.5 text-muted-foreground">
              <span className="text-muted-foreground/60">in&nbsp;&nbsp;</span>
              {ev.input}
            </div>
            {ev.result ? (
              <div className="text-muted-foreground">
                <span className="text-muted-foreground/60">out&nbsp;</span>
                {ev.result}
              </div>
            ) : null}
          </div>
        </div>
      );
    case "approval":
      return (
        <div className={anim}>
          <Label>Aprobación humana</Label>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm">
            <span className="text-pretty">{ev.action}</span>
            <span className="shrink-0 font-mono text-[11px] text-emerald-400">
              ✓ Aprobado
            </span>
          </div>
        </div>
      );
    case "escalation":
      return (
        <div className={anim}>
          <Label>Escalado a humano</Label>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-pretty">
            {ev.reason}
          </div>
        </div>
      );
    case "response":
      return (
        <div className={anim}>
          <Label>Auyan</Label>
          <p className="rounded-lg border border-brand/30 bg-brand/5 px-3 py-2 text-sm text-pretty">
            {ev.text}
          </p>
        </div>
      );
    case "judge":
      return (
        <div className={anim}>
          <Label>LLM-as-judge</Label>
          <div className="grid gap-2 rounded-lg border border-border bg-card/50 p-3 sm:grid-cols-2">
            {ev.scores.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-xs text-muted-foreground">
                  {s.label}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full rounded-full bg-brand"
                    style={{ width: `${s.value}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

export function AuyanReplay() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = scenarios[scenarioIdx];
  const total = scenario.events.length;
  const done = step >= total;

  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(
      () => setStep((s) => Math.min(s + 1, total)),
      STEP_MS,
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, step, done, total]);

  const selectScenario = (idx: number) => {
    setScenarioIdx(idx);
    setStep(1);
    setPlaying(false);
  };

  const togglePlay = () => {
    if (done) {
      setStep(1);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  };

  const next = () => {
    setPlaying(false);
    setStep((s) => Math.min(s + 1, total));
  };

  const reset = () => {
    setPlaying(false);
    setStep(1);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/30">
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => selectScenario(i)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs transition-colors",
              i === scenarioIdx
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="text-xs text-pretty text-muted-foreground">
          {scenario.summary}
        </p>
        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            aria-label={playing ? "Pausar" : "Reproducir"}
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            disabled={done}
            aria-label="Paso siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={reset}
            aria-label="Reiniciar"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {scenario.events.slice(0, step).map((ev, i) => (
          <EventRow key={`${scenario.id}-${i}`} ev={ev} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>
          paso {step}/{total}
        </span>
        <span>{done ? "fin del replay" : playing ? "reproduciendo…" : "pausado"}</span>
      </div>
    </div>
  );
}
