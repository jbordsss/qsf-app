"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { QuantumHeading } from "@/components/quantum-heading"
import { QuantumCard } from "@/components/quantum-card"
import { Button } from "@/components/ui/button"
import { AccessRequired } from "@/components/access-required"
import { getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User, Podcast } from "@/lib/types"
import { Play, Pause, Clock, Calendar, Download, Headphones } from "lucide-react"

// Mock podcasts data
const mockPodcasts: Podcast[] = [
  {
    id: "1",
    title: "The Future of Quantum Computing",
    slug: "future-quantum-computing",
    description: "Exploring the next decade of quantum computing advancements and their impact on society.",
    duration: "45 min",
    date: "May 15, 2025",
    host: "Dr. Sarah Quantum",
  },
  {
    id: "2",
    title: "Quantum Regulatory Landscape",
    slug: "quantum-regulatory-landscape",
    description: "A deep dive into the evolving regulatory frameworks for quantum technologies worldwide.",
    duration: "38 min",
    date: "May 10, 2025",
    host: "Prof. Michael Chen",
  },
  {
    id: "3",
    title: "Quantum Security Briefing",
    slug: "quantum-security-briefing",
    description: "The latest intelligence on quantum security threats and countermeasures.",
    duration: "52 min",
    date: "May 5, 2025",
    host: "Dr. James Wilson",
  },
  {
    id: "4",
    title: "Quantum Computing in Finance",
    slug: "quantum-computing-finance",
    description: "How financial institutions are leveraging quantum computing for competitive advantage.",
    duration: "41 min",
    date: "April 28, 2025",
    host: "Dr. Elena Rodriguez",
  },
  {
    id: "5",
    title: "Quantum Talent: Building the Workforce",
    slug: "quantum-talent-workforce",
    description: "Strategies for developing and recruiting talent in the quantum technology sector.",
    duration: "35 min",
    date: "April 20, 2025",
    host: "Prof. David Quantum",
  },
]

export default function PodcastsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [playingId, setPlayingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <QuantumHeading level={1} className="mb-8">
          Quantum Insights Podcasts
        </QuantumHeading>

        {user && user.accessTier >= 2 ? (
          <div className="space-y-6">
            {mockPodcasts.map((podcast) => (
              <QuantumCard key={podcast.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/5 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-primary/30 hover:bg-primary/50"
                        onClick={() => togglePlay(podcast.id)}
                      >
                        {playingId === podcast.id ? (
                          <Pause className="h-6 w-6 text-primary" />
                        ) : (
                          <Play className="h-6 w-6 text-primary" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-3/5">
                    <h3 className="font-orbitron text-xl font-bold mb-2">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{podcast.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <Headphones className="h-4 w-4 mr-1 text-muted-foreground" />
                        {podcast.host}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {podcast.duration}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        {podcast.date}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/5 flex items-center justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                {playingId === podcast.id && (
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>15:20</span>
                      <span>{podcast.duration}</span>
                    </div>
                  </div>
                )}
              </QuantumCard>
            ))}
          </div>
        ) : (
          <AccessRequired tier={2} showTeaser={false}>
            <div className="space-y-6">
              {mockPodcasts.slice(0, 3).map((podcast) => (
                <QuantumCard key={podcast.id} className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/5 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-12 w-12 rounded-full bg-primary/30 hover:bg-primary/50"
                        >
                          <Play className="h-6 w-6 text-primary" />
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-3/5">
                      <h3 className="font-orbitron text-xl font-bold mb-2">{podcast.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{podcast.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <Headphones className="h-4 w-4 mr-1 text-muted-foreground" />
                          {podcast.host}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {podcast.duration}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {podcast.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </QuantumCard>
              ))}
            </div>
          </AccessRequired>
        )}
      </div>
    </MainLayout>
  )
}
