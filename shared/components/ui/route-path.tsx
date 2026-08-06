import { Plane } from "lucide-react";
import { Fragment, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Direção visual subtil de viagem / jornada (issue #2, spec §6 e §16).
 *
 * Materializa a identidade da marca como "percurso" sem descaracterizar a
 * escola: uma linha pontilhada dourada com paragens (pontos de percurso) e
 * um avião em traço fino no final. Usar com moderação — a spec proíbe usar
 * todos os elementos de viagem ao mesmo tempo.
 *
 * Comportamento:
 * - sem `steps`: rota decorativa (4 paragens + avião), útil em Hero e CTA final;
 * - com `steps`: jornada guiada com título/descrição por paragem (secção
 *   "Como começar" da spec §16);
 * - `horizontal` no desktop, `vertical` no telemóvel (mobile-first §24);
 * - `aria-hidden` por omissão: é decoração, não conteúdo informativo.
 *
 * A animação subtil do avião (motion-safe) só ocorre quando o utilizador NÃO
 * pede movimento reduzido (spec §16 / §23).
 */
interface RouteStep {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

interface RoutePathProps {
  steps?: RouteStep[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function RoutePath({
  steps,
  orientation = "horizontal",
  className,
}: RoutePathProps) {
  const horizontal = orientation === "horizontal";
  const items: RouteStep[] =
    steps && steps.length > 0
      ? steps
      : Array.from({ length: 4 }, () => ({}));

  const connector = horizontal
    ? "h-0.5 min-w-8 flex-1 border-t-2 border-dashed border-accent/50"
    : "ml-[5px] w-0.5 min-h-8 flex-1 border-l-2 border-dashed border-accent/50";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "select-none",
        horizontal ? "flex items-center" : "flex flex-col items-stretch",
        className,
      )}
    >
      {items.map((step, index) => (
        <Fragment key={index}>
          {index > 0 ? <span className={connector} /> : null}
          <div
            className={cn(
              "flex gap-3",
              horizontal
                ? "flex-col items-center text-center"
                : "items-center text-left",
            )}
          >
            {step.icon ?? (
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent ring-4 ring-accent/15" />
            )}
            {step.title || step.description ? (
              <span className="flex flex-col gap-0.5">
                {step.title ? (
                  <span className="text-sm font-medium text-foreground">
                    {step.title}
                  </span>
                ) : null}
                {step.description ? (
                  <span className="text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
        </Fragment>
      ))}
      <Plane
        className={cn(
          "shrink-0 motion-safe:animate-[route-plane_6s_ease-in-out_infinite]",
          horizontal ? "ml-3 h-4 w-4" : "ml-[3px] mt-3 h-4 w-4 -rotate-90",
        )}
        strokeWidth={1.5}
      />
    </div>
  );
}
