const REVIEWS_PER_PAGE = 24

export function getOptimizedPosterUrl(posterUrl: string, width = 400): string {
  if (posterUrl.includes("m.media-amazon.com") && posterUrl.includes("._V1_.")) {
    return posterUrl.replace("._V1_.", `._UX${width}_V1_.`)
  }

  if (posterUrl.includes("a.ltrbxd.com/resized/film-poster/") && posterUrl.includes("-600-0-900-")) {
    return posterUrl.replace("-600-0-900-", "-230-0-345-")
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
