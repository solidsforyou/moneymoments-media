# 09 - Meta (Instagram / Facebook / WhatsApp) for Indian D2C, 2025-2026 (PASS 2)

Research date: 30 Oct 2026. Pass 1: Haiku helper. Pass 2: Claude, 30 Oct 2026, fetching with curl through the agent proxy (WebFetch still fails DNS in this session; method per RULES.md "How to fetch pages on pass 2").

## Access in pass 2

**Primary pages read in full (curl):**
- engineering.fb.com, Andromeda retrieval, 2 Dec 2024: https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/
- engineering.fb.com, Andromeda GPU co-design, 28 Oct 2026: https://engineering.fb.com/2026/10/28/ml-applications/meta-andromeda-next-gen-ads-retrieval-gpu-co-design/
- developers.facebook.com, Advantage+ campaign experience (sales, app, leads), current: https://developers.facebook.com/docs/marketing-api/advantage-campaigns
- developers.facebook.com, Ad volume (per-Page ad limit): https://developers.facebook.com/documentation/ads-commerce/marketing-api/insights-api/ads-volume
- facebook.com/business/m/advantage-plus (Meta marketing page, date not shown): https://www.facebook.com/business/m/advantage-plus
- about.instagram.com, "Instagram Ranking Explained" (Adam Mosseri, updated 31 May 2023; the page we reached labels it the latest): https://about.instagram.com/blog/announcements/instagram-ranking-explained/
- about.instagram.com, "Shedding More Light on How Instagram Works" (8 Jun 2021, with 31 May 2023 update note): https://about.instagram.com/blog/announcements/shedding-more-light-on-how-instagram-works
- creators.instagram.com, "Rewarding original creators on Instagram" (30 Apr 2026): https://creators.instagram.com/blog/rewarding-original-creators-on-instagram
- creators.instagram.com, "Bringing more transparency to AI-generated profiles" (31 Aug 2026): https://creators.instagram.com/blog/ai-generated-profile-label
- creators.instagram.com, "New ways to earn: making Reels shoppable" (24 Mar 2026, note updated Oct 2026): https://creators.instagram.com/blog/new-ways-to-earn-making-reels-shoppable
- ASCI, "ASCI's Guide for Social Media Influencers" (2024 PDF, read via pdftotext): https://www.ascionline.in/social/wp-content/uploads/2024/03/ASCIs-Guide-For-Influencers-1.pdf

**Not reached:**
- Meta Business Help Centre articles (learning phase, Advantage+ sales, "About managing ad volume"). The help index is JavaScript-rendered, and search did not return the article URLs. Their wording is still unverified.
- Mosseri's Jan 2025 post and any 2025-2026 official ranking post. No such page was found on the reachable Instagram sites. The 2023 post is the latest we could read.
- asci.social/guidelines (ASCI's live guidelines site; host did not resolve).
- socialmediatoday.com, exchange4media.com, upgrowth.in: the proxy refused the connection (not allowed for this session). Their claims below stay unverified.
- engineering.fb.com's 2024 post contains no statement on creative diversity; that claim still rests on secondhand reports.

**Tags used:**
- **Verified in pass 2**: confirmed on a primary page read in pass 2 (URL above).
- **Corrected**: old text, then new text, with the primary source.
- **Still unverified**: no primary page, or sources conflict.

---

## Key takeaways

1. **Andromeda is Meta's retrieval stage: tens of millions of eligible ads are narrowed to a few thousand candidates per person, then ranking models choose the final ads (Verified in pass 2, Meta engineering, 2 Dec 2024).** Retrieval uses a custom deep network with "a meaningful increase of model capacity (10,000x)". Reported effects: +6% recall and +8% ads quality on selected segments. [Corrected: pass 1 said "10,000x model complexity"; the post says model capacity.]
2. **Meta's post ties the candidate pool to creative volume, not to creative replacing audience targeting (Verified in pass 2).** The post says generative tools helped advertisers make "hundreds of millions of new ads", and Andromeda uses a hierarchical index to handle creative growth. The claim that creative is the main targeting input is still expert PATTERN (Loomer and others), not a Meta statement. [Corrected: the primary supports "more creative means a bigger candidate pool", not "creative is the targeting".]
3. **Advantage+ sales campaigns are the successors of Advantage+ shopping (ASC) and app campaigns (AAC) (Verified in pass 2, Meta developer docs).** Creating ASC campaigns through the API ends at v25.0. ASC campaigns with more than 50 ads in one ad set cannot be migrated into Advantage+ sales. [Corrected: pass 1 said "50-ad cap on Advantage+ sales". The primary states a 50-ad limit for migrating ASC; a general 50-ad cap on Advantage+ sales ad sets is still unverified.]
4. **Migrating or copying an ASC or AAC campaign into Advantage+ format sends it back into the learning stage, and there is no workaround for the learnings (Verified in pass 2, Meta developer docs).** Plan new structures from scratch rather than migrating running campaigns.
5. **Learning phase: "about 50 optimisation events per ad set per 7 days" is still unverified.** The Business Help article was not reached. Jon Loomer reported seeing a 10-events-in-3-days threshold in Ads Manager, later reverting. Use Ads Manager's learning status as the test.
6. **Meta's own Advantage+ marketing page says "22% higher ROAS with a 17-32% lower cost per purchase using Advantage+ Shopping Campaigns" (Meta marketing page, source credited to WARC/Fospha, date not shown).** Treat as Meta's own claim, not independent. [Corrected: pass 1 said "32% ROAS and 17% lower CPA", from a blog.]
7. **Mosseri's official ranking post (updated 31 May 2023) names different Reels signals from pass 1 (Verified in pass 2).** For Reels, the most important predictions are how likely you are to reshare, watch all the way through, like, and visit the audio page. In Explore: likes, saves and shares. [Corrected: pass 1's "watch time, likes, sends (Jan 2025)" is not in this official post.] The Jan 2025 claim and the 3-5x sends weight remain unverified. Do not use them.
8. **Instagram's originality rule (official, 30 Apr 2026, Verified in pass 2): accounts that mainly post unoriginal photos, carousels or reels are ineligible for recommendations.** They regain eligibility when most of their recent posts are original over a rolling 30 days; standing shows in Account Status, with an appeal option. Instagram says 75% of US recommendations now come from original posts. [Corrected: pass 1 said reposting accounts lose recommendations; the official rule covers aggregators, and the scope now includes photos and carousels.] The "10 or more reposts in 30 days" cut-off is NOT in the official post. Reject it.
9. **AI-generated profile label (official, 31 Aug 2026, Verified in pass 2).** The AI creator label is renamed "AI-generated profile". Profiles that feature an AI-generated person and do not carry the label will have their reach limited. [Corrected: pass 1 said "no official announcement found"; it now is found.] Our rule: if the founder or a reel features an AI-generated person, label it.
10. **ASCI guide (2024, Verified in pass 2): labels must be upfront and prominent (for example 'Ad'), not hidden under a group of hashtags, and a blanket disclosure in the bio is not enough.** For Instagram: put the label in the visible caption, or on the image or video itself if only that is seen. [Verified.]
11. **ASCI guide on platform tags (Verified in pass 2): "in addition to disclosure labels, consider using platform disclosure features such as 'paid partnership' or 'sponsored' tags".** The tag supplements a label; it does not replace one. [Corrected: pass 1 said ASCI accepted the tag "as an alternative" since Feb 2022. The 2024 guide says "in addition". The 2022 press item was not reached.]
12. **ASCI enforcement (Verified in pass 2):** ASCI does not impose fines or penalties. Non-compliant cases can be escalated to government and sector regulators. ASCI uses AI tools under NAMS to monitor paid influencer posts and publishes complaint reports.
13. **ASCI's label list is still unverified.** The 2024 guide tells creators to choose a label "from the various options provided in the guidelines", which are on asci.social/guidelines (not reached). Pass 1's 2021 list and a search summary's five-label list (#ad, #collab, #promo, #sponsored, #partnership) conflict. Use 'Ad' or #Ad, which the guide does name, and check the live guidelines before using any other label.
14. **Shoppable Reels (official, 24 Mar 2026, updated Oct 2026, Verified in pass 2).** Creators use "Add products" in the share sheet: tag any product in a business's Meta commerce catalog, or paste a product URL, including affiliate links. Up to 30 products per Reel; individual items only, not collections. The Oct 2026 note lists India among 26 markets; the sentence reads "enabled this capability for feed posts and across 26 markets", so its exact scope is not clear. [New in pass 2. Pass 1's "20 products per post, 30 per Reel" came from a vendor doc; the 30-per-Reel figure now matches the official post.]
15. **Ad volume (Verified in pass 2, Meta developer docs): the per-Page ad limit counts ads that are running or in review.** Large creative sets count toward it, so plan volume per Page.
16. **Meta's India click-to-WhatsApp data remains unverified and conflicting on date.** The "doubled in India" claim is from press. Pass 1 dated it to Oct 2023; a pass 2 search summary dates it to Q3 2025. Vendor CPL and conversion benchmarks disagree and are unverified. Meta has published no CTWA benchmark that we reached.
17. **India CPM, CPC and CPA ranges are still unverified.** upGrowth could not be reached (proxy refused). Agency ranges disagree 2-3x. Use own account data.

---

## Findings by sub-question

### 1. How Meta's ad system works now

- **Andromeda (Verified in pass 2, engineering.fb.com 2 Dec 2024).** Retrieval, the first stage, "selects ads from tens of millions of ad candidates into a few thousand relevant ad candidates". Ranking models then pick the final ads. Deployment across Instagram and Facebook gave +6% recall and +8% ads quality on selected segments. [Corrected: pass 1's "10,000x model complexity" → "10,000x model capacity".]
- **Andromeda in 2026 (Verified in pass 2, engineering.fb.com 28 Oct 2026).** Meta says Andromeda has delivered a 2.4% increase in conversions on Facebook since 2025. The 2024 system evaluates "tens of millions of ads per second per GPU card"; the new system is built for multi-billion ads per second. The post links larger Advantage+ automation and generative ad creative to growth in eligible ads. It does not give creative guidance for advertisers.
- **Advantage+ creative (Verified in pass 2, Meta 2024 post).** Meta reports that advertisers who had not used Advantage+ creative and turned on its AI-driven targeting saw a 22% ROAS increase (Meta's estimate). Meta estimates about +7% conversions for businesses using image generation. These are Meta estimates, not independent tests.
- **Creative as targeting (PATTERN).** Expert blogs (Loomer, admetrics) argue retrieval matches people to ads largely on what the creative shows. Meta's primary posts do not say so. Loomer warns that 50 near-duplicates are not guaranteed to work.
- **Creative diversity (still unverified).** Pass 1 cites a Meta spokesperson, via Marketing Brew, calling diversification a long-running best practice with no number. No primary source reached.
- **Creative Similarity and Creative Diversity scores (still unverified).** One search summary says a similarity score above 60% triggers retrieval suppression (admetrics 2025 analysis). Pass 1's "Creative Diversity score, 26 Aug 2026" is single-source (commonthreadco). Neither is confirmed by Meta.
- **Advantage+ sales (Verified in pass 2, developer docs).** The updated form of ASC and AAC. Advantage+ audience is required for the Advantage+ criteria; Advantage+ placement is default; budget set at campaign level with a supported bid strategy. Creating new ASC campaigns through the API ends at v25.0.
- **50-ad limit (partly verified).** The developer docs say ASC campaigns with more than 50 ads in one ad set cannot be migrated to Advantage+ sales. A general cap of 50 on Advantage+ sales ad sets is not stated in what we read. [Corrected: "50-ad cap on Advantage+ sales" → "50-ad migration limit for ASC; general Advantage+ sales cap unverified".]
- **6 creatives per ad set (still unverified).** Pass 1 cites Jon Loomer quoting "About Managing Ad Volume" (6 or fewer). Other sources cite 5 (AdManage) or say the advice does not apply to Advantage+. The Business Help article was not reached.
- **Learning phase (still unverified).** About 50 optimisation events per ad set per 7 days, per secondary sources. Ad sets short of this show "Learning limited". Loomer's Ads Manager observation of 10 in 3 days is unconfirmed.
- **Advantage+ performance claims (Meta marketing, not independent).** Meta's Advantage+ page: 22% higher ROAS and 17-32% lower cost per purchase on Advantage+ Shopping campaigns (source credited to WARC/Fospha). Partnership Ads page: 53% more incremental conversions, CPA down 35% (also Meta's own page). Conversions API page: 24% increase in incremental conversions from better attribution. Meta's page is marketing; treat as claims.
- **Migration costs learning (Verified in pass 2).** Moving an ASC or AAC campaign into Advantage+ format forces the learning stage. Copy also. No workaround.
- **Advantage+ can underperform for niche or high-ticket products (PATTERN).** Some guides say manual, tightly controlled campaigns still win for these products. Not a Meta statement.

### 2. India CPM / CPC / CPA benchmarks

- **upGrowth, Instagram Ads Pricing India 2026 (C, agency).** Still unverified: the site could not be reached (proxy refused the connection).
  - CPM: beauty Rs 180-320; fashion Rs 140-280; electronics/home Rs 120-250; Reels Rs 45-140.
  - CPC: general D2C Rs 8-25; beauty Rs 15-40; regional-language tier-2 Rs 4-12.
  - Purchase cost: Rs 450-1,200; electronics/home Rs 500-1,400.
- **Bosswallah (C).** Photo-ad CPC Rs 5-30; Reels CPC Rs 10-50; CPA Rs 85-580 (mixes objectives). Still unverified.
- **Generic range (C, undated).** CPM Rs 45-350; CPC Rs 8-35. Conflicting. Still unverified.
- **Global reference (C).** Reels CPM USD 3-9.5. Not India.
- **Caveat.** No government, Meta or independent India benchmark found. Use own account data.

### 3. Creative formats for D2C in India

- **Hinglish and regional creative (PATTERN, vendor-claimed).** Vendors (Koro, Lapis) say it lowers CAC in tier-2/3. Lapis's 3-5x engagement and 20-36% CPA drop cite "Facebook India data" with no link. Still unverified.
- **Market size (C, unverified).** Regional-language internet users about 540 million; Hindi about 201 million. Likely the KPMG-Google study; not reached.
- **AI-generated UGC in Hinglish (C, vendor).** No independent D2C case with Meta metrics found.
- **Founder-led vs UGC vs creator-led (not found).** No sourced India comparison.
- **Academic (B, title only).** MICA 2025 paper on Hinglish in advertising. Findings not seen.

### 4. Instagram organic ranking, 2025-2026

- **Official ranking post (Verified in pass 2, Mosseri, 31 May 2023 update).** Ranking is per surface. Feed and Explore: the most important actions predicted are likes, saves and shares. Reels: the most important predictions are reshare, watch all the way through, like, and go to the audio page. Signals include your activity, information about the post and about the poster, and your history with the poster. [Corrected: pass 1's "Mosseri Jan 2025: watch time, likes, sends" is not in this official post.]
- **Jan 2025 "watch time, likes, sends" (still unverified).** Pass 1 cites socialmediatoday (not reached). Several blogs repeat it. Not found on any reachable official page.
- **Sends weight 3-5x (NOT VERIFIED).** Do not use.
- **2026 signal order (still unverified).** Some blogs say DM shares outrank likes from Jan 2026. Not confirmed by a primary page.
- **Originality (Verified in pass 2, creators.instagram.com, 30 Apr 2026).** Extends the Reels originality rules to photos and carousels. Accounts that primarily post unoriginal content in those formats are ineligible for recommendations across Instagram. Eligibility returns when most recent posts (photos, carousels and reels) are original over a 30-day rolling window. Standing shows in Account Status; appeals are possible. Original posts supply 75% of US recommendations. The "10 reposts in 30 days" rule is not in the post. [Corrected: "10 reposts" → rejected.]
- **AI-generated profile label (Verified in pass 2, creators.instagram.com, 31 Aug 2026).** Renamed from "AI creator". Profiles that feature an AI-generated person without the label get reduced reach. Creators who merely use AI tools in production need no label. [Corrected: pass 1 said no announcement found; now found.]
- **Trial Reels (still unverified; press only).** 1,000+ followers and a public account (per press reports of Mosseri's confirmation, BetaNews 14 Jul 2025). Some guides say professional accounts qualify at 200 followers; not confirmed. Check in-app. Test window about 72 hours, with non-followers only; excluded from hashtag pages, Explore and the profile grid during the test.
- **Reels length for non-follower recommendation (single source).** Up to 3 minutes. Unverified.

### 5. Influencer marketing in India

- **Rates by tier (C, sources disagree; not re-checked).**
  - Nano (1K-10K): Rs 2,000-8,000 per Reel (Tring); others Rs 1,000-12,000.
  - Micro (10K-100K): Rs 5,000-80,000; Reels Rs 15,000-60,000 in one guide.
  - Macro (100K-1M): Rs 84,000-7.9 lakh (one source); up to Rs 12 lakh (another).
  - Still unverified. Ask each creator for a rate card.
- **Market size (B/C).** "Nearing Rs 5,000 crore" (Deccan Chronicle, date not shown). Still unverified.
- **Platforms (Winkl, Plixxo, Qoruz).** Pricing mostly not found. Qoruz paid plans from about Rs 15,000/month (one comparison site). Winkl ownership conflicts. Ask vendors.

### 6. ASCI influencer guidelines (current text)

- **Guide read (Verified in pass 2, ASCI's Guide for Social Media Influencers, 2024 PDF).**
  - A disclosure is required for all brand promotions with a material connection (monetary or non-monetary): paid posts, free or discounted products, affiliate links or codes, barter, employment or family ties.
  - Use upfront, prominent labels such as 'Ad'. Use a clear, legible font for superimposed labels. Do not hide labels under a group of hashtags. Do not put blanket disclosures in the profile bio.
  - Instagram: include the label in the visible caption; if only the image or video is seen (Reels, Stories), include it in the image or video itself.
  - Disclose even when reviews are unbiased. Do not promote a product you have not tried.
  - Platform features ("paid partnership", "sponsored") are in addition to labels.
  - Guidelines apply to influencers with 1K followers as well as 10M.
  - ASCI imposes no penalties or fines itself; it can escalate to government and sector regulators. NAMS uses AI tools to monitor paid influencer posts and publishes complaint reports.
- **Label list (still unverified).** The guide points to the "options provided in the guidelines" at asci.social/guidelines (not reached). Pass 1's 2021 list (Advertisement, Ad, Sponsored, Collaboration, Partnership, Employee, Free gift) and a 2026 law-firm list (#Ad, #Sponsored, #Paid, #Partnership) conflict with a five-label list in a search summary. Do not rely on any single list.
- **Enforcement data (B, press, not reached).** LinkedIn advisory Jan 2025; FY25 14% of flagged ads tied to influencers (date unconfirmed); Aug 2025 code update covering media companies' paid posts on their own handles (date per summary).
- **AI influencers (single source).** The 2026 law-firm post says AI virtual influencers need an AI disclosure plus the paid label. Not confirmed by ASCI.

### 7. Click-to-WhatsApp (CTWA)

- **Global (B, press; not reached).** Meta Q3 2025 results: click-to-WhatsApp ad revenue up about 60% year on year.
- **India (B, conflicting date).** Zuckerberg: click-to-message ad revenue in India doubled year on year; over 60% of WhatsApp users in India message a business weekly. Pass 1 dated this to the Oct 2023 call (sentinelassam). A pass 2 search summary dates the same words to Q3 2025. Still unverified as to date.
- **Message pricing India (C, vendor).** Marketing about INR 0.86; utility about INR 0.12 (Jan 2026). One vendor source.
- **Benchmarks (vendor, conflicting).** "3-5x conversion vs lead ads" and "92% lower CPL" from different vendors. Still unverified.
- **Measurement (C, consistent across guides).** Send conversions back via the Conversions API and capture the ctwa_clid. Without this you see only "conversations started".

### 8. Instagram shopping in India

- **Shoppable Reels (Verified in pass 2, creators.instagram.com, 24 Mar 2026, updated Oct 2026).** "Add products" in the share sheet. Tag any product in a business's Meta commerce catalog, or paste a product URL (affiliate links supported). Up to 30 products per Reel; individual items only. The Oct 2026 note lists India among 26 markets, though the wording on which feature that covers is unclear. [New in pass 2.]
- **Feed-post tags.** Pass 1's "20 products per feed post" came from a vendor doc. Not verified.
- **Checkout.** In-app checkout was US-first (search summary). For other markets, tags open the brand's own checkout. No 2026 India in-app checkout found.
- **India access (C, Shopify community, old).** Instagram Shopping in India was limited to managed clients. Date unknown.

---

## Ranking / visibility mechanics

- **Paid (Verified in pass 2, Meta 2024 post).** Retrieval narrows tens of millions of eligible ads to a few thousand candidates; then ranking and the auction choose. Eligible-ad volume grows with creative and Advantage+ automation.
- **Paid (PATTERN).** Advantage+ pools budget and learning across creatives and placements. Migrating a campaign resets learning (verified). Low purchase volume can keep ad sets in "learning limited" (secondary).
- **Organic, Reels (Verified in pass 2, Mosseri 2023 post).** Reshare, full watch, like and audio-page visits are the top predicted actions. Shares matter in Explore and Reels.
- **Organic, originality (Verified in pass 2, Instagram 30 Apr 2026).** Aggregator content is ineligible for recommendations; original posts over 30 days restore eligibility.
- **Organic, AI-generated people (Verified in pass 2, Instagram 31 Aug 2026).** Unlabelled AI-person profiles get reduced reach.
- **Organic (PATTERN).** Trial Reels let a new account test a Reel on non-followers first (press-level detail only).

---

## What a small new D2C seller should do / avoid (PATTERN, labelled)

**Do:**
- Make 5-8 distinct creative concepts. Andromeda's candidate pool grows with creative variety (verified), but advice on the number of creatives per ad set is not confirmed. [Verified basis for variety; number unverified.]
- Do not migrate running ASC or AAC campaigns to Advantage+ if you care about learning; build new campaigns. [Verified.]
- Start with a controlled campaign while volume is low. Move to Advantage+ once the ad set has enough conversions. [PATTERN; learning threshold unverified.]
- Post originals: founder-shot, real product use, own voice. Do not repost others' Reels or carousels. [Verified: Instagram's 30 Apr 2026 rule.]
- Label any AI-generated person in content, and check the AI-generated profile label if the profile features one. [Verified: Instagram's 31 Aug 2026 rule.]
- Disclose every paid, gifted or affiliate post: label 'Ad' in the visible caption (or on the image or video if only that is seen), and add the platform paid-partnership tag in addition. Do not hide the label under hashtags or bury it in the bio. [Verified: ASCI 2024 guide.]
- Use shoppable Reels (up to 30 products) if the catalogue is in Meta's commerce system. [Verified.]
- Test Hinglish or regional creative against English in your own account. Do not assume vendor lift numbers. [PATTERN.]
- Budget from own data. Use the India ranges only as a starting band. [PATTERN.]
- Use click-to-WhatsApp where a human conversation adds value. Send conversions back via the Conversions API. Check Meta's current India messaging rates. [PATTERN.]

**Avoid:**
- Treating the 3-5x sends multiplier, the 10-reposts cut-off, the 60% similarity cut-off, or the Jan 2025 Mosseri order as facts. [Unverified or not in official sources.]
- Treating Meta's marketing percentages (22% ROAS, 53% more conversions) as independent results. [Meta's own claims.]
- Using US or global CPM benchmarks for India. [C.]
- Buying influencer posts without a written rate card. [PATTERN.]
- Posting undisclosed paid content. [Verified: ASCI guide; enforcement via NAMS.]

---

## Open questions and conflicting claims

1. **Meta Business Help Centre articles not reached.** Learning phase, Advantage+ sales structure and limits, "About managing ad volume". Need the article URLs (the help index is JavaScript-rendered) or a host that serves them.
2. **Mosseri's Jan 2025 signals and 3-5x sends weight.** No primary found. Official 2023 post names different signals.
3. **2026 signal order (shares vs likes vs watch time).** Conflicting; unverified.
4. **Trial Reels eligibility (1,000 vs 200 professional followers).** Conflicting; press only.
5. **Learning phase threshold (50 events per 7 days vs 10 in 3 days).** Conflicting; Business Help not reached.
6. **Creative similarity 60% threshold, Creative Diversity score (26 Aug 2026).** Unverified.
7. **Creative diversity spokesperson statement (Marketing Brew via relevantaudience).** Not reached.
8. **ASCI label list.** 2021 list vs 2024 guide reference vs 2026 law-firm list. Need asci.social/guidelines.
9. **ASCI "paid partnership" tag status.** Resolved for the 2024 guide ("in addition to"). The 2022 press item is not reached.
10. **Click-to-WhatsApp India "doubled" figure: 2023 or Q3 2025?** Conflicting dates. Need the source article.
11. **India CPM/CPC/CPA benchmarks.** upGrowth and Bosswallah not verified; agencies disagree 2-3x.
12. **Hinglish/regional lift (3-5x, 20-36%).** Vendor claim, no link.
13. **Founder-led vs UGC vs creator-led ranking for Indian D2C.** No sourced comparison.
14. **Shoppable Reels India scope.** The Oct 2026 note lists India among 26 markets for "this capability"; scope ambiguous.
15. **Influencer rates.** Conflicting; need quotes.

---

## Sources

Ratings: A = official, B = reputable press, C = blog/agency/vendor. "Read" = page read in pass 2. "Snippet" = search summary only. Dates as shown.

Read in pass 2 (primary):
1. https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/ (2 Dec 2024) [A; read]
2. https://engineering.fb.com/2026/10/28/ml-applications/meta-andromeda-next-gen-ads-retrieval-gpu-co-design/ (28 Oct 2026) [A; read]
3. https://developers.facebook.com/docs/marketing-api/advantage-campaigns (current; date not shown) [A; read]
4. https://developers.facebook.com/documentation/ads-commerce/marketing-api/insights-api/ads-volume (current) [A; read]
5. https://www.facebook.com/business/m/advantage-plus (date not shown) [A marketing page; read]
6. https://about.instagram.com/blog/announcements/instagram-ranking-explained/ (31 May 2023) [A; read]
7. https://about.instagram.com/blog/announcements/shedding-more-light-on-how-instagram-works (8 Jun 2021; update note 31 May 2023) [A; read]
8. https://creators.instagram.com/blog/rewarding-original-creators-on-instagram (30 Apr 2026) [A; read]
9. https://creators.instagram.com/blog/ai-generated-profile-label (31 Aug 2026) [A; read]
10. https://creators.instagram.com/blog/new-ways-to-earn-making-reels-shoppable (24 Mar 2026; updated Oct 2026) [A; read]
11. https://www.ascionline.in/social/wp-content/uploads/2024/03/ASCIs-Guide-For-Influencers-1.pdf (2024) [A; read]

Not reached in pass 2 (blocked or not found):
12. https://asci.social/guidelines [A; host did not resolve]
13. https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/ [B; proxy refused]
14. https://www.exchange4media.com/ (ASCI and CTWA articles) [B; proxy refused]
15. https://upgrowth.in/instagram-ads-pricing-india-2026/ [C; proxy refused]
16. Meta Business Help Centre articles (learning phase; Advantage+ sales; ad volume) [A; URLs not found]

Snippets (pass 1 and pass 2 search summaries, not read):
17. https://www.jonloomer.com/meta-andromeda/ (date not shown) [C]
18. https://www.jonloomer.com/qvt/learning-phase-10-or-50-events/ (date not shown) [C]
19. https://www.1clickreport.com/blog/meta-advantage-plus-campaign-setup-2026 (2026) [C]
20. https://betanews.com/2025/07/14/instagram-opens-up-trial-reels-feature-to-more-creators/ (14 Jul 2025) [B]
21. https://www.sansalegal.com/post/asci-influencer-advertising-guidelines-2026-disclosure-rules-for-paid-content-and-ai-influencers (2026) [C]
22. https://www.eclincher.com/articles/how-the-instagram-algorithm-works-in-2026 (2026) [C]
23. https://creatorflow.so/blog/instagram-algorithm/ (2026) [C]
24. https://www.admetrics.io/post/meta-andromeda-ads-retrieval-explained (date not shown) [C]
25. https://relevantaudience.com/meta/meta-ad-creative-diversification-same-hook-same-ad/ (date not shown) [B/C]
26. https://commonthreadco.com/blogs/coachs-corner/metas-new-creative-diversity-score-is-live-in-ads-manager-what-ecommerce-brands-must-act-on-now (26 Aug 2026 per source) [C]
27. https://bosswallah.com/blog/creator-hub/instagram-ads-cost-in-india-2026-how-much-should-you-actually-spend/ (2026) [C]
28. https://www.youngurbanproject.com/instagram-ads-cost-in-india/ (date not shown) [C]
29. https://sentinelassam.com/business/revenue-from-click-to-message-ads-in-india-has-doubled-meta-founder-672693 (conflicting date) [B]
30. https://www.exchange4media.com/digital-news/whatsapp-powers-metas-q3-surge-as-click-to-chat-ads-spike-60-148883.html (Q3 2025) [B]
31. https://www.exchange4media.com/advertising-news/paid-partnership-tag-acceptable-alternative-to-disclosure-labels-for-influencer-ads-asci-118473.html (Feb 2022) [B]
32. https://www.exchange4media.com/digital-news/asci-issues-advisory-to-linkedin-influencers-disclose-ads-or-face-action-140078.html (Jan 2025) [B]
33. https://www.exchange4media.com/influence-zone-news/14-of-flagged-ads-in-fy25-linked-to-influencer-violations-asci-143887.html (date unconfirmed) [B]
34. https://www.inc42.com/buzz/new-influencer-marketing-guidelines-mandating-disclosure-on-promotional-content-to-be-effective-from-june-14/ (June 2021) [B]
35. https://www.grynow.in/blog/asci-guidelines-for-influencer-marketing-in-india.html (date not shown) [C]
36. https://haulpack.com/blog/asci-guidelines-for-influencers (date not shown) [C]
37. https://www.community.shopify.com/t/how-can-i-enable-the-instagram-shop-feature-in-india/107462 (date not shown) [C]
38. https://www.tring.co.in/brands/blogs/influencer-marketing-cost-in-india-list (date not shown) [C]
39. https://www.deccanchronicle.com/amp/business/indias-influencer-marketing-boom-industry-nears-5000-crore-as-regional-creators-rise-1970876 (date not shown) [B/C]
40. https://getkoro.app/blog/ai-ugc-video-in-hinglish-voice-lipsync-guide-for-indian-brands-2026 (2026) [C]
41. https://www.trylapis.com/resources/indian-language-ai-ads-guide (date not shown) [C]
42. https://ir.mica.ac.in/entities/publication/17b86fb2-f287-431a-82cb-8fd7abadb2d2/full (2025) [B/academic]
43. https://www.outlookbusiness.com/news/business-messaging-whatsapp-engines-of-growth-biz-digitisation-driving-headroom-meta-india-head (date not shown) [B]
44. https://www.elev8or.io/blog/best-influencer-marketing-platforms-in-india (date not shown) [C]
45. https://www.cbinsights.com/company/winkl (date not shown) [C]
46. https://www.naiknaik.com/?p=4165 (date not shown) [C]
47. https://beastoftraal.com/2025/02/19/linkedin-brand-partnership-label-vs-asci-guidelines/ (Feb 2025) [C]
