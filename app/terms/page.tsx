"use client";

import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar
        onTemplateSelect={() => {}}
        onToggleChat={() => {}}
        isChatOpen={false}
        currentCode=""
      />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-3xl prose prose-sm max-w-none text-muted-foreground">
        <Breadcrumb className="mb-6 not-prose">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Terms</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-foreground">Terms of Use</h1>
        <p>Last updated: August 14, 2026</p>
        <p>
          By using umldiagram.app (UML Diagram Studio), you agree to these terms. The site provides a free UML diagram tool in the browser, plus tutorials and examples.
        </p>
        <h2 className="text-foreground">The service</h2>
        <p>
          The editor, gallery, and blog are provided as-is, without a paid subscription. Features, uptime, and AI output can change or be unavailable.
        </p>
        <h2 className="text-foreground">Your diagrams</h2>
        <p>
          You keep rights to diagrams you create. You are responsible for the content you generate, including that it does not infringe others&apos; rights.
        </p>
        <h2 className="text-foreground">Acceptable use</h2>
        <p>
          Do not abuse the AI API, attempt to disrupt the site, or use the tool for unlawful activity. We may rate-limit or block abuse.
        </p>
        <h2 className="text-foreground">Liability</h2>
        <p>
          Diagrams and AI-generated code are aids for design and documentation. Review them before using them in production systems. We are not liable for damages arising from use of the site.
        </p>
        <h2 className="text-foreground">Contact</h2>
        <p>
          Questions: <Link href="/contact">contact</Link> or see our <Link href="/privacy">privacy policy</Link>.
        </p>
      </main>
      <Footer />
    </div>
  );
}
