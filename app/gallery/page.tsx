'use client';

import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Diagram {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  keywords: string[];
  useCases: string[];
  industries: string[];
  category: string;
}

const diagrams: Diagram[] = [
  {
    id: "1",
    slug: "class-diagram",
    name: "Class Diagram",
    description: "A structural diagram that shows the classes, attributes, operations, and relationships in a system.",
    image: "/class-diagram.png",
    keywords: ["Classes", "Objects", "Relationships", "Inheritance", "Encapsulation"],
    useCases: ["System Design", "Object-Oriented Design", "Database Modeling", "API Documentation"],
    industries: ["Software Development", "Enterprise Applications", "Web Development", "Mobile Apps"],
    category: "Structural"
  }
];

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
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4 sm:mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4">UML Diagram Gallery - Examples and Templates</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Browse our collection of UML diagram examples with detailed information, use cases, components, and step-by-step guides on how to create them.
          </p>
          <h2 className="text-xl font-semibold mb-4 mt-6">Class Diagram Examples</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {diagrams.map((diagram) => (
            <Link key={diagram.id} href={`/gallery/${diagram.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative w-full h-48 bg-muted rounded-t-lg overflow-hidden">
                  {diagram.slug === "class-diagram" ? (
                    <Image
                      src={diagram.image}
                      alt={`UML ${diagram.name} example - ${diagram.description}`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-muted-foreground/50" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
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
                        {diagram.keywords.slice(0, 3).map((keyword, idx) => (
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

        {diagrams.length === 0 && (
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

