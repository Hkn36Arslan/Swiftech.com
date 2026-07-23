import { cn } from "@/lib/utils"
import logoUrl from "@/assets/swiftech-logo-white.png"

export function SwiftechLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Swıftech"
      className={cn("h-10 w-auto object-contain sm:h-12", className)}
    />
  )
}
