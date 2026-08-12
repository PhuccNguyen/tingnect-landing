export const SITE_CONFIG = {
  name: "Yaa Club",
  slogan: "Wellbeing that works",
  tagline: "More than a game, it's a community",
  description:
    "Discover clubs, join communities, book sports activities and organize events. Play. Connect. Grow.",
  /** Domain chinh thuc, da dang ky. */
  website: process.env.NEXT_PUBLIC_SITE_URL || "https://yaaclub.com",
  /** ⚠️ TAM DAT — chua co hom thu that. Sua khi co dia chi chinh thuc. */
  email: "hello@yaaclub.com",
};

export const SOCIAL_LINKS = {
  twitter: "https://x.com/YaaClubApp",
  facebook: "https://www.facebook.com/YaaClub",
  youtube: "https://www.youtube.com/@YaaClubApp",
  /** Chua co tai khoan that — tro ve trang coming-soon */
  instagram: "/coming-soon?page=Instagram",
};

/** Cac mon the thao Yaa Club dang phuc vu */
export const SPORTS = [
  "Pickleball",
  "Yoga",
  "Run Club",
  "Football",
  "Padel",
] as const;

/** 3 nhom nguoi dung cua nen tang */
export const ROLES = [
  {
    name: "Users",
    description:
      "Kham pha, tham gia va dat cho cac hoat dong the thao ban yeu thich.",
  },
  {
    name: "Club Owners",
    description: "Phat trien cong dong va quan ly club mot cach de dang.",
  },
  {
    name: "Venues / Organizers",
    description: "Dang san, to chuc su kien, tiep can nhieu nguoi choi hon.",
  },
] as const;

/**
 * So lieu minh hoa cho StatsBar. Day la DEMO DATA, khong phai metrics that —
 * phai ghi ro tren UI de khong gay hieu nham.
 */
export const DEMO_STATS = [
  { value: 2500, suffix: "+", label: "Active Clubs" },
  { value: 12000, suffix: "+", label: "Bookings / Month" },
  { value: 250, suffix: "K+", label: "Community Members" },
  { value: 1000, suffix: "+", label: "Events Hosted" },
  { value: 20, suffix: "+", label: "Cities" },
] as const;
