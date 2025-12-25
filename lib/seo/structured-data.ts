const SITE_URL = "https://umldiagram.app";

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface SoftwareApplicationSchema {
  "@context": string;
  "@type": string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  description: string;
  url: string;
}

export interface BreadcrumbListSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

export interface HowToSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  step: Array<{
    "@type": string;
    name: string;
    text: string;
  }>;
}

export interface FAQPageSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export interface CollectionPageSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
}

export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UML Diagram Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/UML-Diagram.ico`,
    description: "Free online UML diagram tool for creating professional class, sequence, activity, and use case diagrams.",
    sameAs: [
      "https://github.com/mubashir-ullah/UML-Diagram-Studio",
    ],
  };
}

export function getWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UML Diagram Studio",
    url: SITE_URL,
    description: "Free online UML diagram tool for creating professional diagrams.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareApplicationSchema(): SoftwareApplicationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UML Diagram Studio",
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Free online UML diagram tool with AI-powered code generation. Create class diagrams, sequence diagrams, activity diagrams, and more with real-time preview.",
    url: SITE_URL,
  };
}

export function getBreadcrumbListSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getArticleSchema(
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  author: string,
  image?: string
): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image || `${SITE_URL}/UML-Diagram.ico`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "UML Diagram Studio",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/UML-Diagram.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  };
}

export function getFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getCollectionPageSchema(
  name: string,
  description: string,
  url: string
): CollectionPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
  };
}

export function generateStructuredDataScript(schema: object): string {
  return JSON.stringify(schema, null, 2);
}

