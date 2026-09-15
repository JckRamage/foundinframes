import ShortFormEpisodeThumb from "@/components/short-form-episode-thumb"
import type { ShortFormSeries } from "@/lib/short-form-series"

interface ShortFormSeriesRowProps {
  series: ShortFormSeries
  priorityCover?: boolean
}

export default function ShortFormSeriesRow({ series, priorityCover = false }: ShortFormSeriesRowProps) {
  if (series.episodes.length === 0) {
    return null
  }

  return (
    <article className="border-b border-ink/10 pb-10 last:border-b-0 last:pb-0 md:pb-12">
      <header className="mb-5 min-w-0 max-w-2xl md:mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange">Series</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="font-display text-2xl font-bold text-maroon md:text-3xl">{series.title}</h2>
          {series.episodes.length > 1 ? (
            <span className="text-sm font-semibold text-ink/45">{series.episodes.length} episodes</span>
          ) : (
            <span className="text-sm font-semibold text-ink/45">More coming soon</span>
          )}
        </div>
        <p className="mt-2 text-sm leading-6 text-ink/70 md:text-base md:leading-7">{series.description}</p>
      </header>

      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:gap-4 md:px-0 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-maroon/20"
        style={{ scrollSnapType: "x mandatory" }}
        aria-label={`Episodes in ${series.title}`}
      >
        {series.episodes.map((episode, index) => (
          <ShortFormEpisodeThumb
            key={episode.url}
            title={episode.title}
            url={episode.url}
            thumbnail={episode.thumbnail}
            priority={priorityCover && index === 0}
          />
        ))}
      </div>
    </article>
  )
}
