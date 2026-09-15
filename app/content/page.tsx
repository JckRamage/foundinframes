import type { Metadata } from "next"
import ShortFormSeriesRow from "@/components/short-form-series-row"
import { shortFormSeries } from "@/lib/short-form-series"

export const metadata: Metadata = {
  title: "Content",
  description: "Short-form series from Found in Frames — director deep dives, closet tours, and more on Instagram.",
}

export default function ContentPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-maroon md:text-5xl">
        Short-form series I&apos;m working on
      </h1>

      <div className="mt-10 flex flex-col gap-10 md:mt-12 md:gap-12">
        {shortFormSeries.map((series, index) => (
          <ShortFormSeriesRow key={series.slug} series={series} priorityCover={index === 0} />
        ))}
      </div>
    </main>
  )
}
