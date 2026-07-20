import { cn } from "@/lib/utils"

/**
 * Nötr/soyut placeholder görsel — gerçek proje/ürün görseli henüz yoksa
 * kullanılır (design-system.md: büyük renk dolgusu yok, sadece monokrom +
 * ince grid + tek lime accent çizgisi). `seed` her karta farklı bir
 * kompozisyon verir; gerçek görsel gelince bu component tek noktadan
 * değiştirilir/kaldırılır. `bold` — tam ekran bant gibi büyük, boş
 * görünmemesi gereken alanlarda kullanılır (daha güçlü grid + halka +
 * gradient).
 */
const seeds = {
  a: { x: "22%", y: "20%", accent: true },
  b: { x: "80%", y: "70%", accent: false },
  c: { x: "50%", y: "88%", accent: false },
} as const

export function AbstractPlaceholder({
  seed = "a",
  bold = false,
  className,
}: {
  seed?: keyof typeof seeds
  bold?: boolean
  className?: string
}) {
  const cfg = seeds[seed]

  return (
    <div
      aria-hidden="true"
      className={cn("relative h-full w-full overflow-hidden bg-gray-950", className)}
      style={{
        backgroundImage: `radial-gradient(circle at ${cfg.x} ${cfg.y}, var(--color-gray-700) 0%, transparent ${bold ? "70%" : "55%"})`,
      }}
    >
      <svg className={cn("absolute inset-0 h-full w-full", bold ? "opacity-[0.35]" : "opacity-[0.25]")}>
        <defs>
          <pattern id={`grid-${seed}`} width={bold ? "56" : "28"} height={bold ? "56" : "28"} patternUnits="userSpaceOnUse">
            <path
              d={bold ? "M56 0H0V56" : "M28 0H0V28"}
              fill="none"
              stroke="var(--color-gray-500)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
      </svg>

      {bold && (
        <svg className="absolute inset-0 h-full w-full opacity-[0.5]" preserveAspectRatio="none">
          <circle
            cx={cfg.x}
            cy={cfg.y}
            r="18%"
            fill="none"
            stroke="var(--color-gray-400)"
            strokeWidth="1"
          />
          <circle
            cx={cfg.x}
            cy={cfg.y}
            r="32%"
            fill="none"
            stroke="var(--color-gray-500)"
            strokeWidth="1"
          />
          <circle
            cx={cfg.x}
            cy={cfg.y}
            r="46%"
            fill="none"
            stroke="var(--color-gray-700)"
            strokeWidth="1"
          />
        </svg>
      )}

      {cfg.accent && (
        <div
          className="absolute h-px w-2/3"
          style={{
            top: cfg.y,
            left: cfg.x,
            background: "linear-gradient(90deg, var(--color-lime) 0%, transparent 100%)",
          }}
        />
      )}
      {bold && (
        <div
          className="absolute h-2/3 w-px"
          style={{
            top: cfg.y,
            left: cfg.x,
            background: "linear-gradient(180deg, var(--color-lime) 0%, transparent 100%)",
          }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, var(--color-black) 95%)",
        }}
      />
    </div>
  )
}
