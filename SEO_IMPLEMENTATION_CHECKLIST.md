# 🚀 SEO Improvement Checklist

## TIER 1: CRITICAL (HIGH PRIORITY) 🔴
This must be done first - these directly impact search ranking.

- [ ] **Fix All H1 Tags** (1 per page, 30 min)
  - [ ] Homepage Hero section - verify `<h1>TingNect - Build for Billions</h1>`
  - [ ] Products page - verify `<h1>` in ProductsHero
  - [ ] ID page - verify `<h1>` in IDHero  
  - [ ] Contact page - verify `<h1>` in ContactHero
  - [ ] Privacy page - verify `<h1>` tag exists

- [ ] **Add Alt Text to All Images** (1-2 hours)
  - [ ] RightVisual.tsx - globe and floating elements
  - [ ] Hero background/combined background images
  - [ ] All product cards in ProductsGrid
  - [ ] All profile cards in ID page
  - [ ] Contact form images
  - [ ] Footer images/logos
  - [ ] Header logo (desktop + mobile)

- [ ] **Fix Broken Image References** (30 min)
  - [ ] Rename `Logo TingNect  white png.png` → `logo-tingnect-white.png`
  - [ ] Update all references in `Header.tsx`, `page.tsx`, `LeftColumn.tsx`
  - [ ] Verify `/Image/Logo/TingNect/TingNect-Logo-OG.jpg` exists on contact/products pages
  - [ ] Test all image URLs return 200 status

- [ ] **Test Homepage Meta in Search Console** (15 min)
  - [ ] Use Google Search Console URL inspector
  - [ ] Check title, description render correctly
  - [ ] Verify mobile version looks good
  - [ ] Check Open Graph preview

---

## TIER 2: HIGH IMPACT (IMPLEMENT SOON) 🟠
These improve search visibility significantly.

- [ ] **Add LocalBusiness Schema** (1 hour)
  - [ ] Add to `layout.tsx` as JSON-LD script
  - [ ] Include HCMC address, phone, hours
  - [ ] Set timezone: Asia/Ho_Chi_Minh
  - [ ] Add sameAs links to social profiles

- [ ] **Add FAQ Schema (if applicable)** (30 min)
  - [ ] Create FAQPage schema for products/services
  - [ ] Include common questions about Web3, ID, products
  - [ ] Rich snippets could improve CTR 10-30%

- [ ] **Optimize Core Images to WebP** (2-3 hours)
  - [ ] Convert hero background images
  - [ ] Convert product card images
  - [ ] Set `loading="lazy"` on non-critical images
  - [ ] Test Core Web Vitals improvement

- [ ] **Add Security Headers** (30 min)
  - [ ] Update `next.config.ts` with HSTS, X-Content-Type-Options
  - [ ] Add X-Frame-Options: DENY
  - [ ] Test headers with curl or online tools

---

## TIER 3: GOOD-TO-HAVE (OPTIMIZE POLISH) 🟡
Nice improvements but lower priority.

- [ ] **Implement Internal Linking Strategy** (1-2 hours)
  - [ ] Add contextual links: Homepage → Products, ID
  - [ ] Products → ID (show how they connect)
  - [ ] Contact → all main pages
  - [ ] Create "Related" sections

- [ ] **Create 404 Error Page** (30 min)
  - [ ] Create `app/not-found.tsx`
  - [ ] Add links to popular pages
  - [ ] Include search functionality if possible
  - [ ] Proper 404 HTTP status

- [ ] **Add Breadcrumb Schema to All Pages** (1 hour)
  - [ ] Homepage: none (root)
  - [ ] /products, /id, /contact, /privacy: 1 level deep
  - [ ] Verify renders in rich snippet preview

- [ ] **Monitor Core Web Vitals** (1 hour setup)
  - [ ] Install `web-vitals` npm package
  - [ ] Add to pages for real monitoring
  - [ ] Connect to Google Analytics
  - [ ] Set up alerts for regressions

- [ ] **Set Up Google Search Console** (15 min)
  - [ ] Verify with Google code: `tingnect-build-for-billions-google-verification`
  - [ ] Submit sitemap.xml
  - [ ] Request indexing of key pages
  - [ ] Monitor clicks, impressions, CTR

- [ ] **Set Up Bing Webmaster Tools** (15 min)
  - [ ] Verify with Bing code: `tingnect-bing-verification` 
  - [ ] Submit sitemap
  - [ ] Monitor crawl health

---

## ONGOING MAINTENANCE 📅

### Weekly Tasks
- [ ] Check Google Search Console for new crawl errors
- [ ] Monitor Core Web Vitals dashboard

### Monthly Tasks
- [ ] Review top performing pages in GSC
- [ ] Check for broken links (use Screaming Frog)
- [ ] Verify all images have proper alt text
- [ ] Test mobile responsiveness
- [ ] Review competitor SEO changes

### Quarterly Tasks
- [ ] Full site crawl audit (Screaming Frog)
- [ ] Backlink analysis (Ahrefs/SEMrush if budget available)
- [ ] Content gap analysis
- [ ] Performance optimization review

---

## 📊 Success Metrics to Track

After implementing fixes, monitor these:

| Metric | Target | Tool |
|--------|--------|------|
| **Organic Traffic** | +20-30% in 3 months | Google Analytics |
| **Keyword Rankings** | Page 1 for "TingNect" | Search Console / SEMrush |
| **Core Web Vitals** | LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1 | PageSpeed Insights |
| **Indexed Pages** | All 5 main pages | Search Console |
| **Click-Through Rate** | +10-15% | Search Console |
| **Mobile Usability** | 0 errors | Search Console |

---

## 🎯 Timeline Estimate

- **Week 1**: Complete Tier 1 (H1, Alt Text, Broken Links)
- **Week 2**: Complete Tier 2 (Schemas, Security, Images)
- **Week 3-4**: Complete Tier 3 and observe ranking improvements
- **Ongoing**: Monthly maintenance + monitoring

**Expected visibility improvement**: +30-50% organic traffic within 4-8 weeks.

---

## 📝 Notes & References

- **SEO Setup Doc**: See `SEO_SETUP.md` (already good foundation)
- **Audit Report**: See `SEO_AUDIT_REPORT.md` (full detailed analysis)
- **Next.js SEO**: https://nextjs.org/learn/seo/introduction-to-seo
- **Schema.org**: https://schema.org for structured data examples
