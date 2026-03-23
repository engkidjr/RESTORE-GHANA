import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Report {
    id: string;
    created_at: string;
    type: string;
    lat: number;
    lng: number;
    status: string;
    description: string;
    photo_url?: string;
}

interface Prediction {
    lat: number;
    lng: number;
    radius_in_meters: number;
    risk_level: "Red" | "Yellow";
    reasoning_summary: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { reports } = (await req.json()) as { reports: Report[] };

    const systemPrompt = `
      You are an elite geospatial intelligence analyst for RestoreGhana.
      Your task is to analyze recent citizen reports of illegal mining (Galamsey), deforestation, and water pollution.
      
      Analyze the clustered reports (GPS coordinates, dates, descriptions).
      Identify patterns and predict new, unverified hotspots near these clusters where authorities should search.
      
      Output MUST be purely a JSON object containing an array of predictions under the key "hotspots".
      Format:
      {
        "hotspots": [
          {
            "lat": number,
            "lng": number,
            "radius_in_meters": number,
            "risk_level": "Red" | "Yellow",
            "reasoning_summary": "string"
          }
        ]
      }
      Do not output any markdown formatting (like \`\`\`json), just the raw JSON object.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const prompt = `Recent Reports Data: ${JSON.stringify(reports)}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();
    
    // Clean markdown code blocks if the model still outputs them
    if (responseText.startsWith('\`\`\`json')) {
        responseText = responseText.replace(/^\`\`\`json/g, '').replace(/\`\`\`$/g, '').trim();
    } else if (responseText.startsWith('\`\`\`')) {
        responseText = responseText.replace(/^\`\`\`/g, '').replace(/\`\`\`$/g, '').trim();
    }

    let hotspotsData: { hotspots: Prediction[] };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      hotspotsData = JSON.parse(responseText) as { hotspots: Prediction[] };
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON response:", responseText);
      return NextResponse.json({ error: "AI returned an unexpected response format." }, { status: 502 });
    }

    return NextResponse.json(hotspotsData.hotspots ? hotspotsData : { hotspots: hotspotsData });
    
  } catch (error: unknown) {
    console.error("Error analyzing hotspots:", error);
    return NextResponse.json({ error: "Failed to process reports via Gemini" }, { status: 500 });
  }
}
