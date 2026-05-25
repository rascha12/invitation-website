import type { TemplateProps } from "@/types"

export default function BirthdayElegant({ data, guest }: TemplateProps) {
  const { groom: name, bride: tagline } = data.couple

  return (
    <main className="min-h-screen bg-stone-900 text-amber-50">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-lg border border-amber-700/40 p-12 text-center">
          <p className="font-serif text-sm uppercase tracking-[0.5em] text-amber-500/80">
            You Are Invited
          </p>
          <h1 className="mt-6 font-serif text-5xl text-amber-100">{name}</h1>
          {tagline && (
            <p className="mt-3 font-serif italic text-amber-400/90">{tagline}</p>
          )}
          <div className="mx-auto my-8 h-px w-24 bg-amber-700/50" />
          <p className="text-lg text-amber-200/90">{data.date}</p>
          {data.time && <p className="mt-1 text-amber-400/70">{data.time}</p>}
          <p className="mt-6 text-sm text-amber-500/60">{data.venue.name}</p>
          <p className="mt-10 text-sm text-amber-600/50">Dear</p>
          <p className="mt-1 font-serif text-2xl text-amber-100">{guest}</p>
        </div>
      </section>
    </main>
  )
}
