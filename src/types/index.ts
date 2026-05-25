import type { ComponentType } from "react"

export interface InvitationVenue {
  name: string
  address: string
  lat?: number
  lng?: number
}

export interface InvitationCouple {
  groom: string
  bride: string
}

export interface Invitation {
  slug: string
  template: string
  theme?: string
  music?: string
  couple: InvitationCouple
  date: string
  time?: string
  /** ISO 8601 — used for countdown (e.g. 2026-06-14T18:00:00) */
  eventAt?: string
  venue: InvitationVenue
  coverImage?: string
  gallery?: string[]
}

export interface TemplateProps {
  data: Invitation
  guest: string
}

export type TemplateComponent = ComponentType<TemplateProps>
