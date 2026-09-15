import { cache } from "react"
import { getAllReviewSummaries } from "@/lib/reviews"
import type { ReviewSummary } from "@/lib/review-types"

export interface FestivalEdition {
  slug: string
  name: string
  shortName: string
  year: number
  reviewCount: number
  latestPublishedDate: string
}

export interface FestivalGroup {
  slug: string
  name: string
  shortName: string
  reviewCount: number
}

export interface FestivalReview extends ReviewSummary {
  festivalFilmNumber: number
}

const festivalDisplayOrder = ["EIFF", "LFF", "Venice", "TIFF"]

function loadFestivalReviews(): FestivalReview[] {
  return getAllReviewSummaries()
    .map((review) => {
      if (!review.festivalEdition || !review.festivalFilmNumber || !review.festivalShortName) {
        return null
      }

      return {
        ...review,
        festivalFilmNumber: review.festivalFilmNumber,
      }
    })
    .filter((review): review is FestivalReview => review !== null)
}

export const getFestivalReviews = cache((): FestivalReview[] => loadFestivalReviews())

export function getFestivalGroups(): FestivalGroup[] {
  const byFestival = new Map<string, FestivalGroup>()

  for (const review of getFestivalReviews()) {
    const slug = review.festivalShortName!.toLowerCase()
    const existing = byFestival.get(slug)

    if (!existing) {
      byFestival.set(slug, {
        slug,
        name: review.festivalName ?? review.festivalShortName!,
        shortName: review.festivalShortName!,
        reviewCount: 1,
      })
      continue
    }

    existing.reviewCount += 1
  }

  return [...byFestival.values()].sort((a, b) => {
    const aIndex = festivalDisplayOrder.indexOf(a.shortName)
    const bIndex = festivalDisplayOrder.indexOf(b.shortName)

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex
    }

    if (aIndex !== -1) {
      return -1
    }

    if (bIndex !== -1) {
      return 1
    }

    return a.name.localeCompare(b.name)
  })
}

export function getReviewsForFestivalGroup(slug: string): FestivalReview[] {
  return getFestivalReviews()
    .filter((review) => review.festivalShortName!.toLowerCase() === slug.toLowerCase())
    .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate))
}

export function getFestivalEditions(): FestivalEdition[] {
  const byEdition = new Map<string, FestivalEdition>()

  for (const review of getFestivalReviews()) {
    const editionSlug = review.festivalEdition!
    const existing = byEdition.get(editionSlug)

    if (!existing) {
      byEdition.set(editionSlug, {
        slug: editionSlug,
        name: review.festivalName ?? editionSlug,
        shortName: review.festivalShortName ?? editionSlug,
        year: review.festivalYear ?? Number(review.publishedDate.slice(0, 4)),
        reviewCount: 1,
        latestPublishedDate: review.publishedDate,
      })
      continue
    }

    existing.reviewCount += 1
    if (Date.parse(review.publishedDate) > Date.parse(existing.latestPublishedDate)) {
      existing.latestPublishedDate = review.publishedDate
    }
  }

  return [...byEdition.values()].sort(
    (a, b) => Date.parse(b.latestPublishedDate) - Date.parse(a.latestPublishedDate),
  )
}

export function getLatestFestivalEdition(): FestivalEdition | null {
  return getFestivalEditions()[0] ?? null
}

export function getReviewsForFestivalEdition(slug: string): FestivalReview[] {
  return getFestivalReviews()
    .filter((review) => review.festivalEdition === slug)
    .sort((a, b) => a.festivalFilmNumber - b.festivalFilmNumber)
}
