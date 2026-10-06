import partnersJson from './partnershipsList.json';

export interface PartnerItem {
  _id: string;
  name: string;
  category: string;
  description: string;
  brandLogoUrl: string;
  brandLogoAlt: string;
  heroImageUrl: string;
  heroImageAlt: string;
  videoUrl?: string | null;
  slug: string;
}

export const partnershipsData = {
  hero: {
    title: "Partnerships",
    intro: "Justin Jefferson collaborates with tier-one global brands that share his relentless pursuit of greatness, authenticity, and cultural impact."
  },
  partners: partnersJson as PartnerItem[],
  categories: [
    "All",
    "Apparel & Footwear",
    "Beverage & Hydration",
    "Food & Cereal",
    "Eye Wear",
    "Audio",
    "Home & Living",
    "Financial",
    "Gaming",
    "Quick Service"
  ],
  closing: {
    heading: "PARTNER WITH JUSTIN",
    subtitle: "Inquire about global campaigns, signature collections, endorsements, and creative alignments.",
    ctaText: "Get in Touch",
    ctaLink: "/inquiries"
  }
};
