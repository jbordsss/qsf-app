"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { RelatedArticles } from "@/components/related-articles"
import { ArticleContent } from "@/components/article-content"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { fetchArticle } from "@/lib/data"
import { QuantumCard } from "@/components/quantum-card"
import { QuantumHeading } from "@/components/quantum-heading"
import { AccessRequired } from "@/components/access-required"
import { AccessBadge } from "@/components/access-badge"
import { getCurrentUser } from "@/lib/auth"
import type { Article, AccessLevel } from "@/lib/types"

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [accessLevel, setAccessLevel] = useState<AccessLevel>("public")
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Get current user to determine access level
        const user = await getCurrentUser()
        const userAccessLevel = user?.accessLevel || "public"
        setAccessLevel(userAccessLevel)

        // Fetch article
        const fetchedArticle = await fetchArticle(params.slug)
        setArticle(fetchedArticle)

        // Check if user has access to this article
        if (fetchedArticle) {
          const articleLevel = fetchedArticle.accessLevel || "public"
          const levels: Record<AccessLevel, number> = {
            public: 0,
            member: 1,
            premium: 2,
          }
          setHasAccess(levels[userAccessLevel] >= levels[articleLevel])
        }
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.slug])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-[300px] w-full mb-8 rounded-lg" />
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-orbitron text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center font-orbitron text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8 fade-in">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold">{article.title}</h1>
              {article.accessLevel && article.accessLevel !== "public" && (
                <AccessBadge level={article.accessLevel} size="lg" />
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {article.date}
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                {article.category}
              </div>
            </div>
            <QuantumCard className="h-[300px] md:h-[400px] flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-black"></div>
              <div className="relative z-10 font-orbitron text-2xl text-primary p-8 text-center">{article.title}</div>
            </QuantumCard>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none slide-up">
            {hasAccess ? (
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                  </div>
                }
              >
                <ArticleContent slug={params.slug} />
              </Suspense>
            ) : (
              <AccessRequired level={article.accessLevel || "public"} teaserHeight="400px">
                <ArticleContent slug={params.slug} />
              </AccessRequired>
            )}
          </div>

          <div className="flex justify-center mt-8 pt-8 border-t">
            <Button variant="outline" size="sm" className="mr-2">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </article>

        <section className="mt-16">
          <QuantumHeading level={2}>Related Articles</QuantumHeading>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            }
          >
            <RelatedArticles currentSlug={params.slug} category={article.category} accessLevel={accessLevel} />
          </Suspense>
        </section>
      </div>
    </MainLayout>
  )
}
