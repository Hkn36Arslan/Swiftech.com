import { SwiftechLogo } from "@/components/layout/Logo"
import { footer } from "@/data/content"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-black">
      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <SwiftechLogo />
            <p className="text-body mt-4 max-w-xs">{footer.tagline}</p>
            <p className="text-caption mt-6">© {year} Swiftech. Tüm hakları saklıdır.</p>
          </div>

          <div>
            <h3 className="text-nav text-gray-400">Şirket</h3>
            <ul className="mt-4 space-y-2.5">
              {footer.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-body block transition-colors duration-[var(--duration-base)] hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-nav text-gray-400">Bize Katılın</h3>
            <ul className="mt-4 space-y-2.5">
              {footer.joinUs.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-body block transition-colors duration-[var(--duration-base)] hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-nav text-gray-400">Sosyal</h3>
            <ul className="mt-4 space-y-2.5">
              {footer.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-body block transition-colors duration-[var(--duration-base)] hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
