import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

function MethodIllustration() {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-lg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="600" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c2410c" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="300" y1="100" x2="300" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c2410c" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#c2410c" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="300" cy="250" rx="220" ry="180" fill="url(#glowGrad)" />

      {/* Winding path */}
      <path
        d="M80 420 C150 420, 160 320, 230 300 C300 280, 280 180, 350 160 C420 140, 400 80, 520 60"
        stroke="url(#pathGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="12 6"
        opacity="0.8"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;36"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Solid path overlay */}
      <path
        d="M80 420 C150 420, 160 320, 230 300 C300 280, 280 180, 350 160 C420 140, 400 80, 520 60"
        stroke="url(#pathGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Pillar 1 - Compass */}
      <g filter="url(#shadow)">
        <circle cx="120" cy="380" r="36" fill="white" className="dark:fill-zinc-900" stroke="#c2410c" strokeWidth="2.5" />
        <circle cx="120" cy="380" r="28" fill="#fff7ed" className="dark:fill-zinc-800" />
        <circle cx="120" cy="380" r="14" fill="none" stroke="#c2410c" strokeWidth="1.5" />
        <polygon points="120,367 123,378 120,380 117,378" fill="#c2410c" opacity="0.9" />
        <polygon points="120,393 117,382 120,380 123,382" fill="#94a3b8" opacity="0.7" />
        <circle cx="120" cy="380" r="2.5" fill="#c2410c" />
      </g>
      <text x="120" y="432" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400" fontSize="11" fontWeight="600">
        01
      </text>

      {/* Pillar 2 - Target */}
      <g filter="url(#shadow)">
        <circle cx="260" cy="260" r="36" fill="white" className="dark:fill-zinc-900" stroke="#c2410c" strokeWidth="2.5" />
        <circle cx="260" cy="260" r="28" fill="#fff7ed" className="dark:fill-zinc-800" />
        <circle cx="260" cy="260" r="14" fill="none" stroke="#c2410c" strokeWidth="1.5" />
        <circle cx="260" cy="260" r="9" fill="none" stroke="#c2410c" strokeWidth="1.2" />
        <circle cx="260" cy="260" r="4" fill="#c2410c" />
      </g>
      <text x="260" y="312" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400" fontSize="11" fontWeight="600">
        02
      </text>

      {/* Pillar 3 - Check */}
      <g filter="url(#shadow)">
        <circle cx="380" cy="150" r="36" fill="white" className="dark:fill-zinc-900" stroke="#c2410c" strokeWidth="2.5" />
        <circle cx="380" cy="150" r="28" fill="#fff7ed" className="dark:fill-zinc-800" />
        <circle cx="380" cy="150" r="14" fill="none" stroke="#c2410c" strokeWidth="1.5" />
        <polyline
          points="370,150 377,157 391,143"
          fill="none"
          stroke="#c2410c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text x="380" y="202" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400" fontSize="11" fontWeight="600">
        03
      </text>

      {/* Pillar 4 - Mic */}
      <g filter="url(#shadow)">
        <circle cx="500" cy="60" r="36" fill="white" className="dark:fill-zinc-900" stroke="#c2410c" strokeWidth="2.5" />
        <circle cx="500" cy="60" r="28" fill="#fff7ed" className="dark:fill-zinc-800" />
        <rect x="495" y="44" width="10" height="18" rx="5" fill="none" stroke="#c2410c" strokeWidth="1.5" />
        <path d="M489 62 C489 70, 500 76, 500 76 C500 76, 511 70, 511 62" fill="none" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="500" y1="76" x2="500" y2="82" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x="500" y="112" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400" fontSize="11" fontWeight="600">
        04
      </text>

      {/* Floating particles */}
      <circle cx="180" cy="200" r="3" fill="#c2410c" opacity="0.3">
        <animate attributeName="cy" values="200;192;200" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="440" cy="120" r="2.5" fill="#ea580c" opacity="0.25">
        <animate attributeName="cy" values="120;112;120" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="350" r="2" fill="#c2410c" opacity="0.2">
        <animate attributeName="cy" values="350;344;350" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="300" r="2" fill="#fb923c" opacity="0.3">
        <animate attributeName="cy" values="300;294;300" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="460" cy="200" r="3" fill="#c2410c" opacity="0.15">
        <animate attributeName="cy" values="200;193;200" dur="3.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function Method({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { method } = content.methods;

  const pillars = method.pillars as { title: string; text: string }[];

  return (
    <section
      id="metodo"
      aria-labelledby="method-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* Header */}
        <ScrollReveal animation="fade-up" className="text-center">
          <h2
            id="method-title"
            className="font-display text-2xl font-bold tracking-tight text-balance text-accent dark:text-accent sm:text-3xl lg:text-4xl"
          >
            {method.h2}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {method.intro}
          </p>
        </ScrollReveal>

        {/* Illustration + Pillars layout */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left column: pillars 1 & 2 */}
          <div className="flex flex-col gap-10">
            {pillars.slice(0, 2).map((pillar, i) => (
              <ScrollReveal
                key={pillar.title}
                animation="fade-left"
                delay={0.1 + i * 0.15}
              >
                <div className="flex items-start gap-4 text-left">
                  <span className="flex h-12 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-lg font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Center: Illustration */}
          <ScrollReveal animation="scale-in" delay={0.05} className="flex justify-center order-first lg:order-none">
            <div className="method-illustration-float">
              <MethodIllustration />
            </div>
          </ScrollReveal>

          {/* Right column: pillars 3 & 4 */}
          <div className="flex flex-col gap-10 lg:col-span-2 lg:flex-row lg:justify-center lg:gap-20">
            {pillars.slice(2, 4).map((pillar, i) => (
              <ScrollReveal
                key={pillar.title}
                animation="fade-right"
                delay={0.1 + i * 0.15}
                className="lg:w-1/2"
              >
                <div className="flex items-start gap-4 text-right flex-row-reverse">
                  <span className="flex h-12 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-lg font-bold text-accent">
                    {String(i + 3).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal animation="fade-up" delay={0.3} className="mt-14 flex justify-center">
          <WhatsAppLink
            message={method.whatsappMessage}
            section="method"
            ctaLabel={method.ctaLabel}
            ariaLabel={method.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {method.ctaLabel}
          </WhatsAppLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
