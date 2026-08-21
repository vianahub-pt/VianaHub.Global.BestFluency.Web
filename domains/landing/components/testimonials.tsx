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
    <div className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <Image
            src={photo}
            alt={name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <cite className="block text-sm font-semibold not-italic text-foreground truncate">
            {name}
          </cite>
          <span className="text-xs text-muted-foreground">{role}</span>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-6 text-foreground">
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
    <div className="relative overflow-hidden" style={{ maxHeight: "580px" }}>
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
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <ScrollReveal animation="fade-up" delay={0}>
          <h2
            id="testimonials-title"
            className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              sm:text-2xl
              md:text-3xl
              lg:text-4xl"
          >
            {testimonials.h2}
          </h2>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="mt-5">
            {testimonials.text.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-muted-foreground [&:not(:first-child)]:mt-3"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.15}>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
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
