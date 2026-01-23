import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://umldiagram.app";

export const metadata: Metadata = {
  title: "UML Diagram Studio - AI Powered UML Diagram Generation Tool",
  description: "Create professional UML diagrams online for free. Our tool supports class, sequence, activity, and use case diagrams. Start creating UML diagrams now!",
  keywords: [
    "uml diagram",
    "uml diagram tool",
    "uml diagram generator",
    "uml diagram online",
    "uml diagram maker",
    "uml diagram creator",
    "free uml diagram tool",
    "create uml diagram",
    "class diagram",
    "sequence diagram",
    "use case diagram",
    "activity diagram",
  ],
  authors: [{ name: "Mubashir" }],
  creator: "UML Diagram Studio",
  publisher: "UML Diagram Studio",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "UML Diagram - Free Online UML Diagram Tool | UML Diagram Studio",
    description: "Create professional UML diagrams online for free. Our UML diagram tool supports class, sequence, activity, and use case diagrams. Start creating UML diagrams now!",
    url: SITE_URL,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML Diagram Studio - Free Online UML Diagram Tool",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UML Diagram - Free Online UML Diagram Tool",
    description: "Create professional UML diagrams online for free. Our UML diagram tool supports class, sequence, activity, and use case diagrams.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@umldiagram",
  },
  icons: {
    icon: [
      { url: "/UML-Diagram.ico", sizes: "any" },
      { url: "/UML-Diagram.ico", type: "image/x-icon" },
    ],
    shortcut: "/UML-Diagram.ico",
    apple: "/UML-Diagram.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/UML-Diagram.ico" sizes="any" />
        <link rel="shortcut icon" href="/UML-Diagram.ico" />
        <link rel="apple-touch-icon" href="/UML-Diagram.ico" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredDataScript(getOrganizationSchema()),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredDataScript(getWebSiteSchema()),
          }}
        />
        <Script
          id="software-application-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredDataScript(getSoftwareApplicationSchema()),
          }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1KVJ6FZ5L5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1KVJ6FZ5L5');
          `}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

