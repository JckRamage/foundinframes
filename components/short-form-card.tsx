import Image from "next/image"
import Link from "next/link"
import type { ShortFormPick } from "@/lib/home-content"

interface ShortFormCardProps {
  pick: ShortFormPick
  priority?: boolean
}

export default function ShortFormCard({ pick, priority = false }: ShortFormCardProps) {
  return (
    <article className="group">
      <Link href={pick.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border-4 border-maroon/15 bg-maroon/5 shadow-lg transition group-hover:border-orange/40">
          <Image
            src={pick.thumbnail}
            alt={pick.title}
            fill
            sizes="(min-width: 640px) 25vw, 45vw"
            className="object-cover"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-maroon/10 opacity-70 transition group-hover:opacity-90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange/90 text-cream shadow-lg transition group-hover:scale-110 group-hover:bg-orange">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
        <h3 className="mt-3 text-center font-display text-sm font-bold leading-snug text-maroon transition group-hover:text-orange sm:text-base">
          {pick.title}
        </h3>
      </Link>
    </article>
  )
}
