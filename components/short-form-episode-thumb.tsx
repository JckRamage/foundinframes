import "server-only"

import Image from "next/image"
import Link from "next/link"

interface ShortFormEpisodeThumbProps {
  title: string
  url: string
  thumbnail: string
  priority?: boolean
}

export default function ShortFormEpisodeThumb({
  title,
  url,
  thumbnail,
  priority = false,
}: ShortFormEpisodeThumbProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/ep w-[132px] shrink-0 snap-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:w-[152px]"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border-4 border-maroon/15 bg-maroon/5 shadow-md transition group-hover/ep:border-orange/45 group-hover/ep:shadow-lg">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(min-width: 640px) 152px, 132px"
          className="object-cover"
          priority={priority}
        />
        <div className="absolute inset-0 bg-maroon/10 opacity-0 transition group-hover/ep:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover/ep:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange/95 text-cream shadow-md">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
      <p className="mt-2 text-center font-display text-sm font-bold leading-snug text-maroon transition group-hover/ep:text-orange">
        {title}
      </p>
    </Link>
  )
}
