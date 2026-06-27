"use client"

import Image from "next/image"
import { useState } from "react"
import { getOptimizedPosterUrl } from "@/lib/posters"

interface PosterImageProps {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

export default function PosterImage({ src, alt, sizes, priority = false, className = "" }: PosterImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-maroon/10" aria-hidden="true" /> : null}
      <Image
        src={getOptimizedPosterUrl(src)}
        alt={alt}
        fill
        sizes={sizes}
        quality={75}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}
