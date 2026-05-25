"use client"

import { Outfit, Pacifico } from "next/font/google"
import { useEffect, useState } from "react"
import type { TemplateProps } from "@/types"
import { cn } from "@/lib/cn"
import { Balloons, FloatingHearts, Sparkles } from "./FloatingDecor"
import { RevealProvider } from "./ScrollReveal"
import { MusicButton } from "./MusicButton"
import { OpeningEnvelope } from "./OpeningEnvelope"
import {
  BirthdayInfo,
  CountdownSection,
  FooterSection,
  GallerySection,
  HeroSection,
  RSVPSection,
  WishesSection,
} from "./sections"
import "./sweet-seventeen.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
})

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
})

const PAGE_BG = "#fef7f9"

function MeshBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="ss-mesh-blob absolute -left-20 top-[-10%] h-[420px] w-[420px] rounded-full bg-pink-300/25 blur-3xl" />
      <div
        className="ss-mesh-blob absolute -right-16 top-[30%] h-[360px] w-[360px] rounded-full bg-rose-200/30 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="ss-mesh-blob absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-fuchsia-200/20 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />
    </div>
  )
}

export default function SweetSeventeen({ data, guest }: TemplateProps) {
  const { groom: name, bride: tagline } = data.couple
  const [opened, setOpened] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(true)

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlBg = html.style.backgroundColor
    const prevBodyBg = body.style.backgroundColor

    html.style.backgroundColor = PAGE_BG
    body.style.backgroundColor = PAGE_BG

    return () => {
      html.style.backgroundColor = prevHtmlBg
      body.style.backgroundColor = prevBodyBg
    }
  }, [])

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
    document.body.style.overflow = ""
  }, [opened])

  useEffect(() => {
    if (!opened) return

    const blobs = document.querySelectorAll<HTMLElement>(".ss-mesh-blob")
    let frame = 0

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        blobs.forEach((blob, i) => {
          blob.style.transform = `translate3d(0, ${y * (0.025 + i * 0.012)}px, 0)`
        })
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [opened])

  const handleOpen = () => {
    setOpened(true)
    window.setTimeout(() => setShowEnvelope(false), 700)
  }

  return (
    <div
      data-invitation-page
      className={`${outfit.variable} ${pacifico.variable} min-h-screen font-[family-name:var(--font-sans)] antialiased`}
      style={{ backgroundColor: PAGE_BG, color: "#500724" }}
    >
      {showEnvelope && (
        <OpeningEnvelope
          guest={guest}
          musicId={data.music}
          closing={opened}
          onOpen={handleOpen}
        />
      )}

      <main
        className={cn(
          "relative z-0 min-h-screen scroll-smooth text-pink-950",
          opened ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{ backgroundColor: PAGE_BG }}
        aria-hidden={!opened}
      >
        <MeshBackground />
        <FloatingHearts />
        <Sparkles />
        <MusicButton musicId={data.music} enabled={opened} />

        <RevealProvider enabled={opened}>
          <div className="relative z-10">
            <Balloons />
            <HeroSection
              name={name}
              tagline={tagline}
              guest={guest}
              coverImage={data.coverImage}
            />
            <BirthdayInfo data={data} />
            <CountdownSection eventAt={data.eventAt} />
            <GallerySection images={data.gallery} />
            <WishesSection />
            <RSVPSection guest={guest} />
            <FooterSection name={name} />
          </div>
        </RevealProvider>
      </main>
    </div>
  )
}
