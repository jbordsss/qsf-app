"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { MainLayout } from "@/components/main-layout"
import { NewsCard } from "@/components/news-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchArticles } from "@/lib/data"
import type { Article } from "@/lib/types"
import { QuantumHeading } from "@/components/quantum-heading"
import { QuantumLoader } from "@/components/quantum-loader"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const articles = await searchArticles(query)
        setResults(articles)
      } catch (error) {
        console.error("Error searching articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
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

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search for quantum news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-orbitron"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        {query && (
          <div className="mb-8 text-center fade-in">
            <QuantumHeading level={1} className="text-center mx-auto">
              Search Results for <span className="text-primary">"{query}"</span>
            </QuantumHeading>
            <p className="text-muted-foreground">
              {results.length} {results.length === 1 ? "result" : "results"} found
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <QuantumLoader size="lg" className="mb-4" />
            <p className="text-muted-foreground">Searching quantum realms...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
                {results.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              query && (
                <div className="text-center py-12">
                  <QuantumHeading level={2} className="text-center mx-auto mb-4">
                    No results found
                  </QuantumHeading>
                  <p className="text-muted-foreground mb-8">
                    We couldn't find any articles matching your search. Try different keywords or browse our categories.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href="/category/quantum-computing">
                      <Button variant="outline">Quantum Computing</Button>
                    </Link>
                    <Link href="/category/quantum-physics">
                      <Button variant="outline">Quantum Physics</Button>
                    </Link>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </MainLayout>
  )
}
