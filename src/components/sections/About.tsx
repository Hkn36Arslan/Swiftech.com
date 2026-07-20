import { about } from "@/data/content"

/**
 * Hakkımızda — Seçenek B: giriş tam genişlik, 6 alt bölüm 12 kolonlu
 * grid'e oturan 3x2 kart (span-4), Projeler section'ındaki 3'lü kart
 * ritmiyle tutarlı. Kapanış cümlesi tam genişlik, vurgulu.
 */
export function About() {
  return (
    <section id="hakkimizda" className="min-h-screen bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-h2 text-white">{about.eyebrow}</h2>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/90 sm:text-2xl">
          {about.intro}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-3">
          {about.cards.map((card) => (
            <div key={card.lead} className="bg-gray-950 p-6 sm:p-8">
              <h3 className="text-h3 text-white">
                {card.lead}
                <span className="mt-2 block h-px w-8 bg-lime" aria-hidden="true" />
              </h3>
              <p className="text-body mt-4">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="text-h3 mt-16 max-w-3xl text-white sm:text-2xl">{about.closing}</p>
      </div>
    </section>
  )
}
