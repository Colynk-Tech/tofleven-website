export const LOCALES = ["nl", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "nl";

export const PAGE_KEYS = [
  "home",
  "about",
  "accountability",
  "contact",
  "privacy",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];
export type NavPageKey = Exclude<PageKey, "home" | "privacy">;

export type LocalizedPath =
  | "/"
  | "/over-mij"
  | "/verantwoording"
  | "/contact"
  | "/privacy"
  | "/en/"
  | "/en/about"
  | "/en/approach"
  | "/en/contact"
  | "/en/privacy";

export interface SeoContent {
  title: string;
  description: string;
}

export interface NavItem {
  page: NavPageKey;
  label: string;
}

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
  col2Items: readonly [string, string];
  privacyLink: string;
}

export interface SharedContent {
  languageLabel: string;
  skipLink: string;
  nav: NavContent;
  footer: FooterContent;
}

export interface InfoCardContent {
  eyebrow: string;
  title: string;
  body: string;
}

export interface HomePageContent {
  seo: SeoContent;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  method: {
    eyebrow: string;
    title: string;
    lede: string;
    cards: readonly [
      InfoCardContent,
      InfoCardContent,
      InfoCardContent,
    ];
  };
  forWhom: {
    eyebrow: string;
    title: string;
    lede: string;
    trainings: readonly [InfoCardContent, InfoCardContent];
  };
  band: {
    title: string;
    body: string;
    cta: string;
  };
}

export interface AboutPageContent {
  seo: SeoContent;
  eyebrow: string;
  name: string;
  photoCaption: string;
  paragraphs: readonly [string, string, string];
  credentials: readonly [string, string];
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface AccountabilityPageContent {
  seo: SeoContent;
  eyebrow: string;
  title: string;
  intro: readonly [string, string];
  pillars: readonly [
    InfoCardContent,
    InfoCardContent,
    InfoCardContent,
  ];
  reassurance: {
    title: string;
    body: string;
  };
  cta: string;
}

export const CONTACT_FORM_STATES = [
  "idle",
  "submitting",
  "success",
  "error",
] as const;

export type ContactFormState = (typeof CONTACT_FORM_STATES)[number];

export interface ContactFormContent {
  fields: {
    name: string;
    email: string;
    subject: string;
    message: string;
    messagePlaceholder: string;
  };
  subjectOptions: readonly [string, string, string, string];
  consentLabel: string;
  submit: string;
  states: {
    submitting: string;
    success: string;
    error: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    consentRequired: string;
  };
}

export interface ContactPageContent {
  seo: SeoContent;
  eyebrow: string;
  title: string;
  lede: string;
  emailLabel: string;
  emailValue: string;
  locationLabel: string;
  locationValue: string;
  placeholderNote: string;
  form: ContactFormContent;
}

export interface PrivacySectionContent {
  title: string;
  body: string;
}

export interface PrivacyPageContent {
  seo: SeoContent;
  title: string;
  placeholderNote: string;
  sections: readonly [
    PrivacySectionContent,
    PrivacySectionContent,
    PrivacySectionContent,
    PrivacySectionContent,
  ];
}

export interface PageContentMap {
  home: HomePageContent;
  about: AboutPageContent;
  accountability: AccountabilityPageContent;
  contact: ContactPageContent;
  privacy: PrivacyPageContent;
}

export type PageContent = PageContentMap[PageKey];

export interface SiteContent {
  shared: SharedContent;
  pages: PageContentMap;
}

export const routes = {
  home: {
    nl: "/",
    en: "/en/",
  },
  about: {
    nl: "/over-mij",
    en: "/en/about",
  },
  accountability: {
    nl: "/verantwoording",
    en: "/en/approach",
  },
  contact: {
    nl: "/contact",
    en: "/en/contact",
  },
  privacy: {
    nl: "/privacy",
    en: "/en/privacy",
  },
} as const satisfies Record<PageKey, Record<Locale, LocalizedPath>>;

export const content = {
  nl: {
    shared: {
      languageLabel: "Taal",
      skipLink: "Ga naar de inhoud",
      nav: {
        ctaLabel: "Neem contact op",
        menuLabel: "Menu openen",
        closeMenuLabel: "Menu sluiten",
        items: [
          { page: "about", label: "Over mij" },
          { page: "accountability", label: "Verantwoording" },
          { page: "contact", label: "Contact" },
        ],
      },
      footer: {
        col1Title: "Over Tofleven",
        col1Items: ["Over mij", "Verantwoording"],
        col2Title: "Contact",
        col2Items: ["info@tofleven.nl", "Enter, Overijssel"],
        privacyLink: "Privacyverklaring",
      },
    },
    pages: {
      home: {
        seo: {
          title: "Tofleven | Therapie van binnenuit in Enter",
          description:
            "Gerita de Wilde helpt kinderen, ouders en volwassenen verbinding te vinden met zichzelf en met elkaar, vanuit geest, ziel en lichaam.",
        },
        hero: {
          eyebrow: "EFT-therapeut · Enter",
          title: "Therapie van binnenuit, geworteld in wie je bent",
          intro:
            "Ik ben Gerita de Wilde. Vanuit geest, ziel en lichaam help ik kinderen, ouders en volwassenen weer verbinding te vinden, met zichzelf en met elkaar.",
          ctaPrimary: "Maak kennis",
          ctaSecondary: "Lees over mijn werkwijze",
        },
        method: {
          eyebrow: "Werkwijze",
          title: "Worteltherapie: werken van binnenuit",
          lede:
            "Geen quick fix, maar aandacht voor wat er onder de oppervlakte speelt, vanuit een bijbels mensbeeld, zonder opgeheven vinger.",
          cards: [
            {
              eyebrow: "Emoties",
              title: "Emotieherkenning",
              body:
                "Leren voelen én begrijpen wat er in je omgaat, met Emotionally Focused Therapy (EFT) als basis.",
            },
            {
              eyebrow: "Verbinding",
              title: "Relatietherapie",
              body:
                "Voor stellen die weer naar elkaar toe willen groeien, ook na een periode van afstand.",
            },
            {
              eyebrow: "Identiteit",
              title: "Wie je in de kern bent",
              body:
                "Ruimte om jezelf te ontdekken, voorbij aanpassing en overleven, vanuit je eigen authenticiteit.",
            },
          ],
        },
        forWhom: {
          eyebrow: "Voor wie",
          title: "Begeleiding en trainingen",
          lede:
            "Voor kinderen, ouders en volwassenen, individueel of samen. Ook als groep, via een van mijn trainingen.",
          trainings: [
            {
              eyebrow: "Training",
              title: "Houd me vast",
              body:
                "Een praktische huwelijkstraining over wat er misgaat tussen partners, en hoe je elkaar emotioneel weer vindt.",
            },
            {
              eyebrow: "Training",
              title: "Ouder-emotiecoaching",
              body:
                "Leer de emoties van je kind herkennen en begeleiden, zodat je kind zich gezien en gehoord voelt.",
            },
          ],
        },
        band: {
          title: "Nieuwsgierig naar de visie achter mijn werk?",
          body:
            "Ik leg graag uit hoe ik theologie en psychotherapie combineer, en waarom dat voor iedereen toegankelijk is.",
          cta: "Lees mijn verantwoording",
        },
      },
      about: {
        seo: {
          title: "Over Gerita de Wilde | Tofleven",
          description:
            "Maak kennis met Gerita de Wilde, EFT-therapeut en geregistreerd jeugd- en gezinsprofessional in Enter.",
        },
        eyebrow: "Over mij",
        name: "Gerita de Wilde",
        photoCaption: "Portretfoto van Gerita, nog toe te voegen.",
        paragraphs: [
          "Ik combineer theologie en psychotherapie: ik geloof dat we pas echt tot bloei komen als geest, ziel en lichaam gezien worden. Als EFT-therapeut en geregistreerd jeugd- en gezinsprofessional begeleid ik kinderen, ouders en volwassenen, altijd vanuit authenticiteit en van binnenuit.",
          "Ik begon met het begeleiden van mensen met verslavingsproblematiek en werk nu vooral met relatietherapie en identiteitsvragen. Je komt met een hulpvraag; samen kijken we wat er nodig is, tot je zelf weer kunt zien wat er speelt.",
          "Je mag hier komen zoals je bent. Samen kijken we naar wat er onder de oppervlakte speelt, in jouw tempo.",
        ],
        credentials: [
          "EFT-therapeut",
          "Jeugd- en gezinsprofessional (geregistreerd)",
        ],
        ctaPrimary: "Neem contact op",
        ctaSecondary: "Lees mijn visie",
      },
      accountability: {
        seo: {
          title: "Visie en werkwijze | Tofleven",
          description:
            "Lees hoe Gerita de Wilde theologie en psychotherapie combineert in worteltherapie, met ruimte voor iedereen.",
        },
        eyebrow: "Visie",
        title: "Waar theologie en psychotherapie samenkomen",
        intro: [
          "Ik werk vanuit een bijbels mensbeeld: je bent geest, ziel en lichaam, en pas als alle drie gezien worden, komt er echt ruimte om te groeien. Deze visie is de basis van mijn werk, maar geen voorwaarde om bij mij te komen.",
          "Ik noem dit worteltherapie: niet aan de symptomen sleutelen, maar samen kijken naar de wortel van wat er speelt, van binnenuit, met aandacht voor je eigen authenticiteit en de keuzes die daarbij horen.",
        ],
        pillars: [
          {
            eyebrow: "Mensbeeld",
            title: "Geest, ziel en lichaam",
            body:
              "Klachten staan nooit los van wie je bent. Ik kijk naar het geheel, niet alleen naar het symptoom.",
          },
          {
            eyebrow: "Methode",
            title: "Van binnenuit werken",
            body:
              "Met Emotionally Focused Therapy leer je je emoties herkennen en begrijpen, in plaats van ze te vermijden.",
          },
          {
            eyebrow: "Toegankelijkheid",
            title: "Voor iedereen",
            body:
              "Mijn visie is bijbels geïnspireerd, maar mijn praktijk staat open voor iedereen, ongeacht je eigen geloof of levensvisie.",
          },
        ],
        reassurance: {
          title: "Moet ik gelovig zijn om hier te komen?",
          body:
            "Nee. Mijn manier van werken is geworteld in een bijbels mensbeeld, maar ik werk met de methodes en het gesprek dat bij jou past, zonder dat geloof onderwerp van gesprek moet zijn. Iedereen is welkom, met of zonder eigen overtuiging.",
        },
        cta: "Maak kennis",
      },
      contact: {
        seo: {
          title: "Contact | Tofleven",
          description:
            "Neem contact op met Tofleven in Enter. Gerita de Wilde reageert meestal binnen twee werkdagen.",
        },
        eyebrow: "Contact",
        title: "Neem contact op",
        lede:
          "Vul het formulier in of stuur direct een mail. Ik reageer meestal binnen twee werkdagen.",
        emailLabel: "E-mail",
        emailValue: "info@tofleven.nl",
        locationLabel: "Praktijk",
        locationValue: "Enter, Overijssel",
        placeholderNote:
          "Contactgegevens zijn placeholders. Worden aangevuld door de klant.",
        form: {
          fields: {
            name: "Naam",
            email: "E-mailadres",
            subject: "Onderwerp",
            message: "Je bericht",
            messagePlaceholder: "Vertel kort waarmee je hulp zoekt...",
          },
          subjectOptions: [
            "Individuele therapie",
            "Relatietherapie",
            "Kind & ouder",
            "Houd me vast training",
          ],
          consentLabel: "Ik ga akkoord met de privacyverklaring",
          submit: "Versturen",
          states: {
            submitting: "Bezig met versturen...",
            success: "Dank voor je bericht. Ik neem snel contact met je op.",
            error:
              "Het versturen is niet gelukt. Probeer het opnieuw of mail naar info@tofleven.nl.",
          },
          validation: {
            required: "Vul dit veld in.",
            invalidEmail: "Vul een geldig e-mailadres in.",
            consentRequired:
              "Ga akkoord met de privacyverklaring om je bericht te versturen.",
          },
        },
      },
      privacy: {
        seo: {
          title: "Privacyverklaring | Tofleven",
          description:
            "Lees hoe Tofleven omgaat met de persoonsgegevens die je via deze website deelt.",
        },
        title: "Privacyverklaring",
        placeholderNote:
          "Concepttekst. Dient nog te worden vervangen door een juridisch getoetste privacyverklaring.",
        sections: [
          {
            title: "Wie we zijn",
            body:
              "Tofleven is de therapiepraktijk van Gerita de Wilde, gevestigd in Enter. Deze verklaring beschrijft hoe we omgaan met de gegevens die je via deze website deelt.",
          },
          {
            title: "Welke gegevens we verzamelen",
            body:
              "Via het contactformulier verzamelen we je naam, e-mailadres, het gekozen onderwerp en je bericht. We verzamelen niet meer dan nodig is om te reageren op je vraag.",
          },
          {
            title: "Waarvoor we deze gegevens gebruiken",
            body:
              "We gebruiken je gegevens uitsluitend om contact met je op te nemen over je aanvraag. Je gegevens worden niet verkocht of gedeeld met derden voor marketingdoeleinden.",
          },
          {
            title: "Jouw rechten",
            body:
              "Je hebt altijd het recht om je gegevens in te zien, te laten aanpassen of te laten verwijderen. Neem hiervoor contact op via info@tofleven.nl.",
          },
        ],
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
          { page: "accountability", label: "My approach" },
          { page: "contact", label: "Contact" },
        ],
      },
      footer: {
        col1Title: "About Tofleven",
        col1Items: ["About me", "My approach"],
        col2Title: "Contact",
        col2Items: ["info@tofleven.nl", "Enter, the Netherlands"],
        privacyLink: "Privacy policy",
      },
    },
    pages: {
      home: {
        seo: {
          title: "Tofleven | Therapy from the inside out",
          description:
            "Gerita de Wilde helps children, parents and adults find connection with themselves and each other, working from spirit, soul and body.",
        },
        hero: {
          eyebrow: "EFT therapist · Enter",
          title: "Therapy from the inside out, rooted in who you are",
          intro:
            "I'm Gerita de Wilde. Working from spirit, soul and body, I help children, parents and adults find connection again, with themselves and with each other.",
          ctaPrimary: "Get in touch",
          ctaSecondary: "Read about my approach",
        },
        method: {
          eyebrow: "Approach",
          title: "Root therapy: working from the inside out",
          lede:
            "Not a quick fix, but attention to what's happening beneath the surface, grounded in a biblical view of the person, without judgement.",
          cards: [
            {
              eyebrow: "Emotions",
              title: "Recognising your emotions",
              body:
                "Learning to feel and understand what's going on inside you, using Emotionally Focused Therapy (EFT) as a foundation.",
            },
            {
              eyebrow: "Connection",
              title: "Relationship therapy",
              body:
                "For couples who want to grow towards each other again, even after a period of distance.",
            },
            {
              eyebrow: "Identity",
              title: "Who you are at the core",
              body:
                "Space to discover yourself, beyond adapting and surviving, grounded in your own authenticity.",
            },
          ],
        },
        forWhom: {
          eyebrow: "Who it's for",
          title: "Guidance and trainings",
          lede:
            "For children, parents and adults, individually or together. Also as a group, through one of my trainings.",
          trainings: [
            {
              eyebrow: "Training",
              title: "Hold Me Tight",
              body:
                "A practical marriage training about what goes wrong between partners, and how to find each other emotionally again.",
            },
            {
              eyebrow: "Training",
              title: "Parent emotion coaching",
              body:
                "Learn to recognise and guide your child's emotions, so your child feels seen and heard.",
            },
          ],
        },
        band: {
          title: "Curious about the vision behind my work?",
          body:
            "I'm happy to explain how I combine theology and psychotherapy, and why that's accessible to everyone.",
          cta: "Read my approach",
        },
      },
      about: {
        seo: {
          title: "About Gerita de Wilde | Tofleven",
          description:
            "Meet Gerita de Wilde, an EFT therapist and registered youth and family professional based in Enter, the Netherlands.",
        },
        eyebrow: "About me",
        name: "Gerita de Wilde",
        photoCaption: "Portrait photo of Gerita, to be added.",
        paragraphs: [
          "I combine theology and psychotherapy: I believe we only truly flourish when spirit, soul and body are all seen. As an EFT therapist and a registered youth and family professional, I guide children, parents and adults, always from authenticity and from the inside out.",
          "I started out guiding people with addiction issues, and now work mainly with relationship therapy and questions of identity. You come with a question; together we look at what's needed, until you can see for yourself what's going on.",
          "You're welcome here just as you are. Together we look at what's happening beneath the surface, at your own pace.",
        ],
        credentials: [
          "EFT therapist",
          "Registered youth and family professional",
        ],
        ctaPrimary: "Get in touch",
        ctaSecondary: "Read my approach",
      },
      accountability: {
        seo: {
          title: "Vision and approach | Tofleven",
          description:
            "Read how Gerita de Wilde brings theology and psychotherapy together in root therapy, with room for everyone.",
        },
        eyebrow: "Approach",
        title: "Where theology and psychotherapy meet",
        intro: [
          "I work from a biblical view of the person: you are spirit, soul and body, and only when all three are seen is there real room to grow. This view is the foundation of my work, but never a condition for coming to see me.",
          "I call this root therapy: not tweaking symptoms, but looking together at the root of what's going on, from the inside out, with attention to your own authenticity and the choices that come with it.",
        ],
        pillars: [
          {
            eyebrow: "View of the person",
            title: "Spirit, soul and body",
            body:
              "Struggles are never separate from who you are. I look at the whole person, not just the symptom.",
          },
          {
            eyebrow: "Method",
            title: "Working from the inside out",
            body:
              "Through Emotionally Focused Therapy you learn to recognise and understand your emotions, instead of avoiding them.",
          },
          {
            eyebrow: "Accessibility",
            title: "For everyone",
            body:
              "My vision is biblically inspired, but my practice is open to everyone, regardless of your own faith or worldview.",
          },
        ],
        reassurance: {
          title: "Do I need to be religious to come here?",
          body:
            "No. My way of working is rooted in a biblical view of the person, but I work with whatever method and conversation fits you. Faith doesn't have to be part of it. Everyone is welcome, with or without their own beliefs.",
        },
        cta: "Get in touch",
      },
      contact: {
        seo: {
          title: "Contact | Tofleven",
          description:
            "Get in touch with Tofleven in Enter, the Netherlands. Gerita de Wilde usually replies within two working days.",
        },
        eyebrow: "Contact",
        title: "Get in touch",
        lede:
          "Fill in the form or send an email directly. I usually reply within two working days.",
        emailLabel: "Email",
        emailValue: "info@tofleven.nl",
        locationLabel: "Practice",
        locationValue: "Enter, the Netherlands",
        placeholderNote:
          "Contact details are placeholders. To be supplied by the client.",
        form: {
          fields: {
            name: "Name",
            email: "Email address",
            subject: "Subject",
            message: "Your message",
            messagePlaceholder: "Briefly tell me what you'd like help with...",
          },
          subjectOptions: [
            "Individual therapy",
            "Relationship therapy",
            "Child & parent",
            "Hold Me Tight training",
          ],
          consentLabel: "I agree to the privacy policy",
          submit: "Send",
          states: {
            submitting: "Sending...",
            success: "Thank you for your message. I'll get back to you soon.",
            error:
              "Your message could not be sent. Please try again or email info@tofleven.nl.",
          },
          validation: {
            required: "Please complete this field.",
            invalidEmail: "Please enter a valid email address.",
            consentRequired:
              "Please agree to the privacy policy before sending your message.",
          },
        },
      },
      privacy: {
        seo: {
          title: "Privacy policy | Tofleven",
          description:
            "Read how Tofleven handles the personal data you share through this website.",
        },
        title: "Privacy policy",
        placeholderNote:
          "Draft text. To be replaced with a legally reviewed privacy policy.",
        sections: [
          {
            title: "Who we are",
            body:
              "Tofleven is the therapy practice of Gerita de Wilde, based in Enter, the Netherlands. This policy describes how we handle the data you share through this website.",
          },
          {
            title: "What data we collect",
            body:
              "Through the contact form we collect your name, email address, chosen subject and message. We don't collect more than needed to respond to your question.",
          },
          {
            title: "What we use this data for",
            body:
              "We use your data solely to get in touch with you about your request. Your data is never sold or shared with third parties for marketing purposes.",
          },
          {
            title: "Your rights",
            body:
              "You always have the right to view, correct or delete your data. Contact us at info@tofleven.nl to do so.",
          },
        ],
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
} as const satisfies Record<
  Locale,
  Record<Exclude<ContactFormState, "idle">, string>
>;

export const seo = {
  nl: {
    home: content.nl.pages.home.seo,
    about: content.nl.pages.about.seo,
    accountability: content.nl.pages.accountability.seo,
    contact: content.nl.pages.contact.seo,
    privacy: content.nl.pages.privacy.seo,
  },
  en: {
    home: content.en.pages.home.seo,
    about: content.en.pages.about.seo,
    accountability: content.en.pages.accountability.seo,
    contact: content.en.pages.contact.seo,
    privacy: content.en.pages.privacy.seo,
  },
} as const satisfies Record<Locale, Record<PageKey, SeoContent>>;

export interface ParsedLocalizedPath {
  locale: Locale;
  page: PageKey;
}

function normalizePath(path: string): string {
  const withoutQueryOrHash = path.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = withoutQueryOrHash.startsWith("/")
    ? withoutQueryOrHash
    : `/${withoutQueryOrHash}`;

  return withLeadingSlash === "/"
    ? withLeadingSlash
    : withLeadingSlash.replace(/\/+$/, "");
}

export function getPath<L extends Locale, P extends PageKey>(
  locale: L,
  page: P,
): (typeof routes)[P][L] {
  return routes[page][locale];
}

export function parseLocalizedPath(
  path: string,
): ParsedLocalizedPath | null {
  const normalized = normalizePath(path);

  for (const page of PAGE_KEYS) {
    for (const locale of LOCALES) {
      if (normalizePath(routes[page][locale]) === normalized) {
        return { locale, page };
      }
    }
  }

  return null;
}

export function getLocalePath(
  path: string,
  targetLocale: Locale,
): LocalizedPath | null {
  const parsed = parseLocalizedPath(path);
  return parsed ? routes[parsed.page][targetLocale] : null;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "nl" ? "en" : "nl";
}

export function getAlternateLocalePath(path: string): LocalizedPath | null {
  const parsed = parseLocalizedPath(path);
  return parsed
    ? routes[parsed.page][getAlternateLocale(parsed.locale)]
    : null;
}

export function getPageContent<P extends PageKey>(
  locale: Locale,
  page: P,
): PageContentMap[P] {
  return content[locale].pages[page];
}

export function getSeo(locale: Locale, page: PageKey): SeoContent {
  return seo[locale][page];
}
