import type { TemplateProps } from "@/types"

export default function BirthdayCute({ data, guest }: TemplateProps) {
  const { groom: name, bride: tagline } = data.couple

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-pink-100 text-sky-900">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md rounded-[2rem] bg-white p-10 text-center shadow-xl">
          <p className="text-4xl">🎂</p>
          <p className="mt-2 text-sm font-bold uppercase tracking-widest text-pink-400">
            Birthday Party
          </p>
          <h1 className="mt-4 text-4xl font-bold text-pink-500">{name}</h1>
          {tagline && <p className="mt-2 text-lg text-sky-600">{tagline}</p>}
          <p className="mt-6 text-lg font-medium">{data.date}</p>
          {data.time && <p className="text-sky-600">{data.time}</p>}
          <p className="mt-4 text-sm text-sky-700">{data.venue.name}</p>
          <div className="mt-8 rounded-2xl bg-pink-50 px-4 py-3">
            <p className="text-xs text-pink-400">Untuk</p>
            <p className="text-xl font-semibold text-pink-600">{guest}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
