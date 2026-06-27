import Link from "next/link"

interface ReviewsPaginationProps {
  currentPage: number
  totalPages: number
}

export default function ReviewsPagination({ currentPage, totalPages }: ReviewsPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pages = buildPageNumbers(currentPage, totalPages)

  return (
    <nav aria-label="Review pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="rounded-xl border border-ink/10 bg-white/70 px-4 py-2 text-sm font-semibold text-ink transition hover:border-orange/40 hover:text-orange"
        >
          Previous
        </Link>
      ) : null}

      {pages.map((page) =>
        page === "…" ? (
          <span key={`ellipsis-${page}-${currentPage}`} className="px-2 text-ink/40">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              page === currentPage
                ? "bg-maroon text-cream"
                : "border border-ink/10 bg-white/70 text-ink hover:border-orange/40 hover:text-orange"
            }`}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="rounded-xl border border-ink/10 bg-white/70 px-4 py-2 text-sm font-semibold text-ink transition hover:border-orange/40 hover:text-orange"
        >
          Next
        </Link>
      ) : null}
    </nav>
  )
}

function pageHref(page: number) {
  return page === 1 ? "/reviews" : `/reviews?page=${page}`
}

function buildPageNumbers(currentPage: number, totalPages: number): Array<number | "…"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages: Array<number | "…"> = [1]

  if (currentPage > 3) {
    pages.push("…")
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  if (currentPage < totalPages - 2) {
    pages.push("…")
  }

  pages.push(totalPages)
  return pages
}
