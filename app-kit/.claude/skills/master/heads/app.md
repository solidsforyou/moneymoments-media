# App head

Builds and ships the founder's app: from idea to spec, stack, code,
screens, tests, security and store release, and every fix after launch.
Added in this repo (not part of upstream SOLIDS FOR YOU); its sub-skills
live next to the others in `.claude/skills/app-*`.

## 1. When it runs

- "I have an app idea", "plan the app", "what should v1 have".
- "Set up the project", "which framework", any code change to the app:
  a feature, a screen, a bug, a refactor.
- "How does this screen look", "review the UI", "make it look better".
- "Write tests", "is it secure", "privacy policy", "publish the app",
  "release a new version", "the app got rejected".

## 2. Sub-skills

| Sub-skill | Used for |
|---|---|
| app-spec | Idea to one-page spec: user, core flow, Must/Later/Never, stories with acceptance checks, screens, data, success numbers |
| app-stack | Framework, backend and services; decision records; repo setup with checks and CI |
| app-build | Every code change: the story-by-story build loop, code rules, debugging, `preflight.py` before each commit |
| app-ui-taste | Design direction and tokens; screen capture, audit and 100-point review; fixes |
| app-testing | Tests from acceptance checks; access-rule and payment tests; release test pass; bug reports |
| app-security | Security and privacy review, `scan_secrets.py`, DPDP, store privacy forms, account deletion |
| app-release | Versions, store accounts and waits, listing and asset checks, rollout, watching, rollback |
| humanizer | Every word users read: screens, store listing, release notes, emails, review replies |
| ai-visuals | App icon, store screenshots' backgrounds, promo and onboarding images |
| competitor-research, harsh-buyer-review | Through the Product head: validating the idea; a user's verdict on the listing and onboarding |

Foundation: careful-mode on the spec, every security verdict, anything
touching payments, personal data or production, and every release;
economy-mode for bulk mechanical code work (never for review, security or
debugging); the memory sheet for every decision.

## 3. Workflow

1. **Where are we?** No `docs/spec.md`: start at app-spec from the agreed
   `brief.md` if there is one (it hands idea validation to the Product
   head first if the idea is untested). The founder's rule: questions
   first, agreement before any mockups. Spec but no repo: app-stack.
   Otherwise: the step the task asks for.
2. **Spec:** app-spec, then founder approval. Save scope and platform to
   the memory sheet.
3. **Stack:** app-stack: decisions recorded, repo set up, preflight
   passing. List the accounts and keys only the founder can create.
4. **Direction:** app-ui-taste section 1 (feel, tokens, components) and a
   sample core screen approved by the founder.
5. **Build, story by story:** app-build's loop. Each story: tests from its
   acceptance checks (app-testing), the running app checked by hand,
   preflight passing, app-ui-taste READY for new screens, app-security's
   focused review when it touches sign-in, payments or personal data,
   and its section 4a for anything with trading, invest prompts, finance
   content or user posts, comments and DMs.
6. **Release:** app-security full review, app-testing release pass,
   listing through humanizer then `check_listing.py`, images through
   ai-visuals then `check_assets.py`, and app-release's checklist,
   rollout and watch. The founder approves every upload, submission and
   rollout step.
7. **After launch:** app-release section 8 weekly; bugs back into step 5;
   new features back to app-spec (spec change first).

## 4. Hand-offs

- Product head: idea validation, competitors, pricing and positioning.
- Marketing head: launch plan, posts, store listing optimisation ideas.
- Design head: app promo videos, launch reels and the in-house team's
  early videos for the app (transcriber, motion-design-taste and
  audio-review are in the kit for them).
- Review head: a harsh-buyer-review of the store listing and onboarding
  before launch.

## 5. Done when

The step's own "done when" is met (spec approved; preflight passing;
app-ui-taste READY; no Critical or High security finding; release
checklist complete with the founder's approval), every decision is in the
memory sheet, and careful-mode passed on anything high-stakes.
