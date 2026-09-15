import type { Metadata } from "next"
import ShortFormSeriesRow from "@/components/short-form-series-row"
import { shortFormSeries } from "@/lib/short-form-series"

export const metadata: Metadata = {
  title: "Content",
  description: "Short-form series from Found in Frames — director deep dives, closet tours, and more on Instagram.",
}

export default function ContentPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange">Short-form</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-maroon md:text-6xl">Series from the feed</h1>
        <p className="mt-4 text-lg leading-8 text-ink/70">
          Ongoing threads on Instagram and TikTok — deep dives, closet tours, and essays, grouped here.
        </p>
      </div>

      <div className="flex flex-col gap-10 md:gap-12">
        {shortFormSeries.map((series, index) => (
          <ShortFormSeriesRow key={series.slug} series={series} priorityCover={index === 0} />
        ))}
      </div>
    </main>
  )
}
