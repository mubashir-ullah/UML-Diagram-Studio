import { NextRequest, NextResponse } from "next/server";
import { compileRequestSchema } from "@shared/schema";
import { encode } from "plantuml-encoder";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = compileRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { code } = validation.data;

    // Encode PlantUML and generate URL
    const encoded = encode(code);
    const diagramUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;
    
    return NextResponse.json({ url: diagramUrl });
  } catch (error) {
    console.error("Compile error:", error);
    return NextResponse.json(
      { error: "Failed to compile diagram" },
      { status: 500 }
    );
  }
}

