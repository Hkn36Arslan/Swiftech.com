import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { techSpecs } from "@/data/content"

export function TechSpecs() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <RevealItem>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Teknik Özellikler
            </h2>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <dl>
            {techSpecs.map((spec, i) => (
              <RevealItem key={spec.label}>
                <div
                  className={
                    "grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4" +
                    (i !== techSpecs.length - 1 ? " border-b border-slate-100" : "")
                  }
                >
                  <dt className="text-sm font-medium text-slate-500 sm:col-span-1">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-slate-900 sm:col-span-2">{spec.value}</dd>
                </div>
              </RevealItem>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
