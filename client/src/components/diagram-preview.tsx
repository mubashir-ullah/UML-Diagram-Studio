import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ZoomIn, ZoomOut, Maximize2, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DiagramPreviewProps {
  code: string;
  diagramType: "plantuml" | "mermaid";
}

export function DiagramPreview({ code, diagramType }: DiagramPreviewProps) {
  const [zoom, setZoom] = useState(100);
  const [debouncedCode, setDebouncedCode] = useState(code);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedCode(code);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [code]);

  const { data: diagramUrl, isLoading, error } = useQuery<string>({
    queryKey: ["/api/compile", debouncedCode, diagramType],
    enabled: !!debouncedCode,
    queryFn: async () => {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: debouncedCode, diagramType }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to compile diagram");
      }

      const data = await response.json();
      return data.url;
    },
    staleTime: 1000,
    refetchOnWindowFocus: false,
  });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleZoomReset = () => setZoom(100);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Diagram Preview</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            data-testid="button-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomReset}
            className="min-w-16"
            data-testid="button-zoom-reset"
          >
            <span className="text-xs">{zoom}%</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            data-testid="button-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6" data-testid="diagram-preview-container">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="space-y-4 w-full max-w-2xl">
              <Skeleton className="h-64 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full p-6">
            <Alert variant="destructive" className="max-w-2xl">
              <AlertDescription data-testid="text-error-message">
                {error instanceof Error ? error.message : "Failed to compile diagram"}
              </AlertDescription>
            </Alert>
          </div>
        ) : diagramUrl ? (
          <div className="flex items-center justify-center min-h-full">
            <img
              src={diagramUrl}
              alt="UML Diagram"
              style={{ transform: `scale(${zoom / 100})` }}
              className="transition-transform duration-200 origin-center"
              data-testid="img-diagram"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-sm font-medium">Your diagram will appear here</p>
              <p className="text-xs mt-1">Start typing or select a template</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
