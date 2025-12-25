'use client';

import { useState, useEffect, useRef } from "react";
import { FileCode, Loader2, AlertCircle, Download, ZoomIn, ZoomOut, Maximize2, RotateCcw, FileText, Image, File } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DiagramPreviewProps {
  code: string;
  refreshKey?: number;
}

export function DiagramPreview({ code, refreshKey }: DiagramPreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle download
  const handleDownload = async (format: 'png' | 'svg' | 'pdf' | 'txt') => {
    if (!code) return;
    
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, format, diagramType: 'plantuml' }),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  // Zoom functions
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };
  const handleFitToScreen = () => {
    if (!imageRef.current || !containerRef.current) return;
    const img = imageRef.current;
    const container = containerRef.current;
    const scaleX = (container.clientWidth - 40) / img.naturalWidth;
    const scaleY = (container.clientHeight - 40) / img.naturalHeight;
    setZoom(Math.min(scaleX, scaleY, 1));
    setPosition({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageUrl) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [imageUrl]);

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!mounted) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!code || code.trim().length === 0) {
      setImageUrl(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const { encode } = await import("plantuml-encoder");
        const encoded = encode(code);
        const diagramUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;
        setImageUrl(diagramUrl);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to compile diagram";
        setError(errorMessage);
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [code, refreshKey, mounted]);

  if (!mounted) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex items-center justify-between px-4 h-10 border-b bg-card">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Diagram Preview</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
            <FileCode className="w-12 h-12 opacity-20" />
            <p className="text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center justify-between px-4 h-10 border-b bg-card">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Diagram Preview</span>
        </div>
        {imageUrl && (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleZoomIn}
                    disabled={zoom >= 3}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleFitToScreen}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Fit to Screen</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleResetZoom}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset Zoom</TooltipContent>
              </Tooltip>
              <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <div className="w-px h-4 bg-border mx-1" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 gap-2">
                    <Download className="w-4 h-4" />
                    <span className="text-xs">Download</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDownload('png')}>
                    <Image className="w-4 h-4 mr-2" />
                    <span>PNG</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('svg')}>
                    <FileCode className="w-4 h-4 mr-2" />
                    <span>SVG</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                    <File className="w-4 h-4 mr-2" />
                    <span>PDF</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('txt')}>
                    <FileText className="w-4 h-4 mr-2" />
                    <span>TXT</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-hidden p-4 bg-gray-50 relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : zoom > 1 ? 'grab' : 'default' }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">Compiling diagram...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : imageUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div
              className="flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              }}
            >
            <img
                ref={imageRef}
              src={imageUrl}
              alt="UML Diagram"
                className="select-none"
                style={{
                  maxWidth: zoom === 1 ? '100%' : 'none',
                  maxHeight: zoom === 1 ? '100%' : 'none',
                }}
                draggable={false}
              onError={() => {
                setError("Failed to load diagram image");
                setIsLoading(false);
              }}
            />
            </div>
            <div className="absolute bottom-4 right-4 text-right">
              <p className="text-[8px] text-muted-foreground/60 bg-background/80 px-2 py-1 rounded">
                UML Diagram Studio © Copyright 2025 | Inspired by{' '}
                <a
                  href="https://plantuml.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-muted-foreground transition-colors"
                >
                  PlantUML
                </a>
                !
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
            <FileCode className="w-12 h-12 opacity-20" />
            <p className="text-sm">Start typing PlantUML code to see the preview</p>
            <p className="text-xs">Or select a template to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
