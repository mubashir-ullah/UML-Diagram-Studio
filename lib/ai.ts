import { generateUMLCodeWithGroq } from "./groq";

/**
 * Generate UML code using Groq AI
 * Fast, free tier with 14,400 requests/day
 */
export async function generateUMLCode(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<{ content: string; codeSnippet?: string }> {
  return await generateUMLCodeWithGroq(userMessage, conversationHistory);
}

