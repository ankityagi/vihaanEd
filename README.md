# Vihaan's Quest

A Grade 1 practice site for Vihaan, on the same idea as Viraj's Math Quest (ankityagi/VirajEd).
Eight quests on the home screen, each with **10 levels** of 10 fresh random questions:

- Letters & Reading: Big & Small Letters, Reading Quest (first and last sounds, rhymes, reading
  short a/i/o/u/e words, sight words, middle sounds and short sentences; the voice never reads the
  word he is meant to read)
- Grade 2: Story Time (blends, sh/ch/th/wh, magic e, vowel teams, Grade 2 sight words, compound
  words, short stories with who/what/where, story order, longer sentences), Adding to 100 (2-digit
  adding and taking away with carrying and borrowing, missing numbers, two-step story problems,
  adding three or four numbers), Hundreds, Money & Time (place value and comparing to 1,000,
  skip counting, coins drawn with their values, quarters and dollars, time to 5 minutes, elapsed
  time, even and odd, money stories)
- Math: Adding & Taking Away, Numbers & Tens, Shapes, Time & Measuring

Write d and m (finger tracing) is off the home screen now; its stars still count and it still
shows in the reports.

Same rules as Viraj's site: **8 of 10** right unlocks the next level; 10/10 with no hints is
3 stars, 9 is 2 stars, 8 is 1 star; +10 XP per right answer (+5 with a hint). Questions are
read out loud with the device's voice (Parent → Settings picks the voice and speed; the most
natural English voice is used by default), and answers use an on-screen number pad.

- **Hard mode:** every Grade 1 level he has passed (or tested out of) gets a ⚡ Hard button on the
  quest page, and the result screen offers "Try Hard ⚡": bigger numbers, look-alike choices and
  typed answers instead of picking. Reading Quest's Hard set uses blends, digraphs, longer words,
  trickier rhymes and short stories. Hard stars are kept apart from the normal stars.
- **Daily warm-up:** once a day, before his first level, 6 quick questions from his weakest levels
  (under 80% over his last answers, at least 5 answers). Parent → Settings turns it off and lists
  the levels it is using.
- **Test out:** a quest he hasn't started offers a short quiz (2 questions per level, stopping at the
  first miss). Every level he gets through is marked done, so he starts where he is.
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

- **Progress dashboard** (`vihaan.ankityagi.online/admin.html`, also linked from Parent → Report),
  the same as Viraj's: practice time and accuracy per day, the quest map with stars, Hard mode and
  test-outs, speed vs accuracy by question type, what to work on next, mistake patterns (off by
  one, small slips, look-alikes, mixed-up pairs), tries per level and every session question by
  question. It asks for the parent PIN set on that device and only reads the log.

- **Coins for play time:** a Grade 1 level pays 1 coin once he passes it; Hard levels and Grade 2
  levels pay 1 coin per star (up to 3), best result counting once. Stars won before `COIN_EPOCH`
  (in index.html) keep the coins they earned under the old 1 star = 1 coin rule. By default
  10 coins buy 5 minutes; Parent → Settings can set 1, 5, 10 or 20 coins for 5 minutes (saved as
  `v: 2` rate records; older `v: 1` records are ignored). On the
  coins page (the 🪙 button, or `vihaan.ankityagi.online/#coins`) he trades coins for a 6-character
  code, read out loud, that BrainPlay (games.ankityagi.online) takes for that much play time. A code
  works once, on the day it was made. `playcode.js` is the same file as on Viraj's site; the code
  format is described at its top. Each spend and rate change is saved as a file under
  `players/p2/spends/` and `players/p2/settings/coins/` in the progress log, so the balance
  follows him to other devices.

## Run it

Everything is in `index.html` (plus `playcode.js`), and the dashboard is `admin.html`, with no build step.
`admin.html` carries a copy of the quest and level names; rebuild that list when levels change. Open it in a browser or run
`python3 -m http.server 8000`.

## Hosting: vihaan.ankityagi.online

Published with GitHub Pages from the `main` branch (Settings → Pages → *Deploy from a branch*),
the same way as viraj.ankityagi.online, so every push to `main` goes live.
DNS (Squarespace, for ankityagi.online) is a `CNAME` record, host `vihaan`, value
`ankityagi.github.io`. `.github/workflows/deploy.yml` is a spare manual deploy and does not run on push.
