export const pinnedReviewSlugs = [
  "billie-eilish-hit-me-hard-and-soft-the-tour-live-in-3d-2026",
  "queer-2024",
  "dune-part-two-2024",
  "materialists-2025",
  "the-batman-2022",
  "spencer-2021",
] as const

export interface VideoEssay {
  title: string
  description: string
  thumbnail: string
  url: string
}

export const featuredVideoEssays: VideoEssay[] = [
  {
    title: "Stan Culture, Anti-intellectualism and The Death of Film Criticism",
    description:
      "A rant-adjacent essay about fandom, online defensiveness, and why talking critically about film has become weirdly exhausting.",
    thumbnail: "https://img.youtube.com/vi/tXJW4_QE2eM/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=tXJW4_QE2eM",
  },
  {
    title: "Wuthering Heights, Adaptations and Creative Liberties",
    description:
      "A video about adaptation, creative licence, and how far a new version can drift before it stops feeling like the original.",
    thumbnail: "https://img.youtube.com/vi/3wjtVIqOzC8/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=3wjtVIqOzC8",
  },
  {
    title: "The Devil Wears Prada 2 Doesn't Believe Its Own Message",
    description:
      "A look at legacy sequels, fashion satire, and what happens when a follow-up seems to miss the point of the thing people loved.",
    thumbnail: "https://img.youtube.com/vi/DIz4c1L8R7A/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=DIz4c1L8R7A",
  },
  {
    title: "Is Marvel Killing Cinema?",
    description:
      "A dive into the Marvel discourse, franchise filmmaking, and the weird pressure blockbusters put on modern cinema.",
    thumbnail: "https://img.youtube.com/vi/knKLBYPmiA4/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=knKLBYPmiA4",
  },
]

export const shortFormSummary =
  "Short-form shouldn't mean shallow. On Instagram and TikTok I'm trying to make content that actually gives the viewer something — and that pushes me to deepen my own film knowledge and criticism along the way."

export const shortFormSummaryUrl = "https://www.instagram.com/p/DXB4xmpjCZ1/?img_index=10"

export interface ShortFormPick {
  title: string
  url: string
  thumbnail: string
}

export const featuredShortForm: ShortFormPick[] = [
  {
    title: "Gen AI & Film Festivals",
    url: "https://www.instagram.com/p/DZn6X9HIM_n/",
    thumbnail: "/short-form/gen-ai-film-festival.jpg",
  },
  {
    title: "The Fabelmans",
    url: "https://www.instagram.com/p/DZmZj84oA1h/",
    thumbnail: "/short-form/spielberg-fabelmans.jpg",
  },
  {
    title: "Masters of the Universe",
    url: "https://www.instagram.com/p/DZgwm_CIjNu/",
    thumbnail: "/short-form/masters-of-the-universe.jpg",
  },
  {
    title: "Hacks Season 5",
    url: "https://www.instagram.com/p/DZHwLXlI0rA/",
    thumbnail: "/short-form/hacks-season-5.jpg",
  },
  {
    title: "Star Wars Discourse",
    url: "https://www.instagram.com/p/DY1ftDYIXCH/",
    thumbnail: "/short-form/mandalorian-discourse.jpg",
  },
  {
    title: "The Mandalorian & Grogu",
    url: "https://www.instagram.com/p/DYsSDlxooz3/",
    thumbnail: "/short-form/mandalorian-review.jpg",
  },
]
