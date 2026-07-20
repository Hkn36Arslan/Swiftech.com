import { cn } from "@/lib/utils"
import { AbstractPlaceholder } from "@/components/illustrations/AbstractPlaceholder"
import { ProductDiagram } from "@/components/illustrations/ProductDiagram"
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
        {project.placeholder ? (
          <AbstractPlaceholder seed={placeholderSeed} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-950 p-8">
            <ProductDiagram className="w-full max-w-[320px]" />
          </div>
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
