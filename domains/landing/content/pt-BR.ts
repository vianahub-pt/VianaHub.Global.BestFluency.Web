import type { LandingContent } from "./types";

/**
 * Conteúdo de fundação pt-BR (publicado em "/pt-br/").
 * Marca, nomes próprios e morada não são traduzidos.
 */
export const ptBR: LandingContent = {
  meta: {
    title: "Aulas de Inglês na Amadora e Online | Best Fluency",
    description:
      "Aulas de inglês presenciais na Venda Nova, Amadora, e online para crianças, jovens e adultos. Opções individuais e turmas de até 8 alunos.",
  },
  a11y: {
    skipToContent: "Pular para o conteúdo principal",
    toggleTheme: "Alternar tema claro e escuro",
    languageSwitcherLabel: "Selecionar idioma",
  },
  nav: {
    ariaLabel: "Navegação principal",
    menuAriaLabel: "Menu de navegação",
    menuLabel: "Abrir menu",
    closeMenuLabel: "Fechar menu",
    ctaLabel: "Agendar aula experimental",
    ctaAriaLabel:
      "Abrir conversa no WhatsApp para agendar uma aula experimental (nova janela)",
    whatsappMessage:
      "Olá! Gostaria de agendar uma aula experimental de inglês na Best Fluency.",
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
      "Estamos preparando nosso novo site. Enquanto isso, fale conosco pelo WhatsApp para informações sobre aulas de inglês presenciais na Amadora e online.",
    contactsTitle: "Contatos",
  },
  cta: {
    whatsappLabel: "Fale conosco no WhatsApp",
    whatsappAriaLabel: "Abrir conversa no WhatsApp com a Best Fluency (nova janela)",
    whatsappMessage:
      "Olá! Gostaria de receber informações sobre as aulas da Best Fluency.",
  },
  notFound: {
    title: "Página não encontrada",
    description: "A página que você procura não existe ou foi movida.",
    backHome: "Voltar à página inicial",
  },
  footer: {
    rightsReserved: "Todos os direitos reservados.",
  },
};
