import type { Metadata } from "next";
import Script from "next/script";
import {
  getArticleSchema,
  getBreadcrumbListSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/seo/config";
import { getBlogPostBySlug } from "@/lib/seo/slugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | UML Diagram Studio",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title: { absolute: `${post.title} | UML Diagram Studio` },
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "UML Diagram Studio",
      type: "article",
      publishedTime,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE_URL}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <>{children}</>;
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url },
  ];

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getArticleSchema(
              post.title,
              post.description,
              url,
              publishedTime,
              publishedTime,
              post.author,
              `${SITE_URL}/og-image.png`
            )
          ),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getBreadcrumbListSchema(breadcrumbs)
          ),
        }}
      />
      {children}
    </>
  );
}
