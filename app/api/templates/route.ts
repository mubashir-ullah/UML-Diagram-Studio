import { NextResponse } from "next/server";
import { templates } from "@/lib/templates";

export async function GET() {
  try {
    return NextResponse.json(templates);
  } catch (error) {
    console.error("Templates error:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

