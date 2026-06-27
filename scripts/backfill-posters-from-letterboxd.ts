import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { getOptimizedPosterUrl } from "../lib/posters"

const reviewsDirectory = path.join(process.cwd(), "content", "reviews")
const delayMs = Number(process.env.LETTERBOXD_POSTER_DELAY_MS ?? 250)

async function main() {
  const fileNames = (await fs.readdir(reviewsDirectory)).filter((fileName) => fileName.endsWith(".md"))
  let updated = 0
  let skipped = 0
  let failed = 0

  for (const fileName of fileNames) {
    const filePath = path.join(reviewsDirectory, fileName)
    const fileContents = await fs.readFile(filePath, "utf8")
    const parsed = matter(fileContents)
    const letterboxdUrl = typeof parsed.data.letterboxdUrl === "string" ? parsed.data.letterboxdUrl : ""
    const posterUrl = typeof parsed.data.posterUrl === "string" ? parsed.data.posterUrl : ""

    if (!letterboxdUrl || hasGoodLetterboxdPoster(posterUrl)) {
      skipped += 1
      continue
    }

    const letterboxdPoster = await fetchLetterboxdPoster(letterboxdUrl)

    if (!letterboxdPoster) {
      console.log(`No Letterboxd poster for ${parsed.data.title}`)
      failed += 1
      await sleep(delayMs)
      continue
    }

    const optimizedPoster = getOptimizedPosterUrl(letterboxdPoster)

    if (optimizedPoster === posterUrl) {
      skipped += 1
      continue
    }

    parsed.data.posterUrl = optimizedPoster
    await fs.writeFile(filePath, matter.stringify(parsed.content, parsed.data), "utf8")
    console.log(`Updated ${fileName}`)
    updated += 1
    await sleep(delayMs)
  }

  console.log(`Letterboxd poster backfill complete. Updated ${updated}, skipped ${skipped}, failed ${failed}.`)
}

async function fetchLetterboxdPoster(letterboxdUrl: string): Promise<string | undefined> {
  const response = await fetch(letterboxdUrl, {
    headers: {
      "User-Agent": "foundinframes-poster-backfill/1.0",
    },
    redirect: "follow",
  })

  if (!response.ok) {
    return undefined
  }

  const html = await response.text()
  return extractLetterboxdPoster(html)
}

function extractLetterboxdPoster(html: string): string | undefined {
  const ogMatch = html.match(/property="og:image" content="([^"]+)"/i)
  if (ogMatch?.[1]?.includes("/resized/film-poster/")) {
    return ogMatch[1]
  }

  const posterMatch = html.match(/https:\/\/a\.ltrbxd\.com\/resized\/film-poster\/[^"'\s]+/i)
  return posterMatch?.[0]
}

function hasGoodLetterboxdPoster(posterUrl: string): boolean {
  return posterUrl.includes("a.ltrbxd.com/resized/film-poster/") && posterUrl.includes("-600-0-900-crop.jpg")
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
