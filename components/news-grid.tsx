"use client"

import { useState, useEffect } from "react"
import { NewsCard } from "@/components/news-card"
import { fetchArticles } from "@/lib/data"
import { getCurrentUser } from "@/lib/auth"
import type { Article, AccessLevel } from "@/lib/types"

interface NewsGridProps {
  category?: string
  limit?: number
}

export function NewsGrid({ category, limit = 6 }: NewsGridProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [accessLevel, setAccessLevel] = useState<AccessLevel>("public")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Get current user to determine access level
        const user = await getCurrentUser()
        const userAccessLevel = user?.accessLevel || "public"
        setAccessLevel(userAccessLevel)

        // Fetch articles based on access level
        const fetchedArticles = await fetchArticles(category, limit, userAccessLevel)
        setArticles(fetchedArticles)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [category, limit])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
