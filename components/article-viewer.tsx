"use client"

import { useEffect, useState } from "react"
import type { Article, AccessLevel } from "@/lib/types"
import { fetchArticles } from "@/lib/data"
import { QuantumCard } from "@/components/quantum-card"
import { Calendar, User, Tag } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { AccessBadge } from "@/components/access-badge"
import { useSearchParams } from "next/navigation"

interface SingleArticleCardProps {
  slug: string
  accessLevel?: AccessLevel
}

export function SingleArticleCard({ slug, accessLevel = "public" }: SingleArticleCardProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      const raw = searchParams.get("article")
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          setArticle(parsed)
          setIsLoading(false)
          return
        } catch (err) {
          console.error("❌ Failed to parse article from query:", err)
        }
      }

      try {
        const articles = await fetchArticles(undefined, 20, accessLevel)
        const found = articles.find((a) => a.slug === slug)
        setArticle(found || null)
      } catch (err) {
        console.error("Error loading article:", err)
        setArticle(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug, accessLevel, searchParams])

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-lg" />
  }

  if (!article) {
    return <div className="text-muted-foreground">Article not found.</div>
  }

  return (
    <QuantumCard className="p-6 space-y-4">
      <h1 className="font-orbitron text-4xl font-bold">{article.title}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{article.date}</div>
        <div className="flex items-center"><User className="w-4 h-4 mr-2" />{article.author}</div>
        <div className="flex items-center"><Tag className="w-4 h-4 mr-2" />{article.category}</div>
        {article.accessLevel !== "public" && (
          <AccessBadge level={article.accessLevel} size="sm" className="ml-auto" />
        )}
      </div>
      <p className="text-muted-foreground">{article.excerpt}</p>
    </QuantumCard>
  )
}
