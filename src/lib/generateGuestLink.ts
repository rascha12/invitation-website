export function generateGuestLink(
  slug: string,
  guestName: string,
  baseUrl?: string
): string {
  const base =
    baseUrl ??
    (typeof window !== "undefined" ? window.location.origin : "")

  const path = `/invite/${encodeURIComponent(slug)}`
  const trimmed = guestName.trim()

  if (!trimmed) return `${base}${path}`

  const params = new URLSearchParams({ to: trimmed })
  return `${base}${path}?${params.toString()}`
}
