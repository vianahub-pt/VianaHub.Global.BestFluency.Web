import type { LandingContent } from "./types";

/**
 * Conteúdo de fundação en-US (publicado em "/en/").
 * NOTA: tradução funcional provisória — revisão profissional pendente antes
 * do lançamento comercial (ver ADR 0001, informações pendentes).
 */
export const enUS: LandingContent = {
  meta: {
    title: "English Classes in Amadora and Online | Best Fluency",
    description:
      "In-person English classes in Venda Nova, Amadora, and online for children, teens and adults. Individual lessons and groups of up to 8 students.",
  },
  a11y: {
    skipToContent: "Skip to main content",
    toggleTheme: "Toggle light and dark theme",
    languageSwitcherLabel: "Select language",
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA AND ONLINE",
    notice:
      "We are preparing our new website. In the meantime, contact us on WhatsApp for information about in-person English classes in Amadora and online.",
    contactsTitle: "Contacts",
  },
  cta: {
    whatsappLabel: "Chat with us on WhatsApp",
    whatsappAriaLabel: "Open a WhatsApp conversation with Best Fluency (new window)",
    whatsappMessage:
      "Hello! I would like to receive information about Best Fluency's English classes.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to the homepage",
  },
  footer: {
    rightsReserved: "All rights reserved.",
  },
};
