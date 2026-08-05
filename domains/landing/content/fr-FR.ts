import type { LandingContent } from "./types";

/**
 * Contenu de fondation fr-FR (publié sous "/fr/").
 * NOTE : traduction fonctionnelle provisoire — révision professionnelle
 * en attente avant le lancement commercial (voir ADR 0001).
 */
export const frFR: LandingContent = {
  meta: {
    title: "Cours d'anglais à Amadora et en ligne | Best Fluency",
    description:
      "Cours d'anglais en présentiel à Venda Nova, Amadora, et en ligne pour enfants, adolescents et adultes. Cours individuels et groupes de 8 élèves maximum.",
  },
  a11y: {
    skipToContent: "Aller au contenu principal",
    toggleTheme: "Basculer entre thème clair et sombre",
    languageSwitcherLabel: "Choisir la langue",
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA ET EN LIGNE",
    notice:
      "Nous préparons notre nouveau site web. En attendant, contactez-nous sur WhatsApp pour des informations sur les cours d'anglais en présentiel à Amadora et en ligne.",
    contactsTitle: "Contacts",
  },
  cta: {
    whatsappLabel: "Discutez avec nous sur WhatsApp",
    whatsappAriaLabel: "Ouvrir une conversation WhatsApp avec Best Fluency (nouvelle fenêtre)",
    whatsappMessage:
      "Bonjour ! Je souhaite recevoir des informations sur les cours d'anglais de Best Fluency.",
  },
  notFound: {
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à la page d'accueil",
  },
  footer: {
    rightsReserved: "Tous droits réservés.",
  },
};
