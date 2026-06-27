import Image from "next/image"
import Link from "next/link"
import type { VideoEssay } from "@/lib/home-content"

interface VideoEssayCardProps {
  essay: VideoEssay
}

export default function VideoEssayCard({ essay }: VideoEssayCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-lg transition hover:-translate-y-1 hover:bg-white/15">
      <Link href={essay.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={essay.thumbnail}
            alt={essay.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center bg-maroon/35 opacity-0 transition group-hover:opacity-100">
            <span className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-cream">Watch essay</span>
          </div>
        </div>
        <div className="space-y-3 p-5">
          <h3 className="font-display text-2xl font-bold leading-tight text-cream group-hover:text-orange">
            {essay.title}
          </h3>
          <p className="text-sm leading-7 text-cream/75">{essay.description}</p>
        </div>
      </Link>
    </article>
  )
}
