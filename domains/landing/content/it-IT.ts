import type { LandingContent } from "./types";

/**
 * Messaggi WhatsApp contestuali (spec §20).
 * Numero: 351214744028 (core/config/site.ts). Messaggi esatti della spec V2.
 */
const TRIAL_MESSAGE =
  "Ciao! Vorrei prenotare una lezione di prova di inglese alla Best Fluency.";
const INFO_MESSAGE =
  "Ciao! Vorrei ricevere informazioni sulle lezioni di inglese di Best Fluency.";

/**
 * Contenuti it-IT (pubblicati sotto "/it/").
 * Fonte: docs/landing-page-spec-v2.md, sezioni 7-19.
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
      "Prenota una lezione di prova — apri una conversazione WhatsApp (nuova finestra)",
    whatsappMessage: TRIAL_MESSAGE,
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
    whatsappAriaLabel:
      "Scrivici su WhatsApp — apri una conversazione WhatsApp con Best Fluency (nuova finestra)",
    whatsappMessage: INFO_MESSAGE,
  },
  notFound: {
    title: "Pagina non trovata",
    description: "La pagina che cerchi non esiste o è stata spostata.",
    backHome: "Torna alla pagina principale",
  },
  footer: {
    rightsReserved: "Tutti i diritti riservati.",
    privacyPolicy: "Informativa sulla privacy",
    cookiesPolicy: "Informativa sui cookie",
    whatsappLabel: "WhatsApp",
  },

  header: {
    logoAlt: "Best Fluency Language School",
  },

  hero: {
    title: "Smetti di bloccarti. Inizia a parlare inglese con sicurezza.",
    text: "Lezioni pratiche e personalizzate per bambini, ragazzi e adulti, in formato individuale o in piccoli gruppi con un massimo di 8 studenti.",
    ctaLabel: "Prenota una lezione di prova",
    ctaAriaLabel:
      "Prenota una lezione di prova — apri una conversazione WhatsApp (nuova finestra)",
    ctaWhatsappMessage: TRIAL_MESSAGE,
  },

  infoBar: {
    items: [
      "Lezioni individuali",
      "Gruppi fino a 8 studenti",
      "In presenza ad Amadora",
      "Lezioni online",
    ],
  },

  modalities: {
    h2: "Scegli la modalità più adatta al tuo percorso",
    intro:
      "Le lezioni sono organizzate in base al livello, agli obiettivi e alla disponibilità degli studenti.",
    individual: {
      title: "Un accompagnamento completamente personalizzato",
      text: "Contenuti, ritmo e pratica adattati alle esigenze di un singolo studente, con spazio per lavorare su difficoltà specifiche e obiettivi personali o professionali.",
      note: "In presenza o online",
      ctaLabel: "Voglio saperne di più sulle lezioni individuali",
      ctaAriaLabel:
        "Voglio saperne di più sulle lezioni individuali — apri una conversazione WhatsApp (nuova finestra)",
      whatsappMessage:
        "Ciao! Vorrei ricevere informazioni sulle lezioni individuali di inglese di Best Fluency.",
    },
    group: {
      title: "Imparare e fare pratica in un piccolo gruppo",
      text: "Gruppi organizzati per livello, con un massimo di 8 studenti, per favorire partecipazione, interazione e un accompagnamento ravvicinato.",
      note: "Soggetto alla formazione del gruppo e alla disponibilità",
      ctaLabel: "Voglio saperne di più sui gruppi",
      ctaAriaLabel:
        "Voglio saperne di più sui gruppi — apri una conversazione WhatsApp (nuova finestra)",
      whatsappMessage:
        "Ciao! Vorrei ricevere informazioni sui gruppi di inglese di Best Fluency.",
    },
  },

  method: {
    h2: "Un percorso di apprendimento pensato per crescere",
    intro:
      "Ogni studente ha un punto di partenza, un ritmo e obiettivi diversi. Per questo le lezioni sono organizzate per creare continuità, pratica e orientamento in ogni fase.",
    pillars: [
      {
        title: "Percorso personalizzato",
        text: "Contenuti e attività sono definiti in base al livello, alle esigenze e ai progressi dello studente.",
      },
      {
        title: "Pratica con uno scopo",
        text: "L'inglese viene utilizzato progressivamente in situazioni utili per il lavoro, gli studi, i viaggi e la vita quotidiana.",
      },
      {
        title: "Continuità e feedback",
        text: "Ogni lezione riprende il contenuto precedente, con correzioni e indicazioni che rendono chiari i passi successivi.",
      },
      {
        title: "Pronuncia e sicurezza",
        text: "Lo studente riceve supporto per costruire frasi, migliorare la pronuncia e comunicare con maggiore sicurezza.",
      },
    ],
  },

  inPerson: {
    h2: "Lezioni di inglese in presenza a Venda Nova, Amadora",
    text: [
      "Le lezioni in presenza si svolgono presso Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova – Amadora.",
      "Uno spazio vicino e accogliente per imparare l'inglese con un accompagnamento personalizzato.",
    ],
    ctaLabel: "Vedi la posizione",
    ctaAriaLabel:
      "Vedi la posizione — apri la posizione di Best Fluency su Google Maps (nuova finestra)",
  },

  bestKids: {
    h2: "Lezioni di inglese per bambini con Best Kids",
    text: [
      "Da Best Kids, ogni lezione trasforma l'inglese in una nuova scoperta. Con l'aiuto di Faísca, la nostra curiosa volpe, i bambini imparano attraverso giochi, storie, immagini, canzoni e sfide adatte alla loro età.",
      "Le attività aiutano a sviluppare vocabolario, comprensione, pronuncia e sicurezza per usare l'inglese in modo naturale e progressivo.",
    ],
    highlight: "Con Faísca, l'inglese li accompagna ovunque.",
    differentials: [
      {
        title: "Apprendimento coinvolgente",
        text: "Giochi, storie, canzoni e attività che risvegliano la curiosità.",
      },
      {
        title: "Contenuti per età e livello",
        text: "Lezioni adatte allo sviluppo e al ritmo di ogni bambino.",
      },
      {
        title: "Contatto con l'inglese fin dall'inizio",
        text: "Parole, espressioni e situazioni quotidiane presentate in modo progressivo.",
      },
      {
        title: "Sicurezza per comunicare",
        text: "Un ambiente positivo che incoraggia la partecipazione e l'espressione orale.",
      },
    ],
    practicalInfo: [
      "Bambini dai 6 ai 13 anni",
      "Lezioni in presenza a Venda Nova, Amadora",
      "Lezioni online disponibili",
      "Gruppi organizzati per età e livello",
    ],
    ctaLabel: "Scopri Best Kids",
    ctaAriaLabel:
      "Scopri Best Kids — apri una conversazione WhatsApp (nuova finestra)",
    whatsappMessage:
      "Ciao! Vorrei ricevere maggiori informazioni sulle lezioni Best Kids.",
    imageAlt:
      "Faísca, mascotte di Best Kids, nelle lezioni di inglese per bambini",
  },

  testimonials: {
    starsAriaLabel: "stelle",
    h2: "Cosa dicono gli studenti di Best Fluency",
    subtitle: "Esperienze reali di chi sta imparando e crescendo con noi.",
    items: [
      {
        name: "Pedro António",
        source: "Recensione Google",
        stars: 5,
        quote: "Imparo molto con la teacher Taty.",
      },
      {
        name: "Sandro Vite",
        source: "Recensione Google",
        stars: 5,
        quote:
          "Incredibile, un insegnamento molto ben applicato e in modo semplice e obiettivo.",
      },
      {
        name: "Maurício Moura",
        source: "Testimonianza via WhatsApp",
        stars: null,
        quote:
          "La teacher possiede una vasta conoscenza della lingua inglese e una grande capacità di trasmettere questa conoscenza agli studenti, in modo rilassato.",
      },
      {
        name: "Wanda Ramos",
        source: "Testimonianza via WhatsApp",
        stars: null,
        quote:
          "Tutto è stato molto chiaro, con contenuti facili da capire. La professoressa Taty mi ha messo molto a mio agio nel fare domande, senza vergogna o timore di sbagliare.",
      },
    ],
    ctaLabel: "Prenota una lezione di prova",
    ctaAriaLabel:
      "Prenota una lezione di prova — apri una conversazione WhatsApp (nuova finestra)",
    whatsappMessage: TRIAL_MESSAGE,
  },

  founder: {
    h2: "Conosci la fondatrice di Best Fluency",
    text: [
      "Ciao, sono Taty Viana. Sono un'ingegnere di formazione e fondatrice della Best Fluency Language School.",
      "La mia esperienza professionale in aziende multinazionali e contesti internazionali mi ha mostrato, nella pratica, come le lingue possano aprire porte nel lavoro, negli studi, nei viaggi e nella vita personale.",
      "È con questo scopo che ho creato Best Fluency: aiutare ogni studente a imparare in modo vicino, pratico e orientato ai propri obiettivi.",
    ],
    imageAlt: "Taty Viana, fondatrice della Best Fluency Language School",
  },

  journey: {
    h2: "Come iniziare le lezioni di inglese alla Best Fluency",
    subtitle:
      "Dal primo messaggio alla prima lezione, ti accompagniamo in ogni passo del tuo percorso.",
    steps: [
      {
        title: "Apri la conversazione",
        text: "Scrivici un messaggio su WhatsApp e raccontaci cosa cerchi, i tuoi obiettivi e la tua disponibilità.",
      },
      {
        title: "Scopri il tuo punto di partenza",
        text: "In una breve conversazione, individuiamo il livello attuale e le principali esigenze di apprendimento.",
      },
      {
        title: "Traccia la tua rotta",
        text: "Definiamo la modalità, i contenuti e un percorso di apprendimento adatto agli obiettivi dello studente.",
      },
      {
        title: "Inizia a progredire",
        text: "Avvia le lezioni e segui l'evoluzione con pratica, orientamento e feedback continuo.",
      },
    ],
    ctaLabel: "Fai il primo passo",
    ctaAriaLabel:
      "Fai il primo passo — apri una conversazione WhatsApp (nuova finestra)",
    whatsappMessage: INFO_MESSAGE,
  },

  faq: {
    h2: "Domande frequenti sulle lezioni di Best Fluency",
    subtitle:
      "Trova risposte rapide sulle lezioni di inglese in presenza ad Amadora e online.",
    items: [
      {
        question: "Dove si svolgono le lezioni in presenza?",
        answer:
          "Le lezioni in presenza si svolgono presso Espaço CASA, Avenida Chaby Pinheiro, 5, Venda Nova – Amadora.",
      },
      {
        question: "Esistono anche lezioni online?",
        answer:
          "Sì. Best Fluency offre lezioni online per gli studenti che cercano maggiore flessibilità o che non possono recarsi nello spazio in presenza.",
      },
      {
        question: "Ci sono lezioni individuali e di gruppo?",
        answer:
          "Sì. Esistono lezioni individuali e piccoli gruppi, organizzati in base al livello e alla disponibilità degli studenti.",
      },
      {
        question: "Quanti studenti ci sono in ogni gruppo?",
        answer:
          "I gruppi hanno un massimo di 8 studenti, per garantire maggiore partecipazione e accompagnamento durante le lezioni.",
      },
      {
        question: "A chi sono rivolte le lezioni?",
        answer:
          "Ci sono lezioni per bambini, ragazzi e adulti, con contenuti definiti in base all'età, al livello e agli obiettivi di ogni studente.",
      },
      {
        question: "Devo sapere l'inglese per iniziare?",
        answer:
          "No. Le lezioni sono adatte sia ai principianti sia agli studenti che hanno già conoscenze di inglese e vogliono continuare a migliorare.",
      },
      {
        question: "Come viene identificato il mio livello?",
        answer:
          "Prima dell'inizio delle lezioni, facciamo una breve conversazione per comprendere le conoscenze attuali, le principali difficoltà e gli obiettivi dello studente.",
      },
      {
        question: "Le lezioni sono personalizzate?",
        answer:
          "Sì. Contenuti, attività e ritmo delle lezioni sono adattati al livello, alle esigenze e ai progressi di ogni studente.",
      },
      {
        question: "Quanto dura ogni lezione?",
        answer:
          "Ogni lezione dura 50 minuti, con attenzione alla pratica, alla partecipazione e al miglioramento continuo.",
      },
      {
        question: "Come funziona la lezione di prova?",
        answer:
          "La lezione di prova permette di conoscere l'approccio di Best Fluency, chiarire i dubbi e capire come l'insegnamento può essere adattato agli obiettivi dello studente.",
      },
      {
        question: "Come posso prenotare una lezione?",
        answer:
          "Basta cliccare su un pulsante di WhatsApp e indicare il tipo di lezione desiderato e la disponibilità.",
      },
    ],
  },

  finalCta: {
    eyebrow: "PRONTO A IMBARCARSI?",
    title: "Il tuo prossimo passo nell'inglese inizia qui",
    text: "Scrivici su WhatsApp, chiarisci i tuoi dubbi e scopri la modalità più adatta al tuo livello, ai tuoi obiettivi e alla tua routine.",
    ctaLabel: "Prenota una lezione di prova",
    ctaAriaLabel:
      "Prenota una lezione di prova — apri una conversazione WhatsApp (nuova finestra)",
    whatsappMessage:
      "Ciao! Vorrei ricevere informazioni e prenotare una lezione di prova di inglese alla Best Fluency.",
    complement: "Lezioni in presenza ad Amadora e online.",
  },
};
