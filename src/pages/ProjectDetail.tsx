import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { OrbitCarousel } from "@/components/ui/orbit-carousel"
import { projects } from "@/data/content"

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <main>
      <div className="pt-16">
        <div className="mx-auto max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-10">
          <Link
            to="/projeler"
            className="text-nav inline-flex items-center gap-2 text-gray-400 transition-colors duration-[var(--duration-base)] hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Projelere Dön
          </Link>
        </div>

        <div className="mx-auto flex max-w-[1600px] flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-10">
          <OrbitCarousel images={project.gallery} className="max-w-3xl" />

          <h1 className="text-h1 mt-12 text-white sm:mt-16">{project.title}</h1>
          <p className="text-body mt-6 max-w-2xl text-base sm:text-lg">{project.detailBody}</p>

          <Link
            to="/iletisim"
            className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius)] border border-lime bg-lime px-6 text-nav text-black transition-colors duration-[var(--duration-base)] hover:bg-transparent hover:text-white"
          >
            Demo Talep Et
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
