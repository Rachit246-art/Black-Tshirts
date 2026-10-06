import foundJson from './foundation_content.json';

export interface SupporterTier {
  title: string;
  price: string;
  perks: string[];
  cta: string;
}

export const foundationData = {
  hero: {
    title: foundJson.heroTitle || "FOUND-ATION",
    eyebrow: foundJson.heroEyebrow || "Beyond the Game",
    intro: foundJson.heroIntro || "Off the field Justin enjoys giving back to the community that helped him get to where he is today. Actions speak louder than words.",
    photos: foundJson.heroPhotos || [
      {
        src: "https://cdn.sanity.io/images/zil8k06j/production/4448877a0abc8237a07e2c80286620b94d3e8e9e-3648x5472.jpg",
        alt: "Justin Jefferson and a teammate handing out backpacks under the tent at the Backpack Drive",
        width: 3648,
        height: 5472
      },
      {
        src: "https://cdn.sanity.io/images/zil8k06j/production/24d2b1197f7f932b425c0c2a5b6a36b231d6010e-933x1400.webp",
        alt: "A young camper at the JJets event",
        width: 933,
        height: 1400
      }
    ]
  },
  manifesto: {
    heading: "BUILDING MINDSETS THAT PERFORM AND CREATE MEANINGFUL CHANGE",
    statement: "Empowering youth with the tools, mentorship, and opportunities to dream big and overcome adversity. Through educational initiatives, youth athletics, and community support, the JJets Foundation invests in the next generation."
  },
  initiatives: [
    {
      title: "Justin Jefferson Football Camp",
      subtitle: "Youth Athletic Development",
      description: "Annual non-profit youth clinic bringing together hundreds of young athletes from Louisiana and Minnesota for hands-on drills, mentorship, and life-skills seminars alongside Justin and NFL trainers.",
      image: "https://cdn.sanity.io/images/zil8k06j/production/24d2b1197f7f932b425c0c2a5b6a36b231d6010e-933x1400.webp",
      impact: "500+ Campers Annually"
    },
    {
      title: "Fashion Show",
      subtitle: "Creative Youth Expressions",
      description: "Charity fashion benefit bridging sports, runway style, and youth arts programs. Showcasing local student designers and raising scholarship funds.",
      image: "https://cdn.sanity.io/images/zil8k06j/production/d56dc6fe1088b09a5a8f6158d517d26db75ed846-480x480.png",
      impact: "$250K+ Scholarships Raised"
    },
    {
      title: "Turkey Drive",
      subtitle: "Holiday Community Care",
      description: "Annual Thanksgiving meal distribution across the Twin Cities and Greater New Orleans, providing complete holiday packages to thousands of underserved families.",
      image: "https://cdn.sanity.io/images/zil8k06j/production/4448877a0abc8237a07e2c80286620b94d3e8e9e-3648x5472.jpg",
      impact: "1,200+ Families Fed"
    }
  ],
  stats: [
    { value: "3,500+", label: "Youth Impacted" },
    { value: "$750K+", label: "Direct Community Aid" },
    { value: "2", label: "Anchor Cities (Minneapolis & New Orleans)" },
    { value: "100%", label: "Direct Impact Model" }
  ],
  tiers: [
    {
      title: "Supporter",
      price: "$25/mo",
      description: "Foundational community contribution providing equipment and meal packs for youth campers.",
      perks: ["Digital member card", "Foundation impact newsletter", "Name on annual impact wall"]
    },
    {
      title: "Fan",
      price: "$100/mo",
      description: "Sponsors one full youth athlete for camp enrollment, gear, and academic workshops.",
      perks: ["All Supporter perks", "Exclusive JJets Foundation merchandise", "Priority raffle entry for signed memorabilia"]
    },
    {
      title: "Superstar",
      price: "$500/mo",
      description: "Major program benefactor underwriting scholarship grants and family food distributions.",
      perks: ["All Fan perks", "VIP invitation to annual JJets Gala & Fashion Show", "Signed Justin Jefferson commemorative jersey"]
    }
  ],
  closing: {
    heading: "Every contribution elevates the next generation",
    ctaText: "Explore Partnerships",
    ctaLink: "/partnerships"
  }
};
