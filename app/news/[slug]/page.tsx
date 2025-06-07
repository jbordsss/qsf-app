"use client"

import { use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import type { Article } from "@/lib/types"
import { SingleArticleCard } from "@/components/article-viewer"
import { MainLayout } from "@/components/main-layout"
export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);// ✅ unwrap params safely
  const searchParams = useSearchParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const preload = async () => {
      const raw = searchParams.get("article")
      if (raw) {
        try {
          const parsed: Article = JSON.parse(raw)
          setArticle(parsed)
        } catch (err) {
          console.error("Invalid article JSON")
        }
      }
      setLoaded(true)
    }

    preload()
  }, [searchParams])

  if (!loaded) return <div className="p-8">Loading...</div>

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {article ? (
          <SingleArticleCard slug={article.slug} accessLevel={article.accessLevel || "public"} />
        ) : (
          <SingleArticleCard slug={slug} />
      )}
    </div>
    </MainLayout>
  )
} 