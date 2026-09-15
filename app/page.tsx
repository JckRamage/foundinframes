import Image from "next/image"
import Link from "next/link"
import HomeSection from "@/components/home-section"
import ReviewListCard from "@/components/review-list-card"
import ReviewPosterCard from "@/components/review-poster-card"
import SectionHeading from "@/components/section-heading"
import ShortFormCard from "@/components/short-form-card"
import VideoEssayCard from "@/components/video-essay-card"
import { getFestivalGroups } from "@/lib/festivals"
import {
  featuredShortForm,
  featuredVideoEssays,
  pinnedReviewSlugs,
  shortFormSummary,
  shortFormSummaryUrl,
} from "@/lib/home-content"
import { getAllReviewSummaries, getReviewsBySlugs } from "@/lib/reviews"

export default function HomePage() {
  const recentReviews = getAllReviewSummaries().slice(0, 4)
  const pinnedReviews = getReviewsBySlugs([...pinnedReviewSlugs])
  const festivalGroups = getFestivalGroups()

  return (
    <main>
      <section className="w-full bg-maroon px-4 py-8 text-white md:px-6 md:py-12">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-[1.5rem] border-4 border-cream/25 shadow-lg md:mx-0">
            <Image
              src="/found-in-frames-logo.png"
              alt="Found in Frames logo"
              fill
              sizes="220px"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">Found in Frames</h1>
            <p className="max-w-2xl text-base leading-7 text-cream/90 md:text-lg">
              Found in Frames is my home for film criticism. In a world where it feels less valued than ever, I write
              about film here in every format I can — long reviews, video essays, and short-form work that still has
              something to say. You&apos;ll find all the random thoughts here.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/reviews"
                prefetch={false}
                className="inline-flex rounded-2xl bg-orange px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-cream hover:text-maroon md:text-base"
              >
                Browse reviews
              </Link>
              <Link
                href="/festivals"
                className="rounded-2xl border border-cream/25 bg-cream/10 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-cream hover:text-maroon md:text-base"
              >
                Festival coverage
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeSection className="bg-cream/80">
        <SectionHeading
          eyebrow="Latest"
          title="Most Recent Reviews"
          description="The newest long-form reviews from the archive."
          href="/reviews"
          linkLabel="View all reviews"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {recentReviews.map((review, index) => (
            <ReviewListCard key={review.slug} review={review} priority={index < 2} />
          ))}
        </div>
      </HomeSection>

      {festivalGroups.length > 0 ? (
        <HomeSection>
          <SectionHeading
            eyebrow="Festival coverage"
            title="Festivals I have covered"
            href="/festivals"
            linkLabel="Browse all festival coverage"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {festivalGroups.map((group) => (
              <Link
                key={group.slug}
                href={`/festivals#${group.slug}`}
                className="group rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 shadow-sm transition hover:border-orange/35 hover:bg-white hover:shadow-md"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-orange">{group.shortName}</p>
                <h3 className="mt-1 font-display text-lg font-bold leading-snug text-maroon transition group-hover:text-orange">
                  {group.name}
                </h3>
                <p className="mt-1.5 text-xs font-semibold text-ink/55">
                  {group.reviewCount} {group.reviewCount === 1 ? "review" : "reviews"}
                </p>
              </Link>
            ))}
          </div>
        </HomeSection>
      ) : null}

      <HomeSection className="border-y border-ink/10 bg-white/40">
        <SectionHeading
          eyebrow="Featured"
          title="Some of My Favourite Reviews"
          description="A handful of reviews I keep coming back to from across the archive."
          href="/reviews"
          linkLabel="Explore the archive"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {pinnedReviews.map((review, index) => (
            <ReviewPosterCard key={review.slug} review={review} priority={index < 2} size="compact" />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-maroon text-cream">
        <SectionHeading
          eyebrow="Selected essays"
          title="Video Essays"
          href="https://www.youtube.com/@FoundInFrames"
          linkLabel="Watch on YouTube"
          inverted
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredVideoEssays.map((essay) => (
            <VideoEssayCard key={essay.url} essay={essay} />
          ))}
        </div>
      </HomeSection>

      <HomeSection>
        <SectionHeading
          eyebrow="Short-form"
          title="From the Feed"
          description={shortFormSummary}
          href="/content"
          linkLabel="Browse series"
        />
        <Link
          href={shortFormSummaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-block text-sm font-semibold text-orange underline decoration-orange/30 hover:decoration-orange"
        >
          Read the full breakdown on Instagram
        </Link>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredShortForm.map((pick, index) => (
            <ShortFormCard key={pick.url} pick={pick} priority={index < 4} />
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
      </HomeSection>
    </main>
  )
}
