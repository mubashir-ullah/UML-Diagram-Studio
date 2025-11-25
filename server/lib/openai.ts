import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateUMLCode(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<{ content: string; codeSnippet?: string }> {
  if (!openai) {
    throw new Error("AI Assistant is not configured. Please add your OpenAI API key to enable this feature.");
  }

  try {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are an expert UML diagram assistant. Help users create PlantUML diagrams. When users describe what they want, generate complete PlantUML code that they can use. Always wrap your code in triple backticks with 'plantuml' language identifier. Make diagrams clean, well-structured, and include proper theming. Use skinparam backgroundColor transparent and include a title. Use JetBrains Mono font when possible.`,
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
      model: "gpt-5",
      messages,
      max_completion_tokens: 2048,
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
    throw new Error("Failed to generate UML code. Please try again.");
  }
}
