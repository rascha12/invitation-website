import type { TemplateProps } from "@/types"

export default function KoreanStyle({ data, guest }: TemplateProps) {
  const { groom, bride } = data.couple

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-neutral-800">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-xs tracking-[0.6em] text-neutral-400">초대합니다</p>
          <h1 className="mt-8 text-3xl font-light leading-relaxed">
            {groom}
            <br />
            <span className="text-neutral-400">&</span>
            <br />
            {bride}
          </h1>
          <p className="mt-10 text-neutral-600">{data.date}</p>
          {data.time && <p className="mt-1 text-sm text-neutral-500">{data.time}</p>}
          <p className="mt-8 text-sm text-neutral-500">{data.venue.name}</p>
          <p className="mt-12 border-t border-neutral-200 pt-8 text-sm text-neutral-400">
            {guest}
          </p>
        </div>
      </section>
    </main>
  )
}
