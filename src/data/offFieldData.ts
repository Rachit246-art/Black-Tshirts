import offJson from './offFieldData.json';

export interface FashionItem {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface AppearanceSlide {
  id: string;
  nav: string;
  logoImg?: { src: string };
  title?: string;
  description?: string;
  videoUrl?: string;
  posterImg?: { src: string };
}

export const offFieldData = {
  hero: {
    title: "Off Field",
    intro: "Fashion, digital culture, and global presence. The statement continues beyond Sunday.",
    quote: "I want to be remembered for making history, but also for having an undeniable personal presence."
  },
  categories: ["Fashion", "Digital", "Appearances", "Features"],
  fashionGallery: (offJson.fashionGallery || []) as FashionItem[],
  digital: {
    heading: "Digital",
    socials: [
      { platform: "Instagram", followers: "2.1M", handle: "@jjettas2" },
      { platform: "X", followers: "420K", handle: "@JJettas2" },
      { platform: "YouTube", subscribers: "185K", handle: "Justin Jefferson" },
      { platform: "Twitch", followers: "95K", handle: "jjettas" }
    ],
    highlights: [
      {
        title: "Madden 99 Club",
        subtitle: "Madden 24 · 25 · 26",
        description: "Three consecutive years earning the NFL's highest digital honor — the coveted 99 overall rating in EA Sports Madden NFL.",
        image: "https://cdn.sanity.io/images/zil8k06j/production/678cbd2a6bb22010eadd90d55a32d0bf6295fc4a-360x361.png"
      },
      {
        title: "First in Fortnite",
        subtitle: "The Griddy Emote",
        description: "The first NFL player with an official celebration in Fortnite — immortalizing his signature dance for millions of players globally.",
        image: "https://cdn.sanity.io/images/zil8k06j/production/d56dc6fe1088b09a5a8f6158d517d26db75ed846-480x480.png"
      }
    ]
  },
  appearances: (offJson.appearanceSlides || [
    { id: "netflix", nav: "Netflix", title: "Receiver (Netflix)", description: "Starring in the critically acclaimed Netflix documentary series following the league's most electrifying wideouts through the highs and heartbreaks of the NFL season." },
    { id: "espn", nav: "ESPN Cover Story", title: "ESPN Cover Story", description: "In-depth profile exploring Justin's rise from three-star recruit in St. Rose to the consensus best receiver in football." },
    { id: "gq", nav: "GQ Sports", title: "GQ Sports", description: "Style breakdown and front-row fashion profile during Paris Fashion Week and the Met Gala." },
    { id: "undercovers", nav: "The Undercovers", title: "The Undercovers", description: "Behind-the-scenes docuseries capturing off-season training, private fittings, and life away from football." },
    { id: "rome", nav: "GetYourGuide Rome", title: "GetYourGuide Rome", description: "Cultural exploration in Italy with architectural tours, tailoring consultations, and Italian gastronomy." },
    { id: "global", nav: "Going Global", title: "Going Global Tour", description: "International NFL ambassador stops in Shanghai, Tokyo, Paris, and Rio de Janeiro." }
  ]) as AppearanceSlide[],
  features: {
    heading: "Features",
    phrases: [
      "Bringing Fashion to the Turf",
      "I want to be unique. I want to stand out.",
      "One of None",
      "The cleats are top-tier with the textures",
      "They understand fashion and want more drip",
      "There's more to a look than just clothes",
      "This is the step towards greatness"
    ],
    products: [
      {
        title: "Oakley De Soto — JJ Signature Series",
        image: "https://cdn.sanity.io/images/zil8k06j/production/6b8f0ccc32e6a7453867049acc1d3f328f860ecc-1600x800.png",
        link: "https://www.oakley.com"
      },
      {
        title: "Oakley Stunt Devil S — JJ Signature Series",
        image: "https://cdn.sanity.io/images/zil8k06j/production/5115ed40ed6a64de3c24befffe31165347f52334-1600x800.png",
        link: "https://www.oakley.com"
      },
      {
        title: "Oakley Highland — JJ Signature Series",
        image: "https://cdn.sanity.io/images/zil8k06j/production/7aa9c977a7e27c28fe5d1ac764d5e9360310c903-1600x800.png",
        link: "https://www.oakley.com"
      },
      {
        title: "Oakley Stunt Devil — JJ Signature Series",
        image: "https://cdn.sanity.io/images/zil8k06j/production/84f7f140de9e3924b1e80c28abdbe4481e9a0b9e-1600x800.png",
        link: "https://www.oakley.com"
      },
      {
        title: "Lakeside Diamond — The Jet Pendant",
        image: "https://cdn.sanity.io/images/zil8k06j/production/27083a349f744c7c4024e299e7c17fcd5ad40b0a-1838x2304.png",
        link: "https://www.instagram.com/p/DSGB52-kTPW"
      }
    ]
  },
  closing: {
    heading: "Building something that lasts",
    ctaText: "The Foundation",
    ctaLink: "/foundation"
  }
};
