# moneymoments-media — Solids For You Instagram API

Python tools for the **Solids For You** Instagram account using Meta's
**Instagram API with Instagram Login** (`graph.instagram.com`). No Facebook Page needed.

What it does: read profile and posts, pull post/reel and account insights, publish
images and reels, and keep the 60-day access token refreshed.

## 1. One-time Meta setup (done by hand)

1. **Make the Instagram account professional.** In the Instagram app go to Settings →
   Account type and tools → switch to a **Business** or **Creator** account.
2. **Create a Meta app** at <https://developers.facebook.com/apps> → *Create app* →
   use case **"Manage messaging & content on Instagram"** → app type **Business**.
3. In the app dashboard open **Instagram → API setup with Instagram login**:
   - Copy the **Instagram app ID** and **Instagram app secret** (these are *not* the
     Facebook app ID/secret shown under App settings).
   - Under **Set up Instagram business login → Business login settings**, add an OAuth
     redirect URI, e.g. `https://localhost/`. It must match `IG_REDIRECT_URI` exactly.
4. **Add the SFY account as a tester** while the app is in Development mode:
   App roles → Roles → *Add people* → **Instagram Tester** → enter the SFY username.
   Then, logged in as SFY on instagram.com, accept the invite at
   Settings → Apps and websites → **Tester invites**.
5. (Later, for production use beyond testers) submit **App Review** for the
   `instagram_business_*` permissions and switch the app to Live.

## 2. Local setup

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # fill in IG_APP_ID, IG_APP_SECRET, IG_REDIRECT_URI
```

## 3. Log in once

```bash
python -m sfy_instagram login
```

Open the printed URL while logged into the SFY Instagram account, approve, and paste
back the URL you land on (the `https://localhost/?code=...` page won't load — that's
fine, just copy its address). The long-lived token is saved to `.sfy_token.json`
(gitignored, chmod 600) and auto-refreshes when it's within 7 days of expiring.
Run any command at least once every ~50 days, or `python -m sfy_instagram refresh`,
to keep it alive.

## 4. Use it

```bash
python -m sfy_instagram me                          # profile, followers, media count
python -m sfy_instagram media --limit 10            # recent posts
python -m sfy_instagram insights                    # account insights (last day)
python -m sfy_instagram insights <media_id>         # views, reach, likes, shares, saves...
python -m sfy_instagram limit                       # publishing quota (100 posts / 24h)
python -m sfy_instagram publish-image https://.../post.jpg --caption "..."
python -m sfy_instagram publish-reel  https://.../reel.mp4 --caption "..." --cover https://.../cover.jpg
```

Or from Python:

```python
from sfy_instagram import InstagramClient
from sfy_instagram.auth import load_token
from sfy_instagram.config import Config

cfg = Config.from_env()
tok = load_token(cfg)
ig = InstagramClient(tok["access_token"], tok["user_id"], cfg.api_version)
print(ig.profile())
```

### Publishing notes

- Media must be at a **public HTTPS URL** Instagram can fetch (S3, Cloudinary, etc.).
- Images: JPEG only. Reels: MP4/MOV, H.264, 9:16, 3s–15min.
- Publishing is a container flow: create container → poll until `FINISHED` → publish.
  `publish_reel` handles the polling (up to 10 minutes).

## Tests

```bash
pip install -r requirements-dev.txt && python -m pytest -q
```

## Permissions requested

`instagram_business_basic`, `instagram_business_content_publish`,
`instagram_business_manage_insights`, `instagram_business_manage_comments` —
edit `SCOPES` in `sfy_instagram/config.py` to change.
