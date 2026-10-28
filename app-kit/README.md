# app-kit

Starter kit for the founder's new app, pulled out of moneymoments-media (28 Oct 2026).
Copy everything in this folder (including the hidden `.claude/`) to the root of the new
app's repo. Nothing here is specific to Unicorn Ka Hisab.

## Skills in `.claude/skills/` (from SOLIDS FOR YOU, MIT)

| Skill | What it does for the app |
|---|---|
| master | Sends each task to the right head. The Product head covers ideas, pricing and launch readiness. Marketing and Design come in for the launch. |
| careful-mode | Three-pass check for anything that touches money, user data, production or launches. |
| economy-mode | Hands bulk work to cheaper helpers and runs the memory sheet (`scripts/memory.py`). |
| competitor-research | Sourced research on competing apps, their pricing and their reviews. |
| harsh-buyer-review | Brutal user's-eye feedback on the idea, store listing, onboarding and pricing. |
| humanizer | Makes app copy, store listings, onboarding text and emails sound like the founder. |
| social-media | Launch posts, content calendar and growth. |
| ai-visuals | App icon, store screenshots and promo images. |

Left out because they're video-specific: motion-design-taste, audio-review and transcriber.
Copy them over from moneymoments-media `.claude/skills/` if the app ever works with video or audio.

## `memory/memory.csv`

A fresh memory sheet with only the founder rules that apply to any project: SOLIDS FOR
YOU tools only, check memory before asking, and read every message and attachment in full.
Add app decisions to it with
`python3 .claude/skills/economy-mode/scripts/memory.py --file memory/memory.csv add ...`.

## `reference/`

`sfy_instagram/` plus its tests: a small working example of OAuth login, long-lived token
caching and refresh, an API client, a CLI and mocked tests. Use it as a pattern if the
app needs Instagram or another OAuth API. It's not app code.
