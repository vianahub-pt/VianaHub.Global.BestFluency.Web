import { MapPin, Monitor, User, Users } from "lucide-react";
import type { ReactNode } from "react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";

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
  const content = getMessages(locale).landing;

  return (
    <section aria-label={content.infoBar.items.join(", ")}>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {content.infoBar.items.map((item, index) => (
            <li
              key={item}
              className="flex min-h-11 items-center gap-2.5 rounded-lg bg-card/60 px-3 py-2.5 shadow-sm sm:px-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/80 text-black dark:text-white">
                {itemIcons[index]}
              </span>
              <span className="text-xs text-black dark:text-black font-medium leading-5 sm:text-sm sm:leading-6">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
