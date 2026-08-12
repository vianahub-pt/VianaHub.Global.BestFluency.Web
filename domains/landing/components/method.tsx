import { CircleCheck, Compass, Mic, Target } from "lucide-react";
import type { ReactNode } from "react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { SectionHeading } from "@/shared/components/ui/section-heading";

/**
 * Método e diferenciais (spec §11).
 *
 * - H2 + introdução, quatro pilares em cards;
 * - ícones lineares, textos curtos, sem animação;
 * - grelha 1 coluna mobile → 2 tablet (sm) → 4 desktop (lg).
 */
const pillarIcons: ReactNode[] = [
  <Compass key="compass" className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />,
  <Target key="target" className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />,
  <CircleCheck key="check" className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />,
  <Mic key="mic" className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />,
];

export function Method({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;

  return (
    <section
      id="metodo"
      aria-labelledby="method-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <SectionHeading
          title={content.method.h2}
          titleId="method-title"
          intro={content.method.intro}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.method.pillars.map((pillar, index) => (
            <Card key={pillar.title} className="h-full">
              <CardHeader>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
                  {pillarIcons[index]}
                </span>
                <CardTitle className="mt-2">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {pillar.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
