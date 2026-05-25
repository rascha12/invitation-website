"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { cn } from "@/lib/cn"
import type { RevealVariant } from "@/lib/scrollAnimation"

const RevealEnabledContext = createContext(false)

export function RevealProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: ReactNode
}) {
  return (
    <RevealEnabledContext.Provider value={enabled}>
      {children}
    </RevealEnabledContext.Provider>
  )
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** Progress 0→1 mengikuti posisi scroll — geser jari = animasi ikut */
function scrollProgress(rect: DOMRect, vh: number) {
  const start = vh * 0.9
  const end = vh * 0.3
  return clamp((start - rect.top) / (start - end), 0, 1)
}

function motionStyle(variant: RevealVariant, p: number): CSSProperties {
  const ease = p * p * (3 - 2 * p)
  const opacity = 0.3 + ease * 0.7
  const d = 28 * (1 - ease)

  switch (variant) {
    case "slide-right":
      return { opacity, transform: `translate3d(${-d}px, 0, 0)` }
    case "slide-left":
      return { opacity, transform: `translate3d(${d}px, 0, 0)` }
    case "slide-up":
      return { opacity, transform: `translate3d(0, ${d}px, 0)` }
    case "slide-down":
      return { opacity, transform: `translate3d(0, ${-d * 0.5}px, 0)` }
    case "scale":
      return { opacity, transform: `scale(${0.96 + ease * 0.04})` }
    case "fade":
    default:
      return { opacity, transform: `translate3d(0, ${d * 0.4}px, 0)` }
  }
}

type Props = {
  children: ReactNode
  variant?: RevealVariant
  className?: string
}

export function ScrollReveal({
  children,
  variant = "slide-up",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useContext(RevealEnabledContext)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setProgress(0)
      return
    }

    let frame = 0

    const tick = () => {
      const el = ref.current
      if (!el) return
      setProgress(scrollProgress(el.getBoundingClientRect(), window.innerHeight))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [enabled])

  return (
    <div
      ref={ref}
      className={cn("ss-reveal-interactive", className)}
      style={motionStyle(variant, enabled ? progress : 0)}
    >
      {children}
    </div>
  )
}

export function InteractiveCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "ss-glass-card ss-card-interactive rounded-3xl p-6 sm:rounded-[1.75rem] sm:p-8",
        className
      )}
    >
      {children}
    </div>
  )
}
