import { useState, useCallback, useRef, useEffect } from "react";
import { CodeEditor } from "@/components/code-editor";
import { DiagramPreview } from "@/components/diagram-preview";
import { ChatSidebar } from "@/components/chat-sidebar";
import { TopBar } from "@/components/top-bar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import type { ChatMessage } from "@shared/schema";

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

export default function Home() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [diagramType, setDiagramType] = useState<"plantuml" | "mermaid">("plantuml");
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const handleInsertCode = useCallback((codeToInsert: string) => {
    setCode(codeToInsert);
  }, []);

  const handleTemplateSelect = useCallback((templateCode: string) => {
    setCode(templateCode);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <TopBar
        diagramType={diagramType}
        onDiagramTypeChange={setDiagramType}
        onTemplateSelect={handleTemplateSelect}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        currentCode={code}
      />
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={40} minSize={25}>
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              diagramType={diagramType}
            />
          </ResizablePanel>
          
          <ResizableHandle className="w-1 bg-border hover-elevate" />
          
          <ResizablePanel defaultSize={isChatOpen ? 40 : 60} minSize={25}>
            <DiagramPreview code={code} diagramType={diagramType} />
          </ResizablePanel>
          
          {isChatOpen && (
            <>
              <ResizableHandle className="w-1 bg-border hover-elevate" />
              <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
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
