# Images — Precision Plumbing Demo

All **content** images (hero, portfolio, blog, process) are **AI-generated** plumbing scenes created for this demo. Testimonial avatars are stock portrait photos (not plumbers).

## Files

| File | Subject |
|------|---------|
| `hero.jpg` / `hero-mobile.jpg` | Plumber repairing kitchen sink pipes |
| `work-1.jpg` | Copper/PVC pipe repair |
| `work-2.jpg` | Water heater installation |
| `work-3.jpg` | Drain cleaning at kitchen sink |
| `work-4.jpg` | Bathroom faucet install |
| `work-5.jpg` | Kitchen sink plumbing |
| `work-6.jpg` | Emergency leak repair |
| `blog-1.jpg` | Water heater (article thumbnail) |
| `blog-2.jpg` | Frozen outdoor pipes |
| `blog-3.jpg` | Burst pipe emergency |
| `process-visual.jpg` | Plumber consulting homeowners (1200×675, 16:9) |
| `avatar-1.jpg` … `avatar-3.jpg` | Customer portrait placeholders |
| `favicon.png` | Brand mark |

Source PNGs are kept in the Cursor assets folder (`hero-plumber.png`, etc.) if you need to regenerate JPGs with `sips`.

## Regenerate JPG from PNG

```bash
sips -s format jpeg -s formatOptions 82 -z 600 800 assets/work-pipes.png --out images/work-1.jpg
```

After replacing images, bump `?v=` query strings in `index.html` so browsers reload.
