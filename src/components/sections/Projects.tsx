import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { projects } from "@/data/content"

/**
 * Projeler — şu an tek gerçek proje (Oku Gör) olduğu için grid yerine tek,
 * büyük bir "öne çıkan proje" kartı kullanılıyor. Yeni projeler eklendiğinde
 * (content.ts'e yeni Project objesi eklenerek) bu section grid düzenine
 * dönüştürülecek.
 */
export function Projects() {
  const [project] = projects

  return (
    <section id="projeler" className="min-h-screen bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-h2 text-white">Projeler</h2>

        <Reveal className="mt-12 sm:mt-16">
          <RevealItem>
            <Link
              to={`/projeler/${project.slug}`}
              className="group grid gap-8 bg-gray-950 p-4 transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)] sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-gray-900 lg:aspect-auto">
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center py-2 sm:py-4 lg:py-8">
                <span className="text-nav text-lime">Öne Çıkan Proje</span>
                <h3 className="text-h1 mt-4 text-white">{project.title}</h3>
                <p className="text-body mt-6 max-w-md text-base sm:text-lg">
                  {project.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-nav text-white">
                  Detayları İncele
                  <ArrowUpRight
                    className="size-4 text-lime transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  )
}
