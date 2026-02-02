import { notFound } from "next/navigation";
import { isBlogSlugValid } from "@/lib/seo/slugs";
import { BlogPostContent } from "./blog-post-content";

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug || !isBlogSlugValid(slug)) {
    notFound();
  }
  return <BlogPostContent slug={slug} />;
}
