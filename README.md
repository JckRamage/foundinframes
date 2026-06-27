# Found in Frames

A small movie review site for long-form Found in Frames writing. Letterboxd remains the main diary, and this site mirrors reviews that are longer than the configured word-count threshold.

## Local Development

```bash
npm install
npm run dev
```

The site is built with Next.js and stores published reviews as Markdown files in `content/reviews`.

## Review Format

Each review is a Markdown file with frontmatter:

```yaml
title: "Film Title"
year: 2026
rating: 4.5
watchedDate: "2026-06-20"
publishedDate: "2026-06-21"
letterboxdUrl: "https://letterboxd.com/foundinframes/film/example/"
posterUrl: "https://image.tmdb.org/t/p/w500/example.jpg"
wordCount: 812
slug: "film-title-2026"
excerpt: "Short archive description..."
```

## Import New Letterboxd Reviews

Letterboxd does not expose a useful public API, but it does expose a public RSS feed for recent activity. This imports recent reviews, skips anything at or under 400 words, and writes new Markdown files:

```bash
LETTERBOXD_USERNAME=foundinframes npm run import:letterboxd:rss
```

Use `--dry-run` to preview:

```bash
npm run import:letterboxd:rss -- --dry-run
```

## Backfill Historical Reviews

Download and unzip your Letterboxd export, then pass the export folder:

```bash
npm run import:letterboxd:export -- /path/to/letterboxd-export
```

The script reads `reviews.csv`, backdates reviews using the export dates, and applies the same word-count filter.

## Posters

RSS imports use the poster URL already present in the Letterboxd feed. CSV backfills can use TMDb for poster lookup if `TMDB_API_KEY` is set:

```bash
TMDB_API_KEY=your_key npm run import:letterboxd:export -- /path/to/letterboxd-export
```

Without TMDb, reviews use the local `poster-placeholder.svg`.

## Automation

`.github/workflows/import-letterboxd.yml` runs weekly and can also be triggered manually. It imports qualifying RSS reviews and commits new files under `content/reviews`.
