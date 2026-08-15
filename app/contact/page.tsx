"use client";

import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar
        onTemplateSelect={() => {}}
        onToggleChat={() => {}}
        isChatOpen={false}
        currentCode=""
      />
      <div className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-3xl">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
          Contact UML Diagram Studio
        </h1>
        <p className="text-muted-foreground mb-8">
          UML Diagram Studio is a free browser UML diagram tool with PlantUML, Mermaid, live preview, and AI-assisted generation. Use this page to reach the people who run the site.
        </p>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@umldiagram.app" className="text-primary hover:underline">
                contact@umldiagram.app
              </a>
            </p>
            <p>
              For product questions, diagram tutorials, or feedback on the{" "}
              <Link href="/" className="text-primary hover:underline">
                free UML diagram tool
              </Link>
              , email us and we will reply when we can.
            </p>
            <p>
              Source code and issues:{" "}
              <a
                href="https://github.com/mubashir-ullah/UML-Diagram-Studio"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository
              </a>
              .
            </p>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          See also{" "}
          <Link href="/about" className="text-primary hover:underline">
            About
          </Link>
          ,{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          , and{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Use
          </Link>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
}
