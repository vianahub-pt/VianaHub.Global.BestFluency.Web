/**
 * Contrato de conteúdo da landing.
 *
 * Cada locale publicado implementa exatamente as mesmas chaves — o compilador
 * falha se faltar alguma chave em algum locale (sem fallback silencioso).
 *
 * O contrato cobre as 13 secções comerciais da especificação V2
 * (docs/landing-page-spec-v2.md, §§7-19): header, hero, infoBar, modalities,
 * method, inPerson, bestKids, testimonials, founder, journey, faq, finalCta
 * e footer. pt-PT é a fonte oficial; os restantes 6 locales são traduções.
 *
 * REGRAS de conteúdo (spec §31 e issue #8):
 * - Nenhum preço, morada extra, horário, e-mail, NIF, link social ou avaliação
 *   inventada. Apenas dados confirmados entram no contrato.
 * - Dados factuais (morada, telefone, WhatsApp, nomes próprios) não são
 *   traduzidos e vivem em core/config/site.ts ou permanecem idênticos em
 *   todos os locales.
 * - As mensagens de WhatsApp contextuais são exatas da spec (§20), com o
 *   número 351214744028 (core/config/site.ts).
 */
export interface LandingContent {
  /** SEO (spec §21). */
  meta: {
    title: string;
    description: string;
  };
  /** Acessibilidade e UI de base (spec §23). */
  a11y: {
    skipToContent: string;
    toggleTheme: string;
    languageSwitcherLabel: string;
  };
  /** Navegação e header (spec §7). */
  nav: {
    ariaLabel: string;
    menuAriaLabel: string;
    menuLabel: string;
    closeMenuLabel: string;
    ctaLabel: string;
    ctaAriaLabel: string;
    whatsappMessage: string;
    links: {
      modalities: string;
      method: string;
      bestKids: string;
      testimonials: string;
      faq: string;
    };
  };
  /** Conteúdo da página de fundação (fase scaffold, issue #3). */
  foundation: {
    eyebrow: string;
    notice: string;
    contactsTitle: string;
  };
  /** CTA geral de WhatsApp (usado em secções sem mensagem dedicada). */
  cta: {
    whatsappLabel: string;
    whatsappAriaLabel: string;
    whatsappMessage: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  /** Footer (spec §19). */
  footer: {
    rightsReserved: string;
    privacyPolicy: string;
    cookiesPolicy: string;
    whatsappLabel: string;
  };

  /** §7 — Header. */
  header: {
    logoAlt: string;
  };

  /** §8 — Hero. */
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    complement: string;
    ctaLabel: string;
    ctaAriaLabel: string;
    ctaWhatsappMessage: string;
    secondaryCtaLabel: string;
    imageAlt: string;
  };

  /** §9 — Faixa de informações essenciais (4 itens). */
  infoBar: {
    items: string[];
  };

  /** §10 — Modalidades (2 cards com CTA contextual). */
  modalities: {
    h2: string;
    intro: string;
    individual: {
      title: string;
      text: string;
      note: string;
      ctaLabel: string;
      ctaAriaLabel: string;
      whatsappMessage: string;
    };
    group: {
      title: string;
      text: string;
      note: string;
      ctaLabel: string;
      ctaAriaLabel: string;
      whatsappMessage: string;
    };
  };

  /** §11 — Método e diferenciais (4 pilares). */
  method: {
    h2: string;
    intro: string;
    pillars: {
      title: string;
      text: string;
    }[];
  };

  /** §12 — Aulas presenciais na Amadora (CTA condicional: link do Maps pendente). */
  inPerson: {
    h2: string;
    text: string[];
    ctaLabel: string;
    ctaAriaLabel: string;
  };

  /** §13 — Best Kids. */
  bestKids: {
    h2: string;
    text: string[];
    highlight: string;
    differentials: {
      title: string;
      text: string;
    }[];
    practicalInfo: string[];
    ctaLabel: string;
    ctaAriaLabel: string;
    whatsappMessage: string;
    imageAlt: string;
  };

  /** §14 — Depoimentos (estrelas apenas para avaliações Google). */
  testimonials: {
    h2: string;
    subtitle: string;
    items: {
      name: string;
      source: string;
      /** Número de estrelas (5) apenas para avaliações Google; null para WhatsApp. */
      stars: number | null;
      quote: string;
    }[];
    ctaLabel: string;
    ctaAriaLabel: string;
    whatsappMessage: string;
  };

  /** §15 — Fundadora. */
  founder: {
    h2: string;
    text: string[];
    imageAlt: string;
  };

  /** §16 — Como começar (4 etapas). */
  journey: {
    h2: string;
    subtitle: string;
    steps: {
      title: string;
      text: string;
    }[];
    ctaLabel: string;
    ctaAriaLabel: string;
    whatsappMessage: string;
  };

  /** §17 — FAQ (11 perguntas). */
  faq: {
    h2: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };

  /** §18 — CTA final. */
  finalCta: {
    eyebrow: string;
    title: string;
    text: string;
    ctaLabel: string;
    ctaAriaLabel: string;
    whatsappMessage: string;
    complement: string;
  };
}
