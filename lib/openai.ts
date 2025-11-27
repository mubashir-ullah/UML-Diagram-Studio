import OpenAI from "openai";

// Initialize OpenAI client - check at runtime to ensure env var is loaded
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return null;
  }
  
  // Remove any whitespace that might have been accidentally added
  const cleanApiKey = apiKey.trim();
  
  if (!cleanApiKey || cleanApiKey.length === 0) {
    return null;
  }
  
  return new OpenAI({ apiKey: cleanApiKey });
}

export async function generateUMLCodeWithOpenAI(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<{ content: string; codeSnippet?: string }> {
  const openai = getOpenAIClient();
  
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("AI Assistant is not configured. Please add your OPENAI_API_KEY to environment variables.");
    } else {
      throw new Error("Invalid OpenAI API key format. Please check your OPENAI_API_KEY in environment variables.");
    }
  }

  try {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a UML diagram assistant. Generate PlantUML code. Wrap code in triple backticks with 'plantuml'. Use: skinparam backgroundColor transparent, title, and JetBrains Mono font. Keep responses concise.`,
      },
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content || "";
    
    // Extract PlantUML code from response
    const codeBlockMatch = content.match(/```(?:plantuml)?\n([\s\S]*?)```/);
    const codeSnippet = codeBlockMatch ? codeBlockMatch[1].trim() : undefined;

    return {
      content,
      codeSnippet,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        console.error("API Key check:", {
          hasKey: !!process.env.OPENAI_API_KEY,
          keyLength: process.env.OPENAI_API_KEY?.length || 0,
          keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7) || "none",
        });
        throw new Error("Invalid OpenAI API key. Please verify your API key is correct and has not expired. Check your .env.local file and restart the server.");
      } else if (error.status === 429) {
        throw new Error("OpenAI API rate limit exceeded. Please try again later.");
      } else if (error.status === 500) {
        throw new Error("OpenAI API server error. Please try again later.");
      } else {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
    }
    
    // Handle other error types
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("OpenAI API key error. Please check your OPENAI_API_KEY in .env.local and restart the server.");
      }
    }
    
    throw new Error("Failed to generate UML code. Please try again.");
  }
}

