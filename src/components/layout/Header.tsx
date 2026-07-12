import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OkuGorLogo } from "@/components/layout/Logo"
import { nav } from "@/data/content"
import { useActiveSection } from "@/hooks/useActiveSection"
import { cn } from "@/lib/utils"

const sectionIds = nav.map((item) => item.href.replace("#", ""))

export function Header() {
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="shrink-0" aria-label="OkuGör ana sayfa">
          <OkuGorLogo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Ana navigasyon">
          {nav.map((item) => {
            const id = item.href.replace("#", "")
            const isActive = activeId === id
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  isActive ? "text-blue-600" : "text-slate-600"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="lg">
            <a href="#iletisim">Demo Talep Et</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-slate-200 bg-white px-6 py-4 md:hidden"
          aria-label="Mobil navigasyon"
        >
          <ul className="flex flex-col gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block text-base font-medium text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Button asChild size="lg" className="w-full" onClick={() => setOpen(false)}>
                <a href="#iletisim">Demo Talep Et</a>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
