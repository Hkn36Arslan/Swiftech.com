import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

/** Scroll'a girince fade+translateY ile beliren, çocukları stagger eden sarmalayıcı. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "section"
}) {
  const reduceMotion = useReducedMotion()
  const Comp = motion[as]

  if (reduceMotion) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      {children}
    </Comp>
  )
}

/** Reveal içinde tek bir öğeyi stagger sırasına dahil eder. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}
