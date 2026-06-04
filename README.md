# Precision Plumbing — Demo Site (flw-2-0)

Single-page demo website for a WNC plumber. **Only navigation links are functional**; forms, CTAs, and content links are visual placeholders.

## Stack

- Static HTML, CSS, vanilla JS
- No build step, no npm
- Deploy target: Cloudflare Pages (`precision-plumbing`)

## Local preview

```bash
cd "/Users/evan/Developer/Plumbing Design"
npx serve .
```

Open `http://localhost:3000` (or the port shown).

## Demo behavior

| Works | Demo-only |
|-------|-----------|
| Nav + footer anchors | Read More, See All Projects |
| Mobile drawer | Social icons |
| Hero CTAs → `#contact` | Form submit (shows inline message) |
| Scroll animations & counters | `tel:` / `mailto:` |

## Deploy

**Live:** https://precision-plumbing-dry.pages.dev

```bash
npx wrangler pages deploy . --project-name precision-plumbing --branch main
```

Optional rsync staging:

```bash
rsync -av --exclude='.git' ./ /tmp/flw-2-0-deploy/
```

## Production upgrade checklist

- [ ] Replace stock images in `images/`
- [ ] Connect Formspree on contact form
- [ ] Add `tel:` and `mailto:` links
- [ ] Add secondary pages (`Articles.html`, etc.) if needed
- [ ] Add `sw.js`, `feed.xml`, `sitemap-articles.xml`, `_redirects`
- [ ] Remove demo ribbon from `index.html`

## Git remote (optional)

```bash
git remote add cloudflare git@github.com:EvangelosLandaw/flw-2-0.git
```
