import fs from "node:fs/promises"
import path from "node:path"
import { parse } from "csv-parse/sync"
import { searchTmdbPoster, writeReviewIfNew } from "./import-utils"

interface LetterboxdReviewRow {
  Date?: string
  Name?: string
  Year?: string
  "Letterboxd URI"?: string
  Rating?: string
  Review?: string
  "Watched Date"?: string
}

const exportDirectory = process.argv.slice(2).find((arg) => !arg.startsWith("--")) ?? process.env.LETTERBOXD_EXPORT_DIR
const dryRun = process.argv.includes("--dry-run")

async function main() {
  if (!exportDirectory) {
    throw new Error("Pass the unzipped Letterboxd export directory, or set LETTERBOXD_EXPORT_DIR.")
  }

  const reviewsCsvPath = path.join(exportDirectory, "reviews.csv")
  const csv = await fs.readFile(reviewsCsvPath, "utf8")
  const rows = parse(csv, {
    columns: true,
    bom: true,
    skip_empty_lines: true,
    trim: true,
  }) as LetterboxdReviewRow[]
  let created = 0
  let skipped = 0

  for (const row of rows) {
    if (!row.Review?.trim()) {
      skipped += 1
      continue
    }

    const title = requireString(row.Name, "Name")
    const year = Number(row.Year)
    const posterUrl = await searchTmdbPoster(title, year)
    const result = await writeReviewIfNew(
      {
        title,
        year,
        rating: optionalRating(row.Rating),
        watchedDate: normaliseDate(row["Watched Date"] ?? row.Date),
        publishedDate: normaliseDate(row.Date ?? row["Watched Date"]),
        letterboxdUrl: requireString(row["Letterboxd URI"], "Letterboxd URI"),
        posterUrl,
        reviewMarkdown: row.Review,
      },
      dryRun,
    )

    if (result === "created") {
      created += 1
    } else {
      skipped += 1
    }
  }

  console.log(`Letterboxd export import complete. Created ${created}, skipped ${skipped}.`)
}

function optionalRating(value: string | undefined): number | null {
  if (!value) {
    return null
  }

  const rating = Number(value)
  return Number.isFinite(rating) ? rating : null
}

function normaliseDate(value: string | undefined): string {
  if (!value) {
    return new Date().toISOString().slice(0, 10)
  }

  return new Date(value).toISOString().slice(0, 10)
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`CSV row is missing ${field}.`)
  }

  return value
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
