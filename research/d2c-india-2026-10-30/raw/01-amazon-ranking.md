# Amazon.in search and discovery ranking, 2025-2026 (raw research, pass 2 verified)

Sweep date: 30 Oct 2026. Topic: how Amazon.in search and discovery rank products.
Pass 1: 30 Oct 2026 (WebFetch/search). Pass 2: 30 Oct 2026 (curl via the agent proxy, plus WebFetch where it resolved).

## Read this first: coverage limits (updated in pass 2)

- **Pass 2 fetch route.** WebFetch still fails DNS for most hosts in this session. `curl` through the agent proxy reaches the Amazon official sites: `sell.amazon.in`, `sellercentral.amazon.in`, `www.aboutamazon.in`, `www.aboutamazon.com`, `advertising.amazon.com`, `www.amazon.in`. Other hosts return 403 (policy) or fail DNS: `www.amazon.science`, `arxiv.org`, `sell.amazon.com`, `en.wikipedia.org`, `www.business-standard.com`, `www.medianama.com`, `www.modernretail.co`, `seller-forum.com`, and most third-party blogs.
- **Still not reachable:** Amazon Science papers (COSMO), the ACM DL copy, the Amazon.in help pages for Amazon's Choice and Best Seller (`www.amazon.in/gp/help` returned 503), and the Amazon Ads help pages for ad rank.
- **Most ranking-mechanics claims are still C.** Amazon publishes no ranking formula in any reached source.
- Dates: "date not shown" where the page text had none.

## Key takeaways (pass 2 top 10 first, then the rest)

1. **Verified: Amazon does not publish a ranking formula in any reached official page.** The official pages reached in pass 2 talk about "relevance" and "performance" only in general terms. "A9" and "A10" remain seller-community names. [A-official, sell.amazon.in + aboutamazon.com; absence checked, not exhaustive]
2. **Verified (A): Sponsored Products ads appear in the shopping results pages and on product detail pages on Amazon.in.** Amazon says its ads are placed "in highly visible placements within the shopping results page or on the product details page". [A, sell.amazon.in/grow-your-business/advertise, date not shown; fetched pass 2]
3. **Verified (A, party statement): Amazon says its ad ranking weighs relevance and bid, and that about 92% of placed Sponsored Products ads are not given to the highest bid.** This is Amazon's position in its FTC litigation response, not neutral documentation. [A-party, aboutamazon.com/company-news/amazon-ftc-sponsored-ads-lawsuit-response, date not shown on the page text; fetched pass 2]
4. **Verified (A): Buy Box (now "Featured Offer") needs performance-based eligibility.** Amazon.in's own fees page: "Sellers must meet performance-based requirements to be eligible for Featured Offer placement." It does not list the metrics. [A, sell.amazon.in/fees-and-pricing, date not shown; fetched pass 2]
5. **Verified (A): Amazon.in's own seller page says competitive pricing "potentially increase your likelihood of being the Featured (Buy Box) Offer".** The raw claim that "the lowest price no longer guarantees the Buy Box" is consistent with this wording but is not stated as such. [A, sell.amazon.in/grow-your-business, date not shown; fetched pass 2]
6. **Verified (A): Alexa+ launched in India with Early Access, in English, Hindi and Hinglish.** Free during Early Access. After Early Access: free for Prime plan members, and ₹2,000 a month or via a Prime plan for Prime Lite, Prime Shopping Edition and non-Prime users. Eligibility is checked at amazon.in/alexaplus. [A, aboutamazon.in/news/devices-and-alexa/alexa-plus-launch-india, "starting today", date not in extracted text; the 16 Sep 2026 date comes from press (secondary)]
7. **Verified (A): Amazon's Alexa for Shopping news post (US) is dated 29 Oct 2026 and describes 100+ new capabilities.** It does not mention India, Rufus, or any retirement date. [A, aboutamazon.com/news/retail/alexa-for-shopping-new-capabilities, 29 Oct 2026 per the homepage listing]
8. **Corrected: Rufus was not "retired on 13 May 2026" according to any primary source.** Only secondary press (MediaPost, Modern Retail, GeekWire, many blogs) says Amazon announced on 13 May 2026 that Alexa for Shopping replaces Rufus in the US. Press reports say Rufus's technology carries over, and that the Rufus name left the consumer interface. [C/B-secondary; primary announcement not fetched]
9. **Corrected: the India Rufus question is now partly answered.** Rufus launched as a beta on the Amazon.in app in August 2024 (press, secondary). Pass 2 found no 2026 Amazon.in page that confirms Rufus or Alexa for Shopping is live in India. The Alexa+ India page does not mention Alexa for Shopping. [B-secondary for launch; "not found" for 2026 India status]
10. **Corrected: the Valid Tracking Rate revision was announced in October 2024 for Amazon Europe and US seller-fulfilled orders, effective 15 Jan 2025.** India was not covered in the sources found. [C/secondary forum repost, announcement 14 Oct 2024; Seller Forum not fetched]
11. **Verified (A, official claims, promotional): Amazon.in says new sellers who add listings and spend on ads get better visibility.** The sell.amazon.in growth page says adding at least 10 listings may give "higher chances of getting an order", and that spending "at least ₹5,000" on Sponsored Products "may help your products appear in highly visible places". It also says new sellers who invest over ₹5,000 in sponsored ads have a "12x higher likelihood" of ₹1 lakh sales in 9 weeks. [A-official but promotional, sell.amazon.in/grow-your-business, date not shown]
12. **Verified (A): A+ Content and Brand Registry tools are described by Amazon as conversion tools, not ranking tools.** Basic A+ Content "can increase sales by up to 8%", and Premium A+ "up to 20%". Amazon does not state a ranking effect. [A-official, sell.amazon.in/brand-registry, date not shown]
13. **Honeymoon for new listings: still not verified.** No official Amazon source found. Vendor guides describe a 30-60 day window; a 2026 launch guide says it is not officially documented. [C, conflicting]
14. **COSMO: still unverified.** Amazon Science and arXiv are blocked. The search summary of the SIGMOD 2024 COSMO paper (arXiv:2401.07286) describes commonsense knowledge used to explain search-buy behaviour and to help relevance prediction, with A/B gains. This is secondhand. [search snippet only]
15. **Amazon's Choice and Best Seller badge logic: still not verified on an Amazon.in page.** The US Amazon's Choice FAQ (amazon.com node 21449952011) is blocked. Secondary reports: Amazon's Choice is for "highly rated, well-priced, available to ship immediately" products, and sellers cannot buy or apply for it. [C, search snippets; primary not fetched]
16. **Listing suppression on Amazon.in: no official India page reached.** Secondary sources: suppression causes (missing main image, missing identifiers, prohibited phrases, thin detail pages); check the Suppressed report or Listing Quality tab. [C, unchanged]
17. **Hindi and regional languages: no 2025-2026 evidence found that search ranks them differently.** Amazon.in's Hindi and Tamil seller pages are about Global Selling, not ranking. [A-dated, outdated]
18. **FBA and the Prime Badge: official Amazon.in claim that FBA "increases your chance for winning the Offer Display".** Amazon says FBA "gives your products the Prime Badge" and that Amazon.in customers look for it. [A, sell.amazon.in/shipping-and-fulfillment/fulfillment-by-amazon, date not shown]

## Findings by sub-question

### 1. A9 vs A10 vs newer semantic/AI ranking (COSMO, Rufus, Amazon's Choice, Best Seller, Sponsored)

- A9/A10 naming and whether A10 is new: C, conflicting. Unchanged. [C, sellersprite.com, bebolddigital.com, adbrew.io; not fetchable]
- **Verified in pass 2: Amazon does not publish A9 or A10.** No official page reached uses those names. [A-absence, sell.amazon.in + aboutamazon.com]
- **COSMO: Still unverified.** Background from search snippet only. [search snippet; amazon.science 403 via proxy]
- **Amazon's Choice and Best Seller badges: Still unverified on Amazon.in.** The Seller Central forum post (secondary) says Amazon weighs ratings, price, popularity, availability and fast delivery, and that sellers cannot pay for or apply for Amazon's Choice. [C/secondary; not fetched]
- **Sponsored slot logic: Verified in part.** Amazon.in advertise page: Sponsored Products appear in shopping results and on product detail pages. Amazon's FTC response: ranking score based on relevance and bid, with relevance weighted more heavily over time. Dynamic-bidding guide (advertising.amazon.com): bids are raised when an ad appears for "a highly relevant shopping query". [A-official, party statement in the FTC response]

### 2. Signals that matter

- Sales velocity, conversion, CTR, reviews, keyword relevance, price: generic vendor lists. Amazon's official pages name conversion and price competitiveness, not a weight. [C plus A-official for price and conversion]
- Buy Box: performance-based eligibility (A, verified). Specific metrics not listed by Amazon. [A-official, sell.amazon.in/fees-and-pricing]
- External traffic, FBA/Prime: FBA and the Prime Badge are described by Amazon (verified). External traffic: not in official sources. [A for FBA; C for traffic]
- Stock-outs cost the Buy Box: the official "Featured Offer" description in the US seller blog says an out-of-stock item cannot be featured. Not verified on Amazon.in. [C-secondary; sell.amazon.com blog blocked]
- Storage limits (May 2025, 6 to 5 months): not verified. [C, one source, unchanged]
- Returns: not found as a ranking input.
- Brand Registry, A+, video: Amazon official pages say these help conversion and awareness. No official ranking effect found. [A-official, sell.amazon.in/brand-registry]

### 3. How Rufus picks products and how sellers optimise for it (India)

- Rufus was a beta on the Amazon.in app from 27 Aug 2024 (press, secondary; fibre2fashion not fetchable). [B-secondary, Corrected]
- Rufus in India in 2026: not found on amazon.in or aboutamazon.in. [not found]
- Alexa for Shopping: US announcement per press (13 May 2026), not fetched from a primary source. Amazon's own US post (29 Oct 2026) confirms the product exists in the US. India: not found. [A for US product existence, secondary for 13 May date]
- Alexa+ launched in India (16 Sep 2026 per press; official page says "starting today"). Alexa+ India page does not mention Alexa for Shopping, Rufus, or search ranking. [A-official page, date secondary]
- Tactics (answer listing questions, A+ and comparison tables): C only. Unchanged.

### 4. New listings: honeymoon or not

- 30-60 day boost window: C only. Not in any official page reached. [C, conflicting]
- Amazon's own sell.amazon.in page does say "add at least 10 listings" and ad spend may help visibility, which is the closest official statement. [A-official, promotional]
- India-specific honeymoon data: not found.

### 5. Amazon.in vs Amazon.com differences

- Hindi, Tamil and regional seller tools: Amazon.in seller pages are available in English, Hindi, Tamil, Kannada, Marathi, Gujarati, Bengali, Malayalam and Telugu. [A, sell.amazon.in homepage language menu, verified pass 2]
- Hindi voice shopping and regional language reach: 2021 press (A, outdated). Ranking effects: not found.
- Alexa+ supports Hindi and Hinglish (A, verified). Search ranking effect: not found.
- COD as a ranking input: not found.

### 6. Buy Box rules on Amazon.in

- **Verified: Featured Offer requires performance-based eligibility** (sell.amazon.in/fees-and-pricing). [A]
- **Verified: competitive price potentially increases the chance of being the Featured (Buy Box) Offer** (sell.amazon.in/grow-your-business). [A]
- **Verified: FBA increases chance of winning the Offer Display** (sell.amazon.in FBA page). [A, wording "Offer Display" differs from "Buy Box"]
- **Still unverified:** specific metrics (on-time shipping, valid tracking rate, low negative feedback) on Amazon.in. The sell.amazon.in Buy Box page URL in the raw file returns a 404. [C]
- **Corrected:** Valid Tracking Rate revision. Announced 14 Oct 2024 for Amazon Europe and US seller-fulfilled orders, effective 15 Jan 2025; 95% threshold at category level (forum repost, secondary). India not covered. [C/secondary, Corrected]
- **Still unverified:** handling time (0-day for FBM premium shipping, Oct 2025). US-focused. [C]

### 7. What gets listings suppressed

- No official Amazon.in suppression page reached. Common causes (main image, identifiers, prohibited phrases, thin details) are C only and come from secondary and US sources. [C, still unverified]
- Official Amazon US-language rule (secondary forum post): detail pages must not include seller contact details, URLs, or promotional phrases such as "sale" or "free shipping". [C/secondary]
- Fix path: "automatically reinstated within 24 hours" after correction (secondary forum post). The raw file's 24-72 hours claim is not verified. [C]

## Ranking / visibility mechanics (how things show up and why)

PATTERN (inference, labelled):

- Official Amazon statements now confirm two paid and organic levers: ad placement in results and product pages (sponsored ads), and the Featured Offer (Buy Box), which needs performance-based eligibility. The organic relevance formula is not published. PATTERN from A-official plus C.
- Amazon's own ad statement says relevance is weighted above bid. If true, bids alone will not buy visibility. PATTERN, A-party.
- Official Amazon.in pages put FBA and the Prime Badge forward as conversion and Buy Box aids. PATTERN, A-official.
- Rufus/Alexa for Shopping in the US sits in the search bar and drives AI-led shopping; India status is unclear. PATTERN, mostly C/secondary.

## What a small new D2C seller should do / avoid (pattern, labelled)

Do:

- Check the Suppressed filter in Seller Central weekly. Fill required attributes; the sell.amazon.in growth page says more listings help. [A-official for listing count; C for suppression detail]
- Price competitively. Amazon says it helps the Featured Offer. [A-official]
- Use FBA where it fits, for the Prime Badge and Offer Display. [A-official]
- Use A+ Content and Brand Registry for conversion, not as a ranking fix. [A-official for conversion claim]
- Plan a small ad budget for visibility, since Amazon says spend may help and ads sit in results. Treat Amazon's "12x" claim as promotional. [A-official, promotional]
- Verify any tracking, handling or suppression rule on sell.amazon.in before acting. [process]

Avoid:

- Buying reviews or sales velocity. Not verified as an Amazon policy in pass 2. [C]
- Keyword stuffing and promotional phrases in detail pages. [C/secondary]
- US-only tactics (US storage limits, 0-day handling). Check the India rules first. [C]

## Open questions and conflicting claims

1. **A10 new system or relabel?** Unresolved. No official source uses the term.
2. **Rufus retirement date (13 May 2026):** secondary press only. Amazon's own US post does not state it. Unresolved; the primary announcement was not fetched.
3. **Rufus in India in 2026:** launched beta Aug 2024 (press); no 2026 India status found. Unresolved.
4. **Alexa for Shopping in India:** not found. Alexa+ is live in India; Alexa for Shopping is US in the sources reached.
5. **Honeymoon:** unresolved. No official source.
6. **COSMO, Amazon's Choice, Best Seller logic:** still not found on a primary page. Amazon Science, arXiv and the Amazon.in help pages are blocked or 503.
7. **Buy Box metrics on Amazon.in:** the official page says performance-based but does not list metrics. Still unverified.
8. **Valid Tracking Rate (Oct 2024 announcement, 15 Jan 2025 effective):** Europe and US, not India. Corrected.
9. **Storage limit change (May 2025):** unverified.
10. **Suppression causes and fix time on Amazon.in:** no official India page reached.

## Sources

Rating key: A = official, B = reputable press, C = blog/agency/tool vendor. Dates are the visible date or "date not shown". Fetch method: "pass 2" = fetched in this pass.

Official (A):
1. https://sell.amazon.in/grow-your-business/advertise -- A -- date not shown -- fetched pass 2 (Sponsored Products placement; ad claims)
2. https://sell.amazon.in/grow-your-business -- A -- date not shown -- fetched pass 2 (Featured Offer price wording; new seller ads and listing claims)
3. https://sell.amazon.in/fees-and-pricing -- A -- date not shown -- fetched pass 2 (Buy Box performance-based eligibility; FBA Offer Display wording)
4. https://sell.amazon.in/brand-registry -- A -- date not shown -- fetched pass 2 (A+ and Brand Registry conversion claims)
5. https://sell.amazon.in/grow-your-business/tools -- A -- not fetched (listed, not needed)
6. https://sell.amazon.in/shipping-and-fulfillment/fulfillment-by-amazon -- A -- date not shown -- fetched pass 2 (Prime Badge; Offer Display)
7. https://sell.amazon.in/ -- A -- date not shown -- fetched pass 2 (seller homepage; language menu)
8. https://www.aboutamazon.com/company-news/amazon-ftc-sponsored-ads-lawsuit-response -- A-party -- date not shown -- fetched pass 2 (ad relevance and bid; 92% not highest bid)
9. https://advertising.amazon.com/library/guides/dynamic-bidding-sponsored-products -- A -- date not shown -- fetched pass 2 (dynamic bidding; "highly relevant shopping query")
10. https://www.aboutamazon.com/news/retail/alexa-for-shopping-new-capabilities -- A -- 29 Oct 2026 per homepage listing -- fetched pass 2 (Alexa for Shopping US, 100+ capabilities; no India, no Rufus)
11. https://www.aboutamazon.in/news/devices-and-alexa/alexa-plus-launch-india -- A -- "starting today", date not in text -- fetched pass 2 (Alexa+ India, early access, pricing, languages)
12. https://www.aboutamazon.com/ -- A -- homepage -- fetched pass 2 (listing of Alexa for Shopping post)
13. https://www.amazon.in/ -- A -- homepage -- fetched pass 2 (200; no Alexa for Shopping or Rufus in visible text)
14. https://www.amazon.in/gp/help/customer/display.html?nodeId=GXSVTN2KGVZ2ARGG -- A -- 503 -- not read (Amazon.in help; blocked)
15. https://www.aboutamazon.in/ -- A -- homepage -- fetched pass 2 (no Rufus or Alexa for Shopping in text)
16. https://sell.amazon.in/grow-your-business/amazon-buy-box -- 404 -- raw URL is dead (Corrected)
17. https://www.aboutamazon.com/news/retail/how-to-use-rufus -- 404 -- raw URL is dead (Corrected)
18. https://press.aboutamazon.com/in/2021/9/amazon-in-expands-regional-language-offering-with-marathi-bengali-will-soon-launch-voice-shopping-in-hindi -- A -- Sept 2021 -- outdated; not fetched in pass 2

Secondary (B/C), not fetched or search snippet only:
19. https://www.amazon.science/... COSMO paper -- blocked (403)
20. https://arxiv.org/abs/2401.07286 -- blocked (403, COSMO paper summary via search)
21. https://www.geekwire.com/2026/amazon-unifies-alexa-and-rufus-as-ai-rivals-move-into-online-shopping/ -- B -- 2026 per URL -- not fetched (blocked)
22. https://www.mediapost.com/publications/article/415053/amazon-shifts-ai-strategy-replaces-rufus-with-ale.html -- B -- not fetched (blocked)
23. https://www.modernretail.co/technology/marketplace-briefing-why-amazon-discontinued-its-ai-powered-rufus-chatbot-for-alexa-shopping-agent/ -- B -- not fetched (blocked)
24. https://www.business-standard.com/technology/tech-news/amazon-alexa-plus-launch-india-hindi-hinglish-price-features-126091600575_1.html -- B -- 16 Sep 2026 per search -- not fetched (blocked)
25. https://www.fibre2fashion.com/news/e-commerce-industry/amazon-introduces-conversational-shopping-assistant-rufus-in-india-297660-newsdetails.htm -- B -- 27 Aug 2024 per search -- not fetched (blocked)
26. https://seller-forum.com/t/valid-tracking-rate-policy-update-for-seller-fulfilled-orders/6967 -- C/forum -- 14 Oct 2024 repost -- not fetched (blocked)
27. https://sellercentral-europe.amazon.com/seller-forums/discussions/t/b41597f2-efde-442e-9fca-351a47112fd7 -- A-forum -- not fetched (blocked)
28. https://www.amazon.com/b?ie=UTF8&node=21449952011 -- A-US FAQ -- not fetched (blocked)
29. https://sell.amazon.com/blog/buy-box-featured-offer -- A-US -- not fetched (blocked)
30. https://canopymanagement.com/amazon-alexa-for-shopping-sellers-guide/ -- C -- not fetched (blocked; search snippet only)
31. https://www.sellersprite.com/en/blog/How-to-Boost-Ranking-for-New-Products-Honeymoon-Period -- C -- not fetched (blocked)
32. https://www.helium10.com/podcast/the-maldives-honeymoon-amazon-launch-strategy-version-8-0/ -- C -- not fetched (blocked)
33. https://www.sellersprite.com/en/blog/Amazon-SEO-How-the-A10-Algorithm-Works-in-2026 -- C -- not fetched (blocked)

Blocked or unreachable in pass 2 (for the coordinator):
- www.amazon.science, arxiv.org, sell.amazon.com, www.aboutamazon.com news search (Rufus page 404), en.wikipedia.org, business-standard.com, medianama.com, startupfortune.com, modernretail.co, mediapost.com, fibre2fashion.com, themobileindian.com, seller-forum.com, and most third-party vendor blogs. Several return 403 from the proxy (policy); others fail DNS.
- www.amazon.in help pages (503).
