import { QuantumTooltip } from "@/components/quantum-tooltip"
import { cn } from "@/lib/utils"

interface QuantumTermProps {
  term: string
  definition: string
  className?: string
}

export function QuantumTerm({ term, definition, className }: QuantumTermProps) {
  return (
    <QuantumTooltip content={definition}>
      <span
        className={cn("font-orbitron text-primary border-b border-dashed border-primary/50 cursor-help", className)}
      >
        {term}
      </span>
    </QuantumTooltip>
  )
}
