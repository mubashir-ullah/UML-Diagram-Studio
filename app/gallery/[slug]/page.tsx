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
import { useRouter, useParams } from "next/navigation";

interface DiagramDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  keywords: string[];
  useCases: string[];
  industries: string[];
  category: string;
  components: {
    name: string;
    description: string;
  }[];
  whereUsed: string[];
  howToCreate: {
    step: number;
    title: string;
    description: string;
    code?: string;
  }[];
  exampleCode: string;
  bestPractices: string[];
  relatedDiagrams: string[];
}

const diagramDetails: Record<string, DiagramDetail> = {
  "class-diagram": {
    id: "1",
    slug: "class-diagram",
    name: "Class Diagram",
    description: "A structural diagram that shows the classes, attributes, operations, and relationships in a system.",
    fullDescription: "Class diagrams are one of the most fundamental UML diagrams used in object-oriented design. They provide a static view of a system by showing classes, their attributes (properties), methods (operations), and the relationships between classes. Class diagrams are essential for understanding the structure of a software system and are widely used in software engineering, system design, and documentation.",
    image: "/class-diagram.png",
    keywords: ["Classes", "Objects", "Relationships", "Inheritance", "Encapsulation", "Abstraction", "Polymorphism", "Association"],
    useCases: [
      "System Design and Architecture",
      "Object-Oriented Design",
      "Database Schema Design",
      "API Documentation",
      "Code Generation",
      "System Documentation",
      "Reverse Engineering"
    ],
    industries: [
      "Software Development",
      "Enterprise Applications",
      "Web Development",
      "Mobile Application Development",
      "Game Development",
      "Financial Systems",
      "Healthcare Systems",
      "E-commerce Platforms"
    ],
    category: "Structural",
    components: [
      {
        name: "Class",
        description: "A blueprint for creating objects. Represented as a rectangle with three compartments: class name, attributes, and methods."
      },
      {
        name: "Attributes",
        description: "Properties or data members of a class. Can be public (+), private (-), or protected (#)."
      },
      {
        name: "Methods/Operations",
        description: "Functions or behaviors of a class. Represent what the class can do."
      },
      {
        name: "Relationships",
        description: "Connections between classes including Association, Inheritance, Aggregation, Composition, and Dependency."
      },
      {
        name: "Multiplicity",
        description: "Indicates how many instances of one class relate to instances of another class (e.g., 1, *, 0..1, 1..*)."
      }
    ],
    whereUsed: [
      "Software Requirements Analysis - Understanding system structure before implementation",
      "System Design Phase - Planning the architecture and class structure",
      "Code Documentation - Visual representation of code structure for developers",
      "Database Design - Mapping object models to database schemas",
      "API Design - Documenting request/response structures and data models",
      "Educational Purposes - Teaching object-oriented programming concepts",
      "System Maintenance - Understanding existing codebases and refactoring",
      "Team Communication - Sharing design ideas and system architecture"
    ],
    howToCreate: [
      {
        step: 1,
        title: "Open UML Diagram Studio",
        description: "Navigate to the Studio page and open the code editor. You can start with a blank canvas or use a template.",
        code: undefined
      },
      {
        step: 2,
        title: "Start with @startuml",
        description: "Begin your PlantUML code with @startuml and set the theme. Add a title for your diagram.",
        code: `@startuml
!theme plain
skinparam backgroundColor transparent

title Class Diagram Example`
      },
      {
        step: 3,
        title: "Define Classes",
        description: "Create classes using the 'class' keyword. Add attributes and methods inside curly braces.",
        code: `class User {
  -id: string
  -username: string
  -email: string
  +login()
  +logout()
  +getProfile()
}`
      },
      {
        step: 4,
        title: "Add Relationships",
        description: "Define relationships between classes using arrows and relationship types (--, <|--, *--, etc.).",
        code: `class User {
  -id: string
  -username: string
}

class Post {
  -id: string
  -title: string
  -content: string
}

User "1" -- "*" Post : creates
User <|-- Admin : extends`
      },
      {
        step: 5,
        title: "Add Multiplicity and Labels",
        description: "Specify how many instances relate to each other and add descriptive labels to relationships.",
        code: `User "1" -- "*" Post : creates
User "*" -- "1" Category : belongs to`
      },
      {
        step: 6,
        title: "Preview and Refine",
        description: "Use the real-time preview to see your diagram. Refine the layout, add more classes, or adjust relationships as needed.",
        code: undefined
      },
      {
        step: 7,
        title: "Export Your Diagram",
        description: "Once satisfied, export your diagram as PNG or SVG for use in documentation, presentations, or reports.",
        code: undefined
      }
    ],
    exampleCode: `@startuml
!theme plain
skinparam backgroundColor transparent

title E-Commerce System Class Diagram

class User {
  -id: string
  -username: string
  -email: string
  -password: string
  +login()
  +logout()
  +register()
  +updateProfile()
}

class Product {
  -id: string
  -name: string
  -price: number
  -description: string
  -stock: number
  +getDetails()
  +updateStock()
}

class Order {
  -id: string
  -orderDate: date
  -totalAmount: number
  -status: string
  +calculateTotal()
  +updateStatus()
}

class OrderItem {
  -quantity: number
  -price: number
  +calculateSubtotal()
}

class Category {
  -id: string
  -name: string
  -description: string
}

' Relationships
User "1" -- "*" Order : places
Order "1" -- "*" OrderItem : contains
OrderItem "*" -- "1" Product : references
Product "*" -- "1" Category : belongs to

@enduml`,
    bestPractices: [
      "Keep classes focused on a single responsibility (Single Responsibility Principle)",
      "Use meaningful names for classes, attributes, and methods",
      "Show only essential attributes and methods to avoid clutter",
      "Use appropriate relationship types (inheritance, composition, aggregation)",
      "Include multiplicity indicators for clarity",
      "Group related classes together visually",
      "Use packages or namespaces for large systems",
      "Document complex relationships with notes",
      "Keep the diagram at an appropriate level of abstraction",
      "Update the diagram as the system evolves"
    ],
    relatedDiagrams: [
      "Object Diagram - Shows instances of classes at a specific point in time",
      "Package Diagram - Organizes classes into logical groups",
      "Component Diagram - Shows physical components and their relationships",
      "Sequence Diagram - Shows interactions between objects over time"
    ]
  }
};

const STORAGE_KEY = 'plantuml-code';

export default function DiagramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  // Safely extract slug from params
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : null;
  const diagram = slug ? diagramDetails[slug] : undefined;

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
          <Link href="/gallery">
            <Button variant="ghost" size="sm" className="mb-4 sm:mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
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
                {diagram.keywords.map((keyword, idx) => (
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
                {diagram.components.map((component, idx) => (
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
                {diagram.whereUsed.map((use, idx) => (
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
                    {diagram.useCases.map((useCase, idx) => (
                      <Badge key={idx} variant="secondary">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base mb-2">Industries:</h4>
                  <div className="flex flex-wrap gap-2">
                    {diagram.industries.map((industry, idx) => (
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
                {diagram.howToCreate.map((step) => (
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
                  Open in Studio
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
                {diagram.bestPractices.map((practice, idx) => (
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

          {/* Related Diagrams Section */}
          {diagram.relatedDiagrams.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Diagrams</CardTitle>
                <CardDescription>Other diagram types you might find useful</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {diagram.relatedDiagrams.map((related, idx) => (
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

