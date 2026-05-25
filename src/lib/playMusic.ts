import { musicMap } from "@/data/musicMap"

let audio: HTMLAudioElement | null = null

export function playMusic(musicId?: string): Promise<void> | undefined {
  if (typeof window === "undefined" || !musicId) return

  const src = musicMap[musicId]
  if (!src) return

  if (!audio) {
    audio = new Audio()
  }

  audio.src = src
  audio.loop = true

  return audio.play().catch(() => undefined)
}

export function pauseMusic(): void {
  audio?.pause()
}

export function stopMusic(): void {
  if (!audio) return
  audio.pause()
  audio.currentTime = 0
}
