import Groq from "groq-sdk";

/**
 * Post-process PlantUML code to fix common syntax errors
 */
function fixCommonSyntaxErrors(code: string): string {
  let fixed = code.trim();
  
  // Ensure @startuml and @enduml are present
  if (!fixed.includes("@startuml")) {
    fixed = "@startuml\n" + fixed;
  }
  if (!fixed.includes("@enduml")) {
    fixed = fixed + "\n@enduml";
  }
  
  // Fix common invalid patterns
  // Remove invalid syntax like +--, --+ inside declarations
  fixed = fixed.replace(/\{\s*\+--[^}]*--\+\s*\}/g, '');
  fixed = fixed.replace(/\{\s*\+--[^}]*\}/g, '');
  fixed = fixed.replace(/\{\s*--\+[^}]*\}/g, '');
  
  // Fix component/class declarations with invalid content
  // Pattern: component Name { invalid content }
  fixed = fixed.replace(/(component|class|interface|abstract|enum)\s+(\w+)\s*\{\s*[^}]*[+\-]{2,}[^}]*\s*\}/g, '$1 $2');
  
  // Fix nested component declarations (not allowed in PlantUML)
  fixed = fixed.replace(/(component|class|interface)\s+(\w+)\s*\{\s*(component|class|interface)\s+(\w+)\s*\}\s*\}/g, '$1 $2\n$1 $4');
  
  // Ensure proper spacing
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  
  return fixed.trim();
}

// Initialize Groq client - check at runtime to ensure env var is loaded
function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return null;
  }
  
  // Remove any whitespace that might have been accidentally added
  const cleanApiKey = apiKey.trim();
  
  if (!cleanApiKey || cleanApiKey.length === 0) {
    return null;
  }
  
  return new Groq({ apiKey: cleanApiKey });
}

export async function generateUMLCodeWithGroq(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<{ content: string; codeSnippet?: string }> {
  const groq = getGroqClient();
  
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("AI Assistant is not configured. Please add your GROQ_API_KEY to environment variables.");
    } else {
      throw new Error("Invalid Groq API key format. Please check your GROQ_API_KEY in environment variables.");
    }
  }

  try {
    // Limit conversation history to last 10 messages to prevent token limit issues
    // This keeps the most recent context while staying within model limits
    const MAX_HISTORY_MESSAGES = 10;
    const limitedHistory = conversationHistory.slice(-MAX_HISTORY_MESSAGES);
    
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are an expert PlantUML code generator. Generate ONLY syntactically correct PlantUML code.

CRITICAL RULES:
1. ALWAYS start with @startuml and end with @enduml
2. NEVER use curly braces {} with invalid syntax like +--, --+, etc.
3. Components and classes are declared on separate lines, not nested
4. Use proper PlantUML syntax for relationships

REQUIRED FORMAT:
@startuml
skinparam backgroundColor transparent
skinparam defaultFontName "JetBrains Mono"
title "Your Diagram Title"

[Your diagram code here]

@enduml

CORRECT EXAMPLES:

Example 1 - Component Diagram:
@startuml
skinparam backgroundColor transparent
skinparam defaultFontName "JetBrains Mono"
title "System Architecture"

component Frontend
component Backend
component Database
Frontend --> Backend : HTTP
Backend --> Database : SQL
@enduml

Example 2 - Class Diagram:
@startuml
skinparam backgroundColor transparent
skinparam defaultFontName "JetBrains Mono"
title "Class Relationships"

class User {
  -id: string
  -name: string
  +login()
  +logout()
}
class Admin extends User
class Post {
  -id: string
  -title: string
}
User "1" -- "*" Post : creates
@enduml

Example 3 - Sequence Diagram:
@startuml
skinparam backgroundColor transparent
skinparam defaultFontName "JetBrains Mono"
title "User Login Flow"

actor User
participant Frontend
participant Backend
participant Database

User -> Frontend: Enter credentials
activate Frontend
Frontend -> Backend: POST /login
activate Backend
Backend -> Database: Query user
activate Database
Database --> Backend: User data
deactivate Database
Backend --> Frontend: Auth token
deactivate Backend
Frontend --> User: Success
deactivate Frontend
@enduml

FORBIDDEN SYNTAX (NEVER USE):
❌ component Frontend { +--GUI-- }
❌ component Frontend { component Backend }
❌ class MyClass { +--method-- }
❌ class A { class B }

CORRECT SYNTAX (ALWAYS USE):
✅ component Frontend
✅ component Backend
✅ Frontend --> Backend
✅ class MyClass { +method() }

Generate valid PlantUML code wrapped in \`\`\`plantuml code blocks.`,
      },
      ...limitedHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages,
      max_tokens: 2000,
      temperature: 0.3, // Lower temperature for more consistent, accurate syntax
    });

    const content = response.choices[0].message.content || "";
    
    // Extract PlantUML code from response
    const codeBlockMatch = content.match(/```(?:plantuml)?\n([\s\S]*?)```/);
    let codeSnippet = codeBlockMatch ? codeBlockMatch[1].trim() : undefined;
    
    // Post-process to fix common syntax errors
    if (codeSnippet) {
      codeSnippet = fixCommonSyntaxErrors(codeSnippet);
    }

    return {
      content,
      codeSnippet,
    };
  } catch (error) {
    console.error("Groq API error:", error);
    
    if (error instanceof Groq.APIError) {
      if (error.status === 401) {
        console.error("API Key check:", {
          hasKey: !!process.env.GROQ_API_KEY,
          keyLength: process.env.GROQ_API_KEY?.length || 0,
          keyPrefix: process.env.GROQ_API_KEY?.substring(0, 7) || "none",
        });
        throw new Error("Invalid Groq API key. Please verify your API key is correct and has not expired. Check your .env.local file and restart the server.");
      } else if (error.status === 400) {
        // Check if it's a model decommissioned error
        const errorMessage = error.message || "";
        if (errorMessage.includes("decommissioned") || errorMessage.includes("model_decommissioned")) {
          throw new Error("The selected Groq model has been decommissioned. Please update GROQ_MODEL in your .env.local file to a current model like 'llama-3.1-8b-instant' or 'mixtral-8x7b-32768'. See https://console.groq.com/docs/models for available models.");
        }
        throw new Error(`Groq API error: ${error.message}`);
      } else if (error.status === 429) {
        throw new Error("Groq API rate limit exceeded. Please try again later.");
      } else if (error.status === 500) {
        throw new Error("Groq API server error. Please try again later.");
      } else {
        throw new Error(`Groq API error: ${error.message}`);
      }
    }
    
    // Handle other error types
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("Groq API key error. Please check your GROQ_API_KEY in .env.local and restart the server.");
      }
    }
    
    throw new Error("Failed to generate UML code. Please try again.");
  }
}

