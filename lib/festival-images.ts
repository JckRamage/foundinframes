import { getOptimizedPosterUrl } from "@/lib/posters"
import { getReviewsForFestivalGroup } from "@/lib/festivals"

const festivalCoverImages: Record<string, string> = {
  eiff: "/festivals/eiff.jpg",
  lff: "/festivals/lff.jpg",
  venice: "/festivals/venice.jpg",
  tiff: "/festivals/tiff.jpg",
}

export function getFestivalCoverImage(slug: string): string {
  const mapped = festivalCoverImages[slug.toLowerCase()]
  if (mapped) {
    return mapped
  }

  const latestReviewPoster = getReviewsForFestivalGroup(slug)[0]?.posterUrl
  if (latestReviewPoster) {
    return getOptimizedPosterUrl(latestReviewPoster)
  }

  return "/poster-placeholder.svg"
}
