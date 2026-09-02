import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { projects } from "@/lib/projects";

const project = projects.find((p) => p.slug === "auyan")!;

export const alt = `${project.name} — Case study`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Case study",
    title: project.name,
    description: project.ogSummary,
    badge: project.status,
  });
}
