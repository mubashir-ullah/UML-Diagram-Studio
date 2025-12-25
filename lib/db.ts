import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/shared/schema";

// Only initialize if DATABASE_URL is available (allows build to succeed)
// The error will be thrown at runtime when db is actually used
const DATABASE_URL = process.env.DATABASE_URL;

let dbInstance: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  
  if (!dbInstance) {
    const sql = neon(DATABASE_URL);
    dbInstance = drizzle(sql, { schema });
  }
  
  return dbInstance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  },
});

