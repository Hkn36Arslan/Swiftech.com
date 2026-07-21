import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AbstractPlaceholder } from "@/components/illustrations/AbstractPlaceholder"
import type { Project } from "@/data/content"

export function ProjectCard({
  project,
  placeholderSeed,
}: {
  project: Project
  placeholderSeed: "a" | "b" | "c"
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
    >
      <Link
        to={`/projeler/${project.slug}`}
        className="group block border border-hairline transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-lime"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-950">
          {project.placeholder && (
            <span className="text-caption absolute left-3 top-3 z-10 border border-hairline bg-black/70 px-2.5 py-1 text-gray-300 backdrop-blur-sm">
              Yakında
            </span>
          )}
          <div className="absolute inset-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:scale-105">
            {project.image ? (
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <AbstractPlaceholder seed={placeholderSeed} />
            )}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <h3 className="text-h3 text-white">{project.title}</h3>
            <p
              className={cn(
                "text-body mt-1.5 line-clamp-2",
                project.placeholder && "opacity-70"
              )}
            >
              {project.description}
            </p>
          </div>
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-gray-500 transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  )
}
