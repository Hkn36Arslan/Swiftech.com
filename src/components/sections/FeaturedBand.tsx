import { AbstractPlaceholder } from "@/components/illustrations/AbstractPlaceholder"
import { RadarSweep } from "@/components/illustrations/RadarSweep"

/**
 * Öne çıkan görsel bant — referans sistemdeki tek satır, geniş, başlıksız
 * görsel bandı. Gerçek görsel/varlık gelene kadar nötr/soyut placeholder +
 * ince bir radar taraması animasyonu kullanılır; AbstractPlaceholder
 * değiştirilerek gerçek görsele geçilebilir.
 */
export function FeaturedBand() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <AbstractPlaceholder seed="a" bold className="absolute inset-0" />
      <RadarSweep originX="22%" originY="20%" />
    </section>
  )
}
