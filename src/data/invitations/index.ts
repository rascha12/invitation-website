import { sweetSeventeen } from "./birthday"
import { fazriAisah, ramaNisa } from "./wedding"
import type { Invitation } from "@/types"

export const invitations: Record<string, Invitation> = {
  "fazri-aisah": fazriAisah,
  "rama-nisa": ramaNisa,
  "sweet-seventeen": sweetSeventeen,
}
