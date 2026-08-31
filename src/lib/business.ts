export type VerifiedFact<T> = {
  status: "verified";
  value: T;
  source: string;
};

export type RequiredFact = {
  status: "required";
  todo: string;
};

export type BusinessFact<T> = VerifiedFact<T> | RequiredFact;

const verified = <T>(value: T, source: string): VerifiedFact<T> => ({
  status: "verified",
  value,
  source,
});

const required = (todo: string): RequiredFact => ({
  status: "required",
  todo,
});

/**
 * The only source of public business facts used by templates and schema.
 * A required fact has no value by design, so it cannot accidentally become a
 * public claim. Replace it with verified(...) only after owner approval.
 */
export const businessFacts = {
  brandName: verified("Tofleven", "Approved site identity"),
  practitionerName: verified("Gérita de Wilde", "Approved practitioner copy"),
  practitionerRole: verified(
    {
      nl: "integratief therapeut",
      en: "integrative therapist",
    },
    "Approved page-title direction",
  ),
  locality: verified(
    {
      city: "Enter",
      countryCode: "NL",
      countryName: {
        nl: "Nederland",
        en: "the Netherlands",
      },
    },
    "Approved local SEO brief",
  ),
  legalName: required("Confirm the legal or registered practice name."),
  email: required("Confirm the public practice email address."),
  phone: required("Confirm the public practice telephone number."),
  streetAddress: required("Confirm whether a street address may be published."),
  postalCode: required("Confirm the public postal code."),
  serviceArea: required("Confirm the real service area."),
  openingHours: required("Confirm public opening or contact hours."),
  registrationNumbers: required(
    "Confirm active registrations, identifiers, titles, and verification URLs.",
  ),
  trainingHistoryApproval: required(
    "Confirm every education/training title, provider, date, and current relevance.",
  ),
  complaintsRoute: required(
    "Confirm the complaints procedure and approved public destination.",
  ),
} as const satisfies Record<string, BusinessFact<unknown>>;

export interface ContentReview {
  status: "required" | "verified";
  owner?: string;
  reviewer?: string;
  lastReviewed?: string;
  todo?: string;
}

export const contentReviews = {
  nl: {
    home: {
      status: "required",
      todo: "Owner approval of Dutch service and outcome wording is required.",
    },
    about: {
      status: "required",
      todo: "Owner verification of training history and professional scope is required.",
    },
    accountability: {
      status: "required",
      todo: "Owner approval of Dutch approach and scope wording is required.",
    },
    contact: {
      status: "required",
      todo: "Owner approval of crisis, privacy, and contact wording is required.",
    },
  },
  en: {
    home: {
      status: "required",
      todo: "Fluent-English and owner approval is required.",
    },
    about: {
      status: "required",
      todo: "Fluent-English and owner verification of training history is required.",
    },
    accountability: {
      status: "required",
      todo: "Fluent-English and owner approval of scope wording is required.",
    },
    contact: {
      status: "required",
      todo: "Fluent-English and owner approval of crisis and privacy wording is required.",
    },
  },
} as const satisfies Record<string, Record<string, ContentReview>>;

export function getVerifiedFact<T>(fact: BusinessFact<T>): T | undefined {
  return fact.status === "verified" ? fact.value : undefined;
}

export function getVerifiedContentReview(
  locale: "nl" | "en",
  page: "home" | "about" | "accountability" | "contact",
): Required<Pick<ContentReview, "owner" | "reviewer" | "lastReviewed">> | undefined {
  const review: ContentReview = contentReviews[locale][page];
  if (
    review.status !== "verified" ||
    !review.owner ||
    !review.reviewer ||
    !review.lastReviewed
  ) {
    return undefined;
  }
  return {
    owner: review.owner,
    reviewer: review.reviewer,
    lastReviewed: review.lastReviewed,
  };
}

export function getLaunchReadinessIssues(): string[] {
  const businessIssues = Object.entries(businessFacts)
    .filter(([, fact]) => fact.status === "required")
    .map(([key, fact]) => `${key}: ${(fact as RequiredFact).todo}`);
  const reviewIssues = Object.entries(contentReviews).flatMap(([locale, pages]) =>
    Object.entries(pages)
      .filter(([, review]) => review.status !== "verified")
      .map(([page, review]) => `${locale}/${page}: ${review.todo}`),
  );

  return [...businessIssues, ...reviewIssues];
}

export function assertLaunchReady(): void {
  if (process.env.TOFLEVEN_ENFORCE_LAUNCH_READINESS !== "true") return;

  const issues = getLaunchReadinessIssues();
  if (issues.length > 0) {
    throw new Error(
      `Launch blocked: ${issues.length} verified owner inputs are missing.\n- ${issues.join("\n- ")}`,
    );
  }
}
