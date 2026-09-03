# Novanest ATLAS — developer website

Static site served by GitHub Pages. It exists for three reasons:

1. It is the **developer website** required in the Google Play store listing of every app,
   which is what AdMob's crawler follows to find `app-ads.txt`.
2. It hosts the **privacy policy** for each app at a permanent public URL.
3. It is the landing page every forum post, social post and store listing can link to.

## Files

| File | Purpose |
|---|---|
| `index.html` | Root page — studio hub, links to all four apps. **This URL goes in the Play "Website" field for EVERY app.** |
| `app-ads.txt` | Authorized Sellers file. Must stay at the root. Covers every app under publisher ID `pub-3709043100488694`. |
| `robots.txt` | Explicitly allows the `Google-adstxt` crawler. |
| `maarifa.html` | Lammat Al-Ma'rifa app page. |
| `maarifa-privacy.html` | Lammat Al-Ma'rifa privacy policy. |
| `ecl.html` | ECL & ALCPT English Trainer app page. |
| `ecl-privacy.html` | ECL & ALCPT English Trainer privacy policy. |
| `civics.html` | US Citizenship Test Audio app page. |
| `civics-privacy.html` | US Citizenship Test Audio privacy policy. |
| `jobsite.html` | Job Site Calc app page. |
| `jobsite-privacy.html` | Job Site Calc privacy policy. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |

All images are embedded directly inside the HTML as base64 data URIs. There is no `img/`
folder and no external image files, so images cannot break through a wrong path.

## Apps and package names

| App | Package name | Page | Privacy policy |
|---|---|---|---|
| لَمَّةُ الْمَعْرِفَةِ (Lammat Al-Ma'rifa) | `com.novanest.maani` | `maarifa.html` | `maarifa-privacy.html` |
| ECL & ALCPT English Trainer | `com.novanest.ecltrainer` | `ecl.html` | `ecl-privacy.html` |
| US Citizenship Test Audio | `com.novanest.civicsaudio` | `civics.html` | `civics-privacy.html` |
| Job Site Calc | `com.novanest.jobsitecalc` | `jobsite.html` | `jobsite-privacy.html` |

## AdMob disclosures — where they appear and why

The `app-ads.txt` line and the AdMob disclosure are repeated on **every** page, not
just the root. That is deliberate:

- **`app-ads.txt` content on every app page.** The crawler only ever reads
  `https://USERNAME.github.io/app-ads.txt` at the domain root, so the copies are not
  for the crawler. They are for a demand partner, an auditor or a reviewer who lands
  on one app's page and needs to confirm the publisher ID without hunting for it.
  Each app page carries an **Authorized digital sellers** section.

- **AdMob disclosure in every privacy policy.** Google's publisher policy requires
  the advertising-ID disclosure per app, and Play's Data safety form is completed
  per app. A policy that mentions advertising only on the studio page satisfies
  neither. Each privacy policy now carries an **Advertising, the advertising ID, and
  your choices** section covering: what the Google Mobile Ads SDK collects and sends,
  who receives it, the resettable advertising ID, EEA/UK consent through Google's
  certified User Messaging Platform, how to withdraw consent, how to reset or delete
  the advertising ID, the authorized-sellers declaration, and children.

Keep the wording of those sections in step with what each app's Data safety form
declares. A policy that disagrees with the Data safety answers is a rejection.

## Setup

1. Repository must be named exactly `USERNAME.github.io` (a GitHub **user site**).
   A project repo serves from a subfolder, and `app-ads.txt` in a subfolder is invisible to AdMob.
2. Repository visibility: **Public**.
3. Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
4. Verify in a private window: `https://USERNAME.github.io/app-ads.txt` must return one line of plain text.

## Play Console

For **each** app: Grow users → Store presence → Store settings (or Main store listing) →
Store listing contact details → **Website** = `https://USERNAME.github.io/`

Privacy policy URLs:
- Lammat Al-Ma'rifa → `https://USERNAME.github.io/maarifa-privacy.html`
- ECL & ALCPT English Trainer → `https://USERNAME.github.io/ecl-privacy.html`
- US Citizenship Test Audio → `https://USERNAME.github.io/civics-privacy.html`
- Job Site Calc → `https://USERNAME.github.io/jobsite-privacy.html`

Each privacy policy URL must be entered in three places per app: App content → Privacy policy,
Main store listing, and App content → Data safety.

## Google Play store URLs

| App | Store URL |
|---|---|
| Lammat Al-Ma'rifa | not yet linked — button href is still `#` |
| ECL & ALCPT English Trainer | `https://play.google.com/store/apps/details?id=com.ecltrainer.english` |
| US Citizenship Test Audio | `https://play.google.com/store/apps/details?id=com.novanest.civicsaudio` |
| Job Site Calc | `https://play.google.com/store/apps/details?id=com.novanest.jobsitecalc` |

A store URL appears twice per app page: the **Get it on Google Play** button in the
header, and the **Links** section at the foot of the page. Change both together.

## Still to do

- `maarifa.html` — the Google Play download button href is still `#` (two places)
- `store/screenshots/` in the Job Site Calc project is still empty. The five shots
  on `jobsite.html` came from a phone; Play needs its own set at the required sizes.
