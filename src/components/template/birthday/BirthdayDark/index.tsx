import type { TemplateProps } from "@/types"

export default function BirthdayDark({ data, guest }: TemplateProps) {
  const { groom: name, bride: tagline } = data.couple

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-400">
            Birthday Dark
          </p>
          <h1 className="mt-6 text-5xl font-bold">{name}</h1>
          {tagline && <p className="mt-2 text-violet-300">{tagline}</p>}
          <p className="mt-8 text-2xl text-zinc-300">{data.date}</p>
          {data.time && <p className="mt-2 text-zinc-500">{data.time}</p>}
          <p className="mt-6 text-zinc-400">{data.venue.name}</p>
          <p className="mt-1 text-sm text-zinc-600">{data.venue.address}</p>
          <div className="mt-10 border-t border-zinc-800 pt-8">
            <p className="text-zinc-500">Halo,</p>
            <p className="mt-1 text-2xl font-semibold text-violet-200">{guest}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
