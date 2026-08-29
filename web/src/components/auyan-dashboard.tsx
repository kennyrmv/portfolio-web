"use client";

import { useId, useRef, useState } from "react";
import {
  AlertTriangle,
  BookOpenText,
  CheckCircle2,
  FileBarChart2,
  FileText,
  FlaskConical,
  Mail,
  MessagesSquare,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Estructura real del sidebar de Auyan (apps/web/components/nav/nav-items.ts)
// y paleta real "Cobalto Salto Ángel" (apps/web/app/globals.css): acento
// cobalto (blue-600), neutrales cálidos (stone), éxito/aviso/peligro en
// emerald/amber/red — no la del resto de este portfolio.

type NavItem = { label: string; icon: LucideIcon; active?: boolean };
type NavGroup = { label: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Atención",
    items: [
      { label: "Conversaciones", icon: MessagesSquare },
      { label: "Escalaciones", icon: AlertTriangle },
      { label: "Aprobaciones", icon: CheckCircle2 },
    ],
  },
  {
    label: "Conocimiento",
    items: [
      { label: "Playbook", icon: BookOpenText },
      { label: "KB Review", icon: FileText },
      { label: "Reportes", icon: FileBarChart2, active: true },
      { label: "Emails", icon: Mail },
    ],
  },
  {
    label: "Automatización",
    items: [
      { label: "AOPs", icon: ScrollText },
      { label: "Mejoras propuestas", icon: Sparkles },
      { label: "Simulador", icon: FlaskConical },
    ],
  },
];

type Tile = { label: string; value: string; delta: string; good: boolean };

const TILES: Tile[] = [
  { label: "Resueltas por IA sin intervención", value: "78%", delta: "+6 pts vs. semana anterior", good: true },
  { label: "Tiempo medio de primera respuesta", value: "6 s", delta: "−2 s vs. semana anterior", good: true },
  { label: "Coste medio por conversación", value: "€0,04", delta: "modelo por riesgo, no fijo", good: false },
  { label: "Escaladas a humano", value: "14%", delta: "−4 pts vs. semana anterior", good: true },
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

const CHART_W = 640;
const CHART_H = 200;
const PAD_X = 8;
const PAD_TOP = 16;
const PAD_BOTTOM = 24;
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

  const linePath = TREND.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.value)}`).join(" ");
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
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => (
          <g key={g}>
            <line x1={PAD_X} x2={CHART_W - PAD_X} y1={yFor(g)} y2={yFor(g)} stroke="#E7E5E4" strokeWidth={1} />
            <text x={PAD_X} y={yFor(g) - 4} className="fill-stone-400 font-mono" fontSize={9}>
              {g}%
            </text>
          </g>
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path d={linePath} fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {hover !== null && (
          <line
            x1={xFor(hover)}
            x2={xFor(hover)}
            y1={PAD_TOP}
            y2={CHART_H - PAD_BOTTOM}
            stroke="#A8A29E"
            strokeOpacity={0.5}
            strokeWidth={1}
          />
        )}

        {TREND.map((p, i) => {
          const isLast = i === TREND.length - 1;
          const isHovered = hover === i;
          if (!isLast && !isHovered) return null;
          return (
            <circle key={p.week} cx={xFor(i)} cy={yFor(p.value)} r={4} fill="#2563EB" stroke="#FFFFFF" strokeWidth={2} />
          );
        })}

        <text
          x={xFor(TREND.length - 1)}
          y={yFor(TREND[TREND.length - 1].value) - 10}
          textAnchor="end"
          className="fill-stone-900 font-mono font-medium"
          fontSize={12}
        >
          78%
        </text>

        {TREND.map((p, i) => (
          <text key={p.week} x={xFor(i)} y={CHART_H - 6} textAnchor="middle" className="fill-stone-400 font-mono" fontSize={9}>
            {p.week}
          </text>
        ))}
      </svg>

      {hoveredPoint && (
        <div
          className="pointer-events-none absolute top-1 flex -translate-x-1/2 flex-col items-center gap-0.5 rounded-md border border-stone-200 bg-white px-2 py-1 text-stone-900 shadow-sm"
          style={{ left: `${(xFor(hover!) / CHART_W) * 100}%` }}
        >
          <span className="font-mono text-[10px] text-stone-400">Semana {hoveredPoint.week.slice(1)}</span>
          <span className="font-mono text-xs font-medium">{hoveredPoint.value}%</span>
        </div>
      )}
    </div>
  );
}

export function AuyanDashboard() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-950/10 [color-scheme:light]">
      <div className="flex h-full">
        {/* sidebar real: apps/web/components/nav/Sidebar.tsx + nav-items.ts */}
        <aside className="hidden w-56 shrink-0 flex-col gap-1 overflow-y-auto border-r border-stone-200 bg-stone-50 p-3 md:flex">
          <div className="flex h-8 items-center px-1">
            <span className="text-sm font-semibold tracking-tight text-stone-900">Auyan</span>
          </div>

          <div className="mb-2">
            <p className="px-1 pb-1 text-[11px] font-medium tracking-wider text-stone-400 uppercase">Tenant</p>
            <div className="flex items-center gap-2 rounded-sm border border-stone-200 bg-white px-2 py-1.5">
              <div className="flex size-5 shrink-0 items-center justify-center rounded bg-stone-100 text-[10px] font-medium text-stone-600">
                L
              </div>
              <span className="truncate text-[12px] text-stone-700">Lunaria — Ecommerce</span>
            </div>
          </div>

          <nav className="flex-1 text-[13px]">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mt-3 first:mt-0">
                <p className="px-2 pb-1 text-[10px] font-medium tracking-normal text-stone-400 uppercase">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className={cn(
                        "flex h-8 items-center gap-2.5 rounded-sm px-2 transition-colors",
                        item.active ? "bg-stone-200/70 font-medium text-stone-900" : "text-stone-600",
                      )}
                    >
                      <item.icon className="size-3.5 shrink-0 text-stone-400" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-2 border-t border-stone-200 px-1 pt-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-stone-800 text-[10px] font-medium text-white">
              N
            </div>
            <span className="truncate text-[11px] text-stone-500">super-admin@auyan…</span>
          </div>
        </aside>

        {/* contenido: Reportes */}
        <div className="min-w-0 flex-1 overflow-y-auto bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium tracking-wider text-stone-400 uppercase">
                Reportes semanales
              </p>
              <h3 className="mt-0.5 text-lg font-semibold text-stone-900">Lunaria — Ecommerce</h3>
            </div>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-[10px] tracking-wide text-stone-500 uppercase">
              Datos de ejemplo
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-4">
            {TILES.map((t) => (
              <div key={t.label} className="bg-white p-3 sm:p-4">
                <p className="text-[11px] text-pretty text-stone-500">{t.label}</p>
                <p className="mt-1.5 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                  {t.value}
                </p>
                <p className={cn("mt-1 text-[10px] font-medium", t.good ? "text-emerald-600" : "text-stone-400")}>
                  {t.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-stone-200 p-3 sm:p-4">
            <p className="text-[13px] font-medium text-stone-900">Resolución automática por semana</p>
            <div className="mt-3">
              <TrendChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
