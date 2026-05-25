import { invitations } from "@/data/invitations"
import type { Invitation } from "@/types"

export function getInvitation(slug: string): Invitation | null {
  return invitations[slug] ?? null
}
