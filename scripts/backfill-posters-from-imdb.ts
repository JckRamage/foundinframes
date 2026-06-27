import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { placeholderPoster, slugify } from "./import-utils"

interface ImdbSuggestion {
  i?: {
    imageUrl?: string
  }
  l?: string
  q?: string
  qid?: string
  y?: number
  yr?: string
}

const reviewsDirectory = path.join(process.cwd(), "content", "reviews")
const delayMs = Number(process.env.IMDB_BACKFILL_DELAY_MS ?? 120)

async function main() {
  const fileNames = (await fs.readdir(reviewsDirectory)).filter((fileName) => fileName.endsWith(".md"))
  let updated = 0
  let skipped = 0

  for (const fileName of fileNames) {
    const filePath = path.join(reviewsDirectory, fileName)
    const fileContents = await fs.readFile(filePath, "utf8")
    const parsed = matter(fileContents)

    if (parsed.data.posterUrl !== placeholderPoster) {
      skipped += 1
      continue
    }

    const title = String(parsed.data.title)
    const year = Number(parsed.data.year)
    const posterUrl = await findPosterUrl(title, year)

    if (!posterUrl) {
      console.log(`No IMDb poster match for ${title} (${year})`)
      skipped += 1
      await sleep(delayMs)
      continue
    }

    parsed.data.posterUrl = posterUrl
    await fs.writeFile(filePath, matter.stringify(parsed.content, parsed.data), "utf8")
    console.log(`Updated ${fileName}`)
    updated += 1
    await sleep(delayMs)
  }

  console.log(`IMDb poster backfill complete. Updated ${updated}, skipped ${skipped}.`)
}

async function findPosterUrl(title: string, year: number): Promise<string | undefined> {
  const queries = createImdbQueries(title, year)
  const seen = new Set<string>()

  for (const query of queries) {
    if (seen.has(query)) {
      continue
    }

    seen.add(query)
    const suggestions = await fetchSuggestions(query)
    const titleSlug = slugify(title)
    const exactTitleAndYear = suggestions.find((suggestion) => {
      return matchesYear(suggestion, year) && slugify(suggestion.l ?? "") === titleSlug && suggestion.i?.imageUrl
    })

    if (exactTitleAndYear?.i?.imageUrl) {
      return exactTitleAndYear.i.imageUrl
    }

    const sameYear = suggestions.find((suggestion) => {
      return matchesYear(suggestion, year) && isScreenTitle(suggestion) && suggestion.i?.imageUrl
    })

    if (sameYear?.i?.imageUrl) {
      return sameYear.i.imageUrl
    }
  }

  return undefined
}

async function fetchSuggestions(query: string): Promise<ImdbSuggestion[]> {
  const firstCharacter = query.charAt(0)

  if (!query || !firstCharacter) {
    return []
  }

  const response = await fetch(`https://v2.sg.media-imdb.com/suggestion/${firstCharacter}/${query}.json`, {
    headers: {
      "User-Agent": "foundinframes-poster-backfill/1.0",
    },
  })

  if (!response.ok) {
    return []
  }

  const data = (await response.json()) as { d?: ImdbSuggestion[] }
  return data.d ?? []
}

function createImdbQueries(title: string, year: number): string[] {
  const query = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")

  const variants = query.startsWith("the_") ? [query, query.replace(/^the_/, "")] : [query, `the_${query}`]
  return [...variants, `${query}_${year}`]
}

function isScreenTitle(suggestion: ImdbSuggestion): boolean {
  return ["feature", "short", "TV series", "TV mini series", "TV mini-series", "TV special", "video", "TV movie"].includes(
    suggestion.q ?? "",
  )
}

function matchesYear(suggestion: ImdbSuggestion, year: number): boolean {
  if (suggestion.y === year) {
    return true
  }

  const yearRange = suggestion.yr

  if (!yearRange) {
    return false
  }

  const [start, end] = yearRange.split("-").map(Number)

  return Number.isFinite(start) && Number.isFinite(end) && year >= start && year <= end
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
