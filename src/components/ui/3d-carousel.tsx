import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const duration = 0.15
const easeOut = [0.32, 0.72, 0, 1] as const
const transition = { duration, ease: easeOut }
const transitionOverlay = { duration: 0.5, ease: easeOut }
const springTransition = { type: "spring", stiffness: 100, damping: 30, mass: 0.1 } as const

/** Az sayıda gerçek görselle bile halkanın dolu/akıcı görünmesi için
 * minimum bir yüz sayısına tamamlanır (görseller tekrar eder). */
const MIN_FACES = 9

type Face = { src: string; key: string }

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
 * kompozisyon bozuluyor ve kartlar dönmüyormuş gibi düz görünüyor. Kamera
 * arkasına geçen (>90°) yüzler CSS backface-visibility güvenilir çalışmadığı
 * için opacity motion value ile ayrıca yumuşakça soluyor.
 */
function PhotoFace({
  rotation,
  baseAngle,
  width,
  radius,
  face,
  onClick,
}: {
  rotation: MotionValue<number>
  baseAngle: number
  width: number
  radius: number
  face: Face
  onClick: () => void
}) {
  const opacity = useTransform(rotation, (r) => {
    const angle = Math.abs(normalizeAngle(r + baseAngle))
    if (angle <= 80) return 1
    if (angle >= 100) return 0
    return 1 - (angle - 80) / 20
  })
  return (
    <motion.div
      className="absolute flex h-full origin-center items-center justify-center bg-gray-950 p-2 sm:p-2.5"
      style={{
        width: `${width}px`,
        opacity,
        transform: `rotateY(${baseAngle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
    >
      <motion.img
        src={face.src}
        alt=""
        layoutId={`img-${face.key}`}
        className="pointer-events-none aspect-square w-full rounded-[16px] object-cover shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
        initial={{ filter: "blur(4px)" }}
        layout="position"
        animate={{ filter: "blur(0px)" }}
        transition={transition}
      />
    </motion.div>
  )
}

function Carousel({
  handleClick,
  faces,
  rotation,
  isCarouselActive,
}: {
  handleClick: (face: Face) => void
  faces: Face[]
  rotation: MotionValue<number>
  isCarouselActive: boolean
}) {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
  // Kart boyutu (faceWidth) ve kartlar arası mesafe (radius) birbirinden
  // bağımsız sabitlenir — kartların dev boyutta çıkmaması ya da üst üste
  // binmemesi için.
  const faceCount = faces.length
  const faceWidth = isScreenSizeSm ? 150 : 220
  const radius = isScreenSizeSm ? 320 : 480
  const cylinderWidth = radius * 2 * Math.PI

  return (
    <div
      className="flex h-full items-center justify-center bg-gray-950"
      style={{
        perspective: "1600px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) =>
          isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isCarouselActive &&
          animate(rotation, rotation.get() + info.velocity.x * 0.05, springTransition)
        }
      >
        {faces.map((face, i) => (
          <PhotoFace
            key={face.key}
            rotation={rotation}
            baseAngle={i * (360 / faceCount)}
            width={faceWidth}
            radius={radius}
            face={face}
            onClick={() => handleClick(face)}
          />
        ))}
      </motion.div>
    </div>
  )
}

/**
 * 21st.dev tarzı 3D döner galeri — sürükle-döndür / sol-sağ ok + tıkla-
 * büyüt (lightbox). Görseller dışarıdan `images` prop'uyla verilir (proje
 * foto galerisi gibi). Radius/gölge/köşe yuvarlaklığı kullanıcının referans
 * görseline göre ayarlandı (bu bileşene özel — sitenin geri kalanındaki 2px
 * radius kuralının bilinçli bir istisnası).
 */
export function ThreeDPhotoCarousel({ images }: { images: string[] }) {
  const [activeFace, setActiveFace] = useState<Face | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const rotation = useMotionValue(0)

  const faces = useMemo<Face[]>(() => {
    if (images.length === 0) return []
    const repeats = Math.max(1, Math.ceil(MIN_FACES / images.length))
    const result: Face[] = []
    for (let r = 0; r < repeats; r++) {
      images.forEach((src, i) => result.push({ src, key: `${r}-${i}` }))
    }
    return result
  }, [images])

  const handleClick = (face: Face) => {
    setActiveFace(face)
    setIsCarouselActive(false)
  }

  const handleClose = () => {
    setActiveFace(null)
    setIsCarouselActive(true)
  }

  const rotate = (direction: 1 | -1) => {
    const step = 360 / faces.length
    animate(rotation, rotation.get() + direction * step, springTransition)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeFace && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeFace.key}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 z-50 m-5 flex items-center justify-center rounded-[16px] bg-black/80 md:m-36 lg:mx-[19rem]"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeFace.key}`}
              src={activeFace.src}
              className="max-h-full max-w-full rounded-[16px]"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px]">
        <Carousel
          handleClick={handleClick}
          faces={faces}
          rotation={rotation}
          isCarouselActive={isCarouselActive}
        />
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => rotate(-1)}
          aria-label="Önceki görsel"
          className="flex size-11 items-center justify-center border border-hairline text-white transition-colors duration-[var(--duration-base)] hover:border-lime hover:text-lime"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => rotate(1)}
          aria-label="Sonraki görsel"
          className="flex size-11 items-center justify-center border border-hairline text-white transition-colors duration-[var(--duration-base)] hover:border-lime hover:text-lime"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  )
}
