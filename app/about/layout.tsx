import type { Metadata } from "next";
import Script from "next/script";
import {
  getOrganizationSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";

const SITE_URL = "https://umldiagram.app";

export const metadata: Metadata = {
  title: "About UML Diagram Studio - Your Free UML Diagram Tool",
  description: "Learn about UML Diagram Studio, the free online UML diagram tool for creating professional diagrams with AI assistance. Discover our mission and features.",
  keywords: [
    "uml diagram",
    "uml diagram tool",
    "free uml tool",
    "uml diagram creator",
    "PlantUML",
    "Mermaid diagrams",
    "class diagrams",
    "sequence diagrams",
    "software architecture",
    "diagramming tool",
    "AI diagram generator",
    "visual diagramming",
    "software design",
    "system architecture",
    "uml online",
    "diagram creator",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About UML Diagram Studio - Free UML Diagram Tool",
    description: "Learn about UML Diagram Studio, the free online UML diagram tool for creating professional diagrams with AI assistance.",
    url: `${SITE_URL}/about`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML Diagram Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About UML Diagram Studio - Free UML Diagram Tool",
    description: "Learn about UML Diagram Studio, the free online UML diagram tool for creating professional diagrams with AI assistance.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="about-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(getOrganizationSchema()),
        }}
      />
      {children}
    </>
  );
}

