export const LOCALES = ["nl", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "nl";

export const PAGE_KEYS = ["home", "about", "accountability", "contact"] as const;
export type PageKey = (typeof PAGE_KEYS)[number];
export type NavPageKey = Exclude<PageKey, "home">;
export type LocalizedPath =
  | "/"
  | "/over-mij/"
  | "/verantwoording/"
  | "/contact/"
  | "/en/"
  | "/en/about/"
  | "/en/approach/"
  | "/en/contact/";

export interface SeoContent { title: string; description: string }
export interface NavItem { page: NavPageKey; label: string }
export interface NavContent {
  ctaLabel: string;
  menuLabel: string;
  closeMenuLabel: string;
  items: readonly [NavItem, NavItem, NavItem];
}
export interface FooterContent {
  col1Title: string;
  col1Items: readonly [string, string];
  col2Title: string;
  locationLabel: string;
  privacyLink: string;
  termsLink: string;
  disclaimerLink: string;
  opensNewTabLabel: string;
}

export const legalDocumentUrls = {
  disclaimer: "https://colynk-media.s3.eu-north-1.amazonaws.com/tofleven/Tofleven_disclaimer_en_copyright_NL_EN.pdf",
  terms: {
    nl: "https://colynk-media.s3.eu-north-1.amazonaws.com/tofleven/Tofleven_algemene_voorwaarden_NL.pdf",
    en: "https://colynk-media.s3.eu-north-1.amazonaws.com/tofleven/Tofleven_general_terms_and_conditions_EN.pdf",
  },
  privacy: {
    nl: "https://colynk-media.s3.eu-north-1.amazonaws.com/tofleven/Tofleven_privacy_en_cookieverklaring_NL.pdf",
    en: "https://colynk-media.s3.eu-north-1.amazonaws.com/tofleven/Tofleven_privacy_and_cookie_statement_EN.pdf",
  },
} as const;

export interface SharedContent {
  languageLabel: string;
  skipLink: string;
  nav: NavContent;
  footer: FooterContent;
  reviewLabels: { owner: string; reviewer: string; lastReviewed: string };
}
export interface InfoCardContent { eyebrow: string; title: string; body: string }
export interface HomePageContent {
  seo: SeoContent;
  hero: { eyebrow: string; title: string; intro: string; ctaPrimary: string; ctaSecondary: string };
  method: {
    eyebrow: string;
    title: string;
    lede: string;
    cards: readonly [InfoCardContent, InfoCardContent, InfoCardContent];
  };
  forWhom: {
    eyebrow: string;
    title: string;
    lede: string;
    trainings: readonly [InfoCardContent, InfoCardContent];
  };
  band: { title: string; body: string; cta: string };
}
export interface TrainingHistoryItem { period: string; label: string }
export interface AboutPageContent {
  seo: SeoContent;
  eyebrow: string;
  name: string;
  photoCaption: string;
  paragraphs: readonly string[];
  trainingTitle: string;
  trainingIntro: string;
  trainingHistory: readonly TrainingHistoryItem[];
  registrationTitle: string;
  registrationPending: string;
  ctaPrimary: string;
  ctaSecondary: string;
}
export interface AccountabilityPageContent {
  seo: SeoContent;
  eyebrow: string;
  title: string;
  intro: readonly [string, string];
  pillars: readonly [InfoCardContent, InfoCardContent, InfoCardContent];
  reassurance: { title: string; body: string };
  cta: string;
}

export const CONTACT_FORM_STATES = ["idle", "submitting", "success", "error"] as const;
export type ContactFormState = (typeof CONTACT_FORM_STATES)[number];
export interface ContactFormContent {
  fields: { name: string; email: string; subject: string; message: string; messagePlaceholder: string };
  subjectOptions: readonly [string, string, string, string];
  consentLabel: string;
  submit: string;
  states: { submitting: string; success: string; error: string };
  validation: { required: string; invalidEmail: string; consentRequired: string };
}
export interface ContactPageContent {
  seo: SeoContent;
  eyebrow: string;
  title: string;
  lede: string;
  locationLabel: string;
  form: ContactFormContent;
}
export interface PageContentMap {
  home: HomePageContent;
  about: AboutPageContent;
  accountability: AccountabilityPageContent;
  contact: ContactPageContent;
}
export type PageContent = PageContentMap[PageKey];
export interface SiteContent { shared: SharedContent; pages: PageContentMap }

export interface OwnerReviewSlot {
  status: "owner-review-required";
  heading: string;
  draft: string;
}

/** Draft trust copy is deliberately not rendered until the owner approves it. */
export const trustContentDrafts = {
  nl: [
    { status: "owner-review-required", heading: "Reikwijdte van de begeleiding", draft: "Tofleven biedt therapeutische begeleiding en is geen vervanging voor huisartsenzorg, specialistische ggz of spoedeisende hulp." },
    { status: "owner-review-required", heading: "Wanneer Tofleven niet passend is", draft: "Bij acute onveiligheid, een crisis of een hulpvraag die specialistische medische of psychiatrische zorg vraagt, is andere of aanvullende hulp nodig." },
    { status: "owner-review-required", heading: "Crisisroute", draft: "Bel bij direct fysiek gevaar 112. Neem bij een psychische crisis contact op met je huisarts of huisartsenpost. Bij gedachten aan zelfdoding kun je 113 of gratis 0800-0113 bellen of chatten via 113.nl." },
    { status: "owner-review-required", heading: "Vertrouwelijkheid en privacy", draft: "Leg uit welke informatie vertrouwelijk wordt behandeld, welke uitzonderingen gelden en hoe persoonsgegevens en dossiers worden verwerkt." },
    { status: "owner-review-required", heading: "Klachten", draft: "Voeg de goedgekeurde klachtenroute, verantwoordelijke organisatie en contact- of verificatielink toe." },
    { status: "owner-review-required", heading: "Verwijzing en samenwerking", draft: "Beschrijf wanneer en met toestemming wordt afgestemd met huisarts, school of andere betrokken professionals." },
  ],
  en: [
    { status: "owner-review-required", heading: "Scope of support", draft: "Tofleven offers therapeutic support and does not replace GP care, specialist mental-health care, or emergency services." },
    { status: "owner-review-required", heading: "When Tofleven may not be appropriate", draft: "Acute safety concerns, a crisis, or needs requiring specialist medical or psychiatric care call for other or additional support." },
    { status: "owner-review-required", heading: "Crisis routes", draft: "In the Netherlands, call 112 if there is immediate physical danger. For a mental-health crisis, contact your GP or out-of-hours GP service. For suicidal thoughts, call 113 or freephone 0800-0113, or use the chat at 113.nl." },
    { status: "owner-review-required", heading: "Confidentiality and privacy", draft: "Explain what is confidential, which exceptions apply, and how personal information and records are handled." },
    { status: "owner-review-required", heading: "Complaints", draft: "Add the approved complaints route, responsible body, and contact or verification link." },
    { status: "owner-review-required", heading: "Referral and professional collaboration", draft: "Describe when, and with consent, the practice coordinates with a GP, school, or other professionals." },
  ],
} as const satisfies Record<Locale, readonly OwnerReviewSlot[]>;

export const routes = {
  home: { nl: "/", en: "/en/" },
  about: { nl: "/over-mij/", en: "/en/about/" },
  accountability: { nl: "/verantwoording/", en: "/en/approach/" },
  contact: { nl: "/contact/", en: "/en/contact/" },
} as const satisfies Record<PageKey, Record<Locale, LocalizedPath>>;

export const content = {
  nl: {
    shared: {
      languageLabel: "Taal",
      skipLink: "Ga naar inhoud",
      nav: {
        ctaLabel: "Neem contact op",
        menuLabel: "Menu openen",
        closeMenuLabel: "Menu sluiten",
        items: [
          { page: "about", label: "Over mij" },
          { page: "accountability", label: "Werkwijze" },
          { page: "contact", label: "Contact" },
        ],
      },
      footer: {
        col1Title: "Tofleven",
        col1Items: ["Over Gérita de Wilde", "Werkwijze en visie"],
        col2Title: "Locatie",
        locationLabel: "Enter, Nederland",
        privacyLink: "Privacyverklaring",
        termsLink: "Algemene voorwaarden",
        disclaimerLink: "Disclaimer & copyright",
        opensNewTabLabel: "opent in een nieuw tabblad",
      },
      reviewLabels: { owner: "Inhoudseigenaar", reviewer: "Beoordeeld door", lastReviewed: "Laatst beoordeeld" },
    },
    pages: {
      home: {
        seo: {
          title: "Integratief therapeut in Enter | Tofleven",
          description: "Tofleven biedt integratieve, ervaringsgerichte begeleiding in Enter voor kinderen, jongeren, volwassenen, ouders en stellen.",
        },
        hero: {
          eyebrow: "Inzichtgevende, ervaringsgerichte therapie — herstel van binnenuit",
          title: "Integratieve therapie in Enter",
          intro: "Tofleven biedt persoonlijke en relationele begeleiding aan kinderen, jongeren, volwassenen, ouders en stellen. In een eerste kennismaking kun je onderzoeken of de werkwijze en het contact bij je passen.",
          ctaPrimary: "Vraag een kennismaking aan",
          ctaSecondary: "Bekijk de werkwijze",
        },
        method: {
          eyebrow: "Therapeutische begeleiding",
          title: "Aandacht voor wat er onder de oppervlakte speelt",
          lede: "De begeleiding verbindt inzichten uit verschillende psychologische stromingen met aandacht voor denken, voelen, willen en kiezen. Er is geen vast recept: de hulpvraag en jouw eigen tempo vormen het vertrekpunt.",
          cards: [
            { eyebrow: "Emoties", title: "Emoties herkennen", body: "Je kunt leren voelen en begrijpen wat er in je omgaat. Emotionally Focused Therapy (EFT) is een van de benaderingen die daarbij wordt gebruikt." },
            { eyebrow: "Verbinding", title: "Relatietherapie", body: "Voor stellen die patronen tussen hen willen onderzoeken en opnieuw contact met elkaar willen zoeken, ook na een periode van afstand." },
            { eyebrow: "Identiteit", title: "Ruimte voor wie je bent", body: "Een plek om te onderzoeken wat bij je past, welke aanpassingspatronen je kent en welke keuzes je zelf wilt maken." },
          ],
        },
        forWhom: {
          eyebrow: "Verschillende hulpvragen",
          title: "Therapie en trainingen",
          lede: "De huidige begeleiding richt zich op kinderen en ouders, jongeren, volwassenen en stellen. Genoemde thema’s zijn onder meer zingeving, angst, onzekerheid, emotieregulatie, identiteit, somberheid en hoogbegaafdheid. Bespreek in een kennismaking of jouw vraag binnen de expertise en het aanbod past.",
          trainings: [
            { eyebrow: "Relatietraining", title: "Houd Me Vast", body: "Een praktische training rond terugkerende patronen tussen partners, emotionele verbinding, liefde en vergeving." },
            { eyebrow: "Training voor opvoeders", title: "Emoties coachen", body: "Een training over een emotioneel begeleidende houding naar kinderen, gebaseerd op de methode van John Gottman." },
          ],
        },
        band: { title: "Waarom doe ik wat ik doe?", body: "Samen onderzoeken wat kan bijdragen aan groei en een tof leven.", cta: "Lees over mijn werkwijze en visie" },
      },
      about: {
        seo: {
          title: "Gérita de Wilde – integratief therapeut | Tofleven",
          description: "Maak kennis met Gérita de Wilde, integratief therapeut bij Tofleven in Enter, en lees over haar visie, ervaring en opleidingstraject.",
        },
        eyebrow: "Een persoonlijke ontdekkingsreis",
        name: "Gérita de Wilde – integratief therapeut",
        photoCaption: "Portret van Gérita de Wilde.",
        paragraphs: [
          "Ik ben Gérita de Wilde en begeleid vanuit Tofleven in Enter kinderen en ouders, jongeren, volwassenen en stellen. In een kennismaking onderzoeken we samen of mijn manier van werken aansluit bij jou en je hulpvraag.",
          "Mijn eigen leven ervaar ik als een ontdekkingsreis: van mezelf kwijtraken naar mezelf terugvinden, ervaringen verwerken en talenten ontwikkelen. Mijn christelijke geloof is daarin belangrijk. Voor mij is God liefdevol en goed, en heeft ieder mens een unieke waarde.",
          "Aandacht, acceptatie, respect, een luisterend oor, tijd en begrip kunnen ruimte geven om verder te groeien. Mijn huwelijk en gezin, missiereizen, het leiden van een geloofsgemeenschap en de ontmoetingen met uiteenlopende mensen hebben mijn blik mede gevormd.",
          "In mijn werk begeleid ik kinderen en hun ouders, jongeren, volwassenen en koppels. Ik kijk naar de samenhang tussen geest, ziel en lichaam en werk vanuit vertrouwen, zonder vooraf een uitkomst te beloven.",
          "Neem gerust contact op voor een eerste kennismaking. Daarna beslis je zelf of het contact en de werkwijze bij je passen.",
        ],
        trainingTitle: "Opleidingen en trainingen",
        trainingIntro: "Onderstaande tijdlijn is gebaseerd op de door de eigenaar aangeleverde geschiedenis. Titels, opleiders, jaartallen en actuele geldigheid moeten vóór publicatie worden gecontroleerd.",
        trainingHistory: [
          { period: "1986", label: "Verpleegkundige opleiding" },
          { period: "1997–2008", label: "Focussen; psychoanalytische, pastorale en cliëntgerichte integratieve therapie" },
          { period: "2008", label: "Ontwikkelingspsychologie" },
          { period: "2012", label: "Emotionally Focused Therapy en Houd Me Vast" },
          { period: "2013", label: "Children Focusing" },
          { period: "2018", label: "Dynamiek op tafel" },
          { period: "2023", label: "Emotionally Focused Individual Therapy" },
          { period: "2024", label: "Kindertekeningen begrijpen" },
          { period: "2026", label: "Jeugd en Gezin" },
        ],
        registrationTitle: "Actieve registraties",
        registrationPending: "Actieve registraties, nummers en verificatielinks worden pas gepubliceerd nadat de eigenaar deze heeft bevestigd.",
        ctaPrimary: "Vraag een kennismaking aan",
        ctaSecondary: "Lees over mijn werkwijze",
      },
      accountability: {
        seo: {
          title: "Werkwijze: integratieve therapie en EFT | Tofleven",
          description: "Lees hoe Tofleven in Enter integratief en ervaringsgericht werkt, met aandacht voor emoties, relaties en de mens als geheel.",
        },
        eyebrow: "Visie en werkwijze",
        title: "Werkwijze: integratieve therapie en EFT",
        intro: [
          "We beginnen bij jouw hulpvraag en onderzoeken wat aandacht nodig heeft. Er is ruimte voor wat zich aandient, met respect, zonder waardeoordeel en in een tempo dat bij jou past.",
          "Samen kun je patronen en oorzaken onderzoeken en ontdekken welke andere keuzes mogelijk zijn. Jij houdt de regie en bepaalt steeds of de aanpak bij je past.",
        ],
        pillars: [
          { eyebrow: "Mensbeeld", title: "Geest, ziel en lichaam", body: "Een hulpvraag staat niet los van wie je bent. Daarom kijken we naar de mens als geheel en niet alleen naar losse klachten." },
          { eyebrow: "Methode", title: "Ervaringsgericht werken", body: "Door aandacht te geven aan wat er in je gebeurt, kun je emoties en reactiepatronen beter leren herkennen en begrijpen." },
          { eyebrow: "Eigen keuze", title: "Ontdekken, leren en groeien", body: "Je onderzoekt wat voor jou van waarde is en welke stap je wilt zetten. De begeleiding ondersteunt dat proces, zonder een resultaat te garanderen." },
        ],
        reassurance: { title: "Wat kun je verwachten?", body: "Een traject kan inzicht geven in oorzaken, emoties en patronen die niet meer helpen. Dat kan ruimte bieden om andere keuzes te oefenen. Wat passend en haalbaar is, verschilt per persoon en wordt samen besproken." },
        cta: "Bespreek je hulpvraag",
      },
      contact: {
        seo: {
          title: "Contact met Tofleven in Enter",
          description: "Neem via het beveiligde contactformulier contact op met Tofleven in Enter voor een eerste kennismaking over je hulpvraag.",
        },
        eyebrow: "Eerste stap",
        title: "Contact met Tofleven in Enter",
        lede: "Gebruik het formulier voor een eerste kennismaking. Deel nog geen uitgebreide of gevoelige gezondheidsinformatie; een reactie en vervolgstap worden daarna afgestemd.",
        locationLabel: "Praktijklocatie",
        form: {
          fields: { name: "Naam", email: "E-mailadres", subject: "Onderwerp", message: "Je bericht", messagePlaceholder: "Vertel kort waarover je contact wilt opnemen" },
          subjectOptions: ["Individuele therapie", "Relatietherapie", "Kind en ouders/verzorgers", "Houd Me Vast of emotiecoaching"],
          consentLabel: "Ik ga akkoord met de privacyverklaring",
          submit: "Versturen",
          states: { submitting: "Bezig met versturen...", success: "Dank voor je bericht. Je ontvangt zo spoedig mogelijk een reactie.", error: "Het versturen is niet gelukt. Probeer het later opnieuw." },
          validation: { required: "Vul dit veld in.", invalidEmail: "Vul een geldig e-mailadres in.", consentRequired: "Ga akkoord met de privacyverklaring om je bericht te versturen." },
        },
      },
    },
  },
  en: {
    shared: {
      languageLabel: "Language",
      skipLink: "Skip to content",
      nav: {
        ctaLabel: "Get in touch",
        menuLabel: "Open menu",
        closeMenuLabel: "Close menu",
        items: [
          { page: "about", label: "About" },
          { page: "accountability", label: "Approach" },
          { page: "contact", label: "Contact" },
        ],
      },
      footer: {
        col1Title: "Tofleven",
        col1Items: ["About Gérita de Wilde", "Approach and vision"],
        col2Title: "Location",
        locationLabel: "Enter, the Netherlands",
        privacyLink: "Privacy policy",
        termsLink: "General terms and conditions",
        disclaimerLink: "Disclaimer & copyright",
        opensNewTabLabel: "opens in a new tab",
      },
      reviewLabels: { owner: "Content owner", reviewer: "Reviewed by", lastReviewed: "Last reviewed" },
    },
    pages: {
      home: {
        seo: {
          title: "Integrative therapist in Enter | Tofleven",
          description: "Tofleven offers integrative, experiential support in Enter for children, young people, adults, parents, and couples.",
        },
        hero: {
          eyebrow: "Insight-oriented, experiential therapy — recovery from within",
          title: "Integrative therapy in Enter",
          intro: "Tofleven offers individual and relationship-focused support for children, young people, adults, parents, and couples. An introductory conversation can help you decide whether the approach and personal fit feel right for you.",
          ctaPrimary: "Request an introduction",
          ctaSecondary: "Explore the approach",
        },
        method: {
          eyebrow: "Therapeutic support",
          title: "Attention to what lies beneath the surface",
          lede: "The approach brings together ideas from several psychological traditions while paying attention to thought, emotion, intention, and choice. There is no fixed formula: your question and pace are the starting point.",
          cards: [
            { eyebrow: "Emotions", title: "Recognising emotions", body: "You can learn to notice and understand what is happening inside you. Emotionally Focused Therapy (EFT) is one approach used in this work." },
            { eyebrow: "Connection", title: "Relationship therapy", body: "For couples who want to explore recurring patterns and seek renewed contact, including after a period of distance." },
            { eyebrow: "Identity", title: "Space for who you are", body: "A place to explore what fits you, which patterns of adaptation you recognise, and which choices you want to make." },
          ],
        },
        forWhom: {
          eyebrow: "Different support needs",
          title: "Therapy and training",
          lede: "Current support is intended for children and parents, young people, adults, and couples. Topics mentioned include meaning, anxiety, uncertainty, emotional regulation, identity, low mood, and giftedness. Use an introductory conversation to check whether your needs fit the practice's expertise and offer.",
          trainings: [
            { eyebrow: "Relationship training", title: "Hold Me Tight", body: "Practical training around recurring patterns between partners, emotional connection, love, and forgiveness." },
            { eyebrow: "Training for caregivers", title: "Emotion Coaching", body: "Training in an emotion-guiding approach to children, based on John Gottman's method." },
          ],
        },
        band: { title: "Why do I do this work?", body: "Exploring together what may support growth and a fulfilling life.", cta: "Read about my approach and vision" },
      },
      about: {
        seo: {
          title: "Gérita de Wilde – integrative therapist | Tofleven",
          description: "Meet Gérita de Wilde, integrative therapist at Tofleven in Enter, and read about her perspective, experience, and training history.",
        },
        eyebrow: "A personal journey of discovery",
        name: "Gérita de Wilde – integrative therapist",
        photoCaption: "Portrait of Gérita de Wilde.",
        paragraphs: [
          "I am Gérita de Wilde. Through Tofleven in Enter, I support children and parents, young people, adults, and couples. In an introductory conversation, we explore whether my way of working fits you and your question.",
          "I experience my own life as a journey of discovery: losing and finding myself, processing experiences, and developing my abilities. My Christian faith is important to me. I believe God is loving and good, and that every person has unique worth.",
          "Attention, acceptance, respect, a listening ear, time, and understanding can create room for growth. My marriage and family, mission trips, leadership of a faith community, and encounters with many different people have helped shape my perspective.",
          "In my work, I support children and their parents, young people, adults, and couples. I consider the relationship between mind, soul, and body and work from trust, without promising a particular outcome.",
          "You are welcome to request an introductory conversation. You can then decide for yourself whether the connection and approach feel right.",
        ],
        trainingTitle: "Education and training",
        trainingIntro: "This timeline is based on the history supplied by the owner. Titles, providers, dates, and current validity must be checked before publication.",
        trainingHistory: [
          { period: "1986", label: "Nursing education" },
          { period: "1997–2008", label: "Focusing; psychoanalytic, pastoral, and client-centred integrative therapy" },
          { period: "2008", label: "Developmental psychology" },
          { period: "2012", label: "Emotionally Focused Therapy and Hold Me Tight" },
          { period: "2013", label: "Children Focusing" },
          { period: "2018", label: "Dynamiek op tafel" },
          { period: "2023", label: "Emotionally Focused Individual Therapy" },
          { period: "2024", label: "Understanding children's drawings" },
          { period: "2026", label: "Youth and Family" },
        ],
        registrationTitle: "Active registrations",
        registrationPending: "Active registrations, identifiers, and verification links will only be published after owner confirmation.",
        ctaPrimary: "Request an introduction",
        ctaSecondary: "Read about my approach",
      },
      accountability: {
        seo: {
          title: "Approach: integrative therapy and EFT | Tofleven",
          description: "Learn how Tofleven in Enter works integratively and experientially, with attention to emotions, relationships, and the whole person.",
        },
        eyebrow: "Vision and approach",
        title: "Approach: integrative therapy and EFT",
        intro: [
          "We begin with your question and explore what needs attention. There is room for what emerges, with respect, without judgement, and at a pace that suits you.",
          "Together, you may explore patterns and underlying causes and consider which different choices are possible. You remain in control and decide whether the approach continues to fit.",
        ],
        pillars: [
          { eyebrow: "View of the person", title: "Mind, soul, and body", body: "A difficulty is not separate from who you are. The work therefore considers the whole person, rather than isolated symptoms alone." },
          { eyebrow: "Method", title: "Experiential work", body: "By paying attention to what happens inside you, you can learn to recognise and understand emotions and response patterns more clearly." },
          { eyebrow: "Your choice", title: "Discover, learn, and grow", body: "You explore what matters to you and which step you want to take. The support serves that process without guaranteeing an outcome." },
        ],
        reassurance: { title: "What can you expect?", body: "A process may offer insight into underlying causes, emotions, and patterns that are no longer helpful. This can create room to practise different choices. What is appropriate and achievable varies from person to person and is discussed together." },
        cta: "Discuss your support needs",
      },
      contact: {
        seo: {
          title: "Contact Tofleven in Enter",
          description: "Use the secure contact form to contact Tofleven in Enter for an introductory conversation about your support needs.",
        },
        eyebrow: "A first step",
        title: "Contact Tofleven in Enter",
        lede: "Use the form to request an introductory conversation. Please do not share detailed or sensitive health information yet; a response and suitable next step can be agreed afterwards.",
        locationLabel: "Practice location",
        form: {
          fields: { name: "Name", email: "Email address", subject: "Subject", message: "Your message", messagePlaceholder: "Briefly explain what you would like to discuss" },
          subjectOptions: ["Individual therapy", "Relationship therapy", "Child and parents/caregivers", "Hold Me Tight or Emotion Coaching"],
          consentLabel: "I agree to the privacy policy",
          submit: "Send",
          states: { submitting: "Sending...", success: "Thank you for your message. You will receive a response as soon as possible.", error: "Your message could not be sent. Please try again later." },
          validation: { required: "Please complete this field.", invalidEmail: "Please enter a valid email address.", consentRequired: "Please agree to the privacy policy before sending your message." },
        },
      },
    },
  },
} as const satisfies Record<Locale, SiteContent>;

export const subjectOptions = {
  nl: content.nl.pages.contact.form.subjectOptions,
  en: content.en.pages.contact.form.subjectOptions,
} as const satisfies Record<Locale, readonly string[]>;
export const contactFormStates = {
  nl: content.nl.pages.contact.form.states,
  en: content.en.pages.contact.form.states,
} as const satisfies Record<Locale, Record<Exclude<ContactFormState, "idle">, string>>;

export interface ParsedLocalizedPath { locale: Locale; page: PageKey }
function normalizePath(path: string): string {
  const withoutQueryOrHash = path.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = withoutQueryOrHash.startsWith("/") ? withoutQueryOrHash : `/${withoutQueryOrHash}`;
  return withLeadingSlash === "/" ? withLeadingSlash : withLeadingSlash.replace(/\/+$/, "");
}
export function getPath<L extends Locale, P extends PageKey>(locale: L, page: P): (typeof routes)[P][L] {
  return routes[page][locale];
}
export function parseLocalizedPath(path: string): ParsedLocalizedPath | null {
  const normalized = normalizePath(path);
  for (const page of PAGE_KEYS) {
    for (const locale of LOCALES) {
      if (normalizePath(routes[page][locale]) === normalized) return { locale, page };
    }
  }
  return null;
}
export function getLocalePath(path: string, targetLocale: Locale): LocalizedPath | null {
  const parsed = parseLocalizedPath(path);
  return parsed ? routes[parsed.page][targetLocale] : null;
}
export function getAlternateLocale(locale: Locale): Locale { return locale === "nl" ? "en" : "nl" }
export function getAlternateLocalePath(path: string): LocalizedPath | null {
  const parsed = parseLocalizedPath(path);
  return parsed ? routes[parsed.page][getAlternateLocale(parsed.locale)] : null;
}
export function getPageContent<P extends PageKey>(locale: Locale, page: P): PageContentMap[P] {
  return content[locale].pages[page];
}
