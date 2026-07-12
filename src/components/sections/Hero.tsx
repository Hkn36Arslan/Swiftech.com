import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GridGlow } from "@/components/illustrations/GridGlow"
import { ProductDiagram } from "@/components/illustrations/ProductDiagram"
import { hero } from "@/data/content"

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-navy-950 pt-20 pb-24 text-white sm:pt-28 sm:pb-32">
      <GridGlow />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a href="#iletisim">
                {hero.primaryCta}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#ozellikler">{hero.secondaryCta}</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <ProductDiagram className="mx-auto max-w-lg" />
        </motion.div>
      </div>
    </section>
  )
}
