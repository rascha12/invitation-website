import { templateMap } from "@/data/templateMap"
import type { TemplateComponent } from "@/types"

export function getTemplate(templateId: string): TemplateComponent | null {
  return templateMap[templateId] ?? null
}
