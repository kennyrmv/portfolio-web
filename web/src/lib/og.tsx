import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

// Marco compartido por las tres imágenes Open Graph (home + los dos case
// studies), para que el link se vea igual lo comparta uno donde lo comparta.
//
// Ojo al construir esto: `ImageResponse` renderiza con Satori, que NO es un
// navegador. Solo entiende flexbox (nada de grid), todo contenedor con más de
// un hijo necesita `display: "flex"` explícito, y no acepta oklch — de ahí que
// los colores estén en hex, convertidos desde los tokens de globals.css.
//
// Tipografía: se usa la fuente por defecto que trae next/og. Meter Geist aquí
// obligaría a cargar el binario de la fuente como ArrayBuffer en cada render,
// y no compensa para el peso que tiene en la imagen.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Tokens de globals.css (tema oscuro) convertidos de oklch a hex.
const c = {
  bg: "#0a0a0a",
  fg: "#fafafa",
  brand: "#54d48b",
  muted: "#a1a1a1",
  border: "rgba(255,255,255,0.10)",
};

type OgParams = {
  /** Línea superior pequeña: el rol, o "Case study". */
  eyebrow: string;
  /** El titular. Nombre propio o nombre del proyecto. */
  title: string;
  /** Una o dos frases. Se recorta si viene largo. */
  description: string;
  /** Etiqueta opcional a la derecha del eyebrow (ej. "En staging"). */
  badge?: string;
};

export function ogImage({ eyebrow, title, description, badge }: OgParams) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: c.bg,
          padding: "72px 80px",
        }}
      >
        {/* Cabecera: eyebrow + badge opcional */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: c.muted,
            }}
          >
            {eyebrow}
          </div>
          {badge ? (
            <div
              style={{
                display: "flex",
                fontSize: 18,
                color: c.muted,
                border: `1px solid ${c.border}`,
                borderRadius: 999,
                padding: "6px 16px",
              }}
            >
              {badge}
            </div>
          ) : null}
        </div>

        {/* Cuerpo */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: -2,
              color: c.fg,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 32,
              lineHeight: 1.4,
              color: c.muted,
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        </div>

        {/* Pie: punto de marca + dominio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderTop: `1px solid ${c.border}`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: c.brand,
            }}
          />
          <div style={{ fontSize: 24, color: c.muted }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
