import Image from "next/image"
import Link from "next/link"
import type { VideoEssay } from "@/lib/home-content"

interface VideoEssayCardProps {
  essay: VideoEssay
}

export default function VideoEssayCard({ essay }: VideoEssayCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-md transition hover:bg-white/15">
      <Link href={essay.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={essay.thumbnail}
            alt={essay.title}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center bg-maroon/35 opacity-0 transition group-hover:opacity-100">
            <span className="rounded-full bg-orange px-4 py-1.5 text-xs font-semibold text-cream">Watch</span>
          </div>
        </div>
        <div className="space-y-1.5 p-3 md:p-3.5">
          <h3 className="font-display text-base font-bold leading-snug text-cream group-hover:text-orange md:text-lg">
            {essay.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-5 text-cream/75">{essay.description}</p>
        </div>
      </Link>
    </article>
  )
}
