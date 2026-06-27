import Link from "next/link"

export const socialLinks = [
  {
    href: "https://www.youtube.com/@FoundInFrames",
    label: "YouTube",
    icon: "fa-brands fa-youtube",
  },
  {
    href: "https://www.instagram.com/found_in_frames/",
    label: "Instagram",
    icon: "fa-brands fa-instagram",
  },
  {
    href: "https://www.tiktok.com/@foundinframes",
    label: "TikTok",
    icon: "fa-brands fa-tiktok",
  },
  {
    href: "https://letterboxd.com/foundinframes/",
    label: "Letterboxd",
    icon: "fa-solid fa-film",
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
          <i className={`${link.icon} text-xl`} aria-hidden="true" />
        </Link>
      ))}
    </div>
  )
}
