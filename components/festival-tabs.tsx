"use client"

import { useEffect, useState } from "react"
import ReviewListCard from "@/components/review-list-card"
import type { FestivalGroup } from "@/lib/festivals"
import type { ReviewSummary } from "@/lib/review-types"

interface FestivalTabsProps {
  groups: FestivalGroup[]
  reviewsByFestival: Record<string, ReviewSummary[]>
}

export default function FestivalTabs({ groups, reviewsByFestival }: FestivalTabsProps) {
  const [activeSlug, setActiveSlug] = useState(groups[0]?.slug ?? "")

  useEffect(() => {
    let active = true

    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (!active) return
      if (hash && groups.some((group) => group.slug === hash)) {
        setActiveSlug(hash)
      }
    }

    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => {
      active = false
      window.removeEventListener("hashchange", syncFromHash)
    }
  }, [groups])

  const activeGroup = groups.find((group) => group.slug === activeSlug) ?? groups[0]
  const activeReviews = activeGroup ? (reviewsByFestival[activeGroup.slug] ?? []) : []

  function selectFestival(slug: string) {
    setActiveSlug(slug)
    window.history.replaceState(null, "", `#${slug}`)
  }

  if (groups.length === 0) {
    return (
      <p className="rounded-3xl border border-ink/10 bg-white/70 p-8 text-ink/70">
        No festival-tagged reviews found yet.
      </p>
    )
  }

  return (
    <div id={activeGroup?.slug} className="scroll-mt-28">
      <div
        className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Film festivals"
      >
        {groups.map((group) => {
          const selected = group.slug === activeGroup?.slug

          return (
            <button
              key={group.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectFestival(group.slug)}
              className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-semibold transition md:px-5 md:text-base ${
                selected
                  ? "bg-maroon text-cream shadow-md"
                  : "border border-ink/15 bg-white/70 text-ink/75 hover:border-orange/40 hover:text-maroon"
              }`}
            >
              {group.shortName}
              <span className={`ml-2 text-xs ${selected ? "text-cream/75" : "text-ink/45"}`}>{group.reviewCount}</span>
            </button>
          )
        })}
      </div>

      {activeGroup ? (
        <div role="tabpanel" className="mt-8">
          <div className="mb-6 border-b border-ink/10 pb-4">
            <h2 className="font-display text-3xl font-bold text-maroon md:text-4xl">{activeGroup.name}</h2>
            <p className="mt-2 text-sm text-ink/60">
              {activeGroup.reviewCount} {activeGroup.reviewCount === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {activeReviews.map((review, index) => (
              <ReviewListCard
                key={review.slug}
                review={review}
                priority={index < 4}
                badge={
                  review.festivalYear && review.festivalFilmNumber
                    ? `${review.festivalYear} · Film #${review.festivalFilmNumber}`
                    : review.festivalFilmNumber
                      ? `Film #${review.festivalFilmNumber}`
                      : undefined
                }
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
