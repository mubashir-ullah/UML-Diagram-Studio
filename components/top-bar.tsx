'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Bot, FileCode, Github, Layout } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import type { Template } from "@shared/schema";

interface TopBarProps {
  onTemplateSelect: (code: string) => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  currentCode: string;
}

export function TopBar({
  onTemplateSelect,
  onToggleChat,
  isChatOpen,
  currentCode,
}: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const templatesByCategory = templates.reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-card">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img 
            src="/UML-Diagram.ico" 
            alt="UML Diagram Studio Logo" 
            className="w-5 h-5" 
            data-testid="icon-logo"
          />
          <h1 className="text-base font-semibold" data-testid="text-app-title">
            UML Diagram Studio
          </h1>
        </Link>

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

      <div className="flex items-center gap-4 flex-1 justify-center">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            data-testid="button-studio"
          >
            <Layout className="w-4 h-4 mr-2" />
            Studio
          </Button>
        </Link>
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            data-testid="button-blogs"
          >
            Blogs
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            data-testid="button-about"
          >
            About
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          data-testid="button-github"
        >
          <svg
            className="!w-5 !h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={isChatOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleChat}
          data-testid="button-toggle-chat"
          className={cn(
            "relative overflow-hidden group",
            !isChatOpen && "bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/30",
            !isChatOpen && "transition-colors duration-300",
            !isChatOpen && "hover:from-primary/25 hover:via-primary/15 hover:to-primary/25 hover:border-primary/60",
            !isChatOpen && "shadow-sm hover:shadow-md hover:shadow-primary/20",
            !isChatOpen && "animate-pulse-subtle"
          )}
        >
          {!isChatOpen && (
            <>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            </>
          )}
          <Bot className={`w-4 h-4 mr-2 relative z-10 ${!isChatOpen && mounted ? 'animate-bounce-subtle' : ''}`} />
          <span className="relative z-10 font-medium">AI Assistant</span>
          {!isChatOpen && mounted && (
            <span className="absolute top-0.5 right-0.5 flex h-2.5 w-2.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border border-background"></span>
            </span>
          )}
        </Button>

        {mounted ? (
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
        ) : (
          <Button
            variant="ghost"
            size="icon"
            data-testid="button-theme-toggle"
          >
            <Moon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
