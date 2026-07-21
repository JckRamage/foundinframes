import type { Metadata } from "next"
import Image from "next/image"
import SocialLinks from "@/components/social-links"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Jack, the founder of Found in Frames, and the philosophy behind this film criticism platform.",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange">About</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-ink md:text-6xl">About me</h1>
        <hr className="mt-8 border-ink/10" />

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px] shrink-0 overflow-hidden rounded-[1.75rem] border-4 border-maroon/15 bg-maroon/5 shadow-lg md:mx-0">
            <Image
              src="/jack-ramage-about.png"
              alt="Jack Ramage, founder of Found in Frames"
              fill
              sizes="240px"
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none prose-p:leading-8 prose-p:text-ink/85 prose-em:text-ink prose-strong:text-maroon">
            <p>
              Hi, I&apos;m Jack, the founder of <strong>Found in Frames</strong>.
            </p>

            <p>
              I started Found in Frames in 2021 because I wanted to become a better film critic.
            </p>

            <p>
              Like a lot of people, my relationship with cinema began simply by watching films I loved. Over time,
              that changed. I became fascinated by <em>why</em> films worked, how directors communicated ideas through
              visual language, how editing shaped emotion, how performances could transform a screenplay, and how every
              creative decision contributed to a larger whole. I realised that the more I wrote about films, discussed
              them, and challenged my own opinions, the more I understood them.
            </p>

            <p>Found in Frames became the outlet for that journey.</p>

            <p>
              What started as a place to collect my thoughts has grown into a platform dedicated to thoughtful film
              criticism, festival coverage, and cinematic storytelling. Every review, video essay, and recommendation is
              another opportunity to look beyond whether a film is simply &ldquo;good&rdquo; or &ldquo;bad&rdquo; and
              instead explore what it&apos;s trying to say, how it achieves that, and why it resonates.
            </p>

            <p>
              While I enjoy writing about major releases, I&apos;ve always been especially passionate about independent
              and international cinema. Some of the most exciting work being made today comes from filmmakers working
              outside the biggest studios, yet these films often struggle to find the same visibility online. One of the
              goals of Found in Frames is to help shine a light on those films and encourage more people to discover
              them.
            </p>

            <p>
              One thing I&apos;ve become increasingly aware of is how social media has changed the way we talk about
              film. Much of the conversation is driven by quick reactions, rankings, or hot takes designed to maximise
              engagement. There&apos;s nothing inherently wrong with that, but I believe there&apos;s still room for
              slower, more thoughtful discussion. Film criticism shouldn&apos;t feel inaccessible or academic, nor should
              it be reduced to a score out of five. My aim is to bridge those two worlds by creating content
              that&apos;s approachable, visually engaging, and rooted in genuine analysis.
            </p>

            <p>That philosophy shapes everything I create.</p>

            <p>
              Whether it&apos;s reporting from international film festivals, producing a deep dive into a
              director&apos;s body of work, reviewing a new release, or recommending a hidden independent gem, my goal is
              always the same: to encourage people to think about cinema in new ways and hopefully discover something
              they&apos;ll carry with them long after the credits roll.
            </p>

            <p>
              Since launching Found in Frames, I&apos;ve had the opportunity to cover major international film festivals
              including Venice and London, reporting on premieres, emerging filmmakers, awards contenders, and the wider
              festival experience. These events have reinforced why I love cinema in the first place: they bring together
              audiences from around the world, celebrate diverse voices, and remind us that film is one of the most
              powerful forms of storytelling we have.
            </p>

            <p>
              Alongside Found in Frames, I&apos;m proud to be a Creator&apos;s Choice Awards Economy Member and to serve
              on the International Council for the Creator&apos;s Choice Awards.
            </p>

            <p>Ultimately, Found in Frames exists because I believe cinema deserves curiosity.</p>

            <p>
              Every film reflects the perspective of the people who made it, and every discussion about film has the
              potential to reveal something new. I don&apos;t expect everyone to agree with my opinions&mdash;that would
              make film criticism rather boring&mdash;but I hope my work encourages people to look a little closer, ask
              a few more questions, and leave with a deeper appreciation for the art of filmmaking.
            </p>

            <p>
              If you&apos;ve found your way here because you love cinema too, welcome. I&apos;m glad you&apos;re here.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-ink/10 bg-white/70 p-8 shadow-lg backdrop-blur-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Connect</p>
          <p className="mt-3 text-lg leading-8 text-ink/80">
            Follow Found in Frames for reviews, video essays, and film discovery across YouTube, Instagram, TikTok, and
            Letterboxd.
          </p>
          <SocialLinks className="mt-5" />
        </div>
      </div>
    </main>
  )
}
