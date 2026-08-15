import type { Metadata } from "next";
import { PageEditor } from "@/app/page-editor";
import { SITE_URL } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: { absolute: "UML Diagram Editor | UML Diagram Studio" },
  description:
    "Open the UML diagram editor. Write PlantUML, preview live, and export PNG or SVG. No install.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/studio`,
  },
  openGraph: {
    title: "UML Diagram Editor | UML Diagram Studio",
    description:
      "Open the UML diagram editor. Write PlantUML, preview live, and export PNG or SVG. No install.",
    url: `${SITE_URL}/studio`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML diagram editor with live PlantUML preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UML Diagram Editor | UML Diagram Studio",
    description:
      "Open the UML diagram editor. Write PlantUML, preview live, and export PNG or SVG. No install.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function StudioPage() {
  return <PageEditor />;
}
