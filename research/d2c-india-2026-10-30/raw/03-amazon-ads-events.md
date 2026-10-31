# 03. Amazon Ads in India and sale events, 2025-2026

Research date: 30 Oct 2026. Pass 1 ran on search snippets. Pass 2 (verification) ran 30 Oct 2026 by fetching primary pages with curl through the proxy (method in RULES.md, "How to fetch pages on pass 2"). WebFetch still fails DNS in this session.

**Pass 2 status.** About 13 primary pages were read in full: Amazon Ads (hi-in and en-ca), aboutamazon.in, press.aboutamazon.com/in, aboutamazon.com (FTC response), sell.amazon.in (home, fees-and-pricing, fee-schedule, advertise). Tags below: "Verified in pass 2" = read on the primary page. "Corrected" = old vs new. "Still unverified" = not reached or not found.

**Still blocked or not tried:** exchange4media.com, ppc.land, inc42.com (DNS or not reached), insideretail.asia, mysmartprice.com, tech2.com, outlookbusiness.com. Their claims are used only where a primary page confirmed or contradicted them.

---

## Key takeaways

1. **Amazon's ranking is relevance plus bid, and relevance now weighs more.** Verified in pass 2: Amazon's FTC response (aboutamazon.com, written 2026) says "in 2024, approximately 92% of selected Sponsored Products ads were not the highest bid". It is US-auction context. The page does not give an India figure. **Corrected:** source moved from ppc.land to Amazon's own page.
2. **Sponsored Products in India is pay-per-click.** Verified in pass 2: sell.amazon.in advertise page says "Pay only for the clicks your ads receive". It lists Sponsored Products, Sponsored Brands, Stores and Sponsored Display for Amazon.in. No India CPC or ACoS numbers appear on any Amazon page.
3. **No authoritative India CPC or ACoS benchmark exists in what I could reach.** Vendor ranges conflict by 2-3x. Treat them as directional only. [C, still unverified]
4. **AMC is open to all sponsored-ads advertisers, with India in Asia Pacific.** Verified in pass 2: Amazon Ads hi-in notices dated 16 Sep 2025 (direct self-serve access; lists India under Asia Pacific) and 18 Sep 2025 (AMC for all Sponsored Products, Sponsored Display, Sponsored Brands and Sponsored TV advertisers). No cost or minimum spend is stated on either page.
5. **AI image generation came to India on 6 Jul 2026, not late 2024.** Verified in pass 2: Amazon Ads en-ca notice dated July 6, 2026 says AI image generation is now in India (also Australia, Japan and some EU markets), via Creative Studio in the Ad Console. **Corrected:** the late-2024 India beta claim is unverified and is superseded by this 2026 official date.
6. **Brand Referral Bonus is US-only on Amazon's own page.** Verified in pass 2: the BRB page (dated 5 Aug 2022) names the United States only, for US brand owners enrolled in BRB, with a credit of about 10% of attributable sales. No India listing. The page is old, so treat it as "not offered in India as of the last official page read". **Corrected:** from "unresolved" to "US-only on the official page".
7. **Prime Day India 2025 ran 12-14 July 2025 (72 hours), for Prime members only.** Verified in pass 2 (aboutamazon.in, 2025): 12 a.m. 12 July to 11:59 p.m. 14 July; 400+ brands; 17 Prime Video premieres; "exclusively for Prime members"; 10% bank offers.
8. **Prime Day India 2026 ran 4-6 July 2026, for Prime members only.** Verified in pass 2 (aboutamazon.in/news/amazon-prime/prime-day-2026): 10th edition, 72 hours, 500+ new launches, "exclusively for Prime members". **Corrected:** eligibility is resolved as Prime-only. The "Prime Shopping Days from 7 July" claim is not on Amazon's page and stays unverified.
9. **Great Indian Festival 2025 ran from 22-23 Sep 2025, not October.** Verified in pass 2 (aboutamazon.in, first-48-hours page): Prime members from 22 Sep, all customers from 23 Sep. 380 million (38 crore) visits in the first 48 hours. **Corrected:** the raw file's "reported Oct 2025" was press timing, not the event dates.
10. **GIF 2025 headline numbers are visits and seller milestones, not GMV.** Verified in pass 2 (aboutamazon.in, 2025): 276 crore visits (2.76 billion); 70% of traffic from tier 2 and 3 cities; more than two-thirds of SMB sellers from tier 2 and 3 cities; highest-ever sellers receiving a sale; Bazaar sellers crossing Rs 1 lakh up 15x; local shops crossing Rs 10 lakh; more than Rs 1,000 crore in customer savings; 30,000+ new products launched. No Amazon GMV or seller count.
11. **Referral fees: zero under Rs 1,000 from 16 March (year inferred as 2026).** Verified in pass 2 (sell.amazon.in fee pages): zero referral fee on products under Rs 1,000 across 1,800+ categories, 12.5 crore+ products; referral fees above Rs 1,000 cut 4-9.5% in select categories. **Corrected:** the raw file's "under Rs 300 from 7 Apr 2025" is a 2025 change, now superseded. Also, the seller advertise page still shows an old "0% under Rs 300" banner, which conflicts with the fee page. Trust the fee page.
12. **Closing fees rise on 7 Sep 2026.** Verified in pass 2 (sell.amazon.in fee page): closing fee up Rs 1 for items up to Rs 500 and Rs 3 above Rs 500 on Fulfillment Center orders, citing higher logistics costs. Not in the raw file; new.
13. **Deal fees (Lightning Deal, Best Deals, coupons) are not on Amazon's India fee pages.** Verified in pass 2: the fees-and-pricing and fee-schedule pages list referral, closing, weight-handling and "other" fees, but no Lightning, Best Deals or coupon fee. The raw file's Rs 1,000-5,000 Lightning figure stays unverified and is not found officially.
14. **Influencer programme figures are unverified.** No primary page was read for creator counts or programme rules. [B, unverified]
15. **Ad revenue (FY25, Rs 8,342-8,370 crore) is unverified.** The exchange4media and socialsamosa pages were not reached.
16. **Creative Agent and Ads Agent (Mar 2026) and the AI video generator (India, Nov 2025) are unverified.** Not fetched.

---

## Findings by sub-question

### 1. Ad formats on Amazon.in

- **Verified in pass 2 (sell.amazon.in advertise page, rendered):** Sponsored Products (ads on shopping results and product detail pages), Sponsored Brands, Stores, and Sponsored Display are listed for Amazon.in. Pay per click. [A]
- **Sponsored TV in India (Mar 2025):** [B, storyboard18 / exchange4media] Still unverified.
- **Sponsored Brands video via the AI Video Generator (India, Nov 2025):** [B] Still unverified.
- **Prime Video ad formats (Oct 2026):** [B] Still unverified.
- **Display ads:** no India-specific detail found. Not found.

### 2. CPC, ACoS and ROAS benchmarks in India

- **Verified in pass 2:** no Amazon page gives India CPC, ACoS or ROAS. The advertise page only says ads are pay-per-click. [A, absence confirmed]
- **CPC, India, vendor only (still unverified):**
  - Platform average about Rs 8-25 per click. [C, swcybernetics, 2026]
  - Broad categories Rs 8-35; premium niches Rs 40-120+. [C, agency, 2026]
  - Platform average Rs 8-12; electronics Rs 15-35; fashion Rs 5-12. [C, 2026]
  - Electronics Rs 8-15 average, Rs 20-35 when competitive. [C, 2026]
  - The four ranges disagree by 2-3x. No independent or official table. Not found.
- **ACoS, India (vendor only):** average 25-35% [C, OwlClaw, 2025]; target 15-25% for most categories [C, swcybernetics]. Advice: target ACoS 5-15 points below gross margin. [C]
- **ROAS:** 3:1-4:1 "good" (US figures). [C, Titan Network]
- **Category-level India ACoS/ROAS:** not found.

### 3. How ad rank is decided, and how ads feed organic rank

- **Verified in pass 2 (Amazon FTC response, aboutamazon.com, 2026):** Amazon "applies a ranking score to each eligible ad based on relevance and bid"; "our ranking formula has increasingly given greater weight to relevancy over bid amount"; "in 2024, approximately 92% of selected Sponsored Products ads were not the highest bid"; the mean winning bid is "typically about the 128th bid by amount". US context. The page also says winning bids fell 50% from 2019 to 2025 (US). [A, US]
- **Corrected:** the raw file cited ppc.land (B/C) for these statements. The primary source is Amazon's own page.
- **Pricing:** the advertiser pays just enough to beat the next ranked ad (Amazon FTC response describes second-price logic). [A, US]
- **Relevance formula inputs (CTR, conversion, listing quality):** vendor interpretation only. Amazon does not publish inputs. [C, unverified]
- **Ads feeding organic rank:** agreed vendor pattern; not stated by Amazon. [C]
- **Corrected: Amazon Ads Hindi "ad relevance" page (old source 40):** verified as a DSP page dated 15 Oct 2024 about Amazon DSP audience relevance. Do not cite it for Sponsored Products ranking.
- **India-specific ranking weights:** not found.

### 4. Auto vs manual campaigns for a launch

- Vendor consensus [C]: start with auto campaigns to harvest search terms, then move winners to exact-match manual keyword campaigns. No India-specific comparison found. Not found.

### 5. Amazon's AI ad tools in India, and AMC access

- **AMC, all sponsored-ads advertisers: Verified in pass 2.** Amazon Ads hi-in notice dated 18 Sep 2025: available to all advertisers running Sponsored Products, Sponsored Display, Sponsored Brands or Sponsored TV; visible under Measurement and Reporting in the Ad Console. Amazon Ads hi-in notice dated 16 Sep 2025: direct access, self-serve, no partner needed; lists India under Asia Pacific (with Australia, Japan, Singapore, China and others). [A]
- **AMC cost and minimum:** not stated on either Amazon page. A vendor blog cites an unofficial Rs 10 lakh/month DSP guideline. [C, unverified]
- **AI image generation for India: Corrected.** Amazon Ads en-ca notice dated 6 July 2026: AI image generation expanded to India (Asia Pacific: Australia, India, Japan) and several EU markets; advertisers pick or upload a product image, choose themes or add a text prompt, and generate lifestyle images in Creative Studio in the Ad Console. [A] Old claim (late-2024 India beta from afaqs) is unverified and superseded.
- **AI video generator (India, Nov 2025) and Creative Agent / Ads Agent (Mar 2026):** [B, unverified] Not fetched.
- **Older restriction:** Amazon Marketing Stream excluded India in 2022 (different product). [A, unverified]

### 6. Great Indian Festival 2025 and 2026

**GIF 2025 (event dates 22-23 Sep 2025). Verified in pass 2 (aboutamazon.in, Sep-Oct 2025):**
- Prime members from 22 Sep; all customers from 23 Sep. **Corrected:** raw file said Oct 2025 (press timing, not event dates).
- 380 million (38 crore) customer visits in the first 48 hours; more than 70% from beyond the top 9 metros. [A]
- 276 crore (2.76 billion) visits across the festival; 70% of traffic from tier 2 and 3 cities. [A]
- Highest-ever SMB seller participation in the first 48 hours; more than two-thirds of SMB sellers from tier 2 and 3 cities. [A]
- Highest-ever number of sellers across the country receiving a sale. [A]
- Amazon Bazaar: sellers crossing Rs 1 lakh rose 15x year on year; over 2x seller participation growth. [A]
- Local shops: highest-ever number of sellers crossed Rs 10 lakh in sales. [A]
- Customer savings: more than Rs 1,000 crore through bank offers, GST benefits and cashback. [A]
- Over 30,000 new products launched across categories. [A]
- **Not found:** Amazon's GMV and total seller count. Market-level GMV (Rs 25,000 crore in first two days, +25%, Deccan Chronicle) is not Amazon-only. [B, unverified]

**GIF 2026. Still unverified:**
- Start 8 Oct 2026, Prime early access from 7 Oct (24 hours). Multiple deal and press sites agree. No Amazon-owned page found in search; aboutamazon.in 2026 GIF URLs returned 404.
- End date conflicts: 19 Oct 2026 in one report; "around 7 Nov" in another. Not resolved.
- Bank offer: 10% SBI Card; up to 10% extra for Prime. [B/aggregator]
- Older pages saying "not announced" look outdated.

### 7. Prime Day India 2025 and 2026

- **2025: Verified in pass 2 (aboutamazon.in, Jun-Jul 2025).** 12 a.m. 12 July to 11:59 p.m. 14 July 2025; three days (first time); "exclusively for Prime members"; 400+ brands; 17 Prime Video premieres; 10% bank savings (ICICI, SBI). [A]
- **2026: Verified in pass 2 (aboutamazon.in/news/amazon-prime/prime-day-2026 and /md/news/retail/when-is-amazon-prime-day-in-india, 2026).** 10th edition, 4-6 July 2026, 72 hours, 500+ new launches, "exclusively for Prime members". [A] **Corrected:** Prime-only (raw file had "Prime or open with early access" conflict; resolved).
- **Prime Shopping Days from 7 July 2026:** not on Amazon's page. Still unverified.
- **Bank offers 2026:** not on Amazon's page; Still unverified.
- **2027 dates:** not announced.

### 8. Lightning deals, coupons, Prime exclusive deals, eligibility and fees

- **India fee schedule (Verified in pass 2, sell.amazon.in fee-schedule):** referral, closing, weight-handling and "other" fees only. No Lightning Deal, Best Deals or coupon fee listed. The official India page does not show deal fees. [A, absence]
- **Referral fee, zero under Rs 1,000 (16 March, 2026 inferred):** verified; see Key takeaway 11.
- **Referral fee above Rs 1,000:** cut 4-9.5% in select categories (Apparel, Shoes, Home, Personal care and others). [A, verified]
- **Automotive referral changes:** effective 10 June 2026 (e.g. tyres and rims). [A, verified]
- **US deal fees (not India):** from June 2025, a daily fee plus a share of sales; US coupon fees $5 + 2.5%. [C, US only, unverified for India]
- **India Lightning Deal fee (Rs 1,000-5,000):** [C, unverified; not found officially]
- **Coupon and deal eligibility thresholds (Professional plan, 3.5-star, 5 reviews):** [C, unverified]
- **Prime-exclusive deals:** Prime Day 2025 and 2026 were Prime-only (verified). Other Prime-exclusive policy: not found.

### 9. External traffic: Brand Referral Bonus in India

- **Verified in pass 2 (Amazon Ads hi-in BRB page, dated 5 Aug 2022):** "Countries where available: North America: United States"; eligible: "American seller brand owners enrolled in the Brand Referral Bonus program"; BRB credit is about 10% of sales measured with Amazon Attribution. [A, old page]
- **Verdict: not offered in India per the official page.** Still a gap: the page is from 2022, so check Brand Registry and the Ad Console for any newer India listing. [A, dated]
- **Corrected:** raw file called it "unresolved".

### 10. Influencer programme in India

- All figures unverified. Creator counts (about 2 lakh by Oct 2026), Creator Connections (Sep 2026), Tech Influencer Programme (20-day early access), Elevate (invite-only, India-only), and demographics (about 75% non-metro). [B, unverified; no primary read]

---

## Ranking / visibility mechanics

- **Paid rank (Sponsored Products):** Verified (Amazon FTC response): ranking score from relevance and bid; relevance weighted more heavily over time; the top-ranked ad is the one that best balances relevance and bid. US context. [A]
- **Relevance inputs:** vendor interpretation only. [C]
- **Organic rank:** not published by Amazon. Vendor view: sales velocity and conversion from paid and deal traffic feed organic rank. [C]
- **Deals and events:** Prime Day 2025 and 2026 and GIF 2025 were Prime-focused (verified). Deal eligibility depends on sales history and ratings (C).
- **External traffic:** AMC (open to all sponsored advertisers in India, verified) gives measurement; BRB (US-only per official page) is not available in India as far as found.

---

## What a small new D2C seller should do / avoid (pattern, labelled)

**PATTERN (my inference from verified facts plus labelled vendor claims):**

- **Do:** check AMC in the Ad Console under Measurement and Reporting. [A, verified access; no cost stated]
- **Do:** use Creative Studio's AI image generator (India, from 6 Jul 2026) to make lifestyle images before paying for outside creative. [A, verified availability; check cost in Ad Console]
- **Do:** use the zero-referral-fee band under Rs 1,000 in your pricing model, but recheck the category table on the fee page. [A, verified]
- **Do:** plan for the 7 Sep 2026 closing-fee increase in unit economics. [A, verified]
- **Do:** plan Prime Day or GIF with Prime-only reach in mind (both events were Prime-only in 2025-26). [A, verified]
- **Do:** get any India deal fee from Seller Central before committing; none is on the public fee pages. [A, absence]
- **Avoid:** using vendor CPC or ACoS tables as official. Use your own first 30-60 days of data. [C]
- **Avoid:** assuming BRB works for Amazon.in. The official page is US-only. [A, dated 2022]
- **Avoid:** planning around a Lightning Deal price from one blog. [C, unverified]

---

## Verified in pass 2 / corrected / still unverified

**Verified in pass 2 (primary page read):**
- AMC access for all sponsored-ads advertisers, with India in Asia Pacific (16 Sep 2025 and 18 Sep 2025 Amazon Ads notices).
- AI image generation expanded to India on 6 Jul 2026 (Amazon Ads en-ca notice).
- Ad relevance Hindi page is DSP-only (15 Oct 2024).
- BRB is US-only on the official page (5 Aug 2022).
- Amazon FTC response: relevance-vs-bid ranking and 92% not-highest-bid statement, 2024 data, written 2026.
- GIF 2025: visits, tier 2/3 share, seller milestones, Bazaar, Rs 10 lakh local shops, Rs 1,000 crore savings, 30,000 launches; event dates 22-23 Sep 2025.
- Prime Day 2025: 12-14 July, Prime-exclusive, 400+ brands, 17 Prime Video premieres.
- Prime Day 2026: 4-6 July, 72 hours, 500+ launches, Prime-exclusive.
- Referral fee: zero under Rs 1,000 (16 Mar, year inferred 2026), 1,800+ categories, 12.5 crore+ products; referral cuts above Rs 1,000 (4-9.5%); automotive changes 10 June 2026.
- Closing fee increase effective 7 Sep 2026 (Rs 1 up to Rs 500, Rs 3 above Rs 500 on FC).
- Ad formats on the seller advertise page: Sponsored Products, Sponsored Brands, Stores, Sponsored Display; pay per click.
- Zero referral fee April 2025 (press release dateline 24 Mar 2025, under Rs 300, 135 categories, effective 7 Apr 2025). Confirmed, now superseded by the 2026 change.
- India fee schedule shows no Lightning, Best Deals or coupon fee. [absence]

**Corrected in pass 2 (old -> new):**
1. 92% not-highest-bid source: ppc.land (B/C) -> Amazon FTC response on aboutamazon.com (A, US context).
2. Ad relevance Hindi page (source 40): cited for SP relevance -> DSP only (2024); do not cite for SP.
3. AI image generation India: "beta late 2024 (afaqs)" -> expansion to India dated 6 Jul 2026 (Amazon official).
4. BRB India: "unresolved" -> US-only on Amazon's 2022 page; no India listing.
5. GIF 2025 timing: "reported Oct 2025" -> event 22-23 Sep 2025 (Prime from 22 Sep).
6. GIF 2025 tier 2/3: "two-thirds of SMB sellers" retained as verified; added 70% of visit traffic from tier 2/3 (Amazon page).
7. Prime Day 2026 eligibility: "Prime-only vs open with early access" -> Prime-exclusive (Amazon page).
8. Referral fee: "under Rs 300 from 7 Apr 2025" (2025) -> superseded by zero under Rs 1,000 (16 Mar, year 2026 inferred); "single source" -> verified on Amazon's fee page.
9. Seller advertise banner still shows "0% under Rs 300" (stale) and conflicts with the fee page. Fee page wins.

**Still unverified:**
- AI video generator India (Nov 2025) and Creative Agent / Ads Agent (Mar 2026): not fetched.
- AMC cost and minimum: no Amazon figure found.
- All CPC, ACoS and ROAS benchmarks: vendor only; no primary source exists.
- GIF 2026 dates: no Amazon page found; end date conflicting (19 Oct vs ~7 Nov).
- GIF 2026 bank offers and Prime early access details.
- Prime Shopping Days (from 7 July 2026): not on Amazon's page.
- Lightning / Best Deals / coupon fees in India: not on official fee pages; the Rs 1,000-5,000 figure is unverified.
- Influencer programme figures and Creator Connections: not fetched.
- FY25 Amazon India ad revenue (Rs 8,342-8,370 crore): exchange4media / socialsamosa not reached.
- Sponsored TV in India (Mar 2025) and Prime Video ad formats (Oct 2026): not fetched.

---

## Open questions and conflicting claims

1. **CPC by category, India:** four vendor ranges disagree 2-3x; no primary table.
2. **ACoS average, India:** 25-35% vs 15-25% target vs 16-22% steady state; not reconciled.
3. **GIF 2026 end date:** 19 Oct vs ~7 Nov (two reports).
4. **Seller advertise banner vs fee page:** "0% under Rs 300" banner (stale) vs fee page "zero under Rs 1,000". Fee page is the newer source.
5. **Referral fee year:** the fee page says "effective 16th March" without a year; 2026 is inferred from the table context (10 June 2026 references). Confirm the year against a dated Amazon notice.
6. **BRB India:** the official page is from 2022 and US-only; no newer India listing found.
7. **AMC cost and minimum:** not on any Amazon page; vendor claim unverified.
8. **Lightning / coupon fees in India:** not on public fee pages.

**Blocked or not reached in pass 2:** exchange4media.com, ppc.land, insideretail.asia (DNS), mysmartprice.com, tech2.com, outlookbusiness.com (DNS on WebFetch; not retried with curl). inc42.com was reached with curl, but the article is a 2023 piece, so it does not support any 2025 claim.

---

## Sources

Ratings: A = official (Amazon), B = reputable press, C = blog, agency or vendor. Dates are the item date. "Fetched" = read in pass 2 with curl or the rendering fetcher.

**Fetched in pass 2 (primary, Amazon-owned):**
1. https://advertising.amazon.com/hi-in/library/news/amc-for-sponsored-ads — AMC for all sponsored-ads advertisers, A, 18 Sep 2025. Fetched.
2. https://advertising.amazon.com/hi-in/resources/whats-new/direct-access-to-amc-for-sponsored-ads-advertiser — AMC direct access, lists India in Asia Pacific, A, 16 Sep 2025. Fetched.
3. https://advertising.amazon.com/hi-in/resources/whats-new/ad-relevance — DSP relevance, A, 15 Oct 2024. Fetched. Not Sponsored Products.
4. https://advertising.amazon.com/hi-in/resources/whats-new/brand-referral-bonus-amazon-attribution — BRB, US-only, A, 5 Aug 2022. Fetched.
5. https://advertising.amazon.com/en-ca/resources/whats-new/image-generation-available-for-india — AI image generation expanded to India, A, 6 Jul 2026. Fetched.
6. https://www.aboutamazon.com/md/company-news/amazon-ftc-sponsored-ads-lawsuit-response — Amazon FTC response; 92% and relevance-vs-bid, A, 2026 (page cites 2021-2025 data and 2026 estimates). Fetched.
7. https://www.aboutamazon.in/news/retail/amazon-great-indian-festival-2025-highlights-results — GIF 2025 highlights, A, 2025. Fetched.
8. https://www.aboutamazon.in/news/retail/amazon-great-indian-festival-48-hours-data-38-crore-visits — GIF 2025 first 48 hours, A, Sep 2025. Fetched.
9. https://www.aboutamazon.in/news/retail/amazon-prime-day-2025-date — Prime Day 2025, A, Jun-Jul 2025. Fetched.
10. https://press.aboutamazon.com/in/news/small-business/2025/8/amazon-announces-zero-referral-fees-on-over-1-2-crore-products-move-aimed-at-boosting-growth-of-lakhs-of-sellers-across-india — zero referral under Rs 300, A, page 20 Aug 2025; dateline 24 Mar 2025; effective 7 Apr 2025. Fetched.
11. https://www.aboutamazon.in/news/amazon-prime/prime-day-2026 — Prime Day 2026, A, 2026. Fetched.
12. https://www.aboutamazon.in/md/news/retail/when-is-amazon-prime-day-in-india — Prime Day 2026 explainer, A, 2026. Fetched.
13. https://sell.amazon.in/fees-and-pricing — India seller fees overview, A, 2026 (closing fee update effective 7 Sep 2026; zero referral under Rs 1,000). Fetched.
14. https://sell.amazon.in/fees-and-pricing/fee-schedule — India referral fee table (16 Mar and 10 Jun 2026 changes), A, 2026. Fetched.
15. https://sell.amazon.in/grow-your-business/advertise — Advertise page (formats, pay per click; stale 0% under Rs 300 banner), A, 2026. Fetched (rendered).
16. https://press.aboutamazon.com/in/2026/8/shop-ai-curated-finds-at-amazon-indias-great-freedom-sale-starting-7th-august-2026 — Great Freedom Sale, A, Aug 2026. Fetched; not used in findings.

**Search results only (not fetched; B/C):**
17. https://inc42.com/?p=424933 — Amazon "1.1 Bn visits, 38,000 sellers" article. **Misdated in pass 1:** the page is dated 10 Nov 2023 (GIF 2023), not 2025. Fetched in pass 2 for this check only; not used for any 2025 figure. B, 2023.
18. https://www.exchange4media.com/advertising-news/amazon-ads-brings-ai-video-generator-to-india-opening-new-doors-for-smbs-149247.html — AI video generator India, B, Nov 2025. Not fetched.
19. https://www.exchange4media.com/industry-briefing-news/amazon-ads-unveils-agentic-ai-tools-for-campaign-planning-management-153164.html — Creative and Ads Agent, B, Mar 2026. Not fetched.
20. https://www.exchange4media.com/industry-briefing-news/amazon-indias-ad-revenue-surges-25-to-rs-8342-cr-in-fy25-147563.html — FY25 ad revenue, B, 2025. Not fetched.
21. https://www.insideretail.asia/2026/03/02/amazon-india-cuts-reseller-referral-fees-to-boost-retail-business/ — referral fee headline, B, 2 Mar 2026. Not fetched.
22. https://www.tech2.com/technology/amazon-prime-day-sale-announced-india-event-set-for-july-2026-text-ws-l-10068031.html — Prime Day 2026 announcement, B, 2026. Not fetched.
23. https://www.mysmartprice.com/gear/internet/internet-news/amazon-great-indian-festival-2026-kicks-off-october-8-key-deals-dates-and-bank-offers/ — GIF 2026 start 8 Oct, B, 2026. Not fetched.
24. https://www.outlookbusiness.com/corporate/amazon-great-indian-festival-2026-to-begin-october-8-prime-members-to-get-up-to-10-extra — GIF 2026, B, 2026. Not fetched.
25. https://www.fonearena.com/blog/485369/amazon-prime-day-2026-sale-date.html/amp — Prime Day 2026 dates, B, 2026. Not fetched.
26. https://www.fonearena.com/blog/481519/amazon-prime-day-july-2026-india.html — Prime Day July 2026, B, 2026. Not fetched.
27. https://www.swcybernetics.in/knowledge-base/amazon-ppc-cost-india-2026 — India CPC, C, 2026. Not fetched.
28. https://swcybernetics.in/knowledge-base/amazon-lightning-deals-guide-india-2026 — India Lightning Deal guide (unverified), C, 2026. Not fetched.
29. https://owlclaw.com/benchmarks/amazon-ads-benchmarks — ACoS benchmarks (vendor), C, 2025. Not fetched.
30. https://www.evanik.ai/blog/amazon-sponsored-products-india-guide — India Sponsored Products guide, C, 2025-2026. Not fetched.
31. https://titannetwork.com/what-is-a-good-roas — ROAS (US), C, 2025-2026. Not fetched.
32. https://www.storyboard18.com/advertising/amazon-ads-launches-sponsored-tv-in-india-58509.htm — Sponsored TV India, B, Mar 2025. Not fetched.
33. https://www.storyboard18.com/how-it-works/amazons-zahid-khan-explains-big-bet-on-influencers-with-launch-of-elevate-program-65198.htm — Elevate, B, 2025-2026. Not fetched.
34. https://www.exchange4media.com/industry-briefing-news/nearly-75-of-amazon-influencers-in-india-from-non-metro-cities-159290.html — influencer demographics, B, 2026. Not fetched.
35. https://telanganatoday.com/amazon-launches-creator-connections-in-india — Creator Connections, B, 8 Sep 2026. Not fetched.
36. https://www.amzadvisers.com/how-does-the-new-amazon-brand-referral-bonus-program-work — BRB mechanics (US), C, date not shown. Not fetched.
37. https://www.deccanchronicle.com/business/first-two-days-of-online-festive-sales-see-gmv-of-rs-25000-crore-1906144 — market GMV, B, 2025. Not fetched.
38. https://www.pricehistoryapp.com/blog/amazon-great-indian-festival-2026-date — GIF 2026 expected dates, C, 2026. Not fetched.
39. https://www.zoutons.com/news/amazon-great-indian-festival-2026 — GIF 2026 expected dates (older, says not announced), C, Sep 2026. Not fetched.
