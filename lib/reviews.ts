import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const reviewsDirectory = path.join(process.cwd(), "content", "reviews")

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
}

export interface Review extends ReviewFrontmatter {
  content: string
}

export type ReviewSummary = ReviewFrontmatter & {
  excerpt: string
}

export function getAllReviewSummaries(): ReviewSummary[] {
  if (!fs.existsSync(reviewsDirectory)) {
    return []
  }

  return fs
    .readdirSync(reviewsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readReviewSummary(fileName))
    .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate))
}

export function getAllReviews(): Review[] {
  if (!fs.existsSync(reviewsDirectory)) {
    return []
  }

  return fs
    .readdirSync(reviewsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readReviewFile(fileName))
    .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate))
}

export function getReviewBySlug(slug: string): Review | null {
  const directPath = path.join(reviewsDirectory, `${slug}.md`)

  if (fs.existsSync(directPath)) {
    return readReviewFile(`${slug}.md`)
  }

  return findReviewFileBySlug(slug)
}

function findReviewFileBySlug(slug: string): Review | null {
  if (!fs.existsSync(reviewsDirectory)) {
    return null
  }

  for (const fileName of fs.readdirSync(reviewsDirectory)) {
    if (!fileName.endsWith(".md")) {
      continue
    }

    const review = readReviewFile(fileName)
    if (review.slug === slug) {
      return review
    }
  }

  return null
}

export function getFeaturedReviews(limit = 3): ReviewSummary[] {
  return getAllReviewSummaries().slice(0, limit)
}

export function getReviewsBySlugs(slugs: string[]): ReviewSummary[] {
  const reviewsBySlug = new Map(getAllReviewSummaries().map((review) => [review.slug, review]))

  return slugs.map((slug) => reviewsBySlug.get(slug)).filter((review): review is ReviewSummary => review !== undefined)
}

export function formatRating(rating: number | null): string {
  if (rating === null || Number.isNaN(rating)) {
    return "Unrated"
  }

  return `${rating.toFixed(1).replace(".0", "")}/5`
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}

function readReviewSummary(fileName: string): ReviewSummary {
  const fullPath = path.join(reviewsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const slug = String(data.slug ?? fileName.replace(/\.md$/, ""))

  return {
    title: requireString(data.title, "title", fileName),
    year: requireNumber(data.year, "year", fileName),
    rating: optionalNumber(data.rating),
    watchedDate: requireString(data.watchedDate, "watchedDate", fileName),
    publishedDate: requireString(data.publishedDate, "publishedDate", fileName),
    letterboxdUrl: requireString(data.letterboxdUrl, "letterboxdUrl", fileName),
    posterUrl: requireString(data.posterUrl, "posterUrl", fileName),
    wordCount: requireNumber(data.wordCount, "wordCount", fileName),
    slug,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : createExcerpt(content),
  }
}

function readReviewFile(fileName: string): Review {
  const fullPath = path.join(reviewsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const slug = String(data.slug ?? fileName.replace(/\.md$/, ""))
  const review: Review = {
    title: requireString(data.title, "title", fileName),
    year: requireNumber(data.year, "year", fileName),
    rating: optionalNumber(data.rating),
    watchedDate: requireString(data.watchedDate, "watchedDate", fileName),
    publishedDate: requireString(data.publishedDate, "publishedDate", fileName),
    letterboxdUrl: requireString(data.letterboxdUrl, "letterboxdUrl", fileName),
    posterUrl: requireString(data.posterUrl, "posterUrl", fileName),
    wordCount: requireNumber(data.wordCount, "wordCount", fileName),
    slug,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : createExcerpt(content),
    content,
  }

  return review
}

function requireString(value: unknown, field: string, fileName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Review ${fileName} is missing required string field "${field}".`)
  }

  return value
}

function requireNumber(value: unknown, field: string, fileName: string): number {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    throw new Error(`Review ${fileName} is missing required number field "${field}".`)
  }

  return numberValue
}

function optionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function createExcerpt(markdown: string): string {
  const text = markdown
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[[^\]]*]\(([^)]*)\)/g, "")
    .replace(/[#>*_`-]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (text.length <= 180) {
    return text
  }

  return `${text.slice(0, 177).trim()}...`
}
