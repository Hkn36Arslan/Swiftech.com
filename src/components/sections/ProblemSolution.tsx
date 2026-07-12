import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { problemSolution } from "@/data/content"

export function ProblemSolution() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <RevealItem>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
            {problemSolution.title}
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {problemSolution.body}
          </p>
        </RevealItem>
      </Reveal>
    </section>
  )
}
