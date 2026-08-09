import type { LandingContent } from "./types";

/**
 * Mensagens de WhatsApp contextuais (spec §20).
 * Número: 351214744028 (core/config/site.ts). Mensagens exatas da spec V2.
 */
const TRIAL_MESSAGE =
  "Olá! Gostaria de agendar uma aula experimental de inglês na Best Fluency.";
const INFO_MESSAGE =
  "Olá! Gostaria de receber informações sobre as aulas da Best Fluency.";

/**
 * Conteúdo pt-BR (publicado em "/pt-br/").
 * Fonte: docs/landing-page-spec-v2.md, secções 7 a 19 (adaptação ao português
 * do Brasil). Marca, nomes próprios e morada não são traduzidos.
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
      "Agendar aula experimental — abrir conversa no WhatsApp (nova janela)",
    whatsappMessage: TRIAL_MESSAGE,
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
    whatsappAriaLabel:
      "Fale conosco no WhatsApp — abrir conversa com a Best Fluency (nova janela)",
    whatsappMessage: INFO_MESSAGE,
  },
  notFound: {
    title: "Página não encontrada",
    description: "A página que você procura não existe ou foi movida.",
    backHome: "Voltar à página inicial",
  },
  footer: {
    rightsReserved: "Todos os direitos reservados.",
    privacyPolicy: "Política de Privacidade",
    cookiesPolicy: "Política de Cookies",
    whatsappLabel: "WhatsApp",
  },

  header: {
    logoAlt: "Best Fluency Language School",
  },

  hero: {
    title: "Pare de travar. Comece a falar inglês com confiança.",
    text: "Aulas práticas e personalizadas para crianças, jovens e adultos, no formato individual ou em turmas reduzidas com no máximo 8 alunos.",
    ctaLabel: "Agendar aula experimental",
    ctaAriaLabel:
      "Agendar aula experimental — abrir conversa no WhatsApp (nova janela)",
    ctaWhatsappMessage: TRIAL_MESSAGE,
  },

  infoBar: {
    items: [
      "Aulas individuais",
      "Turmas de até 8 alunos",
      "Presencial na Amadora",
      "Aulas online",
    ],
  },

  modalities: {
    h2: "Escolha a modalidade mais adequada ao seu percurso",
    intro:
      "As aulas são organizadas de acordo com o nível, os objetivos e a disponibilidade dos alunos.",
    individual: {
      title: "Acompanhamento totalmente personalizado",
      text: "Conteúdos, ritmo e prática ajustados às necessidades de um único aluno, com espaço para trabalhar dificuldades específicas e objetivos pessoais ou profissionais.",
      note: "Presencial ou online",
      ctaLabel: "Quero saber mais sobre aulas individuais",
      ctaAriaLabel:
        "Quero saber mais sobre aulas individuais — abrir conversa no WhatsApp (nova janela)",
      whatsappMessage:
        "Olá! Gostaria de receber informações sobre as aulas individuais de inglês da Best Fluency.",
    },
    group: {
      title: "Aprender e praticar em um grupo pequeno",
      text: "Turmas organizadas por nível, com no máximo 8 alunos, para permitir participação, interação e acompanhamento próximo.",
      note: "Sujeito à formação de turma e disponibilidade",
      ctaLabel: "Quero saber mais sobre as turmas",
      ctaAriaLabel:
        "Quero saber mais sobre as turmas — abrir conversa no WhatsApp (nova janela)",
      whatsappMessage:
        "Olá! Gostaria de receber informações sobre as turmas de inglês da Best Fluency.",
    },
  },

  method: {
    h2: "Um percurso de aprendizagem pensado para evoluir",
    intro:
      "Cada aluno tem um ponto de partida, um ritmo e objetivos diferentes. Por isso, as aulas são organizadas para criar continuidade, prática e orientação em cada etapa.",
    pillars: [
      {
        title: "Percurso personalizado",
        text: "Os conteúdos e as atividades são definidos de acordo com o nível, as necessidades e a evolução do aluno.",
      },
      {
        title: "Prática com propósito",
        text: "O inglês é utilizado progressivamente em situações úteis para o trabalho, os estudos, as viagens e o dia a dia.",
      },
      {
        title: "Continuidade e feedback",
        text: "Cada aula dá seguimento ao conteúdo anterior, com correções e orientações que tornam os próximos passos claros.",
      },
      {
        title: "Pronúncia e confiança",
        text: "O aluno recebe apoio para construir frases, melhorar a pronúncia e comunicar com maior segurança.",
      },
    ],
  },

  inPerson: {
    h2: "Aulas de inglês presenciais na Venda Nova, Amadora",
    text: [
      "As aulas presenciais acontecem no Espaço CASA, na Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      "Um espaço próximo e acolhedor para aprender inglês com acompanhamento personalizado.",
    ],
    ctaLabel: "Ver localização",
    ctaAriaLabel:
      "Ver localização — abrir a localização da Best Fluency no Google Maps (nova janela)",
  },

  bestKids: {
    h2: "Aulas de inglês para crianças com a Best Kids",
    text: [
      "Na Best Kids, cada aula transforma o inglês em uma nova descoberta. Com a ajuda da Faísca, a nossa raposa curiosa, as crianças aprendem por meio de jogos, histórias, imagens, músicas e desafios adaptados à sua idade.",
      "As atividades ajudam a desenvolver vocabulário, compreensão, pronúncia e confiança para usar o inglês de forma natural e progressiva.",
    ],
    highlight: "Com a Faísca, o inglês vai com eles para todo lugar.",
    differentials: [
      {
        title: "Aprendizagem envolvente",
        text: "Jogos, histórias, músicas e atividades que despertam a curiosidade.",
      },
      {
        title: "Conteúdos por idade e nível",
        text: "Aulas adaptadas ao desenvolvimento e ao ritmo de cada criança.",
      },
      {
        title: "Contato com o inglês desde o início",
        text: "Palavras, expressões e situações do dia a dia apresentadas de forma progressiva.",
      },
      {
        title: "Confiança para comunicar",
        text: "Um ambiente positivo que incentiva a participação e a expressão oral.",
      },
    ],
    practicalInfo: [
      "Crianças de 6 a 13 anos",
      "Aulas presenciais na Venda Nova, Amadora",
      "Aulas online disponíveis",
      "Turmas organizadas por idade e nível",
    ],
    ctaLabel: "Conhecer a Best Kids",
    ctaAriaLabel:
      "Conhecer a Best Kids — abrir conversa no WhatsApp (nova janela)",
    whatsappMessage:
      "Olá! Gostaria de receber mais informações sobre as aulas Best Kids.",
    imageAlt: "Faísca, mascote da Best Kids, nas aulas de inglês para crianças",
  },

  testimonials: {
    starsAriaLabel: "estrelas",
    h2: "O que dizem os alunos da Best Fluency",
    subtitle:
      "Experiências reais de quem está aprendendo e evoluindo com a gente.",
    items: [
      {
        name: "Pedro António",
        source: "Avaliação Google",
        stars: 5,
        quote: "Aprendo muito com a teacher Taty.",
      },
      {
        name: "Sandro Vite",
        source: "Avaliação Google",
        stars: 5,
        quote:
          "Incrível, um ensino muito bem aplicado e de maneira simples e objetiva.",
      },
      {
        name: "Maurício Moura",
        source: "Depoimento via WhatsApp",
        stars: null,
        quote:
          "A teacher possui vasto conhecimento da língua inglesa e facilidade para transferir esse conhecimento para os alunos, de uma forma descontraída.",
      },
      {
        name: "Wanda Ramos",
        source: "Depoimento via WhatsApp",
        stars: null,
        quote:
          "Foi tudo muito explícito, com conteúdo de fácil compreensão. A professora Taty me deixou muito à vontade para tirar as minhas dúvidas sem vergonha ou receio de errar.",
      },
    ],
    ctaLabel: "Agendar aula experimental",
    ctaAriaLabel:
      "Agendar aula experimental — abrir conversa no WhatsApp (nova janela)",
    whatsappMessage: TRIAL_MESSAGE,
  },

  founder: {
    h2: "Conheça a fundadora da Best Fluency",
    text: [
      "Olá, sou a Taty Viana. Sou engenheira de formação e fundadora da Best Fluency Language School.",
      "A minha experiência profissional em empresas multinacionais e contextos internacionais mostrou, na prática, como os idiomas podem abrir portas no trabalho, nos estudos, nas viagens e na vida pessoal.",
      "Foi com esse propósito que criei a Best Fluency: ajudar cada aluno a aprender de forma próxima, prática e orientada para os seus objetivos.",
    ],
    imageAlt: "Taty Viana, fundadora da Best Fluency Language School",
  },

  journey: {
    h2: "Como começar as aulas de inglês na Best Fluency",
    subtitle:
      "Da primeira mensagem à primeira aula, acompanhamos cada passo do seu percurso.",
    steps: [
      {
        title: "Abra a conversa",
        text: "Envie-nos uma mensagem pelo WhatsApp e conte-nos o que procura, os seus objetivos e a sua disponibilidade.",
      },
      {
        title: "Descubra o seu ponto de partida",
        text: "Numa breve conversa, identificamos o nível atual e as principais necessidades de aprendizagem.",
      },
      {
        title: "Trace a sua rota",
        text: "Definimos a modalidade, os conteúdos e um percurso de aprendizagem adaptado aos objetivos do aluno.",
      },
      {
        title: "Comece a avançar",
        text: "Inicie as aulas e acompanhe a evolução com prática, orientação e feedback contínuo.",
      },
    ],
    ctaLabel: "Dar o primeiro passo",
    ctaAriaLabel:
      "Dar o primeiro passo — abrir conversa no WhatsApp (nova janela)",
    whatsappMessage: INFO_MESSAGE,
  },

  faq: {
    h2: "Perguntas frequentes sobre as aulas da Best Fluency",
    subtitle:
      "Encontre respostas rápidas sobre as aulas de inglês presenciais na Amadora e online.",
    items: [
      {
        question: "Onde acontecem as aulas presenciais?",
        answer:
          "As aulas presenciais acontecem no Espaço CASA, na Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      },
      {
        question: "Também existem aulas online?",
        answer:
          "Sim. A Best Fluency disponibiliza aulas online para alunos que buscam maior flexibilidade ou que não conseguem se deslocar até o espaço presencial.",
      },
      {
        question: "Existem aulas individuais e em grupo?",
        answer:
          "Sim. Existem aulas individuais e turmas reduzidas, organizadas de acordo com o nível e a disponibilidade dos alunos.",
      },
      {
        question: "Quantos alunos existem em cada turma?",
        answer:
          "As turmas têm no máximo 8 alunos, permitindo maior participação e acompanhamento durante as aulas.",
      },
      {
        question: "Para quem são as aulas?",
        answer:
          "Existem aulas para crianças, jovens e adultos, com conteúdos definidos de acordo com a idade, o nível e os objetivos de cada aluno.",
      },
      {
        question: "Preciso saber inglês para começar?",
        answer:
          "Não. As aulas são adequadas tanto para iniciantes como para alunos que já possuem conhecimentos de inglês e pretendem continuar a evoluir.",
      },
      {
        question: "Como é identificado o meu nível?",
        answer:
          "Antes do início das aulas, realizamos uma breve conversa para compreender os conhecimentos atuais, as principais dificuldades e os objetivos do aluno.",
      },
      {
        question: "As aulas são personalizadas?",
        answer:
          "Sim. Os conteúdos, as atividades e o ritmo das aulas são ajustados ao nível, às necessidades e à evolução de cada aluno.",
      },
      {
        question: "Quanto tempo dura cada aula?",
        answer:
          "Cada aula tem a duração de 50 minutos, com foco na prática, na participação e na evolução contínua.",
      },
      {
        question: "Como funciona a aula experimental?",
        answer:
          "A aula experimental permite conhecer a abordagem da Best Fluency, esclarecer dúvidas e perceber como o ensino pode ser adaptado aos objetivos do aluno.",
      },
      {
        question: "Como posso agendar uma aula?",
        answer:
          "Basta clicar em um botão do WhatsApp e indicar o tipo de aula pretendido e a disponibilidade.",
      },
    ],
  },

  finalCta: {
    eyebrow: "PRONTO PARA EMBARCAR?",
    title: "O seu próximo passo no inglês começa aqui",
    text: "Fale com a gente pelo WhatsApp, esclareça as suas dúvidas e descubra a modalidade mais adequada ao seu nível, aos seus objetivos e à sua rotina.",
    ctaLabel: "Agendar aula experimental",
    ctaAriaLabel:
      "Agendar aula experimental — abrir conversa no WhatsApp (nova janela)",
    whatsappMessage:
      "Olá! Gostaria de receber informações e agendar uma aula experimental de inglês na Best Fluency.",
    complement: "Aulas presenciais na Amadora e online.",
  },
};
