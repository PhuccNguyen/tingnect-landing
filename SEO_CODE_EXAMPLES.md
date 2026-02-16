# 🔧 SEO Code Implementation Examples

## 1. FIX H1 TAGS - Code Template

### Homepage Hero (src/components/home/Hero/Hero.tsx)
```tsx
export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Ensure this H1 exists and is visible */}
      <h1 className={styles.heroTitle}>
        TingNect - Build for Billions
      </h1>
      
      {/* Rest of hero content */}
      <RightVisual />
      <MainContent />
    </section>
  );
}
```

### Products Page (src/components/products/ProductsHero/ProductsHero.tsx)
```tsx
export default function ProductsHero() {
  return (
    <section className={styles.productHero}>
      <h1>Cutting-Edge Web3 & AI Products</h1>
      <p>Building the future of blockchain technology</p>
    </section>
  );
}
```

### ID Page (src/components/id/IDHero/IDHero.tsx)
```tsx
export default function IDHero() {
  return (
    <section className={styles.idHero}>
      <h1>Explore & Verify Web3 Identities</h1>
      <p>Discover blockchain profiles and on-chain contributions</p>
    </section>
  );
}
```

### Contact Page (src/components/contact/ContactHero/ContactHero.tsx)
```tsx
export default function ContactHero() {
  return (
    <section className={styles.contactHero}>
      <h1>Get in Touch with TingNect</h1>
      <p>Connect with our team for partnerships and collaboration</p>
    </section>
  );
}
```

---

## 2. ADD IMAGE ALT TEXT - Examples

### Bad ❌
```tsx
<Image src="/logo.png" alt="logo" width={100} height={100} />
<Image src="/hero.jpg" alt="image" width={1200} height={600} />
```

### Good ✅
```tsx
<Image 
  src="/Image/Logo/TingnectNew/TingNect icon white.png" 
  alt="TingNect - Build for Billions logo icon" 
  width={100} 
  height={100} 
/>

<Image 
  src="/Image/hero-background.jpg" 
  alt="Hero section background showing developers collaborating on Web3 projects" 
  width={1200} 
  height={600} 
/>
```

### For Product Cards
```tsx
<Image 
  src="/products/ting-identity.png" 
  alt="Ting Identity - Decentralized identity solution for secure Web3 authentication" 
  width={400} 
  height={300} 
/>

<Image 
  src="/products/ting-chain.png" 
  alt="Ting Chain - High-performance blockchain for decentralized applications" 
  width={400} 
  height={300} 
/>
```

### For Profile Cards (ID Page)
```tsx
<Image 
  src={walletData.avatar} 
  alt={`${walletData.name} Web3 profile picture - verified blockchain developer`} 
  width={80} 
  height={80} 
/>
```

### For Footer/Header
```tsx
<Image 
  src="/Image/Logo/TingnectNew/TingNect icon white.png" 
  alt="TingNect homepage link - Web3 community platform" 
  width={40} 
  height={40} 
/>
```

---

## 3. FIX BROKEN IMAGE REFERENCES

### Problem Files
```
❌ Logo TingNect  white png.png  → ✅ logo-tingnect-white.png
❌ Logo TingNect horizontal white PNG copy.png  → ✅ logo-tingnect-horizontal.png
❌ Logo TingNect  white png.png  → ✅ logo-tingnect-white.png
```

### Search & Replace in Code
Find and replace these references:
```
// BEFORE
/Image/Logo/TingNect/TingNect-Logo-OG.jpg
/Image/Logo/TingFoundation/TingFoundation-white.svg
Logo TingNect  white png.png

// AFTER
/Image/Logo/TingnectNew/logo-og-1200x630.jpg
/Image/Logo/Trustlabs/trustlabs-light.png
logo-tingnect-white.png
```

---

## 4. ADD LOCAL BUSINESS SCHEMA (for layout.tsx)

Add this to `src/app/layout.tsx` inside the `<body>` tag:

```tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Existing scripts... */}
        
        {/* Add this LocalBusiness Schema */}
        <Script id="local-business-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TingNect",
            "image": "https://tingnect.com/Image/Logo/TingnectNew/TingNect icon white.png",
            "description": "Premier Web3 community platform connecting innovators, builders, and investors in Vietnam",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "District 1",
              "addressLocality": "Ho Chi Minh City",
              "addressCountry": "VN"
            },
            "telephone": "+84-[YOUR-PHONE-NUMBER]",
            "email": "contact@tingnect.com",
            "url": "https://tingnect.com",
            "sameAs": [
              "https://twitter.com/tingnect",
              "https://linkedin.com/company/tingnect",
              "https://github.com/tingnect"
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00",
              "timeZone": "Asia/Ho_Chi_Minh"
            },
            "priceRange": "Free",
            "areaServed": {
              "@type": "Country",
              "name": "VN"
            }
          })}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 5. ADD SECURITY HEADERS (next.config.ts)

Update your `next.config.ts`:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  images: {
    domains: ['localhost', 'tingnect.com', 'event.tingnect.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // ADD THIS SECTION FOR SECURITY HEADERS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          }
        ]
      }
    ];
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
```

---

## 6. ADD BREADCRUMB SCHEMA - Per Page

### Products Page
```tsx
// In src/app/products/page.tsx
import Script from "next/script";

export default function ProductsPage() {
  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://tingnect.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Products",
              "item": "https://tingnect.com/products"
            }
          ]
        })}
      </Script>

      <ProductsHero />
      <ProductsGrid />
      <TechStack />
    </>
  );
}
```

### ID Page
```tsx
// Similar structure in src/app/id/page.tsx
<Script id="breadcrumb-schema" type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tingnect.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Web3 ID",
        "item": "https://tingnect.com/id"
      }
    ]
  })}
</Script>
```

---

## 7. OPTIMIZE IMAGES - WebP + Lazy Loading

### Before (Not Optimized)
```tsx
<Image
  src="/Image/hero-background.jpg"
  alt="Web3 event background"
  width={1200}
  height={600}
  priority={false}
/>
```

### After (Optimized)
```tsx
<Image
  src="/Image/hero-background.jpg"
  alt="Web3 event background showing developers networking"
  width={1200}
  height={600}
  loading="lazy"
  quality={75}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
/>
```

### Critical Images (keep priority)
```tsx
{/* Hero background - above fold, use priority */}
<Image
  src="/Image/hero-background.jpg"
  alt="TingNect Web3 platform hero background"
  width={1200}
  height={600}
  priority
  quality={80}
/>

{/* Header logo - above fold, use priority */}
<Image
  src="/Image/Logo/TingnectNew/TingNect icon white.png"
  alt="TingNect - Build for Billions logo"
  width={160}
  height={160}
  priority
/>
```

### Lazy Load Images (below fold)
```tsx
{/* Product cards - below fold, lazy load */}
<Image
  src={product.image}
  alt={`${product.name} - ${product.description}`}
  width={400}
  height={300}
  loading="lazy"
/>
```

---

## 8. CREATE 404 ERROR PAGE

Create `src/app/not-found.tsx`:

```tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | TingNect',
  description: 'The page you are looking for does not exist. Return to TingNect homepage.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem', textAlign: 'center', maxWidth: '500px' }}>
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          borderRadius: '0.5rem',
          textDecoration: 'none'
        }}>
          Go to Homepage
        </Link>

        <Link href="/products" style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#6b7280', 
          color: 'white', 
          borderRadius: '0.5rem',
          textDecoration: 'none'
        }}>
          View Products
        </Link>

        <Link href="/contact" style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#6b7280', 
          color: 'white', 
          borderRadius: '0.5rem',
          textDecoration: 'none'
        }}>
          Contact Us
        </Link>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.7 }}>
        <p>Other pages you might like:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link href="/id" style={{ color: '#3b82f6' }}>Web3 Identity Explorer</Link></li>
          <li><Link href="/privacy" style={{ color: '#3b82f6' }}>Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
  );
}
```

---

## 9. MONITOR CORE WEB VITALS

Add to `src/lib/web-vitals.ts`:

```typescript
export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics (Google Analytics 4)
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'web_vital',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
}
```

Use in `app/layout.tsx`:
```tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVitals } from '@/lib/web-vitals';

export function Vitals() {
  useReportWebVitals(reportWebVitals);
  return null;
}

// In your layout:
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Vitals />
        {/* ... rest of layout */}
      </body>
    </html>
  );
}
```

---

## 🎯 Priority Implementation Order

1. **TODAY**: Add H1 tags + fix broken images (1 hour)
2. **TOMORROW**: Add alt text to critical images (2 hours)
3. **THIS WEEK**: LocalBusiness schema + security headers (2 hours)
4. **NEXT WEEK**: Image optimization + monitor results (3 hours)

**Estimated total time**: 8-10 hours for all critical implementations
**Expected SEO improvement**: 30-50% more organic traffic in 4-8 weeks ✨
