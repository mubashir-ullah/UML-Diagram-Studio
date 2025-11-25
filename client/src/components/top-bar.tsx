import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";
import { Download, Moon, Sun, MessageSquare, FileCode, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Template } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TopBarProps {
  diagramType: "plantuml" | "mermaid";
  onDiagramTypeChange: (type: "plantuml" | "mermaid") => void;
  onTemplateSelect: (code: string) => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  currentCode: string;
}

export function TopBar({
  diagramType,
  onDiagramTypeChange,
  onTemplateSelect,
  onToggleChat,
  isChatOpen,
  currentCode,
}: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const handleExport = async (format: "png" | "svg") => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: currentCode,
          format,
          diagramType,
        }),
      });

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diagram.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: `Diagram exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export diagram. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const templatesByCategory = templates.reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" data-testid="icon-logo" />
          <h1 className="text-base font-semibold" data-testid="text-app-title">
            UML Diagram Studio
          </h1>
        </div>

        <Select value={diagramType} onValueChange={(value: "plantuml" | "mermaid") => onDiagramTypeChange(value)}>
          <SelectTrigger className="w-32" data-testid="select-diagram-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plantuml">PlantUML</SelectItem>
            <SelectItem value="mermaid">Mermaid</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" data-testid="button-templates">
              <FileCode className="w-4 h-4 mr-2" />
              Templates
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
              <div key={category}>
                <DropdownMenuLabel className="capitalize">
                  {category} Diagrams
                </DropdownMenuLabel>
                {categoryTemplates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onClick={() => onTemplateSelect(template.code)}
                    data-testid={`template-${template.id}`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-sm">{template.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isExporting}
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("png")} data-testid="export-png">
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("svg")} data-testid="export-svg">
              Export as SVG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant={isChatOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleChat}
          data-testid="button-toggle-chat"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          AI Assistant
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </Button>
      </div>
    </header>
  );
}
