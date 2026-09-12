import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import TurndownService from "turndown"

export const contentDirectory = path.join(process.cwd(), "content", "reviews")
export const minimumWordCount = Number(process.env.MIN_REVIEW_WORDS ?? 400)
export const placeholderPoster = "/poster-placeholder.svg"

export interface ReviewInput {
  title: string
  year: number
  rating: number | null
  watchedDate: string
  publishedDate: string
  letterboxdUrl: string
  posterUrl?: string
  reviewMarkdown: string
  tmdbMovieId?: string
}

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
})

export function extractLetterboxdFilmId(posterUrl?: string): string | undefined {
  if (!posterUrl) {
    return undefined
  }

  const match = posterUrl.match(/\/(\d{4,})-[^/]+\.(jpg|webp)/i)
  return match?.[1]
}

export interface ExistingReviewRecord {
  fileName: string
  slug: string
  title: string
  year: number
  rating: number | null
  watchedDate: string
  publishedDate: string
  letterboxdUrl: string
  posterUrl: string
  wordCount: number
  content: string
}

export interface ReviewIndex {
  byUrl: Map<string, ExistingReviewRecord>
  byFilmId: Map<string, ExistingReviewRecord>
  bySignature: Map<string, ExistingReviewRecord>
  slugs: Set<string>
}

export async function loadReviewIndex(): Promise<ReviewIndex> {
  const index: ReviewIndex = {
    byUrl: new Map(),
    byFilmId: new Map(),
    bySignature: new Map(),
    slugs: new Set(),
  }

  try {
    const fileNames = await fs.readdir(contentDirectory)

    for (const fileName of fileNames.filter((name) => name.endsWith(".md"))) {
      const fileContents = await fs.readFile(path.join(contentDirectory, fileName), "utf8")
      const { data, content } = matter(fileContents)
      const slug = String(data.slug ?? fileName.replace(/\.md$/, ""))

      if (
        typeof data.title !== "string" ||
        !Number.isFinite(Number(data.year)) ||
        typeof data.watchedDate !== "string" ||
        typeof data.publishedDate !== "string" ||
        typeof data.letterboxdUrl !== "string" ||
        typeof data.posterUrl !== "string"
      ) {
        continue
      }

      const record: ExistingReviewRecord = {
        fileName,
        slug,
        title: data.title,
        year: Number(data.year),
        rating: optionalNumber(data.rating),
        watchedDate: data.watchedDate,
        publishedDate: data.publishedDate,
        letterboxdUrl: data.letterboxdUrl,
        posterUrl: data.posterUrl,
        wordCount: Number(data.wordCount) || countWords(content),
        content,
      }

      registerReviewRecord(index, record)
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error
    }
  }

  return index
}

export function findExistingReview(index: ReviewIndex, input: ReviewInput): ExistingReviewRecord | undefined {
  const normalizedUrl = normalizeLetterboxdUrl(input.letterboxdUrl)
  const byUrl = index.byUrl.get(normalizedUrl)
  if (byUrl) {
    return byUrl
  }

  const filmId = extractLetterboxdFilmId(input.posterUrl)
  if (filmId) {
    const byFilmId = index.byFilmId.get(filmId)
    if (byFilmId) {
      return byFilmId
    }
  }

  const signature = createReviewSignature(input.title, input.year, input.watchedDate)
  return index.bySignature.get(signature)
}

export async function syncReviewFromLetterboxd(
  input: ReviewInput,
  index: ReviewIndex,
  dryRun = false,
): Promise<"created" | "updated" | "skipped"> {
  await fs.mkdir(contentDirectory, { recursive: true })

  const reviewMarkdown = input.reviewMarkdown.trim()
  const wordCount = countWords(reviewMarkdown)
  const existing = findExistingReview(index, input)

  if (existing) {
    if (wordCount <= minimumWordCount) {
      return "skipped"
    }

    const posterUrl = input.posterUrl ?? existing.posterUrl
    const changed =
      existing.content.trim() !== reviewMarkdown ||
      existing.rating !== input.rating ||
      existing.publishedDate !== input.publishedDate ||
      existing.watchedDate !== input.watchedDate ||
      existing.title !== input.title ||
      normalizeLetterboxdUrl(existing.letterboxdUrl) !== normalizeLetterboxdUrl(input.letterboxdUrl) ||
      existing.posterUrl !== posterUrl

    if (!changed) {
      return "skipped"
    }

    const filePath = path.join(contentDirectory, existing.fileName)
    const fileContents = buildReviewFileContents(input, existing.slug, posterUrl, wordCount, reviewMarkdown)

    if (dryRun) {
      console.log(`[dry-run] would update ${path.relative(process.cwd(), filePath)}`)
      return "updated"
    }

    await fs.writeFile(filePath, fileContents, "utf8")
    console.log(`Updated ${path.relative(process.cwd(), filePath)}`)

    unregisterReviewRecord(index, existing)
    registerReviewRecord(index, {
      ...existing,
      title: input.title,
      rating: input.rating,
      watchedDate: input.watchedDate,
      publishedDate: input.publishedDate,
      letterboxdUrl: input.letterboxdUrl,
      posterUrl,
      wordCount,
      content: reviewMarkdown,
    })

    return "updated"
  }

  if (wordCount <= minimumWordCount) {
    return "skipped"
  }

  const slug = createUniqueSlug(slugify(`${input.title}-${input.year}`), index.slugs)
  const posterUrl = input.posterUrl ?? (await getPosterFromTmdb(input.tmdbMovieId)) ?? placeholderPoster
  const filePath = path.join(contentDirectory, `${slug}.md`)
  const fileContents = buildReviewFileContents(input, slug, posterUrl, wordCount, reviewMarkdown)

  if (dryRun) {
    console.log(`[dry-run] would create ${path.relative(process.cwd(), filePath)}`)
    return "created"
  }

  await fs.writeFile(filePath, fileContents, "utf8")
  console.log(`Created ${path.relative(process.cwd(), filePath)}`)

  registerReviewRecord(index, {
    fileName: `${slug}.md`,
    slug,
    title: input.title,
    year: input.year,
    rating: input.rating,
    watchedDate: input.watchedDate,
    publishedDate: input.publishedDate,
    letterboxdUrl: input.letterboxdUrl,
    posterUrl,
    wordCount,
    content: reviewMarkdown,
  })

  return "created"
}

export async function writeReviewIfNew(input: ReviewInput, dryRun = false): Promise<"created" | "skipped"> {
  const index = await loadReviewIndex()

  if (findExistingReview(index, input)) {
    return "skipped"
  }

  const result = await syncReviewFromLetterboxd(input, index, dryRun)
  return result === "created" ? "created" : "skipped"
}

export function htmlDescriptionToMarkdown(description: string): string {
  const htmlWithoutPoster = description
    .replace(/<p>\s*<img[^>]+>\s*<\/p>/i, "")
    .replace(/<p>\s*Watched on .*?<\/p>/i, "")

  return turndown.turndown(htmlWithoutPoster).trim()
}

export function extractPosterUrl(description: string): string | undefined {
  const match = description.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1]
}

export function countWords(markdown: string): number {
  return markdown
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_`~\-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function getPosterFromTmdb(tmdbMovieId?: string): Promise<string | undefined> {
  const apiKey = process.env.TMDB_API_KEY

  if (!apiKey || !tmdbMovieId) {
    return undefined
  }

  const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbMovieId}?api_key=${apiKey}`)

  if (!response.ok) {
    return undefined
  }

  const data = (await response.json()) as { poster_path?: string }

  if (!data.poster_path) {
    return undefined
  }

  return `https://image.tmdb.org/t/p/w500${data.poster_path}`
}

export async function searchTmdbPoster(title: string, year: number): Promise<string | undefined> {
  const apiKey = process.env.TMDB_API_KEY

  if (!apiKey) {
    return undefined
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    query: title,
    year: String(year),
  })
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?${params.toString()}`)

  if (!response.ok) {
    return undefined
  }

  const data = (await response.json()) as { results?: Array<{ poster_path?: string }> }
  const posterPath = data.results?.find((result) => result.poster_path)?.poster_path

  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : undefined
}

function normalizeLetterboxdUrl(url: string): string {
  return url.trim().replace(/\/+$/, "")
}

function buildReviewFileContents(
  input: ReviewInput,
  slug: string,
  posterUrl: string,
  wordCount: number,
  reviewMarkdown: string,
): string {
  return matter.stringify(reviewMarkdown, {
    title: input.title,
    year: input.year,
    rating: input.rating,
    watchedDate: input.watchedDate,
    publishedDate: input.publishedDate,
    letterboxdUrl: input.letterboxdUrl,
    posterUrl,
    wordCount,
    slug,
    excerpt: createExcerpt(reviewMarkdown),
  })
}

function registerReviewRecord(index: ReviewIndex, record: ExistingReviewRecord): void {
  index.slugs.add(record.slug)
  index.byUrl.set(normalizeLetterboxdUrl(record.letterboxdUrl), record)

  const filmId = extractLetterboxdFilmId(record.posterUrl)
  if (filmId) {
    index.byFilmId.set(filmId, record)
  }

  index.bySignature.set(createReviewSignature(record.title, record.year, record.watchedDate), record)
}

function unregisterReviewRecord(index: ReviewIndex, record: ExistingReviewRecord): void {
  index.slugs.delete(record.slug)
  index.byUrl.delete(normalizeLetterboxdUrl(record.letterboxdUrl))

  const filmId = extractLetterboxdFilmId(record.posterUrl)
  if (filmId) {
    index.byFilmId.delete(filmId)
  }

  index.bySignature.delete(createReviewSignature(record.title, record.year, record.watchedDate))
}

function optionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function normalizeTitleForDedup(title: string): string {
  return slugify(title.replace(/^star wars:\s*/i, "").trim())
}

function createReviewSignature(title: string, year: number, watchedDate: string): string {
  return `${normalizeTitleForDedup(title)}:${year}:${watchedDate}`
}

function createUniqueSlug(baseSlug: string, existingSlugs: Set<string>): string {
  let slug = baseSlug
  let index = 2

  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${index}`
    index += 1
  }

  return slug
}

function createExcerpt(markdown: string): string {
  const text = markdown
    .replace(/\[[^\]]*]\([^)]*\)/g, "")
    .replace(/[#>*_`~\-]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  return text.length <= 180 ? text : `${text.slice(0, 177).trim()}...`
}
