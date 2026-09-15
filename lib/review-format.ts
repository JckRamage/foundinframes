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
