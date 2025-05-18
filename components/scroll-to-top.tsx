"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Throttle scroll events for better performance
    let scrollTimeout: number

    const toggleVisibility = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        setIsVisible(window.scrollY > 300)
      }, 100)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => {
      clearTimeout(scrollTimeout)
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="rounded-full bg-primary/20 hover:bg-primary/40 backdrop-blur-sm border border-primary/30 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}
