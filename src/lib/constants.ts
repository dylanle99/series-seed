export const EVENT_TYPE_LABELS = {
  manufacturing: "Manufacturing",
  agriculture: "Agriculture",
  aerospace: "Aerospace",
  defense: "Defense",
  energy: "Energy",
  healthcare: "Healthcare",
  life_sciences: "Life Sciences",
  retail: "Retail",
  raw_materials: "Raw Materials",
  finance: "Finance",
};

export type IndustryCategory = {
  title: string;
  image: string;
  className?: string;
};

export const industryCategories: IndustryCategory[] = [
  {
    title: "Agriculture",
    image: "/community/industries/agriculture.png",
    className: "md:row-span-2",
  },
  {
    title: "Retail",
    image: "/community/industries/retail.png",
  },
  {
    title: "Manufacturing",
    image: "/community/industries/manufacturing.png",
  },
  {
    title: "Finance",
    image: "/community/industries/finance.png",
  },
  {
    title: "Healthcare",
    image: "/community/industries/healthcare.png",
  },
  {
    title: "Energy",
    image: "/community/industries/energy.png",
  },
  {
    title: "Life Sciences",
    image: "/community/industries/life-sciences.png",
  },
  {
    title: "Raw Materials",
    image: "/community/industries/raw-materials.png",
    className: "md:row-span-2",
  },
  {
    title: "Aerospace",
    image: "/community/industries/aerospace.png",
  },
  {
    title: "Defense",
    image: "/community/industries/defense.png",
  },
];

export type EventType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageClassName?: string;
  imagePosition?: string; // CSS object-position value like "50% 30%"
};

export const eventTypes: EventType[] = [
  {
    id: "monthly-intimate-dinners",
    title: "Monthly Intimate Dinners",
    description:
      "Curated small-format dinners that foster deeper connections and candid conversations among members.",
    imageUrl: "/community/event-types/monthly-intimate-dinners.png",
  },
  {
    id: "social-evenings",
    title: "Social Evenings",
    description:
      "Quarterly gatherings that create space for members to connect, collaborate, and build long-term relationships.",
    imageUrl: "/community/event-types/social-evenings.png",
  },
  {
    id: "roundtable-events",
    title: "Roundtable Events",
    description:
      "Monthly small-group mentoring sessions with leading executives and operators tailored to each division's needs.",
    imageUrl: "/community/event-types/roundtable-events.png",
    imagePosition: "50% 30%", // horizontal% vertical% - 50% centers horizontally, 30% positions vertically
  },
  {
    id: "mentorship-program",
    title: "Mentorship Program",
    description:
      "One-to-one mentorship and curated sessions designed to help members learn directly from the top leaders in their fields.",
    imageUrl: "/community/event-types/mentorship-program.png",
    imageClassName: "object-center",
  },
];