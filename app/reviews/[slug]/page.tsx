import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { marked } from "marked"
import { formatDate, formatRating, getAllReviewSummaries, getReviewBySlug } from "@/lib/reviews"

interface ReviewPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllReviewSummaries().map((review) => ({
    slug: review.slug,
  }))
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params
  const review = getReviewBySlug(slug)

  if (!review) {
    return {
      title: "Review not found",
    }
  }

  return {
    title: `${review.title} review`,
    description: review.excerpt,
    openGraph: {
      title: `${review.title} review | Found in Frames`,
      description: review.excerpt,
      images: [review.posterUrl],
    },
  }
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params
  const review = getReviewBySlug(slug)

  if (!review) {
    notFound()
  }

  const html = await marked.parse(review.content)

  return (
    <main>
      <article className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[320px_1fr] md:px-6 md:py-20">
        <aside>
          <div className="sticky top-28">
            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border-4 border-ink/10 bg-ink/10 shadow-2xl">
              <Image
                src={review.posterUrl}
                alt={`${review.title} poster`}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3 rounded-3xl border border-ink/10 bg-white/70 p-5 text-sm shadow-lg backdrop-blur-sm">
              <div>
                <dt className="font-bold uppercase tracking-[0.16em] text-ink/45">Rating</dt>
                <dd className="mt-1 text-lg font-bold text-orange">{formatRating(review.rating)}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-[0.16em] text-ink/45">Year</dt>
                <dd className="mt-1 text-lg font-bold text-ink">{review.year}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-bold uppercase tracking-[0.16em] text-ink/45">Watched</dt>
                <dd className="mt-1 font-semibold text-ink">{formatDate(review.watchedDate)}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div>
          <Link href="/reviews" className="text-sm font-bold uppercase tracking-[0.2em] text-orange hover:text-maroon">
            Reviews
          </Link>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-ink md:text-7xl">{review.title}</h1>
          <div className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-ink/55">
            <span>{formatDate(review.publishedDate)}</span>
          </div>
          <div
            className="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:text-ink prose-p:leading-9 prose-a:text-orange prose-strong:text-ink"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>
    </main>
  )
}
