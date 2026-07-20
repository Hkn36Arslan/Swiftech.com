import { AbstractPlaceholder } from "@/components/illustrations/AbstractPlaceholder"

/**
 * Öne çıkan görsel bant — referans sistemdeki tek satır, geniş, başlıksız
 * görsel bandı. Gerçek görsel/varlık gelene kadar nötr/soyut placeholder
 * kullanılır; AbstractPlaceholder değiştirilerek gerçek görsele geçilebilir.
 */
export function FeaturedBand() {
  return (
    <section className="relative min-h-screen bg-black">
      <AbstractPlaceholder seed="a" bold className="absolute inset-0" />
    </section>
  )
}
