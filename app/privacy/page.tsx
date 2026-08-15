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

export default function PrivacyPage() {
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
              <BreadcrumbPage>Privacy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-foreground">Privacy Policy</h1>
        <p>Last updated: August 14, 2026</p>
        <p>
          UML Diagram Studio (umldiagram.app) is a free online UML diagram tool. This page explains what we collect and how we use it.
        </p>
        <h2 className="text-foreground">Diagrams you create</h2>
        <p>
          Diagram code you type in the editor is stored in your browser (localStorage) so your work can persist on that device. We do not require an account to use the tool.
        </p>
        <h2 className="text-foreground">AI assistant</h2>
        <p>
          If you use the AI chat, your prompts are sent to our API so a language model can generate PlantUML or related help. Do not paste secrets, passwords, or personal data into the assistant.
        </p>
        <h2 className="text-foreground">Email newsletter</h2>
        <p>
          If you subscribe in the footer, we store the email address you submit so we can send product and tutorial updates. You can unsubscribe using the link in those emails or by writing to{" "}
          <a href="mailto:contact@umldiagram.app">contact@umldiagram.app</a>.
        </p>
        <h2 className="text-foreground">Analytics and ads</h2>
        <p>
          The site may load Google Analytics and Google AdSense. Those services can set cookies and collect usage data according to Google&apos;s policies.
        </p>
        <h2 className="text-foreground">Contact</h2>
        <p>
          Questions: <Link href="/contact">contact page</Link> or contact@umldiagram.app.
        </p>
      </main>
      <Footer />
    </div>
  );
}
