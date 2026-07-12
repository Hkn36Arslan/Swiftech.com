import { OkuGorLogo, SwiftechWordmark } from "@/components/layout/Logo"
import { GridGlow } from "@/components/illustrations/GridGlow"
import { contactInfo, footer, nav } from "@/data/content"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-300">
      <GridGlow className="opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <OkuGorLogo inverted />
            <p className="mt-3 max-w-xs text-sm text-slate-400">{footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Site</h3>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">İletişim</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>{contactInfo.email}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} Swiftech. Tüm hakları saklıdır.
          </p>
          <SwiftechWordmark />
        </div>
      </div>
    </footer>
  )
}
