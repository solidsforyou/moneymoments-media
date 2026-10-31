# Lite brief (launch coverage, 30 Oct 2026): the same rules as HELPER-BRIEF.md, smaller

Read `content/arena/README.md` and `content/arena/tools/HELPER-BRIEF.md`, then do it with
these limits so every class is covered quickly:
- Syllabus: as in the brief. If `syllabus/<name>.csv` already exists and passes the checker, keep it.
- Research: **1 real question per band per chapter** (3 per chapter), each one you opened on
  that exact page, rated on its own. If a research file exists, keep its rows and fill gaps.
- Bank: **2 original questions per band per chapter** (6 per chapter). If a bank file
  exists, keep its rows and only add what's missing.
- Correctness first: work every answer (calculations in Python), re-read each question once.
- Keep tool calls and page fetches few. Write with Python's csv module, run check.py, fix FAILs.
- Reply in under 120 words: files, chapters covered, rows, anything skipped.
