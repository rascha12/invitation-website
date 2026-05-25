"use client"

import { useEffect, useState, type FormEvent } from "react"
import type { Invitation } from "@/types"
import { openMaps } from "@/lib/openMaps"
import { cn } from "@/lib/cn"
import { InteractiveCard, ScrollReveal } from "./ScrollReveal"

const DEFAULT_GALLERY = [
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
  "https://images.unsplash.com/photo-1464349153739-0997a2baa84e?w=600&q=80",
  "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
  "https://images.unsplash.com/photo-1527529482834-994e737bf347?w=600&q=80",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80",
]

const SAMPLE_WISHES = [
  { name: "Maya", message: "Happy sweet 17! Stay shining always ✨" },
  { name: "Dina", message: "Wishing you the happiest birthday, princess! 💕" },
  { name: "Rina", message: "Seventeen looks gorgeous on you! 🎀" },
]

function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <InteractiveCard className={className}>{children}</InteractiveCard>
}

function SectionTitle({
  children,
  subtitle,
  variant = "slide-up",
}: {
  children: React.ReactNode
  subtitle?: string
  variant?: "slide-up" | "slide-right" | "slide-left" | "fade"
}) {
  return (
    <ScrollReveal variant={variant} className="mb-10 text-center">
      {subtitle && <span className="ss-pill-badge">{subtitle}</span>}
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-pink-600 sm:text-[2.35rem]">
        {children}
      </h2>
      <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
    </ScrollReveal>
  )
}

export function HeroSection({
  name,
  tagline,
  guest,
  coverImage,
}: {
  name: string
  tagline?: string
  guest: string
  coverImage?: string
}) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 pb-20 pt-28"
    >
      <ScrollReveal variant="slide-up" className="relative z-10 w-full max-w-md">
        <Card className="overflow-hidden !p-0">
          {coverImage && (
            <div className="relative h-52 overflow-hidden sm:h-60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt=""
                className="h-full w-full scale-105 object-cover transition duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            </div>
          )}

          <div className="px-6 pb-8 pt-6 text-center sm:px-8">
            <span className="ss-pill-badge">Sweet Seventeen</span>
            <h1 className="ss-title-shimmer mt-5 font-[family-name:var(--font-display)] text-[2.75rem] leading-[1.1] sm:text-6xl">
              {name}
            </h1>
            {tagline && (
              <p className="mt-2 text-base font-medium tracking-wide text-rose-400/90">
                {tagline}
              </p>
            )}

            <div className="mt-7 rounded-2xl border border-pink-100/80 bg-gradient-to-br from-pink-50/90 to-white px-5 py-5 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-400">
                Dear
              </p>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight text-pink-700">
                {guest}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-pink-500/85">
                You&apos;re invited to a magical sweet seventeen celebration —
                full of sparkle, laughter, and love.
              </p>
            </div>

            <a
              href="#info"
              className="ss-btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white"
            >
              See details
              <span className="ss-scroll-hint inline-block text-xs">↓</span>
            </a>
          </div>
        </Card>
      </ScrollReveal>
    </section>
  )
}

export function BirthdayInfo({ data }: { data: Invitation }) {
  const mapsTarget =
    data.venue.lat != null && data.venue.lng != null
      ? { lat: data.venue.lat, lng: data.venue.lng, label: data.venue.name }
      : { address: data.venue.address }

  return (
    <section id="info" className="px-5 py-20">
      <div className="mx-auto max-w-md">
        <SectionTitle subtitle="Save the date" variant="slide-right">
          Party Details
        </SectionTitle>

        <ScrollReveal variant="slide-right">
          <Card>
            <ul className="divide-y divide-pink-100/80">
              <li className="pb-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
                  Date
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-pink-800">
                  {data.date}
                </p>
              </li>
              {data.time && (
                <li className="py-6 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
                    Time
                  </p>
                  <p className="mt-2 text-lg font-medium text-pink-600">
                    {data.time}
                  </p>
                </li>
              )}
              <li className="pt-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
                  Venue
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-pink-800">
                  {data.venue.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-pink-500/80">
                  {data.venue.address}
                </p>
                <button
                  type="button"
                  onClick={() => openMaps(mapsTarget)}
                  className="mt-5 rounded-full border border-pink-200/80 bg-white/80 px-6 py-2.5 text-sm font-semibold text-pink-600 transition hover:border-pink-300 hover:bg-pink-50"
                >
                  Open Maps →
                </button>
              </li>
            </ul>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-pink-100/60 bg-white/50 px-2 py-4 sm:px-3">
      <span className="font-[family-name:var(--font-display)] text-2xl text-pink-600 sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-pink-400">
        {label}
      </span>
    </div>
  )
}

export function CountdownSection({ eventAt }: { eventAt?: string }) {
  const target = eventAt ? new Date(eventAt) : null
  const [left, setLeft] = useState(() =>
    target ? getTimeLeft(target) : null
  )

  useEffect(() => {
    if (!target) return
    const tick = () => setLeft(getTimeLeft(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [eventAt])

  if (!target || !left) return null

  return (
    <section id="countdown" className="px-5 py-20">
      <div className="mx-auto max-w-md">
        <SectionTitle subtitle="Counting down" variant="slide-left">
          Until the Party
        </SectionTitle>

        <ScrollReveal variant="slide-left">
          <Card>
            {left.done ? (
              <p className="text-center text-lg font-semibold text-pink-600">
                The party has started! See you there! 🎉
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                <CountdownUnit value={left.days} label="Days" />
                <CountdownUnit value={left.hours} label="Hours" />
                <CountdownUnit value={left.minutes} label="Min" />
                <CountdownUnit value={left.seconds} label="Sec" />
              </div>
            )}
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function GallerySection({ images }: { images?: string[] }) {
  const gallery = images?.length ? images : DEFAULT_GALLERY

  return (
    <section id="gallery" className="px-5 py-20">
      <div className="mx-auto max-w-2xl">
        <SectionTitle subtitle="Memories" variant="slide-up">
          Gallery
        </SectionTitle>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {gallery.map((src, i) => (
            <ScrollReveal
              key={src}
              variant={i % 2 === 0 ? "slide-right" : "slide-left"}
              className={cn(i === 0 && "col-span-2")}
            >
              <div
                className={cn(
                  "group overflow-hidden rounded-2xl border border-white/80 shadow-lg shadow-pink-200/30",
                  i === 0 && "aspect-[16/9]"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="h-full min-h-[140px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WishesSection() {
  const [wishes, setWishes] = useState(SAMPLE_WISHES)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setWishes((prev) => [{ name: name.trim(), message: message.trim() }, ...prev])
    setName("")
    setMessage("")
  }

  return (
    <section id="wishes" className="px-5 py-20">
      <div className="mx-auto max-w-md">
        <SectionTitle subtitle="Send love" variant="slide-right">
          Birthday Wishes
        </SectionTitle>

        <div className="space-y-3">
          {wishes.map((w, i) => (
            <ScrollReveal
              key={`${w.name}-${i}`}
              variant={i % 2 === 0 ? "slide-right" : "slide-left"}
            >
              <Card className="!p-5">
                <p className="font-semibold text-pink-700">{w.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-pink-500/85">
                  {w.message}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="slide-right" className="mt-6">
          <form onSubmit={submit}>
            <Card>
              <p className="mb-4 text-center text-sm font-medium text-pink-500">
                Leave a wish ✨
              </p>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-3 w-full rounded-xl border border-pink-100 bg-white/70 px-4 py-3 text-sm text-pink-800 placeholder:text-pink-300/80 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200/60"
              />
              <textarea
                placeholder="Your message..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-pink-100 bg-white/70 px-4 py-3 text-sm text-pink-800 placeholder:text-pink-300/80 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200/60"
              />
              <button
                type="submit"
                className="ss-btn-primary mt-4 w-full rounded-full py-3.5 text-sm font-semibold text-white"
              >
                Send Wish ♡
              </button>
            </Card>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function RSVPSection({ guest }: { guest: string }) {
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("")
  const [name, setName] = useState(guest === "Tamu Undangan" ? "" : guest)
  const [guests, setGuests] = useState("1")
  const [note, setNote] = useState("")
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!attendance || !name.trim()) return
    setSent(true)
  }

  return (
    <section id="rsvp" className="px-5 py-20">
      <div className="mx-auto max-w-md">
        <SectionTitle subtitle="Kindly respond" variant="slide-left">
          RSVP
        </SectionTitle>

        <ScrollReveal variant="slide-left">
          {sent ? (
            <Card className="text-center">
              <p className="text-4xl">🎀</p>
              <p className="mt-4 text-lg font-semibold text-pink-700">
                Thank you, {name}!
              </p>
              <p className="mt-2 text-sm text-pink-500/85">
                Your response has been received. We can&apos;t wait to celebrate
                with you!
              </p>
            </Card>
          ) : (
            <form onSubmit={submit}>
              <Card className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-pink-100 bg-white/70 px-4 py-3 text-sm text-pink-800 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200/60"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
                    Will you attend?
                  </p>
                  <div className="mt-2 flex gap-2">
                    {(["yes", "no"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAttendance(v)}
                        className={cn(
                          "flex-1 rounded-xl border py-3 text-sm font-semibold transition-all duration-300",
                          attendance === v
                            ? "border-pink-400 bg-pink-100 text-pink-700 shadow-sm"
                            : "border-pink-100 bg-white/60 text-pink-500 hover:bg-pink-50"
                        )}
                      >
                        {v === "yes" ? "Accept" : "Decline"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-pink-100 bg-white/70 px-4 py-3 text-sm text-pink-800 focus:border-pink-300 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
                    Note
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-1.5 w-full resize-none rounded-xl border border-pink-100 bg-white/70 px-4 py-3 text-sm text-pink-800 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200/60"
                  />
                </div>

                <button
                  type="submit"
                  className="ss-btn-primary w-full rounded-full py-3.5 text-sm font-semibold text-white"
                >
                  Confirm RSVP
                </button>
              </Card>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}

export function FooterSection({ name }: { name: string }) {
  return (
    <footer className="px-5 pb-14 pt-6 text-center">
      <ScrollReveal variant="fade" className="mx-auto max-w-md">
        <p className="font-[family-name:var(--font-display)] text-2xl text-pink-500">
          With love,
        </p>
        <p className="mt-1 text-sm font-medium text-pink-400/90">
          {name}&apos;s Family
        </p>
        <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-pink-300/80">
          Sweet Seventeen ♡
        </p>
      </ScrollReveal>
    </footer>
  )
}
