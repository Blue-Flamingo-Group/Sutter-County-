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
1. **FPPC disclosure** (`class="disclosure"`) — exact registered committee name
   and ID. Legally required. Only the committee can supply it.
2. **Ballot argument** (`#argument`) — currently the prototype's text with a
   visible "final text pending" note. Replace with the filed argument verbatim,
   then delete the `.pending` block.
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

## Type & color
- Display: Big Shoulders Display (700/800/900) — condensed civic poster face.
- Body: Public Sans (400–700).
- Navy `#0b1c2c` / `#10283c` / `#173d59`, cobalt `#1450cc`, campaign gold
  `#f3b539`, cream `#faf5ea`.
