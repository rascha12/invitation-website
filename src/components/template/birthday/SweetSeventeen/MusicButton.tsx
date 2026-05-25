"use client"

import { useEffect, useState } from "react"
import { pauseMusic, playMusic } from "@/lib/playMusic"
import { cn } from "@/lib/cn"

type Props = {
  musicId?: string
  enabled: boolean
}

export function MusicButton({ musicId, enabled }: Props) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!enabled) setPlaying(false)
  }, [enabled])

  if (!enabled || !musicId) return null

  const toggle = async () => {
    if (playing) {
      pauseMusic()
      setPlaying(false)
      return
    }
    await playMusic(musicId)
    setPlaying(true)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className={cn(
        "fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full",
        "ss-glass-card !rounded-full !p-0 text-base shadow-lg",
        "transition duration-300 hover:scale-110",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
      )}
    >
      {playing ? "🔊" : "🔇"}
    </button>
  )
}
