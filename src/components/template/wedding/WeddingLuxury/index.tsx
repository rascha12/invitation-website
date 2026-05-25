import type { TemplateProps } from "@/types"

export default function WeddingLuxury({
  data,
  guest,
}: TemplateProps) {
  const { groom, bride } = data.couple
  const mapsQuery = encodeURIComponent(
    data.venue.lat != null && data.venue.lng != null
      ? `${data.venue.lat},${data.venue.lng}`
      : data.venue.address
  )

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="mb-4 text-lg tracking-wide text-white/70">
            Wedding Invitation
          </p>

          <h1 className="text-5xl font-bold sm:text-6xl">
            {groom} & {bride}
          </h1>

          <div className="mt-6 space-y-1 text-lg text-white/90">
            <p>{data.date}</p>
            {data.time && <p>{data.time}</p>}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-widest text-white/50">
              Lokasi
            </p>
            <p className="mt-2 text-xl font-semibold">
              {data.venue.name}
            </p>
            <p className="mt-2 text-white/80">
              {data.venue.address}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm underline underline-offset-4 text-white/70 hover:text-white"
            >
              Buka di Google Maps
            </a>
          </div>

          <div className="mt-10">
            <p className="text-white/70">Kepada Yth.</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {guest}
            </h2>
          </div>
        </div>
      </section>
    </main>
  )
}
