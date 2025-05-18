import type { Article, Topic, AccessLevel } from "@/lib/types"

// Mock data - in a real app, this would be fetched from an API
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Quantum Computing Breakthrough: 1000 Qubit Processor Unveiled",
    slug: "quantum-computing-breakthrough-1000-qubit-processor",
    excerpt:
      "Scientists have achieved a major milestone in quantum computing with the development of a 1000 qubit processor that could revolutionize the field.",
    date: "May 15, 2025",
    author: "Dr. Quantum",
    category: "quantum-computing",
    tags: ["quantum computing", "qubits", "processor", "breakthrough"],
    featured: true,
    accessLevel: "public",
  },
  {
    id: "2",
    title: "Quantum Entanglement Observed Between Macroscopic Objects",
    slug: "quantum-entanglement-macroscopic-objects",
    excerpt:
      "For the first time, researchers have observed quantum entanglement between two macroscopic objects, challenging our understanding of quantum mechanics.",
    date: "May 12, 2025",
    author: "Sarah Quantum",
    category: "quantum-physics",
    tags: ["quantum entanglement", "quantum physics", "research"],
    accessLevel: "public",
  },
  {
    id: "3",
    title: "Quantum Internet: First Intercontinental Quantum Network Established",
    slug: "quantum-internet-first-intercontinental-network",
    excerpt:
      "The world's first intercontinental quantum network has been established, marking a significant step toward a global quantum internet.",
    date: "May 10, 2025",
    author: "John Quantum",
    category: "quantum-technology",
    tags: ["quantum internet", "quantum network", "technology"],
    accessLevel: "member",
  },
  {
    id: "4",
    title: "Quantum Sensors Detect Dark Matter Candidates",
    slug: "quantum-sensors-detect-dark-matter",
    excerpt:
      "Advanced quantum sensors have detected potential dark matter candidates, bringing us closer to solving one of the biggest mysteries in physics.",
    date: "May 8, 2025",
    author: "Lisa Quantum",
    category: "quantum-physics",
    tags: ["quantum sensors", "dark matter", "physics"],
    accessLevel: "public",
  },
  {
    id: "5",
    title: "Quantum Machine Learning Algorithm Outperforms Classical Methods",
    slug: "quantum-machine-learning-outperforms-classical",
    excerpt:
      "A new quantum machine learning algorithm has demonstrated superior performance compared to classical methods for specific computational problems.",
    date: "May 5, 2025",
    author: "Michael Quantum",
    category: "quantum-computing",
    tags: ["quantum machine learning", "algorithm", "AI"],
    accessLevel: "member",
  },
  {
    id: "6",
    title: "Quantum Cryptography: Unbreakable Encryption Now Commercially Available",
    slug: "quantum-cryptography-unbreakable-encryption",
    excerpt:
      "Quantum cryptography systems offering theoretically unbreakable encryption are now commercially available for businesses and governments.",
    date: "May 3, 2025",
    author: "Emma Quantum",
    category: "quantum-technology",
    tags: ["quantum cryptography", "encryption", "security"],
    accessLevel: "public",
  },
  {
    id: "7",
    title: "Quantum Teleportation Record: Information Transmitted Over 100 Miles",
    slug: "quantum-teleportation-record-100-miles",
    excerpt:
      "Scientists have set a new record for quantum teleportation, successfully transmitting quantum information over a distance of 100 miles.",
    date: "April 30, 2025",
    author: "David Quantum",
    category: "quantum-physics",
    tags: ["quantum teleportation", "quantum information", "record"],
    accessLevel: "premium",
  },
  {
    id: "8",
    title: "Quantum Error Correction Achieves 99.9% Accuracy",
    slug: "quantum-error-correction-accuracy",
    excerpt:
      "Researchers have developed a quantum error correction technique that achieves 99.9% accuracy, addressing a major challenge in quantum computing.",
    date: "April 28, 2025",
    author: "Alex Quantum",
    category: "quantum-computing",
    tags: ["quantum error correction", "quantum computing", "accuracy"],
    accessLevel: "member",
  },
  {
    id: "9",
    title: "Quantum Radar Technology Detects Stealth Aircraft",
    slug: "quantum-radar-detects-stealth-aircraft",
    excerpt:
      "New quantum radar technology has successfully detected stealth aircraft in tests, potentially revolutionizing defense systems worldwide.",
    date: "April 25, 2025",
    author: "James Quantum",
    category: "quantum-technology",
    tags: ["quantum radar", "stealth technology", "defense"],
    accessLevel: "premium",
  },
  {
    id: "10",
    title: "Quantum Simulation Solves Complex Molecular Structure",
    slug: "quantum-simulation-molecular-structure",
    excerpt:
      "A quantum computer has successfully simulated a complex molecular structure that was previously impossible to model with classical computers.",
    date: "April 22, 2025",
    author: "Olivia Quantum",
    category: "quantum-computing",
    tags: ["quantum simulation", "molecular structure", "chemistry"],
    accessLevel: "member",
  },
  {
    id: "11",
    title: "Quantum Gravity Theory Gains Experimental Support",
    slug: "quantum-gravity-theory-experimental-support",
    excerpt:
      "A leading quantum gravity theory has received experimental support for the first time, potentially bridging quantum mechanics and general relativity.",
    date: "April 20, 2025",
    author: "Robert Quantum",
    category: "quantum-physics",
    tags: ["quantum gravity", "theory", "physics"],
    accessLevel: "premium",
  },
  {
    id: "12",
    title: "Quantum Batteries Promise Ultra-Fast Charging",
    slug: "quantum-batteries-ultra-fast-charging",
    excerpt:
      "Researchers have developed prototype quantum batteries that can charge in seconds and hold more energy than conventional batteries.",
    date: "April 18, 2025",
    author: "Sophia Quantum",
    category: "quantum-technology",
    tags: ["quantum batteries", "energy", "technology"],
    accessLevel: "public",
  },
]

const mockTopics: Topic[] = [
  { id: "1", name: "Quantum Computing", slug: "quantum-computing", count: 42 },
  { id: "2", name: "Quantum Physics", slug: "quantum-physics", count: 38 },
  { id: "3", name: "Quantum Technology", slug: "quantum-technology", count: 27 },
  { id: "4", name: "Quantum Research", slug: "quantum-research", count: 19 },
  { id: "5", name: "Quantum Entanglement", slug: "quantum-entanglement", count: 15 },
  { id: "6", name: "Quantum Cryptography", slug: "quantum-cryptography", count: 12 },
  { id: "7", name: "Quantum Sensors", slug: "quantum-sensors", count: 9 },
  { id: "8", name: "Quantum Internet", slug: "quantum-internet", count: 7 },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch featured article
export async function fetchFeaturedArticle(): Promise<Article | null> {
  await delay(500)
  return mockArticles.find((article) => article.featured) || mockArticles[0]
}

// Fetch articles with optional category filter and limit
export async function fetchArticles(
  category?: string,
  limit = 6,
  accessLevel: AccessLevel = "public",
): Promise<Article[]> {
  await delay(500)

  let filteredArticles = [...mockArticles]

  if (category && category !== "latest") {
    filteredArticles = filteredArticles.filter((article) => article.category === category)
  }

  // Filter by access level
  const levels: Record<AccessLevel, number> = {
    public: 0,
    member: 1,
    premium: 2,
  }

  filteredArticles = filteredArticles.filter((article) => {
    const articleLevel = article.accessLevel || "public"
    return levels[articleLevel] <= levels[accessLevel]
  })

  return filteredArticles.slice(0, limit)
}

// Fetch a single article by slug
export async function fetchArticle(slug: string): Promise<Article | null> {
  await delay(300)
  return mockArticles.find((article) => article.slug === slug) || null
}

// Fetch article content
export async function fetchArticleContent(slug: string): Promise<string> {
  await delay(400)

  // In a real app, this would fetch the actual content from an API
  return `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
    <p>Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.</p>
    <h2>Key Concepts in Quantum Mechanics</h2>
    <p>Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary (macroscopic) scale, while quantum mechanics explains the aspects of nature at small (atomic and subatomic) scales, for which classical mechanics is insufficient.</p>
    <p>Most theories in classical physics can be derived from quantum mechanics as an approximation valid at large (macroscopic) scale. Quantum mechanics differs from classical physics in that energy, momentum, angular momentum, and other quantities of a bound system are restricted to discrete values (quantization), objects have characteristics of both particles and waves (wave-particle duality), and there are limits to how accurately the value of a physical quantity can be predicted prior to its measurement, given a complete set of initial conditions (the uncertainty principle).</p>
    <h2>Applications of Quantum Mechanics</h2>
    <p>Quantum mechanics gradually arose from theories to explain observations which could not be reconciled with classical physics, such as Max Planck's solution in 1900 to the black-body radiation problem, and the correspondence between energy and frequency in Albert Einstein's 1905 paper which explained the photoelectric effect.</p>
    <p>The modern theory is formulated in various specially developed mathematical formalisms. In one of them, a mathematical entity called the wave function provides information, in the form of probability amplitudes, about what measurements of a particle's energy, momentum, and other physical properties may yield.</p>
  `
}

// Fetch related articles
export async function fetchRelatedArticles(
  currentSlug: string,
  category?: string,
  accessLevel: AccessLevel = "public",
): Promise<Article[]> {
  await delay(400)

  let filteredArticles = [...mockArticles].filter((article) => article.slug !== currentSlug)

  if (category) {
    filteredArticles = filteredArticles.filter((article) => article.category === category)
  }

  // Filter by access level
  const levels: Record<AccessLevel, number> = {
    public: 0,
    member: 1,
    premium: 2,
  }

  filteredArticles = filteredArticles.filter((article) => {
    const articleLevel = article.accessLevel || "public"
    return levels[articleLevel] <= levels[accessLevel]
  })

  // Shuffle and return 3 articles
  return filteredArticles.sort(() => 0.5 - Math.random()).slice(0, 3)
}

// Fetch topics
export async function fetchTopics(): Promise<Topic[]> {
  await delay(300)
  return mockTopics
}

// Search articles
export async function searchArticles(query: string, accessLevel: AccessLevel = "public"): Promise<Article[]> {
  await delay(600)

  const normalizedQuery = query.toLowerCase()

  let filteredArticles = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.excerpt.toLowerCase().includes(normalizedQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
  )

  // Filter by access level
  const levels: Record<AccessLevel, number> = {
    public: 0,
    member: 1,
    premium: 2,
  }

  filteredArticles = filteredArticles.filter((article) => {
    const articleLevel = article.accessLevel || "public"
    return levels[articleLevel] <= levels[accessLevel]
  })

  return filteredArticles
}

// Fetch trending topics with popularity percentages
export async function fetchTrendingTopics(): Promise<Array<Topic & { percentage: number }>> {
  await delay(300)

  return [
    { ...mockTopics[0], percentage: 85 },
    { ...mockTopics[1], percentage: 72 },
    { ...mockTopics[2], percentage: 64 },
    { ...mockTopics[5], percentage: 58 },
    { ...mockTopics[3], percentage: 45 },
  ]
}
