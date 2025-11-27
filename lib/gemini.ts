import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export async function generateUMLCodeWithGemini(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<{ content: string; codeSnippet?: string }> {
  if (!genAI) {
    throw new Error("AI Assistant is not configured. Please add your Gemini API key to enable this feature.");
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
      systemInstruction: `You are an expert UML diagram assistant. Help users create PlantUML diagrams. When users describe what they want, generate complete PlantUML code that they can use. Always wrap your code in triple backticks with 'plantuml' language identifier. Make diagrams clean, well-structured, and include proper theming. Use skinparam backgroundColor transparent and include a title. Use JetBrains Mono font when possible.`,
    });

    let result;
    
    if (conversationHistory.length > 0) {
      // Use chat session for conversation history
      const chat = model.startChat({
        history: conversationHistory.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      });
      
      result = await chat.sendMessage(userMessage);
    } else {
      // Single request without history
      result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });
    }

    const response = result.response;
    const content = response.text();

    // Extract PlantUML code from response
    const codeBlockMatch = content.match(/```(?:plantuml)?\n([\s\S]*?)```/);
    const codeSnippet = codeBlockMatch ? codeBlockMatch[1].trim() : undefined;

    return {
      content,
      codeSnippet,
    };
  } catch (error: any) {
    console.error("Gemini API error:", error);

    if (error?.message?.includes("API_KEY")) {
      throw new Error("Invalid Gemini API key. Please check your API key in environment variables.");
    } else if (error?.message?.includes("quota") || error?.message?.includes("rate")) {
      throw new Error("Gemini API rate limit exceeded. Please try again later.");
    } else if (error?.status === 500 || error?.code === 500) {
      throw new Error("Gemini API server error. Please try again later.");
    }

    throw new Error(`Failed to generate UML code: ${error?.message || "Unknown error"}`);
  }
}

