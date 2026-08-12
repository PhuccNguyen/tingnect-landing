# Yaa Club — Toàn bộ thông tin ứng dụng (AI Context Document)

> **Mục đích file này**: Cung cấp cho AI (hoặc bất kỳ ai) hiểu đầy đủ về dự án YaaClub Landing Page — web này là gì, xây dựng ra sao, cấu trúc thế nào, brand guidelines, các trang, các component, social links, v.v.

---

## 1. Sản phẩm là gì?

**Yaa Club** là một nền tảng **thể thao cộng đồng** (sports community platform) với slogan:

> **"Wellbeing that works. Play. Connect. Grow."**
> **"More than a game, it's a community."**

### Yaa Club giải quyết vấn đề gì?
- Giúp người dùng **khám phá câu lạc bộ** (clubs), **tham gia cộng đồng** (communities)
- **Đặt chỗ hoạt động thể thao** (book sports activities) — sân, lớp học, buổi tập
- **Tổ chức & quản lý sự kiện** (organize & manage events)
- Kết nối mọi người thông qua thể thao — **Pickleball, Yoga, Run Club, Football, Padel...**

### Đối tượng người dùng (3 roles):
| Role | Mô tả |
|------|--------|
| **Users** | Người chơi — khám phá, tham gia, đặt chỗ hoạt động thể thao yêu thích |
| **Club Owners** | Chủ câu lạc bộ — phát triển cộng đồng, quản lý club dễ dàng |
| **Venues / Organizers** | Chủ sân / Người tổ chức — đăng sân, tổ chức sự kiện, tiếp cận nhiều người chơi hơn |

### Trạng thái hiện tại
- App mobile đang **"Coming Soon"** — chưa có trên App Store / Google Play
- Trang web hiện tại là **Marketing Landing Page** — giới thiệu sản phẩm, thu hút người dùng theo dõi
- © 2026 YaaClub

---

## 2. Các kênh liên kết & mạng xã hội

| Kênh | Link | Ghi chú |
|------|------|---------|
| **X (Twitter)** | `https://x.com/YaaClubApp` | Kênh chính để follow cập nhật ra mắt app. Nút CTA "Follow us on X" xuất hiện nhiều nơi trên site |
| **Facebook** | `https://www.facebook.com/YaaClub` | Trang Facebook chính thức |
| **YouTube** | `https://www.youtube.com/@YaaClubApp` | Kênh YouTube chính thức |
| **Instagram** | Chưa có link thực — trỏ đến `/coming-soon` | Đang chuẩn bị |

### Giải thích các nút social trên site:
- **Footer**: Có 4 icon social (Instagram, Facebook, X, YouTube) — Instagram trỏ coming-soon, 3 cái kia trỏ ra link thật
- **Coming-soon page**: Nút CTA chính là "Follow us on X" → `https://x.com/YaaClubApp`
- **Download page**: Link text "X (Twitter)" → `https://x.com/YaaClubApp`

---

## 3. Tech Stack

| Thành phần | Công nghệ | Phiên bản |
|------------|-----------|-----------|
| **Framework** | Next.js (App Router, Turbopack) | 16.2.11 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | ^5 |
| **Styling** | Tailwind CSS v4 + CSS Variables | ^4 |
| **Animations** | GSAP (ScrollTrigger, SplitText) + Framer Motion | gsap ^3.15, framer-motion ^12.42 |
| **Smooth Scroll** | Lenis | ^1.3.25 |
| **Icons** | Lucide React | ^1.25 |
| **Image Processing** | Sharp | ^0.35.3 |
| **Fonts** | Google Fonts (Inter, Inter Tight) via `next/font` | — |
| **Build** | Turbopack (dev), Next.js built-in (prod) | — |
| **Package Manager** | npm (also supports pnpm) | — |

### Scripts
```bash
npm run dev           # Chạy development server → http://localhost:3000
npm run build         # Build production (zero warnings)
npm run lint          # ESLint
npm run prep:images   # Crop ảnh từ _library/ vào đúng slot size
npm run gen:images    # Generate ảnh bằng AI (Gemini/OpenAI)
npm run cutout        # Tách nền ảnh
```

---

## 4. Cấu trúc dự án (Project Structure)

```
YaaclubLandingPage/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, Cursor)
│   ├── page.tsx                # Trang chủ (landing page)
│   ├── globals.css             # Design system, brand palette, animations
│   ├── favicon.ico
│   ├── coming-soon/
│   │   └── page.tsx            # Trang "Coming Soon" (dynamic content)
│   └── download/
│       └── page.tsx            # Trang download app (3 phone mockups)
│
├── components/
│   ├── layout/
│   │   ├── Logo.tsx            # Component duy nhất để render logo
│   │   ├── Nav.tsx             # Thanh navigation (fixed, responsive)
│   │   ├── Footer.tsx          # Footer (5 cột, newsletter form)
│   │   └── MagneticButton.tsx  # Nút từ tính (hover effect GSAP)
│   │
│   ├── sections/               # Các section trên trang chủ
│   │   ├── Hero.tsx            # Hero section (headline + photos + phone)
│   │   ├── StatsBar.tsx        # Thanh thống kê (5 chỉ số count-up)
│   │   ├── Features.tsx        # 4 tính năng chính
│   │   ├── Roles.tsx           # 3 role cards (Users/Club Owners/Venues)
│   │   ├── FeaturedEvents.tsx  # 5 event cards (grid/carousel)
│   │   └── BigCTA.tsx          # Call-to-action cuối trang
│   │
│   └── ui/                     # UI primitives
│       ├── Cursor.tsx          # Custom cursor (cream dot, mix-blend-mode)
│       ├── GrainOverlay.tsx    # Film grain overlay (opacity 0.04)
│       ├── Marquee.tsx         # Infinite scrolling text
│       ├── PhoneMockup.tsx     # Phone UI mockup (Yaa Club "Connect" screen)
│       ├── Pill.tsx            # Colored tag/chip
│       ├── Reveal.tsx          # Scroll-triggered entrance animation
│       ├── StoreBadges.tsx     # App Store + Google Play badges (inline SVG)
│       └── Tilt.tsx            # 3D tilt hover effect
│
├── lib/
│   ├── gsap.ts                 # GSAP plugin registration
│   ├── lenis.tsx               # Lenis smooth scroll provider
│   ├── events.ts               # Dữ liệu events + stats
│   ├── image-manifest.ts       # Registry tất cả ảnh/logo
│   └── navigation.ts           # Nav links, footer columns, soonHref()
│
├── scripts/                    # Build scripts (Node.js)
│   ├── slots.mjs               # Slot registry (prompt, size cho mỗi ảnh)
│   ├── prepare-images.mjs      # Crop ảnh từ library
│   ├── generate-images.mjs     # AI image generation
│   ├── compose-logo.mjs        # Tạo biến thể logo (cream, lime)
│   └── cutout-bg.mjs           # Xóa nền ảnh
│
├── public/
│   ├── logo/                   # 7 file logo PNG (gốc + cream + lime variants)
│   ├── images/                 # 16 ảnh sử dụng trên site + manifest.json
│   │   └── _library/           # Ảnh gốc nguồn
│   └── icon_yaaclub/           # 2 brand icon PNG (connect, global)
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind / postcss configs
```

---

## 5. Brand System (Hệ thống thương hiệu)

### 5.1 Color Palette
Tất cả hex values chỉ tồn tại trong `globals.css` dưới dạng CSS variables:

| Variable | Hex | Mô tả |
|----------|-----|--------|
| `--yaa-cream` | `#FAFFA2` | Primary — Kem vàng chanh (màu nền chính hero) |
| `--yaa-black` | `#0A0A0A` | Primary — Đen gần tuyệt đối |
| `--yaa-lime` | `#D2FF00` | Secondary — Xanh lá neon (accent chính, CTA) |
| `--yaa-red` | `#FF5722` | Secondary — Đỏ cam (category tag) |
| `--yaa-purple` | `#635BCE` | Secondary — Tím (accent phụ) |
| `--yaa-off` | `#F6F5EE` | Neutral — Off-white ấm |
| `--yaa-sand` | `#E7E1D3` | Neutral — Cát |
| `--yaa-white` | `#FFFFFF` | Neutral — Trắng (nền section chính) |
| `--yaa-ink-60` | `rgba(10,10,10,0.6)` | Neutral — Text phụ |
| `--yaa-ink-15` | `rgba(10,10,10,0.15)` | Neutral — Border nhẹ |
| `--yaa-ink-08` | `rgba(10,10,10,0.08)` | Neutral — Shadow |

### 5.2 Typography
| Loại | Font | Weight | Tracking | Leading |
|------|------|--------|----------|---------|
| **Display** (headline) | Inter Tight | 700/800/900 | -0.03em | 0.95 |
| **Body** (text) | Inter | 400/500/600 | default | default |
| **Eyebrow** (label) | Inter | 600 | 0.22em | — (UPPERCASE) |

### 5.3 Logo
- **Source**: Original PNG artwork trong `public/logo/`
- **Variants**: standard (dark), inverted (cream), icon, lime
- **Orientations**: horizontal, vertical
- **Component duy nhất**: `<Logo variant="..." orientation="..." height={...} />`
- **Quy tắc**: Logo KHÔNG BAO GIỜ được vẽ lại hoặc re-typeset. Luôn dùng ảnh gốc
- **Clear space**: Half icon-height clear space (qua prop `safe`)

### 5.4 Logo files
```
public/logo/
├── yaa-icon.png                    # Icon (dark)
├── yaa-icon-cream.png              # Icon (cream cho dark bg)
├── yaa-lockup-horizontal.png       # Horizontal lockup (dark)
├── yaa-lockup-horizontal-cream.png # Horizontal lockup (cream)
├── yaa-lockup-vertical.png         # Vertical lockup (dark)
├── yaa-lockup-vertical-cream.png   # Vertical lockup (cream)
└── yaa-lockup-vertical-lime.png    # Vertical lockup (lime)
```

---

## 6. Các trang (Pages)

### 6.1 Trang chủ (`/`)

Trang landing page chính với flow từ trên xuống:

```
Nav (fixed top) ─────────────────────────────────
Hero ─── headline "More than a game, it's a community"
      ─── 2 ảnh thể thao + phone mockup (desktop)
      ─── CTA: "Download the App"
StatsBar ─── 5 thống kê: 2,500+ Active Clubs, 12,000+ Bookings/Month,
             250K+ Community Members, 1,000+ Events Hosted, 20+ Cities
             (Demo data — count-up animation)
Features ─── "Everything you need, all in one app"
          ─── 4 features: Club Discovery, Sports Booking, Event Management, Community Hub
Roles ─── "Built for every role in the sports ecosystem"
       ─── 3 cards: Users, Club Owners, Venues/Organizers
FeaturedEvents ─── "Featured Events"
               ─── 5 event cards: Weekend Pickleball Social, City Long Run 12K,
                   Slow Flow Yoga, Evening Strength Club, Friday Community Night
BigCTA ─── "Ready to be part of something bigger?"
        ─── CTA: "Get Started for Free" + Store Badges
Footer ─── 5 cột: Brand + Explore + For Organizers + Company + Newsletter
```

**Bọc bởi**: `<LenisProvider>` (smooth scroll) + `<GrainOverlay>` (film grain)

### 6.2 Coming Soon (`/coming-soon?page=...`)

Trang placeholder cho mọi tính năng chưa xây dựng. Nhận query param `page` để hiển thị tiêu đề + mô tả tương ứng.

**Các page đã định nghĩa**:
| Page param | Mô tả |
|------------|--------|
| Communities | "Find your people. Clubs, crews and communities for every sport are almost here." |
| List a Venue | "Turn your courts into a clubhouse. Venue tools are warming up." |
| Host an Event | "Create, promote and fill events in minutes. This is nearly ready." |
| Manage Events | "Sign-ups, check-ins and rosters in one place. Coming very soon." |
| Resources | "Guides and playbooks for organizers are being written right now." |
| About Us | "The story behind wellbeing that works. Almost ready to share." |
| Careers | "Build the future of community sport with us. Roles posting soon." |
| Blog | "Field notes on play, community and wellbeing. Publishing shortly." |
| Contact Us | "We would love to hear from you. This channel opens soon." |
| App Store | "Yaa Club on iOS is almost here. Follow us on X to be the first to download when we launch." |
| Google Play | "Yaa Club on Android is almost here. Follow us on X to be the first to download when we launch." |

**UI**: Full-screen dark background + ảnh thể thao + gradient overlay, centered "COMING SOON" headline, eyebrow pill với tên page, CTA "Follow us on X" + "Get the app"

### 6.3 Download (`/download`)

Trang download app riêng biệt với:
- **3 phone mockups**: Floating animation (3D perspective tilt)
- **Headline**: "GET THE APP"
- **Store buttons**: App Store + Google Play (cả hai trỏ đến coming-soon vì app chưa ra)
- **Background**: Dark (`--yaa-black`) + SVG sketch lines animated (lime, purple, cream sweeps) + radial glow + grain wash
- **Social nudge**: "Follow us on X (Twitter) for launch updates"

---

## 7. Component chi tiết

### 7.1 Layout Components

#### `Nav.tsx`
- **Vị trí**: Fixed top, height 76px, z-index 50
- **Desktop**: Logo trái + 6 nav links + "Log in" button + "Get Started" MagneticButton
- **Mobile**: Hamburger menu (Menu/X icon) → dropdown với links + buttons
- **Scroll effect**: Shadow thay đổi khi scroll > 8px

**Nav Links**:
| Label | Target |
|-------|--------|
| Discover | `#discover` (Hero section) |
| Communities | `/coming-soon?page=Communities` |
| Events | `#events` |
| Bookings | `#features` |
| For Organizers | `#roles` |
| Download App | `#download` |

#### `Footer.tsx`
- **Background**: `--yaa-black`, text `--yaa-cream`
- **5 cột**: Brand (logo + tagline + 4 social icons) | Explore | For Organizers | Company | Stay Connected (newsletter form)
- **Newsletter**: Email input + submit → "You are in. Welcome to the club." (client-side only, no backend)
- **Bottom bar**: "© 2026 YaaClub" + Terms of Service + Privacy Policy

#### `MagneticButton.tsx`
- **Effect**: Nút "từ tính" — khi mouse đến gần (120-140px), nút bị hút theo con trỏ
- **Snap-back**: `elastic.out(1, 0.4)` khi mouse rời đi
- **Variants**: filled (black bg), ghost (border), lime (lime bg), dark (black bg + lime text)
- **Powered by**: GSAP

#### `Logo.tsx`
- **Props**: `variant` (standard/inverted/icon/lime), `orientation` (horizontal/vertical), `height`, `safe`, `priority`
- **Rule**: Chỉ render PNG gốc, không vẽ lại. Component duy nhất được phép render logo.

### 7.2 Section Components

#### `Hero.tsx`
- **Headline**: "More than a game, it's a community" — animated bằng SplitText (từng word slide up)
- **Eyebrow**: "Yaa Club · Wellbeing that works"
- **Sub-copy**: "Discover clubs, join communities, book sports activities and organize events, all in one place."
- **CTA**: "Download the App" → `/download`
- **Desktop layout**: 40/60 grid — text trái, 2 ảnh tròn + phone mockup phải
- **Mobile layout**: Text trên, ảnh + phone dưới
- **Decorations**: Scribble SVG (draw-in animation), Splash SVG (paint splatter), floating pills (Pickleball, Yoga), small event cards

#### `StatsBar.tsx`
- **5 stats**: `2,500+ Active Clubs`, `12,000+ Bookings/Month`, `250K+ Community Members`, `1,000+ Events Hosted`, `20+ Cities`
- **Animation**: Count-up bằng rAF khi enter viewport, 1.3s ease-out
- **Note**: Hiển thị "Demo data" — dữ liệu minh họa, không phải metrics thật

#### `Features.tsx`
- **Headline**: "Everything you need, all in one app"
- **4 features**:
  1. Club Discovery (Search icon, black)
  2. Sports Booking (CalendarDays icon, purple)
  3. Event Management (connect_icon_yaaclub.png)
  4. Community Hub (global_icon_yaaclub.png)
- **CTAs**: "Explore Clubs" → `#events`, "For Organizers" → `#roles`

#### `Roles.tsx`
- **Headline**: "Built for every role in the sports ecosystem"
- **Background**: Cream (`--yaa-cream`)
- **3 cards** với hover lift + border color change:
  1. Users (User icon, lime) → coming-soon
  2. Club Owners (Store icon, purple) → coming-soon
  3. Venues/Organizers (MapPin icon, red) → coming-soon

#### `FeaturedEvents.tsx`
- **Headline**: "Featured Events" + "View all events →"
- **5 event cards** (scroll horizontally on mobile, 5-col grid on desktop):
  1. Weekend Pickleball Social — Sat Jul 26, 4:00 PM — Thao Dien Courts, D2
  2. City Long Run 12K — Sun Jul 27, 5:30 AM — Riverside Loop, D1
  3. Slow Flow Yoga — Tue Jul 29, 6:30 PM — Garden Studio, D3
  4. Evening Strength Club — Wed Jul 30, 7:00 PM — Iron House Gym, D7
  5. Friday Community Night — Fri Aug 1, 8:00 PM — Rooftop 68, D1
- **Mỗi card**: Ảnh + category pill + title + date/time + venue + member avatars + extra count
- **3D Tilt**: Mỗi card có `<Tilt>` wrapper cho hiệu ứng 3D hover

#### `BigCTA.tsx`
- **Headline**: "Ready to be part of something bigger?" (lime highlight)
- **Sub-copy**: "Join thousands of players building better weeks through sport."
- **CTAs**: "Get Started for Free" + App Store/Google Play badges
- **Background**: Black rounded card với ảnh CTA bên phải (desktop)

### 7.3 UI Components

#### `PhoneMockup.tsx`
- **Mô phỏng**: Màn hình "Connect" của app Yaa Club — swipe-to-connect flow
- **Nội dung hiển thị**:
  - Top bar: Filter + Search + Notification bell (2 badges) + List
  - Tabs: People | Clubs | Meets | Matches
  - Filter pills: "Los Angeles, USA" + "Select Sport"
  - "Swipe to connect" label
  - Profile card: "Maya Tran" (Lv 12), Communities (Sunrise Runners, Zain Padel Club), Hobbies (Coffee, Hiking, Vinyl)
  - Swipe actions: Rewind (purple), X (black), Heart (red), Zap (lime)
  - Bottom nav: Chat (1 badge), Connect (active), Discovery (FAB center), Wall, Profile
- **Kỹ thuật**: Sizing bằng `cqw` (container query width) → scale perfect ở mọi kích thước

#### `Cursor.tsx`
- Custom cursor: Cream dot 10px, `mix-blend-mode: difference`
- Hover state: Phình to 48px khi hover interactive elements (`data-cursor-hover`)
- Hidden on touch devices (`pointer: coarse`)

#### `Reveal.tsx`
- Scroll-triggered entrance: `opacity: 0→1, y: 24→0, 0.9s power4.out`
- Supports `stagger` prop để animate children tuần tự
- Sử dụng GSAP ScrollTrigger, `once: true` (chỉ chạy 1 lần)

#### `Tilt.tsx`
- 3D tilt theo cursor: Writes CSS variables `--rx`, `--ry`, `--rz`
- Base resting pose (có thể set sẵn) + cursor-driven extra rotation
- `gsap.quickTo` cho smooth updates
- Disabled under `prefers-reduced-motion`

#### `StoreBadges.tsx`
- App Store + Google Play badges bằng inline SVG
- 2 schemes: `dark` (black badges) + `light` (cream-stroked badges cho dark bg)

#### `Pill.tsx`
- Small rounded tag/chip
- Colors: lime, red, purple, black

#### `GrainOverlay.tsx`
- Fixed film grain overlay, opacity 0.04, mix-blend-mode multiply

#### `Marquee.tsx`
- Infinite horizontal scrolling text, 32s duration
- Pauses on hover

---

## 8. Motion & Animation Spec (Locked)

| Element | Spec |
|---------|------|
| **Default entrance** (Reveal) | opacity 0→1, y 24→0, 0.9s `power4.out` |
| **Headline** (Hero) | SplitText by word, 120% y mask, stagger 0.06, 1.1s `power4.out` |
| **Lime highlight** (Hero) | scaleX 0→1, 0.7s `power4.out`, stagger 0.09, delay 0.75 |
| **Stats count-up** | 1.3s ease-out rAF (requestAnimationFrame) |
| **Card hover** | -6px translateY + soft shadow, 0.35s cubic-bezier |
| **Magnetic buttons** | 120-140px radius, snap-back `elastic.out(1, 0.4)` |
| **Scroll scrubs** | `scrub: 1`, `ease: "none"` (hero parallax) |
| **Scribble draw-in** | strokeDashoffset 900→0, 1.3s `power4.out` |
| **Phone float** (Download) | 4.2-5.6s ease-in-out infinite, 3D perspective tilt |
| **Sketch lines** (Download) | SVG stroke draw-in + fade-out, 9-12s loop |
| **Soft float** (Hero chips) | translateY 0→-9px, 4.5-5.5s ease-in-out infinite |
| **Smooth scroll** | Lenis — lerp 0.08, duration 1.2 |
| **Reduced motion** | ALL animations disabled via `gsap.matchMedia` + CSS `prefers-reduced-motion` |

---

## 9. Image Pipeline

### Slot System
Mỗi ảnh trên site có một "slot" với:
- Self-authored prompt (camera, lens, lighting, wardrobe, negative prompt)
- Exact @2x pixel size
- Output filename

### Registry (`lib/image-manifest.ts`)
```typescript
IMAGES = {
  heroAthlete:    "/images/hero-01-athlete-left.jpg",     // Hero panel 1
  heroRunner:     "/images/hero-03-runner.jpg",            // Hero panel 2
  heroEventCard:  "/images/hero-04-eveninghoops-card.jpg",
  heroWomanCut:   "/images/hero-woman-cut.png",            // Transparent cutout
  heroRunnerCut:  "/images/hero-runner-cut.png",            // Transparent cutout
  evtPadel:       "/images/weekend-padel-social.jpg",      // Event: Pickleball
  evtRun:         "/images/sunrise-long-run.jpg",          // Event: Run club
  evtYoga:        "/images/sunset-yoga-flow.jpg",          // Event: Yoga
  evtHoops:       "/images/evening-hoops.jpg",             // Event: Strength
  evtFootball:    "/images/friday-night-football.jpg",     // Event: Community
  ctaBanner:      "/images/_library/387.87x167.87.png",    // CTA banner
  comingSoonBg:   "/images/coming-soon-bg.jpg",            // Coming-soon bg
  evtRunCard:     "/images/_library/254x178.png",          // Run event card
}
```

### Hai entry points:
1. **`npm run prep:images`** — Offline, crop từ `_library/`, không cần API key
2. **`npm run gen:images`** — AI generation (Gemini API default, OpenAI fallback cho text-heavy slots)

---

## 10. Navigation Map (Sitemap)

```
/                         → Landing page (Hero → Stats → Features → Roles → Events → CTA → Footer)
/download                 → Download app page (3 phones + store buttons)
/coming-soon?page=...     → Coming-soon placeholder (dynamic content based on ?page param)

Hash anchors (on /):
  #top        → Top of page
  #discover   → Hero section
  #stats      → StatsBar
  #features   → Features section
  #roles      → Roles section  
  #events     → FeaturedEvents section
  #download   → BigCTA section
```

### Helper function
```typescript
// lib/navigation.ts
export function soonHref(label: string) {
  return `/coming-soon?page=${encodeURIComponent(label)}`;
}
```
→ Mọi link chưa có trang thật đều dùng hàm này để trỏ đến coming-soon.

---

## 11. SEO & Metadata

### Root Layout
```
Title: "Yaa Club | Wellbeing that works"
Description: "Discover clubs, join communities, book sports activities and organize events. Play. Connect. Grow. More than a game, it's a community."
Keywords: Yaa Club, pickleball, wellbeing, sports community, sports booking, events, run club, yoga
OG Type: website
OG Locale: en_US
OG Site Name: Yaa Club
```

### Coming-soon page
```
Title: "Coming soon | Yaa Club"
Description: "This part of Yaa Club is in training. Check back soon."
```

### Download page
```
Title: "Download the App | Yaa Club"
Description: "Yaa Club mobile app — coming soon to App Store and Google Play. Discover clubs, book activities, and connect with your community."
```

---

## 12. Design Rules & Hard Bans

| Rule | Mô tả |
|------|--------|
| ❌ No em-dashes in body copy | Không dùng — trong nội dung |
| ❌ No centered SaaS hero | Hero không được centered kiểu SaaS chuẩn |
| ❌ No gradient blobs | Không dùng gradient blob |
| ❌ No Lorem Ipsum | Không dùng text placeholder |
| ❌ No placeholder `src` | Mọi ảnh phải có file thật |
| ❌ No hex in component code | Hex chỉ có trong `globals.css` |
| ✅ Custom cursor everywhere | Cursor native bị ẩn, custom cursor hiển thị trên mọi route |
| ✅ All animation respect reduced-motion | Mọi animation wrapped trong `matchMedia` |
| ✅ Logo only via `<Logo>` component | Không render logo bằng cách khác |

### Design Dial Values
| Dial | Value | Ý nghĩa |
|------|-------|---------|
| DESIGN_VARIANCE | 7 | Offset hero grid, rotated cards, staggered grid |
| MOTION_INTENSITY | 8 | Smooth scroll, SplitText, parallax, magnetic buttons, scribble |
| VISUAL_DENSITY | 6 | Spacious hero, denser stats band + 5-up events |

---

## 13. Next.js Configuration

```typescript
// next.config.ts
{
  images: {
    formats: ["image/avif", "image/webp"],  // Ưu tiên AVIF, fallback WebP
  },
}
```

---

## 14. Tổng kết nhanh cho AI

> **Yaa Club** là một **sports community platform** (nền tảng cộng đồng thể thao) đang ở giai đoạn **pre-launch**. Website hiện tại là **marketing landing page** chất lượng cao, xây bằng **Next.js 16 + React 19 + Tailwind v4 + GSAP**, với design premium (custom cursor, 3D tilts, smooth scroll, count-up stats, SplitText headlines). App mobile đang "coming soon" cho cả iOS và Android.
>
> Trang web có 3 route: `/` (landing), `/download` (app download), `/coming-soon` (placeholder). Mọi tính năng chưa build đều redirect về coming-soon. Social chính là **X (Twitter)**: `https://x.com/YaaClubApp`. Brand palette: cream/black/lime/red/purple.

---

*Document generated: 2026-08-12*
