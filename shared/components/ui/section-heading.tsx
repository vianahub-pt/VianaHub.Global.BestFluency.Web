import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  titleId?: string;
  intro?: string;
  align?: "left" | "center";
}

/**
 * Cabeçalho padronizado de secção (issue #2).
 *
 * Hierarquia visual consistente: eyebrow laranja (Badge opcional), H2 com
 * text-balance e introdução em muted-foreground. `titleId` permite ligar o
 * heading a uma <section aria-labelledby>.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  intro,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className="mt-10 font-title text-2xl font-bold tracking-tight text-balance sm:text-3xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
