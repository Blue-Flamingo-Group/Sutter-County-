# Yes on Measure G — Sutter County (Nov 3, 2026)

Single-page static campaign site. No build step. Open `index.html` or serve the
folder; that is the whole stack.

## Layout
- `index.html` — the entire site (inline CSS + one inline script).
- `assets/img/` — web-ready JPEGs. `_originals/` holds the untouched PNGs and is
  excluded from deploys.
- `_verify/` — Playwright screenshots (git-ignored).
- `deploy.sh` — Vercel production deploy.

## Placeholders that must be resolved before launch
Search `index.html` for these:
1. **FPPC disclosure** (`class="disclosure"`) — committee name and street address
   are in place. The **FPPC ID number has not been issued**; the line reads "FPPC
   ID number pending." Search the source for `insert FPPC ID here when issued`.
2. **Ballot argument** (`#argument`) — the *argument in favor* is still the
   prototype's text with a visible "final text pending" note. Replace with the
   filed argument verbatim, then delete the `.pending` block. The second
   expandable, the **rebuttal**, is the real filed text and is final.
3. **Endorsement form** (`#endorseForm`) — no handler wired. See the BACKEND HOOK
   comment above the form and in the script.
4. **Donate** (`#donate`) — button shows an "opening soon" state. See the
   DONATE HOOK comment; swap the `href` for the processor URL and delete `.soon`.
5. **Social links** (footer `.socials`) — all `href="#"`, marked TBD.
6. **Featured endorser photo** (`.portrait`) — placeholder block with swap
   instructions inline. Quote from Sheriff Barnes is in place.
7. **Endorsement wall** (`.wall`) — eight role-based "your name here" tiles,
   designed to grow past 100 entries.
8. **Photography** — the four images in `assets/img/` are low-resolution
   third-party reference photos under a duotone wash. **Rights are not cleared.**
   Replace with campaign-owned photography before the site goes public.
9. **`<meta name="robots" content="noindex, nofollow">`** — remove at launch
   (also drop the `X-Robots-Tag` header block in `vercel.json`).

## Official logo
Client-supplied lockup: `assets/img/logo-yes-on-g.png` (900px web version; master
in `_originals/`). Its own colors are royal blue `#0047AB` and yellow `#FFE45E` —
**the site palette was deliberately not changed to match**; the site's gold
`#f3b539` has better contrast on navy.

The logo is blue-on-transparent, so it only goes on light grounds. On the navy
header it measures **2.05:1** contrast (fails WCAG at any size), so the header
keeps the typographic "Yes on G" mark. On white it measures 8.44:1, which is why
it sits in the endorsement form card and the share section.

Reversed knockout variants for the navy header exist as **proposals only** —
`_originals/logo-knockout-proposal-a-flat.png` and `-b-kept-blue-in-yellow.png`.
They recolor a client brand asset, so they need committee approval and are **not
deployed** (`_originals/` is in `.vercelignore`). Side-by-side comparison:
`_verify/round3/PROPOSAL-header-knockout-logo-NOT-SHIPPED.png`.

Favicon/touch icons are the logo's ballot-box mark cropped; `og-card.png` is the
full logo centered on white at 1200x630.

## Type & color
- Display: Big Shoulders Display (700/800/900) — condensed civic poster face.
- Body: Public Sans (400–700).
- Navy `#0b1c2c` / `#10283c` / `#173d59`, cobalt `#1450cc`, campaign gold
  `#f3b539`, cream `#faf5ea`.
