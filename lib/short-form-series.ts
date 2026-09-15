export interface ShortFormEpisode {
  title: string
  url: string
  thumbnail: string
}

export interface ShortFormSeries {
  slug: string
  title: string
  description: string
  episodes: ShortFormEpisode[]
}

export const shortFormSeries: ShortFormSeries[] = [
  {
    slug: "back-in-the-closet",
    title: "Back in the Closet",
    description:
      "Criterion closet tours — filmmakers’ shelves, favourites, and the films that shaped them. New closets whenever I can get to them.",
    episodes: [
      {
        title: "Back in the Closet",
        url: "https://www.instagram.com/p/DcwvMydovEa/",
        thumbnail: "/short-form/dcwvmydovea.jpg",
      },
      {
        title: "Ethan Hawke — Back in the Closet",
        url: "https://www.instagram.com/p/DdC0WRpIez6/",
        thumbnail: "/short-form/ddc0wrpiez6.jpg",
      },
      {
        title: "Maya Hawke on Pina Bausch",
        url: "https://www.instagram.com/p/DdTvqXMpy_-/",
        thumbnail: "/short-form/ddtvqxmpxy.jpg",
      },
    ],
  },
  {
    slug: "director-deep-dives",
    title: "Director Deep Dives",
    description:
      "Short bursts on a director, a filmography thread, or a single idea worth unpacking — built for Instagram, rooted in real criticism.",
    episodes: [
      {
        title: "Danny Boyle on AI & filmmaking",
        url: "https://www.instagram.com/p/DdAMkTso4am/",
        thumbnail: "/short-form/ddamktso4am.jpg",
      },
      {
        title: "The Dog Stars",
        url: "https://www.instagram.com/p/Dc2HnYGIuuz/",
        thumbnail: "/short-form/dc2hnygiuuz.jpg",
      },
      {
        title: "The Harsh Reality of Adults",
        url: "https://www.instagram.com/p/DczYKKhIKoR/",
        thumbnail: "/short-form/dczykkhikor.jpg",
      },
    ],
  },
  {
    slug: "discourse-and-culture",
    title: "Discourse & Culture",
    description: "Releases, franchises, and the conversations around them — when a headline deserves more than a hot take.",
    episodes: [
      {
        title: "Gen AI & Film Festivals",
        url: "https://www.instagram.com/p/DZn6X9HIM_n/",
        thumbnail: "/short-form/gen-ai-film-festival.jpg",
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
    ],
  },
]

export const contentPageIntro =
  "Short-form series I’m building on Instagram and TikTok — each row is one thread. Every episode is visible; swipe or scroll sideways when a row runs out of room."
