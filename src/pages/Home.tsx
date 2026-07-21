import { lazy, Suspense, useEffect } from "react"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { About } from "@/components/sections/About"

// Form kütüphaneleri (react-hook-form, zod) sadece bu bölüme özel —
// ana bundle'ı büyütmemesi için lazy import edilir.
const Contact = lazy(() => import("@/components/sections/Contact"))

/**
 * SPA'da ilk yüklemede URL'de #hash varsa (paylaşılan/doğrudan bağlantı,
 * ya da başka bir sayfadan "/#hakkimizda" gibi bir nav linkiyle geliş),
 * tarayıcı hash'i React henüz DOM'u basmadan işlediği için otomatik scroll
 * çalışmaz — bu effect hedef element render olunca (Contact lazy chunk
 * dahil) kısa bir yoklama ile devreye girer.
 */
function useScrollToInitialHash() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "")
    if (!id) return

    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior })
        return
      }
      attempts += 1
      if (attempts < 40) requestAnimationFrame(tryScroll)
    }
    tryScroll()
  }, [])
}

export function Home() {
  useScrollToInitialHash()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[var(--radius)] focus:bg-lime focus:px-4 focus:py-2 focus:text-black"
      >
        İçeriğe geç
      </a>
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Suspense fallback={<div className="min-h-screen bg-black" aria-hidden="true" />}>
          <Contact />
        </Suspense>
      </main>
    </>
  )
}
