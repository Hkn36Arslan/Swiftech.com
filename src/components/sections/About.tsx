import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { ThreeDCardCarousel } from "@/components/ui/3d-card-carousel"
import { about } from "@/data/content"

/**
 * Hakkımızda — başlık + kısa giriş + 6 içerik kartının 3D döner carousel'i
 * (sürükle-döndür). Kartların gerçek içeriği (content-hakkimizda.md kaynaklı)
 * değişmeden korunuyor, sadece sunum şekli statik grid'ten carousel'e döndü.
 */
export function About() {
  return (
    <section id="hakkimizda" className="min-h-screen bg-graphite py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-h2 text-white">{about.eyebrow}</h2>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/90 sm:text-2xl">
          {about.intro}
        </p>

        <Reveal className="mt-16">
          <RevealItem>
            <ThreeDCardCarousel cards={about.cards} />
          </RevealItem>
        </Reveal>
      </div>
    </section>
  )
}
