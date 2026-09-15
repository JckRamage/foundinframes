import Link from "next/link"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  href?: string
  linkLabel?: string
  inverted?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className={`text-sm font-bold uppercase tracking-[0.24em] ${inverted ? "text-orange" : "text-orange"}`}>
          {eyebrow}
        </p>
        <h2 className={`mt-2 font-display text-3xl font-bold md:text-4xl ${inverted ? "text-cream" : "text-maroon"}`}>
          {title}
        </h2>
        {description ? (
          <p className={`mt-3 text-base leading-7 ${inverted ? "text-cream/75" : "text-ink/70"}`}>{description}</p>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className={`shrink-0 font-semibold underline decoration-orange/30 hover:decoration-orange ${
            inverted ? "text-orange" : "text-orange"
          }`}
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  )
}
