import Link from "next/link"
import { QuantumProgress } from "@/components/quantum-progress"
import { fetchTrendingTopics } from "@/lib/data"

export async function TrendingTopics() {
  const topics = await fetchTrendingTopics()

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div key={topic.id} className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Link
              href={`/category/${topic.slug}`}
              className="font-orbitron text-sm hover:text-primary transition-colors"
            >
              {topic.name}
            </Link>
            <span className="text-xs text-muted-foreground">{topic.percentage}%</span>
          </div>
          <QuantumProgress value={topic.percentage} max={100} size="sm" />
        </div>
      ))}
    </div>
  )
}
