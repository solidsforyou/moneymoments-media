# GoodHabits: brief v1

Agreed with the founder on 29 Oct 2026 (his v0, word for word, is in
`briefs/goodhabits-founder-v0.md`; his answers are below it). GoodHabits replaces
Chartroom (whose last brief is in `briefs/chartroom-brief-final.md`). The app-spec skill
turns this into `docs/spec.md`.

## In one line

Guilt-tripped about doom-scrolling? GoodHabits is a calm, ad-free social app where you learn
something, show work you're proud of, and turn impulse spending into investing.

## Promise

- No ads, no promotions, no branded content, no business profiles. Brands join like any
  creator and may only post their journey and work, never "buy now". Posts that promote get
  flagged.
- Content that leaves you feeling you learnt something, filtered by categories you choose.
- Revenue comes from investing through Zerodha, never from ads (see "Money", still open).

## Sign-up

Simple, Hinglish-friendly onboarding that shows all five tabs. Fields: name, email or phone,
and "How much do you invest each month?" (**skippable**; "we'll help you grow this").
Everyone gets a **Good ID** instead of a username.

## The five tabs

1. **Feed.** LinkedIn meets Instagram with a GitHub taste. Reels and posts from people you
   follow, or approved by them. Stories, DMs, recent activity (likes, follows, updates).
   Nobody is asked for a job title or role; you only share what you're proud of. No business
   profiles. Scroll like Instagram.
2. **News.** A calm, ad-free search-and-read page: a plain search box, our AI finds credible
   articles from **our own search index** and suggests them; the user picks one to read.
   Each result shows title, source name, source type (News / Government / Brand / Science) and
   ratings. Users rate news sources 1 to 5 for trust and review articles and channels; the
   ratings are public from day one. Our own credibility rating comes later.
3. **Money Machine.** Invest in the easiest buying flow possible, through Zerodha, so the urge
   to buy stuff becomes an investment. Shows stocks; mutual funds and FDs where Zerodha's API
   allows (it can't place mutual fund orders or new SIPs today: see `memory`).
4. **Profile.** Photo, name, bio, then tabs: Posts (LinkedIn-style photo and text), Reels,
   **Flexes** (where you work, things you're proud of: GitHub projects, ROAS achieved for a
   client, good done for the community, how your product solves a problem; taken on trust),
   Tagged, and **Approved** (a repost that says "good advice": shown in a bigger 4x4-style
   grid with the comment, so users keep a library of advice they trust).
5. **Hissab.** Everyday money tracking and Splitwise-style splitting with phone numbers,
   names or Good IDs. Settling up by UPI comes later.

## Invest reminders

A small reminder at the top right ("Up for some investing?") in Feed and News. **Opt-in** and
**customisable** (the user picks how often, for example every 15 scrolls or 10 minutes, or
less). Never on by default, never after a loss or late at night (India's dark-pattern rules
ban "nagging").

## Launch and growth

- India only, Android first, for now. All five tabs in v1.
- Seed content: **clearly labelled house accounts** (for example "GoodHabits Studio") posting
  AI-made videos (ElevenLabs voices) across many niches. No fake "people" accounts or bots
  pretending to be users.
- Paid creators promote GoodHabits on their own channels with an #ad disclosure; creators
  apply by email; referral links earn them commissions for users they bring.
- Run with Claude doing as much of the building and operating as possible.

## Money (open: founder decision needed)

Zerodha's referral program came back on 1 June 2026 (Z-Connect, 10 June 2026): a referrer
earns 10% of the brokerage their referrals generate, plus 300 reward points per account
(points, not cash). Old referrals keep paying only if the referrer adds three new ones every
12 months. The catch for GoodHabits: equity delivery and direct mutual funds cost Rs 0
brokerage at Zerodha, so long-term investors, the users this app wants, earn us nothing. Only
intraday and F&O pay (at most Rs 2 an order to us). The post describes customers referring
friends. NSE's August 2024 circular says anyone referring clients must be an Authorised Person,
and the post doesn't say how a company or app fits. Ask Zerodha in writing before relying on
it. Founder's idea (29 Oct 2026, under review): keep Zerodha connect free and sell an AI stock teacher at Rs 500 a month with a demo account on delayed or historical prices; it must stay education, not advice (SEBI Jan 2025 rule for unregistered educators: no price data from the last three months naming a stock). Other options: become an Authorised Person, use another broker with a revenue share, or a
small paid plan. Kite Connect (the API) is separate and pays nothing. A future e-commerce idea
is parked.

## Risks to keep in view

- Revenue model above.
- Zerodha users must log in to Kite every day to trade (the access token expires at 6 AM);
  order APIs need a static IP; mutual fund orders and SIPs can't be placed by API.
- Google's Custom Search API is closed to new customers and shuts on 1 Jan 2027, so "our own
  search index" needs another engine (for example Vertex AI Search over approved sources, or a
  search API such as Brave's).
- Public trust ratings of news sources invite brigading and defamation complaints: rate limits,
  one rating per account, reviews moderated.
- Open DMs on a money app attract scams (app-social's three layers).
