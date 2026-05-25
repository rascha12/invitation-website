const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}

export function formatDate(
  date: string | Date,
  locale = "id-ID",
  options?: Intl.DateTimeFormatOptions
): string {
  const value = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    ...DATE_OPTIONS,
    ...options,
  }).format(value)
}

export function formatTime(
  date: string | Date,
  locale = "id-ID",
  options?: Intl.DateTimeFormatOptions
): string {
  const value = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    ...TIME_OPTIONS,
    ...options,
  }).format(value)
}
