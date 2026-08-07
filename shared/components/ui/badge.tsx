import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Badge / chip do design system — implementação canónica shadcn/ui (cva)
 * com as variantes da identidade Best Fluency (issue #29).
 *
 * Usado para etiquetas curtas e o "eyebrow" de secções (texto pequeno em
 * maiúsculas com tracking largo). Mantém contraste AA nos dois temas.
 *
 * - `default`:     chip neutro (eyebrow de secções — visual preservado);
 * - `gold`:        chip dourado oficial #D4AF37 com texto quase-preto (AA);
 * - `outline`:     apenas contorno, fundo transparente;
 * - `destructive`: etiqueta de estado crítico.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        gold: "border-transparent bg-gold text-gold-foreground",
        outline: "border-border text-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
