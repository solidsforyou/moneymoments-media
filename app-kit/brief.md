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
- **v1: affiliate links.** Every video and article shows the price of the coins it mentions and a
  "Trade on <exchange>" button that opens that coin in the exchange's own app. The user picks
  their exchange once from several: Mudrex, CoinDCX, CoinSwitch (Binance maybe; its India
  terms are unconfirmed). Trading, KYC, deposits, holdings and withdrawals all happen in the
  exchange's app.
- Affiliate commissions (exchanges' own pages, 28 Oct 2026; recheck at sign-up): Mudrex 50% of
  referred users' fees in year one, then 30%; CoinDCX up to 30% on buy/sell; CoinSwitch 30% on
  spot; Binance 20 to 50% by volume (global terms).
- The Trade tab in v1: prices, coin pages with related videos and articles, and the trade
  buttons. No in-app wallet yet.
- **Later: API partner (Mudrex Crypto-as-a-Service first, CoinDCX API Broker second).** Brings a
  full in-app wallet: buy and sell, portfolio, INR deposit and withdrawal by UPI, sending crypto
  to outside wallets, and the habit jar. KYC happens at the first trade, not at sign-up.
  Revenue is a share of the partner's fee, nothing added on top for users. Ask a lawyer whether
  Chartroom must register with FIU-IND at that stage.
- Every trade (in-app, once the API is live) shows India's crypto tax before confirming: 1% TDS,
  30% tax on gains, and losses can't be set off against gains (unchanged in Budget 2026).
- Only coins the exchange lists can be traded, which keeps most tiny pump coins out.

## Money

- Revenue: affiliate commissions in v1, then a revenue share from the API partner. Creators
  aren't paid. No ads.
- How Chartroom earns is explained once, on a page in settings/about.
- Invest-habit reminders instead of ads:
  - Shown once every 15 to 30 minutes of scrolling. Users can turn them off any time (a link on
    every reminder and in settings).
  - v1 (affiliate): the reminder suggests investing ₹10 to ₹20 and links to the user's chosen
    coin or basket on their exchange (its SIP, where it has one).
  - With the API: each tap adds ₹10 or ₹20 to a habit jar (INR in the user's wallet with the
    partner), invested automatically once it reaches the partner's minimum order.
  - The first time, the user picks what to invest in (a coin such as BTC, or a basket).
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
- Partner: affiliate links in v1 (sign up to Mudrex, CoinDCX and CoinSwitch affiliate
  programmes); API partner after launch.

## Risks to keep in view

- One month is very tight for this scope. Affiliate links take the exchange off the critical
  path for v1.
- Affiliate disclosure is only on a settings/about page (founder's choice). ASCI's rules may
  want a disclosure next to the promotion itself; check before launch. Everything not in the core flow is a candidate to cut from v1.

- With open posting, coin-pumping and scam videos will be the main threat on a trading app.
  Reports must be quick to file and fast to act on.
- Comments and DMs are where crypto scams spread, so they need scam-link blocking from day one.
- India's crypto tax holds trading back, and fees are the only revenue.
- Ad rules (India's advertising standards council, ASCI): crypto ads can't play down risk
  or promise returns. A trade button on every video can look like the platform is endorsing
  the coin, so it needs a clear "not advice" signal.
