import type { Metadata } from "next";
import Script from "next/script";
import {
  getArticleSchema,
  getBreadcrumbListSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

const blogPosts: Record<string, BlogPost> = {
  "getting-started-with-uml-diagrams": {
    id: "1",
    slug: "getting-started-with-uml-diagrams",
    title: "Getting Started with UML Diagrams",
    description: "Learn the fundamentals of UML diagramming and how to create your first class diagram using PlantUML syntax.",
    author: "Mubashir",
    date: "2025-12-01",
    category: "Tutorial",
    tags: ["UML", "PlantUML", "Beginner"]
  },
  "mastering-sequence-diagrams": {
    id: "2",
    slug: "mastering-sequence-diagrams",
    title: "Mastering Sequence Diagrams",
    description: "Comprehensive guide to UML sequence diagrams: Learn how to create, read, and master sequence diagrams for system design, software architecture, and object interactions using PlantUML.",
    author: "Mubashir",
    date: "2025-12-02",
    category: "Advanced",
    tags: ["Sequence Diagrams", "UML Sequence Diagrams", "System Design", "Software Architecture", "PlantUML", "Object Interaction", "Interaction Diagrams", "Message Flow"]
  },
  "ai-powered-diagram-generation": {
    id: "3",
    slug: "ai-powered-diagram-generation",
    title: "AI-Powered Diagram Generation",
    description: "Discover how AI-powered UML diagram generators and tools can transform natural language descriptions into professional UML diagrams. Learn about the best AI diagram tools for creating class diagrams, sequence diagrams, use case diagrams, and more.",
    author: "Mubashir",
    date: "2025-12-02",
    category: "AI",
    tags: ["AI", "UML Diagram Generator", "UML Diagram Tool", "UML Diagram Maker", "UML Diagram Creator", "UML Diagram Online", "Class Diagram", "Sequence Diagram", "Use Case Diagram", "Activity Diagram", "Automation", "Productivity"]
  },
  "best-practices-for-class-diagrams": {
    id: "4",
    slug: "best-practices-for-class-diagrams",
    title: "Best Practices for Class Diagrams",
    description: "Master UML class diagram best practices: Learn how to create clear, maintainable class diagrams with proper UML notation, symbols, and relationships. Essential guide for software engineering and system design.",
    author: "Mubashir",
    date: "2025-12-02",
    category: "Best Practices",
    tags: ["Class Diagrams", "UML Class Diagram", "UML Diagram", "UML Diagram Notation", "UML Diagram Symbols", "UML Diagram in Software Engineering", "Design", "Best Practices", "Software Architecture"]
  },
  "activity-diagrams-for-workflow-modeling": {
    id: "5",
    slug: "activity-diagrams-for-workflow-modeling",
    title: "Activity Diagrams for Workflow Modeling",
    description: "Explore how activity diagrams can help you model business processes and system workflows effectively.",
    author: "Mubashir",
    date: "2025-12-02",
    category: "Tutorial",
    tags: ["Activity Diagrams", "Workflow", "Business Process", "UML", "PlantUML", "Process Modeling", "Workflow Design"]
  },
  "state-diagrams-modeling-system-behavior": {
    id: "6",
    slug: "state-diagrams-modeling-system-behavior",
    title: "State Diagrams: Modeling System Behavior in UML (Complete Guide with Examples)",
    description: "Understand how state diagrams can help you model the behavior and lifecycle of objects in your system.",
    author: "Mubashir",
    date: "2025-12-02",
    category: "Advanced",
    tags: ["State Diagrams", "State Machines", "Behavior Modeling"]
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: "Blog Post Not Found | UML Diagram Studio",
      description: "The requested blog post could not be found.",
    };
  }

  const url = `https://umldiagram.app/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const SITE_URL = "https://umldiagram.app";

  return {
    title: `${post.title} | UML Diagram Studio Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "UML Diagram Studio",
      type: "article",
      publishedTime,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE_URL}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return <>{children}</>;
  }

  const url = `https://umldiagram.app/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.date).toISOString();

  const breadcrumbs = [
    { name: "Home", url: "https://umldiagram.app" },
    { name: "Blog", url: "https://umldiagram.app/blog" },
    { name: post.title, url },
  ];

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getArticleSchema(
              post.title,
              post.description,
              url,
              publishedTime,
              modifiedTime,
              post.author,
              `https://umldiagram.app/og-image.png`
            )
          ),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getBreadcrumbListSchema(breadcrumbs)
          ),
        }}
      />
      {children}
    </>
  );
}

