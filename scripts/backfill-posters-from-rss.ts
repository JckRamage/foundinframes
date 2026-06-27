import fs from "node:fs/promises"
import path from "node:path"
import { XMLParser } from "fast-xml-parser"
import matter from "gray-matter"
import { extractPosterUrl, placeholderPoster, slugify } from "./import-utils"

interface LetterboxdRssItem {
  description?: string
  "letterboxd:watchedDate"?: string
  "letterboxd:filmTitle"?: string
  "letterboxd:filmYear"?: string | number
}

const rssFilePath = process.argv[2] ?? "uLq5U22h.rss"
const reviewsDirectory = path.join(process.cwd(), "content", "reviews")

async function main() {
  const posterBySignature = await getPostersFromRss(path.resolve(process.cwd(), rssFilePath))
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

    const signature = createSignature(parsed.data.title, parsed.data.year, parsed.data.watchedDate)
    const posterUrl = posterBySignature.get(signature)

    if (!posterUrl) {
      skipped += 1
      continue
    }

    parsed.data.posterUrl = posterUrl
    await fs.writeFile(filePath, matter.stringify(parsed.content, parsed.data), "utf8")
    updated += 1
  }

  console.log(`Poster RSS backfill complete. Updated ${updated}, skipped ${skipped}.`)
}

async function getPostersFromRss(filePath: string): Promise<Map<string, string>> {
  const xml = await fs.readFile(filePath, "utf8")
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
  const posterBySignature = new Map<string, string>()

  for (const item of items) {
    const title = item["letterboxd:filmTitle"]
    const year = Number(item["letterboxd:filmYear"])
    const watchedDate = item["letterboxd:watchedDate"]
    const posterUrl = extractPosterUrl(item.description ?? "")

    if (!title || !Number.isFinite(year) || !watchedDate || !posterUrl) {
      continue
    }

    posterBySignature.set(createSignature(title, year, watchedDate), posterUrl)
  }

  return posterBySignature
}

function normaliseArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

function createSignature(title: unknown, year: unknown, watchedDate: unknown): string {
  return `${slugify(String(title))}:${Number(year)}:${String(watchedDate)}`
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
