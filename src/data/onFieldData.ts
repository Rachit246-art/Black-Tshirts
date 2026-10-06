export interface SeasonStat {
  year: number;
  team: string;
  games: number;
  receptions: number;
  yards: number;
  avg: number;
  long: number;
  touchdowns: number;
  rushYards: number;
  rushAvg: number;
}

export interface CareerSummary {
  games: number;
  receptions: number;
  targets: number;
  yards: number;
  avg: number;
  touchdowns: number;
}

export interface RecordCard {
  category: string;
  value: string;
  unit: string;
  short: string;
  description: string;
  image: string;
}

export const onFieldData = {
  hero: {
    title: "On-Field",
    badge: "https://cdn.sanity.io/images/zil8k06j/production/ee2471e15041d168841e1a406a235014c84528fc-800x988.webp",
    poster: "https://cdn.sanity.io/images/zil8k06j/production/aaafc551702e0420b71a09bba91596f90cf16a6f-1920x1080.jpg?w=1920&fit=max&auto=format&q=80",
    videoUrl: "https://vz-e818877b-c14.b-cdn.net/53c115c5-0420-4482-98fa-51853261634f/play_720p.mp4#sanity=zil8k06j/production/75a553aded1919d568f6620cd62004d31d0ff951.mp4&phone=480",
    quoteLines: [
      "Records are meant to be broken.",
      "I just want to keep breaking my own."
    ]
  },
  liveStats: {
    label: "Total Yards Today",
    totalYards: 8659,
    games: 97,
    receptions: 592,
    touchdowns: 44,
    yardsPerGame: 89.3
  },
  timeline: {
    years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
    games: [0, 16, 33, 50, 60, 77, 94, 97],
    receptions: [0, 88, 196, 324, 392, 495, 579, 592],
    touchdowns: [0, 7, 17, 25, 30, 40, 42, 44],
    yardsPerGame: [0, 87.5, 91.4, 96.5, 98.3, 96.5, 90.2, 89.3],
    yards: [0, 1400, 3016, 4825, 5899, 7432, 8480, 8659]
  },
  nflCareer: {
    heading: "NFL Career",
    since: "Since 2020",
    seasons: [
      { year: 2020, team: "Vikings", games: 16, receptions: 88, yards: 1400, avg: 15.9, long: 71, touchdowns: 7, rushYards: 2, rushAvg: 2 },
      { year: 2021, team: "Vikings", games: 17, receptions: 108, yards: 1616, avg: 15.0, long: 56, touchdowns: 10, rushYards: 14, rushAvg: 2.3 },
      { year: 2022, team: "Vikings", games: 17, receptions: 128, yards: 1809, avg: 14.1, long: 64, touchdowns: 8, rushYards: 24, rushAvg: 6 },
      { year: 2023, team: "Vikings", games: 10, receptions: 68, yards: 1074, avg: 15.8, long: 52, touchdowns: 5, rushYards: -12, rushAvg: -12 },
      { year: 2024, team: "Vikings", games: 17, receptions: 103, yards: 1533, avg: 14.9, long: 97, touchdowns: 10, rushYards: 3, rushAvg: 3 },
      { year: 2025, team: "Vikings", games: 17, receptions: 84, yards: 1048, avg: 12.5, long: 50, touchdowns: 2, rushYards: 7, rushAvg: 3.5 },
      { year: 2026, team: "Vikings", games: 3, receptions: 13, yards: 179, avg: 13.8, long: 39, touchdowns: 2, rushYards: 0, rushAvg: 0 }
    ] as SeasonStat[],
    career: {
      games: 97,
      receptions: 592,
      targets: 888,
      yards: 8659,
      avg: 14.6,
      touchdowns: 44
    } as CareerSummary,
    photo: {
      src: "https://cdn.sanity.io/images/zil8k06j/production/9cb87e9373a20e58296d88266b7a5e969e4291fe-5424x3616.jpg",
      alt: "Justin Jefferson breaking free on a catch-and-run",
      width: 5424,
      height: 3616
    }
  },
  recordCards: [
    {
      category: "most",
      value: "324",
      unit: "Receptions",
      short: "Most receptions ever through three seasons",
      description: "Most receptions in NFL history through a player's first three seasons",
      image: "https://cdn.sanity.io/images/zil8k06j/production/dfbcb4b8f74c34bdaa10f5390630dc810ca04712-1170x1560.jpg"
    },
    {
      category: "most",
      value: "8,480",
      unit: "Yards",
      short: "Most receiving yards ever through six seasons",
      description: "Most receiving yards in NFL history through a player's first six seasons — passing Randy Moss on Christmas Day 2025",
      image: "https://cdn.sanity.io/images/zil8k06j/production/512ede71f8791519a6c635e363aab8903d9df5b8-1170x1553.jpg"
    },
    {
      category: "most",
      value: "90.2",
      unit: "Yards/Game",
      short: "Career receiving yards per game",
      description: "Averaging more than 90 receiving yards per game across his entire regular-season career",
      image: "https://cdn.sanity.io/images/zil8k06j/production/7b7bc822dfaf32d2d6f2db9792a29a9cd879b230-1170x1553.jpg"
    }
  ] as RecordCard[],
  influence: {
    headingTop: "The definition of",
    headingWord: "Influence",
    cutout: {
      src: "https://cdn.sanity.io/images/zil8k06j/production/1f97ff21264293d1295b8e8c651ba7dbf57c4c48-1054x1440.webp",
      alt: "Justin Jefferson hitting the Griddy",
      width: 1054,
      height: 1440
    },
    field: {
      src: "https://cdn.sanity.io/images/zil8k06j/production/ae38aa6547ffa78c4e6cc635ca3949520fac412f-1440x1078.webp",
      alt: "The stadium field",
      width: 1440,
      height: 1078
    }
  },
  cleats: [
    { src: "https://cdn.sanity.io/images/zil8k06j/production/63d4723d2cc5451d2cd51122774eb38d34c1d2a6-1920x1621.webp", title: "Custom Gold Foil Cleats" },
    { src: "https://cdn.sanity.io/images/zil8k06j/production/833a84df8e792745ad9480bf6402e273be2b64bc-1920x1621.webp", title: "Vikings Purple Diamond" },
    { src: "https://cdn.sanity.io/images/zil8k06j/production/b91cfe47d4958ee52aa861ec42130406f19e4aee-1920x1621.webp", title: "Pearl Chrome Game Cleats" },
    { src: "https://cdn.sanity.io/images/zil8k06j/production/b4e1d474ec6c0b3bc93b2de51898f43a3d10bd1f-1920x1621.webp", title: "Gatorade Flow Edition" },
    { src: "https://cdn.sanity.io/images/zil8k06j/production/b51125b6833c6d47ed737c8d69f884fba4a24623-1920x1621.webp", title: "Under Armour Prototype" },
    { src: "https://cdn.sanity.io/images/zil8k06j/production/5b44ab896ae320caaabe68fe3554dcde7a42bd77-1920x1621.webp", title: "Matte Black Night Cleats" },
    { src: "https://cdn.sanity.io/images/zil8k06j/production/af690f9b04acde79a97ec0d306e804a1058e67e6-1920x1621.webp", title: "Ice White Signature Edition" }
  ],
  closing: {
    heading: "The game is just the beginning",
    ctaText: "Off-Field",
    ctaLink: "/off-field"
  }
};
