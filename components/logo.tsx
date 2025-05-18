import { Atom } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/30 rounded-full blur-sm opacity-70 animate-pulse"></div>
        <div className="relative">
          <Atom className="h-8 w-8 text-primary" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-orbitron font-bold text-white text-xs">
            QS
          </div>
        </div>
      </div>
      <div className="font-orbitron font-bold text-xl">
        <span className="text-white">Quanta</span>
        <span className="text-primary">Standard</span>
      </div>
    </div>
  )
}
