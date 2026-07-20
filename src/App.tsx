import { lazy, Suspense, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { FeaturedBand } from "@/components/sections/FeaturedBand"
import { Projects } from "@/components/sections/Projects"
import { About } from "@/components/sections/About"
import { Careers } from "@/components/sections/Careers"
import { Toaster } from "@/components/ui/sonner"

// Form kütüphaneleri (react-hook-form, zod) sadece bu bölüme özel —
// ana bundle'ı büyütmemesi için lazy import edilir.
const Contact = lazy(() => import("@/components/sections/Contact"))

/**
 * SPA'da ilk yüklemede URL'de #hash varsa (paylaşılan/doğrudan bağlantı),
 * tarayıcı hash'i React henüz DOM'u basmadan işlediği için otomatik scroll
 * çalışmaz — bu effect hedef element render olunca (Contact lazy chunk dahil)
 * kısa bir yoklama ile devreye girer.
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

function App() {
  useScrollToInitialHash()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[var(--radius)] focus:bg-lime focus:px-4 focus:py-2 focus:text-black"
      >
        İçeriğe geç
      </a>
      <Header />
      <main id="main">
        <Hero />
        <FeaturedBand />
        <Projects />
        <About />
        <Suspense fallback={<div className="min-h-screen bg-black" aria-hidden="true" />}>
          <Contact />
        </Suspense>
        <Careers />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
