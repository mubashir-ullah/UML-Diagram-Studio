import { MetadataRoute } from "next";

const SITE_URL = "https://umldiagram.app";

// Blog posts data - imported from the actual source to ensure consistency
// This matches app/blog/[slug]/layout.tsx
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

// Gallery items - matches app/gallery/[slug]/page.tsx
const galleryItems = [
  {
    slug: "class-diagram",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, ""); // Ensure no trailing slash
  const currentDate = new Date();

  // Helper function to ensure proper URL formatting (no trailing slashes except for root)
  const formatUrl = (path: string): string => {
    if (path === "/" || path === "") {
      return baseUrl;
    }
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "");
  };

  // Static pages - ordered by priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: formatUrl("/"),
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: formatUrl("/blog"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: formatUrl("/gallery"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: formatUrl("/about"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Blog posts - convert Record to array and map
  const blogPages: MetadataRoute.Sitemap = Object.values(blogPosts)
    .map((post) => {
      const postDate = new Date(post.date);
      // Validate date
      if (isNaN(postDate.getTime())) {
        console.warn(`Invalid date for blog post ${post.slug}: ${post.date}`);
        // Return a valid entry with current date if date is invalid
        return {
          url: formatUrl(`/blog/${post.slug}`),
          lastModified: currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        };
      }
      return {
        url: formatUrl(`/blog/${post.slug}`),
        lastModified: postDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    });

  // Gallery detail pages
  const galleryPages: MetadataRoute.Sitemap = galleryItems.map((item) => ({
    url: formatUrl(`/gallery/${item.slug}`),
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Combine all pages and remove duplicates by URL
  const allPages = [...staticPages, ...blogPages, ...galleryPages];
  const uniquePages = Array.from(
    new Map(allPages.map((page) => [page.url, page])).values()
  );

  // Sort by priority (descending) then by URL for consistent ordering
  uniquePages.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return a.url.localeCompare(b.url);
  });

  return uniquePages;
}

