import { kariyer } from "@/data/content"

const blockShades = ["bg-gray-950", "bg-gray-900"] as const

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
                <span className="text-caption tabular-nums">
                  PT — {position.index}/{String(kariyer.positions.length).padStart(2, "0")}
                </span>
              </div>
              <p className="text-body mt-6 max-w-sm">{position.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
