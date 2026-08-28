import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  alt: string;
  url: string;
  width: number;
  height: number;
};

export function BrowserFrame({ src, alt, url, width, height }: BrowserFrameProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border/60 bg-secondary/50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
        </div>
        <div className="flex-1 truncate rounded-md bg-background/80 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {url}
        </div>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full"
      />
    </div>
  );
}
