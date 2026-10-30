# Arena question research and bank

Two kinds of sheet per course, both CSV (UTF-8, comma separated, quoted where needed):

1. **`research/`**: real questions found online from credible sources, rated. These are
   reference only. Arena never shows them. Each row keeps a short **gist** written in
   our own words (20 words at most), the source and its URL, never the original text.
2. **`bank/`**: the questions Arena actually serves. Every one is **original**, written
   to match the best-rated research questions for that chapter, topic and difficulty
   (same skill, same level, same trap), with new numbers, names and wording.

`syllabus/` holds the chapter list per course, in NCERT order (current edition).

File names: `<track>-<cc>-<subject>.csv`, the same name in all three folders.
- track: `school`, `cat`, `money`, `digital`
- cc: the class, two digits (`01` to `12`); `00` for tracks without classes
- subject: `maths`, `evs`, `science`, `english`, `physics`, `chemistry`, `biology`,
  `qa`, `dilr`, `varc`, `money`, `digital`

Examples: `school-07-maths.csv`, `school-11-physics.csv`, `cat-00-qa.csv`, `money-00-money.csv`.

## Difficulty bands

| Band | What it means | Typical time |
|---|---|---|
| `easy` | Recall or one step with one idea from the chapter. NCERT in-text example level. | 15 to 45 s |
| `medium` | Two or three steps, or two ideas together. NCERT exercise / unit-test level. | 45 to 90 s |
| `hard` | Many steps, applying the idea in a new setting, a common trap. NCERT Exemplar, HOTS, competency-based board questions; for CAT, real CAT-hard. | 90 to 180 s |

`hardness` (1 to 10) is how hard a question is **inside its band**: an easy question with
hardness 9 is a tough easy question. The app shows it to players ("Easy · 7/10 · about 40 s").

## Ratings (both sheets)

- `fit` (research only, 1 to 10): how exactly on par the question is with its band.
  10 = a textbook example of that band; 5 = borderline; below 4 = probably the wrong band.
- `quality` (1 to 5): clear wording, exactly one right answer, wrong options that come
  from real mistakes, worth a student's time.
- `relevance` (1 to 5): how central it is to the chapter and how likely in tests and exams.
- `est_seconds`: time a prepared student needs.
- `score` (0 to 100) is computed by the tools, never typed:
  research = fit 40% + quality 30% + relevance 30%; bank = hardness-fit is implied, so
  quality 50% + relevance 50%.
- `selected` is computed by the tools: research keeps the **top 5** per chapter + topic +
  band; the bank serves the **top 6** per chapter + band (the rest stay as reserves).

## Columns

`syllabus/`: `chapter_no, chapter, topics, book, edition, source_url`
(topics separated by `; `)

`research/`: `ref_id, chapter_no, chapter, topic, difficulty, source_id, source_url, gist,
qtype, skill, est_seconds, fit, quality, relevance`

`bank/`: `qid, chapter_no, chapter, topic, difficulty, hardness, est_seconds, quality,
relevance, question, a, b, c, d, answer, why, modelled_on`
- `answer` is `A`, `B`, `C` or `D`; the four options are all different.
- `why` explains the answer in one or two short sentences, the way a good teacher would.
- `modelled_on` lists the research `ref_id`s it was based on, separated by `; `.
- Only multiple choice with 4 options (assertion-reason, match-the-following and
  case-based questions are fine as long as they fit 4 options).

`source_id` values: `NCERT`, `NCERT-EXEMPLAR`, `CBSE`, `PW`, `BYJUS`, `VEDANTU`,
`LEARNCBSE`, `TIWARI`, `EMBIBE`, `CAREERS360`, `CL` (Career Launcher), `IMS`, `TIME`,
`CRACKU`, `2IIM`, `IIM-CAT` (official papers), `SEBI`, `RBI`, `NCFE`, `NISM`, `CERTIN`,
`MEITY`, `OTHER` (only with a reputable URL).

## Tools

- `python3 content/arena/tools/check.py <file or folder>` checks columns and values, fills
  `score` and `selected`, and prints a summary. Run it after every write.
- `node web/scripts/build-arena.mjs` turns the bank into the app's data and writes the
  per-class research sheets (`sheets/class-01.csv` …) and `sheets/sources.csv`.
