/**
 * Route undangan dinamis: /invite/[slug]?to=namaTamu
 * Dokumentasi lengkap: ./README.md
 */
import { invitations } from "@/data/invitations"
import { templateMap } from "@/data/templateMap"

type Props = {
  params: Promise<{
    slug: string
  }>

  searchParams: Promise<{
    to?: string
  }>
}

export default async function InvitationPage({
  params,
  searchParams,
}: Props) {

  const { slug } = await params
  const { to } = await searchParams

  const guest =
    to?.replace(/\./g, " ")
    || "Tamu Undangan"

  // ambil invitation
  const data =
    invitations[slug as keyof typeof invitations]

  // kalau ga ada
  if (!data) {
    return (
      <main className="p-10">
        Invitation Not Found
      </main>
    )
  }

  // ambil template
  const Template =
    templateMap[data.template]

  return (
    <Template
      data={data}
      guest={guest}
    />
  )
}