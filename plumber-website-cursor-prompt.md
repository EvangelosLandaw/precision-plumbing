# Cursor Composer Prompt — Professional Plumber Website
## Project: flw-2-0 | Cloudflare Pages + GitLab Backup

---

## ROLE & GOAL

You are a senior front-end developer and UI designer. Build a **complete, production-ready, one-page scrolling business website** for a professional plumber. The site must be visually striking, fully functional, and deployable to Cloudflare Pages with zero build steps.

---

## AESTHETIC DIRECTION

**Theme:** Industrial Authority — dark steel tones, copper/amber accents, raw but polished. Think: a seasoned master plumber who has been in business 25 years. Trustworthy, strong, no-nonsense but professional.

**Palette (CSS variables):**
```css
--color-bg:        #0d0f12;   /* near-black */
--color-surface:   #161a20;   /* dark panel */
--color-border:    #2a2f38;   /* steel edge */
--color-accent:    #c97b2a;   /* hot copper */
--color-accent-2:  #4a90a4;   /* cold water blue */
--color-text:      #e8e6e1;   /* warm white */
--color-muted:     #7a8494;   /* gray */
```

**Fonts (Google Fonts — already in `<head>`):**
- **Oswald** — section headings, nav brand
- **Barlow Condensed** — subheadings, labels, badges
- **Barlow** — body copy, paragraphs
- **Share Tech Mono** — stat counters, phone numbers, call-to-action codes

**Motion:** Scroll-triggered reveal animations (fade-up, slide-in). Counter animations on the stats section. Nav shrinks on scroll. Mobile drawer slides in from right. No layout shifts.

---

## FILE & FOLDER STRUCTURE

Create exactly this structure. No build tools, no npm, no framework:

```
/
├── index.html
├── Articles.html
├── Portfolio.html
├── Blog.html
├── articles/
│   └── article-sample.html        ← one sample article
├── styles.css
├── footer-mobile.css
├── main.js
├── sw.js
├── feed.xml
├── sitemap-articles.xml
├── _redirects
├── images/
│   └── (placeholders noted in comments)
└── README.md
```

**Rule:** No build step at project root. Pure static HTML + CSS + JS only.

---

## PAGE SECTIONS (index.html — one scrolling page)

Build all sections in this order, each with an `id` for anchor navigation:

### 1. `#hero`
- Full-viewport hero. Background: dark overlay on a placeholder `<picture>` (AVIF → JPG fallback, `images/hero.avif` / `images/hero.jpg`).
- Headline: **"When It Leaks, We Fix It. Fast."**
- Sub: **"Licensed & Insured | 24/7 Emergency Service | Serving [City] Since 1998"**
- Two CTAs: `[Call Now: (828) 555-0100]` (Share Tech Mono font, copper button) and `[Get a Free Quote]` (ghost button, blue accent).
- Trust badges row beneath CTAs: icons + labels for "Licensed", "Insured", "5-Star Rated", "Same-Day Service".
- Diagonal clip-path or angled bottom edge to bleed into next section.

### 2. `#services`
- Section title: **"What We Fix"**
- 6-card grid. Each card: icon (inline SVG pipe/wrench/drop motifs), service name, one-line description, subtle copper hover border.
- Services: Drain Cleaning, Water Heater Install, Leak Detection, Pipe Repair, Bathroom Remodels, Emergency Callouts.
- Cards animate in staggered on scroll (0.1s delay per card).

### 3. `#why-us`
- Two-column layout: left = large copper numeral stats block, right = copy + checklist.
- Stats (animated counters via `main.js`): **25+ Years**, **4,800+ Jobs**, **4.9 Stars**, **24/7 Response**.
- Checklist items use copper checkmark SVGs: "No hidden fees", "Upfront pricing", "Clean job sites guaranteed", "Background-checked technicians".

### 4. `#portfolio`
- Section title: **"Recent Work"**
- 3-column masonry-style grid of placeholder images (`images/work-1.jpg` etc., all with `loading="lazy"` and AVIF `<picture>` sources).
- Each image has a hover overlay with project title and a subtle copper line animation.
- "See All Projects →" link pointing to `Portfolio.html`.

### 5. `#testimonials`
- Dark background panel (--color-surface).
- 3 testimonial cards in a horizontal row (stacks on mobile). Each: star rating (5 copper stars), quote text, customer name + neighborhood.
- Subtle quote-mark watermark behind each card (Share Tech Mono, oversized, low opacity).

### 6. `#blog-preview`
- Section title: **"From the Blog"**
- 3 article preview cards: thumbnail (`<picture>` AVIF/JPG), category badge, title, 2-line excerpt, "Read More →" link to individual article.
- "View All Articles →" links to `Articles.html`.

### 7. `#contact`
- Two-column: left = contact form, right = contact details + map placeholder.
- Form fields: Name, Phone, Email, Service Needed (dropdown), Message, Submit.
- No form backend — use `action="https://formspree.io/f/YOUR_ID"` with a comment to replace.
- Contact details: phone (Share Tech Mono), email, service area, hours.
- Map: `<div class="map-placeholder">` styled with copper border and a text note to embed Google Maps iframe.

### 8. `#footer`
- Dark footer with logo/brand, nav links, social icons (placeholder SVGs), copyright.
- Separate `footer-mobile.css` handles stacked mobile layout.

---

## NAVIGATION

- Fixed top nav that shrinks (padding/font-size reduce) after 80px scroll — handled in `main.js`.
- Logo left: **"Precision Plumbing"** in Oswald.
- Nav links right: Services | Work | About | Blog | Contact.
- Mobile: hamburger icon (☰) triggers a right-side drawer overlay. Drawer closes on link click or backdrop click.
- Nav background: transparent on hero, transitions to `--color-surface` with `box-shadow` on scroll.

---

## styles.css

Write all styles here. Requirements:
- Full CSS custom properties block at top (`:root { … }`).
- Reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`.
- Fluid typography using `clamp()` for h1–h4.
- Grid and Flexbox layouts — no CSS frameworks.
- `.reveal` class: `opacity: 0; transform: translateY(32px); transition: opacity 0.6s ease, transform 0.6s ease;` — toggled to `.reveal.visible` by `main.js`.
- Mobile-first media queries. Key breakpoints: 480px, 768px, 1024px, 1280px.
- Smooth scroll: `html { scroll-behavior: smooth; }`.
- Print media query at bottom that hides nav, footer, and contact form.

---

## footer-mobile.css

Separate file, linked after `styles.css`. Contains only footer-specific mobile overrides for screens below 768px: stacked columns, centered text, full-width social row.

---

## main.js

Vanilla JS only. Implement:

```javascript
// 1. NAV SCROLL BEHAVIOR
// Add .scrolled class to <nav> after 80px; remove on scroll back up.

// 2. MOBILE DRAWER
// Toggle .open on #mobile-drawer and .active on hamburger on click.
// Close on backdrop click or nav link click.
// Lock body scroll when drawer is open.

// 3. SCROLL REVEAL
// IntersectionObserver on all .reveal elements.
// Add .visible when 15% of element is in viewport.
// Unobserve after triggering (one-shot).

// 4. COUNTER ANIMATION
// Observe #why-us stats. When in view, animate from 0 to target value over 1800ms.
// Use requestAnimationFrame with easeOutQuart easing.
// Targets are stored in data-target attributes on each counter element.

// 5. ACTIVE NAV LINK
// Highlight the nav link for the section currently most in view.
// Use IntersectionObserver with threshold 0.4.
```

No third-party libraries. No jQuery.

---

## sw.js — Service Worker

Implement a service worker with:
- **Cache name:** `plumber-v1`
- **Network-first** strategy for `.html`, `.css`, `.js` files.
- **Cache-first** strategy for images (`images/`), fonts (Google Fonts CDN).
- **Offline fallback:** serve `index.html` for navigation requests when offline.
- Register in `index.html` with: `if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');`

---

## SEO / SOCIAL (index.html `<head>`)

Include all of the following:

```html
<!-- Primary Meta -->
<meta name="description" content="…">
<meta name="keywords" content="plumber, drain cleaning, water heater, [City], emergency plumbing">
<link rel="canonical" href="https://precisionplumbing.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Precision Plumbing | Licensed Plumber in [City]">
<meta property="og:description" content="…">
<meta property="og:image" content="https://precisionplumbing.com/images/og-image.jpg">
<meta property="og:url" content="https://precisionplumbing.com/">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="…">
<meta name="twitter:description" content="…">
<meta name="twitter:image" content="…">

<!-- JSON-LD: LocalBusiness -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Precision Plumbing",
  "telephone": "+18285550100",
  "address": { "@type": "PostalAddress", "addressLocality": "[City]", "addressRegion": "NC" },
  "url": "https://precisionplumbing.com",
  "openingHours": "Mo-Su 00:00-24:00",
  "priceRange": "$$",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "312" }
}
</script>
```

---

## feed.xml

RSS 2.0 feed with 3 sample `<item>` entries matching the blog preview cards. Include `<title>`, `<link>`, `<description>`, `<pubDate>`, `<guid>`.

---

## sitemap-articles.xml

Standard XML sitemap listing: `index.html`, `Articles.html`, `Portfolio.html`, `Blog.html`, `articles/article-sample.html`. Use `<lastmod>` with today's date. `<changefreq>weekly</changefreq>`.

---

## _redirects (Cloudflare Pages)

```
/blog       /Blog.html          301
/articles   /Articles.html      301
/portfolio  /Portfolio.html     301
/work       /Portfolio.html     301
/*          /index.html         200
```

---

## Articles.html, Portfolio.html, Blog.html

Each is a standalone page sharing the same nav and footer from `index.html`. Include:
- Same `<head>` meta setup (update title/description per page).
- Linked to `styles.css`, `footer-mobile.css`, `main.js`.
- A simple page hero (half-height, section title, breadcrumb).
- A content grid placeholder (3-column cards layout, same style as homepage).
- "← Back to Home" link.

---

## articles/article-sample.html

Single article page:
- Breadcrumb: Home > Articles > Article Title.
- Article hero image (`<picture>` AVIF/JPG).
- Full article layout: headline (Oswald), meta (date, author, category badge), body in Barlow, estimated read time.
- Sample content: ~400 words about "5 Signs Your Water Heater Needs Replacing."
- Related articles sidebar (3 card links).
- Same nav and footer.

---

## images/ Directory

Create an `images/` folder with a `README.md` inside listing every expected image:

```
hero.avif / hero.jpg          — Hero background (1920×1080)
hero-mobile.avif / .jpg       — Mobile hero (768×1024)
work-1.jpg … work-6.jpg       — Portfolio thumbnails (800×600)
blog-1.jpg … blog-3.jpg       — Blog card thumbnails (600×400)
article-sample.jpg            — Sample article hero (1200×630)
og-image.jpg                  — Open Graph share image (1200×630)
favicon.png                   — 512×512 brand favicon
```

Use `<picture>` with AVIF source + JPG fallback everywhere. Use `loading="lazy"` on all non-hero images. Include `width` and `height` attributes on every `<img>` to prevent layout shift.

---

## README.md

Include a project README with:
- Project name, stack summary.
- How to deploy: `npx wrangler pages deploy . --project-name flw-2-0`
- rsync pre-deploy command: `rsync -av --exclude='fullyloadedwebsites/' --exclude='.git' ./ /tmp/flw-2-0-deploy/`
- Git remote setup: `git remote add cloudflare git@github.com:EvangelosLandaw/flw-2-0.git`
- How to update the service worker cache version for a new release.
- How to add a new article (copy `article-sample.html`, update `sitemap-articles.xml` and `feed.xml`).

---

## QUALITY CHECKLIST

Before finishing, verify:
- [ ] All internal links work (no broken hrefs).
- [ ] Mobile nav drawer opens and closes correctly.
- [ ] Counters only animate once (not on every scroll).
- [ ] No `console.error` in JS by default.
- [ ] All images use `<picture>` with AVIF + JPG sources.
- [ ] JSON-LD validates (no trailing commas).
- [ ] `sw.js` is registered only once in `index.html`.
- [ ] `_redirects` is in the root (not a subfolder).
- [ ] Google Fonts `<link>` uses `rel="preconnect"` + `display=swap`.
- [ ] No inline styles except where unavoidable (e.g., counter `data-target` attributes).
- [ ] CSS file has no duplicate rule blocks.
- [ ] All form inputs have matching `<label>` elements (accessibility).

---

## STARTER CALL TO CURSOR

> "Build the complete `flw-2-0` plumber website exactly as specified in this prompt. Start with `index.html` and `styles.css`, then `main.js`, `sw.js`, the secondary pages, and finally `feed.xml`, `sitemap-articles.xml`, and `_redirects`. Create all files in a single pass. Do not ask clarifying questions — make reasonable placeholder decisions and leave clearly labeled `<!-- TODO: replace -->` comments where real content (phone number, city, Formspree ID, map embed, actual images) is needed."
