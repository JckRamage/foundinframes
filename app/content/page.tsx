import type { Metadata } from "next"
import Link from "next/link"
import ShortFormSeriesRow from "@/components/short-form-series-row"
import { contentPageIntro, shortFormSeries } from "@/lib/short-form-series"

export const metadata: Metadata = {
  title: "Content",
  description: "Short-form series from Found in Frames — director deep dives, closet tours, and more on Instagram.",
}

export default function ContentPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange">Short-form</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-maroon md:text-5xl">
        Series & threads
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/75 md:text-lg">{contentPageIntro}</p>

      <div className="mt-10 flex flex-col gap-10 md:mt-14 md:gap-12">
        {shortFormSeries.map((series, index) => (
          <ShortFormSeriesRow key={series.slug} series={series} priorityCover={index === 0} />
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-ink/10 bg-white/70 p-8 text-center shadow-md">
        <p className="font-display text-xl font-bold text-maroon">One-offs & everything else</p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-ink/70 md:text-base">
          Not every clip belongs to a series. The homepage feed still has standalone picks, plus long reviews and video
          essays.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl border border-maroon/20 px-5 py-2.5 text-sm font-semibold text-maroon transition hover:border-orange/40 hover:text-orange"
          >
            Homepage feed
          </Link>
          <Link
            href="https://www.instagram.com/found_in_frames/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-orange px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold"
          >
            Follow on Instagram
          </Link>
        </div>
      </div>
    </main>
  )
}
