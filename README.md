# Vihaan's Quest

A Grade 1 practice site for Vihaan, on the same idea as Viraj's Math Quest (ankityagi/VirajEd).
Five quests, each with **10 levels** of 10 fresh random questions:

- Math: Adding & Taking Away, Numbers & Tens, Shapes, Time & Measuring
- Letters & Writing: Big & Small Letters, Write d and m (finger tracing)

Same rules as Viraj's site: **8 of 10** right unlocks the next level; 10/10 with no hints is
3 stars, 9 is 2 stars, 8 is 1 star; +10 XP per right answer (+5 with a hint). Questions are
read out loud with the device's voice, and answers use an on-screen number pad.

- **Login:** Vihaan taps 3 secret pictures. A parent can reset them.
- **Parent:** the link at the bottom asks for a parent PIN (chosen on first use; only a hash is
  kept). It opens the report and settings, and Parent mode on a level map opens every level until
  reload. This keeps a child out; it is not real security.
- **Progress** is saved in the browser on the device he plays on (localStorage). There is no
  GitHub progress sync yet, unlike Viraj's site.

## Run it

Everything is in `index.html`, with no build step. Open it in a browser or run
`python3 -m http.server 8000`.

## Hosting: vihaan.ankityagi.online

Published with GitHub Pages, the same way as viraj.ankityagi.online.
`.github/workflows/deploy.yml` uploads `index.html`, `CNAME` and `.nojekyll` on every push to `main`.
One-time setup:

1. **DNS** (Squarespace, for ankityagi.online): a `CNAME` record, host `vihaan`,
   value `ankityagi.github.io`, the same kind of record as `viraj` and `games`.
2. **GitHub → VihaanEd → Settings → Pages**: *Source* **GitHub Actions**, custom domain
   `vihaan.ankityagi.online`, then tick *Enforce HTTPS* once the certificate is issued.
