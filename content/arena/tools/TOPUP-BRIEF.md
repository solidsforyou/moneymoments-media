# Top-up brief (31 Oct 2026): bring a thin course up to full depth

Same rules as `HELPER-BRIEF.md` (read it and `content/arena/README.md` first). The course
already has a syllabus, some research and 2 bank questions per band per chapter, and all of
it passes `check.py`. Your job is to add, not to restart:

- **Syllabus:** keep it. Fix it only if a chapter is plainly wrong for the current edition.
- **Research:** keep every row. Add real questions until each chapter has **at least 3 per
  band** (9+ per chapter) from **at least 2 different sources**. Each new row is one real
  question you opened and read on that exact page (not an index page); rate each on its own.
  If a page won't load, use another credible source; never invent rows.
- **Bank:** keep every row (fix any you find wrong). Add original questions until each
  chapter has **8 per band** (the checker serves the top 6). If time runs short, 6 per band
  for every chapter beats 8 for some. Continue the qid numbering (`...-1-e3`, `-e4`, ...).
- Correctness first: do maths in Python, then answer every new question from the question
  and options alone and fix any disagreement or any question with two defensible answers.
- Text only, self-contained (CAT sets: put the full data or passage in each question).
- Write with Python's `csv` module in batches (one chapter or a few at a time) so a crash
  loses little; run `check.py` after each write and fix every FAIL.
- Work only in your course's three files. Don't run git, don't touch other files.

Reply in under 150 words: files, chapters, bank rows per band now, research rows now,
answers corrected in your re-check, anything skipped. Start with `ESCALATE:` if blocked.
