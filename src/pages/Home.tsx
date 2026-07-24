import { lazy, Suspense, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { About } from "@/components/sections/About"

// Form kütüphaneleri (react-hook-form, zod) sadece bu bölüme özel —
// ana bundle'ı büyütmemesi için lazy import edilir.
const Contact = lazy(() => import("@/components/sections/Contact"))

/**
 * "/", "/projeler", "/hakkimizda", "/iletisim" hepsi aynı Home bileşenini
 * render eder (bkz. App.tsx) — bu, tek sayfalık kaydırma deneyimini
 * korurken URL'lerin temiz path olmasını sağlar (eskiden "/#iletisim" gibi
 * hash'lerdi). Route değiştiğinde (ilk yükleme ya da Header'daki Link'lerle
 * SPA içi geçiş — Home remount olmadığı için sadece pathname değişir) ilgili
 * section'a kaydırılır. Contact lazy-load edildiği için hedef element mount
 * anında henüz DOM'da olmayabilir — kısa bir yoklama ile devreye girer.
 */
function useScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    const id = location.pathname === "/" ? null : location.pathname.replace(/^\//, "")
    if (!id) {
      window.scrollTo({ top: 0, behavior: "instant" })
      return
    }

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
  }, [location.pathname])
}

export function Home() {
  useScrollToSection()

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
