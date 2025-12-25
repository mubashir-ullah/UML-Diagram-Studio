import { MetadataRoute } from "next";

const SITE_URL = "https://umldiagram.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all search engines and AI crawlers by default
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly allow OpenAI's GPTBot for AI training
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly allow Anthropic's ClaudeBot for AI training
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly allow Google's AI training crawler
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Google's standard crawler
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Google's image crawler
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Bing's crawler
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Common Crawl (used by many AI models)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Anthropic's other crawler
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Apple's AI crawler
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Facebook's crawler
      {
        userAgent: "facebookexternalhit",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Twitter's crawler
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow LinkedIn's crawler
      {
        userAgent: "LinkedInBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Perplexity AI crawler
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow You.com AI crawler
      {
        userAgent: "YouBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Character.AI crawler
      {
        userAgent: "Character-AI",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Omgilibot (AI training)
      {
        userAgent: "Omgilibot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Allow Facebook's other crawler
      {
        userAgent: "facebookcatalog",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

