import { memo, useMemo } from "react"
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/components/ui/3d-carousel"

export type TextCard = {
  lead: string
  body: string
}

/** rotation'ı [-180, 180] aralığına normalize eder. */
function normalizeAngle(angle: number) {
  let a = angle % 360
  if (a < -180) a += 360
  if (a > 180) a -= 360
  return a
}

/**
 * Tek bir yüz. Dönüş (rotateY) ve dışa doğru itme (translateZ) TEK bir
 * transform string'inde birleştirilir — ayrı elemanlara bölünürse 3D
 * kompozisyon bozuluyor ve kartlar dönmüyormuş gibi düz görünüyor.
 * Kamera arkasına geçen (>90°) yüzler CSS backface-visibility güvenilir
 * çalışmadığı için opacity motion value ile ayrıca yumuşakça soluyor.
 */
function Face({
  rotation,
  baseAngle,
  width,
  radius,
  children,
}: {
  rotation: MotionValue<number>
  baseAngle: number
  width: number
  radius: number
  children: React.ReactNode
}) {
  const opacity = useTransform(rotation, (r) => {
    const angle = Math.abs(normalizeAngle(r + baseAngle))
    if (angle <= 80) return 1
    if (angle >= 100) return 0
    return 1 - (angle - 80) / 20
  })
  return (
    <motion.div
      className="absolute flex h-full origin-center items-center justify-center p-1.5 sm:p-2"
      style={{
        width: `${width}px`,
        opacity,
        transform: `rotateY(${baseAngle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

const springTransition = { type: "spring", stiffness: 100, damping: 30, mass: 0.1 } as const

const Ring = memo(
  ({
    cards,
    rotation,
    isActive,
  }: {
    cards: TextCard[]
    rotation: MotionValue<number>
    isActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const faceCount = cards.length
    const faceWidth = isScreenSizeSm ? 260 : 340
    const radius = isScreenSizeSm ? 380 : 560
    const cylinderWidth = radius * 2 * Math.PI

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1800px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isActive ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) => isActive && rotation.set(rotation.get() + info.offset.x * 0.05)}
          onDragEnd={(_, info) =>
            isActive && animate(rotation, rotation.get() + info.velocity.x * 0.05, springTransition)
          }
        >
          {cards.map((card, i) => (
            <Face
              key={card.lead}
              rotation={rotation}
              baseAngle={i * (360 / faceCount)}
              width={faceWidth}
              radius={radius}
            >
              <div className="flex h-full w-full flex-col justify-center rounded-[16px] bg-gray-950 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.4)] sm:p-8">
                <h3 className="text-h3 text-white">
                  {card.lead}
                  <span className="mt-2 block h-px w-8 bg-lime" aria-hidden="true" />
                </h3>
                <p className="text-body mt-4 line-clamp-6">{card.body}</p>
              </div>
            </Face>
          ))}
        </motion.div>
      </div>
    )
  }
)
Ring.displayName = "Ring"

/**
 * Hakkımızda'nın 6 içerik kartını 3D döner bir halka olarak sunar — sürükle-
 * döndür ya da sol/sağ oklarla. ThreeDPhotoCarousel ile aynı geometri/
 * etkileşim dilini paylaşır, ancak yüzler resim değil gerçek başlık+
 * açıklama kartlarıdır.
 */
export function ThreeDCardCarousel({ cards }: { cards: TextCard[] }) {
  const items = useMemo(() => cards, [cards])
  const rotation = useMotionValue(0)
  const faceCount = items.length

  const rotate = (direction: 1 | -1) => {
    const step = 360 / faceCount
    animate(rotation, rotation.get() + direction * step, springTransition)
  }

  return (
    <div className="relative">
      <div className="relative h-[300px] w-full overflow-hidden sm:h-[340px]">
        <Ring cards={items} rotation={rotation} isActive />
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => rotate(-1)}
          aria-label="Önceki kart"
          className="flex size-11 items-center justify-center border border-hairline text-white transition-colors duration-[var(--duration-base)] hover:border-lime hover:text-lime"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => rotate(1)}
          aria-label="Sonraki kart"
          className="flex size-11 items-center justify-center border border-hairline text-white transition-colors duration-[var(--duration-base)] hover:border-lime hover:text-lime"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
