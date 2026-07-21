import { useEffect, useState } from "react"

/**
 * Görünür alandaki bölüm id'sini takip eder — nav'da aktif linki vurgulamak
 * için.
 *
 * İki ayrı zamanlama sorununa karşı dayanıklı:
 * 1. `resetKey` değiştiğinde (örn. route pathname) observer'lar yeniden
 *    kurulur — aksi halde SPA route değişiminde (Header remount olmadığı
 *    için) eski/kaldırılmış DOM elemanlarını izlemeye devam eder ve aktif
 *    durum bir daha hiç güncellenmez.
 * 2. Bazı section'lar (örn. Contact) lazy-load edildiği için mount anında
 *    henüz DOM'da olmayabilir — effect ilk çalıştığında bulunamayan id'ler
 *    sonsuza dek gözlemsiz kalırdı. Bir MutationObserver, DOM'a sonradan
 *    eklenen eşleşen id'leri yakalayıp gözleme ekler.
 */
export function useActiveSection(ids: readonly string[], resetKey?: unknown) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setActiveId(null)
    const observedIds = new Set<string>()

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    const observeAvailable = () => {
      for (const id of ids) {
        if (observedIds.has(id)) continue
        const el = document.getElementById(id)
        if (el) {
          intersectionObserver.observe(el)
          observedIds.add(id)
        }
      }
    }

    observeAvailable()

    const mutationObserver = new MutationObserver(() => {
      if (observedIds.size < ids.length) observeAvailable()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      intersectionObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [ids, resetKey])

  return activeId
}
