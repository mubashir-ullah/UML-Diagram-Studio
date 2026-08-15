'use client';

import { useState, useMemo } from "react";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { blogPostsData } from "@/lib/data/blog-posts-data";

const blogPosts = Object.values(blogPostsData) as Array<{
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}>;

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
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold mb-2">UML Diagram Tutorials and Guides</h1>
          <p className="text-muted-foreground text-sm mb-4">
            Learn how to create UML diagrams with our comprehensive guides, tutorials, and best practices. Master <Link href="/gallery/class-diagram" className="text-primary hover:underline">class diagrams</Link>, <Link href="/gallery/sequence-diagram" className="text-primary hover:underline">sequence diagrams</Link>, <Link href="/blog/use-case-diagrams-guide" className="text-primary hover:underline">use case diagrams</Link>, <Link href="/gallery/activity-diagram" className="text-primary hover:underline">activity diagrams</Link>, and <Link href="/blog/plantuml-online" className="text-primary hover:underline">PlantUML online</Link>. Explore our <Link href="/gallery" className="text-primary hover:underline">diagram gallery</Link> or open the <Link href="/" className="text-primary hover:underline">free UML diagram tool</Link>.
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

