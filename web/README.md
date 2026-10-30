# OpenSource Everything on the web

The real, deployable site: OSE (the store and your OpenID), **Tomorrow** (messaging and
moving files between your devices and friends), **OpenPrep** and **GoodHabit** (each app's
page, its content feed and its app ID), **Arena** (the practice game), plus privacy, data-deletion, build and admin pages.

- Front end: plain HTML, CSS and JavaScript modules, built with Vite. No framework.
- Back end: Netlify Functions (`netlify/functions`), data in Netlify Blobs.
- Runs the same locally: `dev/server.mjs` serves the site and runs the functions with files
  in `.data/` instead of Blobs.

## Run it locally

```
cd web
npm install
npm run dev        # builds, then serves http://localhost:8888
npm test           # 12 end-to-end API tests
```

## Put it on Netlify (what the founder plugs in)

1. **New site from Git**: pick this repository. Netlify reads `web/netlify.toml`:
   base directory `web`, build command `npm run build`, publish `dist`.
2. **Environment variables** (Site configuration → Environment variables):

   | Name | What | Required |
   |---|---|---|
   | `SESSION_SECRET` | 32+ random characters; signs login cookies. `openssl rand -base64 48` | Yes |
   | `ADMIN_TOKEN` | 24+ random characters; lets `/admin/` and the content machine publish | Yes, to publish |
   | `TELEGRAM_BOT_TOKEN` | From @BotFather. Switches on "Log in with Telegram" and Telegram notifications | For Telegram |
   | `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` | Push notifications. Make a pair once with `npx web-push generate-vapid-keys` | For push |
   | `VAPID_SUBJECT` | Contact for push services, e.g. `mailto:hello@opensourceeverything.in` | No |
   | `MAX_FILE_MB` | Biggest file Tomorrow accepts (default 100) | No |

3. **Telegram**: in @BotFather run `/setdomain` for the bot and give it
   `opensourceeverything.in` (or the Netlify URL while testing). The login button only
   appears once `TELEGRAM_BOT_TOKEN` is set.
4. **Domain**: add `opensourceeverything.in` under Domain management.
5. Netlify Blobs needs no setup; it's on for every site.

That's all; there are no other keys or services. Nothing here sends email yet.

## What works today

- **Accounts.** Sign up with an ID and password, or log in with Telegram (and link Telegram
  to an existing account). One OpenID; a Tomorrow ID, PrepID or GoodID made only when needed.
  A recovery code at sign-up resets a forgotten password without email. Delete your account
  yourself.
- **Tomorrow.**
  - **Chats:** one-to-one, refreshed every few seconds; every screen has its own address, so
    Back works.
  - **My devices:** a chat with yourself shared by every device you're logged in on, each
    message tagged with the device it came from.
  - **Send:** drop or pick files, up to 100 MB each, sent in 4 MB pieces with a progress bar.
    Photos and videos get a preview made on your device; tap to open full size.
  - **Finding people:** search by ID as you type, and an invite link (WhatsApp share or copy)
    that drops a new friend straight into a chat with you.
  - **Notifications:** web push on this device (Android, desktop, and iPhone once Tomorrow is
    on the Home Screen), plus Telegram for people who log in with it.
  - **Feed:** posts for 18+ with a Tomorrow ID, likes only the poster sees, follows.
  - **Watch:** published videos.
- **OpenPrep.**
  - Six Quant lessons with practice questions (`/openprep/learn/`).
  - **Free Mock 1** (`/openprep/mock/`): the CAT pattern, 68 original questions, 40 minutes a
    section, +3/−1 marking, section lock, mark for review, resume after a refresh, results by
    section and every answer explained. Percentiles appear only once 200 people have taken it.
  - A content feed by pillar (Lesson / CAT tip / Career option) and the PrepID.
- **GoodHabit.**
  - The trading simulator (`/goodhabit/sim/`): real daily prices since 2007 for the Nifty 50
    and 17 shares and ETFs, pretend money, approximate charges, big-day notes, and a report
    card against just holding the Nifty.
  - A content feed by pillar and the GoodID.
- **Arena** (`/arena/`): the practice game for every app, classes 1 to 12.
  - Make a player (an original character; glasses, cap, headband, headphones and a crown
    unlock at 3, 8, 15, 25 and 40 levels cleared). Nicknames are generated, never typed, so
    no child puts a real name on a leaderboard.
  - Pick a class and a difficulty (Rookie, Pro, Legend: XP × 1, 1.5, 2). Thirty levels per
    course, six questions each, a 90-second boss every fifth level; pass with 4 right (boss 5).
  - Courses: Maths and English for classes 6 to 10, Money basics (the GoodHabit course) and
    Digital skills for any class. Questions are generated or drawn from a bank on the server
    and get harder level by level.
  - Answers are checked on the server one at a time, so right answers never sit in the page.
  - Play as a guest (progress on the device). Sign up (13+) to save and get ranked; the guest
    player and its cleared levels move into the account. Under 18s need a parent's account to
    approve them (Arena, Me tab) before they show on leaderboards.
  - Leaderboards per course, class and difficulty, this week and all time. Ranks: Bronze,
    Silver 500 XP, Gold 1,500, Diamond 3,500, Champion 7,000. Replays pay half; levels more
    than 2 below your best pay nothing.
  - Linked from the OSE store and from GoodHabit ("Practise in Arena").
- **`/play/`** is the old design demo, clearly labelled as made-up people and data.
- **Content.** `/admin/` (with the admin token) publishes to any app's feed. The content
  machine can do the same with
  `POST /api/content/<app>` and `Authorization: Bearer <ADMIN_TOKEN>`.
- **Meta App Review needs:** `/privacy/` and `/delete-data/` are live pages.

## Not built yet (honest list)

- **Files over 100 MB, and true device-to-device transfer** (WebRTC) with end-to-end
  encryption. Files go through our storage today, readable only by the sender and the people
  they were sent to, but not end-to-end encrypted; the app makes no E2E claim.
- **Real-time.** Chats refresh every 3 seconds. Fine for launch; a socket service later.
- **Rate limits and spam checks** on sign-up and messages, before opening to the public.
- **Email or phone recovery.** The recovery code and Telegram cover it for now.
- **More mocks and lessons.** Free Mock 1 and six Quant lessons are live; Verbal and
  Reasoning lessons are next.
- **Native desktop app** (Windows/Mac) with AirDrop-style transfer: the website installs as
  an app today; native comes later (founder idea, 29 Oct).
- **Arena:** Maths and English for classes 1 to 5 and 11 to 12; more courses (each
  course's practice moves here from its app). Children under 13 play as guests only, since
  accounts are 13+. Money basics' fact questions aren't graded by level yet. Guest stars
  don't carry into an account (cleared levels do).

## Design

House design (the founder's Apple-inspired direction), held to Hallmark's floor
(`.claude/skills/hallmark`). Check:
`node ../.claude/skills/hallmark/scripts/sloplint.mjs src/shared/base.css src/tomorrow.css src/mock.css src/arena.css --scope app --url http://localhost:8888/ --render`
Last run: 0 FAIL on `/`, `/tomorrow/`, `/goodhabit/`, `/openprep/mock/`, `/goodhabit/sim/` and `/arena/`. The 6 WARNs are dismissed: they
compare button text to the page background, but that text only sits on the accent button.

## Rebuilding generated files

- `public/data/sim.json`: `node scripts/extract-sim.mjs ../app-kit/design/opensource-everything-preview.html`
- `public/play/`: `python3 scripts/make-play.py ../app-kit/design/opensource-everything-preview.html`

## Splitting into repos (for the new GitHub account)

Everything lives in one repo for now, with one folder per owner, so each can move out with
its history:

```
git subtree split --prefix=web -b split-web          # the site, all apps
git subtree split --prefix=content/ocm -b split-ocm  # the content machine
```

Then push each branch to its new repository. When each app gets its own repository, move
`src/tomorrow.*` and its functions first; the shared `ui.js`, `base.css` and `/api/auth`
become a small shared package.
