import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { SwiftechLogo } from "@/components/layout/Logo"
import { nav } from "@/data/content"
import { useActiveSection } from "@/hooks/useActiveSection"
import { cn } from "@/lib/utils"

const sectionIds = nav.map((item) => item.href.split("#")[1])

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"
  const observedActiveId = useActiveSection(sectionIds, location.pathname)
  const activeId = isHome ? observedActiveId : null

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-black">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="/" className="shrink-0" aria-label="Swiftech ana sayfa">
          <SwiftechLogo />
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Ana navigasyon">
          {nav.map((item) => {
            const id = item.href.split("#")[1]
            const isActive = activeId === id
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-nav border-b pb-0.5 transition-colors duration-[var(--duration-base)]",
                  isActive
                    ? "border-lime text-white"
                    : "border-transparent text-gray-400 hover:border-lime hover:text-white"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href="/#iletisim"
            className="rounded-[var(--radius)] border border-lime px-5 py-2 text-nav text-white transition-colors duration-[var(--duration-base)] hover:bg-lime hover:text-black"
          >
            Demo Talep Et
          </a>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center text-white md:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-hairline bg-black px-4 py-4 sm:px-6 md:hidden"
          aria-label="Mobil navigasyon"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const id = item.href.split("#")[1]
              const isActive = activeId === id
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "text-nav block border-l-2 py-3 pl-3 transition-colors duration-[var(--duration-base)]",
                      isActive
                        ? "border-lime text-white"
                        : "border-transparent text-gray-400"
                    )}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
            <li className="pt-2">
              <a
                href="/#iletisim"
                className="block rounded-[var(--radius)] border border-lime px-5 py-3 text-center text-nav text-white"
                onClick={() => setOpen(false)}
              >
                Demo Talep Et
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
