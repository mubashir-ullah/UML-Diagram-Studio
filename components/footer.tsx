'use client';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";
import {
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/seo/config";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 3000);
      } else {
        // Handle error - you might want to show an error message
        console.error('Subscription error:', data.error);
        alert(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const currentYear = new Date().getFullYear();

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    url: SITE_URL,
  };

  return (
    <>
      <Script
        id="footer-navigation-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(navigationSchema),
        }}
      />
      <footer className="w-full border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Main Navigation */}
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog/getting-started-with-uml-diagrams" className="text-muted-foreground hover:text-foreground transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="/blog/mastering-sequence-diagrams" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sequence Diagrams
                  </Link>
                </li>
                <li>
                  <Link href="/blog/best-practices-for-class-diagrams" className="text-muted-foreground hover:text-foreground transition-colors">
                    Best Practices
                  </Link>
                </li>
                <li>
                  <Link href="/gallery/class-diagram" className="text-muted-foreground hover:text-foreground transition-colors">
                    Class Diagram Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Diagram Types */}
            <div>
              <h3 className="font-semibold mb-4">Diagram Types</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/gallery/class-diagram" className="text-muted-foreground hover:text-foreground transition-colors">
                    Class Diagrams
                  </Link>
                </li>
                <li>
                  <Link href="/blog/mastering-sequence-diagrams" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sequence Diagrams
                  </Link>
                </li>
                <li>
                  <Link href="/blog/activity-diagrams-for-workflow-modeling" className="text-muted-foreground hover:text-foreground transition-colors">
                    Activity Diagrams
                  </Link>
                </li>
                <li>
                  <Link href="/blog/state-diagrams-modeling-system-behavior" className="text-muted-foreground hover:text-foreground transition-colors">
                    State Diagrams
                  </Link>
                </li>
              </ul>
            </div>

            {/* Email Subscribe */}
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to get updates on new features, tutorials, and UML diagram tips.
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Check className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      disabled={isLoading || !email}
                      className="shrink-0"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} UML Diagram Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

