import Image from "next/image"
import Link from "next/link"
import { getOptimizedPosterUrl } from "@/lib/posters"
import { formatRating } from "@/lib/review-format"
import type { ReviewSummary } from "@/lib/review-types"

interface ReviewPosterCardProps {
  review: ReviewSummary
  priority?: boolean
  size?: "default" | "compact"
}

export default function ReviewPosterCard({ review, priority = false, size = "default" }: ReviewPosterCardProps) {
  const compact = size === "compact"

  return (
    <article className="group">
      <Link href={`/reviews/${review.slug}`} className="block">
        <div
          className={`relative mx-auto aspect-[2/3] overflow-hidden bg-maroon/5 shadow-md transition hover:border-orange/40 hover:shadow-lg ${
            compact
              ? "max-w-[9.5rem] rounded-xl border-2 border-maroon/10"
              : "rounded-2xl border-4 border-maroon/15 shadow-lg group-hover:-translate-y-1 group-hover:border-orange/40 group-hover:shadow-xl"
          }`}
        >
          <Image
            src={getOptimizedPosterUrl(review.posterUrl)}
            alt={`${review.title} poster`}
            fill
            sizes={compact ? "152px" : "(min-width: 1024px) 320px, (min-width: 768px) 33vw, 50vw"}
            quality={compact ? 70 : 75}
            priority={priority}
            className={`object-cover ${compact ? "" : "transition duration-300 group-hover:scale-[1.02]"}`}
          />
        </div>
        <div className={`space-y-1 ${compact ? "mt-3" : "mt-4"}`}>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-orange md:text-xs">
            {formatRating(review.rating)} · {review.year}
          </p>
          <h3
            className={`font-display font-bold leading-snug text-maroon transition group-hover:text-orange ${
              compact ? "text-base md:text-lg" : "text-xl md:text-2xl"
            }`}
          >
            {review.title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
