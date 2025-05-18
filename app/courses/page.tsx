"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { QuantumHeading } from "@/components/quantum-heading"
import { QuantumCard } from "@/components/quantum-card"
import { Button } from "@/components/ui/button"
import { AccessRequired } from "@/components/access-required"
import { AccessBadge } from "@/components/access-badge"
import { getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User, Course } from "@/lib/types"
import { BookOpen, Clock, Award, Play } from "lucide-react"

// Mock courses data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Quantum Computing for Financial Services",
    slug: "quantum-computing-financial-services",
    description:
      "Learn how quantum computing can revolutionize risk assessment, fraud detection, and trading algorithms.",
    tier: 3,
    duration: "6 hours",
    modules: 8,
    instructor: "Dr. Sarah Quantum",
  },
  {
    id: "2",
    title: "Quantum Security for Healthcare",
    slug: "quantum-security-healthcare",
    description: "Discover how quantum technologies can enhance data security and privacy in healthcare systems.",
    tier: 3,
    duration: "5 hours",
    modules: 7,
    instructor: "Prof. Michael Chen",
  },
  {
    id: "3",
    title: "Building Quantum Circuits",
    slug: "building-quantum-circuits",
    description: "Master the fundamentals of quantum circuit design and implementation.",
    tier: 4,
    duration: "12 hours",
    modules: 15,
    instructor: "Dr. James Wilson",
  },
  {
    id: "4",
    title: "Quantum Error Correction",
    slug: "quantum-error-correction",
    description: "Learn advanced techniques for error correction in quantum computing systems.",
    tier: 4,
    duration: "8 hours",
    modules: 10,
    instructor: "Dr. Elena Rodriguez",
  },
  {
    id: "5",
    title: "Quantum Algorithms Masterclass",
    slug: "quantum-algorithms-masterclass",
    description: "Deep dive into quantum algorithms and their applications in solving complex problems.",
    tier: 4,
    duration: "14 hours",
    modules: 18,
    instructor: "Prof. David Quantum",
  },
]

export default function CoursesPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  // Filter courses based on user's tier
  const availableCourses = user ? mockCourses.filter((course) => user.accessTier >= course.tier) : []
  const lockedCourses = user ? mockCourses.filter((course) => user.accessTier < course.tier) : mockCourses

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-orbitron text-3xl font-bold mb-4">Access Required</h1>
          <p className="mb-8">You need to be logged in to view your courses.</p>
          <Button onClick={() => router.push("/login")}>Sign In</Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <QuantumHeading level={1} className="mb-8">
          My Courses
        </QuantumHeading>

        {availableCourses.length > 0 ? (
          <div className="space-y-6 mb-12">
            {availableCourses.map((course) => (
              <QuantumCard key={course.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-2">
                      <h3 className="font-orbitron text-xl font-bold mr-2">{course.title}</h3>
                      <AccessBadge tier={course.tier} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                        {course.modules} modules
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-muted-foreground" />
                        {course.instructor}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex items-center justify-end">
                    <Button onClick={() => router.push(`/courses/${course.slug}`)}>
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </QuantumCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-12">
            <p className="text-muted-foreground mb-4">You don't have any courses yet.</p>
            <Button onClick={() => router.push("/membership")}>Upgrade to Access Courses</Button>
          </div>
        )}

        {lockedCourses.length > 0 && (
          <>
            <QuantumHeading level={2} className="mb-6">
              Available Courses
            </QuantumHeading>
            <div className="space-y-6">
              {lockedCourses.map((course) => (
                <AccessRequired key={course.id} tier={course.tier} showTeaser={false}>
                  <QuantumCard className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-2/3">
                        <div className="flex items-center mb-2">
                          <h3 className="font-orbitron text-xl font-bold mr-2">{course.title}</h3>
                          <AccessBadge tier={course.tier} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                            {course.modules} modules
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-1 text-muted-foreground" />
                            {course.instructor}
                          </div>
                        </div>
                      </div>
                    </div>
                  </QuantumCard>
                </AccessRequired>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}
