'use client';

import { useState, useCallback, useRef, useEffect } from "react";
import { CodeEditor } from "@/components/code-editor";
import { DiagramPreview } from "@/components/diagram-preview";
import { ChatSidebar } from "@/components/chat-sidebar";
import { TopBar } from "@/components/top-bar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Script from "next/script";
import type { ChatMessage } from "@shared/schema";
import {
  getFAQPageSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";

const DEFAULT_CODE = `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Simple Class Diagram

class User {
  -id: string
  -username: string
  -email: string
  +login()
  +logout()
}

class Post {
  -id: string
  -title: string
  -content: string
  -createdAt: Date
  +publish()
  +delete()
}

User "1" -- "*" Post : creates
@enduml`;

const STORAGE_KEY = 'plantuml-code';

export default function Home() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const isInitialMount = useRef(true);

  // Load code from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem(STORAGE_KEY);
      if (savedCode) {
        setCode(savedCode);
      }
      isInitialMount.current = false;
    }
  }, []);

  // Save code to localStorage whenever it changes (debounced)
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    if (typeof window !== 'undefined') {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Debounce the save operation
      debounceTimerRef.current = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, code);
      }, 500); // Save after 500ms of no changes
    }

    // Cleanup timer on unmount or code change
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [code]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const handleInsertCode = useCallback((codeToInsert: string) => {
    setCode(codeToInsert);
  }, []);

  const handleTemplateSelect = useCallback((templateCode: string) => {
    setCode(templateCode);
  }, []);

  const handleRefresh = useCallback(() => {
    // Immediately save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, code);
    }
    // Force diagram regeneration by updating refresh key
    setRefreshKey(prev => prev + 1);
  }, [code]);

  const faqSchema = getFAQPageSchema([
    {
      question: "What is a UML diagram?",
      answer: "A UML diagram is a standardized visual representation used in software engineering to model, design, and document software systems. UML stands for Unified Modeling Language.",
    },
    {
      question: "Is this UML diagram tool free?",
      answer: "Yes, our UML diagram tool is completely free to use. You can create unlimited UML diagrams online without any restrictions or subscriptions.",
    },
    {
      question: "What types of UML diagrams can I create?",
      answer: "You can create class diagrams, sequence diagrams, activity diagrams, use case diagrams, state diagrams, component diagrams, and more using our UML diagram generator.",
    },
    {
      question: "Do I need to install anything to use this UML diagram tool?",
      answer: "No installation required! Our UML diagram tool works entirely in your web browser. Just open the website and start creating UML diagrams online.",
    },
  ]);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(faqSchema),
        }}
      />
      <TopBar
        onTemplateSelect={handleTemplateSelect}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        currentCode={code}
      />
      
      <div className="flex-1 overflow-hidden h-screen">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel id="code-editor" order={1} defaultSize={40} minSize={25}>
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              onRefresh={handleRefresh}
            />
          </ResizablePanel>
          
          <ResizableHandle className="w-1 bg-border hover-elevate" />
          
          <ResizablePanel id="diagram-preview" order={2} defaultSize={isChatOpen ? 40 : 60} minSize={25}>
            <DiagramPreview code={code} refreshKey={refreshKey} />
          </ResizablePanel>
          
          {isChatOpen && (
            <>
              <ResizableHandle className="w-1 bg-border hover-elevate" />
              <ResizablePanel id="chat-sidebar" order={3} defaultSize={20} minSize={15} maxSize={40}>
                <ChatSidebar
                  messages={chatMessages}
                  onMessagesChange={setChatMessages}
                  onInsertCode={handleInsertCode}
                  onClose={() => setIsChatOpen(false)}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

