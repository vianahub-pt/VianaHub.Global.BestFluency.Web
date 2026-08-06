import type { LandingContent } from "./types";

/**
 * Conteúdo oficial pt-PT (versão principal, publicada em "/").
 * Title e meta description são os aprovados na especificação V2 (§21).
 */
export const ptPT: LandingContent = {
  meta: {
    title: "Aulas de Inglês na Amadora e Online | Best Fluency",
    description:
      "Aulas de inglês presenciais na Venda Nova, Amadora, e online para crianças, jovens e adultos. Opções individuais e turmas até 8 alunos.",
  },
  a11y: {
    skipToContent: "Saltar para o conteúdo principal",
    toggleTheme: "Alternar tema claro e escuro",
    languageSwitcherLabel: "Selecionar idioma",
  },
  nav: {
    ariaLabel: "Navegação principal",
    menuAriaLabel: "Menu de navegação",
    menuLabel: "Abrir menu",
    closeMenuLabel: "Fechar menu",
    ctaLabel: "Marcar aula experimental",
    ctaAriaLabel:
      "Abrir conversa no WhatsApp para marcar uma aula experimental (nova janela)",
    whatsappMessage:
      "Olá! Gostaria de marcar uma aula experimental de inglês na Best Fluency.",
    links: {
      modalities: "Modalidades",
      method: "Método",
      bestKids: "Best Kids",
      testimonials: "Depoimentos",
      faq: "FAQ",
    },
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA E ONLINE",
    notice:
      "Estamos a preparar o nosso novo website. Entretanto, fale connosco pelo WhatsApp para informações sobre aulas de inglês presenciais na Amadora e online.",
    contactsTitle: "Contactos",
  },
  cta: {
    whatsappLabel: "Falar connosco no WhatsApp",
    whatsappAriaLabel: "Abrir conversa no WhatsApp com a Best Fluency (nova janela)",
    whatsappMessage:
      "Olá! Gostaria de receber informações sobre as aulas da Best Fluency.",
  },
  notFound: {
    title: "Página não encontrada",
    description: "A página que procura não existe ou foi movida.",
    backHome: "Voltar à página inicial",
  },
  footer: {
    rightsReserved: "Todos os direitos reservados.",
  },
};
