import { cn } from "@/lib/utils"

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn("size-8", className)}>
      <rect width="48" height="48" rx="12" fill="var(--color-navy-950)" />
      <path
        d="M12 18h24l-2.6 14.2a3 3 0 0 1-2.95 2.46H17.55a3 3 0 0 1-2.95-2.46L12 18Z"
        stroke="var(--color-blue-500)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M17 18v-2a7 7 0 0 1 14 0v2"
        stroke="var(--color-blue-500)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect
        x="27.5"
        y="21.5"
        width="9"
        height="10"
        rx="1.6"
        fill="var(--color-navy-950)"
        stroke="var(--color-brand-orange)"
        strokeWidth="2"
      />
    </svg>
  )
}

export function OkuGorLogo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Mark />
      <span
        className={cn(
          "font-heading text-lg font-semibold tracking-tight",
          inverted ? "text-white" : "text-slate-900"
        )}
      >
        OkuGör
      </span>
    </div>
  )
}

export function SwiftechWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading text-lg font-bold tracking-tight", className)}>
      <span className="text-brand-orange">SWIF</span>
      <span className="text-slate-400">TECH</span>
    </span>
  )
}
