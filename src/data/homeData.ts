import homeJson from './homeData.json';

export interface SignatureMoment {
  _id: string;
  title: string;
  stat: string;
  badge?: string;
  image: string;
  video?: string;
  w?: number;
  h?: number;
}

export interface PartnerLogo {
  src: string;
  alt: string;
  scale?: number | null;
}

export interface FeaturedPartnership {
  _id: string;
  name: string;
  category: string;
  description: string;
  heroImageUrl: string;
  brandLogoUrl: string;
  heroImageAlt: string;
  brandLogoAlt: string;
  slug: string;
}

export const homeData = {
  hero: {
    title: "Justin Jefferson",
    statement1: "From St. Rose, Louisiana to the Met Gala runway. Every move Justin makes carries intention, style, and a story you don't see on the field.",
    statement2: "The 2020 first-round pick out of LSU who rewrote the record books — the rookie card that marked the start of a generational career.",
    heroImage: "https://cdn.sanity.io/images/zil8k06j/production/ac5710872c7f703f0a4f7d887ad30a6dd280fcdd-1200x1600.webp",
    heroImageAlt: "Justin Jefferson editorial portrait in white look",
    secondaryImage: "https://cdn.sanity.io/images/zil8k06j/production/6fa7c7fd07fdbf07119a115343881c3a9913963f-1067x1600.webp",
    secondaryImageAlt: "Justin Jefferson in black sunglasses and tailoring"
  },
  signatureMoments: [
    { _id: '1', title: 'Smile Heal The Soul', stat: 'Heavyweight Graphic Tee · 420 GSM', badge: 'New Arrival', image: '/real image/product-1.jpeg' },
    { _id: '2', title: 'Small Body Big Energy', stat: 'Oversized Boxy Fit · Carbon Wash', badge: 'Best Seller', image: '/real image/product-2.jpeg' },
    { _id: '3', title: 'Chicago Racing Team 98', stat: 'Motorsport Edition · Dropped Shoulder', badge: 'Exclusive', image: '/real image/product-3.jpeg' },
    { _id: '4', title: 'Chains Kurapika Noir', stat: 'Anime Gothic Archive · Velvet Feel', badge: 'Trending', image: '/real image/product-4.jpeg' },
    { _id: '5', title: 'Feeling Acid Wash', stat: 'Distressed Vintage Wash · Mineral Dye', badge: 'Restocked', image: '/real image/product-5.jpeg' },
    { _id: '6', title: 'Cross Bones Graphic Tee', stat: 'Heavyweight Loopback · Porto Milled', badge: 'Archive Edit', image: '/real image/product-6.jpeg' },
    { _id: '7', title: 'Dark Soul Streetwear', stat: 'Retro Series · Bound Collar', badge: 'Classic', image: '/real image/product-7.jpeg' },
    { _id: '8', title: 'Obsidian Skull Edition', stat: 'Core Silhouette · Pre-Shrunk', badge: 'Limited', image: '/real image/product-8.jpeg' },
    { _id: '9', title: 'Maison Box Cut Black', stat: 'Essential Heavy Tee · 420 GSM', badge: 'Staple', image: '/real image/product-9.jpeg' }
  ] as SignatureMoment[],
  partnerLogos: homeJson.partnerLogos as PartnerLogo[],
  featuredPartnerships: homeJson.featuredPartnerships as FeaturedPartnership[],
  editorialMarquee: [
    { title: "All-hands at UA HQ", href: "/partnerships", image: "https://cdn.sanity.io/images/zil8k06j/production/75f4f38f87df8cf9c852346a428258da840cb8e8-900x898.png" },
    { title: "White on white, road game", href: "/on-field", image: "https://cdn.sanity.io/images/zil8k06j/production/85d204ad561aceaa24c53a72bf7efd82d28421fd-480x408.png" },
    { title: "Paris, all white", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/678cbd2a6bb22010eadd90d55a32d0bf6295fc4a-360x361.png" },
    { title: "Justin in a sparkly suit", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/d56dc6fe1088b09a5a8f6158d517d26db75ed846-480x480.png" },
    { title: "JJets camp days", href: "/foundation", image: "https://cdn.sanity.io/images/zil8k06j/production/24d2b1197f7f932b425c0c2a5b6a36b231d6010e-933x1400.webp" },
    { title: "Suited for the honors", href: "/on-field", image: "https://cdn.sanity.io/images/zil8k06j/production/dfbcb4b8f74c34bdaa10f5390630dc810ca04712-1170x1560.jpg" },
    { title: "Big in Shanghai", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/a7106dbd9a605ac4276242c2fbe4cc2d282e583f-1600x1066.webp" },
    { title: "On set with Pepsi", href: "/partnerships", image: "https://cdn.sanity.io/images/zil8k06j/production/3468087968b556f26484e50eb1fc49ecb4b395ae-1600x1600.webp" },
    { title: "Tuileries, off duty", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/336c1db0efb5c8958c31508d27dbede8464744cb-1201x1500.webp" },
    { title: "Touchdown, U.S. Bank", href: "/on-field", image: "https://cdn.sanity.io/images/zil8k06j/production/9cb87e9373a20e58296d88266b7a5e969e4291fe-5424x3616.jpg" },
    { title: "Paris tailoring", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/7b7bc822dfaf32d2d6f2db9792a29a9cd879b230-1170x1553.jpg" },
    { title: "Paris streets", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/512ede71f8791519a6c635e363aab8903d9df5b8-1170x1553.jpg" },
    { title: "Rain check, Paris", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/8920c3b3f18dc0eb70a5c19373018c69c6b703bf-1920x1621.webp" },
    { title: "Maracanã moment", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/aaafc551702e0420b71a09bba91596f90cf16a6f-1920x1080.jpg" },
    { title: "Death Valley nights", href: "/on-field", image: "https://cdn.sanity.io/images/zil8k06j/production/8dd1e176f02b0ba66615f0fea2678b894a7788cf-1396x1600.webp" },
    { title: "Tokyo drip", href: "/off-field", image: "https://cdn.sanity.io/images/zil8k06j/production/820d4fda57f8011ebc924d4f118cb8c0ac5e4aaa-1216x1600.webp" }
  ],
  closing: {
    heading: "I want people to remember me for more than football",
    subtitle: "More than routes, more than records, more than the game itself. Writing a story that outlasts every snap, every season, every era.",
    ctaText: "Records were made to be broken",
    ctaLink: "/on-field"
  },
  foundation: homeJson.foundation
};

