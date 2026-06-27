import Image from "next/image"
import Link from "next/link"
import ReviewPosterCard from "@/components/review-poster-card"
import ShortFormCard from "@/components/short-form-card"
import VideoEssayCard from "@/components/video-essay-card"
import {
  featuredShortForm,
  featuredVideoEssays,
  pinnedReviewSlugs,
  shortFormSummary,
  shortFormSummaryUrl,
} from "@/lib/home-content"
import { getReviewsBySlugs } from "@/lib/reviews"

export default function HomePage() {
  const pinnedReviews = getReviewsBySlugs([...pinnedReviewSlugs])

  return (
    <main>
      <section className="w-full bg-maroon px-4 py-14 text-white md:px-6 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-cream/25 shadow-xl">
            <Image
              src="/found-in-frames-logo.png"
              alt="Found in Frames logo"
              fill
              sizes="(min-width: 768px) 384px, 80vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 space-y-6">
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">Found in Frames</h1>
            <p className="max-w-2xl text-lg text-cream/90 md:text-xl">
              Found in Frames is my home for film criticism. In a world where it feels less valued than ever, I write
              about film here in every format I can — long reviews, video essays, and short-form work that still has
              something to say. You&apos;ll find all the random thoughts here.
            </p>
            <div className="relative z-10 flex flex-wrap gap-3">
              <Link
                href="/reviews"
                prefetch={false}
                className="inline-flex rounded-2xl bg-orange px-6 py-3 font-semibold text-cream transition hover:bg-cream hover:text-maroon"
              >
                Browse reviews
              </Link>
              <Link
                href="https://www.youtube.com/@FoundInFrames"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-cream/25 bg-cream/10 px-6 py-3 font-semibold text-cream transition hover:bg-cream hover:text-maroon"
              >
                Watch on YouTube
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream/80 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange">Featured</p>
              <h2 className="mt-2 font-display text-4xl font-bold text-maroon md:text-5xl">Some of My Fav Reviews</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
                A handful of reviews I keep coming back to — favourites from the archive, and a few of the longest.
              </p>
            </div>
            <Link
              href="/reviews"
              className="font-semibold text-orange underline decoration-orange/30 hover:decoration-orange"
            >
              View all reviews
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {pinnedReviews.map((review, index) => (
              <ReviewPosterCard key={review.slug} review={review} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-maroon py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange">Selected essays</p>
              <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Video Essays</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-cream/75">
                Longer pieces where I get to properly sit with an idea.
              </p>
            </div>
            <Link
              href="https://www.youtube.com/@FoundInFrames"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange underline decoration-orange/30 hover:decoration-orange"
            >
              Watch on YouTube
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredVideoEssays.map((essay) => (
              <VideoEssayCard key={essay.url} essay={essay} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange">Short-form</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-maroon md:text-5xl">From the Feed</h2>
            <p className="mt-4 text-lg leading-8 text-ink/75">{shortFormSummary}</p>
            <Link
              href={shortFormSummaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-semibold text-orange underline decoration-orange/30 hover:decoration-orange"
            >
              Read the full breakdown on Instagram
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredShortForm.map((pick, index) => (
              <ShortFormCard key={pick.url} pick={pick} priority={index < 3} />
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="https://www.instagram.com/found_in_frames/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-orange px-6 py-3 font-semibold text-cream transition hover:bg-gold"
            >
              Follow on Instagram
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
