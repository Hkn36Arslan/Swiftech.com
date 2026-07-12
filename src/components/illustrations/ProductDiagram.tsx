import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * İmza görsel: PDF'teki etiketli sepet diyagramının canlı SVG versiyonu.
 * Gerçek ürün fotoğrafı gelene kadar bu şematik diyagram hero/özellik
 * bölümlerinde kullanılır — jenerik stok görsel yerine ürüne özgü bir dil kurar.
 */

const slatXsTop = [100, 130, 160, 190, 220, 250, 280, 310, 340]
const slatXsBottom = [122, 145, 168, 191, 214, 237, 260, 283, 306, 318]

const callouts = [
  {
    id: "sepet",
    anchor: { x: 150, y: 260 },
    lineEnd: { x: 85, y: 300 },
    label: "22L Sepet",
    align: "end" as const,
  },
  {
    id: "ekran",
    anchor: { x: 380, y: 178 },
    lineEnd: { x: 505, y: 96 },
    label: "7″ Ekran",
    align: "start" as const,
  },
  {
    id: "kamera",
    anchor: { x: 380, y: 250 },
    lineEnd: { x: 505, y: 300 },
    label: "Kamera + Barkod",
    align: "start" as const,
  },
]

export function ProductDiagram({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 640 420"
      className={cn("w-full h-auto overflow-visible", className)}
      role="img"
      aria-label="OkuGör Dijital Sepet şematik diyagramı: 7 inç tablet ekran, kamera ile barkod okuma ve 22 litre sert plastik sepet gövdesi"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <defs>
        <linearGradient id="basket-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-blue-500)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-blue-600)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Sepet gövdesi */}
      <motion.g
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Kulp */}
        <path
          d="M170,96 C170,36 270,36 270,96"
          stroke="var(--color-slate-900)"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
        {/* Rim */}
        <rect x={56} y={92} width={308} height={22} rx={9} fill="var(--color-blue-600)" />
        {/* Gövde */}
        <path
          d="M100,114 L340,114 L318,340 L122,340 Z"
          fill="url(#basket-fill)"
          stroke="var(--color-blue-600)"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* Dikey lataflar */}
        {slatXsTop.map((xTop, i) => (
          <line
            key={i}
            x1={xTop}
            y1={118}
            x2={slatXsBottom[i]}
            y2={336}
            stroke="var(--color-blue-600)"
            strokeOpacity={0.35}
            strokeWidth={2}
          />
        ))}

        {/* Tablet gövdesi */}
        <rect
          x={340}
          y={150}
          width={80}
          height={112}
          rx={12}
          fill="var(--color-navy-950)"
          stroke="var(--color-blue-500)"
          strokeWidth={2.5}
        />
        <rect x={349} y={160} width={62} height={78} rx={5} fill="var(--color-navy-900)" />
        <rect x={355} y={168} width={50} height={8} rx={2} fill="var(--color-blue-500)" opacity={0.6} />
        <rect x={355} y={182} width={38} height={6} rx={2} fill="var(--color-slate-600)" opacity={0.8} />
        <rect x={355} y={194} width={44} height={6} rx={2} fill="var(--color-slate-600)" opacity={0.6} />

        {/* Kamera noktası */}
        <circle cx={380} cy={250} r={6} fill="var(--color-brand-orange)" />
        {!reduceMotion && (
          <motion.circle
            cx={380}
            cy={250}
            fill="none"
            stroke="var(--color-brand-orange)"
            strokeWidth={2}
            initial={{ r: 6, opacity: 0.7 }}
            animate={{ r: [6, 16, 6], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.g>

      {/* Callout'lar */}
      {callouts.map((c, i) => (
        <motion.g
          key={c.id}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: reduceMotion ? 0 : 0.25 + i * 0.15 },
            },
          }}
        >
          <circle cx={c.anchor.x} cy={c.anchor.y} r={3.5} fill="var(--color-brand-orange)" />
          <motion.line
            x1={c.anchor.x}
            y1={c.anchor.y}
            x2={c.lineEnd.x}
            y2={c.lineEnd.y}
            stroke="var(--color-blue-400)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            initial={reduceMotion ? undefined : { pathLength: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.15, ease: "easeOut" }}
          />
          <text
            x={c.lineEnd.x + (c.align === "end" ? -10 : 10)}
            y={c.lineEnd.y}
            textAnchor={c.align}
            dominantBaseline="middle"
            className="fill-slate-200 text-[13px] font-medium font-sans"
          >
            {c.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  )
}
