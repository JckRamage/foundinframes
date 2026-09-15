import type { ReactNode } from "react"

interface HomeSectionProps {
  children: ReactNode
  className?: string
  contentVisibility?: boolean
}

export default function HomeSection({ children, className = "", contentVisibility = true }: HomeSectionProps) {
  return (
    <section
      className={`py-12 md:py-14 ${className} ${contentVisibility ? "content-auto-section" : ""}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">{children}</div>
    </section>
  )
}
