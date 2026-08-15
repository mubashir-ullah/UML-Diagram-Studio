'use client';

import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, BookOpen, Code, CheckCircle2, Image } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { blogPostsData } from "@/lib/data/blog-posts-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const blogPosts = blogPostsData as Record<string, any>;
const blogPostsBySlug: Record<string, any> = {};
Object.values(blogPosts).forEach((post: any) => {
  if (post?.slug) blogPostsBySlug[post.slug] = post;
});

export function BlogPostContent({ slug }: { slug: string }) {
  const post = blogPostsBySlug[slug];

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-background">
        <TopBar
          onTemplateSelect={() => { }}
          onToggleChat={() => { }}
          isChatOpen={false}
          currentCode=""
        />
        <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-2xl font-semibold mb-4">Blog Post Not Found</h1>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar
        onTemplateSelect={() => { }}
        onToggleChat={() => { }}
        isChatOpen={false}
        currentCode=""
      />

      <div className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            {/* Breadcrumb */}
            <Breadcrumb className="hidden sm:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline">{post.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <span>By {post.author}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-8">
            {post.sections ? (
              post.sections.map((section: any, index: number) => {
                // Helper function to render inline markdown (bold, code, links)
                const renderInlineMarkdown = (text: string) => {
                  const parts: (string | JSX.Element)[] = [];
                  let lastIndex = 0;

                  // Match bold text **text**, code `code`, or links [text](url)
                  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
                  let match;

                  while ((match = regex.exec(text)) !== null) {
                    // Add text before the match
                    if (match.index > lastIndex) {
                      parts.push(text.substring(lastIndex, match.index));
                    }

                    // Add the matched element
                    if (match[1].startsWith('**')) {
                      parts.push(<strong key={`bold-${match.index}`}>{match[2]}</strong>);
                    } else if (match[1].startsWith('`')) {
                      parts.push(<code key={`code-${match.index}`} className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">{match[3]}</code>);
                    } else if (match[1].startsWith('[')) {
                      parts.push(
                        <Link
                          key={`link-${match.index}`}
                          href={match[5]}
                          className="text-primary hover:underline font-medium"
                        >
                          {match[4]}
                        </Link>
                      );
                    }

                    lastIndex = regex.lastIndex;
                  }

                  // Add remaining text
                  if (lastIndex < text.length) {
                    parts.push(text.substring(lastIndex));
                  }

                  return parts.length > 0 ? parts : text;
                };

                const lines = section.content.split('\n');
                const elements: JSX.Element[] = [];
                let currentList: JSX.Element[] = [];
                let inList = false;
                let listType: 'bullet' | 'numbered' = 'bullet';

                lines.forEach((line: string, lineIndex: number) => {
                  const trimmedLine = line.trim();

                  // Empty line - close current list if any, add paragraph break
                  if (!trimmedLine) {
                    if (inList && currentList.length > 0) {
                      if (listType === 'numbered') {
                        elements.push(
                          <ol key={`list-${lineIndex}`} className="mb-4 list-decimal ml-6 space-y-1">
                            {currentList}
                          </ol>
                        );
                      } else {
                        elements.push(
                          <ul key={`list-${lineIndex}`} className="mb-4 list-disc ml-6 space-y-1">
                            {currentList}
                          </ul>
                        );
                      }
                      currentList = [];
                      inList = false;
                    }
                    return;
                  }

                  // Heading (line that starts and ends with **)
                  if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.length > 4) {
                    if (inList && currentList.length > 0) {
                      if (listType === 'numbered') {
                        elements.push(
                          <ol key={`list-${lineIndex}`} className="mb-4 list-decimal ml-6 space-y-1">
                            {currentList}
                          </ol>
                        );
                      } else {
                        elements.push(
                          <ul key={`list-${lineIndex}`} className="mb-4 list-disc ml-6 space-y-1">
                            {currentList}
                          </ul>
                        );
                      }
                      currentList = [];
                      inList = false;
                    }
                    const headingText = trimmedLine.replace(/\*\*/g, '');
                    elements.push(
                      <h3 key={lineIndex} className="text-xl font-semibold mt-6 mb-3 text-foreground">
                        {headingText}
                      </h3>
                    );
                    return;
                  }

                  // Numbered list item (starts with number followed by period)
                  const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
                  if (numberedMatch) {
                    if (inList && listType !== 'numbered') {
                      // Close previous list
                      elements.push(
                        <ul key={`list-${lineIndex}`} className="mb-4 list-disc ml-6 space-y-1">
                          {currentList}
                        </ul>
                      );
                      currentList = [];
                    }
                    inList = true;
                    listType = 'numbered';
                    const content = numberedMatch[2];
                    currentList.push(
                      <li key={lineIndex} className="text-muted-foreground">
                        {renderInlineMarkdown(content)}
                      </li>
                    );
                    return;
                  }

                  // Bullet list item (starts with • or -)
                  if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                    if (inList && listType !== 'bullet') {
                      // Close previous list
                      elements.push(
                        <ol key={`list-${lineIndex}`} className="mb-4 list-decimal ml-6 space-y-1">
                          {currentList}
                        </ol>
                      );
                      currentList = [];
                    }
                    inList = true;
                    listType = 'bullet';
                    const content = trimmedLine.substring(1).trim();
                    currentList.push(
                      <li key={lineIndex} className="text-muted-foreground">
                        {renderInlineMarkdown(content)}
                      </li>
                    );
                    return;
                  }

                  // Regular paragraph
                  if (inList && currentList.length > 0) {
                    if (listType === 'numbered') {
                      elements.push(
                        <ol key={`list-${lineIndex}`} className="mb-4 list-decimal ml-6 space-y-1">
                          {currentList}
                        </ol>
                      );
                    } else {
                      elements.push(
                        <ul key={`list-${lineIndex}`} className="mb-4 list-disc ml-6 space-y-1">
                          {currentList}
                        </ul>
                      );
                    }
                    currentList = [];
                    inList = false;
                  }

                  elements.push(
                    <p key={lineIndex} className="mb-4 text-muted-foreground leading-7">
                      {renderInlineMarkdown(trimmedLine)}
                    </p>
                  );
                });

                // Close any remaining list
                if (inList && currentList.length > 0) {
                  // TypeScript incorrectly narrows listType here, so we use a type assertion
                  const currentListType = listType as 'bullet' | 'numbered';
                  if (currentListType === 'numbered') {
                    elements.push(
                      <ol key={`list-end`} className="mb-4 list-decimal ml-6 space-y-1">
                        {currentList}
                      </ol>
                    );
                  } else {
                    elements.push(
                      <ul key={`list-end`} className="mb-4 list-disc ml-6 space-y-1">
                        {currentList}
                      </ul>
                    );
                  }
                }

                return (
                  <div key={index} className="space-y-4">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">{section.title}</h2>
                    <div className="text-muted-foreground leading-7">
                      {elements}
                    </div>

                    {section.codeExample && (
                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Example Code
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
                            <code className="text-slate-900 dark:text-slate-100 font-mono whitespace-pre">{section.codeExample}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-muted-foreground leading-7">
                <p>{post.fullContent}</p>
              </div>
            )}
          </div>
        </article>

        {/* Related Posts Section */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(blogPosts)
              .filter((p: any) => p.id !== post.id && (p.category === post.category || p.tags.some((tag: string) => post.tags.includes(tag))))
              .slice(0, 3)
              .map((relatedPost: any) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedPost.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {relatedPost.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{relatedPost.category}</Badge>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
          {Object.values(blogPosts).filter((p: any) => p.id !== post.id && (p.category === post.category || p.tags.some((tag: string) => post.tags.includes(tag)))).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Explore more UML diagram tutorials:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/blog">
                  <Button variant="outline">View All Blog Posts</Button>
                </Link>
                <Link href="/gallery">
                  <Button variant="outline">Browse Diagram Gallery</Button>
                </Link>
                <Link href="/gallery/class-diagram">
                  <Button variant="outline">Class Diagram Guide</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Explore More Section */}
        <div className="mt-8 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Free UML diagram tool
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Open the editor and create diagrams in the browser
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/gallery">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Diagram Gallery
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Browse our collection of UML diagram examples and templates
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/blog">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    All Tutorials
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Read all our UML diagram tutorials and guides
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Posts
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4 inline mr-1" />
              {post.readTime}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

