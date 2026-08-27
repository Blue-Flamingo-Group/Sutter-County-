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
10. **Header brand lockup** — the header now runs a **modified** lockup: the
    official check-box mark (the logo's own pixels, not a redraw) set beside
    re-typeset "YES ON MEASURE G / A SAFE SUTTER COUNTY" in Big Shoulders
    Display. The mark is untouched; the *arrangement* is ours, because the
    supplied logo is stacked and does not fit a 70px horizontal header.
    **Needs a client OK before launch.** The ideal fix is a designer-made
    horizontal lockup from the campaign's own designer — ask for one. Details
    in "Official logo" below.

## Official logo
Client-supplied lockup: `assets/img/logo-yes-on-g.png` (900px web version; master
in `_originals/`). Its own colors are royal blue `#0047AB` and yellow `#FFE45E` —
**the site palette was deliberately not changed to match**; the site's gold
`#f3b539` has better contrast on navy.

The logo is blue-on-transparent, so it only goes on light grounds. On the navy
header the blue wordmark measures **2.05:1** contrast (fails WCAG at any size).
On white it measures 8.44:1, which is why the full logo sits in the endorsement
form card and the share section.

### Header lockup (modified — needs client approval)
The header runs a horizontal lockup that does not exist in the supplied art:
- **Mark** — `assets/img/check-mark.png`. This is the logo's *own artwork*,
  cropped straight out of the master at `_originals/logo-yes-on-g.png`
  (pixels 505,307–772,570), tail and all, then Lanczos-resampled to 4x the
  header slot. Nothing is traced or redrawn. Reproduce with
  `_verify/round5/extract-mark.py`; fidelity proof against the master at
  identical scale is `_verify/round5/mark-fidelity.png` (0.23% mean channel
  difference after whole-pixel realignment — resampling only).
- **Type** — "YES ON MEASURE G" / "A SAFE SUTTER COUNTY" re-set in Big
  Shoulders Display, white and gold, for contrast on navy.
- **Geometry** — CSS `--ck` on `.ckwrap` sets the *yellow box* size (42px
  desktop / 38px at ≤640). The check's swash overhangs the box up and to the
  right, so the image is absolutely positioned out of flow; the nav stays 70px
  tall at every width. The overhang ratios in the CSS come from the measured
  sub-pixel box edges in the master and should not be hand-tweaked — re-run the
  extraction script instead.

Because the arrangement is ours, this is a **derivative** of a client brand
asset and needs committee sign-off before launch. Ask the campaign's designer
for a real horizontal lockup; drop it in and delete the `.brand-lockup` CSS.

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
