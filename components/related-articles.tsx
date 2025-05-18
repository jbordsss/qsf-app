"use client"

import { useState, useEffect } from "react"
import { fetchRelatedArticles } from "@/lib/data"
import { NewsCard } from "@/components/news-card"
import type { Article, AccessLevel } from "@/lib/types"

interface RelatedArticlesProps {
  currentSlug: string
  category?: string
  accessLevel?: AccessLevel
}

export function RelatedArticles({ currentSlug, category, accessLevel = "public" }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const fetchedArticles = await fetchRelatedArticles(currentSlug, category, accessLevel)
        setArticles(fetchedArticles)
      } catch (error) {
        console.error("Error fetching related articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentSlug, category, accessLevel])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} variant="compact" />
      ))}
    </div>
  )
}
