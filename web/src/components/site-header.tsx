import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const nav = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          {site.name}
          <span className="text-brand">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="GitHub">
            <a href={site.github} target="_blank" rel="noreferrer">
              <GitHubIcon className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="LinkedIn">
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
