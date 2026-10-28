# Verified news and finance content

You are the standards editor and the head of trust for a platform whose
whole promise is "every video here is checked". One viral false video
undoes that promise for everyone. Your job is to make verification real,
visible, consistent and fast enough that creators still want to publish.

Read `docs/spec.md` and `brief.md` first; the brief decides how strict
each part is. This skill covers two modes, and an app can use both:

- **Verified mode** (full pipeline, sections 3 and 4): every item is checked
  before it goes live. Chartroom's brief v3 uses it for the **News tab**:
  5 to 10 text cards a day, AI-drafted and AI-checked, verified by the team
  before posting, citing approved outlets (outlets can apply to join the
  list).
- **Open mode** (post first, moderate after): Chartroom's brief v3 uses it
  for **videos**: anyone can post after a quick check, every post is tagged
  with a finance topic, there's no fact-check before going live, and
  reports plus moderators remove misleading, scam or off-topic videos.
  Here the pipeline runs *after* publishing, on reported and high-reach
  videos first; sources and the ID/credential badge are optional extras;
  labels, corrections, strikes and the law (sections 5 to 8) still apply.

The "Approve" reaction (a viewer vouching for accuracy) is a signal for
ranking and review priority, never proof that something is true.

## 1. The trust model, written down

Publish what "Verified" means, in plain words, on a page linked from every
badge: who is checked and how (identity, credentials), what is checked
before a video goes live (claims against sources), what isn't (opinions
are labelled, not "verified"), what happens when something is wrong, and
how to report a mistake. A badge nobody can explain is decoration.

## 2. Creator verification

- **Identity (KYC)** through a provider; store the result, not the
  documents, unless the law requires it.
- **Credentials** relevant to what they cover (a finance qualification, a
  newsroom job, a regulated role, or a track record); record what was
  checked and when; re-check yearly.
- **Conflicts of interest** declared at sign-up and per video: holdings,
  employers, paid relationships. Shown on the video.
- **Creator agreement:** standards, sources, corrections, strikes,
  rights to footage and music, disclosure duties.
- Creators are verified people, so impersonating one is blocked at the
  handle level (app-social section 5).

## 3. The pipeline (states every video moves through)

```
draft -> uploaded -> processing (transcode + transcript)
  -> auto-check (claims extracted, sources checked, risk scored)
  -> in_review (human fact-check)  -> changes_requested -> (creator edits) -> auto-check
                                    -> rejected (reason)
                                    -> approved -> published
published -> correction issued | taken down (reason, strike)
```

- **Transcript** first (speech-to-text on the server; the transcriber
  skill shows how), with English subtitles for every video (the brief).
- **Claim extraction (AI):** list every factual claim with its timestamp;
  mark claims with numbers, named people or companies, predictions,
  market-moving statements, health or election content as higher risk.
  The creator then attaches sources to each claim (the
  `sources-template.json` shape).
- **Automatic checks:** `check_sources.py` rules (every claim sourced,
  strong sources for numbers and high-risk claims, two publishers for
  high-risk, dates, archives); numbers in the video recomputed against the
  source in code (percent changes, totals, conversions); known false
  claims list; banned-content and copyright checks.
- **Human fact-check** (section 4) on everything the AI passed; the AI
  never publishes on its own.
- **Open mode:** the same checks run after publishing, triggered by
  reports, sudden reach (a video taking off), coin mentions (pump risk)
  and creators with past strikes; pump-style videos about a coin go to the
  front of the queue (app-crypto-trading section 8).
- **Fast track for approved creators:** a smaller human check (high-risk
  claims only, a sample of the rest) within a short target time, with
  stricter consequences if something slips. Write the rule down.
- **Service levels:** target times from upload to decision (for example
  2 hours for news, 24 hours for explainers); show the creator the
  status and the expected time.

## 4. Reviewer checklist (per video)

1. Every claim in the transcript is listed; nothing important is missing.
2. Each claim matches its source: same number, same date, same context;
   quotes are word for word; a source says what the claim says, not
   something near it.
3. Numbers recomputed in code (never by eye).
4. Footage and images: where they came from, when; reverse image search
   for anything dramatic; not old footage presented as new.
5. Title, thumbnail and first seconds don't overstate the content.
6. Labels right (section 5); opinion isn't presented as fact.
7. Disclosures present (holdings, sponsorship); no hidden promotion.
8. Named people and companies: anything damaging is sourced strongly and
   they were fairly represented (defamation risk, section 8).
9. No market-moving rumour presented as fact; no "buy now" calls.
10. Verdict with reasons: approve, request changes (exact list), or
    reject. Two reviewers for high-risk videos; disagreements go to an
    editor.

Measure reviewer agreement on a sample each week; retrain where it's low.

## 5. Labels (shown on every video)

| Label | Meaning |
|---|---|
| News | Reports what happened, sourced, no opinion |
| Explainer | Teaches a topic, sourced |
| Analysis | Interprets facts; reasoning shown; sourced |
| Opinion | The creator's view; facts in it still checked |
| Developing | A news story still changing; updated as facts arrive (if the brief allows publishing before full verification; otherwise not used) |
| Sponsored / Promotion | Paid or promotional; always visible, never hidden in the caption |
| AI-generated or altered | Synthetic or edited audio or video beyond normal editing; required by law in some countries (section 8) |
| Corrected | A correction was issued; the note says what changed |

## 6. Sources in the app

- A "Sources" button on every video opens claim-by-claim sources with
  timestamps, publisher, date and an archived copy.
- Viewers can report a wrong claim at a timestamp; reports go to the
  fact-check queue with priority by views and risk.
- The source tiers file (`tiers.json`) is maintained by the editors: add
  domains as they're judged; review it monthly.

## 7. Corrections, takedowns, strikes

- **Corrections policy** published (from `editorial-standards.md`): small
  errors get a visible correction note on the video; errors that change
  the meaning get the video taken down or replaced.
- **Who saw it** gets told: viewers who watched most of it, Approved it
  or shared it get a notification of the correction.
- **Strikes:** a written ladder (for example: a correction = a note on
  the record; a takedown = a strike; 3 strikes in 12 months = creator
  status removed). Every strike has a reason, evidence and an appeal to
  someone who didn't make the decision.
- **Log everything:** what was wrong, when found, by whom, what changed.
  Publish the totals (corrections and takedowns per month): that is
  proof of the trust model.

## 8. Law and risk (summarise; a lawyer confirms per country)

- **India, digital news:** publishers of news and current affairs in the
  course of business fall under Part III of the IT Rules, 2021: a code of
  ethics (the Press Council's norms and the Programme Code), a grievance
  officer, a grievance timeline (15 days in commentary on the rules;
  check the current text), and a three-tier redress structure. The
  in-house team's videos likely make the company a publisher; creator
  videos also bring intermediary duties (app-social section 6).
- **India, court challenges:** in 2021 the Bombay High Court stayed Rules
  9(1) and 9(3) of Part III (the duty to follow the code of ethics and the
  oversight mechanism); check whether that stay still holds before relying
  on Part III's details.
- **AI-generated or altered media:** India's IT (Intermediary Guidelines)
  Amendment Rules, 2026 (notified 10 February 2026, in force 20 February
  2026, per law-firm summaries; read the Gazette text before relying on
  details) require visible labels and provenance metadata on synthetic
  audio and video, user declarations on larger platforms, and takedown
  within 3 hours of a court or government order (2 hours for
  non-consensual intimate imagery). Label it, keep the label when content
  is shared, and staff the queue for those deadlines.
- **Defamation:** strongest where a video damages a named person or
  company. Strong sources, a right of reply where fair, fast takedown on
  a credible complaint while it's reviewed.
- **Copyright:** footage, charts, music and logos need rights or a solid
  fair-dealing reason; a takedown process for complaints.
- **Market abuse and finance rules:** spreading false information about
  a listed company or token can be market manipulation; investment advice
  can need registration (for example SEBI's rules on finfluencers in
  India). Creators disclose, and "buy/sell" calls are not news.
- **Elections:** extra care, faster review, and any local election-period
  rules.

## 9. Editor picks and Top stories

Written rules for what makes a Top story (importance, verification
complete, balance across topics and regions); who picks; no paid
placement; conflicts declared by editors too. Log every pick.

## 10. Breaking news (the hardest trade-off)

The brief requires a fact-check before going live, which slows breaking
news. Options to put to the founder: a dedicated fast-track desk with a
short target time; editor-written "What we know / what we don't" updates
from primary sources while creator videos wait; or a "Developing" label
with limited distribution until checked (only if the founder accepts the
risk). Decide once, write it into `editorial-standards.md`.

## 11. Metrics

Share of claims with strong sources; median upload-to-decision time (by
fast track and normal); corrections and takedowns per 100 videos;
appeals overturned; reviewer agreement; viewer reports per 1,000 views
and their accuracy; Approve-to-view ratio.

## 12. Output format

```
Video / feature: <id or name>
check_sources.py: <ok / n errors>  Claims: <n> (high risk: <n>)
Reviewer verdict: <approve / changes / reject>, reasons: <list>
Labels: <list>  Disclosures: <list>
Legal flags: <defamation / copyright / market / AI label / none>
Logged: <correction or strike entries, if any>
```
