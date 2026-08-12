import { SOCIAL_LINKS } from '@/lib/constants';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  category: 'social' | 'community';
  /** true = chua co tai khoan that, dang tro ve coming-soon */
  comingSoon?: boolean;
}

/**
 * X (Twitter) la kenh chinh de theo doi ngay ra mat app — moi CTA
 * "Follow us on X" tren site deu tro toi day.
 */
export const socialLinks: SocialLink[] = [
  {
    name: 'X (Twitter)',
    url: SOCIAL_LINKS.twitter,
    icon: 'twitter',
    category: 'social',
  },
  {
    name: 'Facebook',
    url: SOCIAL_LINKS.facebook,
    icon: 'facebook',
    category: 'social',
  },
  {
    name: 'YouTube',
    url: SOCIAL_LINKS.youtube,
    icon: 'youtube',
    category: 'social',
  },
  {
    name: 'Instagram',
    url: SOCIAL_LINKS.instagram,
    icon: 'instagram',
    category: 'social',
    comingSoon: true,
  },
];

export const contactEmail = 'hello@yaaclub.com';
