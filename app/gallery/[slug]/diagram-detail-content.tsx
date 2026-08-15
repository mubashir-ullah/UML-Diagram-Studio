'use client';

import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, BookOpen, Building2, Target, ExternalLink, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { galleryItemsData } from "@/lib/data/gallery-items-data";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const STORAGE_KEY = 'plantuml-code';

export function DiagramDetailContent({ slug }: { slug: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const diagram = (galleryItemsData as Record<string, any>)[slug];

  const handleOpenInStudio = () => {
    if (typeof window !== 'undefined' && diagram) {
      localStorage.setItem(STORAGE_KEY, diagram.exampleCode);
      router.push('/');
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  if (!diagram) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-background">
        <TopBar
          onTemplateSelect={() => {}}
          onToggleChat={() => {}}
          isChatOpen={false}
          currentCode=""
        />
        <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-2xl font-semibold mb-4">Diagram Not Found</h1>
          <Link href="/gallery">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar
        onTemplateSelect={() => {}}
        onToggleChat={() => {}}
        isChatOpen={false}
        currentCode=""
      />
      
      <div className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <Breadcrumb className="mb-4 sm:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/gallery">Gallery</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{diagram.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">UML {diagram.name}</h1>
                <Badge variant="secondary">{diagram.category}</Badge>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">{diagram.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Diagram Image Section */}
          {diagram.slug === "class-diagram" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Example Diagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-auto min-h-[300px] bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={diagram.image}
                    alt={`UML ${diagram.name} example diagram showing ${diagram.description.toLowerCase()}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Overview Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {diagram.fullDescription}
              </p>
            </CardContent>
          </Card>

          {/* Keywords Section */}
          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {diagram.keywords.map((keyword: string, idx: number) => (
                  <Badge key={idx} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Components Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Components
              </CardTitle>
              <CardDescription>Key elements that make up this diagram type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diagram.components.map((component: any, idx: number) => (
                  <div key={idx} className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-semibold text-sm sm:text-base mb-1">{component.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{component.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Where Used Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Where It's Used
              </CardTitle>
              <CardDescription>Common applications and scenarios for this diagram</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {diagram.whereUsed.map((use: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Use Cases Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Use Cases & Industries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base mb-2">Use Cases:</h4>
                  <div className="flex flex-wrap gap-2">
                    {diagram.useCases.map((useCase: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base mb-2">Industries:</h4>
                  <div className="flex flex-wrap gap-2">
                    {diagram.industries.map((industry: string, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Create Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                How to Create with UML Diagram Studio
              </CardTitle>
              <CardDescription>Step-by-step guide to create this diagram in our studio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {diagram.howToCreate.map((step: any) => (
                  <div key={step.step} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm sm:text-base mb-1">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{step.description}</p>
                        {step.code && (
                          <div className="mt-3 bg-muted rounded-lg p-3 overflow-x-auto relative group">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleCopyCode(step.code || '')}
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <pre className="text-xs sm:text-sm font-mono">
                              <code>{step.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Example Code Section */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Example Code</CardTitle>
              <CardDescription>Full PlantUML code example you can use in the studio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 overflow-x-auto relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopyCode(diagram.exampleCode)}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap">
                  <code>{diagram.exampleCode}</code>
                </pre>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleOpenInStudio} className="flex-1 sm:flex-initial">
                  Open in the free UML diagram tool
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCopyCode(diagram.exampleCode)}
                  className="flex-1 sm:flex-initial"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices Section */}
          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {diagram.bestPractices.map((practice: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                    <span className="text-primary mt-1.5">✓</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Related Blog Posts Section */}
          <Card>
            <CardHeader>
              <CardTitle>Related Tutorials</CardTitle>
              <CardDescription>Learn more about {diagram.name.toLowerCase()}s with our guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {diagram.slug === "class-diagram" && (
                  <>
                    <Link href="/blog/best-practices-for-class-diagrams" className="block">
                      <div className="p-3 border rounded-lg hover:bg-accent transition-colors">
                        <h4 className="font-semibold text-sm mb-1">Best Practices for Class Diagrams</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Master UML class diagram best practices, notation, and symbols.
                        </p>
                      </div>
                    </Link>
                    <Link href="/blog/getting-started-with-uml-diagrams" className="block">
                      <div className="p-3 border rounded-lg hover:bg-accent transition-colors">
                        <h4 className="font-semibold text-sm mb-1">Getting Started with UML Diagrams</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Learn the fundamentals of UML diagramming and create your first class diagram.
                        </p>
                      </div>
                    </Link>
                    <Link href="/blog/ai-powered-diagram-generation" className="block">
                      <div className="p-3 border rounded-lg hover:bg-accent transition-colors">
                        <h4 className="font-semibold text-sm mb-1">AI-Powered Diagram Generation</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Discover how AI can help you create UML diagrams faster.
                        </p>
                      </div>
                    </Link>
                  </>
                )}
                <Link href="/blog" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Tutorials
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Explore More Section */}
          <Card>
            <CardHeader>
              <CardTitle>Explore More</CardTitle>
              <CardDescription>Discover other diagram types and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/blog/mastering-sequence-diagrams" className="block">
                  <div className="p-3 border rounded-lg hover:bg-accent transition-colors">
                    <h4 className="font-semibold text-sm mb-1">Sequence Diagrams</h4>
                    <p className="text-xs text-muted-foreground">Learn about sequence diagrams</p>
                  </div>
                </Link>
                <Link href="/blog/activity-diagrams-for-workflow-modeling" className="block">
                  <div className="p-3 border rounded-lg hover:bg-accent transition-colors">
                    <h4 className="font-semibold text-sm mb-1">Activity Diagrams</h4>
                    <p className="text-xs text-muted-foreground">Model workflows effectively</p>
                  </div>
                </Link>
                <Link href="/blog/state-diagrams-modeling-system-behavior" className="block">
                  <div className="p-3 border rounded-lg hover:bg-accent transition-colors">
                    <h4 className="font-semibold text-sm mb-1">State Diagrams</h4>
                    <p className="text-xs text-muted-foreground">Model system behavior</p>
                  </div>
                </Link>
                <Link href="/gallery" className="block">
                  <div className="p-3 border rounded-lg hover:bg-accent transition-colors">
                    <h4 className="font-semibold text-sm mb-1">All Diagrams</h4>
                    <p className="text-xs text-muted-foreground">Browse all diagram types</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Related Diagrams Section */}
          {diagram.relatedDiagrams.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Diagrams</CardTitle>
                <CardDescription>Other diagram types you might find useful</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {diagram.relatedDiagrams.map((related: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs sm:text-sm">
                      {related}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

