import type { Metadata } from "next";
import Script from "next/script";
import {
  getHowToSchema,
  getArticleSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/seo/config";

const diagramMetadata: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "class-diagram": {
    title: "UML Class Diagram - Complete Guide, Examples and Tutorial",
    description:
      "Complete guide to UML class diagrams. Learn class diagram notation, symbols, examples, and how to create class diagrams for software engineering projects.",
    keywords: ["uml class diagram", "class diagram", "uml diagram notation"],
  },
  "sequence-diagram": {
    title: "UML Sequence Diagram Example and How to Create One",
    description:
      "Sequence diagram example with PlantUML. Learn lifelines, messages, and how to create a sequence diagram in a free online UML tool.",
    keywords: ["sequence diagram", "uml sequence diagram", "plantuml sequence"],
  },
  "activity-diagram": {
    title: "UML Activity Diagram Example and Workflow Guide",
    description:
      "Activity diagram example for workflows and business processes. Create activity diagrams online with PlantUML in UML Diagram Studio.",
    keywords: ["activity diagram", "uml activity diagram", "workflow diagram"],
  },
  "use-case-diagram": {
    title: "UML Use Case Diagram Example and Tutorial",
    description:
      "Use case diagram example with actors, system boundary, and goals. Create use case diagrams online with PlantUML.",
    keywords: ["use case diagram", "uml use case", "actors and use cases"],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = diagramMetadata[slug];

  if (!meta) {
    return {
      title: "Diagram Not Found | UML Diagram Studio",
      description: "The requested diagram could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const url = `${SITE_URL}/gallery/${slug}`;

  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "UML Diagram Studio",
      type: "article",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function GalleryDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = diagramMetadata[slug];

  if (!meta) {
    return <>{children}</>;
  }

  const url = `${SITE_URL}/gallery/${slug}`;
  const now = new Date().toISOString();

  const howToSteps = [
    {
      name: "Open UML Diagram Studio",
      text: "Navigate to the Studio page and open the code editor.",
    },
    {
      name: "Start with @startuml",
      text: "Begin your PlantUML code with @startuml and set the theme.",
    },
    {
      name: "Define Classes",
      text: "Create classes using the 'class' keyword with attributes and methods.",
    },
    {
      name: "Add Relationships",
      text: "Define relationships between classes using arrows and relationship types.",
    },
    {
      name: "Preview and Export",
      text: "Use the real-time preview to see your diagram and export as PNG or SVG.",
    },
  ];

  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getHowToSchema(
              `How to Create ${meta.title.split(" - ")[0]}`,
              meta.description,
              howToSteps
            )
          ),
        }}
      />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getArticleSchema(
              meta.title,
              meta.description,
              url,
              now,
              now,
              "Mubashir",
              `${SITE_URL}/og-image.png`
            )
          ),
        }}
      />
      {children}
    </>
  );
}

