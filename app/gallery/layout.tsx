import type { Metadata } from "next";
import Script from "next/script";
import {
  getCollectionPageSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";

const SITE_URL = "https://umldiagram.app";

export const metadata: Metadata = {
  title: "UML Diagram Gallery - Professional Examples & Templates",
  description: "Browse our collection of UML diagram examples with detailed information, use cases, components, and step-by-step guides on how to create them.",
  keywords: [
    "uml diagram",
    "uml diagram examples",
    "diagram gallery",
    "class diagrams",
    "sequence diagrams",
    "use case diagrams",
    "activity diagrams",
    "uml diagram templates",
    "software diagrams",
    "system design",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    title: "UML Diagram Gallery - Examples and Templates",
    description: "Browse our collection of UML diagram examples with detailed guides and step-by-step instructions.",
    url: `${SITE_URL}/gallery`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML Diagram Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UML Diagram Gallery - Examples and Templates",
    description: "Browse our collection of UML diagram examples with detailed guides and step-by-step instructions.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="collection-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getCollectionPageSchema(
              "UML Diagram Gallery",
              "Browse our collection of UML diagram examples with detailed guides and step-by-step instructions.",
              `${SITE_URL}/gallery`
            )
          ),
        }}
      />
      {children}
    </>
  );
}

