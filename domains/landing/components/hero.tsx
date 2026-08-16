import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";
import { InfoBar } from "./info-bar";

export function Hero({ locale }: { locale: LocaleCode }) {
  const hero = getMessages(locale).landing.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="flex min-h-dvh flex-col justify-center border-b border-border bg-cover bg-center bg-no-repeat"
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-10 md:px-8 md:pt-28 md:pb-20 lg:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1
            id="hero-title"
            className="
            font-display
            text-5xl
            font-bold
            leading-[1.2]
            tracking-normal
            text-balance
            sm:text-5xl
            md:text-6xl
            lg:text-7xl"
          >
            <span className="text-accent dark:text-white">{hero.title1}</span>{" "}
            <br />
            <span className="text-black dark:text-accent">
              {hero.title2}
            </span>{" "}
            <br />
            <span className="text-accent dark:text-white">
              {hero.title3}
            </span>{" "}
            <br />
            <span className="text-black dark:text-accent">{hero.title4}</span>
          </h1>

          <p className="mt-10 max-w-3xl text-base text-black dark:text-white font-bold leading-7 sm:text-lg sm:leading-8">
            {hero.text}
          </p>

          <WhatsAppLink
            message={hero.ctaWhatsappMessage}
            section="hero"
            ctaLabel={hero.ctaLabel}
            ariaLabel={hero.ctaAriaLabel}
            className={cn(
              buttonVariants({
                variant: "orange",
                size: "lg",
              }),
              "mt-10 w-full sm:w-auto dark:text-white",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />

            {hero.ctaLabel}
          </WhatsAppLink>
        </div>
        <InfoBar locale={locale} />
      </div>
    </section>
  );
}
