import BirthdayCute from "@/components/template/birthday/BirthdayCute"
import BirthdayDark from "@/components/template/birthday/BirthdayDark"
import BirthdayElegant from "@/components/template/birthday/BirthdayElegant"
import SweetSeventeen from "@/components/template/birthday/SweetSeventeen"
import KoreanStyle from "@/components/template/general/KoreanStyle"
import SimpleClean from "@/components/template/general/SimpleClean"
import WeddingFloral from "@/components/template/wedding/WeddingFloral"
import WeddingLuxury from "@/components/template/wedding/WeddingLuxury"
import WeddingMinimal from "@/components/template/wedding/WeddingMinimal"
import type { TemplateComponent } from "@/types"

export const templateMap: Record<string, TemplateComponent> = {
  "wedding-luxury": WeddingLuxury,
  "wedding-floral": WeddingFloral,
  "wedding-minimal": WeddingMinimal,
  "birthday-cute": BirthdayCute,
  "birthday-dark": BirthdayDark,
  "birthday-elegant": BirthdayElegant,
  "sweet-seventeen": SweetSeventeen,
  "korean-style": KoreanStyle,
  "simple-clean": SimpleClean,
}
