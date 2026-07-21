import { useEffect, useState } from "react"

/**
 * Görünür alandaki bölüm id'sini takip eder — nav'da aktif linki vurgulamak
 * için. `resetKey` değiştiğinde (örn. route pathname) observer yeniden
 * kurulur — aksi halde SPA route değişiminde (Header remount olmadığı için)
 * eski/kaldırılmış DOM elemanlarını izlemeye devam eder ve aktif durum bir
 * daha hiç güncellenmez.
 */
export function useActiveSection(ids: readonly string[], resetKey?: unknown) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) {
      setActiveId(null)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, resetKey])

  return activeId
}
