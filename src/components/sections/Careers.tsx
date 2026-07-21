import { kariyer } from "@/data/content"

const blockShades = ["bg-olive", "bg-slate"] as const

/**
 * Kariyer — referans sistemin "story card" deseni: 2 sütun, ayrık koyu
 * zemin bloklar, sol-üstte seri numarası. İçerik şu an placeholder
 * (lorem ipsum) — gerçek açık pozisyonlar gelince kariyer.positions
 * güncellenecek.
 */
export function Careers() {
  return (
    <section id="kariyer" className="min-h-screen bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-h2 text-white">{kariyer.eyebrow}</h2>
        <p className="text-body mt-6 max-w-xl text-base">{kariyer.intro}</p>

        <div className="mt-12 grid grid-cols-1 gap-[2px] sm:mt-16 sm:grid-cols-2">
          {kariyer.positions.map((position, i) => (
            <div
              key={position.index}
              className={`${blockShades[i % blockShades.length]} flex min-h-[320px] flex-col justify-between p-6 sm:p-10`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-h3 text-white">{position.title}</h3>
                <span className="text-xs tabular-nums text-white/70">
                  PT — {position.index}/{String(kariyer.positions.length).padStart(2, "0")}
                </span>
              </div>
              {/* Bu blokların zemini (olive/slate) varsayılan gray-400 body
                  rengiyle yeterli kontrast vermiyor (ölçüldü: ~2:1) — doğrudan
                  beyaz/opaklık kombinasyonu WCAG AA'yı (≥4.5:1) karşılıyor. */}
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/80">
                {position.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
