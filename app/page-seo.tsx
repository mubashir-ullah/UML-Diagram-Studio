import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Image, Code } from "lucide-react";

export function HomePageSEO() {
  return (
    <div className="w-full bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Create Professional UML Diagrams Online - Free UML Diagram Tool
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Create professional UML diagrams online for free. Our UML diagram tool supports class diagrams, sequence diagrams, activity diagrams, and use case diagrams. Start creating UML diagrams now with our free UML diagram generator!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/studio">
              <Button size="lg" className="w-full sm:w-auto">
                Open the free UML diagram tool
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Diagram Gallery
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn UML Diagrams
                <BookOpen className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* What is UML Diagram Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">What is a UML Diagram?</h2>
          <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-4">
            <p>
              A UML diagram (Unified Modeling Language diagram) is a standardized visual representation used in software engineering to model, design, and document software systems. UML diagrams help developers, architects, and stakeholders visualize the structure and behavior of software applications before implementation.
            </p>
            <p>
              UML diagrams are essential tools for software development because they provide a common language for communicating complex system designs. Whether you're working on a small project or a large enterprise application, UML diagrams help you understand relationships, interactions, and system architecture at a glance.
            </p>
            <p>
              Our free UML diagram tool makes it easy to create professional UML diagrams online without any installation or setup. You can create <Link href="/gallery/class-diagram" className="text-primary hover:underline">class diagrams</Link>, <Link href="/gallery/sequence-diagram" className="text-primary hover:underline">sequence diagrams</Link>, <Link href="/gallery/activity-diagram" className="text-primary hover:underline">activity diagrams</Link>, <Link href="/gallery/use-case-diagram" className="text-primary hover:underline">use case diagrams</Link>, and more using our intuitive interface and AI-powered code generation. Explore our <Link href="/gallery" className="text-primary hover:underline">diagram gallery</Link> to see examples or read our <Link href="/blog" className="text-primary hover:underline">comprehensive tutorials</Link> to learn more.
            </p>
          </div>
        </section>

        {/* Types of UML Diagrams Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Types of UML Diagrams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Class Diagrams
                </CardTitle>
                <CardDescription>
                  Structural diagrams showing classes, attributes, operations, and relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/gallery/class-diagram" className="text-primary hover:underline text-sm">
                  View Class Diagram Examples →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Sequence Diagrams
                </CardTitle>
                <CardDescription>
                  Behavioral diagrams showing interactions between objects over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/gallery/sequence-diagram" className="text-primary hover:underline text-sm">
                  View Sequence Diagram Examples →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Use Case Diagrams
                </CardTitle>
                <CardDescription>
                  Functional diagrams showing system functionality from a user's perspective
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/gallery/use-case-diagram" className="text-primary hover:underline text-sm">
                  View Use Case Diagram Examples →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Activity Diagrams
                </CardTitle>
                <CardDescription>
                  Workflow diagrams modeling business processes and system workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/gallery/activity-diagram" className="text-primary hover:underline text-sm">
                  View Activity Diagram Examples →
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Create UML Diagrams Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">How to Create UML Diagrams</h2>
          <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-4 mb-6">
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
              Our UML diagram generator supports both PlantUML and Mermaid syntax, making it easy to create professional diagrams regardless of your experience level. Whether you're a beginner learning UML diagrams or an experienced developer, our tool provides everything you need to create high-quality UML diagrams. Check out our <Link href="/blog/getting-started-with-uml-diagrams" className="text-primary hover:underline">getting started guide</Link> for beginners or explore <Link href="/blog/best-practices-for-class-diagrams" className="text-primary hover:underline">best practices</Link> for advanced users.
            </p>
          </div>
          <Link href="/blog/getting-started-with-uml-diagrams">
            <Button variant="outline">
              Read Complete Tutorial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </section>

        {/* Why Use Our UML Diagram Tool Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Why Use Our UML Diagram Tool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Free UML Diagram Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our UML diagram tool is completely free to use. No subscriptions, no hidden fees, no credit card required. Create unlimited UML diagrams online without any restrictions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered UML Diagram Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use our AI assistant to generate UML diagram code from natural language descriptions. Simply describe what you want to create, and our AI will generate the code for you.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  See your UML diagrams update instantly as you type. Our real-time preview ensures you always see exactly what your diagram will look like.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Multiple Diagram Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create <Link href="/gallery/class-diagram" className="text-primary hover:underline">class diagrams</Link>, <Link href="/blog/mastering-sequence-diagrams" className="text-primary hover:underline">sequence diagrams</Link>, <Link href="/blog/activity-diagrams-for-workflow-modeling" className="text-primary hover:underline">activity diagrams</Link>, <Link href="/blog/state-diagrams-modeling-system-behavior" className="text-primary hover:underline">state diagrams</Link>, and more. Our UML diagram tool supports all major UML diagram types. <Link href="/gallery" className="text-primary hover:underline">Browse examples</Link> or <Link href="/blog" className="text-primary hover:underline">read tutorials</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Key Features</h2>
          <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-4">
            <p>
              <strong>Real-Time Preview:</strong> See your diagrams update instantly as you type, with support for PlantUML and Mermaid syntax.
            </p>
            <p>
              <strong>AI-Powered Code Generation:</strong> Our intelligent AI assistant can generate UML diagram code from natural language, helping you create diagrams faster than ever before.
            </p>
            <p>
              <strong>Multiple Diagram Types:</strong> Support for class diagrams, sequence diagrams, activity diagrams, state diagrams, use case diagrams, and more.
            </p>
            <p>
              <strong>Template Library:</strong> Access a curated collection of pre-built diagram templates to jumpstart your projects.
            </p>
            <p>
              <strong>Export Options:</strong> Download your diagrams as PNG or SVG files for use in documentation, presentations, and reports.
            </p>
            <p>
              <strong>Modern Interface:</strong> A clean, developer-focused design inspired by tools like VS Code and Linear, ensuring a familiar and productive experience.
            </p>
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Our Mission</h2>
          <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-4">
            <p>
              At UML Diagram Studio, our mission is to democratize software diagramming by providing a free, accessible, and powerful tool that eliminates the barriers to creating professional UML diagrams. We believe that visual documentation is essential for effective software development and communication, and we are committed to making it easier for developers worldwide to create, share, and collaborate on system designs.
            </p>
            <p>
              Learn more on our <Link href="/about" className="text-primary hover:underline">about page</Link>, or reach us through the <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is a UML diagram?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A UML diagram is a standardized visual representation used in software engineering to model, design, and document software systems. UML stands for Unified Modeling Language.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is this UML diagram tool free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, our UML diagram tool is completely free to use. You can create unlimited UML diagrams online without any restrictions or subscriptions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What types of UML diagrams can I create?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You can create <Link href="/gallery/class-diagram" className="text-primary hover:underline">class diagrams</Link>, <Link href="/blog/mastering-sequence-diagrams" className="text-primary hover:underline">sequence diagrams</Link>, <Link href="/blog/activity-diagrams-for-workflow-modeling" className="text-primary hover:underline">activity diagrams</Link>, use case diagrams, <Link href="/blog/state-diagrams-modeling-system-behavior" className="text-primary hover:underline">state diagrams</Link>, component diagrams, and more using our UML diagram generator. Visit our <Link href="/gallery" className="text-primary hover:underline">gallery</Link> to see examples.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need to install anything to use this UML diagram tool?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No installation required! Our UML diagram tool works entirely in your web browser. Just open the website and start creating UML diagrams online.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center bg-muted rounded-lg p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ready to Create Your First UML Diagram?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start using our free UML diagram tool now. No sign-up required, no credit card needed. Create professional UML diagrams in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/studio">
              <Button size="lg">
                Open the free UML diagram tool
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline">
                Browse Examples
                <Image className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline">
                Read Tutorials
                <BookOpen className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

