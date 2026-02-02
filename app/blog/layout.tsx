import type { Metadata } from "next";
import Script from "next/script";
import {
  getCollectionPageSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: "UML Diagram Blog - Tutorials, Guides & Best Practices",
  description: "Learn how to create UML diagrams with our comprehensive guides, tutorials, and best practices. Master class diagrams, sequence diagrams, and more.",
  keywords: [
    "uml diagram",
    "uml diagram tutorial",
    "uml diagram guide",
    "class diagram",
    "sequence diagram",
    "use case diagram",
    "activity diagram",
    "uml diagram examples",
    "how to create uml diagram",
  ],
  authors: [{ name: "Mubashir" }],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "UML Diagram Blog - Tutorials, Guides & Best Practices",
    description: "Learn how to create UML diagrams with our comprehensive guides, tutorials, and best practices. Master class diagrams, sequence diagrams, and more.",
    url: `${SITE_URL}/blog`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML Diagram Studio Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UML Diagram Blog - Tutorials, Guides & Best Practices",
    description: "Learn how to create UML diagrams with our comprehensive guides, tutorials, and best practices.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="blog-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getCollectionPageSchema(
              "UML Diagram Blog",
              "Learn how to create UML diagrams with our comprehensive guides, tutorials, and best practices. Master class diagrams, sequence diagrams, and more.",
              `${SITE_URL}/blog`
            )
          ),
        }}
      />
      {children}
    </>
  );
}

