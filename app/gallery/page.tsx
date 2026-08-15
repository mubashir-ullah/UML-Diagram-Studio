'use client';

import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { galleryItemsData } from "@/lib/data/gallery-items-data";

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar
        onTemplateSelect={() => {}}
        onToggleChat={() => {}}
        isChatOpen={false}
        currentCode=""
      />
      
      <div className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <Breadcrumb className="mb-4 sm:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Gallery</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4">UML Diagram Examples and Templates</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Browse class, sequence, activity, and use case diagram examples with PlantUML steps. Open any example in the <Link href="/" className="text-primary hover:underline">free UML diagram tool</Link>, or read the <Link href="/blog" className="text-primary hover:underline">tutorials</Link>.
          </p>
          <h2 className="text-xl font-semibold mb-4 mt-6">Diagram types</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.values(galleryItemsData).map((diagram: any) => (
            <Link key={diagram.id} href={`/gallery/${diagram.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative w-full h-48 bg-muted rounded-t-lg overflow-hidden">
                  <Image
                    src={diagram.image || "/og-image.png"}
                    alt={`UML ${diagram.name} example`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg sm:text-xl">{diagram.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {diagram.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {diagram.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1.5">Keywords:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {diagram.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {diagram.keywords.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{diagram.keywords.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1.5">Use Cases:</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {diagram.useCases.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1.5">Industries:</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {diagram.industries.join(", ")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {Object.keys(galleryItemsData).length === 0 && (
          <Card className="p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No diagrams yet</h3>
            <p className="text-sm text-muted-foreground">
              Check back soon for more diagram examples!
            </p>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}

