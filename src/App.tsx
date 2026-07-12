import { lazy, Suspense } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { ProblemSolution } from "@/components/sections/ProblemSolution"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Features } from "@/components/sections/Features"
import { TechSpecs } from "@/components/sections/TechSpecs"
import { WhyOkuGor } from "@/components/sections/WhyOkuGor"
import { Toaster } from "@/components/ui/sonner"

// Form kütüphaneleri (react-hook-form, zod) sadece bu bölüme özel —
// ana bundle'ı büyütmemesi için lazy import edilir.
const Contact = lazy(() => import("@/components/sections/Contact"))

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        İçeriğe geç
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <TechSpecs />
        <WhyOkuGor />
        <Suspense fallback={<div className="h-[640px] bg-navy-950" aria-hidden="true" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
