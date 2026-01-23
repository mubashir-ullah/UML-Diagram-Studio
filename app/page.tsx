import type { Metadata } from "next";
import Script from "next/script";
import { PageEditor } from "@/app/page-editor";
import {
  getFAQPageSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";

const SITE_URL = "https://umldiagram.app";

export const metadata: Metadata = {
  title: "UML Diagram Studio - AI Powered UML Diagram Generation Tool",
  description: "Create professional UML diagrams online for free. Our tool supports class, sequence, activity, and use case diagrams. Start creating UML diagrams now!",
  keywords: [
    "uml diagram",
    "uml diagram tool",
    "uml diagram generator",
    "uml diagram online",
    "uml diagram maker",
    "uml diagram creator",
    "free uml diagram tool",
    "create uml diagram",
    "class diagram",
    "sequence diagram",
    "use case diagram",
    "activity diagram",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "UML Diagram Studio - AI Powered UML Diagram Generation Tool",
    description: "Create professional UML diagrams online for free. Our tool supports class, sequence, activity, and use case diagrams. Start creating UML diagrams now!",
    url: SITE_URL,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML Diagram Studio - Free Online UML Diagram Tool",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UML Diagram Studio - AI Powered UML Diagram Generation Tool",
    description: "Create professional UML diagrams online for free. Our tool supports class, sequence, activity, and use case diagrams.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const faqSchema = getFAQPageSchema([
  {
    question: "What is a UML diagram?",
    answer: "A UML diagram is a standardized visual representation used in software engineering to model, design, and document software systems. UML stands for Unified Modeling Language.",
  },
  {
    question: "Is this UML diagram tool free?",
    answer: "Yes, our UML diagram tool is completely free to use. You can create unlimited UML diagrams online without any restrictions or subscriptions.",
  },
  {
    question: "What types of UML diagrams can I create?",
    answer: "You can create class diagrams, sequence diagrams, activity diagrams, use case diagrams, state diagrams, component diagrams, and more using our UML diagram generator.",
  },
  {
    question: "Do I need to install anything to use this UML diagram tool?",
    answer: "No installation required! Our UML diagram tool works entirely in your web browser. Just open the website and start creating UML diagrams online.",
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
      {/* Hidden SEO content for search engine indexing - content is also available in help dialog */}
      <div className="sr-only" aria-hidden="true">
        <h1>Create Professional UML Diagrams Online - Free UML Diagram Tool</h1>
        <p>Create professional UML diagrams online for free. Our UML diagram tool supports class diagrams, sequence diagrams, activity diagrams, and use case diagrams. Start creating UML diagrams now with our free UML diagram generator!</p>
        
        <section>
          <h2>What is a UML Diagram?</h2>
          <p>A UML diagram (Unified Modeling Language diagram) is a standardized visual representation used in software engineering to model, design, and document software systems. UML diagrams help developers, architects, and stakeholders visualize the structure and behavior of software applications before implementation.</p>
          <p>UML diagrams are essential tools for software development because they provide a common language for communicating complex system designs. Whether you're working on a small project or a large enterprise application, UML diagrams help you understand relationships, interactions, and system architecture at a glance.</p>
          <p>Our free UML diagram tool makes it easy to create professional UML diagrams online without any installation or setup. You can create class diagrams, sequence diagrams, activity diagrams, use case diagrams, and more using our intuitive interface and AI-powered code generation.</p>
        </section>

        <section>
          <h2>Types of UML Diagrams</h2>
          <div>
            <h3>Class Diagrams</h3>
            <p>Structural diagrams showing classes, attributes, operations, and relationships</p>
          </div>
          <div>
            <h3>Sequence Diagrams</h3>
            <p>Behavioral diagrams showing interactions between objects over time</p>
          </div>
          <div>
            <h3>Use Case Diagrams</h3>
            <p>Functional diagrams showing system functionality from a user's perspective</p>
          </div>
          <div>
            <h3>Activity Diagrams</h3>
            <p>Workflow diagrams modeling business processes and system workflows</p>
          </div>
        </section>

        <section>
          <h2>How to Create UML Diagrams</h2>
          <p>Creating UML diagrams with our free UML diagram tool is simple and straightforward. Follow these steps to create your first UML diagram:</p>
          <ol>
            <li>Open our UML diagram tool in your web browser - no installation required</li>
            <li>Choose a diagram type or start with a template from our gallery</li>
            <li>Use our AI-powered assistant to generate diagram code from natural language descriptions</li>
            <li>Edit and customize your diagram using PlantUML syntax</li>
            <li>Preview your diagram in real-time as you type</li>
            <li>Export your diagram as PNG or SVG for use in documentation</li>
          </ol>
          <p>Our UML diagram generator supports both PlantUML and Mermaid syntax, making it easy to create professional diagrams regardless of your experience level. Whether you're a beginner learning UML diagrams or an experienced developer, our tool provides everything you need to create high-quality UML diagrams.</p>
        </section>

        <section>
          <h2>Why Use Our UML Diagram Tool?</h2>
          <div>
            <h3>Free UML Diagram Tool</h3>
            <p>Our UML diagram tool is completely free to use. No subscriptions, no hidden fees, no credit card required. Create unlimited UML diagrams online without any restrictions.</p>
          </div>
          <div>
            <h3>AI-Powered UML Diagram Generator</h3>
            <p>Use our AI assistant to generate UML diagram code from natural language descriptions. Simply describe what you want to create, and our AI will generate the code for you.</p>
          </div>
          <div>
            <h3>Real-Time Preview</h3>
            <p>See your UML diagrams update instantly as you type. Our real-time preview ensures you always see exactly what your diagram will look like.</p>
          </div>
          <div>
            <h3>Multiple Diagram Types</h3>
            <p>Create class diagrams, sequence diagrams, activity diagrams, use case diagrams, state diagrams, and more. Our UML diagram tool supports all major UML diagram types.</p>
          </div>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <div>
            <h3>What is a UML diagram?</h3>
            <p>A UML diagram is a standardized visual representation used in software engineering to model, design, and document software systems. UML stands for Unified Modeling Language.</p>
          </div>
          <div>
            <h3>Is this UML diagram tool free?</h3>
            <p>Yes, our UML diagram tool is completely free to use. You can create unlimited UML diagrams online without any restrictions or subscriptions.</p>
          </div>
          <div>
            <h3>What types of UML diagrams can I create?</h3>
            <p>You can create class diagrams, sequence diagrams, activity diagrams, use case diagrams, state diagrams, component diagrams, and more using our UML diagram generator.</p>
          </div>
          <div>
            <h3>Do I need to install anything to use this UML diagram tool?</h3>
            <p>No installation required! Our UML diagram tool works entirely in your web browser. Just open the website and start creating UML diagrams online.</p>
          </div>
        </section>
      </div>
      <PageEditor />
    </>
  );
}

