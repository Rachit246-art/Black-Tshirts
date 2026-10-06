import journalJson from './journal_items.json';

export interface JournalItem {
  id: string;
  type: string;
  src: string;
  poster?: string;
  label?: string;
  brand?: string;
  category?: string;
  body?: string;
  link?: string;
  contentKind?: string;
  videoId?: string;
  rotation?: number;
}

export const journalData = {
  hero: {
    title: "Journal",
    subtitle: "Swipe · tap",
    instructions: "Explore the visual timeline of projects, covers, conversations, and unseen moments."
  },
  items: (journalJson as JournalItem[]).map((item, idx) => ({
    ...item,
    rotation: item.rotation || ((idx % 5) - 2) * 2.5
  }))
};
