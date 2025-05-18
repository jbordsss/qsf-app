import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fetchFeaturedArticle } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { QuantumCard } from "@/components/quantum-card"

export async function FeaturedArticle() {
  const article = await fetchFeaturedArticle()

  if (!article) {
    return null
  }

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
            <Link href={`/news/${article.slug}`}>
              <Button className="group">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 h-[200px] md:h-auto bg-gradient-to-r from-primary/5 to-primary/20 flex items-center justify-center">
          <div className="font-orbitron text-4xl text-primary/80 p-8 text-center">
            {article.title.split(" ").slice(0, 3).join(" ")}
          </div>
        </div>
      </div>
    </QuantumCard>
  )
}
