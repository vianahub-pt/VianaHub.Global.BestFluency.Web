import { MapPin, Monitor, User, Users } from "lucide-react";
import type { ReactNode } from "react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";

/**
 * Faixa de informações essenciais (spec §9).
 *
 * - quatro itens curtos (individual / turmas / presencial / online);
 * - ícones simples que acompanham cada item;
 * - legível sem depender de hover, uma ou duas linhas no telemóvel;
 * - sem carrossel: é uma grelha estática (1 coluna mobile, 4 desktop).
 */
const itemIcons: Record<number, ReactNode> = {
  0: <User className="h-5 w-5" aria-hidden="true" />,
  1: <Users className="h-5 w-5" aria-hidden="true" />,
  2: <MapPin className="h-5 w-5" aria-hidden="true" />,
  3: <Monitor className="h-5 w-5" aria-hidden="true" />,
};

export function InfoBar({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);

  return (
    <section aria-label={content.infoBar.items.join(", ")}>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.infoBar.items.map((item, index) => (
            <li
              key={item}
              className="flex min-h-12 items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                {itemIcons[index]}
              </span>
              <span className="text-sm font-medium leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
