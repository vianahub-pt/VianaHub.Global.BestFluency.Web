import type { LandingContent } from "./types";

/**
 * Kontextbezogene WhatsApp-Nachrichten (spec §20).
 * Nummer: 351214744028 (core/config/site.ts). Exakte Nachrichten aus der spec V2.
 */
const TRIAL_MESSAGE =
  "Hallo! Ich möchte gerne eine Englisch-Probestunde bei Best Fluency buchen.";
const INFO_MESSAGE =
  "Hallo! Ich möchte gerne Informationen über die Englischkurse von Best Fluency erhalten.";

/**
 * Inhalt de-DE (veröffentlicht unter "/de/").
 * Quelle: docs/landing-page-spec-v2.md, Abschnitte 7 bis 19.
 */
export const deDE: LandingContent = {
  meta: {
    title: "Englischunterricht in Amadora und online | Best Fluency",
    description:
      "Englischunterricht vor Ort in Venda Nova, Amadora, und online für Kinder, Jugendliche und Erwachsene. Einzelunterricht und Gruppen mit maximal 8 Lernenden.",
  },
  a11y: {
    skipToContent: "Zum Hauptinhalt springen",
    toggleTheme: "Zwischen hellem und dunklem Design wechseln",
    languageSwitcherLabel: "Sprache auswählen",
  },
  nav: {
    ariaLabel: "Hauptnavigation",
    menuAriaLabel: "Navigationsmenü",
    menuLabel: "Menü öffnen",
    closeMenuLabel: "Menü schließen",
    ctaLabel: "Probestunde buchen",
    ctaAriaLabel:
      "Probestunde buchen — WhatsApp-Unterhaltung öffnen (neues Fenster)",
    whatsappMessage: TRIAL_MESSAGE,
    links: {
      modalities: "Unterrichtsformen",
      method: "Methode",
      bestKids: "Best Kids",
      testimonials: "Erfahrungsberichte",
      faq: "FAQ",
    },
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA UND ONLINE",
    notice:
      "Wir bereiten unsere neue Website vor. Kontaktieren Sie uns in der Zwischenzeit per WhatsApp für Informationen zum Englischunterricht in Amadora und online.",
    contactsTitle: "Kontakt",
  },
  cta: {
    whatsappLabel: "Schreiben Sie uns auf WhatsApp",
    whatsappAriaLabel: "Schreiben Sie uns auf WhatsApp — WhatsApp-Unterhaltung mit Best Fluency öffnen (neues Fenster)",
    whatsappMessage: INFO_MESSAGE,
  },
  notFound: {
    title: "Seite nicht gefunden",
    description: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    backHome: "Zurück zur Startseite",
  },
  footer: {
    rightsReserved: "Alle Rechte vorbehalten.",
    privacyPolicy: "Datenschutzerklärung",
    cookiesPolicy: "Cookie-Richtlinie",
    whatsappLabel: "WhatsApp",
  },

  header: {
    logoAlt: "Best Fluency Language School",
  },

  hero: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA UND ONLINE",
    title: "Englischunterricht in Amadora und online – kommunizieren Sie mit Selbstvertrauen",
    text: "Praktischer und persönlicher Englischunterricht für Kinder, Jugendliche und Erwachsene – einzeln oder in kleinen Gruppen mit maximal 8 Lernenden.",
    complement:
      "Entwickeln Sie Ihre Kommunikation für Arbeit, Studium, Reisen und den Alltag.",
    ctaLabel: "Probestunde buchen",
    ctaAriaLabel:
      "Probestunde buchen — WhatsApp-Unterhaltung öffnen (neues Fenster)",
    ctaWhatsappMessage: TRIAL_MESSAGE,
    secondaryCtaLabel: "Unterrichtsformen entdecken",
    imageAlt: "Lehrerin von Best Fluency während einer persönlichen Englischstunde",
  },

  infoBar: {
    items: [
      "Einzelunterricht",
      "Gruppen mit bis zu 8 Lernenden",
      "Vor Ort in Amadora",
      "Online-Unterricht",
    ],
  },

  modalities: {
    h2: "Wählen Sie die Unterrichtsform, die am besten zu Ihrem Weg passt",
    intro:
      "Der Unterricht wird nach Niveau, Zielen und Verfügbarkeit der Lernenden organisiert.",
    individual: {
      title: "Vollständig persönliche Betreuung",
      text: "Inhalte, Tempo und Praxis werden auf die Bedürfnisse eines einzelnen Lernenden abgestimmt – mit Raum für spezifische Schwierigkeiten und persönliche oder berufliche Ziele.",
      note: "Vor Ort oder online",
      ctaLabel: "Ich möchte mehr über Einzelunterricht erfahren",
      ctaAriaLabel:
        "Ich möchte mehr über Einzelunterricht erfahren — WhatsApp-Unterhaltung öffnen (neues Fenster)",
      whatsappMessage:
        "Hallo! Ich möchte gerne Informationen über den Englisch-Einzelunterricht von Best Fluency erhalten.",
    },
    group: {
      title: "In einer kleinen Gruppe lernen und üben",
      text: "Nach Niveau organisierte Gruppen mit maximal 8 Lernenden für Teilnahme, Interaktion und enge Betreuung.",
      note: "Abhängig von der Gruppenzusammenstellung und Verfügbarkeit",
      ctaLabel: "Ich möchte mehr über die Gruppen erfahren",
      ctaAriaLabel:
        "Ich möchte mehr über die Gruppen erfahren — WhatsApp-Unterhaltung öffnen (neues Fenster)",
      whatsappMessage:
        "Hallo! Ich möchte gerne Informationen über die Englischgruppen von Best Fluency erhalten.",
    },
  },

  method: {
    h2: "Ein Lernweg, der für Fortschritt gemacht ist",
    intro:
      "Jeder Lernende hat einen anderen Ausgangspunkt, ein anderes Tempo und andere Ziele. Deshalb wird der Unterricht so organisiert, dass er in jeder Phase Kontinuität, Praxis und Orientierung schafft.",
    pillars: [
      {
        title: "Persönlicher Lernweg",
        text: "Inhalte und Aktivitäten werden nach Niveau, Bedürfnissen und Fortschritt des Lernenden festgelegt.",
      },
      {
        title: "Praxis mit Ziel",
        text: "Englisch wird zunehmend in Situationen angewendet, die für Arbeit, Studium, Reisen und den Alltag nützlich sind.",
      },
      {
        title: "Kontinuität und Feedback",
        text: "Jede Stunde knüpft an den vorherigen Inhalt an, mit Korrekturen und Anleitungen, die die nächsten Schritte klar machen.",
      },
      {
        title: "Aussprache und Selbstvertrauen",
        text: "Der Lernende erhält Unterstützung beim Satzbau, bei der Verbesserung der Aussprache und beim sicheren Kommunizieren.",
      },
    ],
  },

  inPerson: {
    h2: "Englischunterricht vor Ort in Venda Nova, Amadora",
    text: [
      "Der Präsenzunterricht findet im Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova – Amadora statt.",
      "Ein naher und einladender Ort, um Englisch mit persönlicher Betreuung zu lernen.",
    ],
    ctaLabel: "Standort ansehen",
    ctaAriaLabel: "Standort ansehen — Standort von Best Fluency auf Google Maps öffnen (neues Fenster)",
  },

  bestKids: {
    h2: "Englischunterricht für Kinder mit Best Kids",
    text: [
      "Bei Best Kids macht jede Stunde Englisch zu einer neuen Entdeckung. Mit Hilfe von Faísca, unserem neugierigen Fuchs, lernen Kinder durch Spiele, Geschichten, Bilder, Lieder und Herausforderungen, die an ihr Alter angepasst sind.",
      "Die Aktivitäten helfen, Wortschatz, Verständnis, Aussprache und Selbstvertrauen zu entwickeln, um Englisch natürlich und fortschrittlich zu nutzen.",
    ],
    highlight: "Mit Faísca geht Englisch überall mit.",
    differentials: [
      {
        title: "Fesselndes Lernen",
        text: "Spiele, Geschichten, Lieder und Aktivitäten, die Neugier wecken.",
      },
      {
        title: "Inhalte nach Alter und Niveau",
        text: "Unterricht, der an die Entwicklung und das Tempo jedes Kindes angepasst ist.",
      },
      {
        title: "Englisch von Anfang an",
        text: "Wörter, Ausdrücke und Alltagssituationen werden schrittweise präsentiert.",
      },
      {
        title: "Selbstvertrauen zum Kommunizieren",
        text: "Eine positive Umgebung, die Teilnahme und mündlichen Ausdruck fördert.",
      },
    ],
    practicalInfo: [
      "Kinder von 6 bis 13 Jahren",
      "Präsenzunterricht in Venda Nova, Amadora",
      "Online-Unterricht verfügbar",
      "Gruppen nach Alter und Niveau",
    ],
    ctaLabel: "Best Kids kennenlernen",
    ctaAriaLabel:
      "Best Kids kennenlernen — WhatsApp-Unterhaltung öffnen (neues Fenster)",
    whatsappMessage:
      "Hallo! Ich möchte gerne weitere Informationen über die Best Kids Kurse erhalten.",
    imageAlt: "Faísca, das Maskottchen von Best Kids, im Englischunterricht für Kinder",
  },

  testimonials: {
    starsAriaLabel: "Sterne",
    h2: "Das sagen die Lernenden von Best Fluency",
    subtitle: "Echte Erfahrungen von Menschen, die bei uns lernen und Fortschritte machen.",
    items: [
      {
        name: "Pedro António",
        source: "Google-Bewertung",
        stars: 5,
        quote: "Ich lerne viel mit teacher Taty.",
      },
      {
        name: "Sandro Vite",
        source: "Google-Bewertung",
        stars: 5,
        quote: "Unglaublich, ein sehr gut umgesetzter Unterricht, einfach und zielgerichtet.",
      },
      {
        name: "Maurício Moura",
        source: "Erfahrungsbericht via WhatsApp",
        stars: null,
        quote:
          "Die teacher verfügt über umfassende Kenntnisse der englischen Sprache und schafft es, dieses Wissen locker und verständlich an die Lernenden weiterzugeben.",
      },
      {
        name: "Wanda Ramos",
        source: "Erfahrungsbericht via WhatsApp",
        stars: null,
        quote:
          "Alles war sehr klar, mit leicht verständlichen Inhalten. Lehrerin Taty hat mir das Gefühl gegeben, meine Fragen ohne Scham oder Angst vor Fehlern stellen zu können.",
      },
    ],
    ctaLabel: "Probestunde buchen",
    ctaAriaLabel:
      "Probestunde buchen — WhatsApp-Unterhaltung öffnen (neues Fenster)",
    whatsappMessage: TRIAL_MESSAGE,
  },

  founder: {
    h2: "Lernen Sie die Gründerin von Best Fluency kennen",
    text: [
      "Hallo, ich bin Taty Viana. Ich bin Ingenieurin und Gründerin der Best Fluency Language School.",
      "Meine berufliche Erfahrung in multinationalen Unternehmen und internationalen Kontexten hat mir in der Praxis gezeigt, wie Sprachen Türen öffnen können – bei der Arbeit, im Studium, auf Reisen und im Privatleben.",
      "Mit diesem Ziel habe ich Best Fluency gegründet: jedem Lernenden zu helfen, auf eine nahe, praktische und zielorientierte Weise zu lernen.",
    ],
    imageAlt: "Taty Viana, Gründerin der Best Fluency Language School",
  },

  journey: {
    h2: "So starten Sie den Englischunterricht bei Best Fluency",
    subtitle:
      "Von der ersten Nachricht bis zur ersten Stunde begleiten wir jeden Schritt Ihres Weges.",
    steps: [
      {
        title: "Eröffnen Sie das Gespräch",
        text: "Schreiben Sie uns auf WhatsApp und erzählen Sie uns, was Sie suchen, welche Ziele Sie haben und wann Sie Zeit haben.",
      },
      {
        title: "Entdecken Sie Ihren Ausgangspunkt",
        text: "In einem kurzen Gespräch ermitteln wir Ihr aktuelles Niveau und Ihre wichtigsten Lernbedürfnisse.",
      },
      {
        title: "Planen Sie Ihre Route",
        text: "Wir legen Unterrichtsform, Inhalte und einen Lernweg fest, der auf die Ziele des Lernenden abgestimmt ist.",
      },
      {
        title: "Beginnen Sie Fortschritte zu machen",
        text: "Starten Sie den Unterricht und verfolgen Sie Ihre Entwicklung mit Praxis, Anleitung und kontinuierlichem Feedback.",
      },
    ],
    ctaLabel: "Den ersten Schritt machen",
    ctaAriaLabel:
      "Den ersten Schritt machen — WhatsApp-Unterhaltung öffnen (neues Fenster)",
    whatsappMessage: INFO_MESSAGE,
  },

  faq: {
    h2: "Häufige Fragen zum Unterricht bei Best Fluency",
    subtitle:
      "Finden Sie schnelle Antworten zum Englischunterricht vor Ort in Amadora und online.",
    items: [
      {
        question: "Wo findet der Präsenzunterricht statt?",
        answer:
          "Der Präsenzunterricht findet im Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova – Amadora statt.",
      },
      {
        question: "Gibt es auch Online-Unterricht?",
        answer:
          "Ja. Best Fluency bietet Online-Unterricht für Lernende an, die mehr Flexibilität suchen oder nicht zum Präsenzort kommen können.",
      },
      {
        question: "Gibt es Einzel- und Gruppenunterricht?",
        answer:
          "Ja. Es gibt Einzelunterricht und kleine Gruppen, die nach Niveau und Verfügbarkeit der Lernenden organisiert werden.",
      },
      {
        question: "Wie viele Lernende sind in jeder Gruppe?",
        answer:
          "Die Gruppen haben maximal 8 Lernende, was mehr Teilnahme und Betreuung während des Unterrichts ermöglicht.",
      },
      {
        question: "Für wen ist der Unterricht geeignet?",
        answer:
          "Es gibt Unterricht für Kinder, Jugendliche und Erwachsene, mit Inhalten, die nach Alter, Niveau und Zielen jedes Lernenden festgelegt werden.",
      },
      {
        question: "Muss ich Englisch können, um zu beginnen?",
        answer:
          "Nein. Der Unterricht eignet sich sowohl für Anfänger als auch für Lernende, die bereits Englischkenntnisse haben und sich weiterentwickeln möchten.",
      },
      {
        question: "Wie wird mein Niveau ermittelt?",
        answer:
          "Vor Unterrichtsbeginn führen wir ein kurzes Gespräch, um den aktuellen Kenntnisstand, die wichtigsten Schwierigkeiten und die Ziele des Lernenden zu verstehen.",
      },
      {
        question: "Ist der Unterricht persönlich angepasst?",
        answer:
          "Ja. Inhalte, Aktivitäten und Tempo des Unterrichts werden an Niveau, Bedürfnisse und Fortschritt jedes Lernenden angepasst.",
      },
      {
        question: "Wie lange dauert jede Stunde?",
        answer:
          "Jede Stunde dauert 50 Minuten und konzentriert sich auf Praxis, Teilnahme und kontinuierliche Weiterentwicklung.",
      },
      {
        question: "Wie funktioniert die Probestunde?",
        answer:
          "Die Probestunde ermöglicht es, den Ansatz von Best Fluency kennenzulernen, Fragen zu klären und zu sehen, wie der Unterricht an die Ziele des Lernenden angepasst werden kann.",
      },
      {
        question: "Wie kann ich eine Stunde buchen?",
        answer:
          "Klicken Sie einfach auf einen WhatsApp-Button und geben Sie die gewünschte Unterrichtsart und Ihre Verfügbarkeit an.",
      },
    ],
  },

  finalCta: {
    eyebrow: "BEREIT ZUM BOARDING?",
    title: "Ihr nächster Schritt im Englischen beginnt hier",
    text: "Schreiben Sie uns auf WhatsApp, klären Sie Ihre Fragen und entdecken Sie die Unterrichtsform, die am besten zu Ihrem Niveau, Ihren Zielen und Ihrem Alltag passt.",
    ctaLabel: "Probestunde buchen",
    ctaAriaLabel:
      "Probestunde buchen — WhatsApp-Unterhaltung öffnen (neues Fenster)",
    whatsappMessage:
      "Hallo! Ich möchte gerne Informationen erhalten und eine Englisch-Probestunde bei Best Fluency buchen.",
    complement: "Präsenzunterricht in Amadora und online.",
  },
};
