import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use | UML Diagram Studio" },
  description:
    "Terms for using the free UML diagram tool at umldiagram.app, including content ownership and acceptable use.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Terms of Use | UML Diagram Studio",
    description:
      "Terms for using the free UML diagram tool at umldiagram.app, including content ownership and acceptable use.",
    url: `${SITE_URL}/terms`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "UML Diagram Studio terms of use" }],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
