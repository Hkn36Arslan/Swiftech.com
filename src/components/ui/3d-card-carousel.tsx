import { memo, useMemo } from "react"
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useMediaQuery } from "@/components/ui/3d-carousel"

type AnimationControls = ReturnType<typeof useAnimation>

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
 * Tek bir yüz — halkanın güncel rotation'ına göre kamera arkasına geçtiğinde
 * (>90°) yumuşakça solar. CSS `backface-visibility` bazı tarayıcı/compositor
 * kombinasyonlarında güvenilir çalışmadığı (yüz aynalanmış görünebiliyor)
 * için opacity motion value ile açıkça kontrol ediliyor.
 */
function Face({
  rotation,
  baseAngle,
  width,
  children,
}: {
  rotation: MotionValue<number>
  baseAngle: number
  width: number
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
        rotateY: baseAngle,
        opacity,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

const Ring = memo(
  ({
    controls,
    cards,
    isActive,
  }: {
    controls: AnimationControls
    cards: TextCard[]
    isActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const faceCount = cards.length
    const faceWidth = isScreenSizeSm ? 260 : 340
    const radius = isScreenSizeSm ? 380 : 560
    const cylinderWidth = radius * 2 * Math.PI
    const rotation = useMotionValue(0)

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
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) => isActive && rotation.set(rotation.get() + info.offset.x * 0.05)}
          onDragEnd={(_, info) =>
            isActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
            })
          }
          animate={controls}
        >
          {cards.map((card, i) => {
            const baseAngle = i * (360 / faceCount)
            return (
              <Face key={card.lead} rotation={rotation} baseAngle={baseAngle} width={faceWidth}>
                <div
                  className="flex h-full w-full flex-col justify-center bg-gray-950 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.4)] sm:p-8"
                  style={{ transform: `translateZ(${radius}px)` }}
                >
                  <h3 className="text-h3 text-white">
                    {card.lead}
                    <span className="mt-2 block h-px w-8 bg-lime" aria-hidden="true" />
                  </h3>
                  <p className="text-body mt-4 line-clamp-6">{card.body}</p>
                </div>
              </Face>
            )
          })}
        </motion.div>
      </div>
    )
  }
)
Ring.displayName = "Ring"

/**
 * Hakkımızda'nın 6 içerik kartını 3D döner bir halka olarak sunar (sürükle-
 * döndür). ThreeDPhotoCarousel ile aynı geometri/etkileşim dilini paylaşır,
 * ancak yüzler resim değil gerçek başlık+açıklama kartlarıdır — metin
 * gösterdiği için lightbox/büyütme yok.
 */
export function ThreeDCardCarousel({ cards }: { cards: TextCard[] }) {
  const controls = useAnimation()
  const items = useMemo(() => cards, [cards])

  return (
    <div className="relative h-[300px] w-full overflow-hidden sm:h-[340px]">
      <Ring controls={controls} cards={items} isActive />
    </div>
  )
}
