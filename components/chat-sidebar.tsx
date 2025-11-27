'use client';

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Send, Copy, X, Loader2, ArrowDownToLine, Trash2, Edit2, RotateCcw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage, ChatRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { promptTemplates } from "@/lib/prompt-templates";

interface ChatSidebarProps {
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
  onInsertCode: (code: string) => void;
  onClose: () => void;
}

export function ChatSidebar({
  messages,
  onMessagesChange,
  onInsertCode,
  onClose,
}: ChatSidebarProps) {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (request: ChatRequest) => {
      try {
        const response = await apiRequest("POST", "/api/chat", request);
        const data = await response.json();
        return data as ChatMessage;
      } catch (error) {
        // Try to extract error message from response if available
        if (error instanceof Error) {
          // Check if error message contains JSON error
          try {
            const errorMatch = error.message.match(/\d+: ({.*})/);
            if (errorMatch) {
              const errorData = JSON.parse(errorMatch[1]);
              throw new Error(errorData.error || error.message);
            }
          } catch {
            // If parsing fails, use original error message
          }
          throw error;
        }
        throw new Error("Failed to generate response");
      }
    },
    onSuccess: (response) => {
      onMessagesChange([...messages, response]);
    },
    onError: (error: Error) => {
      const errorMessage = error.message.includes("AI Assistant is not configured")
        ? "Please configure your OpenAI API key in environment variables."
        : error.message || "Failed to generate response. Please try again.";
      
      toast({
        title: "Failed to send message",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    onMessagesChange([...messages, userMessage]);
    setInput("");

    chatMutation.mutate({
      message: input,
      conversationHistory: messages,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet copied successfully.",
    });
  };

  const handleInsertCode = (code: string) => {
    onInsertCode(code);
    toast({
      title: "Code inserted",
      description: "Code has been added to the editor.",
    });
  };

  const handleClearChat = () => {
    onMessagesChange([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been removed.",
      duration: 1500,
    });
  };

  const handleEditMessage = (messageId: string) => {
    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    const message = messages[messageIndex];
    if (message.role !== "user") return;

    // Put message content in input
    setInput(message.content);

    // Remove this message and all subsequent messages
    onMessagesChange(messages.slice(0, messageIndex));
  };

  const handleRegenerate = (messageId: string) => {
    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    const assistantMessage = messages[messageIndex];
    if (assistantMessage.role !== "assistant") return;

    // Find the previous user message
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex < 0 || messages[userMessageIndex].role !== "user") return;

    const userMessage = messages[userMessageIndex];

    // Remove the assistant message and all subsequent messages
    const messagesUpToUser = messages.slice(0, messageIndex);
    onMessagesChange(messagesUpToUser);

    // Resend the user message
    chatMutation.mutate({
      message: userMessage.content,
      conversationHistory: messagesUpToUser.slice(0, -1), // Exclude the user message itself
    });
  };

  const handleTemplateSelect = (template: typeof promptTemplates[0]) => {
    setInput(template.prompt);
    toast({
      title: "Template loaded",
      description: `${template.title} prompt added to input.`,
      duration: 1500,
    });
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="flex items-center justify-between px-4 h-10 border-b bg-card">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  disabled={messages.length === 0}
                  className="h-8 w-8"
                  data-testid="button-clear-chat"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
            data-testid="button-close-chat"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            <div>
              <Bot className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Ask AI to generate UML diagrams</p>
              <p className="text-xs mt-1">
                Describe what you want to create
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4" data-testid="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`group flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
                data-testid={`message-${message.role}-${message.id}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
                <div
                  className={`flex-1 max-w-[85%] ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div className={`flex items-start gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`inline-block px-3 py-2 rounded-lg text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      {message.role === "user" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                                onClick={() => handleEditMessage(message.id)}
                                data-testid="button-edit-message"
                              >
                                <Edit2 className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit message</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {message.role === "assistant" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                                onClick={() => handleRegenerate(message.id)}
                                disabled={chatMutation.isPending}
                                data-testid="button-regenerate"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Regenerate response</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                  {message.codeSnippet && (
                    <div className="mt-2 bg-muted rounded-md border">
                      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/50">
                        <span className="text-xs font-medium text-muted-foreground">Generated Code</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 hover:bg-primary/10 hover:text-primary"
                                onClick={() => handleInsertCode(message.codeSnippet!)}
                                data-testid="button-insert-code-icon"
                              >
                                <ArrowDownToLine className="w-3.5 h-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Insert into editor</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="p-3">
                        <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                          {message.codeSnippet}
                        </pre>
                      </div>
                      <div className="flex gap-2 p-3 pt-2 border-t bg-muted/30">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleInsertCode(message.codeSnippet!)}
                          data-testid="button-insert-code"
                        >
                          Insert to Editor
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(message.codeSnippet!)}
                          data-testid="button-copy-code"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t bg-card">
        <div className="flex items-start gap-2 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                data-testid="button-prompt-templates"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Templates
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Prompt Templates</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {promptTemplates.map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  data-testid={`prompt-template-${template.id}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="font-medium text-sm">{template.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {template.prompt.substring(0, 60)}...
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your diagram or select a template..."
            className="resize-y min-h-[60px] max-h-[300px]"
            data-testid="input-chat-message"
            disabled={chatMutation.isPending}
            style={{ resize: 'vertical' }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || chatMutation.isPending}
            size="icon"
            data-testid="button-send-message"
            className="mb-0.5"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
