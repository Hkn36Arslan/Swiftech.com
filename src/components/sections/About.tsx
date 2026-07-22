import { FluidParticles } from "@/components/illustrations/FluidParticles"
import { about } from "@/data/content"

/**
 * Hakkımızda — başlık + kısa giriş, arkasında imleç/dokunuşla etkileşen
 * parçacık animasyonu (FluidParticles).
 */
export function About() {
  return (
    <section id="hakkimizda" className="relative min-h-screen overflow-hidden bg-graphite py-24 sm:py-32">
      <FluidParticles />
      {/* Metin bloğu tam genişlikte bir div olduğu için pointer-events-none
          olmazsa altındaki geniş boş alanlarda parçacık etkileşimini
          engeller; gerçek metin seçilebilirliği h2/p'de pointer-events-auto
          ile geri açılır. */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pointer-events-none sm:px-6 lg:px-10">
        <h2 className="text-h2 pointer-events-auto text-white">{about.eyebrow}</h2>
        <p className="pointer-events-auto mt-8 max-w-3xl text-xl leading-relaxed text-white/90 sm:text-2xl">
          {about.intro}
        </p>
      </div>
    </section>
  )
}
