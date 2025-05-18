import type React from "react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface QuantumCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  onClick?: () => void
  as?: React.ElementType
  href?: string
}

export function QuantumCard({
  children,
  className,
  glowColor = "#03a0fa",
  onClick,
  as: Component = "div",
  href,
  ...props
}: QuantumCardProps) {
  const cardProps = {
    className: cn("quantum-card", className),
    onClick,
    ...props,
  }

  if (href) {
    return (
      <a href={href} {...cardProps}>
        <CardContent glowColor={glowColor}>{children}</CardContent>
      </a>
    )
  }

  return (
    <Component {...cardProps}>
      <CardContent glowColor={glowColor}>{children}</CardContent>
    </Component>
  )
}

function CardContent({ children, glowColor }: { children: ReactNode; glowColor: string }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      {children}
    </>
  )
}
