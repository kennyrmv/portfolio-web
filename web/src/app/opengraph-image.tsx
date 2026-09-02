import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: site.role,
    title: site.name,
    description:
      "Construyo agentes de IA y lo que hace falta para que lleguen a producción.",
  });
}
