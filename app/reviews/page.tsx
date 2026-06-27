import type { Metadata } from "next"
import ReviewPosterCard from "@/components/review-poster-card"
import ReviewsPagination from "@/components/reviews-pagination"
import { paginateReviews } from "@/lib/posters"
import { getAllReviewSummaries } from "@/lib/reviews"

export const metadata: Metadata = {
  title: "Reviews",
  description: "Long-form Found in Frames film reviews.",
}

interface ReviewsPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam ?? "1")
  const allReviews = getAllReviewSummaries()
  const { items: reviews, currentPage, totalPages, totalItems } = paginateReviews(allReviews, page)

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange">Review archive</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-ink md:text-7xl">Reviews</h1>
        {totalPages > 1 ? (
          <p className="mt-4 text-sm font-semibold text-ink/55">
            Page {currentPage} of {totalPages} · {totalItems} reviews
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewPosterCard key={review.slug} review={review} priority={index < 8} />
          ))
        ) : (
          <p className="rounded-3xl border border-ink/10 bg-white/70 p-8 text-ink/70">
            No long-form reviews have been imported yet.
          </p>
        )}
      </div>

      <ReviewsPagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  )
}
