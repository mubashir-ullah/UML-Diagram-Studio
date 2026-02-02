import { notFound } from "next/navigation";
import { isGallerySlugValid } from "@/lib/seo/slugs";
import { DiagramDetailContent } from "./diagram-detail-content";

export default async function GallerySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug || !isGallerySlugValid(slug)) {
    notFound();
  }
  return <DiagramDetailContent slug={slug} />;
}
