import {
  AlertTriangle,
  Droplets,
  MonitorSmartphone,
  PackageSearch,
  Receipt,
  RefreshCw,
  ScanLine,
  Wifi,
  WifiOff,
} from "lucide-react"
import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { features } from "@/data/content"
import { cn } from "@/lib/utils"

const icons = [
  MonitorSmartphone,
  ScanLine,
  Droplets,
  PackageSearch,
  Receipt,
  Wifi,
  RefreshCw,
  WifiOff,
  AlertTriangle,
]

export function Features() {
  return (
    <section id="ozellikler" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <RevealItem>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Özellikler
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-lg text-slate-600">
              Alışveriş sürecinin her adımını akıllandıran donanım ve yazılım özellikleri.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = icons[i]
            const isAlert = feature.alert === "warning"

            return (
              <RevealItem
                key={feature.title}
                className={cn(i === 0 && "sm:col-span-2 lg:col-span-2")}
              >
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg",
                    isAlert
                      ? "border-amber-200 bg-amber-50"
                      : "border-slate-200 bg-slate-50"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl",
                        isAlert ? "bg-amber-100 text-amber-700" : "bg-blue-50 text-blue-600"
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    {isAlert && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                        Otomatik uyarı
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
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
