# Portfolio — Kenny M

Portafolio personal de Kenny M, ingeniero de agentes de IA. Freelance y cuenta ajena.

## Estructura

- `web/` — Frontend (Next.js + TypeScript + Tailwind + shadcn/ui + MDX). Deploy en Vercel.
- `api/` — Backend en Python (FastAPI) para el asistente "Pregúntale a mi portafolio" (Claude + RAG). Repo público, deploy en Railway. _(Pendiente — Fase 3.)_
- `docs/` — Documentación e investigación.

## Desarrollo

```bash
# Frontend
cd web
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de producción
```

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, MDX |
| Backend IA | Python 3.14, FastAPI, Claude API |
| Deploy | Vercel (web) · Railway (api) |
