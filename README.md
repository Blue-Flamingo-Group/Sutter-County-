# Yes on Measure G — Sutter County (Nov 3, 2026)

Single-page static campaign site. No build step. Open `index.html` or serve the
folder; that is the whole stack.

## Layout
- `index.html` — the entire site (inline CSS + one inline script).
- `assets/img/` — web-ready JPEGs. `_originals/` holds the untouched PNGs and is
  excluded from deploys.
- `_verify/` — Playwright screenshots (git-ignored).
- `deploy.sh` — Vercel production deploy.

## Launch status

**LIVE — 2026-08-31.** The site is public at **https://safesutteryesong.com**.

- **Domain / DNS — DONE 2026-08-31.** `safesutteryesong.com` at the registrar
  (GoDaddy nameservers `ns63/ns64.domaincontrol.com`): apex `A` →
  `76.76.21.21`, `www` `CNAME` → `cname.vercel-dns.com`. Both hostnames are
  attached to the Vercel project `measure-g` (scope `syronius-projects`).
  Let's Encrypt certs issued for both; `www` 308-redirects to the apex.
- **Go-live flip — DONE 2026-08-31.** The `robots` noindex meta is removed from
  `index.html` and the `X-Robots-Tag` header block is removed from
  `vercel.json`. `canonical`, `og:url`, `og:image` and `twitter:image` now point
  at `https://safesutteryesong.com`. **The site is indexable.**

Because the site is now public, every unresolved item below is **live-visible**
to voters and press.

**Still open (as of round 9, 2026-09-02):**
1. **Ballot argument** — the *argument in favor* is still prototype text.
2. **General photography rights** — the four scene photos in `assets/img/`
   (water tower ×2, fire badge, sheriff's office) are still uncleared
   third-party reference images under the duotone wash. The Sheriff Barnes
   portrait is *not* one of these — it is campaign-supplied and cleared.
3. **Client sign-off on the modified header lockup.**
4. **Endorsement form backend** — submissions currently go nowhere.

(Also still TBD but not blocking: the three footer social `href`s.)

**Closed in round 9 (2026-09-02):** the featured endorser portrait. The
campaign-supplied Sheriff Barnes photo is live in the `.portrait` slot in full
color (no duotone — it is owned art), master in `assets/img/_originals/`.
Evidence: `_verify/round9/`.

**Closed in round 8 (2026-09-01):** FPPC ID issued and in the disclosure;
donations now run through email, so no processor URL is needed; the campaign
contact address `Hello@safesutteryesong.com` is in the footer Connect column;
section eyebrows and the header lockup were both scaled up.
Evidence: `_verify/round8/`.

## Placeholders
Search `index.html` for these:
1. ~~**FPPC disclosure**~~ (`class="disclosure"`) — **DONE 2026-09-01.** The ID
   was issued. The disclosure now reads, in the client's own wording verbatim,
   "AD Paid for by Neighbors For A Safe Sutter County — Yes On Measure G ·
   2057 Pheasant Drive, Yuba City, CA 95993 / **ID# 1494598**". The street
   address was kept because it is part of the committee identification. Note the
   `.disclosure` rule sets `text-transform:uppercase`, so the line renders in
   caps regardless of the source casing — that predates this change.
2. **Ballot argument** (`#argument`) — the *argument in favor* is still the
   prototype's text with a visible "final text pending" note. Replace with the
   filed argument verbatim, then delete the `.pending` block. The second
   expandable, the **rebuttal**, is the real filed text and is final.
3. **Endorsement form** (`#endorseForm`) — no handler wired. See the BACKEND HOOK
   comment above the form and in the script.
4. ~~**Donate**~~ (`#donate`) — **DONE 2026-09-01.** There is no online
   processor; the committee takes contributions **by email at tom@pci.vote**.
   The section's primary button is a `mailto:` with the subject "Measure G
   donation", and the address is repeated below it as visible, selectable text
   for phones with no mail client configured. The suggested-contribution chips
   were kept (they tell the sender what amount to name) and the
   not-tax-deductible line was kept. Nav, hero and CTA "Donate" buttons still
   scroll to `#donate` — the context and the disclosure live there. If a
   compliant processor is ever added, see the DONATION FLOW comment.
5. **Social links** (footer `.socials`) — all `href="#"`, marked TBD.
6. ~~**Featured endorser photo**~~ (`.portrait`) — **DONE 2026-09-02.** The
   campaign-supplied Sheriff Barnes portrait ships as
   `assets/img/sheriff-barnes.jpg` (progressive JPEG, q85, 641×641 — the
   source's native size; it is not upscaled). Master PNG in
   `assets/img/_originals/sheriff-barnes.png`, which is deploy-excluded.
   It runs in **full color** — the `.duo` duotone is deliberately not applied,
   because that treatment exists to hide the resolution of the borrowed
   reference shots and this photo is owned. Framing: the slot is 300×300 at
   desktop (no crop at all — the source is square) and a 5:4 band when the card
   stacks at ≤900px, where `object-position:50% 0` top-anchors the image so the
   head is never clipped. A soft navy gradient on the photo's bottom edge ties
   it to the card. Sharpness: 641px covers a 300 CSS px desktop slot at exactly
   2×; on a 3× phone the slot wants ~1060 device px and gets 641, so the mobile
   render is ~1.8× — slightly soft under close inspection, not upscalable
   without inventing detail. A larger master from the campaign would fix it.
7. **Endorsement wall** (`.wall`) — **TEMPORARILY REMOVED at client request
   2026-08-31.** The eight role-based "your name here" tiles *and* the "100+
   Neighbors & counting" badge (`.counter`) are commented out in `index.html`;
   search for `RESTORE 2026-08-31`. The section still runs the featured
   Sheriff Barnes block plus the Add Your Name / Donate / Share row. To bring
   the wall back when real endorsers arrive, delete the four comment marker
   lines wrapping those two blocks — the CSS was left in place untouched, so
   uncommenting is the whole job. Then replace each `.slot` with a real
   endorser card (name, title/org, city).
8. **Photography** — the four *scene* images in `assets/img/` (water tower ×2,
   fire badge, sheriff's office) are low-resolution third-party reference photos
   under a duotone wash. **Rights are not cleared.** Replace with campaign-owned
   photography. The Sheriff Barnes portrait is excluded from this item: it is
   campaign-supplied, cleared, and runs in full color (see 6).
9. ~~**`<meta name="robots" content="noindex, nofollow">`**~~ — **DONE
   2026-08-31.** Meta removed from `index.html`; `X-Robots-Tag` header block
   removed from `vercel.json`. The site is indexable.
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
- **Geometry** — CSS `--ck` on `.ckwrap` sets the *yellow box* size (**52px
  desktop / 43px at ≤640**, enlarged 2026-09-01 at client request). The check's
  swash overhangs the box up and to the right, so the image is absolutely
  positioned out of flow. The nav bar is **84px tall on desktop and stays 70px
  at ≤640** so the sticky header does not eat the mobile viewport. The
  overhang ratios in the CSS come from the measured
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
- Section eyebrows (`.eyebrow`) run `clamp(17px,1.8vw,21px)` at `.15em` tracking
  (was a flat 14px at `.22em`) — enlarged 2026-09-01. The tracking came down
  with the size so the longest label, "The Case for Measure G", still clears
  320px. They stay well under the H2 (21px vs 60px on desktop).
- Display: Big Shoulders Display (700/800/900) — condensed civic poster face.
- Body: Public Sans (400–700).
- Navy `#0b1c2c` / `#10283c` / `#173d59`, cobalt `#1450cc`, campaign gold
  `#f3b539`, cream `#faf5ea`.

## Before making this repository public

`assets/img/_originals/` is tracked in git history. Review it before changing
this repo's visibility — removing the files in a later commit does **not**
remove them from history.

It holds the campaign logo masters and photography, plus the two reversed
knockout logo proposals that recolor a client brand asset. Those proposals were
never approved by the committee and were deliberately never deployed.

If this repo is ever made public, strip that folder from history first
(`git filter-repo --path assets/img/_originals --invert-paths`) rather than
deleting it in a new commit.

