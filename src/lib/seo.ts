import { assertLaunchReady, businessFacts } from "./business";
import {
  content,
  getPath,
  routes,
  type Locale,
  type PageKey,
} from "./content";

export type SeoPageType = "home" | "profile" | "approach" | "contact" | "not-found";

export interface SocialImageMetadata {
  path: string;
  alt: string;
  width: 1200;
  height: 630;
}

export interface LocaleAlternates {
  nl: string;
  en: string;
  xDefault: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string | null;
  localeAlternates: LocaleAlternates | null;
  indexable: boolean;
  pageType: SeoPageType;
  socialImage?: SocialImageMetadata;
  structuredData: boolean;
}

const pageTypes = {
  home: "home",
  about: "profile",
  accountability: "approach",
  contact: "contact",
} as const satisfies Record<PageKey, SeoPageType>;

// No approved 1200x630 brand asset currently exists. Add it here only after
// owner approval; BaseLayout will then emit the complete OG/Twitter image set.
const defaultSocialImage: SocialImageMetadata | undefined = undefined;

export function getPageMetadata(locale: Locale, page: PageKey): PageMetadata {
  assertLaunchReady();
  const seo = content[locale].pages[page].seo;

  return {
    title: seo.title,
    description: seo.description,
    canonicalPath: getPath(locale, page),
    localeAlternates: {
      nl: routes[page].nl,
      en: routes[page].en,
      xDefault: routes[page].nl,
    },
    indexable: true,
    pageType: pageTypes[page],
    socialImage: defaultSocialImage,
    structuredData: true,
  };
}

export function getNotFoundMetadata(locale: Locale): PageMetadata {
  return {
    title: locale === "nl" ? "Pagina niet gevonden | Tofleven" : "Page not found | Tofleven",
    description:
      locale === "nl"
        ? "De gevraagde pagina kon niet worden gevonden."
        : "The requested page could not be found.",
    canonicalPath: null,
    localeAlternates: null,
    indexable: false,
    pageType: "not-found",
    structuredData: false,
  };
}

type JsonLdNode = Record<string, unknown>;

export function buildStructuredData(
  metadata: PageMetadata,
  locale: Locale,
  site: URL,
): { "@context": "https://schema.org"; "@graph": JsonLdNode[] } | null {
  if (!metadata.structuredData || !metadata.canonicalPath) return null;

  const homeUrl = new URL(getPath(locale, "home"), site).toString();
  const pageUrl = new URL(metadata.canonicalPath, site).toString();
  const websiteId = new URL("/#website", site).toString();
  const organizationId = new URL("/#organization", site).toString();
  const personId = new URL("/#practitioner", site).toString();
  const graph: JsonLdNode[] = [];

  if (metadata.pageType === "home") {
    graph.push(
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: businessFacts.brandName.value,
        url: new URL("/", site).toString(),
        inLanguage: ["nl", "en"],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: businessFacts.brandName.value,
        url: new URL("/", site).toString(),
      },
    );
  }

  const webPage: JsonLdNode = {
    "@type":
      metadata.pageType === "profile"
        ? "ProfilePage"
        : metadata.pageType === "contact"
          ? "ContactPage"
          : "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: metadata.title,
    description: metadata.description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
  };

  if (metadata.pageType === "profile") {
    webPage.mainEntity = { "@id": personId };
    graph.push({
      "@type": "Person",
      "@id": personId,
      name: businessFacts.practitionerName.value,
      jobTitle: businessFacts.practitionerRole.value[locale],
      url: pageUrl,
      worksFor: { "@id": organizationId },
    });
  }

  if (metadata.pageType === "contact") {
    webPage.about = { "@id": organizationId };
  }

  if (metadata.pageType === "home") {
    webPage.url = homeUrl;
  }

  graph.push(webPage);
  return { "@context": "https://schema.org", "@graph": graph };
}
