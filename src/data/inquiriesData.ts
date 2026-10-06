export interface InquiryChannel {
  title: string;
  email: string;
  description: string;
}

export const inquiriesData = {
  hero: {
    heading: "PARTNER WITH JUSTIN",
    subheading: "Details and formal booking contacts for brand alignments, media requests, and appearances."
  },
  channels: [
    {
      title: "Partnerships",
      email: "partnerships@jjettas.com",
      description: "Brand partnerships, endorsements, and campaign collaborations."
    },
    {
      title: "Media & Press",
      email: "media@jjettas.com",
      description: "Interviews, features, and press inquiries."
    },
    {
      title: "Booking & Appearances",
      email: "booking@jjettas.com",
      description: "Events, appearances, and booking requests."
    }
  ] as InquiryChannel[]
};
