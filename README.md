# Vihaan's Quest

A Grade 1 practice site for Vihaan, on the same idea as Viraj's Math Quest (ankityagi/VirajEd).
Five quests, each with **10 levels** of 10 fresh random questions:

- Math: Adding & Taking Away, Numbers & Tens, Shapes, Time & Measuring
- Letters & Writing: Big & Small Letters, Write d and m (finger tracing)

Same rules as Viraj's site: **8 of 10** right unlocks the next level; 10/10 with no hints is
3 stars, 9 is 2 stars, 8 is 1 star; +10 XP per right answer (+5 with a hint). Questions are
read out loud with the device's voice (Parent → Settings picks the voice and speed; the most
natural English voice is used by default), and answers use an on-screen number pad.

- **Login:** Vihaan taps 3 secret pictures. A parent can reset them.
- **Parent:** the link at the bottom asks for a parent PIN (chosen on first use; only a hash is
  kept). It opens the report and settings, and Parent mode on a level map opens every level until
  reload. This keeps a child out; it is not real security.
- **Progress log:** every level he finishes (or stops after answering) is saved as one small
  JSON file in the public repo `ankityagi/mathquest-progress`, the same log Viraj's site uses, under
  `players/p2/` (Viraj is `p1`). Files carry the code `p2`, never a name; names in story problems
  are swapped for "Kid" and "Brother" before saving. Files are only created, never edited, and
  anything not sent yet waits on the device and retries.
- **Saving needs a token, entered once on Vihaan's device**: Parent → Settings → *Save progress to
  GitHub*. Use a fine-grained token with access to `mathquest-progress` only and
  *Contents: Read and write* (Viraj's token works if it is scoped that way). It stays in that
  device's storage and is never in this code. The repo and branch can be changed there too.
- **Parent report** (Parent → Report, or open `vihaan.ankityagi.online/#parent`): levels played,
  % correct, typical time per question, what to work on next (question types under 75% or slow),
  strong and quick types, by area, tries per level and recent sessions. It reads the online log,
  so it works on any device, and adds anything on this device that hasn't uploaded yet. On a new
  device his stars and XP are brought back from the log when he logs in.

- **Coins for play time** (same as Viraj's site): stars earn coins, each level's best stars
  counting once, at a rate set in Parent → Settings (default 1 star = 1 coin = 5 minutes). On the
  coins page (the 🪙 button, or `vihaan.ankityagi.online/#coins`) he trades coins for a 6-character
  code, read out loud, that BrainPlay (games.ankityagi.online) takes for that much play time. A code
  works once, on the day it was made. `playcode.js` is the same file as on Viraj's site; the code
  format is described at its top. Each spend and rate change is saved as a file under
  `players/p2/spends/` and `players/p2/settings/coins/` in the progress log, so the balance
  follows him to other devices.

## Run it

Everything is in `index.html` (plus `playcode.js`), with no build step. Open it in a browser or run
`python3 -m http.server 8000`.

## Hosting: vihaan.ankityagi.online

Published with GitHub Pages from the `main` branch (Settings → Pages → *Deploy from a branch*),
the same way as viraj.ankityagi.online, so every push to `main` goes live.
DNS (Squarespace, for ankityagi.online) is a `CNAME` record, host `vihaan`, value
`ankityagi.github.io`. `.github/workflows/deploy.yml` is a spare manual deploy and does not run on push.
