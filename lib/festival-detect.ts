const festivalPatterns = [
  {
    regex: /^EIFF\s*-?\s*Film\s*#?(\d+)/im,
    shortName: "EIFF",
    name: "Edinburgh International Film Festival",
  },
  {
    regex: /^London Film Festival\s*(?:Film|Watch)\s*#?(\d+)/im,
    shortName: "LFF",
    name: "London Film Festival",
  },
  {
    regex: /^Venice Film Festival\s*#?(\d+)/im,
    shortName: "Venice",
    name: "Venice Film Festival",
  },
  {
    regex: /^TIFF\s*(?:Film\s*)?#?(\d+)/im,
    shortName: "TIFF",
    name: "Toronto International Film Festival",
  },
] as const

export function detectFestivalFromContent(
  content: string,
  publishedDate: string,
): { editionSlug: string; name: string; shortName: string; year: number; filmNumber: number } | null {
  const head = content
    .split("\n")
    .slice(0, 14)
    .join("\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .trim()

  for (const pattern of festivalPatterns) {
    const match = head.match(pattern.regex)
    if (!match) {
      continue
    }

    const filmNumber = Number(match[1])
    if (!Number.isFinite(filmNumber)) {
      continue
    }

    const year = Number(publishedDate.slice(0, 4))
    const editionSlug = `${pattern.shortName.toLowerCase()}-${year}`

    return {
      editionSlug,
      name: pattern.name,
      shortName: pattern.shortName,
      year,
      filmNumber,
    }
  }

  return null
}
