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
  tagline: string;
  col1Title: string;
  col1Items: readonly [string, string];
  col2Title: string;
  email: string;
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
  qualifications: readonly [string, string];
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
  location: string;
  emailLabel: string;
  email: string;
  rates: {
    heading: string;
    items: readonly [
      { label: string; price: string },
      { label: string; price: string },
    ];
  };
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
          { page: "accountability", label: "Visie" },
          { page: "contact", label: "Contact" },
        ],
      },
      footer: {
        tagline: "Inzichtgevende, ervaringsgerichte therapie, herstel van binnenuit",
        col1Title: "Tofleven",
        col1Items: ["Over mij", "Visie"],
        col2Title: "Contact",
        email: "info@tofleven.nl",
        locationLabel: "Enter, Nederland",
        privacyLink: "Privacy policy",
        termsLink: "Algemene voorwaarden",
        disclaimerLink: "Disclaimer & copyright",
        opensNewTabLabel: "opent in een nieuw tabblad",
      },
      reviewLabels: { owner: "Inhoudseigenaar", reviewer: "Beoordeeld door", lastReviewed: "Laatst beoordeeld" },
    },
    pages: {
      home: {
        seo: {
          title: "Tofleven - maatwerk, uniek en persoonlijk",
          description: "Verbindende en emotie gerichte therapie, persoonlijk en relationeel, voor kinderen en volwassenen met uiteenlopende hulpvragen.",
        },
        hero: {
          eyebrow: "Integratief therapeut in Enter",
          title: "Inzichtgevende, ervaringsgerichte therapie, herstel van binnenuit",
          intro: "Het wonderlijke van ons denken, voelen, willen en het telkens weer keuzes maken is voortdurend in proces en in beweging. Dat maakt het mogelijk om nieuwe keuzes te maken en nieuwe kansen te benutten",
          ctaPrimary: "Maak kennis",
          ctaSecondary: "Lees over mijn werkwijze",
        },
        method: {
          eyebrow: "Therapeutische begeleiding",
          title: "Integratieve therapie; benadering vanuit verschillende psychologische stromingen",
          lede: "Geen quick fix, maar aandacht voor wat er onder oppervlakte speelt, met respect en aandacht voor echt herstel",
          cards: [
            { eyebrow: "Emoties", title: "Herken je emoties", body: "Leren voelen én begrijpen wat er in je omgaat, met Emotionally Focused Therapy (EFT) als basis" },
            { eyebrow: "Verbinding", title: "Relatietherapie", body: "Voor stellen die meer naar elkaar toe willen groeien, ook na een periode van afstand" },
            { eyebrow: "Identiteit", title: "Wie je in de kern bent", body: "Ruimte om jezelf te ontdekken, voorbij aanpassing en overleven, vanuit je eigen authenticiteit." },
          ],
        },
        forWhom: {
          eyebrow: "Verschillende mogelijkheden voor jouw hulpvraag",
          title: "Therapie en trainingen",
          lede: "Voor kinderen en ouders, jongeren en volwassen voor bv. zingeving, angsten, onzekerheid, falen, emotie-regulatie, hoogbegaafdheid, identiteit, depressie. Relatietherapie voor stellen. In company groepstrainingen mogelijkheden voor bedrijven, gemeentes of kerken op aanvraag.",
          trainings: [
            { eyebrow: "Relatie training", title: "Houd Me Vast", body: "Een praktische training van 8 avonden over wat er mis kan gaan tussen partners en hoe je elkaar emotioneel weer kan vinden. Over verbinding, liefde en vergeving" },
            { eyebrow: "Training voor opvoeders", title: "Emotie coachen", body: "Leer in 4 dagdelen een emotioneel begeleidende houding naar kinderen voor meer bewust en plezierig opvoeden (J. Gottman methode)" },
          ],
        },
        band: { title: "Waarom doe ik wat ik doe....", body: "Samen zoeken naar groei en verbeteringen voor een tof leven", cta: "Lees over mijn werkwijze" },
      },
      about: {
        seo: {
          title: "Over mij Tofleven",
          description: "Maak kennis met Gérita de Wilde, Therapeut, Integratief(o.a.EFT) en Jeugd en Gezin(SKJ) in Enter.",
        },
        eyebrow: "Over mij",
        name: "Ontdekkingsreis",
        photoCaption: "Portret van Gérita de Wilde.",
        paragraphs: [
          "Mijn leven zou ik, Gérita, omschrijven als een ontdekkingsreis. Een reis van jezelf kwijtraken naar jezelf terugvinden. Van het verwerken van ervaringen en het herstellen van wonden naar het ontwikkelen van talenten. Een reis waarin ik steeds meer mezelf word.",
          "Daarbij kan ik niet anders dan erkennen dat er een grote Schepper (Creator) is. Voor mij is dat God: liefdevol, goed en nabij. In de kern van ieder mens ligt een unieke waarde besloten.",
          "Mijn interesse in wie iemand werkelijk is, wat iemand beleeft en meemaakt, blijft mij inspireren. Het verlangen om mensen echt te zien, te begrijpen en te waarderen loopt als een rode draad door mijn leven.",
          "Ervaringen en ontwikkelingen in het leven hebben mij geleerd dat de lijn van de liefde een tof leven geeft. De liefdevolle impact van aandacht, acceptatie en respect, luisterend oor, tijd en begrip helpen verder groeien in het leven. De activiteiten aan opleiding en trainingen, huwelijk en gezin, missiereizen en leiden van een geloofsgemeenschap, het opvangen en ontmoeten van mensen, zijn allemaal avonturen die hieruit voortvloeien. In mijn praktijk aan huis begeleid ik sinds 1996 kinderen en hun ouders, jongeren, volwassenen en koppels. Ik geloof dat we pas echt tot bloei komen als onze geest en ziel en lichaam met elkaar in verbinding zijn",
          "Door samen de hand te reiken aan situaties die als vastzittende knopen ervaren worden, start de zoektocht naar herstel. Mijn therapeutische ondersteuning bij deze zoektocht en het doorwerken van ervaringen wil ik bieden via de brug van vertrouwen. En door interventies vanuit mijn expertise. O.a. 1986 Verpleegkundige (BIG), 1997-2008 Focussen, psychoanalytisch, pastoraal en clientgerichte integratief therapeut, 2008 ontwikkelingspsychologie, 2012 Emotional Focused Therapy en Houd me Vast training, 2013 Children focusing training, 2018 dynamiek op tafel, 2023 Emotional Focused Individual Therapy, 2024 Kindertekeningen begrijpen, 2026 Jeugd en Gezin (SKJ).",
          "Neem gerust contact op voor een eerste kennismaking om vervolgens te beslissen of de manier van aanpak bij je past",
        ],
        qualifications: ["EFT therapeut", "Jeugd en Gezinsprofessional SKJ geregistreerd"],
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
        ctaPrimary: "Neem contact op",
        ctaSecondary: "Lees over mijn werkwijze",
      },
      accountability: {
        seo: {
          title: "Werkwijze: integratieve therapie en EFT | Tofleven",
          description: "Lees meer over mijn benadering en wat je kunt verwachten",
        },
        eyebrow: "Visie",
        title: "Ieder mens is de moeite waard om een leven te leven in overeenstemming met zichzelf en anderen",
        intro: [
          "Vanaf het moment van binnenkomst onderzoeken we, afhankelijk van de hulpvraag, wat er nodig is. Daarvoor creëren we ruimte. Aan de slag gaan betekent vertrouwen op wat zich aandient: dat wat gezien mag worden, aandacht vraagt en ertoe doet. We zijn aanwezig met respect, zonder oordeel, en geven ruimte aan wat er opkomt.",
          "Samen gaan we ontdekken waar knopen vast zitten, wat niet lekker gaat. Oorzaken ontdekken en ruimte in jezelf maken om anders te gaan functioneren, eerlijk en oprecht",
        ],
        pillars: [
          { eyebrow: "Mensbeeld", title: "Geest, ziel en lichaam", body: "Klachten staan niet los van wie je bent. Kijk naar het geheel, niet alleen naar de symptomen" },
          { eyebrow: "Methode", title: "Ervaringsgericht werken", body: "Door aandacht te schenken aan wat er in je gebeurt, leer je herkennen en begrijpen wat iets met je doet, en kun je eerlijker reageren" },
          { eyebrow: "Voor wie?", title: "Voor iedereen die wil ontdekken, leren en groeien", body: "Je echte zelf is de moeite waard om te ontdekken. Loop je met je ziel onder je arm door welk issue dan ook, blijf er dan niet mee lopen. Trek aan de bel." },
        ],
        reassurance: { title: "Wat mag je verwachten?", body: "Door liefdevolle verbinding met jezelf en anderen zal je leven eenvoudiger en mooier worden. Door inzichten in oorzaken en reactiepatronen, die niet behulpzaam zijn, is het mogelijk te veranderen. Door precies te ervaren en door te begrijpen waar iets vandaan komt lukt het om te leren beseffen wat nodig is. Ons unieke zelf krijgt de ruimte, en dat is tof" },
        cta: "Maak kennis",
      },
      contact: {
        seo: {
          title: "Contact Tofleven",
          description: "Neem contact op met Tofleven in Enter, reactie meestal binnen twee werkdagen",
        },
        eyebrow: "Contact",
        title: "Neem contact op met Tofleven in Enter, reactie meestal binnen twee werkdagen",
        lede: "Vul het formulier in of stuur direct een mail. Reactie meestal binnen twee werkdagen",
        locationLabel: "Praktijk Tofleven",
        location: "Enter, Overijssel",
        emailLabel: "E-mail",
        email: "info@tofleven.nl",
        rates: {
          heading: "Tarieven",
          items: [
            { label: "Individueel consult", price: "€ 80 per uur" },
            { label: "Partner- en relatietherapie", price: "€ 95 per sessie van 1,5 uur" },
          ],
        },
        form: {
          fields: { name: "Naam", email: "E-mailadres", subject: "Onderwerp", message: "Je bericht", messagePlaceholder: "Vertel kort wat je hulpvraag is" },
          subjectOptions: ["Individuele therpie", "Relatie therapie", "Kind & ouders/verzorgers", "Houd me Vast of Emotie coachen training"],
          consentLabel: "Ik heb de privacyverklaring gelezen",
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
          { page: "about", label: "About me" },
          { page: "accountability", label: "Vision" },
          { page: "contact", label: "Contact" },
        ],
      },
      footer: {
        tagline: "Insight-oriented, experiential therapy, recovery from within",
        col1Title: "Tofleven",
        col1Items: ["About me", "Vision"],
        col2Title: "contact",
        email: "info@tofleven.nl",
        locationLabel: "Enter, the Netherlands",
        privacyLink: "Privacy statement",
        termsLink: "General terms and conditions",
        disclaimerLink: "Disclaimer & copyright",
        opensNewTabLabel: "opens in a new tab",
      },
      reviewLabels: { owner: "Content owner", reviewer: "Reviewed by", lastReviewed: "Last reviewed" },
    },
    pages: {
      home: {
        seo: {
          title: "Tofleven - customization, unique and personal",
          description: "Connecting and emotion focused therapy, personal en relational, for children and adults with various requests for help",
        },
        hero: {
          eyebrow: "Integrative therapist in Enter",
          title: "insight-oriented, experiential therapy, recovery from within",
          intro: "The wondrous nature of our thinking, feeling, wanting and making choices time and time again is constantly in process and in motion. This enables us to make new choices and to seize new opportunities",
          ctaPrimary: "Get acquainted",
          ctaSecondary: "Read about my approach",
        },
        method: {
          eyebrow: "Therapeutic guidance",
          title: "Integrative therapy; approach from different psychological perspectives",
          lede: "No quick fix, but attention to what is happening beneath the surface, with respect, attention for real recovery",
          cards: [
            { eyebrow: "Emotions", title: "Recognize your emoties", body: "To learn to feel and understand what's going on inside you, based on Emotionally Focused Therapy (EFT)" },
            { eyebrow: "Connection", title: "Relationship therapy", body: "For couples who want to grow closer to each other also after a period of distance" },
            { eyebrow: "Identity", title: "Who you are at your core", body: "Space to discover yourself, past adaptation and surviaval, from your own authenticity" },
          ],
        },
        forWhom: {
          eyebrow: "Various options for your request for help",
          title: "Therapie and training",
          lede: "For children and parents, (young)adults voor e.g. meaning, fears, uncertainty, failure, emotional regulation, depression, indentity, giftedness. Relationtherapy for couples. In company group training possibilities for municipalities or churches",
          trainings: [
            { eyebrow: "Relationship training", title: "Hold Me Tight", body: "A practical course about what can go wrong between partners and how to rebuild your emotional connection. About connection, love and forgiveness" },
            { eyebrow: "Training for educators", title: "Emotion Coaching", body: "Develop in 4 half days a emotional guiding attitude to children for raising more consciously and enjoyable (J.Gottman method)" },
          ],
        },
        band: { title: "Why do I do what I do", body: "Seeking growth and improvements together for a great life", cta: "Read my approach" },
      },
      about: {
        seo: {
          title: "About me Tofleven",
          description: "Get to know Gérita de Wilde, Therapist (e.g.EFT) and Youth and Family(SKJ) in Enter",
        },
        eyebrow: "about me",
        name: "Voyage of discovery",
        photoCaption: "Portrait of Gérita de Wilde.",
        paragraphs: [
          "This is how I, Gérita, would like to describe my life. From having lost myself to finding myself again. From processing experiences and recovering to developing talents. Being more and more myself. in that, I cannot help but acknowledge that there is a great Creator. For me, that's God, loving and good. Our unique value lies at our core. The interest in who someone is, for what someone actually experiences continues for me.",
          "Experiences and developments in life have taught me that the line of love gives a great life. The loving impact of attention, acceptation and respect, a listening ear, time and understanding help to grow further in life. The education and training activities, my marriage and family, mission trips, leading church, connections with all kinds op people are all adventures that stem from this. In my practice at home everybody is welcome. I believe that we can truly flourish when our mind, soul, and body are connected with each other",
          "By joining hands to untangle situations that feel like tied-up knots, begins the search for recovery. I want to offer my therapeutic support during this search and the processing of experiences via the bridge of trust. And through interventions based on my expertise. O.a. 1986 verpleegkundige (BIG), 1997-2008 Focusing and psychoanalytic, pastoral, cliënt centered integrative therapist, 2008 developmental psychologie, 2012 Emotional Focused therapy and Hold me Tight training, 2013 Children focusing, 2018 Working with images, 2023 Emotional focused Individual Therapy, 2024 Understanding children's drawings, 2026 Jeugd en Gezin (SKJ)",
          "Feel free to contact for an introductory meeting and then dicide whether the approach suits you",
        ],
        qualifications: ["EFT therapist", ""],
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
        ctaPrimary: "Get in touch",
        ctaSecondary: "Read about my approach",
      },
      accountability: {
        seo: {
          title: "Approach: integrative therapy and EFT | Tofleven",
          description: "Read more about my approach and what you can expect",
        },
        eyebrow: "Vision",
        title: "Every human being is worthwile to live a life in accordance with oneself and others",
        intro: [
          "From entry by Tofleven, depending on the request for help, we discover what is needed. Space is given to that. Getting to work means trusting that whatever may be adressed will present itself, needs attention and everything matters. With respect and without value judgement being present and allow what arises",
          "Together we will discover where the knots are stuck, what isn't going well. Uncovering the root causes and creating space within yourself to function differently, honest en sincere",
        ],
        pillars: [
          { eyebrow: "Image of humanit", title: "Mind, soul and body", body: "Struggles are nog seperate from who you are. Look at the whole, not only to the symptoms" },
          { eyebrow: "Method", title: "Experience-oriented work", body: "By paying attention to what is happening inside you, you learn to recognize and understand something that affects you, and you can react more honestly" },
          { eyebrow: "For whom?", title: "For everyone who wants to learn, discover and grow", body: "Your real self is worthy to discover. When you walk around with your heart in your hands, for whatever reason, don't keep walking with it. Ring the bell" },
        ],
        reassurance: { title: "What can you expect?", body: "Through loving connection with yourself and others, your life will become simpler and more beautiful. Through insights in causes and reaction patterns, that are not helpful, is it possible to change. By experiencing precisely and by understanding where something comes from helps you realize what is needed. Our unique self is given space and that's awesome" },
        cta: "Get to know",
      },
      contact: {
        seo: {
          title: "Contact Tofleven",
          description: "Get in touch with Tofleven in Enter, response usually within two working days",
        },
        eyebrow: "Contact",
        title: "Get in touch with Tofleven in Enter, response usually within two working days",
        lede: "Fill the form or send an email direktly",
        locationLabel: "Practice Tofleven",
        location: "Enter, Overijssel",
        emailLabel: "E-mail",
        email: "info@tofleven.nl",
        rates: {
          heading: "Rates",
          items: [
            { label: "Individual consultation", price: "€80 per hour" },
            { label: "Couples therapy", price: "€95 per 1.5-hour session" },
          ],
        },
        form: {
          fields: { name: "Name", email: "Email address", subject: "Subject", message: "Your message", messagePlaceholder: "Briefly explain what you need help with" },
          subjectOptions: ["Individual therapy", "Relationship therapy", "child & parents/caregivers", "Hold me Tight or Emotion coachen training"],
          consentLabel: "I have read the privacy policy",
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
