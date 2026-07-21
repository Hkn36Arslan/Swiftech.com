import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * FeaturedBand gibi büyük, boş kalabilecek soyut alanlar için sürekli
 * dönen radar taraması + periyodik sonar pings animasyonu. Tamamen
 * dekoratif (aria-hidden), lime accent'i sadece ince/geçici bir vurgu
 * olarak kullanır (design-system.md: "büyük alan dolgusu değil, mikro
 * etkileşim"). `prefers-reduced-motion` durumunda hiç render edilmez.
 */
export function RadarSweep({
  originX,
  originY,
  className,
}: {
  originX: string
  originY: string
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Dönen tarama kolu */}
      <motion.div
        className="absolute"
        style={{
          left: originX,
          top: originY,
          width: "140%",
          aspectRatio: "1 / 1",
          translateX: "-50%",
          translateY: "-50%",
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(223, 241, 64, 0.16) 6deg, transparent 34deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Periyodik sonar pings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            left: originX,
            top: originY,
            width: 24,
            height: 24,
            marginLeft: -12,
            marginTop: -12,
            borderColor: "var(--color-lime)",
          }}
          initial={{ scale: 0.3, opacity: 0.6 }}
          animate={{ scale: 14, opacity: 0 }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  )
}
