import type { Metadata } from "next"
import FestivalTabs from "@/components/festival-tabs"
import { getFestivalGroups, getReviewsForFestivalGroup } from "@/lib/festivals"

export const metadata: Metadata = {
  title: "Film Festivals",
  description: "Festival coverage from Edinburgh, London, Venice, and beyond.",
}

export default function FestivalsPage() {
  const groups = getFestivalGroups()
  const reviewsByFestival = Object.fromEntries(
    groups.map((group) => [group.slug, getReviewsForFestivalGroup(group.slug)]),
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange">Festival coverage</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-ink md:text-6xl">Film Festivals</h1>
        <p className="mt-4 text-lg leading-8 text-ink/70">
          Browse coverage by festival — Edinburgh, London, Venice, and more.
        </p>
      </div>

      <FestivalTabs groups={groups} reviewsByFestival={reviewsByFestival} />
    </main>
  )
}
