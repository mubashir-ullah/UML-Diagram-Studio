import { NextRequest, NextResponse } from "next/server";
import { generateUMLCode } from "@/lib/ai";
import { chatRequestSchema } from "@shared/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = chatRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { message, conversationHistory = [] } = validation.data;

    const result = await generateUMLCode(
      message,
      conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))
    );

    const response = {
      id: Date.now().toString(),
      role: "assistant" as const,
      content: result.content,
      timestamp: Date.now(),
      codeSnippet: result.codeSnippet,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to generate response" 
      },
      { status: 500 }
    );
  }
}

