import Image from "next/image"
import Link from "next/link"
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
          <Image
            src={review.posterUrl}
            alt={`${review.title} poster`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={priority}
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
