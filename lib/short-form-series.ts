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
      "A series where I’m exploring actors and filmmakers’ Criterion Closet picks in order to expand my film knowledge.",
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
    title: "Director Deep Dives: Wes Anderson",
    description:
      "Symmetrical shots, pastel colours, and dry humour. This is a brief history of a man who I believe is often overlooked when it comes to the great modern directors.",
    episodes: [
      {
        title: "Wes Anderson",
        url: "https://www.instagram.com/p/DcHOsUQxzje/",
        thumbnail: "/short-form/dchosuqxzje.jpg",
      },
      {
        title: "Bottle Rocket",
        url: "https://www.instagram.com/p/DcZQ6lMRHVJ/",
        thumbnail: "/short-form/dczq6lmrhvj.jpg",
      },
      {
        title: "Rushmore",
        url: "https://www.instagram.com/p/DcqfFpKoMZ-/",
        thumbnail: "/short-form/dcqffpkomz.jpg",
      },
      {
        title: "The Royal Tenenbaums",
        url: "https://www.instagram.com/p/Dc9ogGToW4H/",
        thumbnail: "/short-form/dc9oggtow4h.jpg",
      },
      {
        title: "The Life Aquatic with Steve Zissou",
        url: "https://www.instagram.com/p/DdSC10mRaSR/",
        thumbnail: "/short-form/ddsc10mrasr.jpg",
      },
    ],
  },
  {
    slug: "video-essays",
    title: "Video Essays",
    description: "Longer short-form pieces on releases, franchises, and culture.",
    episodes: [
      {
        title: "Danny Boyle on AI & filmmaking",
        url: "https://www.instagram.com/p/DdAMkTso4am/",
        thumbnail: "/short-form/ddamktso4am.jpg",
      },
      {
        title: "The Harsh Reality of Adults",
        url: "https://www.instagram.com/p/DczYKKhIKoR/",
        thumbnail: "/short-form/dczykkhikor.jpg",
      },
      {
        title: "Very intrigued if you agree with this",
        url: "https://www.instagram.com/p/DdHxq70JS-3/",
        thumbnail: "/short-form/ddhxq70js-3.jpg",
      },
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
