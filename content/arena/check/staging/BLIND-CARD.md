# Blind check card (Arena)
Repo: /home/claude/moneymoments-media/content/arena. Your courses: given in your prompt.
For each course <name>: read ONLY check/<name>.questions.csv (qid,chapter,question,A,B,C,D).
NEVER open bank/ or research/, never search the repo for answers.
1. Answer every question as a strict teacher. Any arithmetic in Python.
2. Write check/<name>.answers.csv with Python's csv module: qid,answer,confidence,note
   (answer A-D; confidence high/medium/low; note only when something is off: two right,
   none right, ambiguous, missing figure).
3. Run: python3 tools/blind.py compare <name>
   For each disagreement, re-read the question alone and decide who is right (one line).
4. Don't edit other files, don't run git.
Reply in 3 lines per course: answered, disagreements, and per disagreement: qid, key vs yours, verdict.
