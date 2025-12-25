'use client';

import { useState, useMemo } from "react";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-uml-diagrams",
    title: "Getting Started with UML Diagrams",
    description: "Learn the fundamentals of UML diagramming and how to create your first class diagram using PlantUML syntax.",
    content: "UML (Unified Modeling Language) is a standardized modeling language used to visualize the design of a system. In this comprehensive guide, we'll explore the basics of UML diagrams and how you can leverage PlantUML to create professional diagrams quickly...",
    author: "Mubashir",
    date: "2025-12-01",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["UML", "PlantUML", "Beginner"]
  },
  {
    id: "2",
    slug: "mastering-sequence-diagrams",
    title: "Mastering Sequence Diagrams",
    description: "Comprehensive guide to UML sequence diagrams: Learn how to create, read, and master sequence diagrams for system design, software architecture, and object interactions using PlantUML.",
    content: "Sequence diagrams are one of the most powerful tools in a software architect's toolkit. They help visualize the flow of messages between objects over time, making it easier to understand complex system interactions. In this comprehensive guide, you'll learn everything you need to know about creating effective sequence diagrams that communicate your system design clearly...",
    author: "Mubashir",
    date: "2025-12-02",
    readTime: "12 min read",
    category: "Advanced",
    tags: ["Sequence Diagrams", "UML Sequence Diagrams", "System Design", "Software Architecture", "PlantUML", "Object Interaction", "Interaction Diagrams", "Message Flow"]
  },
  {
    id: "3",
    slug: "ai-powered-diagram-generation",
    title: "AI-Powered Diagram Generation",
    description: "Discover how AI-powered UML diagram generators and tools can transform natural language descriptions into professional UML diagrams. Learn about the best AI diagram tools for creating class diagrams, sequence diagrams, use case diagrams, and more.",
    content: "The integration of AI into diagramming tools has revolutionized how developers create visual representations of their systems. With AI-powered UML diagram generators, you can now describe your system in plain English and get a complete, professional UML diagram in seconds. This comprehensive guide explores how AI is transforming the way we create UML diagrams, from class diagrams and sequence diagrams to use case diagrams and activity diagrams...",
    author: "Mubashir",
    date: "2025-12-02",
    readTime: "14 min read",
    category: "AI",
    tags: ["AI", "UML Diagram Generator", "UML Diagram Tool", "UML Diagram Maker", "UML Diagram Creator", "UML Diagram Online", "Class Diagram", "Sequence Diagram", "Use Case Diagram", "Activity Diagram", "Automation", "Productivity"]
  },
  {
    id: "4",
    slug: "best-practices-for-class-diagrams",
    title: "Best Practices for Class Diagrams",
    description: "Master UML class diagram best practices: Learn how to create clear, maintainable class diagrams with proper UML notation, symbols, and relationships. Essential guide for software engineering and system design.",
    content: "Creating effective class diagrams requires more than just knowing the syntax. It's about understanding relationships, choosing the right level of detail, and following conventions that make your diagrams readable and maintainable. This comprehensive guide covers industry best practices for creating professional UML class diagrams that effectively communicate your software design in software engineering projects...",
    author: "Mubashir",
    date: "2025-12-02",
    readTime: "15 min read",
    category: "Best Practices",
    tags: ["Class Diagrams", "UML Class Diagram", "UML Diagram", "UML Diagram Notation", "UML Diagram Symbols", "UML Diagram in Software Engineering", "Design", "Best Practices", "Software Architecture"]
  },
  {
    id: "5",
    slug: "activity-diagrams-for-workflow-modeling",
    title: "Activity Diagrams for Workflow Modeling",
    description: "Explore how activity diagrams can help you model business processes and system workflows effectively.",
    content: "Activity diagrams are excellent for modeling workflows, business processes, and the flow of control in your system. They provide a visual representation of activities and the transitions between them, making complex processes easier to understand and communicate.",
    author: "Mubashir",
    date: "2025-12-02",
    readTime: "15 min read",
    category: "Tutorial",
    tags: ["Activity Diagrams", "Workflow", "Business Process", "UML", "PlantUML", "Process Modeling", "Workflow Design"]
  },
  {
    id: "6",
    slug: "state-diagrams-modeling-system-behavior",
    title: "State Diagrams: Modeling System Behavior",
    description: "Understand how state diagrams can help you model the behavior and lifecycle of objects in your system.",
    content: "State diagrams are crucial for modeling the dynamic behavior of systems. They show how an object transitions between different states in response to events, making them essential for understanding complex state machines...",
    author: "Mubashir",
    date: "2025-12-02",
    readTime: "18 min read",
    category: "Advanced",
    tags: ["State Diagrams", "UML State Diagram", "State Machine", "System Behavior", "Object Lifecycle", "UML", "Software Design", "Behavior Modeling"]
  }
];

export default function BlogPage() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Extract all unique keywords from all blog posts
  const allKeywords = useMemo(() => {
    const keywordsSet = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => keywordsSet.add(tag));
    });
    return Array.from(keywordsSet).sort();
  }, []);

  // Filter blog posts based on selected keywords
  const filteredPosts = useMemo(() => {
    if (selectedKeywords.length === 0) {
      return blogPosts;
    }
    return blogPosts.filter(post =>
      selectedKeywords.some(keyword =>
        post.tags.some(tag => tag.toLowerCase() === keyword.toLowerCase())
      )
    );
  }, [selectedKeywords]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearFilters = () => {
    setSelectedKeywords([]);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar
        onTemplateSelect={() => {}}
        onToggleChat={() => {}}
        isChatOpen={false}
        currentCode=""
      />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold mb-2">UML Diagram Tutorials and Guides</h1>
          <p className="text-muted-foreground text-sm mb-4">
            Learn how to create UML diagrams with our comprehensive guides, tutorials, and best practices. Master class diagrams, sequence diagrams, use case diagrams, and more.
          </p>
          <h2 className="text-xl font-semibold mb-4 mt-6">Learn How to Create UML Diagrams</h2>
          
          {/* Keyword Filter Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">Filter by topic:</span>
              {selectedKeywords.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allKeywords.map((keyword) => {
                const isSelected = selectedKeywords.includes(keyword);
                return (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`
                      inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium transition-colors
                      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                      ${isSelected
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
                      }
                    `}
                  >
                    {keyword}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No blog posts found matching the selected filters.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <span>{post.author}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

