import Link from "next/link"
import PosterImage from "@/components/poster-image"
import { formatRating, type ReviewSummary } from "@/lib/reviews"

interface ReviewPosterCardProps {
  review: ReviewSummary
  priority?: boolean
}

export default function ReviewPosterCard({ review, priority = false }: ReviewPosterCardProps) {
  return (
    <article className="group">
      <Link href={`/reviews/${review.slug}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border-4 border-maroon/15 bg-maroon/5 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:border-orange/40 group-hover:shadow-xl">
          <PosterImage
            src={review.posterUrl}
            alt={`${review.title} poster`}
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
            priority={priority}
            className="transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {formatRating(review.rating)} · {review.year}
          </p>
          <h3 className="font-display text-xl font-bold leading-snug text-maroon transition group-hover:text-orange md:text-2xl">
            {review.title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
