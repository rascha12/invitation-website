const DEFAULT_GUEST = "Tamu Undangan"

export function formatGuest(name?: string | null): string {
  const trimmed = name?.trim()
  if (!trimmed) return DEFAULT_GUEST
  return trimmed
}
