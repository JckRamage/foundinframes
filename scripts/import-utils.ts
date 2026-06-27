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

export async function writeReviewIfNew(input: ReviewInput, dryRun = false): Promise<"created" | "skipped"> {
  await fs.mkdir(contentDirectory, { recursive: true })
  const existing = await getExistingReviewKeys()
  const wordCount = countWords(input.reviewMarkdown)
  const signature = createReviewSignature(input.title, input.year, input.watchedDate)

  if (existing.urls.has(input.letterboxdUrl) || existing.signatures.has(signature)) {
    return "skipped"
  }

  if (wordCount <= minimumWordCount) {
    return "skipped"
  }

  const slug = createUniqueSlug(slugify(`${input.title}-${input.year}`), existing.slugs)
  const posterUrl = input.posterUrl ?? (await getPosterFromTmdb(input.tmdbMovieId)) ?? placeholderPoster
  const filePath = path.join(contentDirectory, `${slug}.md`)
  const fileContents = matter.stringify(input.reviewMarkdown.trim(), {
    title: input.title,
    year: input.year,
    rating: input.rating,
    watchedDate: input.watchedDate,
    publishedDate: input.publishedDate,
    letterboxdUrl: input.letterboxdUrl,
    posterUrl,
    wordCount,
    slug,
    excerpt: createExcerpt(input.reviewMarkdown),
  })

  if (dryRun) {
    console.log(`[dry-run] would create ${path.relative(process.cwd(), filePath)}`)
    return "created"
  }

  await fs.writeFile(filePath, fileContents, "utf8")
  console.log(`Created ${path.relative(process.cwd(), filePath)}`)
  return "created"
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

async function getExistingReviewKeys(): Promise<{ urls: Set<string>; slugs: Set<string>; signatures: Set<string> }> {
  const urls = new Set<string>()
  const slugs = new Set<string>()
  const signatures = new Set<string>()

  try {
    const fileNames = await fs.readdir(contentDirectory)

    for (const fileName of fileNames.filter((name) => name.endsWith(".md"))) {
      const fileContents = await fs.readFile(path.join(contentDirectory, fileName), "utf8")
      const { data } = matter(fileContents)
      slugs.add(String(data.slug ?? fileName.replace(/\.md$/, "")))

      if (typeof data.letterboxdUrl === "string") {
        urls.add(data.letterboxdUrl)
      }

      if (
        typeof data.title === "string" &&
        Number.isFinite(Number(data.year)) &&
        typeof data.watchedDate === "string"
      ) {
        signatures.add(createReviewSignature(data.title, Number(data.year), data.watchedDate))
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error
    }
  }

  return { urls, slugs, signatures }
}

function createReviewSignature(title: string, year: number, watchedDate: string): string {
  return `${slugify(title)}:${year}:${watchedDate}`
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
