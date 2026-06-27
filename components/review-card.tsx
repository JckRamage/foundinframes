import Image from "next/image"
import Link from "next/link"
import { formatDate, formatRating, type ReviewSummary } from "@/lib/reviews"

interface ReviewCardProps {
  review: ReviewSummary
  priority?: boolean
}

export default function ReviewCard({ review, priority = false }: ReviewCardProps) {
  return (
    <article className="group grid gap-5 rounded-3xl border border-ink/10 bg-white/70 p-4 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[140px_1fr]">
      <Link href={`/reviews/${review.slug}`} className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-ink/10">
        <Image
          src={review.posterUrl}
          alt={`${review.title} poster`}
          fill
          sizes="(min-width: 640px) 140px, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          priority={priority}
        />
      </Link>
      <div className="flex flex-col justify-between gap-5">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange">
            <span>{formatRating(review.rating)}</span>
            <span className="text-ink/30">/</span>
            <span className="text-ink/55">{formatDate(review.publishedDate)}</span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink">
            <Link href={`/reviews/${review.slug}`} className="transition hover:text-orange">
              {review.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm font-semibold text-ink/55">{review.year}</p>
          <p className="mt-4 text-base leading-7 text-ink/75">{review.excerpt}</p>
        </div>
        <Link
          href={`/reviews/${review.slug}`}
          className="font-semibold text-orange underline decoration-orange/30 hover:decoration-orange"
        >
          Read the review
        </Link>
      </div>
    </article>
  )
}
