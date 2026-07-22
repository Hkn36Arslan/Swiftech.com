import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useMediaQuery } from "@/components/ui/3d-carousel"
import { cn } from "@/lib/utils"

type OrbitCard = { key: string; src: string; tilt: number }

const MIN_CARDS = 8
// Kartlara sabit, deterministik bir "dağınık" duruş vermek için (referans
// görseldeki gibi) — Math.random() render sırasında kullanılmıyor.
const TILT_STEP = 47
const TILT_RANGE = 24

function buildCards(images: string[]): OrbitCard[] {
  if (images.length === 0) return []
  const repeats = Math.max(1, Math.ceil(MIN_CARDS / images.length))
  const cards: OrbitCard[] = []
  for (let r = 0; r < repeats; r++) {
    images.forEach((src, i) => {
      const index = cards.length
      cards.push({ key: `${r}-${i}`, src, tilt: ((index * TILT_STEP) % TILT_RANGE) - TILT_RANGE / 2 })
    })
  }
  return cards
}

function OrbitImage({
  card,
  index,
  count,
  orbitRotation,
  tiltX,
  tiltY,
  radius,
  cardSize,
}: {
  card: OrbitCard
  index: number
  count: number
  orbitRotation: MotionValue<number>
  tiltX: MotionValue<number>
  tiltY: MotionValue<number>
  radius: number
  cardSize: number
}) {
  const baseAngle = index * (360 / count)
  const x = useTransform(orbitRotation, (r) => Math.cos(((r + baseAngle) * Math.PI) / 180) * radius)
  const y = useTransform(orbitRotation, (r) => Math.sin(((r + baseAngle) * Math.PI) / 180) * radius)

  return (
    <motion.div
      className="group absolute cursor-pointer overflow-hidden rounded-[20px] bg-gray-900 shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:scale-110"
      style={{
        width: cardSize,
        height: cardSize * 1.25,
        x,
        y,
        rotateX: tiltY,
        rotateY: tiltX,
        rotateZ: card.tilt,
        marginLeft: -cardSize / 2,
        marginTop: -(cardSize * 1.25) / 2,
      }}
    >
      <img src={card.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100" />
    </motion.div>
  )
}

/**
 * Proje detay sayfasının üstünde, galeri görsellerini dairesel bir yörüngede
 * sürekli yavaşça döndüren, fare konumuna göre hafif 3D eğilen kart alanı.
 * `prefers-reduced-motion` durumunda dönüş durur, kartlar sabit kalır.
 */
export function OrbitCarousel({ images, className }: { images: string[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)")

  const orbitRotation = useMotionValue(0)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    orbitRotation.set(orbitRotation.get() + delta * 0.012)
  })

  const cards = buildCards(images)
  const radius = isScreenSizeSm ? 110 : 190
  const cardSize = isScreenSizeSm ? 84 : 128
  // Dairenin gerçek çapı + kart yüksekliği + hover büyümesi/eğim payı —
  // sabit bir Tailwind yüksekliği kartların alttaki başlıkla çakışmasına
  // sebep oluyordu.
  const containerSize = radius * 2 + cardSize * 1.25 + 48

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(relX * 20)
    tiltY.set(relY * -20)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  if (cards.length === 0) return null

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full", className)}
      style={{ height: containerSize, perspective: 1200 }}
    >
      <div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d" }}>
        {cards.map((card, index) => (
          <OrbitImage
            key={card.key}
            card={card}
            index={index}
            count={cards.length}
            orbitRotation={orbitRotation}
            tiltX={tiltX}
            tiltY={tiltY}
            radius={radius}
            cardSize={cardSize}
          />
        ))}
      </div>
    </div>
  )
}
