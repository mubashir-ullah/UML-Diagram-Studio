'use client';

import { TopBar } from "@/components/top-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar
        onTemplateSelect={() => {}}
        onToggleChat={() => {}}
        isChatOpen={false}
        currentCode=""
      />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-semibold mb-4">About UML Diagram Studio</h1>
        </div>

        {/* Main Content */}
        <div className="space-y-8 mb-12">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">What is UML Diagram Studio?</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                UML Diagram Studio is a cutting-edge, free online tool designed to help developers, 
                software architects, and technical professionals create professional UML (Unified Modeling Language) 
                diagrams with ease. Our platform combines the power of AI-assisted code generation with real-time 
                diagram preview, making it the go-to solution for anyone looking to visualize software architecture, 
                system designs, and complex workflows.
              </p>
              <p>
                Whether you're working on class diagrams, sequence diagrams, activity diagrams, or state diagrams, 
                UML Diagram Studio provides an intuitive interface that supports both PlantUML and Mermaid syntax. 
                Our AI-powered assistant can help you generate diagram code from natural language descriptions, 
                significantly reducing the time and effort required to create comprehensive UML diagrams.
              </p>
            </div>
          </section>

          {/* Origin Story Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">The Story Behind UML Diagram Studio</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                Like many great ideas, UML Diagram Studio was born out of a real problem that needed solving. 
                It all started during my final year as a computer science student, when I was working on my Final 
                Year Project (FYP) and faced the daunting task of creating comprehensive documentation.
              </p>
              <p>
                As I sat down to document my project, I quickly realized that creating professional diagrams was 
                one of the most challenging parts. I needed use case diagrams to show how users would interact 
                with my system, sequence diagrams to illustrate the flow of operations, ERD diagrams to represent 
                my database structure, and various other UML diagrams to communicate my design effectively. 
                Each diagram required learning complex syntax, understanding the right tools, and spending hours 
                getting the formatting just right.
              </p>
              <p>
                The frustration was real. I found myself spending more time trying to figure out how to create 
                the diagrams than actually working on my project. The available tools were either too complex, 
                required expensive licenses, or didn't provide the flexibility I needed. I thought to myself: 
                "There has to be a better way."
              </p>
              <p>
                That's when the idea struck me. What if there was a tool that could help students like me generate 
                these diagrams easily? What if an AI assistant could understand what I wanted to create and help 
                me build it step by step? What if I could describe my system in plain English and get a professional 
                diagram in return?
              </p>
              <p>
                This vision became the foundation of UML Diagram Studio. I wanted to create a platform that would 
                eliminate the barriers between students and professional diagramming. A tool that would understand 
                the struggles of documentation and provide an intuitive, AI-powered solution that makes creating 
                UML diagrams as simple as describing what you need.
              </p>
              <p>
                Today, UML Diagram Studio stands as a testament to that initial frustration and the determination 
                to solve it. It's built for students who are documenting their projects, developers who need to 
                visualize their architecture, and anyone who believes that creating professional diagrams shouldn't 
                be a barrier to great documentation.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Key Features and Capabilities</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                UML Diagram Studio offers a comprehensive set of features that make diagram creation both efficient 
                and enjoyable:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
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
            </div>
          </section>

          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                At UML Diagram Studio, our mission is to democratize software diagramming by providing a free, 
                accessible, and powerful tool that eliminates the barriers to creating professional UML diagrams. 
                We believe that visual documentation is essential for effective software development and communication, 
                and we're committed to making it easier for developers worldwide to create, share, and collaborate 
                on system designs.
              </p>
              <p>
                We're constantly working to improve our platform, adding new features, supporting additional 
                diagram types, and enhancing the AI capabilities to make UML diagramming more accessible to everyone, 
                from students learning software engineering to experienced architects designing complex systems.
              </p>
            </div>
          </section>

          {/* Use Cases Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Who Can Benefit from UML Diagram Studio?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                UML Diagram Studio is designed for a wide range of users across the software development ecosystem:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Software Developers:</strong> Create class diagrams to 
                  visualize application architecture and relationships between components.
                </li>
                <li>
                  <strong className="text-foreground">System Architects:</strong> Design and document complex 
                  system interactions using sequence diagrams and activity diagrams.
                </li>
                <li>
                  <strong className="text-foreground">Project Managers:</strong> Use workflow diagrams to 
                  communicate processes and project requirements to stakeholders.
                </li>
                <li>
                  <strong className="text-foreground">Students and Educators:</strong> Learn UML diagramming 
                  concepts with an intuitive tool that provides instant visual feedback.
                </li>
                <li>
                  <strong className="text-foreground">Technical Writers:</strong> Generate professional diagrams 
                  for documentation, tutorials, and technical guides.
                </li>
                <li>
                  <strong className="text-foreground">Business Analysts:</strong> Model business processes and 
                  system requirements using various UML diagram types.
                </li>
              </ul>
            </div>
          </section>

          {/* Technology Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Built with Modern Technology</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                UML Diagram Studio is built using cutting-edge web technologies to ensure a fast, responsive, 
                and reliable experience. Our platform leverages React, Next.js, and TypeScript for a robust 
                frontend, while our AI capabilities are powered by advanced language models that understand 
                both natural language and UML syntax.
              </p>
              <p>
                We're committed to maintaining high standards for performance, accessibility, and user experience, 
                ensuring that UML Diagram Studio remains a trusted tool for the developer community.
              </p>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              We'd love to hear from you! Share your feedback, suggestions, or questions to help us improve UML Diagram Studio.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <a 
                  href="mailto:contact@umldiagramstudio.com" 
                  className="text-primary hover:underline"
                >
                  contact@umldiagramstudio.com
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
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
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.42-7.814.42-7.814.42s-6.255 0-7.814-.42a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.42-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About the Developer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <Avatar className="w-28 h-28 border-2 border-border shadow-lg">
                  <AvatarImage 
                    src="/Mubashir.png" 
                    alt="Mubashir" 
                    className="object-cover object-center"
                    loading="eager"
                  />
                  <AvatarFallback className="text-xl font-semibold bg-muted">M</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Mubashir</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  UML Diagram Studio was created by Mubashir, a passionate developer dedicated to improving 
                  the software development workflow. With expertise in web development, AI/ML, and software 
                  architecture, this tool was built to serve the developer community.
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  I believe in open-source principles, continuous improvement, and listening to users. 
                  Your feedback drives my development priorities, and I'm always working to make UML Diagram 
                  Studio better. If you have suggestions, feature requests, or want to contribute to the project, 
                  I'd love to hear from you!
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-sm font-medium text-foreground">Connect with me:</span>
                  <a
                    href="https://github.com/mubashir-ullah"
                    target="_blank"
                    rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  aria-label="GitHub Profile"
                >
                  <svg
                    className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
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
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mubashir-ullah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                    aria-label="LinkedIn Profile"
                  >
                    <svg
                      className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Copyright Footer */}
        <div className="border-t pt-6 mt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} UML Diagram Studio. All rights reserved.
          </p>
          <p className="mt-2">
            This tool is provided free of charge for educational and commercial use. 
            UML Diagram Studio is not affiliated with the Object Management Group (OMG) or any UML specification body.
          </p>
        </div>
      </div>
    </div>
  );
}

