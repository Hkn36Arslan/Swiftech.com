import { cn } from "@/lib/utils"
import logoUrl from "@/assets/swiftech-logo.png"

export function SwiftechLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Swiftech"
      className={cn("h-10 w-auto object-contain sm:h-12", className)}
    />
  )
}
