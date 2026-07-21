import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { AbstractPlaceholder } from "@/components/illustrations/AbstractPlaceholder"
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
          {project.heroImage ? (
            <motion.img
              src={project.heroImage}
              alt={project.title}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full w-full object-cover"
            />
          ) : (
            <AbstractPlaceholder seed="a" bold className="absolute inset-0" />
          )}
        </div>

        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="max-w-3xl">
            {project.placeholder && (
              <span className="text-nav mb-4 inline-block border border-hairline px-3 py-1 text-gray-400">
                Yakında
              </span>
            )}
            <h1 className="text-h1 text-white">{project.title}</h1>
            <p className="text-body mt-6 text-base">{project.detailBody ?? project.description}</p>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-[2px] sm:mt-20 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                <div key={src} className="aspect-square overflow-hidden bg-gray-950">
                  <img
                    src={src}
                    alt={`${project.title} — görsel ${i + 2}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
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
