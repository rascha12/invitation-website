import type { TemplateProps } from "@/types"

export default function WeddingMinimal({ data, guest }: TemplateProps) {
  const { groom, bride } = data.couple

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
            The Wedding Of
          </p>
          <h1 className="mt-6 text-4xl font-light tracking-tight sm:text-5xl">
            {groom}
            <span className="mx-3 text-neutral-300">&</span>
            {bride}
          </h1>
          <div className="mx-auto mt-8 h-px w-16 bg-neutral-300" />
          <p className="mt-8 text-neutral-600">{data.date}</p>
          {data.time && <p className="mt-1 text-neutral-500">{data.time}</p>}
          <p className="mt-6 text-sm text-neutral-500">{data.venue.name}</p>
          <p className="mt-10 text-sm text-neutral-400">Kepada Yth.</p>
          <p className="mt-1 text-xl">{guest}</p>
        </div>
      </section>
    </main>
  )
}
