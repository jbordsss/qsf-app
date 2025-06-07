// /lib/data.ts
import type { Article, Topic, AccessLevel } from "@/lib/types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ✅ In-memory cache for generated articles
let cachedArticles: Article[] | null = null;

export async function fetchArticles(
  category?: string,
  limit = 6,
  accessLevel: AccessLevel = "public",
): Promise<Article[]> {
  try {
    if (cachedArticles) {
      const levels: Record<AccessLevel, number> = { public: 0, member: 1, premium: 2 };
      return cachedArticles
        .filter((a) => levels[a.accessLevel || "public"] <= levels[accessLevel])
        .slice(0, limit);
    }

    const res = await fetch(`http://localhost:3000/api/assistant?q=${category || "quantum"}`);
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid article response");

    cachedArticles = data; // ✅ cache the full list

    const levels: Record<AccessLevel, number> = { public: 0, member: 1, premium: 2 };

    return cachedArticles
      .filter((a) => levels[a.accessLevel || "public"] <= levels[accessLevel])
      .slice(0, limit);
  } catch (err) {
    console.error("Error fetching articles:", err);
    return [];
  }
}

export async function fetchFeaturedArticle(): Promise<Article | null> {
  const articles = await fetchArticles();
  return articles.find((a) => a.featured) || articles[0] || null;
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const articles = await fetchArticles();

  console.log("Available slugs:", articles.map((a) => a.slug));
  console.log("Looking for:", slug);

  return articles.find((a) => a.slug === slug) || null;
}

export async function fetchArticleContent(slug: string): Promise<string> {
  await delay(300);
  return `<p>This article covers detailed content about <strong>${slug}</strong>. Full generation support coming soon.</p>`;
}

export async function fetchRelatedArticles(
  currentSlug: string,
  category?: string,
  accessLevel: AccessLevel = "public",
): Promise<Article[]> {
  const allArticles = await fetchArticles(category, 20, accessLevel);
  const filtered = allArticles.filter((a) => a.slug !== currentSlug);
  return filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
}

export async function fetchTopics(): Promise<Topic[]> {
  const articles = await fetchArticles();
  const topicMap = new Map<string, Topic>();

  for (const a of articles) {
    const slug = a.category;
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    topicMap.set(slug, {
      id: slug,
      name,
      slug,
      count: (topicMap.get(slug)?.count || 0) + 1,
    });
  }

  return Array.from(topicMap.values());
}

export async function searchArticles(query: string, accessLevel: AccessLevel = "public"): Promise<Article[]> {
  const articles = await fetchArticles(query, 20, accessLevel);
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export async function fetchTrendingTopics(): Promise<Array<Topic & { percentage: number }>> {
  const topics = await fetchTopics();
  return topics
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((topic, i) => ({ ...topic, percentage: 85 - i * 7 }));
}
