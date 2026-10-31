# VARC top-up card (CAT, Arena)
Repo: /home/claude/moneymoments-media/content/arena. Your chapters: given in your prompt.
Goal: each of your chapters gets 4 NEW original questions per band (easy, medium, hard) = 12 per chapter.
1. Read ONLY: the rows of bank/cat-00-varc.csv for your chapters (2 per band exist: copy their
   style and format) and research/cat-00-varc.csv rows for your chapters (use ref_ids in modelled_on).
2. Write new rows with Python's csv module to check/staging/varc-<your chapters>.csv, same header
   as the bank: qid,chapter_no,chapter,topic,difficulty,hardness,est_seconds,quality,relevance,
   question,a,b,c,d,answer,why,modelled_on
   - qid continues numbering: cat-00-varc-<ch>-e3..e6, -m3..m6, -h3..h6.
   - Original text only (no copied passages), self-contained, 4 distinct options, answer A-D.
   - Spread the answer letter (not all one letter). hardness 1-10, quality/relevance 1-5.
   - est_seconds: easy 30-60, medium 60-100, hard 100-180. why = 1-2 short sentences.
   - Para-jumbles: options are orders like "BDAC"; exactly one order works.
   - Odd one out / placement / summary: exactly one defensible answer; distractors from real mistakes.
3. Re-check: answer each of your questions from the question and options alone; fix any that
   allow two answers.
4. Don't edit any other file, don't run git, no web.
Reply in 3 lines: file, rows per chapter/band, anything fixed or skipped.
