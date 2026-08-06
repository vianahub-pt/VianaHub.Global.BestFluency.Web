import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Badge / chip do design system (issue #2).
 *
 * Usado para etiquetas curtas e o "eyebrow" de secções (texto pequeno em
 * maiúsculas com tracking largo). Mantém contraste AA nos dois temas.
 */
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
