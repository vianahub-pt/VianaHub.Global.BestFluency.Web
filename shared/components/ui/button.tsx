import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Botão base do design system — implementação canónica shadcn/ui
 * (class-variance-authority + Radix Slot), com as variantes da identidade
 * Best Fluency (issue #29):
 *
 * - `primary`:     fundo preto com texto claro (CTA principal, papel preto);
 * - `orange`:      fundo laranja oficial #C2410C com texto branco
 *                  (contraste ≈ 5.2:1, AA) — destaque premium;
 * - `outline`:     contorno neutro (ação secundária);
 * - `ghost`:       sem fundo (ação terciária / contextual);
 * - `destructive`: ação destrutiva.
 *
 * Todas as variantes garantem área de toque ≥ 44 px (min-h-11 = 2.75rem;
 * CTAs usam size="lg" com min-h-12 = 48 px), foco visível e estados
 * hover/disabled coerentes nos temas claro e escuro.
 *
 * Uso em links (ex.: WhatsApp CTA): `className={buttonVariants({ ... })}`
 * mantém o mesmo padrão visual sem envolver o conteúdo num <button>;
 * `asChild` (Radix Slot) disponível para composição polimórfica.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        orange: "bg-orange text-orange-foreground hover:bg-orange/90",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "min-h-11 px-5 py-2.5 text-sm",
        sm: "min-h-11 px-4 py-2 text-sm",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza como o filho imediato (Radix Slot) em vez de <button>. */
  asChild?: boolean;
}

/** Botão base reutilizável (área de toque mínima de 44 px por omissão). */
function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
