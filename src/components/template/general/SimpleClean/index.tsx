import type { TemplateProps } from "@/types"

export default function SimpleClean({ data, guest }: TemplateProps) {
  const { groom, bride } = data.couple
  const title = bride ? `${groom} & ${bride}` : groom

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-slate-600">{data.date}</p>
          {data.time && <p className="text-slate-500">{data.time}</p>}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-medium">{data.venue.name}</p>
            <p className="mt-1 text-sm text-slate-500">{data.venue.address}</p>
          </div>
          <p className="text-slate-600">
            <span className="text-slate-400">To: </span>
            {guest}
          </p>
        </div>
      </section>
    </main>
  )
}
