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
        <div className="relative mx-auto aspect-[9/16] max-w-[280px] overflow-hidden rounded-3xl border-4 border-maroon/15 bg-maroon/5 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:border-orange/40 group-hover:shadow-xl">
          <Image
            src={pick.thumbnail}
            alt={pick.title}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 45vw"
            className="object-cover transition duration-500 group-hover:scale-105"
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
        <h3 className="mx-auto mt-4 max-w-[280px] text-center font-display text-lg font-bold leading-snug text-maroon transition group-hover:text-orange">
          {pick.title}
        </h3>
      </Link>
    </article>
  )
}
