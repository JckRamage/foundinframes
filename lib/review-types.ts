export interface ReviewFrontmatter {
  title: string
  year: number
  rating: number | null
  watchedDate: string
  publishedDate: string
  letterboxdUrl: string
  posterUrl: string
  wordCount: number
  slug: string
  excerpt?: string
  festivalEdition?: string | null
  festivalName?: string | null
  festivalShortName?: string | null
  festivalYear?: number | null
  festivalFilmNumber?: number | null
}

export type ReviewSummary = ReviewFrontmatter & {
  excerpt: string
}
