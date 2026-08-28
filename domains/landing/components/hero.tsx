import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";
import { InfoBar } from "./info-bar";
import { TextShine } from "./text-shine";

export function Hero({ locale }: { locale: LocaleCode }) {
  const hero = getMessages(locale).landing.hero;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "var(--hero-bg)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-10 md:px-8 md:pt-28 md:pb-20 lg:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1
            id="hero-title"
            className="
            font-bold
            leading-[1]
            tracking-normal
            text-balance
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl"
          >
            <TextShine>
              <span className="text-accent dark:text-black">{hero.title1}</span>{" "}
              <br />
              <span className="text-black dark:text-accent">
                {hero.title2}
              </span>{" "}
              <br />
              <span className="text-accent dark:text-black">
                {hero.title3}
              </span>{" "}
              <br />
              <span className="text-black dark:text-accent">{hero.title4}</span>
            </TextShine>
          </h1>

          <p className="mt-6 max-w-3xl text-md text-black dark:text-black leading-6 sm:text-base sm:leading-7 md:text-lg md:leading-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] dark:drop-shadow-none">
            {hero.text}
          </p>

          <WhatsAppLink
            message={hero.ctaWhatsappMessage}
            section="hero"
            ctaLabel={hero.ctaLabel}
            ariaLabel={hero.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "mt-8 w-full sm:w-auto",
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
