# New app brief (v3)

Agreed with the founder on 28 Oct 2026 before any design. Mockups and reviews start from this.
v2 replaced v1's heavy verification with LinkedIn-style seriousness; v3 (after the harsh buyer
review) makes it India-only and Android-first.
Name: **Chartroom** (chosen 28 Oct 2026; domain, Play Store, App Store and trademark checks
still to do).

## What it is

A crypto trading platform with a finance social network and a news section inside. It's
marketed as three things in one: a news place, a crypto place and a social place, with trading
first. Posts are as serious as LinkedIn's, but the videos and the feel are Instagram's:
reels, a smooth feed and a visual app.

The edge over Binance Square (a global, English feed inside Binance): built for Indians, with
Indian creators, Hindi and Hinglish videos, Indian economy news, INR and UPI, and India's crypto
tax shown before every trade.

## Who it's for

Everyone at once: first-time investors, active crypto traders and people who want serious
finance content. India only. Android first (about 92% of Indian phones), iPhone soon after.

## Home

The app opens on the reels feed, and trading is one tap away: every video shows the price of
the coin it mentions and a trade button. Feed tabs the user switches between, e.g. Following,
Top stories (picked by editors), For you. All three tabs are in v1.

## News

- Its own tab in the bottom bar.
- Full articles, not short cards. The Chartroom team posts 3 to 5 a day, 400 to 800 words each:
  AI drafts and checks, the team verifies, sources are cited with links, and the coins an
  article affects show with a trade button. Summaries are in our own words, never copied.
- Approved news outlets are cited, and outlets can apply to be added to that list.
- First launch shows off all three sides (news, crypto, social) in a short onboarding.

## Boring Stuff

- The LinkedIn side of Chartroom: its own tab where anyone writes. Long articles (title, cover
  image, sections), short text posts, and posts with images, charts or an image carousel.
- Same rules as videos: finance topic tag, removed on report. No checking before posting at
  launch (founder: too hard to start with).

## Navigation

- Bottom bar, five tabs: Feed, News, Boring Stuff, Trade, Profile. No Post tab.
- Creating anything (video, Instagram import, article, text post) starts from a + button in the
  top bar (Claude's choice, since the Post tab is gone; founder can change it).

## Content

- Topics: markets and crypto, economy and business, world and political news, personal
  finance, anything finance-related.
- Formats: short vertical videos, plus writing in News and Boring Stuff. Long explainers and live streams wait
  for later updates.
- Any spoken language; every video has English subtitles.
- The app interface is in English with a casual Hinglish tone in onboarding and prompts, like
  Unicorn Ka Hisab.

## Posting and keeping it serious

- Anyone can post after a quick check (phone or email, and agreeing to the content rules).
- Every post is tagged with a finance topic; off-topic posts are removed.
- Users report posts. Moderators remove misleading, scam or off-topic videos, and repeat
  offenders are banned. No fact-check before a video goes live.
- Import (v1): Instagram only. A creator connects their Instagram account once, then pastes a
  link to one of their own reels to import it; links to anyone else's reels are rejected.
  Reels are copied in through Instagram's official API (creator or business accounts only;
  reference client in `reference/sfy_instagram`). No YouTube import for now.
- No paid promotions in the feed: creators can't post paid coin promotions at all.
- Optional extra: creators can add sources to a video. The verified badge waits for v1.1.
- When someone reports a post, they're told what happened to it. No public safety numbers and
  no strike counts on profiles: profiles show followers and the usual Instagram-style details.

## Profiles

- Quick to create: name, username, photo, a one-line headline (e.g. "Crypto trader") and
  1 to 3 topics they talk about.
- Optional extras: LinkedIn-style work history (jobs, company, education, certifications) and
  links to other socials (X, YouTube, Instagram, LinkedIn, website). Every optional field shows
  on the profile only if it's filled in. No holdings or track record on profiles.

## Look

Dark and light modes, dark by default.

## Social (v1)

Follow, like, Approve, comment, share, DMs (all in v1; DMs need scam-link blocking). Approve works like Instagram's repost: anyone can
press it, and the video goes to their followers' feeds (shown as "Approved by @name", with the
original creator credited) and onto an Approved tab on their profile. It's a public
endorsement, not a fact-check. Sharing sends the video outside the app (e.g. WhatsApp).

## Trading

- Crypto only. No stocks planned yet.
- An Indian, FIU-IND-registered crypto partner handles custody, trades and KYC for trading. The
  app is only the front end. Deposits and withdrawals in INR, by UPI and bank transfer.
- Partner options (researched 28 Oct 2026, terms unverified until we contact them):
  1. Mudrex "Crypto-as-a-Service": an API for brokers and fintech apps to add crypto investing,
     with KYC, compliance and custody handled by Mudrex; FIU-IND registered; the company says
     integration takes 2 to 4 weeks. First choice.
  2. CoinDCX "API Broker" (listed under Business on its site; no details public).
  3. Fallback, buy-only: an on-ramp widget (Onramp.money, or Onmeta, which says it's FIU-IND
     registered) that sells crypto for INR via UPI into a wallet. No selling or holding in-app.
  Ask a lawyer whether Chartroom itself must also register with FIU-IND.
- Only coins the partner lists can be traded, which keeps most tiny pump coins out.
- Every trade shows India's crypto tax before confirming: 1% TDS, 30% tax on gains, and losses
  can't be set off against gains (unchanged in Budget 2026).

## Money

- Revenue: trading fees only. Creators aren't paid.
- No ads. Instead, habit reminders to invest a little:
  - Shown once every 15 to 30 minutes of scrolling. Users can turn them off any time (a link on
    every reminder and in settings).
  - Each tap adds ₹10 or ₹20 to a habit jar (INR held in the user's wallet with the partner).
    When the jar reaches the partner's minimum order, it's invested automatically, so fees and
    TDS stay small relative to the order.
  - The first time, the user picks what the jar buys (a coin such as BTC, or a basket);
    later reminders reuse that choice.
  - Wording says "invest", never "save" (crypto isn't savings), and every reminder carries
    ASCI's risk warning ("Crypto products and NFTs are unregulated and can be highly risky...").

## v1 goal

A small real launch: a few hundred users and a handful of creators, on the Play Store, to prove
people watch and trade.

- Moment of value: a user watches a serious video about a coin and buys it right there in a few
  taps, without switching apps. This is v1's core flow.
- Deadline: on the Play Store within 1 month (from 28 Oct 2026); iPhone soon after.
- Seed content and first users: Unicorn Ka Hisab and the team's own videos.
- Budget: near zero; free tiers and the cheapest options wherever possible.
- Partner: not chosen yet. Design against a generic Indian partner (buy, sell, INR wallet; KYC
  handled by them) and swap in the real one.

## Risks to keep in view

- One month is very tight for this scope. The gateway partner is the critical path: no partner
  means no trading, and app stores in India pulled unregistered exchanges' apps in 2024. Everything not in the core flow is a candidate to cut from v1.

- With open posting, coin-pumping and scam videos will be the main threat on a trading app.
  Reports must be quick to file and fast to act on.
- Comments and DMs are where crypto scams spread, so they need scam-link blocking from day one.
- India's crypto tax holds trading back, and fees are the only revenue.
- Ad rules (India's advertising standards council, ASCI): crypto ads can't play down risk
  or promise returns. A trade button on every video can look like the platform is endorsing
  the coin, so it needs a clear "not advice" signal.
