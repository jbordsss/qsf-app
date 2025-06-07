"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuantumCard } from "@/components/quantum-card"
import type { Article } from "@/lib/types"

export function FeaturedArticle() {
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const cached = localStorage.getItem("featured-article")
    if (cached) {
      try {
        setArticle(JSON.parse(cached))
      } catch {
        localStorage.removeItem("featured-article")
      }
    }

    async function load() {
      const res = await fetch("/api/assistant?q=quantum")
      const data: Article[] = await res.json()
      const featured = data.find((a) => a.featured) || data[0] || null
      if (featured) {
        setArticle(featured)
        localStorage.setItem("featured-article", JSON.stringify(featured))
      }
    }

    load()
  }, [])

  if (!article) return null

  return (
    <QuantumCard className="group">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block bg-primary/20 text-primary text-xs font-orbitron px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground mb-6 line-clamp-3">{article.excerpt}</p>
          <div className="mt-auto">
            <Link
              href={{
                pathname: `/news/${article.slug}`,
                query: { article: JSON.stringify(article) },
              }}
            >
              <Button className="group">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        <div
          className="relative h-72 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${article.heroImageUrl})` }}
        >
          <div className="font-orbitron text-4xl text-primary/80 bg-black/50 p-4 rounded">
            {article.title.split(" ").slice(0, 6).join(" ")}
          </div>
        </div>
      </div>
    </QuantumCard>
  )
}
