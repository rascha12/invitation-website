export function scrollAnimation(
  target: string | HTMLElement,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
): void {
  if (typeof window === "undefined") return

  const element =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target

  element?.scrollIntoView(options)
}

export function observeScrollAnimation(
  selector: string,
  className = "animate-in"
): IntersectionObserver | undefined {
  if (typeof window === "undefined") return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add(className)
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll(selector).forEach((el) => observer.observe(el))
  return observer
}

export type RevealVariant =
  | "slide-right"
  | "slide-left"
  | "slide-up"
  | "slide-down"
  | "fade"
  | "scale"

/** Scroll down → reveal. Scroll up → reverse to initial state. */
export function observeBidirectionalReveal(
  selector = "[data-reveal]",
  options?: { threshold?: number; rootMargin?: string }
): IntersectionObserver | undefined {
  if (typeof window === "undefined") return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("reveal-visible", entry.isIntersecting)
      })
    },
    {
      threshold: options?.threshold ?? 0.18,
      rootMargin: options?.rootMargin ?? "0px 0px -6% 0px",
    }
  )

  document.querySelectorAll(selector).forEach((el) => observer.observe(el))
  return observer
}
