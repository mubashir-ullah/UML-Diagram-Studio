'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Bot, FileCode, Github, Layout, Menu, HelpCircle, ArrowRight, BookOpen, Image as ImageIcon, Code } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import type { Template } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TopBarProps {
  onTemplateSelect: (code: string) => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  currentCode: string;
}

export function TopBar({
  onTemplateSelect,
  onToggleChat,
  isChatOpen,
  currentCode,
}: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const templatesByCategory = templates.reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <header className="flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3 border-b bg-card">
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/UML-Diagram.ico"
            alt="UML Diagram Studio Logo"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5"
            data-testid="icon-logo"
          />
          <h1 className="text-sm sm:text-base font-semibold" data-testid="text-app-title">
            <span className="hidden sm:inline">UML Diagram Studio</span>
            <span className="sm:hidden">UML Studio</span>
          </h1>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" data-testid="button-templates" className="px-2 sm:px-3">
              <FileCode className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
              <div key={category}>
                <DropdownMenuLabel className="capitalize">
                  {category} Diagrams
                </DropdownMenuLabel>
                {categoryTemplates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onClick={() => onTemplateSelect(template.code)}
                    data-testid={`template-${template.id}`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-sm">{template.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={() => setIsHelpOpen(true)}
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl font-bold">
                Create Professional UML Diagrams Online - Free UML Diagram Tool
              </DialogTitle>
              <DialogDescription className="text-base">
                Create professional UML diagrams online for free. Our UML diagram tool supports class diagrams, sequence diagrams, activity diagrams, and use case diagrams. Start creating UML diagrams now with our free UML diagram generator!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-8 mt-6">
              {/* Hero CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/gallery" onClick={() => setIsHelpOpen(false)}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Diagram Gallery
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/blog" onClick={() => setIsHelpOpen(false)}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn UML Diagrams
                    <BookOpen className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* What is UML Diagram Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">What is a UML Diagram?</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    A UML diagram (Unified Modeling Language diagram) is a standardized visual representation used in software engineering to model, design, and document software systems. UML diagrams help developers, architects, and stakeholders visualize the structure and behavior of software applications before implementation.
                  </p>
                  <p>
                    UML diagrams are essential tools for software development because they provide a common language for communicating complex system designs. Whether you're working on a small project or a large enterprise application, UML diagrams help you understand relationships, interactions, and system architecture at a glance.
                  </p>
                  <p>
                    Our free UML diagram tool makes it easy to create professional UML diagrams online without any installation or setup. You can create class diagrams, sequence diagrams, activity diagrams, use case diagrams, and more using our intuitive interface and AI-powered code generation.
                  </p>
                </div>
              </section>

              {/* Types of UML Diagrams Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Types of UML Diagrams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Class Diagrams
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Structural diagrams showing classes, attributes, operations, and relationships
                    </p>
                    <Link href="/gallery/class-diagram" onClick={() => setIsHelpOpen(false)} className="text-primary hover:underline text-sm">
                      View Class Diagram Examples →
                    </Link>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Sequence Diagrams
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Behavioral diagrams showing interactions between objects over time
                    </p>
                    <Link href="/blog/mastering-sequence-diagrams" onClick={() => setIsHelpOpen(false)} className="text-primary hover:underline text-sm">
                      Learn Sequence Diagrams →
                    </Link>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Activity Diagrams
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Workflow diagrams modeling business processes and system workflows
                    </p>
                    <Link href="/blog/activity-diagrams-for-workflow-modeling" onClick={() => setIsHelpOpen(false)} className="text-primary hover:underline text-sm">
                      Learn Activity Diagrams →
                    </Link>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Use Case Diagrams
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Functional diagrams showing system functionality from a user's perspective
                    </p>
                    <p className="text-sm text-muted-foreground">Coming soon</p>
                  </div>
                </div>
              </section>

              {/* How to Create UML Diagrams Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">How to Create UML Diagrams</h2>
                <div className="space-y-3 text-muted-foreground mb-4">
                  <p>
                    Creating UML diagrams with our free UML diagram tool is simple and straightforward. Follow these steps to create your first UML diagram:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Open our UML diagram tool in your web browser - no installation required</li>
                    <li>Choose a diagram type or start with a template from our gallery</li>
                    <li>Use our AI-powered assistant to generate diagram code from natural language descriptions</li>
                    <li>Edit and customize your diagram using PlantUML syntax</li>
                    <li>Preview your diagram in real-time as you type</li>
                    <li>Export your diagram as PNG or SVG for use in documentation</li>
                  </ol>
                  <p>
                    Our UML diagram generator supports both PlantUML and Mermaid syntax, making it easy to create professional diagrams regardless of your experience level. Whether you're a beginner learning UML diagrams or an experienced developer, our tool provides everything you need to create high-quality UML diagrams.
                  </p>
                </div>
                <Link href="/blog/getting-started-with-uml-diagrams" onClick={() => setIsHelpOpen(false)}>
                  <Button variant="outline" size="sm">
                    Read Complete Tutorial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </section>

              {/* Why Use Our UML Diagram Tool Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Why Use Our UML Diagram Tool?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Free UML Diagram Tool</h3>
                    <p className="text-sm text-muted-foreground">
                      Our UML diagram tool is completely free to use. No subscriptions, no hidden fees, no credit card required. Create unlimited UML diagrams online without any restrictions.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">AI-Powered UML Diagram Generator</h3>
                    <p className="text-sm text-muted-foreground">
                      Use our AI assistant to generate UML diagram code from natural language descriptions. Simply describe what you want to create, and our AI will generate the code for you.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Real-Time Preview</h3>
                    <p className="text-sm text-muted-foreground">
                      See your UML diagrams update instantly as you type. Our real-time preview ensures you always see exactly what your diagram will look like.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Multiple Diagram Types</h3>
                    <p className="text-sm text-muted-foreground">
                      Create class diagrams, sequence diagrams, activity diagrams, use case diagrams, state diagrams, and more. Our UML diagram tool supports all major UML diagram types.
                    </p>
                  </div>
                </div>
              </section>

              {/* Key Features */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 ml-2 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Real-Time Preview:</strong> See your diagrams update
                    instantly as you type, with support for PlantUML and Mermaid syntax.
                  </li>
                  <li>
                    <strong className="text-foreground">AI-Powered Code Generation:</strong> Our intelligent
                    AI assistant can generate UML diagram code from natural language, helping you create diagrams
                    faster than ever before.
                  </li>
                  <li>
                    <strong className="text-foreground">Multiple Diagram Types:</strong> Support for class diagrams,
                    sequence diagrams, activity diagrams, state diagrams, use case diagrams, and more.
                  </li>
                  <li>
                    <strong className="text-foreground">Template Library:</strong> Access a curated collection of
                    pre-built diagram templates to jumpstart your projects.
                  </li>
                  <li>
                    <strong className="text-foreground">Export Options:</strong> Download your diagrams as PNG or
                    SVG files for use in documentation, presentations, and reports.
                  </li>
                  <li>
                    <strong className="text-foreground">Modern Interface:</strong> A clean, developer-focused design
                    inspired by tools like VS Code and Linear, ensuring a familiar and productive experience.
                  </li>
                </ul>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-base">What is a UML diagram?</h3>
                    <p className="text-sm text-muted-foreground">
                      A UML diagram is a standardized visual representation used in software engineering to model, design, and document software systems. UML stands for Unified Modeling Language.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-base">Is this UML diagram tool free?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes, our UML diagram tool is completely free to use. You can create unlimited UML diagrams online without any restrictions or subscriptions.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-base">What types of UML diagrams can I create?</h3>
                    <p className="text-sm text-muted-foreground">
                      You can create class diagrams, sequence diagrams, activity diagrams, use case diagrams, state diagrams, component diagrams, and more using our UML diagram generator.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-base">Do I need to install anything to use this UML diagram tool?</h3>
                    <p className="text-sm text-muted-foreground">
                      No installation required! Our UML diagram tool works entirely in your web browser. Just open the website and start creating UML diagrams online.
                    </p>
                  </div>
                </div>
              </section>

              {/* Our Mission */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  At UML Diagram Studio, our mission is to democratize software diagramming by providing a free,
                  accessible, and powerful tool that eliminates the barriers to creating professional UML diagrams.
                  We believe that visual documentation is essential for effective software development and communication,
                  and we're committed to making it easier for developers worldwide to create, share, and collaborate
                  on system designs.
                </p>
              </section>

              {/* CTA Section */}
              <div className="bg-muted rounded-lg p-6 text-center">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">Ready to Create Your First UML Diagram?</h2>
                <p className="text-muted-foreground mb-4">
                  Start using our free UML diagram tool now. No sign-up required, no credit card needed. Create professional UML diagrams in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/gallery" onClick={() => setIsHelpOpen(false)}>
                    <Button size="lg">
                      Browse Examples
                      <ImageIcon className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/blog" onClick={() => setIsHelpOpen(false)}>
                    <Button size="lg" variant="outline">
                      Read Tutorials
                      <BookOpen className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            data-testid="button-studio"
          >
            <Layout className="w-4 h-4 mr-1.5 sm:mr-2" />
            Studio
          </Button>
        </Link>
        <Link href="/gallery">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            data-testid="button-gallery"
          >
            Gallery
          </Button>
        </Link>
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            data-testid="button-blogs"
          >
            Blogs
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            data-testid="button-about"
          >
            About
          </Button>
        </Link>
        <a
          href="https://github.com/mubashir-ullah/UML-Diagram-Studio"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-github"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            aria-label="GitHub Repository"
          >
            <svg
              className="!w-4 !h-4 sm:!w-5 sm:!h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </a>
      </div>

      {/* Mobile Navigation Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 md:hidden" aria-label="Menu">
            <Menu className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              Studio
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/gallery" className="flex items-center">
              Gallery
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blog" className="flex items-center">
              Blogs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/about" className="flex items-center">
              About
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href="https://github.com/mubashir-ullah/UML-Diagram-Studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant={isChatOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleChat}
          data-testid="button-toggle-chat"
          className={cn(
            "relative overflow-hidden group px-2 sm:px-3",
            !isChatOpen && "bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/30",
            !isChatOpen && "transition-colors duration-300",
            !isChatOpen && "hover:from-primary/25 hover:via-primary/15 hover:to-primary/25 hover:border-primary/60",
            !isChatOpen && "shadow-sm hover:shadow-md hover:shadow-primary/20",
            !isChatOpen && "animate-pulse-subtle"
          )}
        >
          {!isChatOpen && (
            <>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            </>
          )}
          <Bot className={`w-4 h-4 sm:mr-2 relative z-10 ${!isChatOpen && mounted ? 'animate-bounce-subtle' : ''}`} />
          <span className="hidden sm:inline relative z-10 font-medium text-xs sm:text-sm">AI Assistant</span>
          {!isChatOpen && mounted && (
            <span className="absolute top-0.5 right-0.5 flex h-2.5 w-2.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border border-background"></span>
            </span>
          )}
        </Button>

        {mounted ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="h-7 w-7 sm:h-8 sm:w-8"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            data-testid="button-theme-toggle"
            className="h-7 w-7 sm:h-8 sm:w-8"
            aria-label="Toggle Theme"
          >
            <Moon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
