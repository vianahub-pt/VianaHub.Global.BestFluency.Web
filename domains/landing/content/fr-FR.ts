import type { LandingContent } from "./types";

/**
 * Messages WhatsApp contextuels (spec §20).
 * Numéro : 351214744028 (core/config/site.ts). Messages exacts de la spec V2.
 */
const TRIAL_MESSAGE =
  "Bonjour ! Je souhaite réserver un cours d'essai d'anglais à Best Fluency.";
const INFO_MESSAGE =
  "Bonjour ! Je souhaite recevoir des informations sur les cours d'anglais de Best Fluency.";

/**
 * Contenu fr-FR (publié sous "/fr/").
 * Source : docs/landing-page-spec-v2.md, sections 7 à 19.
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
  nav: {
    ariaLabel: "Navigation principale",
    menuAriaLabel: "Menu de navigation",
    menuLabel: "Ouvrir le menu",
    closeMenuLabel: "Fermer le menu",
    ctaLabel: "Réserver un cours d'essai",
    ctaAriaLabel:
      "Réserver un cours d'essai — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
    whatsappMessage: TRIAL_MESSAGE,
    links: {
      modalities: "Modalités",
      method: "Méthode",
      bestKids: "Best Kids",
      testimonials: "Témoignages",
      faq: "FAQ",
    },
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA ET EN LIGNE",
    notice:
      "Nous préparons notre nouveau site web. En attendant, contactez-nous sur WhatsApp pour des informations sur les cours d'anglais en présentiel à Amadora et en ligne.",
    contactsTitle: "Contacts",
  },
  cta: {
    whatsappLabel: "Discutez avec nous sur WhatsApp",
    whatsappAriaLabel: "Discutez avec nous sur WhatsApp — ouvrir une conversation avec Best Fluency (nouvelle fenêtre)",
    whatsappMessage: INFO_MESSAGE,
  },
  notFound: {
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à la page d'accueil",
  },
  footer: {
    rightsReserved: "Tous droits réservés.",
    privacyPolicy: "Politique de confidentialité",
    cookiesPolicy: "Politique de cookies",
    whatsappLabel: "WhatsApp",
  },

  header: {
    logoAlt: "Best Fluency Language School",
  },

  hero: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA ET EN LIGNE",
    title: "Des cours d'anglais à Amadora et en ligne pour communiquer avec confiance",
    text: "Des cours pratiques et personnalisés pour enfants, adolescents et adultes, en format individuel ou en petits groupes de 8 élèves maximum.",
    complement:
      "Développez votre communication pour le travail, les études, les voyages et la vie quotidienne.",
    ctaLabel: "Réserver un cours d'essai",
    ctaAriaLabel:
      "Réserver un cours d'essai — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
    ctaWhatsappMessage: TRIAL_MESSAGE,
    secondaryCtaLabel: "Découvrir les modalités",
    imageAlt: "Professeure de Best Fluency pendant un cours d'anglais personnalisé",
  },

  infoBar: {
    items: [
      "Cours individuels",
      "Groupes de 8 élèves maximum",
      "En présentiel à Amadora",
      "Cours en ligne",
    ],
  },

  modalities: {
    h2: "Choisissez la modalité la plus adaptée à votre parcours",
    intro:
      "Les cours sont organisés selon le niveau, les objectifs et la disponibilité des élèves.",
    individual: {
      title: "Un accompagnement entièrement personnalisé",
      text: "Contenus, rythme et pratique ajustés aux besoins d'un seul élève, avec un espace pour travailler les difficultés spécifiques et les objectifs personnels ou professionnels.",
      note: "En présentiel ou en ligne",
      ctaLabel: "Je veux en savoir plus sur les cours individuels",
      ctaAriaLabel:
        "Je veux en savoir plus sur les cours individuels — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
      whatsappMessage:
        "Bonjour ! Je souhaite recevoir des informations sur les cours individuels d'anglais de Best Fluency.",
    },
    group: {
      title: "Apprendre et pratiquer dans un petit groupe",
      text: "Groupes organisés par niveau, avec un maximum de 8 élèves, pour permettre la participation, l'interaction et un accompagnement de proximité.",
      note: "Sous réserve de constitution du groupe et de disponibilité",
      ctaLabel: "Je veux en savoir plus sur les groupes",
      ctaAriaLabel:
        "Je veux en savoir plus sur les groupes — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
      whatsappMessage:
        "Bonjour ! Je souhaite recevoir des informations sur les groupes d'anglais de Best Fluency.",
    },
  },

  method: {
    h2: "Un parcours d'apprentissage pensé pour évoluer",
    intro:
      "Chaque élève a un point de départ, un rythme et des objectifs différents. C'est pourquoi les cours sont organisés pour créer continuité, pratique et orientation à chaque étape.",
    pillars: [
      {
        title: "Parcours personnalisé",
        text: "Les contenus et les activités sont définis selon le niveau, les besoins et la progression de l'élève.",
      },
      {
        title: "Pratique avec un objectif",
        text: "L'anglais est utilisé progressivement dans des situations utiles pour le travail, les études, les voyages et le quotidien.",
      },
      {
        title: "Continuité et feedback",
        text: "Chaque cours fait suite au contenu précédent, avec des corrections et des orientations qui rendent les prochaines étapes claires.",
      },
      {
        title: "Prononciation et confiance",
        text: "L'élève reçoit un accompagnement pour construire des phrases, améliorer sa prononciation et communiquer avec plus d'assurance.",
      },
    ],
  },

  inPerson: {
    h2: "Cours d'anglais en présentiel à Venda Nova, Amadora",
    text: [
      "Les cours en présentiel se déroulent à l'Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      "Un espace proche et chaleureux pour apprendre l'anglais avec un accompagnement personnalisé.",
    ],
    ctaLabel: "Voir l'emplacement",
    ctaAriaLabel: "Voir l'emplacement — ouvrir l'emplacement de Best Fluency sur Google Maps (nouvelle fenêtre)",
  },

  bestKids: {
    h2: "Des cours d'anglais pour les enfants avec Best Kids",
    text: [
      "Chez Best Kids, chaque cours transforme l'anglais en une nouvelle découverte. Avec l'aide de Faísca, notre curieux renard, les enfants apprennent à travers des jeux, des histoires, des images, des chansons et des défis adaptés à leur âge.",
      "Les activités aident à développer le vocabulaire, la compréhension, la prononciation et la confiance pour utiliser l'anglais de manière naturelle et progressive.",
    ],
    highlight: "Avec Faísca, l'anglais les accompagne partout.",
    differentials: [
      {
        title: "Apprentissage immersif",
        text: "Des jeux, des histoires, des chansons et des activités qui éveillent la curiosité.",
      },
      {
        title: "Des contenus par âge et par niveau",
        text: "Des cours adaptés au développement et au rythme de chaque enfant.",
      },
      {
        title: "Un contact avec l'anglais dès le début",
        text: "Des mots, des expressions et des situations du quotidien présentés de manière progressive.",
      },
      {
        title: "La confiance pour communiquer",
        text: "Un environnement positif qui encourage la participation et l'expression orale.",
      },
    ],
    practicalInfo: [
      "Enfants de 6 à 13 ans",
      "Cours en présentiel à Venda Nova, Amadora",
      "Cours en ligne disponibles",
      "Groupes organisés par âge et par niveau",
    ],
    ctaLabel: "Découvrir Best Kids",
    ctaAriaLabel:
      "Découvrir Best Kids — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
    whatsappMessage:
      "Bonjour ! Je souhaite recevoir plus d'informations sur les cours Best Kids.",
    imageAlt: "Faísca, mascotte de Best Kids, dans les cours d'anglais pour enfants",
  },

  testimonials: {
    starsAriaLabel: "étoiles",
    h2: "Ce que disent les élèves de Best Fluency",
    subtitle: "Des expériences réelles de personnes qui apprennent et évoluent avec nous.",
    items: [
      {
        name: "Pedro António",
        source: "Avis Google",
        stars: 5,
        quote: "J'apprends beaucoup avec la teacher Taty.",
      },
      {
        name: "Sandro Vite",
        source: "Avis Google",
        stars: 5,
        quote: "Incroyable, un enseignement très bien appliqué et de manière simple et objective.",
      },
      {
        name: "Maurício Moura",
        source: "Témoignage via WhatsApp",
        stars: null,
        quote:
          "La teacher possède une vaste connaissance de la langue anglaise et une facilité à transmettre ce savoir aux élèves, de façon décontractée.",
      },
      {
        name: "Wanda Ramos",
        source: "Témoignage via WhatsApp",
        stars: null,
        quote:
          "Tout était très explicite, avec un contenu facile à comprendre. La professeure Taty m'a mise très à l'aise pour poser mes questions sans gêne ni peur de me tromper.",
      },
    ],
    ctaLabel: "Réserver un cours d'essai",
    ctaAriaLabel:
      "Réserver un cours d'essai — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
    whatsappMessage: TRIAL_MESSAGE,
  },

  founder: {
    h2: "Découvrez la fondatrice de Best Fluency",
    text: [
      "Bonjour, je suis Taty Viana. Je suis ingénieure de formation et fondatrice de Best Fluency Language School.",
      "Mon expérience professionnelle dans des entreprises multinationales et des contextes internationaux m'a montré, concrètement, comment les langues peuvent ouvrir des portes au travail, dans les études, les voyages et la vie personnelle.",
      "C'est avec cet objectif que j'ai créé Best Fluency : aider chaque élève à apprendre de manière proche, pratique et orientée vers ses objectifs.",
    ],
    imageAlt: "Taty Viana, fondatrice de Best Fluency Language School",
  },

  journey: {
    h2: "Comment commencer les cours d'anglais à Best Fluency",
    subtitle:
      "Du premier message au premier cours, nous vous accompagnons à chaque étape de votre parcours.",
    steps: [
      {
        title: "Ouvrez la conversation",
        text: "Envoyez-nous un message sur WhatsApp et dites-nous ce que vous recherchez, vos objectifs et votre disponibilité.",
      },
      {
        title: "Découvrez votre point de départ",
        text: "Lors d'une brève conversation, nous identifions le niveau actuel et les principaux besoins d'apprentissage.",
      },
      {
        title: "Tracez votre route",
        text: "Nous définissons la modalité, les contenus et un parcours d'apprentissage adapté aux objectifs de l'élève.",
      },
      {
        title: "Commencez à avancer",
        text: "Démarrez les cours et suivez votre progression avec de la pratique, des orientations et un feedback continu.",
      },
    ],
    ctaLabel: "Faire le premier pas",
    ctaAriaLabel:
      "Faire le premier pas — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
    whatsappMessage: INFO_MESSAGE,
  },

  faq: {
    h2: "Questions fréquentes sur les cours de Best Fluency",
    subtitle:
      "Trouvez des réponses rapides sur les cours d'anglais en présentiel à Amadora et en ligne.",
    items: [
      {
        question: "Où se déroulent les cours en présentiel ?",
        answer:
          "Les cours en présentiel se déroulent à l'Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      },
      {
        question: "Y a-t-il aussi des cours en ligne ?",
        answer:
          "Oui. Best Fluency propose des cours en ligne pour les élèves qui recherchent plus de flexibilité ou qui ne peuvent pas se déplacer dans l'espace en présentiel.",
      },
      {
        question: "Y a-t-il des cours individuels et en groupe ?",
        answer:
          "Oui. Il existe des cours individuels et des petits groupes, organisés selon le niveau et la disponibilité des élèves.",
      },
      {
        question: "Combien d'élèves y a-t-il dans chaque groupe ?",
        answer:
          "Les groupes comptent au maximum 8 élèves, ce qui permet une plus grande participation et un meilleur accompagnement pendant les cours.",
      },
      {
        question: "À qui s'adressent les cours ?",
        answer:
          "Il existe des cours pour les enfants, les adolescents et les adultes, avec des contenus définis selon l'âge, le niveau et les objectifs de chaque élève.",
      },
      {
        question: "Ai-je besoin de savoir parler anglais pour commencer ?",
        answer:
          "Non. Les cours conviennent aussi bien aux débutants qu'aux élèves qui ont déjà des connaissances en anglais et souhaitent continuer à progresser.",
      },
      {
        question: "Comment mon niveau est-il identifié ?",
        answer:
          "Avant le début des cours, nous organisons une brève conversation pour comprendre les connaissances actuelles, les principales difficultés et les objectifs de l'élève.",
      },
      {
        question: "Les cours sont-ils personnalisés ?",
        answer:
          "Oui. Les contenus, les activités et le rythme des cours sont ajustés au niveau, aux besoins et à la progression de chaque élève.",
      },
      {
        question: "Combien de temps dure chaque cours ?",
        answer:
          "Chaque cours dure 50 minutes, avec un accent sur la pratique, la participation et la progression continue.",
      },
      {
        question: "Comment fonctionne le cours d'essai ?",
        answer:
          "Le cours d'essai permet de découvrir l'approche de Best Fluency, de clarifier les questions et de voir comment l'enseignement peut être adapté aux objectifs de l'élève.",
      },
      {
        question: "Comment puis-je réserver un cours ?",
        answer:
          "Il suffit de cliquer sur un bouton WhatsApp et d'indiquer le type de cours souhaité et votre disponibilité.",
      },
    ],
  },

  finalCta: {
    eyebrow: "PRÊT À EMBARQUER ?",
    title: "Votre prochaine étape en anglais commence ici",
    text: "Parlez-nous sur WhatsApp, clarifiez vos questions et découvrez la modalité la plus adaptée à votre niveau, vos objectifs et votre routine.",
    ctaLabel: "Réserver un cours d'essai",
    ctaAriaLabel:
      "Réserver un cours d'essai — ouvrir une conversation WhatsApp (nouvelle fenêtre)",
    whatsappMessage:
      "Bonjour ! Je souhaite recevoir des informations et réserver un cours d'essai d'anglais à Best Fluency.",
    complement: "Cours en présentiel à Amadora et en ligne.",
  },
};
