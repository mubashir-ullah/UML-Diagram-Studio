import type { Metadata } from "next";
import Script from "next/script";
import { PageEditor } from "@/app/page-editor";
import { HomePageSEO } from "@/app/page-seo";
import { Footer } from "@/components/footer";
import {
  getFAQPageSchema,
  getSoftwareApplicationSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: { absolute: "Free UML Diagram Tool Online | Class, Sequence, Use Case" },
  description:
    "Create UML diagrams online for free. Class, sequence, activity, and use case diagrams with live preview, PlantUML, and AI. No install.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Free UML Diagram Tool Online | Class, Sequence, Use Case",
    description:
      "Create UML diagrams online for free. Class, sequence, activity, and use case diagrams with live preview, PlantUML, and AI. No install.",
    url: SITE_URL,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Free UML diagram tool online with live PlantUML preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UML Diagram Tool Online | Class, Sequence, Use Case",
    description:
      "Create UML diagrams online for free. Class, sequence, activity, and use case diagrams with live preview, PlantUML, and AI. No install.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const faqSchema = getFAQPageSchema([
  {
    question: "What is a UML diagram?",
    answer:
      "A UML diagram is a standardized visual representation used in software engineering to model, design, and document software systems. UML stands for Unified Modeling Language.",
  },
  {
    question: "Is this UML diagram tool free?",
    answer:
      "Yes, our UML diagram tool is completely free to use. You can create unlimited UML diagrams online without any restrictions or subscriptions.",
  },
  {
    question: "What types of UML diagrams can I create?",
    answer:
      "You can create class diagrams, sequence diagrams, activity diagrams, use case diagrams, state diagrams, component diagrams, and more using our UML diagram generator.",
  },
  {
    question: "Do I need to install anything to use this UML diagram tool?",
    answer:
      "No installation required! Our UML diagram tool works entirely in your web browser. Just open the website and start creating UML diagrams online.",
  },
]);

export default function Home() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(faqSchema),
        }}
      />
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(getSoftwareApplicationSchema()),
        }}
      />
      <PageEditor />
      <HomePageSEO />
      <Footer />
    </>
  );
}
