import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateUMLCode } from "./lib/openai";
import { templates } from "./lib/templates";
import { chatRequestSchema, compileRequestSchema, exportRequestSchema } from "@shared/schema";
import { encode } from "plantuml-encoder";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint - AI-powered UML code generation
  app.post("/api/chat", async (req, res) => {
    try {
      const validation = chatRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid request" });
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

      res.json(response);
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to generate response" 
      });
    }
  });

  // Compile endpoint - Convert PlantUML code to diagram URL
  app.post("/api/compile", async (req, res) => {
    try {
      const validation = compileRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid request" });
      }

      const { code, diagramType } = validation.data;

      if (diagramType === "plantuml") {
        // Encode PlantUML and generate URL
        const encoded = encode(code);
        const diagramUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;
        
        res.json({ url: diagramUrl });
      } else {
        // For Mermaid, we'll use a similar approach with their public server
        res.status(501).json({ error: "Mermaid support coming soon" });
      }
    } catch (error) {
      console.error("Compile error:", error);
      res.status(500).send("Failed to compile diagram");
    }
  });

  // Templates endpoint - Get all diagram templates
  app.get("/api/templates", async (req, res) => {
    try {
      res.json(templates);
    } catch (error) {
      console.error("Templates error:", error);
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  // Export endpoint - Export diagram as PNG or SVG
  app.post("/api/export", async (req, res) => {
    try {
      const validation = exportRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid request" });
      }

      const { code, format, diagramType } = validation.data;

      if (diagramType === "plantuml") {
        const encoded = encode(code);
        const imageUrl = `https://www.plantuml.com/plantuml/${format}/${encoded}`;
        
        // Fetch the image and send it to client
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error("Failed to generate diagram");
        }

        const buffer = await response.arrayBuffer();
        
        res.setHeader("Content-Type", format === "png" ? "image/png" : "image/svg+xml");
        res.setHeader("Content-Disposition", `attachment; filename="diagram.${format}"`);
        res.send(Buffer.from(buffer));
      } else {
        res.status(501).json({ error: "Mermaid export coming soon" });
      }
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ error: "Failed to export diagram" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
