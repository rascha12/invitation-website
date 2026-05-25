type MapsByCoords = {
  lat: number
  lng: number
  label?: string
}

type MapsByAddress = {
  address: string
}

export type MapsTarget = MapsByCoords | MapsByAddress

export function openMaps(target: MapsTarget): void {
  if (typeof window === "undefined") return

  let query: string

  if ("address" in target) {
    query = encodeURIComponent(target.address)
  } else if (target.label) {
    query = encodeURIComponent(target.label)
  } else {
    query = `${target.lat},${target.lng}`
  }

  const url = `https://www.google.com/maps/search/?api=1&query=${query}`
  window.open(url, "_blank", "noopener,noreferrer")
}
