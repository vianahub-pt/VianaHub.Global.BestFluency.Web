import type { LandingContent } from "./types";

/**
 * Contenuti di fondazione it-IT (pubblicati sotto "/it/").
 * NOTA: traduzione funzionale provvisoria — revisione professionale in
 * attesa prima del lancio commerciale (vedi ADR 0001).
 */
export const itIT: LandingContent = {
  meta: {
    title: "Lezioni di inglese ad Amadora e online | Best Fluency",
    description:
      "Lezioni di inglese in presenza a Venda Nova, Amadora, e online per bambini, ragazzi e adulti. Lezioni individuali e gruppi fino a 8 studenti.",
  },
  a11y: {
    skipToContent: "Vai al contenuto principale",
    toggleTheme: "Cambia tra tema chiaro e scuro",
    languageSwitcherLabel: "Seleziona la lingua",
  },
  nav: {
    ariaLabel: "Navigazione principale",
    menuAriaLabel: "Menu di navigazione",
    menuLabel: "Apri menu",
    closeMenuLabel: "Chiudi menu",
    ctaLabel: "Prenota una lezione di prova",
    ctaAriaLabel:
      "Apri una conversazione WhatsApp per prenotare una lezione di prova (nuova finestra)",
    whatsappMessage:
      "Ciao! Vorrei prenotare una lezione di prova di inglese alla Best Fluency.",
    links: {
      modalities: "Modalità",
      method: "Metodo",
      bestKids: "Best Kids",
      testimonials: "Testimonianze",
      faq: "FAQ",
    },
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA E ONLINE",
    notice:
      "Stiamo preparando il nostro nuovo sito web. Nel frattempo, contattaci su WhatsApp per informazioni sulle lezioni di inglese in presenza ad Amadora e online.",
    contactsTitle: "Contatti",
  },
  cta: {
    whatsappLabel: "Scrivici su WhatsApp",
    whatsappAriaLabel: "Apri una conversazione WhatsApp con Best Fluency (nuova finestra)",
    whatsappMessage:
      "Ciao! Vorrei ricevere informazioni sulle lezioni di inglese di Best Fluency.",
  },
  notFound: {
    title: "Pagina non trovata",
    description: "La pagina che cerchi non esiste o è stata spostata.",
    backHome: "Torna alla pagina principale",
  },
  footer: {
    rightsReserved: "Tutti i diritti riservati.",
  },
};
