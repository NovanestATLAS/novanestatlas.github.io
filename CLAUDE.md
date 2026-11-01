# CLAUDE.md – Novanest ATLAS (novanest-atlas.net)

Permanent rules for every session.

## What this is
- The developer site behind the Novanest ATLAS Android apps: a home page (`index.html`), one landing page per app
  and one privacy policy per app. Plain static HTML, no build step. GitHub Pages serves the `main` branch root
  (custom domain in `CNAME`, `.nojekyll`); a push to `main` is live within minutes.
- `assets/site.css` styles `index.html` and `maarifa.html`; the other pages carry their own `<style>`.
  App screenshots are inline `data:` images.

## Never break
- `app-ads.txt` is read by AdMob to verify the apps. Do not edit, move or reformat it. `robots.txt` must keep
  allowing `Google-adstxt`.
- The privacy policy URLs (`*-privacy.html`) and app page URLs are linked from Google Play listings. Never rename
  or remove them; edit the content in place.
- `BingSiteAuth.xml` (Bing verification) stays at the root.
- `quizzyroad/` is an old noindex preview copy of the CDL site; leave it alone.

## Truthfulness
- App facts (question counts, features, "free, ad-supported", languages) must match the current Play listing.
- No fake ratings or reviews in pages or structured data. The apps are not government apps; say so wherever a
  page names a government test or agency.

## SEO
- One `<h1>`, no skipped heading levels, title ≤ 60 characters, meta description ≤ 160, absolute self canonical
  (`https://novanest-atlas.net/<page>.html`).
- App pages: `MobileApplication` JSON-LD (operatingSystem ANDROID, free Offer, publisher, installUrl) and Open
  Graph tags. Home: `Organization`.
- Every public page is in `sitemap.xml`.

## Performance and accessibility
- Every `<img>` has `width`/`height` (CSS keeps `height:auto`) and meaningful alt text (empty alt only for
  decoration). WCAG AA contrast, visible focus.

## Done means
- Changed pages checked at 390 px and desktop, no broken links, and `sha256sum app-ads.txt` unchanged.
