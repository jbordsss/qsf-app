import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { uploadImageToS3 } from "@/lib/aws/s3Upload";
import type { Article } from "@/lib/types";
import axios from "axios";
import FormData from "form-data";
import { parse } from "@postlight/parser";
import { load } from "cheerio";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const STABILITY_API_KEY = process.env.STABILITY_API_KEY!;
const SEARCHAPI_IO_KEY = process.env.SEARCHAPI_IO_KEY!;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "quantum computing";

  try {
    const searchResponse = await axios.get("https://www.searchapi.io/api/v1/search", {
      params: {
        engine: "google",
        q: query,
        api_key: SEARCHAPI_IO_KEY,
      },
    });

    const links: string[] =
      searchResponse.data?.organic_results?.map((r: any) => r.link).filter(Boolean) || [];

    if (links.length === 0) throw new Error("No links returned from SearchAPI.io");

    const articles: Article[] = [];

    for (const url of links.slice(0, 10)) {
      try {
        const result = await parse(url);
        const $ = load(result.content || "");
        const rawText = $.text().replace(/\s+/g, " ").trim();

        // ✅ Skip irrelevant articles
        if (!rawText.toLowerCase().includes("quantum")) {
          console.log(`❌ Skipping non-quantum article: ${url}`);
          continue;
        }
        
        const author = result.author || "Unknown";
        const date = result.date_published || "Unknown";

        const geminiPrompt = `
You are a structured article parser. Based on the content and metadata below, return a valid JSON object for a news article. Include:
- id (short unique string)
- title
- slug
- excerpt (5–7 sentence summary)
- date (use: "${date}")
- author (use: "${author}")
- category (must be "latest" or "quantum-computing" based on content)
- tags (array of lowercase keywords)
- accessLevel ("public", "member", or "premium")
- featured (true or false)

Respond ONLY with raw JSON. Do NOT use markdown or formatting.

CONTENT:
${rawText}
        `.trim();

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: geminiPrompt }] }],
            }),
          }
        );

        const geminiJson = await geminiRes.json();
        const textOutput = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // ✅ Skip placeholder or empty responses
        const isPlaceholder = textOutput.toLowerCase().includes("placeholder") || textOutput.length < 200;
        if (isPlaceholder) {
          console.warn("⚠️ Skipping placeholder-like response:", textOutput.slice(0, 100));
          continue;
        }

        const cleanedText = textOutput.replace(/```json|```/g, "").trim();

        let article: Article;
        try {
          article = JSON.parse(cleanedText);
        } catch (err) {
          console.warn("⚠️ Failed to parse Gemini JSON:", cleanedText);
          continue;
        }

        // ✅ Ensure slug is safe
        article.slug =
          article.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "") || "untitled";

        // ✅ Ensure ID is unique
        article.id = `${article.id || "gen"}-${Date.now().toString(36).slice(-6)}`;

        // ✅ Image Generation
        const imagePrompt = `Highly Colorful Sci-fi illustration on a black background without any text for article titled: "${article.title}"`;
        const imagePayload = {
          prompt: imagePrompt,
          output_format: "webp",
        };

        let imageUrl: string | null = null;
        try {
          const imgResponse = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
            axios.toFormData(imagePayload, new FormData()),
            {
              validateStatus: undefined,
              responseType: "arraybuffer",
              headers: {
                Authorization: `Bearer ${STABILITY_API_KEY}`,
                Accept: "image/*",
              },
            }
          );

          if (imgResponse.status === 200) {
            const imageBuffer = Buffer.from(imgResponse.data);
            const filename = `article-hero-${article.id}.webp`;
            imageUrl = await uploadImageToS3(imageBuffer, filename);
          } else {
            throw new Error("Non-200 response from image API");
          }
        } catch (imgErr) {
          console.warn("⚠️ Image generation/upload failed:", imgErr);
        }

        article.heroImageUrl = imageUrl || "https://profilepic23.s3.us-east-1.amazonaws.com/Untitled+design+(3).png";
        articles.push(article);
      } catch (err) {
        console.error(`⚠️ Failed to process ${url}`, err);
      }
    }

    return NextResponse.json(articles);
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
