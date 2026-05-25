"use client"

const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 7) % 84}%`,
  delay: `${i * 0.9}s`,
  duration: `${14 + (i % 5) * 2}s`,
  size: 12 + (i % 4) * 4,
}))

const BALLOONS = [
  { color: "#f9a8d4", left: "8%", delay: "0s" },
  { color: "#fbcfe8", left: "22%", delay: "0.6s" },
  { color: "#fda4af", left: "78%", delay: "0.3s" },
  { color: "#f472b6", left: "88%", delay: "0.9s" },
]

const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${(i * 17) % 95}%`,
  left: `${(i * 23) % 95}%`,
  delay: `${(i % 7) * 0.35}s`,
}))

export function FloatingHearts() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {HEARTS.map((h) => (
        <span
          key={h.id}
          className="ss-heart absolute text-pink-400/70"
          style={{
            left: h.left,
            animationDuration: h.duration,
            animationDelay: h.delay,
            fontSize: h.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

export function Balloons() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 overflow-visible"
      aria-hidden
    >
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="ss-balloon absolute bottom-0"
          style={{ left: b.left, animationDelay: b.delay }}
        >
          <div
            className="mx-auto h-14 w-10 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-md"
            style={{ backgroundColor: b.color }}
          />
          <div className="mx-auto h-8 w-px bg-pink-300/80" />
        </div>
      ))}
    </div>
  )
}

export function Sparkles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {SPARKLES.map((s) => (
        <span
          key={s.id}
          className="ss-sparkle absolute text-xs text-pink-200"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}
