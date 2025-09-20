// src/data/events-data.ts
export interface EventCTA {
  label: string;
  url: string;
  type?: 'primary' | 'secondary' | 'success' | 'warning';
}

export interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: 'upcoming' | 'current' | 'past';
  featured: boolean;
  description?: string;
  
  // Backward compatibility
  registrationUrl?: string;
  capacity?: number;
  registered?: number;
  
  // Dynamic CTAs
  ctas?: EventCTA[];
  
  // Additional professional fields
  organizer?: string;
  venue?: string;
  category?: string;
  price?: string;
  tags?: string[];
}

export const eventsData: Record<string, EventData[]> = {
  current: [
    {
      id: 1,
      title: "Miss Student Peace Vietnam 2025",
      date: "Sep 27 – Dec 28, 2025",
      time: "09:00 – 22:00 ICT",
      location: "Tien Son Palace, Da Nang",
      venue: "Tien Son Palace - Da Nang Convention & Exhibition Center",
      type: "Beauty Contest",
      category: "Entertainment",
      status: "current",
      featured: true,
      organizer: "Ting Foundation",
      price: "Free Voting",
      description: "The first national-scale beauty contest exclusively for Vietnamese female students, honoring the intellect and beauty of the younger generation. Experience the future of democratic voting through our revolutionary platform.",
      capacity: 50000,
      registered: 35750,
      tags: ["Beauty", "Student", "Vietnam", "Contest", "Web3", "Democracy"],
      ctas: [
        { label: "Vote Now", url: "https://tingvote.com/", type: "primary" },
        { label: "View Gallery", url: "https://tingvote.com/gallery", type: "secondary" },
      ]
    },
    {
      id: 2,
      title: "TingVote Platform Demo",
      date: "Sep 18 – Oct 15, 2025",
      time: "24/7 Available",
      location: "Online Platform",
      venue: "TingVote Web Platform",
      type: "Platform Demo",
      category: "Technology",
      status: "current",
      featured: false,
      organizer: "TingNect Team",
      price: "Free Access",
      description: "Experience the revolutionary voting platform powered by Web3 technology. Secure, transparent, and democratic voting for the digital age.",
      capacity: 100000,
      registered: 12450,
      tags: ["Demo", "Web3", "Voting", "Technology"],
      ctas: [
        { label: "Try Demo", url: "https://tingvote.com/demo", type: "primary" },
        { label: "Learn More", url: "https://tingvote.com/about", type: "secondary" }
      ]
    }
  ],
  
  upcoming: [
   
  ],
  
  past: [
    {
      id: 4,
      title: "TingNect - Build for Billions Launch Event",
      date: "August 16, 2025",
      time: "14:00 – 17:00 ICT",
      location: "Rex Hotel, HCMC",
      venue: "Rex Hotel Saigon - 141 Nguyen Hue, District 1",
      type: "Launch Event",
      category: "Corporate",
      status: "past",
      featured: true,
      organizer: "TingNect Team",
      price: "Invitation Only",
      description: "The official launch event of TingNect platform, marking the beginning of Vietnam's Web3 ecosystem revolution.",
      capacity: 200,
      registered: 200,
      tags: ["Launch", "Official", "Platform", "HCMC", "Web3"],
      ctas: [
        { label: "View Recap", url: "https://tingvote.com/launch-recap", type: "secondary" },
        { label: "Watch Highlights", url: "https://tingvote.com/highlights", type: "secondary" }
      ]
    }
    ]
};

export const getEventsByStatus = (status: 'upcoming' | 'current' | 'past') =>
  eventsData[status] || [];

export const getFeaturedEvents = () =>
  Object.values(eventsData).flat().filter(e => e.featured);

export const getActiveEvents = () => 
  eventsData.current.filter(e => e.featured);