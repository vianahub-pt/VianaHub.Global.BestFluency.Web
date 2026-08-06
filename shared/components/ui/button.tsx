import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Variantes do botão base do design system (issue #2).
 *
 * - `primary`: fundo preto com texto claro (CTA principal, papel preto da marca);
 * - `gold`:    fundo dourado com texto escuro (destaque premium, papel dourado);
 * - `outline`: contorno neutro (ação secundária);
 * - `ghost`:   sem fundo (ação terciária / contextual).
 *
 * Todas as variantes garantem área de toque ≥ 44 px (min-h-11 = 2.75rem),
 * foco visível e estados hover/disabled coerentes nos temas claro e escuro.
 *
 * Uso em links (ex.: WhatsApp CTA): `className={buttonVariants({ ... })}`
 * mantém o mesmo padrão visual sem envolver o conteúdo num <button>.
 */
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50";

const buttonVariantsConfig = {
  variant: {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90",
    gold: "bg-accent text-accent-foreground hover:bg-accent/90",
    outline:
      "border border-border bg-background text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
  },
  size: {
    default: "min-h-11 px-5 py-2.5 text-sm",
    lg: "min-h-12 px-6 py-3 text-base",
    icon: "h-11 w-11",
  },
} as const;

type ButtonVariant = keyof typeof buttonVariantsConfig.variant;
type ButtonSize = keyof typeof buttonVariantsConfig.size;

interface ButtonVariantsProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Classes do botão para uso direto em <button> ou <a> (links que parecem botão). */
export function buttonVariants({
  variant = "primary",
  size = "default",
  className,
}: ButtonVariantsProps = {}) {
  return cn(
    buttonBase,
    buttonVariantsConfig.variant[variant],
    buttonVariantsConfig.size[size],
    className,
  );
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantsProps {}

/** Botão base reutilizável (área de toque mínima de 44 px por omissão). */
export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
