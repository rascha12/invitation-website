import type { TemplateProps } from "@/types"

export default function WeddingFloral({ data, guest }: TemplateProps) {
  const { groom, bride } = data.couple

  return (
    <main className="min-h-screen bg-rose-50 text-rose-950">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl rounded-3xl border border-rose-200 bg-white/80 p-10 text-center shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">
            Wedding Floral
          </p>
          <h1 className="mt-4 font-serif text-5xl text-rose-900">
            {groom} & {bride}
          </h1>
          <p className="mt-4 text-lg text-rose-700">{data.date}</p>
          {data.time && <p className="text-rose-600">{data.time}</p>}
          <div className="mt-8 border-t border-rose-100 pt-6">
            <p className="font-medium">{data.venue.name}</p>
            <p className="mt-1 text-sm text-rose-600">{data.venue.address}</p>
          </div>
          <div className="mt-8">
            <p className="text-sm text-rose-500">Kepada Yth.</p>
            <h2 className="mt-1 text-2xl font-semibold text-rose-900">{guest}</h2>
          </div>
        </div>
      </section>
    </main>
  )
}
