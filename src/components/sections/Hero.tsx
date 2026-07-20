import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { ProductDiagram } from "@/components/illustrations/ProductDiagram"
import { hero } from "@/data/content"

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      {/* Full-bleed görsel katman */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 78% 42%, var(--color-gray-900) 0%, transparent 60%)",
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="var(--color-gray-500)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute right-[4%] top-1/2 w-[42%] min-w-[320px] -translate-y-1/2 sm:right-[8%]"
        >
          <ProductDiagram />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, var(--color-black) 12%, transparent 45%), linear-gradient(90deg, var(--color-black) 8%, transparent 48%)",
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-20 sm:px-6 sm:pb-28 lg:px-10">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-nav text-lime">{hero.eyebrow}</span>
          <h1 className="text-h1 mt-4 text-white text-balance">{hero.title}</h1>
          <p className="text-body mt-5 max-w-xl text-base">{hero.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#iletisim"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius)] border border-lime bg-lime px-6 text-nav text-black transition-colors duration-[var(--duration-base)] hover:bg-transparent hover:text-white"
            >
              {hero.primaryCta}
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#projeler"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] border border-hairline px-6 text-nav text-white transition-colors duration-[var(--duration-base)] hover:border-lime"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
