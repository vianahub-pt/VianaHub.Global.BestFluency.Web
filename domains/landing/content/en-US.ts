import type { LandingContent } from "./types";

/**
 * Contextual WhatsApp messages (spec §20).
 * Number: 351214744028 (core/config/site.ts). Exact messages from spec V2.
 */
const TRIAL_MESSAGE =
  "Hello! I would like to book a trial English lesson at Best Fluency.";
const INFO_MESSAGE =
  "Hello! I would like to receive information about Best Fluency's English classes.";

/**
 * en-US content (published at "/en/").
 * Source: docs/landing-page-spec-v2.md, sections 7 to 19. No British variants.
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
  nav: {
    ariaLabel: "Main navigation",
    menuAriaLabel: "Navigation menu",
    menuLabel: "Open menu",
    closeMenuLabel: "Close menu",
    ctaLabel: "Book a trial lesson",
    ctaAriaLabel:
      "Book a trial lesson: open a WhatsApp conversation (new window)",
    whatsappMessage: TRIAL_MESSAGE,
    links: {
      modalities: "Modalities",
      method: "Method",
      bestKids: "Best Kids",
      testimonials: "Testimonials",
      faq: "FAQ",
    },
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA AND ONLINE",
    notice:
      "We are preparing our new website. In the meantime, contact us on WhatsApp for information about in-person English classes in Amadora and online.",
    contactsTitle: "Contacts",
  },
  cta: {
    whatsappLabel: "Chat with us on WhatsApp",
    whatsappAriaLabel: "Chat with us on WhatsApp: open a WhatsApp conversation with Best Fluency (new window)",
    whatsappMessage: INFO_MESSAGE,
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to the homepage",
  },
  footer: {
    rightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    cookiesPolicy: "Cookie Policy",
    whatsappLabel: "WhatsApp",
  },

  header: {
    logoAlt: "Best Fluency Language School",
  },

  hero: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA AND ONLINE",
    title: "English lessons in Amadora and online to communicate with confidence",
    text: "Practical, personalized lessons for children, teens and adults, one-on-one or in small groups of up to 8 students.",
    complement:
      "Develop your communication for work, studies, travel and everyday situations.",
    ctaLabel: "Book a trial lesson",
    ctaAriaLabel:
      "Book a trial lesson: open a WhatsApp conversation (new window)",
    ctaWhatsappMessage: TRIAL_MESSAGE,
    secondaryCtaLabel: "Explore the lesson options",
    imageAlt: "Best Fluency teacher during a personalized English lesson",
  },

  infoBar: {
    items: [
      "One-on-one lessons",
      "Groups of up to 8 students",
      "In person in Amadora",
      "Online lessons",
    ],
  },

  modalities: {
    h2: "Choose the lesson option that best suits your journey",
    intro:
      "Lessons are organized according to each student's level, goals and availability.",
    individual: {
      title: "Fully personalized support",
      text: "Content, pace and practice tailored to the needs of a single student, with room to work on specific challenges and personal or professional goals.",
      note: "In person or online",
      ctaLabel: "I want to learn more about one-on-one lessons",
      ctaAriaLabel:
        "I want to learn more about one-on-one lessons: open a WhatsApp conversation (new window)",
      whatsappMessage:
        "Hello! I would like to receive information about Best Fluency's one-on-one English lessons.",
    },
    group: {
      title: "Learn and practice in a small group",
      text: "Groups organized by level, with a maximum of 8 students, to allow participation, interaction and close support.",
      note: "Subject to group formation and availability",
      ctaLabel: "I want to learn more about the groups",
      ctaAriaLabel:
        "I want to learn more about the groups: open a WhatsApp conversation (new window)",
      whatsappMessage:
        "Hello! I would like to receive information about Best Fluency's English groups.",
    },
  },

  method: {
    h2: "A learning journey designed to help you progress",
    intro:
      "Every student has a different starting point, pace and goals. That is why lessons are organized to create continuity, practice and guidance at every stage.",
    pillars: [
      {
        title: "Personalized path",
        text: "Content and activities are defined according to the student's level, needs and progress.",
      },
      {
        title: "Purposeful practice",
        text: "English is used progressively in situations that are useful for work, studies, travel and everyday life.",
      },
      {
        title: "Continuity and feedback",
        text: "Each lesson builds on the previous content, with corrections and guidance that make the next steps clear.",
      },
      {
        title: "Pronunciation and confidence",
        text: "Students receive support to build sentences, improve pronunciation and communicate more confidently.",
      },
    ],
  },

  inPerson: {
    h2: "In-person English lessons in Venda Nova, Amadora",
    text: [
      "In-person lessons take place at Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      "A close and welcoming space to learn English with personalized support.",
    ],
    ctaLabel: "View location",
    ctaAriaLabel: "View location: open Best Fluency's location on Google Maps (new window)",
  },

  bestKids: {
    h2: "English lessons for children with Best Kids",
    text: [
      "At Best Kids, every lesson turns English into a new discovery. With the help of Faísca, our curious fox, children learn through games, stories, pictures, songs and challenges adapted to their age.",
      "The activities help develop vocabulary, comprehension, pronunciation and confidence to use English naturally and progressively.",
    ],
    highlight: "With Faísca, English goes with them everywhere.",
    differentials: [
      {
        title: "Engaging learning",
        text: "Games, stories, songs and activities that spark curiosity.",
      },
      {
        title: "Content by age and level",
        text: "Lessons adapted to each child's development and pace.",
      },
      {
        title: "Contact with English from the start",
        text: "Everyday words, expressions and situations presented progressively.",
      },
      {
        title: "Confidence to communicate",
        text: "A positive environment that encourages participation and speaking.",
      },
    ],
    practicalInfo: [
      "Children aged 6 to 13",
      "In-person lessons in Venda Nova, Amadora",
      "Online lessons available",
      "Groups organized by age and level",
    ],
    ctaLabel: "Get to know Best Kids",
    ctaAriaLabel:
      "Get to know Best Kids: open a WhatsApp conversation (new window)",
    whatsappMessage:
      "Hello! I would like more information about Best Kids lessons.",
    imageAlt: "Faísca, Best Kids mascot, in English lessons for children",
  },

  testimonials: {
    starsAriaLabel: "stars",
    h2: "What Best Fluency students say",
    subtitle: "Real experiences from people who are learning and growing with us.",
    items: [
      {
        name: "Pedro António",
        source: "Google review",
        stars: 5,
        quote: "I learn a lot with teacher Taty.",
      },
      {
        name: "Sandro Vite",
        source: "Google review",
        stars: 5,
        quote: "Amazing, teaching that is very well applied and in a simple, objective way.",
      },
      {
        name: "Maurício Moura",
        source: "Testimonial via WhatsApp",
        stars: null,
        quote:
          "The teacher has vast knowledge of the English language and the ability to pass that knowledge on to students in a relaxed way.",
      },
      {
        name: "Wanda Ramos",
        source: "Testimonial via WhatsApp",
        stars: null,
        quote:
          "Everything was very clear, with easy-to-understand content. Teacher Taty made me feel very comfortable asking my questions without embarrassment or fear of making mistakes.",
      },
    ],
    ctaLabel: "Book a trial lesson",
    ctaAriaLabel:
      "Book a trial lesson: open a WhatsApp conversation (new window)",
    whatsappMessage: TRIAL_MESSAGE,
  },

  founder: {
    h2: "Meet the founder of Best Fluency",
    text: [
      "Hello, I'm Taty Viana. I'm an engineer by training and the founder of Best Fluency Language School.",
      "My professional experience in multinational companies and international contexts showed me, in practice, how languages can open doors at work, in studies, in travel and in personal life.",
      "That is why I created Best Fluency: to help every student learn in a close, practical way, focused on their goals.",
    ],
    imageAlt: "Taty Viana, founder of Best Fluency Language School",
  },

  journey: {
    h2: "How to start English lessons at Best Fluency",
    subtitle:
      "From the first message to the first lesson, we support you at every step of your journey.",
    steps: [
      {
        title: "Start the conversation",
        text: "Send us a message on WhatsApp and tell us what you are looking for, your goals and your availability.",
      },
      {
        title: "Discover your starting point",
        text: "In a brief conversation, we identify your current level and main learning needs.",
      },
      {
        title: "Plan your route",
        text: "We define the lesson option, content and a learning path adapted to the student's goals.",
      },
      {
        title: "Start moving forward",
        text: "Start the lessons and track your progress with practice, guidance and ongoing feedback.",
      },
    ],
    ctaLabel: "Take the first step",
    ctaAriaLabel:
      "Take the first step: open a WhatsApp conversation (new window)",
    whatsappMessage: INFO_MESSAGE,
  },

  faq: {
    h2: "Frequently asked questions about Best Fluency lessons",
    subtitle:
      "Find quick answers about in-person English lessons in Amadora and online.",
    items: [
      {
        question: "Where do in-person lessons take place?",
        answer:
          "In-person lessons take place at Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      },
      {
        question: "Are there also online lessons?",
        answer:
          "Yes. Best Fluency offers online lessons for students looking for more flexibility or who cannot travel to the in-person space.",
      },
      {
        question: "Are there one-on-one and group lessons?",
        answer:
          "Yes. There are one-on-one lessons and small groups, organized according to the students' level and availability.",
      },
      {
        question: "How many students are in each group?",
        answer:
          "Groups have a maximum of 8 students, allowing more participation and support during lessons.",
      },
      {
        question: "Who are the lessons for?",
        answer:
          "There are lessons for children, teens and adults, with content defined according to each student's age, level and goals.",
      },
      {
        question: "Do I need to know English to start?",
        answer:
          "No. Lessons are suitable for both beginners and students who already have some English knowledge and want to keep progressing.",
      },
      {
        question: "How is my level identified?",
        answer:
          "Before the lessons start, we have a brief conversation to understand the student's current knowledge, main difficulties and goals.",
      },
      {
        question: "Are the lessons personalized?",
        answer:
          "Yes. The content, activities and pace of the lessons are adjusted to each student's level, needs and progress.",
      },
      {
        question: "How long does each lesson last?",
        answer:
          "Each lesson lasts 50 minutes, focused on practice, participation and continuous progress.",
      },
      {
        question: "How does the trial lesson work?",
        answer:
          "The trial lesson lets you get to know Best Fluency's approach, ask questions and see how the teaching can be adapted to the student's goals.",
      },
      {
        question: "How can I book a lesson?",
        answer:
          "Just click a WhatsApp button and tell us the type of lesson you want and your availability.",
      },
    ],
  },

  finalCta: {
    eyebrow: "READY TO BOARD?",
    title: "Your next step in English starts here",
    text: "Talk to us on WhatsApp, ask your questions and discover the lesson option that best suits your level, goals and routine.",
    ctaLabel: "Book a trial lesson",
    ctaAriaLabel:
      "Book a trial lesson: open a WhatsApp conversation (new window)",
    whatsappMessage:
      "Hello! I would like to receive information and book a trial English lesson at Best Fluency.",
    complement: "In-person lessons in Amadora and online.",
  },
};
