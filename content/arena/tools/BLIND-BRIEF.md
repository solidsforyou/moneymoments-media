# Blind answer check brief

You are an independent checker for Arena, a practice game for Indian students. For each
course you're given, read ONLY `content/arena/check/<name>.questions.csv` (columns qid,
chapter, question, A, B, C, D). **Never open anything in `content/arena/bank/` or
`content/arena/research/`**, and don't search the repo for answers: the point is that you
answer without seeing the key.

- Answer every question yourself as a strict teacher would. Do arithmetic in Python.
- Write `content/arena/check/<name>.answers.csv` with Python's csv module, columns
  `qid, answer, confidence, note`: answer = A/B/C/D; confidence = high/medium/low;
  note = one short line only when something is off (two options right, no option right,
  ambiguous wording, needs a missing figure). Write in batches so a crash loses little.
- Then run `python3 content/arena/tools/blind.py compare <name>` and for every disagreement
  look again at the question alone and say who you think is right and why (one line each).
- Don't edit any other file, don't run git.

Reply in under 200 words per course: rows answered, disagreements, and for each one:
qid, key vs yours, your verdict in a few words. List questions you flagged in `note`.
