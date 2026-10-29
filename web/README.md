# OpenSource Everything on the web

The real, deployable site: OSE (the store and your OpenID), **Tomorrow** (messaging and
moving files between your devices and friends), **OpenPrep** and **GoodHabit** (each app's
page, its content feed and its app ID), plus privacy, data-deletion, build and admin pages.

- Front end: plain HTML, CSS and JavaScript modules, built with Vite. No framework.
- Back end: Netlify Functions (`netlify/functions`), data in Netlify Blobs.
- Runs the same locally: `dev/server.mjs` serves the site and runs the functions with files
  in `.data/` instead of Blobs.

## Run it locally

```
cd web
npm install
npm run dev        # builds, then serves http://localhost:8888
npm test           # 9 end-to-end API tests
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
   | `MAX_FILE_MB` | Biggest file Tomorrow accepts (default 5) | No |

3. **Telegram**: in @BotFather run `/setdomain` for the bot and give it
   `opensourceeverything.in` (or the Netlify URL while testing). The login button only
   appears once `TELEGRAM_BOT_TOKEN` is set.
4. **Domain**: add `opensourceeverything.in` under Domain management.
5. Netlify Blobs needs no setup; it's on for every site.

That's all; there are no other keys or services. Nothing here sends email yet.

## What works today

- **Accounts.** Sign up with an ID and password, or log in with Telegram. One OpenID; a
  Tomorrow ID, PrepID or GoodID made only when needed. Delete your account yourself.
- **Tomorrow.**
  - **Chats:** one-to-one, refreshed every few seconds.
  - **My devices:** a chat with yourself that every device you're logged in on shares, each
    message tagged with the device it came from.
  - **Send:** drop or pick files, then choose your devices or a person; a progress bar shows
    the upload.
  - **Feed:** posts for 18+ with a Tomorrow ID, likes only the poster sees, follows.
  - **Watch:** published videos.
  - **Notifications:** in Tomorrow, or on Telegram for people who log in with it.
  - **OSE link:** connecting to OpenSource Everything is optional.
- **OpenPrep and GoodHabit pages.** Each has its promise, a content feed by pillar (Lesson /
  CAT tip / Career option; Market case study / Knowledge / Indian current affairs / Personal
  finance) and its app ID. The full interactive preview, with lessons and the trading
  simulator, is at `/play/`.
- **Content.** `/admin/` (with the admin token) publishes to any app's feed. The content
  machine can do the same with
  `POST /api/content/<app>` and `Authorization: Bearer <ADMIN_TOKEN>`.
- **Meta App Review needs:** `/privacy/` and `/delete-data/` are live pages.

## Not built yet (honest list)

- **Files over ~5 MB.** Netlify Functions take request bodies up to about 6 MB. Bigger files
  need direct uploads to storage (signed URLs); next step.
- **Peer-to-peer transfer and end-to-end encryption.** Files go through our storage today,
  readable only by the sender and the people they were sent to, but not end-to-end
  encrypted. Device-to-device (WebRTC) with E2E is the next Tomorrow milestone. The UI makes
  no E2E claim.
- **Real-time.** Chats refresh every 3 seconds. Fine for launch; a socket service later.
- **Rate limits and spam checks** on sign-up and messages, before opening to the public.
- **Password reset.** Needs email; until then, Telegram login is the recovery path.
- **OpenPrep lessons and the simulator** run in the `/play/` preview with sample data; they
  move into proper pages next.
- **Native desktop app** (Windows/Mac) with AirDrop-style transfer: the website installs as
  an app today; native comes later (founder idea, 29 Oct).

## Design

House design (the founder's Apple-inspired direction), held to Hallmark's floor
(`.claude/skills/hallmark`). Check:
`node ../.claude/skills/hallmark/scripts/sloplint.mjs src/shared/base.css src/tomorrow.css --scope app --url http://localhost:8888/ --render`
Last run: 0 FAIL on `/`, `/tomorrow/` and `/goodhabit/`. The 6 WARNs are dismissed: they
compare button text to the page background, but that text only sits on the accent button.

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
