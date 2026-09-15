"use client"

import Image from "next/image"
import Link from "next/link"
import { getOptimizedPosterUrl } from "@/lib/posters"
import { formatDate, formatRating } from "@/lib/review-format"
import type { ReviewSummary } from "@/lib/review-types"

interface ReviewListCardProps {
  review: ReviewSummary
  priority?: boolean
  badge?: string
}

export default function ReviewListCard({ review, priority = false, badge }: ReviewListCardProps) {
  return (
    <article className="group">
      <Link
        href={`/reviews/${review.slug}`}
        className="flex gap-4 rounded-2xl border border-ink/10 bg-white/60 p-3 shadow-sm transition hover:border-orange/30 hover:bg-white/90 hover:shadow-md md:gap-5 md:p-4"
      >
        <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-xl border-2 border-maroon/10 bg-maroon/5 md:w-24">
          <Image
            src={getOptimizedPosterUrl(review.posterUrl)}
            alt={`${review.title} poster`}
            fill
            sizes="96px"
            quality={70}
            priority={priority}
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-orange md:text-xs">
              {formatRating(review.rating)} · {review.year}
            </p>
            {badge ? (
              <span className="rounded-full bg-maroon/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-maroon">
                {badge}
              </span>
            ) : null}
          </div>
          <h3 className="font-display text-lg font-bold leading-snug text-maroon transition group-hover:text-orange md:text-xl">
            {review.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-ink/75">{review.excerpt}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
            Published {formatDate(review.publishedDate)}
          </p>
        </div>
      </Link>
    </article>
  )
}
