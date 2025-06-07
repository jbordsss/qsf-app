import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export async function extractReadableText(url: string): Promise<string> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    return article?.textContent?.trim() || "";
  } catch (err) {
    console.warn(`⚠️ Failed to extract from ${url}:`, err);
    return "";
  }
}