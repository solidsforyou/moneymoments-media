# 09 - Meta (Instagram / Facebook / WhatsApp) for Indian D2C, 2025-2026 (PASS 2)

Research date: 30 Oct 2026. Pass 1 by a Haiku helper; pass 2 (verification) by Claude, 30 Oct 2026.

**Access limits (read this first).** In pass 2, WebFetch failed with DNS errors (ENOTFOUND) for every primary and press host tried: engineering.fb.com, ascionline.in, www.facebook.com (Business Help), about.instagram.com, socialmediatoday.com, exchange4media.com, upgrowth.in. The session's network allowlist still blocks them. So **no primary page was read in pass 2**. Verification below comes from WebSearch result summaries (secondary sources that quote the primary pages), and those are labelled "corroborated, secondary". Nothing here is "verified against the primary page". To close that gap, add to the session's allowed hosts: engineering.fb.com, www.facebook.com (Business Help Centre), developers.facebook.com, about.instagram.com, creators.instagram.com, www.ascionline.in, www.socialmediatoday.com, www.exchange4media.com, upgrowth.in.

Tags used in this file:
- **Corroborated (secondary)**: at least one search summary of a secondary source agrees with the claim. Primary page not read.
- **Corrected**: old text, then new text.
- **Still unverified**: no usable source found, or sources conflict.

---

## Key takeaways

1. **Creative is the main targeting input on Meta (PATTERN, corroborated secondary).** Andromeda is Meta's retrieval stage. Search summaries of Meta's Dec 2024 engineering post say it narrows "tens of millions" of ad candidates to "a few thousand" per user. The shortlist is driven by what the ad shows. [Corrected: pass 1 said "10,000x increase in model complexity"; the summary says "10,000x increase in model capacity". Primary still not read.]
2. **Creative diversity is a long-running Meta best practice (corroborated secondary).** Near-identical ads can be counted as one ad. No number is given by Meta in any source found. Treat "5-8 distinct concepts" as our rule of thumb, not Meta's.
3. **Meta Business Help says 6 or fewer creatives per ad set is recommended, per Jon Loomer's reading of "About Managing Ad Volume" (corroborated secondary, not read).** Hard cap of 50 ads per ad set on Advantage+ sales campaigns (corroborated across several blogs, not Meta's page).
4. **Advantage+ sales campaigns replaced Advantage+ shopping (corroborated secondary).** Advantage+ budget is on by default and spreads spend across ad sets. Turning it off with manual ad-set budgets can take the campaign out of Advantage+. [Corrected: pass 1 said "default for new campaigns in 2026, merged manual flow, AI default". The "replaced" part is corroborated; "AI optimisation default" is only from one agency guide.]
5. **Learning phase: about 50 optimisation events per ad set per 7 days (corroborated secondary, still unverified against Meta).** Several guides cite the Business Help Centre. Jon Loomer reported seeing a 10-events-in-3-days threshold in Ads Manager, then the old rule return. No official change found. "Learning limited" flag shows in Ads Manager. [Still unverified as to current official threshold.]
6. **Broad targeting plus varied creative is vendor consensus, not a Meta document (PATTERN).** Do not present it as Meta guidance.
7. **India CPM and CPC benchmarks are agency-only and conflict (still unverified).** The upGrowth 2026 figures (CPM beauty Rs 180-320, fashion Rs 140-280, Reels Rs 45-140; CPC Rs 8-25 general D2C; purchase cost Rs 450-1,200) could not be re-read because the site did not resolve. Other guides give Rs 45-350 CPM. Use only as a starting band.
8. **Mosseri's Jan 2025 top signals are watch time, likes and sends (corroborated secondary; the 22 Jan 2025 date is from one source).** Sends matter more for non-followers; likes matter more for connected content. The "3-5x sends weight" is NOT verified and conflicts with "slightly more" wording. Do not use it.
9. **2026 ranking order is disputed (still unverified).** Some 2026 blogs say DM shares now outrank likes, and that a December 2025 "Your Algorithm" feature exists. One source says Mosseri keeps stressing shares. Neither is confirmed by a primary page.
10. **Originality is a stated Instagram ranking goal for 2026 (corroborated secondary).** Enforcement specifics (30 Apr 2026 scope for photos and carousels; "10 reposts in 30 days" cut-off; 31 Aug 2026 AI-label date) are single-source and still unverified. Do not plan around them.
11. **Trial Reels: 1,000+ followers is the figure most sources give (corroborated secondary).** Press reports say Mosseri confirmed access for public creator and business accounts with 1,000+ followers. Launched or widened July 2025 per BetaNews (14 Jul 2025). Some guides say professional accounts qualify at 200 followers. That is NOT confirmed. Check in-app. [Corrected: pass 1 said "1,000+ since July 2025"; the 1,000 figure now has press support, the 200-follower tier conflicts.]
12. **ASCI disclosure is mandatory on paid influencer posts; the platform "Paid partnership" tag is an accepted supplement, not a replacement (corroborated secondary).** Search summaries of the ASCI guide say to put a visible label (for example #ad) and not hide it under a group of hashtags. A one-time bio disclosure is generally not enough. Pass 1 said the platform tag was accepted "as an alternative" since Feb 2022; a conflicting Grynow blog says the tag alone is not sufficient. [Corrected: see ASCI section.]
13. **Click-to-WhatsApp India signal: Meta says click-to-message revenue in India doubled year on year (corroborated secondary, date conflicting).** Pass 1 dated this to the Oct 2023 call (sentinelassam). A pass 2 search summary attributes the "doubled" and "60% of WhatsApp users message a business weekly" figures to the Q3 2025 call. The two cannot both be right without reading the source. [Still unverified as to date.]
14. **Click-to-WhatsApp conversion and CPL benchmarks are vendor claims that disagree (still unverified).** Vendor ranges run from "3-5x conversion" to "92% lower CPL". Meta publishes no benchmark. India WhatsApp marketing rate about INR 0.86 per message and utility about INR 0.12 (one vendor source, Jan 2026). Rely on your own test data.
15. **Instagram shopping in India is limited (corroborated secondary, mostly old).** In-app checkout is US-first. Outside the US, product tags open the brand's own checkout (search summary, 2026 guide). Tagging: up to 20 products on a feed post, 30 on a Reel (vendor doc). No 2026 India checkout announcement found.

---

## Findings by sub-question

### 1. How Meta's ad system works now (Andromeda, Advantage+, creative as targeting, diversity, learning phase)

- **Andromeda is the retrieval stage before ranking and the auction (corroborated secondary).** The Dec 2024 Meta engineering post, as summarised in search results: retrieval narrows "tens of millions of ad candidates" to "a few thousand relevant ad candidates"; reports +6% recall and +8% ads quality on selected segments; ads are organised into nested clusters. [Primary engineering.fb.com NOT read (DNS blocked). Figures are from a search summary only.] [Corrected: pass 1 said "10,000x increase in model complexity". Summary says "model capacity".]
- **Creative as targeting (PATTERN, expert blogs).** Analyses by Jon Loomer and others argue retrieval matches people to ads largely on what the creative depicts. Loomer warns that 50 near-duplicates are not guaranteed to work. Differentiation (different pain points, personas, emotional triggers, formats) matters more than count. [C; jonloomer.com/meta-andromeda/, date not shown.]
- **Creative diversity (corroborated secondary).** Meta's spokesperson calls diversification a long-running best practice, with no number and no date for updated guidance. Near-identical ads can be treated as one. [relevantaudience.com citing Marketing Brew; not fetched.]
- **Creative Similarity / Diversity score.** One search summary says a similarity score above 60% triggers retrieval suppression, citing a 2025 admetrics analysis. Meta has not been found to confirm it. [Still unverified.] Pass 1's "Creative Diversity score (Low/Medium/High), launched 26 Aug 2026" is single-source (commonthreadco) and still unverified.
- **Advantage+ sales campaigns (corroborated secondary).** Replace Advantage+ shopping. Ad sets capped at 50 ads (the older format allowed 150 per campaign). Meta's own recommendation of 6 or fewer creatives per ad set, per Loomer reading "About Managing Ad Volume" (not read). Advantage+ budget on by default. [1clickreport and admanage.ai blogs; Meta Help Centre not read.]
- **Performance claims (unverified).** Vendor guides cite ROAS +32% and CPA -17% vs manual; a Meta global study cited as about 12% lower cost per purchase for Advantage+ shopping. Meta's own caveat: results are estimates. [Still unverified.]
- **Advantage+ can underperform for niche or high-ticket products (PATTERN).** Stackmatix and other guides note tightly controlled manual campaigns still win for some niche or high-price products. [C.]
- **Broad targeting (PATTERN, vendor consensus).** Blogs say broad with Advantage+ audiences is the default starting point. Not a Meta document.
- **Learning phase (corroborated secondary, unverified against Meta).** About 50 optimisation events per ad set per 7 days. Ad sets short of this show "Learning limited". Jon Loomer saw a 10-events-in-3-days threshold in Ads Manager and called it a test or early rollout; the old rule later returned. Budget guide formula used by some vendors: (target CPA x 50) / 7 per day. [Pass 1 said "not found". Now found, but only via secondary sources.] [Corrected: "Learning phase thresholds: not found" becomes "about 50 events per 7 days, secondary only".]

### 2. India CPM / CPC / CPA benchmarks

- **upGrowth, Instagram Ads Pricing India 2026 (C, agency; https://upgrowth.in/instagram-ads-pricing-india-2026/). Still unverified: site did not resolve in pass 2.**
  - CPM: beauty Rs 180-320; fashion Rs 140-280; electronics/home Rs 120-250; Reels Rs 45-140.
  - CPC: general D2C Rs 8-25; beauty Rs 15-40; regional-language tier-2 Rs 4-12.
  - Cost per purchase: Rs 450-1,200; electronics/home Rs 500-1,400. WhatsApp lead-form CPL Rs 120-280.
- **Bosswallah, 2026 (C).** Photo-ad CPC Rs 5-30; Reels CPC Rs 10-50; CPA Rs 85-580 (mixes lead and purchase objectives, so not comparable). Still unverified.
- **Generic range (C, undated).** CPM Rs 45-350; CPC Rs 8-35. Conflicting. Still unverified.
- **Global reference (C).** Reels CPM USD 3-9.5; CPC USD 0.4-1.5. Not India.
- **Caveat (PATTERN).** No government, Meta or independent India benchmark found. Use own account data before budgeting.

### 3. Creative formats that work for D2C in India

- **Hinglish and regional-language creative (PATTERN, vendor-claimed).** Vendors (Koro, Lapis) say it lowers CAC in tier-2/3. Lapis's 3-5x engagement and 20-36% CPA drop cite "Facebook India data" with no link. Still unverified.
- **Market size (C, unverified).** Regional-language internet users about 540 million; Hindi about 201 million (38%). Likely KPMG-Google Indian Languages study, not read.
- **AI-generated UGC in Hinglish (C, vendor).** No independent D2C case study with Meta metrics found.
- **Founder-led vs UGC vs creator-led (not found).** No sourced India comparison.
- **Academic (B, title and date only).** MICA 2025 paper on Hinglish in advertising. Findings not seen.

### 4. Instagram organic ranking, 2025-2026

- **Mosseri's January 2025 signals (corroborated secondary).** "The top three signals that matter most for ranking are watch time, likes and sends." Look at average watch time, likes per reach and sends per reach in Insights. Date 22 Jan 2025 per one source. [socialmediatoday.com, not read; search summary only.] [Primary Mosseri post or about.instagram.com not read.]
- **Sends and non-followers (corroborated secondary).** Likes are slightly more important for connected content; sends slightly more for unconnected content. [creatorflow.so, C.]
- **Sends per reach definition (B).** Out of everyone who saw the post, how many sent it by DM. [searchenginejournal, not read.]
- **The 3-5x sends weight (NOT VERIFIED).** Conflicts with "slightly more". Do not use.
- **Watch time has two parts (C).** Relative (share of video watched) and absolute (seconds).
- **Shares and the 2026 order (still unverified).** Some blogs say DM shares outrank likes from Jan 2026. One says Mosseri stresses shares. Not confirmed by a primary page.
- **Originality (corroborated secondary for the priority).** Year-end memo (31 Dec 2025, per other sources) lists "Continue to improve ranking for originality." Memo not read.
- **Originality enforcement (still unverified).** 30 Apr 2026 scope for photos and carousels; accounts mostly reposting lose recommendations; "10 or more reposts in 30 days" excludes from Explore and Reels (one source); AI-generated persons without label get limited reach from 31 Aug 2026 (no Instagram announcement found).
- **Trial Reels (corroborated secondary).** Public creator and business accounts with 1,000+ followers can test a Reel with non-followers for about 72 hours before sharing it with followers. Reel is excluded from hashtag pages, Explore grid and profile grid during the test. Launch month: July 2025 (BetaNews, 14 Jul 2025, for the wider-access item). [Corrected: "since July 2025" stays, now dated to BetaNews 14 Jul 2025. The 200-follower professional tier is unverified.]
- **Reels length for non-follower recommendation (C, single source).** Up to 3 minutes. Unverified.

### 5. Influencer marketing in India

- **Rates by tier (C, sources disagree; not re-checked).**
  - Nano (1K-10K): Rs 2,000-8,000 per Reel (Tring); other sources Rs 1,000-12,000.
  - Micro (10K-100K): Rs 5,000-80,000; Reels Rs 15,000-60,000 in one guide.
  - Macro (100K-1M): Rs 84,000-7.9 lakh (one source); up to Rs 12 lakh (another).
  - Still unverified. Ask each creator for a rate card.
- **Market size (B/C).** India influencer marketing "nearing Rs 5,000 crore" (Deccan Chronicle, date not shown). Still unverified.
- **Platforms (Winkl, Plixxo, Qoruz).** Pricing mostly not found. Qoruz paid plans reported from about Rs 15,000/month (one comparison site). Winkl ownership conflicts (MyGlamm vs Good Glamm). Ask vendors directly.

### 6. ASCI influencer guidelines (current text)

- **Primary ASCI guide (2024 PDF, ascionline.in) NOT READ. Host blocked.**
- **Disclosure labels (corroborated secondary, conflicting).** Search summaries of the ASCI guide quote a list of #ad, #collab, #promo, #sponsored, #partnership. Pass 1 cited the 2021 Inc42 list (Advertisement, Ad, Sponsored, Collaboration, Partnership, Employee, Free gift). [Corrected: the list has changed between the 2021 guidelines and the 2024 guide. Current list per the guide, as quoted in summaries: #ad, #collab, #promo, #sponsored, #partnership. Still unverified against the PDF.]
- **Placement (corroborated secondary).** Labels must be upfront and legible. Superimposed labels need a clear, legible font. Do not bury labels under a group of hashtags. A one-time bio disclosure is generally not enough.
- **Platform "Paid partnership" tag (conflicting).** Feb 2022 press (exchange4media, not read) says ASCI accepts the tag as an alternative to its labels. Grynow blog says the native tag alone is not sufficient. Per the ASCI guide summary, the tag is a supplement to a visible label. Current status: still unverified. Safe practice: visible #ad plus the platform tag.
- **Enforcement (B, press, not read).** LinkedIn advisory Jan 2025 (60 flagged cases in one week). FY25: 14% of flagged ads linked to influencer violations (date not confirmed). Aug 2025 code update: media companies must label paid posts on their own handles (date per summary).
- **2026 update (single law-firm source, sansalegal).** Claims new approved labels (#Ad, #Sponsored, #Paid, #Partnership) and AI-virtual-influencer rules requiring an AI disclosure plus the paid label. A Haulpack blog gives a different list (ad, sponsored, partnership, gifts, cooperation). Still unverified. Do not use until ASCI's site confirms.

### 7. Click-to-WhatsApp (CTWA)

- **Global (B).** Meta Q3 results: click-to-WhatsApp ad revenue up about 60% year on year (exchange4media, Q3 2025; not read).
- **India (B, conflicting date).** Zuckerberg: click-to-message ad revenue in India doubled year on year; over 60% of WhatsApp users in India message a business each week. Pass 1 dated this to the Oct 2023 call (sentinelassam). A pass 2 search summary dates the same wording to the Q3 2025 call. [Still unverified as to date. Read the sentinelassam article to settle.]
- **Message pricing India (C, one vendor).** Marketing about INR 0.86; utility about INR 0.12 (Jan 2026). Corroborated only by the same vendor data as the RULES file.
- **Benchmarks (vendor, conflicting).** "3-5x conversion vs lead ads"; "92% lower CPL vs landing page" (one vendor). Still unverified.
- **Measurement (C, consistent across guides).** Send conversions back via the Conversions API and capture ctwa_clid. Without this, you only see "conversations started".
- **Search gap.** No India CTWA performance figures (CPA, conversion rate) from a checkable source.

### 8. Instagram shopping in India

- **Product tags (C, vendor doc).** Feed posts and Reels; up to 20 products per post, 30 per Reel.
- **Checkout (corroborated secondary, mostly old).** In-app checkout is US-only. For brands outside the US, tags open the brand's own checkout. Earlier India reports (2018-2020) on in-app shopping never reached launch as far as found.
- **India access (C, Shopify community).** Instagram Shopping in India historically limited to managed clients. Date unknown.
- **Meta India (B).** Meta calls India a key market; SMB tools include Shop Now, Stories links and Shoppable tags. No 2026 India checkout or tag change found.

---

## Ranking / visibility mechanics (how things show up and why)

- **Paid (corroborated secondary).** Andromeda retrieval shortlists candidates on creative content, then ranking and the auction pick. Few near-duplicates means fewer candidates.
- **Paid (PATTERN).** Advantage+ pools budget and learning across creatives and placements. Small brands with low purchase volume can stay in "learning limited".
- **Organic (corroborated secondary).** Watch time, likes and sends per reach drive Reels distribution. Sends and watch time matter most for non-followers. 2026 order disputed.
- **Organic (corroborated secondary, specifics unverified).** Originality is a stated 2026 goal. Reposted or AI-looking content is reported to lose reach.
- **Organic (PATTERN).** Trial Reels let a new account test a Reel on non-followers before sharing to followers.

---

## What a small new D2C seller should do / avoid (PATTERN, labelled)

**Do:**
- Make 5-8 distinct creative concepts (different hook, format and angle). Do not make 50 variants. [PATTERN; corroborated secondary on diversity.]
- Keep at most 6 creatives per ad set, as Meta's Help Centre reportedly advises (not read). [Corroborated secondary.]
- Start with a controlled manual campaign while purchase volume is low; move to Advantage+ sales once there are enough conversions per ad set per week. [PATTERN; learning-phase figure secondary.]
- Test Hinglish and regional versions of the best creative against English in your own account. Do not assume vendor lift numbers. [PATTERN.]
- Budget from your own data. Use the India ranges only as a starting band. [PATTERN; still unverified.]
- Post originals: founder-shot, real product use, own voice. Avoid reposting other creators' Reels. [PATTERN; corroborated secondary.]
- Check Trial Reels eligibility in-app before planning around it. [Corroborated secondary; 200 vs 1,000 conflict.]
- Disclose every paid or gifted creator post with a visible label (for example #Ad) in the caption or on the image. Add the platform "Paid partnership" tag as a supplement, not a replacement. [Corroborated secondary on ASCI placement.]
- Pick influencers by engagement and audience fit. Get a written rate card and negotiate bundles of 3+ posts. [PATTERN.]
- Use CTWA where a human sales or support conversation adds value. Send conversions back via the Conversions API. Check Meta's current India WhatsApp message rates before building a funnel. [PATTERN.]

**Avoid:**
- Using the 3-5x sends multiplier, the 10-reposts cut-off, or the 60% creative-similarity cut-off as facts. [Unverified.]
- Using US or global CPM benchmarks for India. [C.]
- Buying influencer posts from platforms with unknown pricing and no written rate card. [PATTERN.]
- Posting undisclosed paid content, or hiding the label under hashtags. [Corroborated secondary.]

---

## Open questions and conflicting claims

1. **Primary sources not read (all of them).** engineering.fb.com (Andromeda), Meta Business Help (Advantage+ sales, ad volume, learning phase), about.instagram.com or creators.instagram.com (Mosseri, originality, Trial Reels), ascionline.in (ASCI guide). All blocked by DNS in pass 2. Allow these hosts and rerun.
2. **Mosseri's sends multiplier (3-5x) vs "slightly more" wording.** Still conflicting. Need the original post.
3. **2026 signal order (shares vs likes vs watch time).** Conflicting secondary sources.
4. **Originality enforcement (30 Apr 2026, 10-repost threshold, 31 Aug 2026 AI-label date).** Single-source. Need Instagram newsroom.
5. **Trial Reels eligibility: 1,000 vs 200 followers for professional accounts.** Conflicting. Check in-app.
6. **Learning phase: 50 events per 7 days vs 10 in 3 days (Ads Manager test).** Conflicting. Check Ads Manager.
7. **Advantage+ sales 50-ad cap and 6-creative advice.** Secondary only.
8. **Creative Similarity 60% threshold and Creative Diversity score (26 Aug 2026).** Single-source or unverified.
9. **Andromeda figures (+6% recall, +8% quality, "10,000x capacity").** From a search summary; primary not read.
10. **India CPM/CPC/CPA benchmarks.** upGrowth could not be re-read. Agencies disagree 2-3x.
11. **Click-to-WhatsApp India "doubled" and "60% weekly" figures: 2023 or Q3 2025?** Conflicting dates. Read the sentinelassam article.
12. **ASCI label list and the platform-tag status.** 2021 list vs 2024 guide list; Feb 2022 acceptance vs Grynow "not sufficient". Primary PDF not read.
13. **ASCI 2026 labels and AI-influencer rules.** Single law-firm source, conflicts with a Haulpack list. Unverified.
14. **Hinglish/regional lift (3-5x, 20-36%).** Vendor claim with no link.
15. **Founder-led vs UGC vs creator-led ranking for Indian D2C.** No sourced India comparison.
16. **Instagram shopping checkout in India, 2026.** No announcement found.
17. **Influencer tier rates.** Conflicting; need quotes.

---

## Sources

Ratings: A = official, B = reputable press, C = blog/agency/vendor. "Read" means the page itself was opened in pass 2. "Snippet" means only a search summary was seen. Dates as shown.

Primary, not read (blocked in pass 2):
1. https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-platform/ (Dec 2024) [A; NOT read, DNS blocked]
2. https://www.ascionline.in/social/wp-content/uploads/2024/03/ASCIs-Guide-For-Influencers-1.pdf (2024) [A; NOT read, DNS blocked]
3. https://www.facebook.com/business/help/1576994822553428 (Advantage+ sales; date not shown) [A; NOT read, DNS blocked]
4. https://about.instagram.com/blog/announcements/shedding-more-light-on-how-instagram-works [A; NOT read, DNS blocked; the URL is a guess, not a confirmed link]
5. https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/ (Jan 2025 per summary) [B; NOT read, DNS blocked]
6. https://www.exchange4media.com/influence-zone-news/14-of-flagged-ads-in-fy25-linked-to-influencer-violations-asci-143887.html [B; NOT read, DNS blocked]
7. https://upgrowth.in/instagram-ads-pricing-india-2026/ (2026) [C; NOT read, DNS blocked]

Snippets read in pass 2 (WebSearch summaries):
8. https://www.eclincher.com/articles/how-the-instagram-algorithm-works-in-2026 (2026) [C; snippet]
9. https://www.jonloomer.com/meta-andromeda/ (date not shown) [C; snippet]
10. https://www.jonloomer.com/meta-andromeda-creative-diversification/ (date not shown) [C; snippet]
11. https://www.jonloomer.com/advantage-plus-sales-app-leads-campaigns/ (date not shown) [C; snippet]
12. https://www.jonloomer.com/qvt/learning-phase-10-or-50-events/ (date not shown) [C; snippet]
13. https://www.1clickreport.com/blog/meta-advantage-plus-campaign-setup-2026 (2026) [C; snippet]
14. https://admanage.ai/blog/meta-advantage-plus-shopping-campaigns (date not shown) [C; snippet]
15. https://www.socialmediatoday.com/news/instagram-expands-access-trial-reels/752895/ (date not shown) [B; snippet]
16. https://betanews.com/2025/07/14/instagram-opens-up-trial-reels-feature-to-more-creators/ (14 Jul 2025) [B; snippet]
17. https://www.socialsamosa.com/news-2/instagram-introduces-wider-access-trial-reels-9493132 (date not shown) [B; snippet]
18. https://www.sansalegal.com/post/asci-influencer-advertising-guidelines-2026-disclosure-rules-for-paid-content-and-ai-influencers (2026) [C; snippet]
19. https://www.legal500.com/developments/?p=28469 (date not shown) [B; snippet, headline only]
20. https://www.grynow.in/blog/asci-guidelines-for-influencer-marketing-in-india.html (date not shown) [C; snippet]
21. https://haulpack.com/blog/asci-guidelines-for-influencers (date not shown) [C; snippet]
22. https://www.stackmatix.com/blog/when-to-use-meta-advantage-plus-campaigns (date not shown) [C; snippet]
23. https://chatmaxima.com/blog/2026-click-to-whatsapp-ads-playbook/ (2026) [C; snippet]
24. https://www.spurnow.com/en/blogs/click-to-whatsapp-ads-benchmarks (date not shown) [C; snippet]
25. https://www.medianews4u.com/metas-q3-results-highlight-whatsapps-rising-role-in-revenue-mix/ (date shown oddly; not read) [B; snippet]
26. https://sentinelassam.com/business/revenue-from-click-to-message-ads-in-india-has-doubled-meta-founder-672693 (date conflicting: Oct 2023 per pass 1; Q3 2025 per pass 2 summary) [B; not read]
27. https://www.community.shopify.com/t/how-can-i-enable-the-instagram-shop-feature-in-india/107462 (date not shown) [C; snippet]
28. https://www.gizbot.com/amphtml/apps/news/instagram-brings-product-tagging-feature-for-everyone-how-does-it-work-080250.html (date not shown) [C; snippet]

From pass 1 (not re-checked in pass 2):
29. https://www.admetrics.io/post/meta-andromeda-ads-retrieval-explained (date not shown) [C]
30. https://confect.io/tactics/meta-andromeda-2026 (2026) [C]
31. https://relevantaudience.com/meta/meta-ad-creative-diversification-same-hook-same-ad/ (date not shown) [B/C]
32. https://commonthreadco.com/blogs/coachs-corner/metas-new-creative-diversity-score-is-live-in-ads-manager-what-ecommerce-brands-must-act-on-now (26 Aug 2026 per source) [C]
33. https://bosswallah.com/blog/creator-hub/instagram-ads-cost-in-india-2026-how-much-should-you-actually-spend/ (2026) [C]
34. https://www.youngurbanproject.com/instagram-ads-cost-in-india/ (date not shown) [C]
35. https://creatorflow.so/blog/instagram-algorithm/ (2026) [C]
36. https://www.searchenginejournal.com/instagram-algorithm-shift-why-sends-matter-more-than-ever/521389 (date not shown) [B]
37. https://www.inc42.com/buzz/new-influencer-marketing-guidelines-mandating-disclosure-on-promotional-content-to-be-effective-from-june-14/ (June 2021) [B]
38. https://www.exchange4media.com/advertising-news/paid-partnership-tag-acceptable-alternative-to-disclosure-labels-for-influencer-ads-asci-118473.html (Feb 2022) [B; not read]
39. https://www.exchange4media.com/digital-news/asci-issues-advisory-to-linkedin-influencers-disclose-ads-or-face-action-140078.html (Jan 2025) [B; not read]
40. https://www.exchange4media.com/advertising-news/asci-updates-code-says-media-companies-must-label-paid-posts-on-social-handles-146389.html (2025 per summary) [B; not read]
41. https://getkoro.app/blog/ai-ugc-video-in-hinglish-voice-lipsync-guide-for-indian-brands-2026 (2026) [C]
42. https://www.trylapis.com/resources/indian-language-ai-ads-guide (date not shown) [C]
43. https://ir.mica.ac.in/entities/publication/17b86fb2-f287-431a-82cb-8fd7abadb2d2/full (2025) [B/academic]
44. https://bosswallah.com/blog/brand-collaborations/micro-influencer-rates-in-india-what-to-actually-charge-in-2026/ (2026) [C]
45. https://www.tring.co.in/brands/blogs/influencer-marketing-cost-in-india-list (date not shown) [C]
46. https://influee.co/blog/instagram-influencer-pricing (2026) [C]
47. https://www.deccanchronicle.com/amp/business/indias-influencer-marketing-boom-industry-nears-5000-crore-as-regional-creators-rise-1970876 (date not shown) [B/C]
48. https://www.elev8or.io/blog/best-influencer-marketing-platforms-in-india (date not shown) [C]
49. https://www.cbinsights.com/company/winkl (date not shown) [C]
50. https://www.outlookbusiness.com/news/business-messaging-whatsapp-engines-of-growth-biz-digitisation-driving-headroom-meta-india-head (date not shown) [B]
51. https://beastoftraal.com/2025/02/19/linkedin-brand-partnership-label-vs-asci-guidelines/ (Feb 2025) [C]
52. https://www.naiknaik.com/?p=4165 (date not shown) [C]
