import { Check, Store, User } from "lucide-react"
import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { whyOkuGor } from "@/data/content"

const columns = [
  { ...whyOkuGor.retailer, icon: Store },
  { ...whyOkuGor.customer, icon: User },
]

export function WhyOkuGor() {
  return (
    <section id="neden-okugor" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <RevealItem>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Neden OkuGör
            </h2>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-2">
          {columns.map((col) => {
            const Icon = col.icon
            return (
              <RevealItem key={col.title}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-8">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    {col.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {col.items.map((line) => (
                      <li key={line} className="flex items-start gap-3">
                        <Check
                          className="mt-0.5 size-5 shrink-0 text-blue-600"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-slate-700">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
