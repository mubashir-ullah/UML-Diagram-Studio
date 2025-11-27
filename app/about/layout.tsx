import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - UML Diagram Studio | AI-Powered Visual Diagramming Tool",
  description: "Learn about UML Diagram Studio, the free online tool for creating UML diagrams with AI assistance. Discover our mission, team, and how we're revolutionizing software diagramming.",
  keywords: [
    "UML diagrams",
    "UML diagram tool",
    "free UML tool",
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
    "UML online",
    "diagram creator"
  ],
  openGraph: {
    title: "About UML Diagram Studio - Free AI-Powered Diagramming Tool",
    description: "Learn about UML Diagram Studio, the free online tool for creating UML diagrams with AI assistance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About UML Diagram Studio",
    description: "Learn about UML Diagram Studio, the free online tool for creating UML diagrams with AI assistance.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

