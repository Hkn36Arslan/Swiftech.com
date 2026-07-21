import { cn } from "@/lib/utils"
import { AbstractPlaceholder } from "@/components/illustrations/AbstractPlaceholder"
import type { Project } from "@/data/content"

export function ProjectCard({
  project,
  placeholderSeed,
  className,
}: {
  project: Project
  placeholderSeed: "a" | "b" | "c"
  className?: string
}) {
  return (
    <a
      href={project.href}
      className={cn(
        "group relative block aspect-square overflow-hidden bg-gray-950",
        className
      )}
      aria-label={`${project.title}${project.placeholder ? " — yakında" : ""}`}
    >
      <div className="absolute inset-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:scale-105">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <AbstractPlaceholder seed={placeholderSeed} />
        )}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(0deg, var(--color-black) 5%, transparent 45%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <h3 className="text-h3 text-white">{project.title}</h3>
        <p
          className={cn(
            "text-body mt-1.5 max-w-sm",
            project.placeholder && "opacity-70"
          )}
        >
          {project.description}
        </p>
      </div>
    </a>
  )
}
