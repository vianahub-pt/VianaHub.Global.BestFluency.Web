import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

function TestimonialCard({
  name,
  role,
  photo,
  quote,
}: {
  name: string;
  role: string;
  photo: string;
  quote: string;
}) {
  return (
    <div className="relative mb-3 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:mb-4 sm:rounded-2xl sm:p-5">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14">
          <Image
            src={photo}
            alt={name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <cite className="block text-xs font-semibold not-italic text-foreground truncate sm:text-sm">
            {name}
          </cite>
          <span className="text-[11px] text-muted-foreground sm:text-xs">{role}</span>
        </div>
      </div>
      <blockquote className="mt-2.5 text-xs leading-5 text-foreground sm:mt-3 sm:text-sm sm:leading-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
}

function CarouselColumn({
  items,
  reverse,
  speed,
  duration,
}: {
  items: { name: string; role: string; photo: string; quote: string }[];
  reverse?: boolean;
  speed: string;
  duration: string;
}) {
  return (
    <div className="relative overflow-hidden" style={{ maxHeight: "520px" }}>
      <div
        className="flex flex-col"
        style={{
          animation: `${reverse ? "carousel-up" : "carousel-down"} ${duration} linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

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
              speed="up"
              duration="30s"
            />
            <CarouselColumn
              items={col2}
              reverse={true}
              speed="down"
              duration="35s"
            />
            <div className="hidden lg:block">
              <CarouselColumn
                items={col3}
                reverse={false}
                speed="up"
                duration="28s"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
