const REVIEWS_PER_PAGE = 24

export function getOptimizedPosterUrl(posterUrl: string): string {
  if (posterUrl.includes("a.ltrbxd.com/resized/film-poster/") && posterUrl.includes("-230-0-345-")) {
    return posterUrl.replace("-230-0-345-", "-600-0-900-")
  }

  return posterUrl
}

export function paginateReviews<T>(items: T[], page: number, perPage = REVIEWS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
  const currentPage = Math.min(safePage, totalPages)
  const start = (currentPage - 1) * perPage

  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    perPage,
    totalItems: items.length,
  }
}

export { REVIEWS_PER_PAGE }
