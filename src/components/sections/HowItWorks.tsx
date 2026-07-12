import { DoorOpen, MonitorSmartphone, ScanLine, ShoppingBasket } from "lucide-react"
import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { steps } from "@/data/content"

const icons = [ShoppingBasket, ScanLine, MonitorSmartphone, DoorOpen]

export function HowItWorks() {
  return (
    <section id="nasil-calisir" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <RevealItem>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Nasıl Çalışır
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-lg text-slate-600">
              Dört basit adımda, kasada beklemeden alışverişi tamamlayın.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <RevealItem key={step.title}>
                <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
                  <span className="text-sm font-semibold text-blue-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
