import { generateUMLCodeWithOpenAI } from "./openai";

/**
 * Generate UML code using OpenAI (ChatGPT)
 * Uses gpt-3.5-turbo by default for minimal token usage
 */
export async function generateUMLCode(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<{ content: string; codeSnippet?: string }> {
  return generateUMLCodeWithOpenAI(userMessage, conversationHistory);
}

