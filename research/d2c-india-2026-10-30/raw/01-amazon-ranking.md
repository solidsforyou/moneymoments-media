# Amazon.in search and discovery ranking, 2025-2026 (raw research)

Sweep date: 30 Oct 2026. Topic: how Amazon.in search and discovery rank products.

## Read this first: coverage limits

- **Amazon's own seller pages were not reachable in this sweep.** `sell.amazon.in` and `www.aboutamazon.com` failed DNS resolution in this cloud session (getaddrinfo ENOTFOUND). Both need to be allowed in session network settings before any official Amazon.in claim can be checked. Nothing below is sourced to an Amazon Seller Central page.
- **Web search hit a rate limit** (`too_many_requests`) on several queries, so COSMO, Rufus-in-India and the official "how search works" angle are thin. Items marked "not found" were not covered by any result, not checked and disproved.
- **Most sources are rated C** (seller-tool vendors, agencies, podcasts). Almost all ranking-mechanics claims are C. Several sources are US-focused. Few results carry a visible date, so dates are given as "date not shown" where none was captured.
- Two Amazon official-looking results appeared in search but could not be fetched: `aboutamazon.in` (seller experience in Hindi and Tamil) and `press.aboutamazon.com/in/2021/9/...` (Marathi/Bengali/voice shopping). The second is dated Sept 2021, so it is older than Jan 2025 and flagged as possibly outdated.

## Key takeaways

1. **Amazon publishes no ranking formula, A9, A10 or otherwise, in any source reached here.** "A9" and "A10" are seller-community names for the search ranking system. Every weighting below is C-rated folklore. [C]
2. **Several vendors describe A10 as the successor to A9, with more relevance and machine-learning weight.** Sources disagree on timing: one says A10 went live in the US by 2026, another says there is no clear line between A9 and A10. Treat "A10 is a new system" as unconfirmed. [C, conflicting]
3. **The most repeated performance signals across sources are:** sales velocity, conversion rate, click-through rate, reviews and ratings, keyword relevance, and price competitiveness. Sources agree on this list, but none gives weights. [C, multiple sources agree]
4. **Less repeated signals:** external traffic (social, blogs), FBA/Prime eligibility, and seller reputation. Each appears in one or two sources only. Treat as one-off claims. [C, one-off]
5. **Buy Box:** sources say availability, seller reliability and a clean seller record (on-time shipping, valid tracking, low negative feedback) matter about as much as price. One source says the lowest price no longer guarantees the Buy Box. No India-specific Buy Box rule was verified. [C]
6. **Stock-outs cost the Buy Box.** One source says running out of stock means automatic Buy Box loss. Another says Amazon tightened FBA storage limits in May 2025. Both are C and unverified against Amazon. [C, one source each]
7. **Listing suppression has a documented-by-vendors path:** Seller Central > Inventory > Manage All Inventory > Suppressed filter. Common causes cited: missing or failing main image, missing identifiers (UPC/MPN), thin or incomplete details, prohibited words in title or content, and category-specific rules. [C, several sources agree]
8. **Suppressed listings do not trigger a notification, per one source,** so sellers have to check the Suppressed filter themselves. [C, one-off]
9. **Rufus is Amazon's generative AI shopping assistant.** Vendors say it answers shopper questions from listing content, so listings that do not answer common questions clearly risk being skipped in favour of competitors. This is inference from vendor sources, not Amazon guidance. [C]
10. **Rufus's status and India rollout are conflicting.** One 2026 source says Amazon retired Rufus on 13 May 2026 and replaced it with "Alexa for Shopping"; other sources from the same period still describe Rufus as live. A source also lists India among the rollout markets, but no fetched page confirmed it. Treat both as unverified. [C, conflicting]
11. **"Honeymoon" for new listings is folklore.** Vendor guides describe a 30-60 day early-visibility window driven by early sales. A 2026 launch guide says the window is not officially documented. A debunking podcast says sales-velocity manipulation no longer works as it once did. [C, conflicting]
12. **Hindi and regional languages: no 2025-2026 evidence found** that search ranks Hindi listings or Indian-language content differently. Amazon.in's own press (dated 2021) describes regional-language shopping and Hindi voice search, not ranking. [A-dated-2021, outdated]
13. **Suppressed or not, the highest-value check for a new seller is the Suppressed filter and the listing's required attributes.** This is the one area where the sources are concrete and consistent.

## Findings by sub-question

### 1. A9 vs A10 vs newer semantic/AI ranking (COSMO, Rufus, Amazon's Choice, Best Seller, Sponsored)

- A10 is described as relevance-first, using NLP and machine learning on search behaviour, descriptions and external signals. [C, bebolddigital.com/blog/amazon-a10-search-algorithm-for-seo, date not shown]
- A10 described as a late-2025 rollout, fully live in the US by 2026. [C, sellersprite.com/en/blog/Amazon-SEO-How-the-A10-Algorithm-Works-in-2026, date 2026 per title; conflicting claim below]
- No clear line between A9 and A10; the terms are used loosely. [C, adbrew.io/blog/amazon-a10-algorithm, date not shown]
- COSMO: "not found" in this sweep. Background knowledge only (Amazon has described it as an ML system for relevance); not verified here, so not used as a fact.
- "Amazon's Choice" and "Best Seller" badge logic: **not found** in this sweep. The searches did not return a source on badge eligibility.
- "Sponsored" slot logic (Sponsored Products auction, bid and relevance): **not found** as a sourced claim in this sweep.

### 2. Signals that matter

- Sales velocity: listed as a key signal by several vendors (myamazonguy.com; interodigital.com; sellersprite honeymoon post). [C, multiple, dates not shown]
- Conversion rate: listed by interodigital.com (date not shown) and others. [C]
- CTR: "not found" as a separately sourced weight; it appears in the generic lists only. [C]
- Keyword relevance (title, bullets, backend terms): listed as a relevance driver. [C, myamazonguy.com, interodigital.com]
- Price competitiveness: listed in vendor lists; the Buy Box sources say it is not sufficient alone. [C, feedvisor, cahoot]
- Buy Box and seller reliability: "lowest price no longer guarantees Buy Box"; reliability and availability matter. [C, cahoot.ai/amazon-buy-box-strategy/ and feedvisor.com/resources/amazon-trends/how-to-win-buy-box-2025, dates not shown]
- Reviews and ratings: listed as a performance signal. [C, sellerlogic.com/en/blog/amazon-a10-algorithm]
- FBA / Prime: one source says FBA gets preferential treatment via Prime eligibility. [C, one-off, adbrew.io]
- Stock-outs: lose Buy Box. [C, one-off]
- Storage limits: May 2025 change, reduced from 6 to 5 months of forecasted sales. [C, one-off, unverified]
- Returns: "not found" as a ranking input in this sweep.
- External traffic: one or two sources say off-Amazon traffic helps. [C, one-off, myamazonguy.com; sellerlogic.com]
- Brand Registry, A+ content, video: A+ and comparison tables are cited as Rufus-friendly content. [C, suntecindia.com/blog/?p=10448; sellermetrics.app/amazon-listing-optimization-for-rufus/]. Brand Registry and video ranking effects: "not found".

### 3. How Rufus picks products and how sellers optimise for it (India)

- Rufus does not simply match keywords; vendors say it uses listing content to answer shopper questions. [C, interodigital.com/blog/rufus-will-recommend-your-competitor-if-your-amazon-listing-doesnt-answer-the-question/, date not shown]
- Suggested tactics: clear answers to likely questions, use-case framing, structured specs, A+ content, comparison tables. [C, suntecindia.com (2026), sellermetrics.app (2026 guide), sellerlabs.com (2026)]
- India-specific Rufus guidance: **not found.** No fetched source gives India listing rules.
- Rufus status: see takeaway 10. [C, conflicting]
- The "Rufus expansion" timeline (US July 2024; later UK, India, Germany, France, Italy, Spain, Canada): one source lists this; the URL was not captured in the search output. [unverified, no URL]

### 4. New listings: honeymoon or not

- 30-60 day boost window described by seller guides; early sales treated as the lever. [C, sellersprite.com/en/blog/How-to-Boost-Ranking-for-New-Products-Honeymoon-Period, date not shown]
- Cold-start evaluation uses attributes from the new item setup form and compares with similar products. [C, code3.com/resources/honeymoon-period-decoded-the-truth-behind-amazons-cold-start-algorithm/, date not shown]
- The window is not officially documented; the 2026 launch guide says it exists in tracked launches, which is not a verified claim. [C, ainfluencer.com/how-to-launch-a-product-on-amazon/, 2026 per title]
- Debunking view: relying on the honeymoon is risky; relevance and real-time data matter more. [C, Helium 10 podcast "The Maldives Honeymoon" episode, date not shown; sellersessions podcast]
- India-specific honeymoon data: **not found.**

### 5. Amazon.in vs Amazon.com differences

- Hindi and regional languages: Amazon.in shoppers can search by Hindi voice on Android (2020-2021 era). [Amazon press, press.aboutamazon.com/in/2021/9, dated Sept 2021 -- outdated; A but old]
- Seller tools: Amazon.in lets sellers run their business in eight languages (Bengali, Gujarati, Hindi, Kannada, Marathi, Malayalam, Telugu, Tamil, plus English). [Udayavani news, date not shown; B-level press, not Amazon-verified]
- Hindi and Tamil seller experience for Amazon Global Selling (US marketplace first): [aboutamazon.in/news/small-business/amazon-enables-seller-experience-in-hindi-and-tamil-for-indian-exporters-to-sell-globally, date not shown; A-rated official but not fetched]
- Regional-language search ranking: **not found.** No source says Hindi-language listings or Hindi queries rank differently.
- Voice search: Hindi voice search on Android (2021 Amazon press). Ranking effects not found.
- COD: **not found** as a ranking input in this sweep.
- Amazon.in reach: Amazon says tens of millions of regional-language customers and 90% of them from tier 2 and below cities (2021 press, outdated). [A, dated 2021]

### 6. Buy Box rules on Amazon.in

- No India-specific Buy Box rule was found in any reached source. All sources are US-focused or generic. [C]
- Generic eligibility claims (C, feedvisor, wiseppc, titannetwork): professional seller account; on-time shipping; valid tracking rate; low negative feedback. [C, dates not shown]
- Valid Tracking Rate guidance revised, effective 15 Jan 2025, changing scan requirements for seller-fulfilled offers. [C, source named in a search result, URL not captured -- verify on Seller Central before relying on it]
- Handling time: a US-focused vendor says Amazon moved FBM premium-shipping offers to 0-day handling in Oct 2025. [C, US-focused, unverified, URL not captured]

### 7. What gets listings suppressed

- Common causes (C; several sources agree): missing or failing main image; missing UPC/MPN or identifiers; missing category or thin details; prohibited phrases in title or content; category-specific rules (consumables, jewellery, health and personal care named). [C, suntecindia.com/blog/?p=6739; sellersprite.com/en/blog/listing-suppression-common-causes-and-how-to-fix-them; bebolddigital.com/blog/amazon-listing-suppressed; dates not shown]
- Where to check: Seller Central > Inventory > Manage All Inventory > Suppressed filter; the Fix Your Products page lists issues. [C, several vendor guides, date not shown]
- Fix path: correct, save, wait for re-evaluation; one source says 24-72 hours; appeal via Seller Central if flagged wrongly. [C, one source for the 24-72 hours claim]
- A category-limit change in 2025-2026: one blog claims it changed twice; unverified.

## Ranking / visibility mechanics (how things show up and why)

Labelled PATTERN (inference from several C sources, not Amazon-confirmed):

- Search visibility appears to combine relevance (listing text and attributes matching the query, via a semantic or NLP layer) with performance (sales, conversion, CTR, reviews, price, availability). Vendors agree on the inputs but not the weights. PATTERN, C.
- A new listing is judged first on its attributes against similar products, then on early performance. This suggests a complete, accurate listing is the first lever. PATTERN, C, from code3 and the honeymoon sources.
- Buy Box depends on availability and seller health, not just price. PATTERN, C, from several sources.
- Rufus (where live) probably favours listings whose content answers common questions, which overlaps with the relevance work above. PATTERN, C.

## What a small new D2C seller should do / avoid (pattern, labelled)

Do (PATTERN, built from C sources, none Amazon-verified):

- Fill every required attribute on the listing form, with a main image that meets Amazon's rules. Check the Suppressed filter in Seller Central weekly.
- Write the title, bullets and backend terms to answer the questions a buyer would ask (size, material, use case, what is in the box). Add A+ content and a comparison table.
- Keep stock in the FBA warehouse to avoid stock-outs, which can cost the Buy Box.
- Keep tracking, shipping and feedback clean from day one, since the Buy Box depends on seller health.
- Plan for early sales velocity, but do not treat the "honeymoon" as a strategy. Build off-Amazon traffic to the listing, since that claim has some support.
- Verify each rule on Seller Central India before acting, because the official pages were not reached in this sweep.

Avoid (PATTERN):

- Buying or faking reviews or sales velocity. Several sources say this no longer works and risks suspension (not verified as an Amazon policy here).
- Keyword stuffing titles, which is a common suppression cause.
- Relying on US-only tactics (0-day handling, US storage limits) without checking the India rules.

## Open questions and conflicting claims

1. **Is A10 a new system or just a relabel of A9?** Sources conflict (sellersprite: late-2025 rollout; adbrew: no clear line). Unresolved. Needs Amazon confirmation, which was not reachable.
2. **Is Rufus still live?** One 2026 source says Amazon retired it on 13 May 2026 for "Alexa for Shopping". Other sources from the same period still describe it as live. Unresolved. The source for the retirement claim had no URL captured.
3. **Does Rufus run in India?** One source lists India as a rollout market; the source URL was not captured. Unverified.
4. **Is the honeymoon real?** Sources conflict. Unresolved.
5. **COSMO, Amazon's Choice, Best Seller badge, Sponsored slot logic:** not found in this sweep. Needs a rerun once search quota resets and Amazon's pages are reachable.
6. **India-specific Buy Box, COD, Hindi ranking:** not found. Needs Amazon.in seller documentation.
7. **Valid Tracking Rate revision (15 Jan 2025) and 0-day handling (Oct 2025):** claims exist but were sourced only via search summaries; verify on Seller Central India before relying on them.
8. **Storage limit change (May 2025, 6 to 5 months):** single C source, unverified.

## Sources

Rating key: A = official, B = reputable press, C = blog/agency/tool vendor. Dates are the visible date or "date not shown". Dates before Jan 2025 are flagged.

1. https://myamazonguy.com/seo/amazon-a10-search-algorithm/ -- C -- date not shown (A10 overview, relevance and sales factors; external traffic claim)
2. https://www.sellerlogic.com/en/blog/amazon-a10-algorithm/ -- C -- date not shown (reviews, seller reputation, external traffic)
3. https://getresults.interodigital.com/blog/the-ultimate-guide-to-amazon-seo-everything-you-need-to-know-to-dominate-amazon-search/ -- C -- date not shown (conversion, sales velocity, reviews list; search result title says 2025)
4. https://adbrew.io/blog/amazon-a10-algorithm -- C -- date not shown (FBA/Prime claim; no clear A9/A10 line; seller history)
5. https://www.bebolddigital.com/blog/amazon-a10-search-algorithm-for-seo -- C -- date not shown, title says 2025 (AI/NLP claim)
6. https://www.sellersprite.com/en/blog/Amazon-SEO-How-the-A10-Algorithm-Works-in-2026 -- C -- title says 2026 (late-2025 rollout claim)
7. https://www.cahoot.ai/amazon-buy-box-strategy/ -- C -- title says 2025 (Buy Box rules)
8. https://feedvisor.com/resources/amazon-trends/how-to-win-buy-box-2025 -- C -- title says 2025 (Buy Box, price not sufficient)
9. https://www.suntecindia.com/blog/?p=10448 -- C -- title says 2026 (Rufus listing optimisation)
10. https://sellermetrics.app/amazon-listing-optimization-for-rufus/ -- C -- title says 2026 (Rufus guide; A+ and tables)
11. https://www.interodigital.com/blog/rufus-will-recommend-your-competitor-if-your-amazon-listing-doesnt-answer-the-question/ -- C -- date not shown (Rufus answers listing questions)
12. https://www.sellerlabs.com/blog/amazon-rufus-ai-listing-optimization-2026/ -- C -- title says 2026 (4-step Rufus method)
13. https://www.suntecindia.com/blog/?p=6739 -- C -- date not shown (suppression causes and fixes)
14. https://www.sellersprite.com/en/blog/listing-suppression-common-causes-and-how-to-fix-them -- C -- date not shown (suppression causes; Suppressed filter path)
15. https://bebolddigital.com/blog/amazon-listing-suppressed -- C -- date not shown (suppression causes)
16. https://www.sellersprite.com/en/blog/How-to-Boost-Ranking-for-New-Products-Honeymoon-Period -- C -- date not shown (30-60 day window, early sales)
17. https://code3.com/resources/honeymoon-period-decoded-the-truth-behind-amazons-cold-start-algorithm/ -- C -- date not shown (NIS attributes, cold start)
18. https://ainfluencer.com/how-to-launch-a-product-on-amazon/ -- C -- title says 2026 (honeymoon not officially documented)
19. https://www.helium10.com/podcast/the-maldives-honeymoon-amazon-launch-strategy-version-8-0/ -- C -- date not shown (honeymoon skepticism)
20. https://press.aboutamazon.com/in/2021/9/amazon-in-expands-regional-language-offering-with-marathi-bengali-will-soon-launch-voice-shopping-in-hindi -- A (official press) -- dated Sept 2021, OUTDATED (regional languages, Hindi voice search, 90% tier 2 and below)
21. https://www.aboutamazon.in/md/news/small-business/amazon-enables-seller-experience-in-hindi-and-tamil-for-indian-exporters-to-sell-globally -- A (official) -- date not shown; not fetched (Hindi/Tamil seller experience for Global Selling, US first)
22. https://udayavani.com/?p=1122647 -- B (regional press) -- date not shown (eight-language seller tools; not verified against Amazon)
23. https://www.sellersprite.com/en/blog/amazon-rufus-vietnam-sellers-2026 -- C -- title says 2026 (Rufus; not India-specific; not used for India claims)
24. https://www.sellersprite.com/en/blog/amazon-a10-algorithm-keyword-strategy-2025 -- C -- title says 2025 (keyword strategy; listed, not used for weights)

Not reached (blocked or failed in this session):
- https://sell.amazon.in/ and https://sell.amazon.in/grow-your-business/amazon-buy-box -- DNS failure (getaddrinfo ENOTFOUND). Needs sell.amazon.in in session network settings.
- https://www.aboutamazon.com/news/retail/how-to-use-rufus -- DNS failure. Needs www.aboutamazon.com in session network settings.
- COSMO, Sponsored slot and Amazon's Choice queries -- search rate-limited (too_many_requests) for the COSMO and "official search ranking" queries.
