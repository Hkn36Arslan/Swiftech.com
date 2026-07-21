import { ProjectCard } from "@/components/sections/ProjectCard"
import { projects } from "@/data/content"

const placeholderSeeds = ["a", "b", "c"] as const

/**
 * Projeler grid'i — sade, eşit 3'lü kart düzeni. Her kart kendi proje detay
 * sayfasına (/projeler/:slug) yönlendirir. Mobilde tek sütunda alt alta.
 */
export function Projects() {
  return (
    <section id="projeler" className="min-h-screen bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-h2 text-white">Projeler</h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              placeholderSeed={placeholderSeeds[i % placeholderSeeds.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
