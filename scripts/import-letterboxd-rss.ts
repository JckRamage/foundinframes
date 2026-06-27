import { XMLParser } from "fast-xml-parser"
import {
  extractPosterUrl,
  htmlDescriptionToMarkdown,
  writeReviewIfNew,
} from "./import-utils"

interface LetterboxdRssItem {
  title?: string
  link?: string
  pubDate?: string
  description?: string
  "letterboxd:watchedDate"?: string
  "letterboxd:filmTitle"?: string
  "letterboxd:filmYear"?: string | number
  "letterboxd:memberRating"?: string | number
  "tmdb:movieId"?: string | number
}

const username = process.env.LETTERBOXD_USERNAME ?? "foundinframes"
const feedUrl = process.env.LETTERBOXD_RSS_URL ?? `https://letterboxd.com/${username}/rss/`
const dryRun = process.argv.includes("--dry-run")

async function main() {
  const response = await fetch(feedUrl, {
    headers: {
      "User-Agent": "foundinframes-review-importer/1.0",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Letterboxd RSS: ${response.status} ${response.statusText}`)
  }

  const xml = await response.text()
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
  })
  const parsed = parser.parse(xml) as {
    rss?: {
      channel?: {
        item?: LetterboxdRssItem | LetterboxdRssItem[]
      }
    }
  }
  const items = normaliseArray(parsed.rss?.channel?.item)
  let created = 0
  let skipped = 0

  for (const item of items) {
    const title = item["letterboxd:filmTitle"] ?? parseTitle(item.title)
    const year = Number(item["letterboxd:filmYear"])

    if (!title || !Number.isFinite(year) || !item.link) {
      skipped += 1
      continue
    }

    const description = item.description ?? ""
    const reviewMarkdown = htmlDescriptionToMarkdown(description)
    const result = await writeReviewIfNew(
      {
        title,
        year,
        rating: optionalRating(item["letterboxd:memberRating"]),
        watchedDate: item["letterboxd:watchedDate"] ?? dateOnly(item.pubDate),
        publishedDate: dateOnly(item.pubDate),
        letterboxdUrl: item.link,
        posterUrl: extractPosterUrl(description),
        reviewMarkdown,
        tmdbMovieId: item["tmdb:movieId"] ? String(item["tmdb:movieId"]) : undefined,
      },
      dryRun,
    )

    if (result === "created") {
      created += 1
    } else {
      skipped += 1
    }
  }

  console.log(`Letterboxd RSS import complete. Created ${created}, skipped ${skipped}.`)
}

function normaliseArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

function optionalRating(value: string | number | undefined): number | null {
  if (value === undefined || value === "") {
    return null
  }

  const rating = Number(value)
  return Number.isFinite(rating) ? rating : null
}

function dateOnly(value: string | undefined): string {
  if (!value) {
    return new Date().toISOString().slice(0, 10)
  }

  return new Date(value).toISOString().slice(0, 10)
}

function parseTitle(value: string | undefined): string | undefined {
  return value?.split(",").slice(0, -1).join(",").trim()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
