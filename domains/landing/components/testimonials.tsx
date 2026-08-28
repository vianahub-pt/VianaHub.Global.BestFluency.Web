import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";

import { CarouselColumn } from "./carousel-column";

export function Testimonials({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { testimonials } = content;

  const items = testimonials.items.map((item) => ({
    name: item.name,
    role: item.role,
    photo: item.photo,
    quote: item.quote,
  }));

  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-gradient-to-b from-muted/40 to-accent/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <ScrollReveal animation="fade-up" delay={0}>
          <h2
            id="testimonials-title"
            className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              text-2xl
              sm:text-3xl
              md:text-3xl
              lg:text-4xl"
          >
            {testimonials.h2}
          </h2>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="mt-4">
            {testimonials.text.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 [&:not(:first-child)]:mt-3"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.15}>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-6">
            <CarouselColumn
              items={col1}
              reverse={false}
              duration="30s"
            />
            <CarouselColumn
              items={col2}
              reverse={true}
              duration="35s"
            />
            <CarouselColumn
              items={col3}
              reverse={false}
              duration="28s"
              className="hidden lg:block"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
