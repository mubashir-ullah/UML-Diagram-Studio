/**
 * Single source of truth for blog and gallery slugs.
 * Used by sitemap, generateMetadata, and server-side slug validation.
 */
import { blogPostsData } from "@/lib/data/blog-posts-data";
import { galleryItemsData } from "@/lib/data/gallery-items-data";

export interface BlogSlugEntry {
  slug: string;
  date: string;
}

/** All blog posts for sitemap - derived from blog-posts-data */
export function getBlogSlugsForSitemap(): BlogSlugEntry[] {
  return Object.values(blogPostsData)
    .filter((post): post is { slug: string; date: string } => !!post?.slug && !!post?.date)
    .map((post) => ({ slug: post.slug, date: post.date }));
}

/** All gallery slugs for sitemap - derived from gallery-items-data */
export function getGallerySlugsForSitemap(): string[] {
  return Object.keys(galleryItemsData).filter((slug) => typeof slug === "string" && slug.length > 0);
}

/** Check if a blog slug is valid */
export function isBlogSlugValid(slug: string): boolean {
  return Object.values(blogPostsData).some((post) => post?.slug === slug);
}

/** Check if a gallery slug is valid */
export function isGallerySlugValid(slug: string): boolean {
  return slug in galleryItemsData;
}
