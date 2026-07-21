import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { projects } from "@/data/content"

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const reduceMotion = useReducedMotion()

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
            to="/#projeler"
            className="text-nav inline-flex items-center gap-2 text-gray-400 transition-colors duration-[var(--duration-base)] hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Projelere Dön
          </Link>
        </div>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-gray-950 sm:mt-10">
          <motion.img
            src={project.heroImage}
            alt={project.title}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="text-h1 text-white">{project.title}</h1>
            <p className="text-body mt-6 text-base">{project.detailBody}</p>
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <h2 className="text-h3 text-white">Galeri</h2>
              <p className="text-body mt-2 max-w-md">
                Sürükleyerek çevirin, bir görsele tıklayarak büyütün.
              </p>
              <div className="mt-8">
                <ThreeDPhotoCarousel images={project.gallery} />
              </div>
            </div>
          )}

          <div className="mt-16 border-t border-hairline pt-10 sm:mt-20">
            <a
              href="/#iletisim"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius)] border border-lime bg-lime px-6 text-nav text-black transition-colors duration-[var(--duration-base)] hover:bg-transparent hover:text-white"
            >
              Demo Talep Et
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
