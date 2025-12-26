import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import Script from "next/script";
import "./globals.css";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";

const SITE_URL = "https://umldiagram.app";

export const metadata: Metadata = {
  title: "UML Diagram - Free Online UML Diagram Tool | UML Diagram Studio",
  description: "Create professional UML diagrams online for free. Our UML diagram tool supports class, sequence, activity, and use case diagrams. Start creating UML diagrams now!",
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
        url: `${SITE_URL}/UML-Diagram.ico`,
        width: 512,
        height: 512,
        alt: "UML Diagram Studio Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UML Diagram - Free Online UML Diagram Tool",
    description: "Create professional UML diagrams online for free. Our UML diagram tool supports class, sequence, activity, and use case diagrams.",
    images: [`${SITE_URL}/UML-Diagram.ico`],
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
    google: "google0ac18b43adf39eec",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/UML-Diagram.ico" sizes="any" />
        <link rel="shortcut icon" href="/UML-Diagram.ico" />
        <link rel="apple-touch-icon" href="/UML-Diagram.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fira+Code:wght@300..700&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400..700;1,400&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Oxanium:wght@200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;0,700&display=swap"
          rel="stylesheet"
        />
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
      </head>
      <body suppressHydrationWarning>
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

