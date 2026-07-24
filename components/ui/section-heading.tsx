import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="font-display max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-lg leading-relaxed text-muted text-pretty">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
