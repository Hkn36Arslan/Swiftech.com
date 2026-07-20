import { ProjectCard } from "@/components/sections/ProjectCard"
import { projects } from "@/data/content"

const [featured, half1, half2] = projects

/**
 * Projeler grid'i — referans sistemin asimetrik "2+1" kart deseni: tek büyük
 * kare (Oku Gör) + yanında iki küçük kareden oluşan bir sütun (Proje 2/3).
 * İki 4-birim kare üst üste, sekiz-birim karenin yüksekliğini eşitler.
 * Mobilde tamamı tek sütunda alt alta dizilir.
 */
export function Projects() {
  return (
    <section id="projeler" className="min-h-screen bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-h2 text-white">Projeler</h2>

        <div className="mt-12 flex flex-col gap-[2px] sm:mt-16 md:flex-row">
          <ProjectCard
            project={featured}
            placeholderSeed="a"
            className="w-full md:w-8/12"
          />
          <div className="flex flex-col gap-[2px] md:w-4/12">
            <ProjectCard project={half1} placeholderSeed="b" className="w-full" />
            <ProjectCard project={half2} placeholderSeed="c" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
