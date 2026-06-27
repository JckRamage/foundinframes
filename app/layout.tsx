import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/next"
import PageBackground from "@/components/page-background"
import SocialLinks from "@/components/social-links"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Found in Frames",
    template: "%s | Found in Frames",
  },
  description: "Long-form film reviews and criticism from Found in Frames.",
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Reviews" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="antialiased">
        <PageBackground />
        <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/found-in-frames-logo.png"
                alt="Found in Frames"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="font-display text-xl font-bold text-maroon md:text-2xl">Found in Frames</span>
            </Link>
            <nav className="flex items-center gap-4 md:gap-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} prefetch={item.href === "/reviews" ? false : undefined} className="text-sm font-semibold text-ink/75 transition hover:text-orange">
                  {item.label}
                </Link>
              ))}
              <SocialLinks />
            </nav>
          </div>
        </header>
        <div className="relative z-10">{children}</div>
        <footer className="relative z-10 border-t border-ink/10 bg-cream">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center gap-3">
              <Image
                src="/found-in-frames-logo.png"
                alt="Found in Frames"
                width={36}
                height={36}
                className="rounded-full"
              />
              <p className="text-sm text-ink/70">&copy; {new Date().getFullYear()} Found in Frames</p>
            </div>
            <SocialLinks />
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
