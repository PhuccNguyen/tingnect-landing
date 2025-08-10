export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  category: 'social' | 'community' | 'development' | 'business';
}

export const socialLinks: SocialLink[] = [
  // Social Media
  {
    name: 'Twitter/X',
    url: 'https://x.com/TingNect',
    icon: 'twitter',
    category: 'social'
  },
  {
    name: 'Facebook Page',
    url: 'https://www.facebook.com/TingNect',
    icon: 'facebook',
    category: 'social'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@tingnect',
    icon: 'tiktok',
    category: 'social'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@TingNect',
    icon: 'youtube',
    category: 'social'
  },

  // Community
  {
    name: 'Telegram Channel',
    url: 'https://t.me/tingnect',
    icon: 'telegram',
    category: 'community'
  },
  {
    name: 'Telegram Group',
    url: 'https://t.me/TingNectGroup',
    icon: 'telegram',
    category: 'community'
  },
  {
    name: 'Facebook Group',
    url: 'https://www.facebook.com/groups/tingnect',
    icon: 'facebook',
    category: 'community'
  },

  // Development
  {
    name: 'GitHub',
    url: 'https://github.com/TingNect',
    icon: 'github',
    category: 'development'
  },
  {
    name: 'Documentation',
    url: 'https://docs.tingnect.com',
    icon: 'book',
    category: 'development'
  },

  // Business
  {
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com/community/profile/TingNect',
    icon: 'chart',
    category: 'business'
  }
];

export const contactEmail = 'contact@tingnect.com';
export const eventRegistrationUrl = 'https://lu.ma/tingnect';
export const eventSiteUrl = 'https://event.tingnect.com';
