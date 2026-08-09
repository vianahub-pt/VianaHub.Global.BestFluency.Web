import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";
import { buttonVariants } from "@/shared/components/ui/button";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

export function Hero({ locale }: { locale: LocaleCode }) {
  const hero = getLandingContent(locale).hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="
    border-b
    border-border
    bg-linear-to-br
    from-white
    via-[#f7f1e7]
    to-[#926f34]/30

    dark:from-black
    dark:via-[#17130d]
    dark:to-[#926f34]/35
  "
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-20 lg:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1
            id="hero-title"
            className="
            font-display 
            text-5xl
            font-bold 
            leading-[1.6]
            tracking-normal 
            text-balance
            sm:text-5xl 
            md:text-6xl 
            lg:text-7xl"
          >
            <span className="text-[#926f34] dark:text-[#926f34]">
              {hero.title1}
            </span>{" "}
            <br />
            <span className="text-[#000000] dark:text-[#ffffff]">
              {hero.title2}
            </span>{" "}
            <br />
            <span className="text-[#926f34] dark:text-[#926f34]">
              {hero.title3}
            </span>{" "}
            <br />
            <span className="text-[#000000] dark:text-[#ffffff]">
              {hero.title4}
            </span>
          </h1>

          <p className="mt-10 max-w-3xl text-base text-[#000000] dark:text-[#ffffff] font-bold leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {hero.text}
          </p>

          <div className="mt-7 flex w-full justify-center sm:mt-9">
            <WhatsAppLink
              message={hero.ctaWhatsappMessage}
              section="hero"
              ctaLabel={hero.ctaLabel}
              ariaLabel={hero.ctaAriaLabel}
              className={cn(
                buttonVariants({
                  variant: "gold",
                  size: "lg",
                }),
                "w-full sm:w-auto",
              )}
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />

              {hero.ctaLabel}
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
