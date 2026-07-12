import { cn } from "@/lib/utils"

/**
 * Koyu bölümler (Hero, CTA, Footer) için tech-grid + glow arka planı.
 * Tamamen dekoratif — ekran okuyuculardan gizlenir.
 */
export function GridGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-blue-600) 0%, transparent 70%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.15]">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="var(--color-blue-400)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--color-navy-950) 90%)",
        }}
      />
    </div>
  )
}
