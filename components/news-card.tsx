import Link from "next/link"
import { Calendar } from "lucide-react"
import type { Article } from "@/lib/types"
import { cn } from "@/lib/utils"
import { QuantumCard } from "@/components/quantum-card"
import { AccessBadge } from "@/components/access-badge"

interface NewsCardProps {
  article: Article
  variant?: "default" | "compact"
  className?: string
}

export function NewsCard({ article, variant = "default", className }: NewsCardProps) {
  return (
    <Link href={`/news/${article.slug}`} className="block group">
      <QuantumCard className={cn("h-full transition-all duration-300 hover:translate-y-[-5px]", className)}>
        <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
          <div className="font-orbitron text-xl text-primary/70 p-4 text-center transition-all group-hover:scale-105 group-hover:text-primary">
            {article.title.split(" ").slice(0, 3).join(" ")}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-orbitron px-2 py-1 rounded-full bg-primary/10 text-primary">
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {article.date}
            </span>
            {article.accessLevel && article.accessLevel !== "public" && (
              <AccessBadge level={article.accessLevel} size="sm" className="ml-auto" />
            )}
          </div>
          <h3 className="font-orbitron text-lg font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          {variant === "default" && <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>}
        </div>
      </QuantumCard>
    </Link>
  )
}
