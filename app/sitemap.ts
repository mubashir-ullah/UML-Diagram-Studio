import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";
import {
  getBlogSlugsForSitemap,
  getGallerySlugsForSitemap,
} from "@/lib/seo/slugs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, ""); // Ensure no trailing slash
  const currentDate = new Date();

  // Helper function to ensure proper URL formatting (no trailing slashes except for root)
  const formatUrl = (path: string): string => {
    if (path === "/" || path === "") {
      return baseUrl;
    }
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "");
  };

  // Static pages - ordered by priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: formatUrl("/"),
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: formatUrl("/blog"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: formatUrl("/gallery"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: formatUrl("/about"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Blog posts - from single source of truth (lib/data/blog-posts-data)
  const blogPages: MetadataRoute.Sitemap = getBlogSlugsForSitemap().map(
    (entry) => {
      const postDate = new Date(entry.date);
      if (isNaN(postDate.getTime())) {
        return {
          url: formatUrl(`/blog/${entry.slug}`),
          lastModified: currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        };
      }
      return {
        url: formatUrl(`/blog/${entry.slug}`),
        lastModified: postDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }
  );

  // Gallery detail pages - from single source of truth (lib/data/gallery-items-data)
  const galleryPages: MetadataRoute.Sitemap =
    getGallerySlugsForSitemap().map((slug) => ({
      url: formatUrl(`/gallery/${slug}`),
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Combine all pages and remove duplicates by URL
  const allPages = [...staticPages, ...blogPages, ...galleryPages];
  const uniquePages = Array.from(
    new Map(allPages.map((page) => [page.url, page])).values()
  );

  // Sort by priority (descending) then by URL for consistent ordering
  uniquePages.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return a.url.localeCompare(b.url);
  });

  return uniquePages;
}
