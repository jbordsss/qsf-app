import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { NewsGrid } from "@/components/news-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategoryName } from "@/lib/utils"
import { QuantumHeading } from "@/components/quantum-heading"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = getCategoryName(params.slug)

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

        <header className="mb-12 text-center">
          <QuantumHeading level={1} className="text-center mx-auto fade-in">
            {categoryName}
          </QuantumHeading>
          <p className="text-muted-foreground max-w-2xl mx-auto slide-up">
            The latest news and discoveries in the field of {categoryName.toLowerCase()}.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
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
          <NewsGrid category={params.slug} limit={12} />
        </Suspense>
      </div>
    </MainLayout>
  )
}
