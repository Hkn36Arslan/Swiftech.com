import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { AbstractPlaceholder } from "@/components/illustrations/AbstractPlaceholder"
import { RadarSweep } from "@/components/illustrations/RadarSweep"
import { hero } from "@/data/content"
import heroVideoSrc from "@/assets/background.mp4"

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0" aria-hidden="true">
        {heroVideoSrc && !reduceMotion ? (
          <motion.video
            src={heroVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <AbstractPlaceholder seed="b" bold className="absolute inset-0" />
            {!reduceMotion && <RadarSweep originX="72%" originY="32%" />}
          </>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, var(--color-black) 18%, rgb(1 1 1 / 0.35) 45%, transparent 68%), linear-gradient(90deg, var(--color-black) 10%, transparent 55%), linear-gradient(180deg, rgb(1 1 1 / 0.55) 0%, transparent 14%)",
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
