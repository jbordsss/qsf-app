import Image from "next/image"
import favicon from "/public/Favicon.ico"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Image src={favicon} alt="Quanta Standard Foundation Logo" width={32} height={32} className="rounded-full" />
      </div>
      <div className="font-orbitron font-bold text-xl">
      </div>
    </div>
  )
}
