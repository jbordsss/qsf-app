import { Suspense } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/main-layout"
import { FeaturedArticle } from "@/components/featured-article"
import { NewsGrid } from "@/components/news-grid"
import { TopicsList } from "@/components/topics-list"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Skeleton } from "@/components/ui/skeleton"
import { QuantumHeading } from "@/components/quantum-heading"
import { TrendingTopics } from "@/components/trending-topics"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <QuantumHeading level={2}>Featured Stories</QuantumHeading>
          <Suspense fallback={<div className="h-[400px] w-full bg-muted animate-pulse rounded-lg"></div>}>
            <FeaturedArticle />
          </Suspense>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <QuantumHeading level={2}>Latest News</QuantumHeading>
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    ))}
                  </div>
                }
              >
                <NewsGrid category="latest" />
              </Suspense>
            </section>

            <section className="mb-12">
              <QuantumHeading level={2}>Quantum Computing</QuantumHeading>
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    ))}
                  </div>
                }
              >
                <NewsGrid category="quantum-computing" limit={4} />
              </Suspense>
              <div className="mt-4 text-center">
                <Link
                  href="/category/quantum-computing"
                  className="inline-block font-orbitron bg-primary/10 hover:bg-primary/20 text-primary px-6 py-2 rounded-md transition-all duration-300"
                >
                  View All Quantum Computing News
                </Link>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <section className="mb-12 bg-black/50 p-6 rounded-lg">
              <QuantumHeading level={3}>Popular Topics</QuantumHeading>
              <Suspense
                fallback={
                  <div className="flex flex-col gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                }
              >
                <TopicsList />
              </Suspense>
            </section>

            <section className="mb-12 bg-black/50 p-6 rounded-lg">
              <QuantumHeading level={3}>Trending Now</QuantumHeading>
              <Suspense
                fallback={
                  <div className="flex flex-col gap-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                }
              >
                <TrendingTopics />
              </Suspense>
            </section>

            <section className="mb-12 bg-primary/5 p-6 rounded-lg">
              <QuantumHeading level={3}>Newsletter</QuantumHeading>
              <NewsletterSignup />
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
