import Link from "next/link"

export const socialLinks = [
  {
    href: "https://www.youtube.com/@FoundInFrames",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/found_in_frames/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@foundinframes",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M16.5 3h3.2c.4 2.2 1.8 4.2 3.8 5.2V11c-1.8-.1-3.5-.7-5-1.7v6.8a6.8 6.8 0 1 1-6.8-6.8c.3 0 .7 0 1 .1v3.4a3.4 3.4 0 1 0 2.4 3.2V3z" />
      </svg>
    ),
  },
  {
    href: "https://letterboxd.com/foundinframes/",
    label: "Letterboxd",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2z" />
      </svg>
    ),
  },
] as const

interface SocialLinksProps {
  className?: string
}

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socialLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="text-ink/70 transition hover:text-orange"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  )
}
