import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// User schema for future authentication features
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chat message types for AI assistant
export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
  codeSnippet: z.string().optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  conversationHistory: z.array(chatMessageSchema).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// Diagram compilation types
export const compileRequestSchema = z.object({
  code: z.string(),
  diagramType: z.enum(["plantuml", "mermaid"]).default("plantuml"),
});

export type CompileRequest = z.infer<typeof compileRequestSchema>;

// Template types
export const templateSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["class", "sequence", "activity", "state", "usecase", "component"]),
  description: z.string(),
  code: z.string(),
  thumbnail: z.string().optional(),
});

export type Template = z.infer<typeof templateSchema>;

// Export types
export const exportRequestSchema = z.object({
  code: z.string(),
  format: z.enum(["png", "svg"]),
  diagramType: z.enum(["plantuml", "mermaid"]).default("plantuml"),
});

export type ExportRequest = z.infer<typeof exportRequestSchema>;
