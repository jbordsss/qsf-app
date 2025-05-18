import Link from "next/link"
import { fetchTopics } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export async function TopicsList() {
  const topics = await fetchTopics()

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <Link key={topic.id} href={`/category/${topic.slug}`}>
          <Badge
            variant="outline"
            className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/30 font-orbitron cursor-pointer transition-all hover:scale-105"
          >
            {topic.name}
            <span className="ml-1 text-xs text-muted-foreground">({topic.count})</span>
          </Badge>
        </Link>
      ))}
    </div>
  )
}
