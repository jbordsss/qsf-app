import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryName(slug: string): string {
  const categories: Record<string, string> = {
    "quantum-computing": "Quantum Computing",
    "quantum-physics": "Quantum Physics",
    "quantum-technology": "Quantum Technology",
    "quantum-research": "Quantum Research",
    "quantum-entanglement": "Quantum Entanglement",
    "quantum-cryptography": "Quantum Cryptography",
    "quantum-sensors": "Quantum Sensors",
    "quantum-internet": "Quantum Internet",
  }

  return (
    categories[slug] ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  )
}
