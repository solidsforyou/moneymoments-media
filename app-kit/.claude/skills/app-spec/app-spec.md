# App spec

You turn a founder's app idea into a one-page spec that a builder (Claude
or a person) can build from without guessing. The spec is short on
purpose: a founder reads it in five minutes and says yes or no. Anything
not in the spec doesn't get built.

The spec's job is to make v1 small. Most first apps fail by shipping late
with ten half-finished features, not by missing a feature. Cut until it
hurts, then check that what's left still solves the problem.

## 1. Interview (ask only what memory and the chat don't already say)

Search the memory sheet first (`memory.py search "app idea"`, then the
topic words). If an agreed brief exists (`brief.md` at the repo root or in
`docs/`), it holds the founder's answers: start from it and never re-ask
what it settles. Then ask the founder, in one message, only what is
missing:

1. **Who** is it for? One specific person, not "everyone": age, city
   type, job, phone (budget Android or iPhone), languages they read.
2. **What problem**, in their words? What do they do today instead (an
   app, WhatsApp, Excel, a notebook, nothing), and what annoys them about
   it?
3. **The moment of value.** The first time the user thinks "this is
   useful", what just happened on screen? (This is v1's core flow.)
4. **Money.** Free, subscription, one-time, ads, commission, or not
   decided? Who pays: the user or a business?
5. **Where it runs.** Android, iPhone, web, or all three? If unsure,
   say what you'd recommend (section 3) and ask for a yes.
6. **Deadline and budget.** When should real users have it? Any paid
   services already ruled in or out?
7. **References.** Apps they like the look or feel of, and why.

If the founder says "you decide", decide, write the reason in the spec and
mark it **assumed** so they can overrule it.

## 2. Check the idea before scoping it

A spec for an idea nobody wants is wasted work. Before writing it:

- If the founder hasn't looked at competitors, hand off to the Product
  head (competitor-research, then harsh-buyer-review on the idea) and
  reuse its folder. Note the 3 closest alternatives in the spec, with what
  this app does better in one line each.
- State the riskiest assumption (usually "people will do X often" or
  "people will pay Y"). Suggest the cheapest test of it that doesn't need
  the app: a WhatsApp group, a landing page with a waitlist, a Google
  Form, 10 calls. Building is the most expensive way to learn.
- If that test has already been run, write the result in the spec.

## 3. Platform (recommend; the founder decides)

| Situation | Recommend |
|---|---|
| Indian consumers, mass market | Android first (most Indian phones run Android), built with a cross-platform stack so iPhone is a later build, not a rewrite |
| Needs no phone features (camera, offline, push, background location) and must be found through Google | Web app (installable PWA) first |
| Users are businesses or staff at desks | Web first |
| Premium or metro audience that skews iPhone | Android and iPhone together (cross-platform) |
| Needs heavy phone features from day one | Cross-platform mobile (the app-stack skill picks the framework) |

The framework itself is the app-stack skill's call, made after the spec.

## 4. Scope v1

Sort every feature the founder mentioned, and the ones the core flow
needs, into three lists:

- **Must (v1):** the app is useless without it. Usually: sign-in, the
  core flow end to end, the one screen users come back to, and whatever
  the law or the stores require (privacy policy, account deletion).
- **Later:** good, but v1 proves the idea without it. Name the signal
  that would move it into a release (for example "50 users ask for it").
- **Never (for now):** features that sound good but don't serve this
  user. Saying it out loud stops scope creep.

Rules of thumb:
- v1 has **one** core flow. If you find two, pick the one tied to the
  moment of value and move the other to Later.
- A typical v1 is **5 to 8 screens**. More than 12 means it isn't v1.
- Prefer boring, proven building blocks: phone OTP or Google sign-in over
  your own passwords; a hosted backend over your own servers; UPI through
  a payment gateway over anything custom.
- Admin tools for v1 can be a spreadsheet or the backend's dashboard.
  Don't build an admin panel until running the app by hand hurts.
- Payments, chat, maps, feeds, recommendations and offline sync each add
  weeks. Each one must justify its place in Must.

## 5. Write it

Fill `spec-template.md`. Requirements:

- **User stories** in the form "As <user>, I want <action> so that
  <outcome>", each with 2 to 5 **acceptance checks**: concrete,
  testable statements ("Given I enter a wrong OTP three times, I see
  'Too many tries, wait 60 s' and the button is disabled for 60 s").
  The app-testing skill turns these checks into tests, so make them
  precise.
- **Screens:** one line each: name, what's on it, where it leads. Include
  the empty, loading and error state of every screen that loads data.
- **Data:** the things the app stores (user, order, post...), their key
  fields, who can read and change each one. Mark personal data (name,
  phone, email, location, photos, payments): app-security and the
  privacy policy use this list.
- **Success numbers:** at most 3, each with a target and a time
  ("40% of sign-ups finish the core flow in week 1"). Name the event that
  measures each: the build adds those events.
- **Out of scope:** the Later and Never lists.
- **Open questions:** anything still undecided, with who decides.

Keep it to roughly one page, two at most. Plain words, no jargon the
founder would have to look up.

## 6. Check, then hand over

Before showing the founder:
1. Every Must feature appears in a user story; every story maps to
   screens; every screen's data appears in the data list.
2. Every acceptance check is testable (a test could pass or fail on it).
3. Nothing in Must is there "just in case".
4. Personal data is marked, and the store requirements (privacy policy
   URL, account deletion inside the app if users can sign up) are in Must.
5. Run careful-mode's three reviews on the spec.

Then show the founder a short summary (the core flow in one line, the Must
list, the 3 success numbers, open questions) and the path to `docs/spec.md`.
After they approve, save to the memory sheet:
- `--type decision --topic "app scope"`: the one-line core flow and the
  Must list.
- `--type decision --topic "app platform"`: the platform and why.
- One row per other decision they made (pricing model, deadline).

When the spec changes later, edit `docs/spec.md`, add a dated line to its
**Change log**, and update the memory rows. The spec is the source of
truth: code that disagrees with it is either a bug or a spec change the
founder approved.

## 7. Hand-offs

- app-stack: picks the framework, backend and services from this spec.
- app-ui-taste: the screens list and references set the visual direction.
- app-build: builds the Must list one story at a time, in the order the
  spec lists them.
- Product head: idea validation, competitors, pricing.

## 8. Output format

```
Spec: docs/spec.md (v1, <date>)
Core flow: <one line>
Must (<n> stories, <n> screens): <short list>
Success numbers: <3 lines>
Riskiest assumption: <line> -> cheapest test: <line>
Assumed (please confirm): <list, or "none">
Open questions: <list, or "none">
```
