# 10. Google, YouTube and AI-driven discovery for Indian e-commerce (2025-2026)

Prepared 30 Oct 2026 for SOLIDS FOR YOU (Amazon.in seller, small D2C brand).
Pass 1 written 30 Oct 2026. Pass 2 (verification) run the same day.

## Access note (read first)

- Pass 2 access: WebFetch failed for every host (DNS). The coordinator then pointed to the
  "How to fetch pages on pass 2" section of RULES.md, which uses curl through the proxy. With curl:
  - READ IN FULL (primary): blog.google India posts (AI Overviews 15 Aug 2024; AI Mode 24 Jun 2025;
    AI Mode rollout 8 Jul 2025; AI Mode and Search Live 8 Oct 2025; Search Live languages 27 Mar 2026;
    YouTube Shopping affiliate launch 25 Oct 2024; YouTube creator post with partner list and
    creator stats, 2026; India's Year in Search 2025 main page and A-to-Z list, 4 Dec 2025);
    support.google.com Merchant Center help (the Shopify-integration page, which covers free listings
    and the India country list; see the caveat under A); aboutamazon.in Rufus page; cxotoday.com
    (GoKwik/PayU ChatGPT storefront, 28 Jul 2026); medianama.com (Flipkart SLAP, 16 Jan 2026;
    AI Mode Hindi, 9 Sep 2025); techcrunch.com (Search Live, 8 Oct 2025); businesstoday.in (AI
    Overviews, 16 Aug 2024); inc42.com (Flippi, 4 Oct 2023); thinkwithgoogle.com (Brandcast 2025).
  - NOT REACHED: business-standard.com (403, policy denial; not retried); ppc.land, ahrefs.com,
    seerinteractive.com, searchengineworld.com, balistro.com and storyboard18.com (no connection);
    blog.youtube (guessed URL returned 404; the creator post was read from blog.google instead).
  - Google Trends: trends.google.com base page returned 200, but the explore page returned 429
    (rate limited). The explore page is JavaScript-rendered, so curl yields no data. NO Trends data
    is in this file.
- Each claim below is tagged: [Primary read] (the page was read in full), [Secondary read] (a press
  page was read in full), [Summary only] (only a search summary was seen), or [Still unverified].
- Nothing here was checked against a live Google Ads, Merchant Center or YouTube account.

## Key takeaways (after pass 2)

1. AI Overviews came to India on 15 Aug 2024 (Google India blog, primary read), in English and Hindi,
   with a bilingual toggle and text-to-speech. Business Today (16 Aug 2024, secondary read) matches.
2. AI Mode came to India through Search Labs on 24 Jun 2025, in English, on a custom Gemini 2.5
   model (primary read). On 8 Jul 2025 Google said it was rolling out to everyone in India with no
   Labs sign-up (primary read). Hindi and seven more languages followed (MediaNama, 9 Sep 2025,
   secondary read: five languages including Hindi rolled out "yesterday").
3. Search Live came to India on 8 Oct 2025, in English and Hindi, and was the first launch outside the
   US (primary read; TechCrunch 8 Oct 2025 secondary read). AI Mode added seven Indian languages
   (Bengali, Kannada, Malayalam, Marathi, Tamil, Telugu, Urdu). On 27 Mar 2026 Google expanded Search
   Live to every AI Mode language and location (primary read).
4. Free listings: the Merchant Center help page for the Shopify integration (primary read) lists
   India as a country where products can be listed free. Products are shown on the Shopping tab,
   YouTube, Google Search, Images and Lens, but the page says they are "not guaranteed to show".
   Shopify stores are opted in automatically; other accounts must confirm the opt-in in Merchant
   Center. The generic free-listings page was not read (see caveat under A).
5. Sponsored placements inside free listings in India: NOT confirmed. The primary Shopify help page
   says nothing about them. PPC Land's Apr 2026 report could not be opened (no connection).
6. YouTube Shopping affiliate launched in India on 25 Oct 2024 "starting with Flipkart and Myntra"
   (primary read). Partners in Google's 2026 creator post (primary read): Flipkart, Myntra, Nykaa,
   Purplle, Shopsy and Tira. Amazon (an expanded partnership), AJIO, Meesho, Snapdeal and Tata CLiQ
   "will roll out soon". Coverage dates the announcement to late Sep 2026 (secondary).
   Shoppers Stop is not on that list. The pass-1 claim that it joined in 2025 is now doubtful and
   unverified.
7. YouTube's own creator figures (primary read, footnoted in the 2026 creator post): average creator
   payouts up more than 160% year over year, "from Q1 2025 to Q1 2026"; over half of eligible
   creators enrolled as of May 2026; enrolled creators up over 200% as of June 2026. These are
   self-reported. Pass 1 had them right; this pass did not change them.
8. Google's Year in Search 2025 for India (primary read, 4 Dec 2025): Gemini was the No. 2 trending
   search; Saiyaara the top trending movie; "Earthquake near me" and "Air Quality near me" were
   trending Near Me queries; Labubu was "the viral collectible of the year". The page does not
   rank these Near Me queries, and the pass-1 "Labubu #1 collectible" was not confirmed. No shopping
   or brand list is in the primary text. Google also brought Virtual Apparel Try On to India
   (primary read, Year in Search page).
9. Amazon Rufus: Amazon's India page (primary read) says Rufus is available to all India customers
   in the Amazon Shopping app and on desktop, and that 1 crore+ customers have used it. The launch
   month (late Aug 2024 beta) comes from search summaries; the Business Standard article was not
   reachable.
10. ChatGPT storefront for Indian D2C brands (CXOtoday, published 28 Jul 2026, secondary read):
    GoKwik and PayU launched a multi-brand storefront inside ChatGPT. Brands live: Hyphen, Beardo and
    Kilrr, with "hundreds more" expected. Checkout uses UPI, cards, net banking and wallets through
    PayU, and runs on an "Agentic Commerce Protocol framework jointly built with PayU". GoKwik claims
    no engineering work and no separate listing fee. OpenAI is not named in the article body.
    Pass 1 said ChatGPT "added a shopping route"; that overstated OpenAI's role.
11. Flipkart's assistants: Flippi launched 4 Oct 2023, ChatGPT-based, English only at launch (Inc42,
    secondary read). Flipkart's replacement, Shop Like a Pro (SLAP), a standalone app, was reported
    for "next week" in Jan 2026 (MediaNama 16 Jan 2026, citing ET). No launch confirmation was found,
    so it is still unconfirmed as live.
12. Brandcast 2025 (Think with Google, secondary read): a Material survey commissioned by YouTube
    found 72% of Indian respondents said YouTube Shorts ads introduced them to brands or products,
    over 2x other short-form services. Vendor-commissioned, so rate it C for independent use.
13. Visibility pattern (C-rated and unverified in India): a clean merchant feed, Product and
    Organization schema, reviews and comparison mentions. No independent India case study with
    measured citation lift was found.
14. Organic clicks: the CTR losses from AI summaries (Ahrefs about -34%, Seer about -61%, Pew 8% vs
    15%) are US-centric and could not be re-read this pass. No India-measured study was found.
15. CPC and vernacular/voice share: still no authoritative India figure. Agency CPC ranges conflict
    (Rs 5-15, Rs 8-40, Rs 15-80) and could not be re-read. Vernacular share for 2025 was not found.

## Findings by sub-question

### A. Google Shopping, Performance Max, Demand Gen in India; free listings; CPC

- India is listed as a country where products can be listed for free on Google. [A, Google Merchant
  Center help, "Show your products for free on Google" (Shopify integration page), undated, 2026
  footer] [Primary read] https://support.google.com/merchants/answer/13692890?hl=en
  Caveat: the same article is also reached at answer/13427531. It is the Shopify-integration page.
  The generic free-listings page (the one pass 1 cited as 13692890 for the Shopping-tab rule) was
  not read, so "only approved products appear in the Shopping tab" is still [Summary only].
- Products are shown across Google, "such as on the Shopping tab, YouTube, Google Search (.com),
  Google Images, and Google Lens", but "aren't guaranteed to show". [A, same page] [Primary read]
- Shopify stores that set up the integration are opted in automatically. Accounts created outside
  Shopify must confirm the opt-in in Merchant Center. [A, same page] [Primary read]
- Sponsored placements inside free listings in India: [Still unverified]. PPC Land (20 Apr 2026)
  reported sponsored tiles; that page could not be reached. https://ppc.land/free-listings/
- Google's India Marketing Live (July 2025) announced AI tools for Indian marketers and said ads
  would begin appearing in AI Overviews in India later in 2025. The 6% digital-ad levy was scrapped
  from April 2025. [B, TechCrunch 9 Jul 2025] [Summary only]
  https://techcrunch.com/2025/07/09/google-brings-its-ai-powered-marketing-tools-to-india-after-google-tax-repeal
- Demand Gen: no India-specific rollout found. Global rollout Oct 2023. [B, flagged old]
  [Summary only] https://martech.org/google-ads-rolls-out-demand-gen-globally/
- CPC, India Shopping: Rs 5-15 for most categories. [C, undated agency blog] [Still unverified]
  https://megadigital.ai/en/blog/google-ads-cost-in-india/
- CPC, India D2C: Rs 15-80 (category Rs 45-80; branded about Rs 25). [C, Balistro, 25 Apr 2026]
  [Still unverified; Balistro not reachable] https://www.balistro.com/blog/performance-marketing-channels-ranked-d2c-india
- CPC, category keywords: Rs 8-40. [C, undated] [Still unverified]
- "Average shopping CPC of Rs 24" is derived from spend-per-capita, not click data. Do not use.
- PMax (non-India, C): Tinuiti Q1 2025 found PMax CPC about 13% above standard Shopping.
  [Still unverified]
- PMax learning phase: about 30+ conversions in 30 days. [C, undated agency blog] [Still unverified]
- Google-published India CPC benchmark: not found.

### B. Google AI Overviews and AI Mode in India; effect on clicks

- AI Overviews India: announced 15 Aug 2024 on Google's India blog (Hema Budaraju, Senior Director,
  Product Management, Search). "In India, we're rolling out AI Overviews in English and Hindi," with a
  bilingual toggle and text-to-speech. [A, primary read, 15 Aug 2024]
  https://blog.google/intl/en-in/products/explore-communicate/expanding-the-helpfulness-of-ai-overviews/
  Business Today, 16 Aug 2024, matches. [B, secondary read]
  https://www.businesstoday.in/technology/news/story/google-expands-ai-powered-search-overviews-to-india-see-details-441673-2024-08-16
  [Corrected: pass 1 cited the press date; the Google post is the primary.]
- AI Mode India: "starting today, as an experiment in Labs in English", 24 Jun 2025, on "a custom
  version of Gemini 2.5" (Hema Budaraju, VP Product Management, Search). [A, primary read, 24 Jun 2025]
  https://blog.google/intl/en-in/products/google-search-introducing-ai-mode-in-india/
  [Corrected: pass 1 cited a URL that is a 31 Aug 2023 Search Labs (SGE) post. That post is
  https://blog.google/intl/en-in/products/explore-communicate/bringing-search-labs-and-generative-ai-experiences-to-india/
  and it covered the 2023 SGE experiment, not AI Mode.]
- AI Mode, no Labs gate: 8 Jul 2025, "we're now starting to roll out the AI Mode experience in Google
  Search, with no Labs sign-up required", in English. [A, primary read, 8 Jul 2025]
  https://blog.google/intl/en-in/feed/ai-mode-in-google-search-rolling-out-in-india/
  [Corrected: pass 1 said "a few weeks later"; it was about two weeks after the Labs launch.]
- Hindi and five other languages for AI Mode: rolled out 8 Sep 2025 per MediaNama (9 Sep 2025),
  "Google Rolls Out Five New Languages For AI Mode, Including Hindi". [B, secondary read]
  https://www.medianama.com/2025/09/223-google-ai-expands-to-5-new-languages/
- Search Live and seven more AI Mode languages: 8 Oct 2025. "India will be the first country outside
  the U.S. to get this experience, available in both English and Hindi." AI Mode in Bengali, Kannada,
  Malayalam, Marathi, Tamil, Telugu and Urdu. [A, primary read, 8 Oct 2025]
  https://blog.google/intl/en-in/products/supercharging-search-for-india-new-languages-in-ai-mode-search-live-debuts/
  TechCrunch (8 Oct 2025) matches. [B, secondary read] https://techcrunch.com/2025/10/08/googles-search-live-comes-to-india-ai-mode-gets-more-languages
- Search Live expansion: 27 Mar 2026, to all languages and locations where AI Mode is available, on
  Gemini 3.1 Flash Live. Languages named include Bengali, Gujarati, Kannada, Malayalam, Marathi,
  Odia, Tamil, Telugu and Urdu. [A, primary read, 27 Mar 2026]
  https://blog.google/intl/en-in/products/explore-communicate/search-live-comes-to-more-indian-languages/
- Organic CTR effect (US data, C or B, not re-read this pass): Ahrefs Apr 2025 -34.5% CTR where AI
  Overviews appear; Seer Nov 2025 -61% organic and -68% paid; Pew Jul 2025 8% vs 15% clicks. [Still
  unverified; sources not reachable] https://ahrefs.com/blog?p=195053 ;
  https://www.seerinteractive.com/news/forbes-cites-seer-interactive-research-on-ai-overviews ;
  https://www.searchengineworld.com/pew-data-confirms-50-reduction-in-serp-click-through-rates
- Google disputes some of these methods. No India-measured CTR study was found.

### C. How products get cited in AI answers (ChatGPT, Gemini, Perplexity, Rufus, Flippi)

- Amazon Rufus in India: "now available to all India customers in the Amazon Shopping app and on
  desktop"; "1 crore+ customers" have used it. [A/Amazon, primary read]
  https://aboutamazon.in/news/retail/rufus-ai-shopping-assistant-launch-in-india
  Launch month (beta, late Aug 2024): [Summary only] per search results; Business Standard (20 Sep
  2024) returned 403 and could not be read.
- Rufus answers draw on listing details, customer reviews and Q&As (Amazon's own description in
  search summaries). [Summary only]
- Single unverified claim: Amazon blocks external AI crawlers from ChatGPT and Perplexity. [C, one
  source] [Still unverified]
- Flipkart Flippi: launched Wed 4 Oct 2023 ahead of The Big Billion Days; ChatGPT-powered; English only
  at launch. [B, Inc42, secondary read] https://inc42.com/buzz/flipkart-launches-chatgpt-powered-shopping-assistant-flippi
- Flipkart Shop Like a Pro (SLAP): MediaNama (16 Jan 2026, secondary read) reports Flipkart "will launch
  a new conversational AI shopping assistant called Shop Like a Pro (SLAP) next week, according to an
  Economic Times report", as a standalone app replacing Flippi. [B] Launch confirmation: [Still
  unverified]. https://www.medianama.com/2026/01/223-flipkart-conversational-ai-commerce-slap/
- GoKwik and PayU ChatGPT storefront (CXOtoday, 28 Jul 2026, secondary read): "India's first
  multi-brand D2C commerce experience integrated directly into ChatGPT". Brands live: Hyphen, Beardo,
  Kilrr. Payments: UPI, cards, net banking and wallets via PayU. Built on an "Agentic Commerce Protocol
  framework jointly built with PayU". GoKwik says merchants need "no engineering work" and pay "no
  separate listing fee"; brands keep catalogue and customer data. [B, company claims] Merchant counts
  conflict across sources (about 12,000 paying merchants per TechCrunch via Stellagent, versus "over
  15,000 brands" per GoKwik). [Still unverified]
  https://cxotoday.com/media-coverage/shop-directly-on-chatgpt-gokwik-and-payu-launch-indias-first-multi-brand-ai-storefront/
  [Corrected: OpenAI is not named in the article body. The five "OpenAI" hits are unrelated sidebar
  headlines. Pass 1's "ChatGPT added a shopping route" is replaced by this wording.]
- ChatGPT in India: OpenAI and Razorpay/NPCI agentic payments pilot, 9 Oct 2025. [B, not re-read]
  [Still unverified in pass 2] https://techcrunch.com/2025/10/09/india-pilots-ai-chatbot-led-e-commerce-with-chatgpt-gemini-claude-in-the-mix
- ChatGPT Instant Checkout (US first; Sep 2025): OpenAI says Instant Checkout items get no ranking
  boost. [B, not re-read] [Still unverified in pass 2]. Per a Stellagent piece (summary only), Instant
  Checkout was US-only, with international availability described as coming during 2026.
- Perplexity: cites sources inline and leans on editorial and comparison pages. [C] [Still unverified in India]
- Share of AI referral traffic: ChatGPT about 87%, Perplexity about 5.5% (single C chart).
  [Still unverified]
- Structured data: Balistro GEO guide (7 Jun 2026) and shopping guide (29 Jul 2026) say ChatGPT
  shopping depends on product metadata, merchant feed and reviews. [C] [Still unverified; Balistro not reachable]
- Agency playbook (Jun 2026): Organization, FAQPage and Product schema plus /llms.txt get Indian
  stores cited. The /llms.txt claim has no independent evidence. [C] [Still unverified]
  https://www.searchable.com/blog/d2c-ecommerce-ai-search-optimization-2026
- Schema adoption: about 31.3% of sites implement any schema (2025, C). [Still unverified]
- Princeton-linked GEO study (2024): credible citations raise AI visibility, about 115% per Yotpo
  summary. Academic, not India-specific. [C] [Still unverified]

### D. YouTube Shopping affiliate programme in India; YouTube Shorts for brands

- Launch: 25 Oct 2024, "starting with Flipkart, India's homegrown e-commerce marketplace and Myntra".
  Creators tag products in videos and earn when viewers buy on the retailer's site. Covers Shorts,
  long-form and livestreams. [A, Google India blog, primary read, 25 Oct 2024]
  https://blog.google/intl/en-in/products/platforms/youtube-shopping-affiliate-program-arrives-in-india/
- Partners in the 2026 creator post (primary read): "Amazon ... alongside welcoming new partners,
  AJIO, Meesho, Snapdeal and Tata CLiQ to the YouTube Shopping affiliate program, which will roll out
  soon, joining Flipkart, Myntra, Nykaa, Purplle, Shopsy and Tira." [A, primary read; date not in
  extract; coverage dates it late Sep 2026]
  https://blog.google/intl/en-in/products/platforms/helping-indian-creators-build-thriving-businesses-on-youtube-shopping/
  Nykaa and Purplle were added in 2025 per storyboard18 (summary only; storyboard18 not reachable).
  [Corrected: "Shoppers Stop" is not on the current list; its 2025 membership is now unverified.]
- Creator figures (primary read, footnoted): average creator payouts up more than 160% year over year,
  "from Q1 2025 to Q1 2026"; more than 50% of eligible creators enrolled as of May 2026; enrolled
  creators up over 200% as of June 2026. [A, YouTube-reported]
- Brandcast 2025 Shorts survey (Think with Google, secondary read): 72% of surveyed Indian respondents
  said YouTube Shorts ads introduce them to brands or products, "over 2X higher than other
  short-form video services." Material survey commissioned by YouTube. [A, vendor-commissioned]
  https://www.thinkwithgoogle.com/intl/en-apac/marketing-strategies/video/brandcast-2025-innovations-india
- Shoppable timestamp tags and Shorts stickers (IMPACT, Oct 2025). [B] [Still unverified; not reached]
- Eligibility: a secondary source says creators need the partner programme and 10,000+ subscribers.
  Repost, unverified; check YouTube's help pages. [C] [Still unverified]
- Hindi-specific creator data: not found.

### E. SEO patterns for Indian D2C sites

- No India-specific SEO study found. Patterns below are from C-rated GEO and SEO guides and are
  unverified:
  - Clean product feed, complete Product schema, Organization and FAQPage schema (C).
  - Visible reviews and third-party comparison mentions (C).
- Not searched in this run: Hindi and Hinglish keyword research, Google Business Profile,
  Indian-language landing pages.

### F. Search trends: what Indians search to shop

- Google Year in Search India 2025 (primary read, 4 Dec 2025, A-to-Z list):
  - Gemini: No. 2 trending search of the year.
  - Saiyaara: No. 1 trending movie search.
  - "Earthquake near me" and "Air Quality near me": trending Near Me queries (no rank stated).
  - Labubu: "the viral collectible of the year" (no rank stated; pass 1's "#1" not confirmed).
  - IPL: named in the list; "#1 overall" comes from a Statesman summary [Summary only].
  https://blog.google/intl/en-in/products/explore-communicate/indias-year-in-search-2025-the-a-to-z-of-trending-searches/
  Main page (primary read): Google brought Virtual Apparel Try On to India and says it lets people
  "virtually explore clothes from billions of listings right from your phone".
  https://blog.google/intl/en-in/products/explore-communicate/indias-year-in-search-2025/
- Shopping or brand list: not in the primary text. A Statista page "Most searched shopping queries on
  Google in India 2025" exists but is behind a login.
- Google Trends apparel searches for India: NOT USABLE. The explore page returned 429 (rate limit) and
  is JavaScript-rendered. No data retrieved.
- Vernacular and voice search: 2025 share not found. Old Google-KPMG 2016 data: 234 million
  Indian-language internet users versus 175 million English users. [B, old, c. 2017]
  https://www.exchange4media.com/digital-news/net-surfers-in-vernacular-languages-grew-from-42-million-in-2011-to-234-million-in-2016report-68691.html
- 2019 Google statement: nine in ten new internet users consume Indian-language content. Old. [B]
  https://inc42.com/buzz/internet-users-report-google

## Ranking / visibility mechanics

Labelled FACT and PATTERN.

- FACT (primary, Google help): free listings require a Merchant Center feed. Products are "not
  guaranteed to show", and matching relies on the data provided.
- FACT (primary, Google): Shopify stores opt in automatically; others confirm in Merchant Center.
- FACT (sourced, US data, not re-read): clicks to organic results drop where AI Overviews appear.
  The India-specific CTR effect was not measured.
- FACT (primary, YouTube): affiliate tags are the video-to-purchase path on partner retailer sites.
- FACT (company claim, secondary): GoKwik says D2C brands join the ChatGPT storefront with no separate
  listing fee.
- PATTERN (inference): product data quality (feed, schema, reviews) is the common input for Google
  Shopping, ChatGPT shopping and Rufus.
- PATTERN (inference): paid Shopping and PMax depend on conversion volume. A small brand may need
  enough budget to exit learning, or may get more from free listings and organic/AI visibility first.
- Unverified: Amazon restricts external AI crawlers. Do not plan around it until confirmed.

## What a small new D2C seller should do / avoid (pattern, labelled)

PATTERN (my inference, not a sourced rule):

- Do:
  - Turn on free Merchant Center listings for India and keep the feed clean (titles, GTIN or MPN,
    price, stock, images). Confirm the opt-in if the account was not created through Shopify.
  - Add Product and Organization schema and mark up reviews on the brand site. Cheap, and it helps
    every AI surface that reads the page.
  - Before any commitment to the GoKwik/PayU ChatGPT storefront, check its merchant terms (fees,
    catalogue ownership, Agentic Commerce Protocol compatibility). They are company claims.
  - Build a short set of YouTube Shorts with product tags only after the feed and site are clean.
    Track affiliate tags through partner merchants.
  - Test Shopping or PMax on a small budget, and measure cost per click against your own margins
    before scaling.
  - Write pages that answer "best X for Y" and "X vs Y" in plain language, with citations to
    reviews. These get used in AI answers (C-rated).
- Avoid:
  - Relying on Google CTR from AI-Overview-covered informational queries. Plan for lower organic
    clicks on those.
  - Trusting agency CPC ranges as budget inputs. Use your own account data.
  - Adding /llms.txt or similar tricks as a main strategy without evidence.
  - Assuming Rufus, ChatGPT or Flipkart Flippi/SLAP will show your listing without a clean feed and
    reviews.
  - Planning around Flipkart SLAP or the Amazon/AJIO/Meesho YouTube affiliate listings as live until
    confirmed.

## Open questions and conflicting claims

Pass 2 corrections (old -> new):
- AI Overviews India source: press date (16 Aug 2024) -> Google India blog 15 Aug 2024, primary read.
- AI Mode India URL: pass 1 cited a 2023 SGE post -> AI Mode launch post, 24 Jun 2025, primary read.
- AI Mode Labs gate: "a few weeks later" -> 8 Jul 2025, about two weeks after the Labs launch.
- AI Mode Hindi: Sep 2025 -> 8 Sep 2025 rollout of five languages including Hindi (MediaNama).
- Search Live India: "October 2025" -> 8 Oct 2025, English and Hindi; expanded 27 Mar 2026.
- Free listings India: "on the eligible-country list" -> confirmed on the Shopify-integration help page.
  The generic free-listings page, and the Shopping-tab-only rule, are still not read.
- YouTube partners: "Shoppers Stop followed in 2025" -> not on the 2026 partner list; unverified.
  Shopsy added to the partner list.
- YouTube expansion (Amazon, AJIO, Meesho, Snapdeal, Tata CLiQ): "date unconfirmed" -> coverage dates
  it late Sep 2026; primary says "will roll out soon".
- Creator payouts: pass 1 was correct ("Q1 2025 to Q1 2026", and "year over year"). Kept.
- Year in Search: "Labubu #1 collectible" -> "viral collectible of the year" (no rank). "Earthquake
  near me" -> named as a Near Me query, not ranked top.
- GoKwik/PayU ChatGPT: 29 Jul 2026 -> 28 Jul 2026; "ChatGPT added a shopping route" -> launched by
  GoKwik and PayU; OpenAI not named in the article body.
- Flipkart SLAP: spelt out as "Shop Like a Pro"; reported "next week" in Jan 2026; launch unconfirmed.
- Pass 1's Pew/Ahrefs/Seer figures: could not be re-read (sources not reachable).

Still open:
- CPC: Rs 5-15 (agency A) vs Rs 8-40 (agency C) vs Rs 15-80 (agency B). No authoritative India figure.
- Sponsored tiles in free listings for India: PPC Land (Apr 2026) not reachable; no India confirmation.
- Amazon blocking external AI crawlers: single unconfirmed source.
- Flipkart SLAP: no launch confirmation found after Jan 2026.
- Google-Flipkart AI shopping test (Sep 2026): URL only, unverified.
- ChatGPT: OpenAI-Razorpay/NPCI pilot (Oct 2025) and the GoKwik/PayU storefront (Jul 2026). The link is not confirmed. Merchant counts conflict (about 12,000 vs 15,000+).
- Eligibility of 10,000 subscribers for YouTube affiliate: repost, unverified.
- Google Trends apparel data: NOT usable (429 on the explore page; JavaScript-rendered).
- Gaps still open: India CPC benchmark from Google; voice and vernacular 2025 share; Hindi/Hinglish SEO data;
  Year in Search shopping list (Statista is behind a login); generic Merchant Center free-listings
  page (not read); Business Standard Rufus and YouTube Oct 2024 articles (403).

## Sources

Read status: "primary read" = page read in full; "secondary read" = press page read in full;
"summary only" = search summary only; "not reached" = no connection or 403.

1. https://blog.google/intl/en-in/products/explore-communicate/expanding-the-helpfulness-of-ai-overviews/ (15 Aug 2024, A, primary read)
2. https://businesstoday.in/technology/news/story/google-expands-ai-powered-search-overviews-to-india-see-details-441673-2024-08-16 (16 Aug 2024, B, secondary read)
3. https://blog.google/intl/en-in/products/google-search-introducing-ai-mode-in-india/ (24 Jun 2025, A, primary read)
4. https://blog.google/intl/en-in/feed/ai-mode-in-google-search-rolling-out-in-india/ (8 Jul 2025, A, primary read)
5. https://www.medianama.com/2025/09/223-google-ai-expands-to-5-new-languages/ (9 Sep 2025, B, secondary read)
6. https://blog.google/intl/en-in/products/supercharging-search-for-india-new-languages-in-ai-mode-search-live-debuts/ (8 Oct 2025, A, primary read)
7. https://techcrunch.com/2025/10/08/googles-search-live-comes-to-india-ai-mode-gets-more-languages (8 Oct 2025, B, secondary read)
8. https://blog.google/intl/en-in/products/explore-communicate/search-live-comes-to-more-indian-languages/ (27 Mar 2026, A, primary read)
9. https://blog.google/intl/en-in/products/explore-communicate/bringing-search-labs-and-generative-ai-experiences-to-india/ (31 Aug 2023, A, primary read; 2023 SGE post, not AI Mode)
10. https://blog.google/intl/en-in/products/platforms/youtube-shopping-affiliate-program-arrives-in-india/ (25 Oct 2024, A, primary read)
11. https://blog.google/intl/en-in/products/platforms/helping-indian-creators-build-thriving-businesses-on-youtube-shopping/ (2026, undated in extract, A, primary read)
12. https://support.google.com/merchants/answer/13692890?hl=en (undated, A, primary read; Shopify-integration page)
13. https://support.google.com/merchants/answer/13427531 (undated, A, primary read; same Shopify-integration page)
14. https://blog.google/intl/en-in/products/explore-communicate/indias-year-in-search-2025/ (4 Dec 2025, A, primary read)
15. https://blog.google/intl/en-in/products/explore-communicate/indias-year-in-search-2025-the-a-to-z-of-trending-searches/ (4 Dec 2025, A, primary read)
16. https://aboutamazon.in/news/retail/rufus-ai-shopping-assistant-launch-in-india (2026 page, A/Amazon, primary read; launch date not in extract)
17. https://cxotoday.com/media-coverage/shop-directly-on-chatgpt-gokwik-and-payu-launch-indias-first-multi-brand-ai-storefront/ (28 Jul 2026, B, secondary read)
18. https://www.medianama.com/2026/01/223-flipkart-conversational-ai-commerce-slap/ (16 Jan 2026, B, secondary read)
19. https://inc42.com/buzz/flipkart-launches-chatgpt-powered-shopping-assistant-flippi (4 Oct 2023, B, secondary read)
20. https://www.thinkwithgoogle.com/intl/en-apac/marketing-strategies/video/brandcast-2025-innovations-india (2025, A, secondary read; vendor-commissioned survey)
21. https://www.analyticsinsight.net/press-release/youtube-shopping-expands-merchant-ecosystem-and-unveils-new-ai-tools-as-payouts-to-indian-creator-surge-over-160 (2026, press release, summary only)
22. https://www.business-standard.com/technology/tech-news/youtube-shopping-expands-in-india-collaborates-with-flipkart-myntra-124102500420_1.html (25 Oct 2024, B, not reached: 403)
23. https://business-standard.com/technology/tech-news/amazon-india-launches-ai-chatbot-rufus-ahead-of-its-festive-sale-event-124092001308_1.html (20 Sep 2024, B, not reached: 403)
24. https://ppc.land/free-listings/ (Apr 2026, B/C, not reached)
25. https://techcrunch.com/2025/07/09/google-brings-its-ai-powered-marketing-tools-to-india-after-google-tax-repeal (9 Jul 2025, B, summary only)
26. https://martech.org/google-ads-rolls-out-demand-gen-globally/ (Oct 2023, B, old, summary only)
27. https://megadigital.ai/en/blog/google-ads-cost-in-india/ (2026, C, summary only)
28. https://www.balistro.com/blog/performance-marketing-channels-ranked-d2c-india (25 Apr 2026, C, not reached)
29. https://www.balistro.com/blog/generative-engine-optimization (7 Jun 2026, C, not reached)
30. https://www.balistro.com/blog/how-to-show-up-in-chatgpt-shopping (29 Jul 2026, C, not reached)
31. https://ahrefs.com/blog?p=195053 (Apr 2025, B, not reached)
32. https://www.seerinteractive.com/news/forbes-cites-seer-interactive-research-on-ai-overviews (Nov 2025, C/B, not reached)
33. https://www.searchengineworld.com/pew-data-confirms-50-reduction-in-serp-click-through-rates (Jul 2025, C, not reached)
34. https://www.searchable.com/blog/d2c-ecommerce-ai-search-optimization-2026 (2026, C, summary only)
35. https://storyboard18.com/brand-marketing/youtube-partners-with-nykaa-purplle-to-expand-shopping-affiliate-program-in-india-82360.htm (2025, B, not reached)
36. https://storyboard18.com/digital/razorpay-npci-partner-with-openai-for-agentic-payments-on-chatgpt-82299.htm (Oct 2025, B, summary only)
37. https://techcrunch.com/2025/10/09/india-pilots-ai-chatbot-led-e-commerce-with-chatgpt-gemini-claude-in-the-mix (9 Oct 2025, B, summary only)
38. https://nairametrics.com/2025/09/30/chatgpt-launches-instant-checkout-feature-for-users-to-shop-and-pay/ (30 Sep 2025, B, summary only)
39. https://stellagent.ai/insights/gokwik-payu-chatgpt-d2c-commerce (2026, B/C, summary only)
40. https://www.exchange4media.com/digital-news/net-surfers-in-vernacular-languages-grew-from-42-million-in-2011-to-234-million-in-2016report-68691.html (c. 2017, B, old, summary only)
41. https://inc42.com/buzz/internet-users-report-google (2019, B, old, summary only)
42. https://www.statista.com/statistics/1228366/india-index-for-search-volume-of-shopping-queries-on-google (2025, behind login; not readable)
43. https://trends.google.com/trends/explore?geo=IN (429 rate limit on explore page; base page 200; no data used)
44. https://ianslive.in/google-expands-search-live-globally-now-available-in-additional-indian-languages--20260327154215 (27 Mar 2026, B, summary only)
45. https://www.thestatesman.com/technology/google-year-in-search-2025-the-most-searched-people-places-and-events-in-india-1503521633.html (Dec 2025, B, summary only)
