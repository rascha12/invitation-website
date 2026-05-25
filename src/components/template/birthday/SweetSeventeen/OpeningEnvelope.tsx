"use client"

import { useState } from "react"
import { playMusic } from "@/lib/playMusic"
import { cn } from "@/lib/cn"

type Props = {
  guest: string
  musicId?: string
  onOpen: () => void
  closing: boolean
}

export function OpeningEnvelope({
  guest,
  musicId,
  onOpen,
  closing,
}: Props) {
  const [tapped, setTapped] = useState(false)

  const handleOpen = () => {
    if (tapped) return
    setTapped(true)
    playMusic(musicId)
    onOpen()
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-[#fef7f9] px-6",
        "transition-opacity duration-700 ease-out",
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      role="dialog"
      aria-label="Open invitation"
    >
      <div
        className="ss-mesh-blob pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-300/30 blur-3xl"
        aria-hidden
      />

      <button
        type="button"
        onClick={handleOpen}
        disabled={tapped}
        className={cn(
          "relative z-10 flex flex-col items-center transition-all duration-700",
          "hover:scale-[1.03] active:scale-[0.98]",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/60",
          closing && "scale-90 opacity-0"
        )}
      >
        <div
          className={cn(
            "ss-float relative",
            tapped && "ss-envelope-open"
          )}
        >
          <div className="ss-glass-card relative h-44 w-64 overflow-hidden rounded-3xl !bg-gradient-to-b from-pink-200/90 to-pink-300/90 !p-0 shadow-2xl shadow-pink-300/40">
            <div
              className="ss-envelope-flap absolute inset-x-0 top-0 h-24 origin-top bg-gradient-to-b from-pink-100 to-pink-200/90"
              style={{ clipPath: "polygon(0 0, 50% 70%, 100% 0)" }}
            />
            <div className="ss-envelope-letter absolute inset-x-4 top-10 flex h-28 items-center justify-center rounded-2xl bg-white/95 px-4 shadow-inner">
              <div className="text-center">
                <span className="ss-pill-badge text-[9px]">
                  You&apos;re invited
                </span>
                <p className="mt-3 font-[family-name:var(--font-display)] text-xl text-pink-600">
                  {guest}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!closing && (
          <>
            <p className="mt-10 text-sm font-semibold tracking-wide text-pink-600">
              Tap to open
            </p>
            <p className="mt-1.5 text-xs text-pink-400/80">Sweet Seventeen</p>
          </>
        )}
      </button>
    </div>
  )
}
