# Brief for Arena research helpers

You are filling Arena's question sheets for one course. Arena is a free practice game for
Indian students (OpenSource Everything). Read `content/arena/README.md` first: it defines
the files, columns, difficulty bands and ratings. Work only in your own three files:
`content/arena/syllabus/<name>.csv`, `content/arena/research/<name>.csv`,
`content/arena/bank/<name>.csv`. Don't touch anything else, and don't run git.

## Step 1: the chapter list (syllabus)
- Use the **current NCERT edition** for the 2026-27 session. NCERT has been replacing
  books under NCF 2023 (for example Joyful Mathematics, Maths Mela, Ganita Prakash,
  Our Wondrous World, Curiosity, Mridang, Santoor, Poorvi). Classes 9 to 12 use the
  rationalised books unless a new book has replaced them; check.
- ncert.nic.in does not load from this machine. Confirm the chapter list from at least two
  of: PW (pw.live), Byju's, Vedantu, LearnCBSE, Careers360, Tiwari Academy, CBSE
  (cbseacademic.nic.in). Put the URL you used in `source_url` and the book and edition in
  `book` and `edition`. If sources disagree, prefer the newest dated page and say so in
  `edition`.
- One row per chapter in book order; `topics` = 2 to 6 key topics, separated by `; `.

## Step 2: research real questions (reference only)
- Search the web for real questions on each chapter: NCERT exercises and Exemplar
  (through the mirrors above), CBSE sample papers and question banks, PW, Byju's,
  Vedantu, LearnCBSE, Embibe; for CAT: past CAT papers, Career Launcher, IMS, TIME,
  Cracku, 2IIM; for money: SEBI investor awareness, RBI, NCFE, NISM, AMFI; for digital:
  CERT-In, MeitY, CBSE IT/AI curriculum. Credible sources only.
- For each chapter aim for at least 3 questions per band (9+ per chapter) from at least 2
  different sources, spread over the chapter's topics.
- `gist` is **your own summary** of what the question asks (20 words at most). Never paste
  the question's text. Rate `fit`, `quality`, `relevance`, `est_seconds` honestly, as a
  strict teacher would; not everything is a 5.
- `ref_id`: `r-<file name without .csv>-<chapter_no>-<n>`, e.g. `r-school-07-maths-3-4`.

## Step 3: write the bank (what students see)
- For each chapter and each band write **8 original multiple-choice questions** (the
  checker serves the top 6). If the course has so many chapters that you can't finish,
  write 6 per band for every chapter rather than leaving chapters out.
- Model each on the best-rated research rows of that chapter and band (`modelled_on`):
  same skill, same level, same common mistake, but **new numbers, names, context and
  wording**. It must not be a light rewording of a source question.
- Text only: no question may need a picture, figure, graph or table that isn't written out
  in the question. Keep each question self-contained (CAT sets and passages: include the
  data or the passage in every question that uses it).
- Indian context where it fits (₹, Indian names, places). Reading level of the class:
  for classes 1 and 2 very short sentences a parent can read aloud.
- Spread `hardness` 1 to 10 inside each band. Balance the right answer across A, B, C, D.
  Wrong options come from real mistakes. Avoid "all of the above" and "none of the
  above". `why` is one or two short sentences that teach.
- **Correctness comes first.** Work out every answer; do the arithmetic in Python. Then go
  back over every question as if you'd never seen it, answer it from the question and
  options alone, and fix any where you disagree with your key or where two options could
  be right.
- `qid`: `<file name without .csv>-<chapter_no>-<e|m|h><n>`, e.g. `school-07-maths-3-m5`.

## Writing the files
Write the CSVs with Python's `csv` module (never by hand-joining strings). After each
write run `python3 content/arena/tools/check.py content/arena/<folder>/<name>.csv` and fix
every FAIL. The checker fills `score` and `selected` itself.

## When you finish
Reply in under 200 words: your files, rows per band in the bank, chapters covered,
sources used, how many answers you corrected in the re-check, and anything you skipped
and why. If something blocks you, start your reply with `ESCALATE:`.
