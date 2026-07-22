import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type FluidParticlesProps = {
  particleDensity?: number
  particleSize?: number
  particleColor?: string
  activeColor?: string
  maxBlastRadius?: number
  hoverDelay?: number
  interactionDistance?: number
  className?: string
}

/**
 * Hakkımızda bölümünün arka planında akan, imleç/dokunuşla etkileşen
 * parçacık alanı. Kendi konteynerine göre boyutlanır (viewport'a değil) —
 * section-local bir arka plan katmanıdır. Etkileşim gerektirdiği için
 * (RadarSweep'in aksine) pointer-events kapatılmaz. `prefers-reduced-motion`
 * durumunda animasyon döngüsü hiç başlatılmaz, yalnızca statik bir kare
 * çizilir.
 */
export function FluidParticles({
  particleDensity = 100,
  particleSize = 1,
  particleColor = "#555555",
  activeColor = "#ffffff",
  maxBlastRadius = 300,
  hoverDelay = 100,
  interactionDistance = 10,
  className,
}: FluidParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999 })
  const blastRef = useRef({ active: false, x: 0, y: 0, radius: 0, maxRadius: maxBlastRadius })
  const animationRef = useRef<number>(0)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const boundsRef = useRef({ width: 0, height: 0 })
  const reduceMotion = useReducedMotion()

  class Particle {
    x: number
    y: number
    size: number
    baseX: number
    baseY: number
    density: number
    color: string
    vx: number
    vy: number
    friction: number

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.baseX = x
      this.baseY = y
      this.size = Math.random() * particleSize + 0.5
      this.density = Math.random() * 3 + 1
      this.color = particleColor
      this.vx = 0
      this.vy = 0
      this.friction = 0.9 - 0.01 * this.density
    }

    draw() {
      if (!contextRef.current) return
      contextRef.current.fillStyle = this.color
      contextRef.current.beginPath()
      contextRef.current.arc(this.x, this.y, this.size, 0, Math.PI * 1)
      contextRef.current.closePath()
      contextRef.current.fill()
    }

    update() {
      if (!contextRef.current) return
      this.x += this.vx
      this.y += this.vy
      this.vx *= this.friction
      this.vy *= this.friction

      const dx = mouseRef.current.x - this.x
      const dy = mouseRef.current.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < interactionDistance) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (interactionDistance - distance) / interactionDistance
        this.x -= forceDirectionX * force * this.density * 0.6
        this.y -= forceDirectionY * force * this.density * 0.6
        this.color = activeColor
      } else {
        if (this.x !== this.baseX) {
          const dx2 = this.x - this.baseX
          this.x -= dx2 / 20
        }
        if (this.y !== this.baseY) {
          const dy2 = this.y - this.baseY
          this.y -= dy2 / 20
        }
        this.color = particleColor
      }

      if (blastRef.current.active) {
        const blastDx = this.x - blastRef.current.x
        const blastDy = this.y - blastRef.current.y
        const blastDistance = Math.sqrt(blastDx * blastDx + blastDy * blastDy)

        if (blastDistance < blastRef.current.radius) {
          const blastForceX = blastDx / (blastDistance || 1)
          const blastForceY = blastDy / (blastDistance || 1)
          const blastForce = (blastRef.current.radius - blastDistance) / blastRef.current.radius
          this.vx += blastForceX * blastForce * 15
          this.vy += blastForceY * blastForce * 15
          // Lime accent'in RGB'sine dayalı alpha rampası (#dff140 = 223,241,64)
          // — mesafeye göre 0.15-0.65 arası, marka renk kuralına uygun geçici vurgu.
          const intensity = Math.min(255, Math.floor(255 - blastDistance))
          this.color = `rgba(223, 241, 64, ${0.15 + (intensity / 255) * 0.5})`
        }
      }

      this.draw()
    }
  }

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    contextRef.current = canvas.getContext("2d", { alpha: true })
    if (contextRef.current) {
      contextRef.current.globalCompositeOperation = "lighter"
    }

    const initParticles = () => {
      particlesRef.current = []
      const { width, height } = boundsRef.current
      const particleCount = Math.max(20, Math.floor((width * height) / particleDensity))
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        particlesRef.current.push(new Particle(x, y))
      }
    }

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      const pixelRatio = window.devicePixelRatio || 1
      boundsRef.current = { width: rect.width, height: rect.height }
      canvas.width = rect.width * pixelRatio
      canvas.height = rect.height * pixelRatio
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      if (contextRef.current) {
        contextRef.current.setTransform(1, 0, 0, 1, 0, 0)
        contextRef.current.scale(pixelRatio, pixelRatio)
      }
      initParticles()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    handleResize()

    if (reduceMotion) {
      const ctx = contextRef.current
      if (ctx) {
        ctx.clearRect(0, 0, boundsRef.current.width, boundsRef.current.height)
        particlesRef.current.forEach((particle) => particle.draw())
      }
      return () => {
        resizeObserver.disconnect()
      }
    }

    const getRelativeCoords = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const triggerBlast = (x: number, y: number) => {
      blastRef.current = { active: true, x, y, radius: 0, maxRadius: maxBlastRadius }
      const startTime = performance.now()
      const duration = 300

      const expandBlast = (timestamp: number) => {
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutQuad(progress)
        blastRef.current.radius = easedProgress * blastRef.current.maxRadius
        if (progress < 1) {
          requestAnimationFrame(expandBlast)
        } else {
          setTimeout(() => {
            blastRef.current.active = false
          }, 100)
        }
      }
      requestAnimationFrame(expandBlast)
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = null
      }
    }

    let lastMoveTime = 0
    const moveThrottle = 10

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMoveTime < moveThrottle) return
      lastMoveTime = now
      const prevX = mouseRef.current.x
      const prevY = mouseRef.current.y
      const { x, y } = getRelativeCoords(e.clientX, e.clientY)
      mouseRef.current = { x, y, prevX, prevY }
      const dx = mouseRef.current.x - mouseRef.current.prevX
      const dy = mouseRef.current.y - mouseRef.current.prevY
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 5) {
        if (hoverTimerRef.current === null) {
          hoverTimerRef.current = setTimeout(() => {
            triggerBlast(x, y)
          }, hoverDelay)
        }
      } else if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = null
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        const prevX = mouseRef.current.x
        const prevY = mouseRef.current.y
        const { x, y } = getRelativeCoords(touch.clientX, touch.clientY)
        mouseRef.current = { x, y, prevX, prevY }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        const { x, y } = getRelativeCoords(touch.clientX, touch.clientY)
        hoverTimerRef.current = setTimeout(() => {
          triggerBlast(x, y)
        }, hoverDelay)
      }
    }

    const handleTouchEnd = () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = null
      }
    }

    const handleClick = (e: MouseEvent) => {
      const { x, y } = getRelativeCoords(e.clientX, e.clientY)
      triggerBlast(x, y)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("touchmove", handleTouchMove)
    container.addEventListener("touchstart", handleTouchStart)
    container.addEventListener("touchend", handleTouchEnd)
    container.addEventListener("click", handleClick)

    const animate = () => {
      const ctx = contextRef.current
      if (!ctx) return
      ctx.clearRect(0, 0, boundsRef.current.width, boundsRef.current.height)
      particlesRef.current.forEach((particle) => particle.update())
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      resizeObserver.disconnect()
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchend", handleTouchEnd)
      container.removeEventListener("click", handleClick)
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      cancelAnimationFrame(animationRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion])

  return (
    <div ref={containerRef} aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

const easeOutQuad = (t: number) => t * (2 - t)
