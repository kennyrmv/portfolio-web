# Portfolio — Kenny Medina

Código de mi portafolio personal: [portfolio-opal-rho-13.vercel.app](https://portfolio-opal-rho-13.vercel.app)

Ingeniero de agentes de IA. El sitio son dos case studies —**Auyan**, un agente
de soporte para e-commerce, y **Maraca**, una app que convierte cualquier tema en
un curso— contados por sus decisiones de arquitectura, cómo se evalúan y sus
límites reales.

Las demos son UI incrustada, no capturas: el dashboard del operador y el widget
del cliente son componentes de verdad, con datos de ejemplo.

## Estructura

```
web/    Next.js 16 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · MDX
```

## Desarrollo

```bash
cd web
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind v4, shadcn/ui (Radix), next-themes |
| Tipografía | Geist + Geist Mono |
| Deploy | Vercel |

## Notas

- Las métricas que aparecen en el case study de Auyan son **datos de ejemplo**
  sobre un tenant ficticio en staging, etiquetadas como tal en la propia
  interfaz. Auyan no tiene clientes reales todavía y el sitio no insinúa que sí.
- El código de Auyan y el de Maraca viven en repos aparte y son privados. Aquí
  solo está el portafolio.

## Licencia

El código es MIT. El contenido —textos de los case studies, diseño y marca— no.
