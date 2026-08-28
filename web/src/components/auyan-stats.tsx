"use client";

import { useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Tile = {
  label: string;
  value: string;
  delta: string;
  good: boolean;
};

const TILES: Tile[] = [
  {
    label: "Resueltas por IA sin intervención",
    value: "78%",
    delta: "+6 pts vs. semana anterior",
    good: true,
  },
  {
    label: "Tiempo medio de primera respuesta",
    value: "6 s",
    delta: "−2 s vs. semana anterior",
    good: true,
  },
  {
    label: "Coste medio por conversación",
    value: "€0,04",
    delta: "modelo por riesgo, no fijo",
    good: true,
  },
  {
    label: "Escaladas a humano",
    value: "14%",
    delta: "−4 pts vs. semana anterior",
    good: true,
  },
];

const TREND = [
  { week: "S1", value: 58 },
  { week: "S2", value: 61 },
  { week: "S3", value: 65 },
  { week: "S4", value: 63 },
  { week: "S5", value: 69 },
  { week: "S6", value: 72 },
  { week: "S7", value: 75 },
  { week: "S8", value: 78 },
];

const CHART_W = 720;
const CHART_H = 220;
const PAD_X = 8;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const MIN_V = 50;
const MAX_V = 85;

function xFor(i: number) {
  return PAD_X + (i / (TREND.length - 1)) * (CHART_W - PAD_X * 2);
}
function yFor(v: number) {
  const usable = CHART_H - PAD_TOP - PAD_BOTTOM;
  return PAD_TOP + usable - ((v - MIN_V) / (MAX_V - MIN_V)) * usable;
}

function TrendChart() {
  const gradientId = useId();
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const linePath = TREND.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.value)}`).join(
    " ",
  );
  const areaPath = `${linePath} L ${xFor(TREND.length - 1)} ${yFor(MIN_V)} L ${xFor(0)} ${yFor(MIN_V)} Z`;

  const gridLines = [60, 70, 80];

  function handleMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * CHART_W;
    let nearest = 0;
    let best = Infinity;
    TREND.forEach((_, i) => {
      const d = Math.abs(xFor(i) - relX);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHover(nearest);
  }

  const hoveredPoint = hover !== null ? TREND[hover] : null;

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full touch-none"
        role="img"
        aria-label="Resolución automática por semana, subiendo de 58% a 78% en ocho semanas"
        onPointerMove={handleMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => (
          <g key={g}>
            <line
              x1={PAD_X}
              x2={CHART_W - PAD_X}
              y1={yFor(g)}
              y2={yFor(g)}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={PAD_X}
              y={yFor(g) - 4}
              className="fill-muted-foreground font-mono"
              fontSize={9}
            >
              {g}%
            </text>
          </g>
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="var(--brand)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {hover !== null && (
          <line
            x1={xFor(hover)}
            x2={xFor(hover)}
            y1={PAD_TOP}
            y2={CHART_H - PAD_BOTTOM}
            stroke="var(--muted-foreground)"
            strokeOpacity={0.35}
            strokeWidth={1}
          />
        )}

        {TREND.map((p, i) => {
          const isLast = i === TREND.length - 1;
          const isHovered = hover === i;
          if (!isLast && !isHovered) return null;
          return (
            <circle
              key={p.week}
              cx={xFor(i)}
              cy={yFor(p.value)}
              r={4}
              fill="var(--brand)"
              stroke="var(--card)"
              strokeWidth={2}
            />
          );
        })}

        <text
          x={xFor(TREND.length - 1)}
          y={yFor(TREND[TREND.length - 1].value) - 10}
          textAnchor="end"
          className="fill-foreground font-mono font-medium"
          fontSize={12}
        >
          78%
        </text>

        {TREND.map((p, i) => (
          <text
            key={p.week}
            x={xFor(i)}
            y={CHART_H - 8}
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            fontSize={9}
          >
            {p.week}
          </text>
        ))}
      </svg>

      {hoveredPoint && (
        <div
          className="pointer-events-none absolute top-1 flex -translate-x-1/2 flex-col items-center gap-0.5 rounded-md border border-border bg-popover px-2 py-1 text-popover-foreground shadow-sm"
          style={{ left: `${(xFor(hover!) / CHART_W) * 100}%` }}
        >
          <span className="font-mono text-[10px] text-muted-foreground">
            Semana {hoveredPoint.week.slice(1)}
          </span>
          <span className="font-mono text-xs font-medium">{hoveredPoint.value}%</span>
        </div>
      )}
    </div>
  );
}

export function AuyanStats() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
        {TILES.map((t) => (
          <div key={t.label} className="bg-card p-4 sm:p-5">
            <p className="text-xs text-pretty text-muted-foreground">{t.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t.value}</p>
            <p
              className={cn(
                "mt-1 text-[11px] font-medium",
                t.good ? "text-brand" : "text-muted-foreground",
              )}
            >
              {t.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-px rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium">Resolución automática por semana</p>
          <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
            Datos de ejemplo
          </span>
        </div>
        <div className="mt-4">
          <TrendChart />
        </div>
      </div>
    </div>
  );
}
