import { NextRequest, NextResponse } from "next/server";
import { exportRequestSchema } from "@shared/schema";
import { encode } from "plantuml-encoder";
import { jsPDF } from "jspdf";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = exportRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { code, format } = validation.data;

    // Modify code to ensure white background for exports
    // Replace transparent background with white background
    let exportCode = code;
    if (format !== "txt") {
      // Replace transparent background with white
      exportCode = exportCode.replace(
        /skinparam\s+backgroundColor\s+transparent/gi,
        'skinparam backgroundColor white'
      );
      // If no backgroundColor is set, add white background
      if (!/skinparam\s+backgroundColor/gi.test(exportCode)) {
        // Insert after @startuml or at the beginning if no @startuml
        if (exportCode.includes('@startuml')) {
          exportCode = exportCode.replace(
            /(@startuml\s*\n?)/i,
            '$1skinparam backgroundColor white\n'
          );
        } else {
          exportCode = 'skinparam backgroundColor white\n' + exportCode;
        }
      }
    }

    // Handle TXT format (raw code)
    if (format === "txt") {
      return new NextResponse(code, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="diagram.txt"`,
        },
      });
    }

    // Handle PDF format - convert PNG to PDF
    if (format === "pdf") {
      const encoded = encode(exportCode);
      
      // Get PNG version of the diagram with white background
      const pngUrl = `https://www.plantuml.com/plantuml/png/${encoded}`;
      const pngResponse = await fetch(pngUrl);
      if (!pngResponse.ok) {
        throw new Error("Failed to generate PNG for PDF conversion");
      }
      
      const pngBuffer = await pngResponse.arrayBuffer();
      const pngBase64 = Buffer.from(pngBuffer).toString('base64');
      const pngDataUrl = `data:image/png;base64,${pngBase64}`;
      
      // Get SVG to determine dimensions (also with white background)
      const svgUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;
      const svgResponse = await fetch(svgUrl);
      let width = 800;
      let height = 600;
      
      if (svgResponse.ok) {
        const svgText = await svgResponse.text();
        const svgMatch = svgText.match(/viewBox="([^"]*)"/);
        if (svgMatch) {
          const [, viewBox] = svgMatch;
          const [x, y, w, h] = viewBox.split(/\s+/).map(Number);
          if (w && h) {
            width = w;
            height = h;
          }
        }
      }
      
      // Create PDF with jsPDF (server-side compatible)
      const pdfDoc = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [width, height],
      });
      
      // Add PNG image to PDF
      pdfDoc.addImage(pngDataUrl, 'PNG', 0, 0, width, height);
      
      // Get PDF as buffer
      const pdfOutput = pdfDoc.output('arraybuffer');
      const pdfBuffer = Buffer.from(pdfOutput);
      
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="diagram.pdf"`,
        },
      });
    }

    // Handle PNG and SVG formats (with white background)
    const encoded = encode(exportCode);
    const imageUrl = `https://www.plantuml.com/plantuml/${format}/${encoded}`;
    
    // Fetch the image and send it to client
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to generate diagram");
    }

    let buffer: ArrayBuffer;
    let contentType: string;
    
    if (format === "png") {
      contentType = "image/png";
      buffer = await response.arrayBuffer();
    } else if (format === "svg") {
      contentType = "image/svg+xml";
      // For SVG, ensure white background by modifying the SVG content
      const svgText = await response.text();
      // Add white background rectangle if not present
      let modifiedSvg = svgText;
      
      // Check if there's a viewBox to determine dimensions
      const viewBoxMatch = svgText.match(/viewBox="([^"]*)"/);
      if (viewBoxMatch) {
        const [, viewBox] = viewBoxMatch;
        const [x, y, w, h] = viewBox.split(/\s+/).map(Number);
        
        // Check if white background rectangle already exists
        if (!svgText.includes('<rect') || !svgText.match(/fill="white"|fill='white'/i)) {
          // Insert white background rectangle after opening <svg> tag
          const svgOpenMatch = svgText.match(/(<svg[^>]*>)/);
          if (svgOpenMatch) {
            const whiteRect = `\n  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="white"/>\n`;
            modifiedSvg = svgText.replace(/(<svg[^>]*>)/, `$1${whiteRect}`);
          }
        }
      }
      
      buffer = Buffer.from(modifiedSvg, 'utf-8');
    } else {
      contentType = "application/octet-stream";
      buffer = await response.arrayBuffer();
    }
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="diagram.${format}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export diagram" },
      { status: 500 }
    );
  }
}

