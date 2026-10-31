# Flipkart group marketplaces, 2025-2026: Flipkart, Shopsy, Myntra, Flipkart Minutes

Research date: 30 Oct 2026. Pass 2 (verification) completed 31 Oct 2026. Sub-topic set 4 of the India D2C sweep.

Source ratings: A = official (seller docs, govt, filings, company newsroom: self-reported), B = reputable press, C = blogs, agencies, vendor guides.
FACT = sourced claim. PATTERN = my inference from several facts.
Tags: **Verified in pass 2** = confirmed from the primary page (fetched). **Corrected** = old vs new given. **Still unverified** = could not confirm.

### Fetch notes for pass 2
- WebFetch still fails DNS in this session. All pages below were fetched with curl through the agent proxy (method in RULES.md). Copies of the pages used are saved in /tmp/d2c-fetch/ (file names carry the date).
- Reached and read: stories.flipkart.com (Flipkart's own newsroom; company-stated figures), inc42.com (several articles), outlookbusiness.com (PTI wire, 25 Aug 2026), storyboard18.com (17 Jul 2025), medianama.com (13 Jan 2026).
- Not reachable, so NOT verified: seller.flipkart.com (returned "Site is overloaded", HTTP 529, on every try), advertising.flipkart.com (proxy denied the connection, 403), myntra.com/brands (502), partners.myntra.com (403), thenewsminute.com, freepressjournal.in, yourstory.com penalty article (403), theweek.in, trak.in, fashionnetwork.com (403), gonukkad.com (403), zoutons.com (403). I did not try to work around these denials.
- Flipkart's own returns page URL I guessed returned 404. The current return-window table was not verified from Flipkart.

---

## Key takeaways

1. **Fashion zero commission at every price point from 8 Jul 2026 (Verified in pass 2, A).** Flipkart's own release says the policy now covers all fashion products, not only those under Rs 1,000, and that about 90,000 transacting sellers are affected. Source: stories.flipkart.com, 8 Jul 2026. Inc42 (8 Jul 2026) reports the same. The release does not mention shipping or collection fees.
2. **Shipping, closing and collection fees still apply to fashion (Verified, B).** Inc42 (27 Oct 2026) says closing fees and shipping charges still apply across categories. The fixed-fee and collection-fee amounts are NOT verified (see open questions). Sources disagree on them.
3. **Penalties for fulfilment lapses took effect 23 Aug 2026 (Verified in pass 2, B).** Per shipment: Rs 30 if the order is not ready by the Dispatch-By Date (DBD), Rs 60 for a seller cancellation, Rs 90 if an order is delayed and then cancelled. Three missed DBDs count as a cancellation. New sellers are exempt for their first three months. The old rule could lock a seller account after a DBD breach; the new rule replaces that. Sources: PTI via Outlook Business (25 Aug 2026) and Inc42 (27 Oct 2026). Flipkart's own policy page was not reached.
4. **Shopsy has zero commission on all products regardless of price (Verified, B; date corrected).** Inc42 (8 Jul 2026) says Flipkart extended the zero-commission benefit to all Shopsy products regardless of price. A search summary dates this to late 2025 (Business Standard, about Dec 2025); that is not fetched. Corrected: the 2021 Shopsy zero-commission model was a social-reseller model, not the current seller rate card.
5. **Flipkart Minutes is at scale and still growing (Verified in pass 2, A, self-reported).** Flipkart's two-year release (11 Sep 2026): 4x year-on-year growth, about 1,200 micro-fulfilment centres in 150+ cities, roughly 500 D2C brands in the partner ecosystem (since Aug 2024), about 60% of customers return, Tier 2+ customer base up about 25x. No GMV is given.
6. **Big Billion Days 2026 results are official but growth-only (Verified in pass 2, A).** Flipkart reported 6.3 million concurrent users in the opening hour and over 287 million sessions in early access (9 Oct 2026). Over the 11-day sale, orders, units and buyers each grew about 20-22% year on year (21 Oct 2026). No BBD 2026 GMV was disclosed.
7. **The "34% vs 11x" conflict is resolved: they measure different things (Verified, A).** 34% is platform-wide growth in new customers in the first hour. 11x is Flipkart Minutes new customers in the first hour. Corrected: this was not a conflict, just two scopes.
8. **Flipkart Ads has a credit option and a new free AI tool (Verified, B and A).** "Advertise Now, Pay Later" launched 17 Jul 2025: no interest, no joining fee, no penalties, no hidden charges; spend is deducted from earnings at the start of the next month; formats are PLA, PCA and recommended campaigns (Storyboard18, quoting Flipkart). "Saarthi" (27 Aug 2026, A) gives every seller a free AI campaign tool and access to certified agency partners.
9. **Flipkart Ads CPC is still unverified (C only, conflicting).** Blog ranges: Rs 4-15 (gonukkad), Rs 2-15 (fibre2fashion), Rs 9-18 Flipkart vs Rs 12-22 Amazon vs Rs 3-7 Meesho (2026 benchmark via search summary), Rs 1-5 typical (search summary). None is from Flipkart. Do not use as fact.
10. **Myntra Rising Stars offers zero commission to new D2C brands (Verified, B; new).** Business Standard, as reported by MediaNama (13 Jan 2026): zero commission for new fashion, beauty and lifestyle brands that currently sell mainly through their own website or social media. The pilot ran in the 2025 festive season. Duration and post-scale fees are NOT disclosed.
11. **Myntra commission and onboarding timelines are unverified and conflict (C).** Commission claims range 4-5% to 15-30%, plus a 22% apparel calculator figure. Onboarding claims are 6-12 weeks and 10-15 working days. Myntra's own partner pages were not reachable.
12. **Market share: the newest data is 2025 for Meesho and a 2026 festive projection (B, secondary).** Inc42 (8 Jul 2026) says Meesho took nearly 37% of Indian e-commerce order volume by FY25. Inc42 (27 Oct 2026), citing Redseer, projects 2026 festive e-commerce GMV at $15-16 bn, up about 25% from about $12.5 bn in 2025. No 2025 Flipkart-vs-Amazon GMV split was found.
13. **Flipkart's own scale figures (Verified, A, self-reported).** Flipkart Group reports more than 500 million registered users and over 1.4 million sellers including Shopsy (fashion release, 8 Jul 2026).
14. **Fashion return window: the 30-to-10-day cut dates to 2020, not the date the file gave (Corrected, C/B).** A 2016 general change (30 to 10 days on most top-selling products) is verified from Inc42 (6 Jun 2016). Flipkart said in Apr 2017 that its policy was unchanged since Apr 2016 (Inc42, 21 Apr 2017). A separate fraud-driven fashion cut is dated Jan 2020 by a search summary (FashionNetwork, 14 Jan 2020). That page was blocked, so the 2020 date is unverified. The current fashion window is not verified.

---

## Corrections made in pass 2

| # | Old (pass 1) | New (pass 2) | Basis |
|---|---|---|---|
| 1 | Fashion zero commission: "single-outlet snippets" | Confirmed by Flipkart's own release (8 Jul 2026) and Inc42 (8 Jul 2026). Scope: every price point, about 90,000 sellers. | Verified in pass 2 |
| 2 | "Shopsy zero commission since Aug 2021" | 2021 launch was a social-reseller model. Current 0% on all Shopsy products is from a later change (Inc42 8 Jul 2026; search summary dates it to about Dec 2025, not fetched). | Corrected |
| 3 | Penalty change "single summary, article not identified" | Identified: PTI via Outlook Business (25 Aug 2026) and Inc42 (27 Oct 2026). Rs 30 / Rs 60 / Rs 90 per shipment; effective 23 Aug 2026; new sellers exempt for 3 months. The "3+ months on platform" wording in pass 1 is the same exemption. | Verified in pass 2 |
| 4 | "Flipkart Minutes launched 2025 (search summary)" | Partner programme since Aug 2024; the two-year milestone was announced Sep 2026, so launch was about 2024 (inferred). | Corrected |
| 5 | "34% vs 11x: conflicting metrics" | Not a conflict. 34% = platform-wide new customers in the first hour; 11x = Flipkart Minutes new customers in the first hour. | Corrected |
| 6 | BBD 2026 start: "early access 8 Oct, sale 9 Oct (YourStory headline)" | Confirmed by Flipkart's release: early access opened at midnight on 8 Oct 2026; sale opened 9 Oct 2026 (13th edition). | Verified in pass 2 |
| 7 | BBD 2026 "51% of sellers 2x on early-access day" | Confirmed (Flipkart release, 9 Oct 2026). A separate figure: 31% of transacting sellers 2x business-as-usual over the whole sale (21 Oct 2026). These are different windows, not a conflict. | Verified in pass 2 |
| 8 | Fashion return cut "date unknown" | Search summary dates the fraud-driven cut to Jan 2020. Not fetched (blocked). The 2016 general change is verified. | Corrected, partly |
| 9 | Flipkart Ads credit launch: "B, Jul 2025" | Confirmed: Storyboard18, 17 Jul 2025, quoting Flipkart's own terms (no interest, no joining fee, no penalties, no hidden charges). | Verified in pass 2 |
| 10 | BBD 2025 start "23 Sep 2025" | Conflict: Business Today preview (18 Sep 2025) said 23 Sep; a search summary citing Coresight and Business Today says 21-22 Sep. Not resolved. | Still unverified (conflict) |
| 11 | Market share "only 2022 Redseer data" | Newer B-rated data found: Meesho about 37% of order volume by FY25 (Inc42, 8 Jul 2026); 2026 festive GMV projection (Inc42, 27 Oct 2026, citing Redseer). Still no 2025 Flipkart-vs-Amazon split. | Corrected (partly) |

---

## Findings by sub-question

### 1. How Flipkart search ranks listings (tiers, F-Assured, ratings, price, ads, PLA/PCA)

- Tier structure (Gold/Silver/Bronze on a rolling 90-day window): [C] https://www.gonukkad.com/blog/flipkart-account-management-checklist (undated); https://wareiq.com/resources/blogs/flipkart-gold-seller-complete-guide/ (undated). **Still unverified**: no Flipkart primary page was reachable (seller.flipkart.com returned HTTP 529, "Site is overloaded", on every try).
- Higher tiers get better placement, lower closing fees and priority deal slots: [C] https://www.eshopbox.com/blog/guide-to-becoming-flipkart-gold-seller (undated). **Still unverified**; the source sells tier-upgrade help, so treat as commercially biased.
- Payout days by tier: sources conflict. 2017 MediaNama: 7/12/15 business days (Gold/Silver/Bronze) [B, Nov 2017, outdated] https://www.medianama.com/2017/11/223-flipkart-sellers-policy-changes/ (fetched, 200 OK). A newer blog says Gold 7, Silver 10, Bronze 15 [C]. **Still unverified** for current values.
- Ranking inputs named by vendor guides: late dispatch, order defects, cancellations, listing completeness, conversion, rating, fulfilment speed, sales velocity [C, several vendor guides agree on the first four]. **Still unverified** as Flipkart policy. The new penalty regime (section 2) makes dispatch and cancellation directly costly, so the link to money is now verified even if the link to search rank is not.
- Flipkart Assured badge: needs quality audit and returns/ratings data [C]. **Still unverified**.
- **Still unverified:** Flipkart's pass-2 newsroom releases (Aug-Oct 2026) say nothing about search ranking, so ranking mechanics remain a PATTERN (section "Ranking / visibility mechanics").
- Flipkart Ads formats and credit (B): PLA, PCA and recommended campaigns; Advertise Now, Pay Later launched 17 Jul 2025; no interest, no joining fee, no penalties, no hidden charges; ad spend deducted from seller earnings at the start of the next month. **Verified in pass 2**: https://www.storyboard18.com/advertising/flipkart-rolls-out-credit-led-advertisement-initiative-to-boost-seller-visibility-75147.htm (17 Jul 2025, B). Quotes Flipkart's own terms.
- Flipkart Saarthi (new, 27 Aug 2026, A, Flipkart newsroom): free AI-powered campaign tool for all sellers (product-level insights, automated alerts, recommendations; seller stays in control) and certified agency partners. **Verified in pass 2**: https://stories.flipkart.com/announcement/flipkart-ads-launches-saarthi-to-help-sellers-grow-with-ai-powered-tools-and-expert-advertising-support (27 Aug 2026).
- CPC ranges: conflicting, all C, **still unverified**. Rs 4-15 [C] https://www.gonukkad.com/blog/flipkart-ads-worth-it; Rs 2-15 [C] https://emerge.fibre2fashion.com/blogs/11136/amazon-vs-flipkart-2026-where-should-you-focus-your-product-listings (2026 per URL); Rs 9-18 Flipkart vs Rs 12-22 Amazon vs Rs 3-7 Meesho [C, 2026 benchmark, search summary only]; Rs 1-5 typical [C, search summary only]. Use none as fact.
- Advice to advertise about 20-30% of the catalogue: [C] https://thegstco.com/kn/blogs/ecommerce/10-proven-strategies-to-boost-your-sales-performance-on-flipkart (undated). PATTERN; not measured.
- Price as ranking input: **not found** in any sourced document.

### 2. Fee structure changes (zero commission moves, Shopsy, fixed fees, penalties)

- **Fashion zero commission (Verified in pass 2, A):** from 8 Jul 2026 no sales commission on fashion at any price point; the Rs 1,000 cap was removed. About 90,000 transacting sellers. Sellers can retain additional margin. Source: https://stories.flipkart.com/announcement/flipkart-expands-zero-commission-across-fashion-empowering-sellers-and-accelerating-the-growth-of-india-s-fashion-ecosystem (8 Jul 2026). Corroborated by Inc42 (8 Jul 2026, B): https://inc42.com/buzz/flipkart-expands-zero-commission-policy-to-all-fashion-products/
- **Fashion fixed fee, collection fee and shipping amounts: Still unverified (conflicting, C).** Search summary 1: fixed fee Rs 8-35 per order and collection fee about 2% of order value. Search summary 2: about Rs 20 fixed, Rs 13 collection, Rs 70-90 shipping, plus 18% GST on fees. No official schedule was reached (seller.flipkart.com HTTP 529). Do not use these numbers. Verified only that fixed, collection and shipping fees still apply (Inc42, 27 Oct 2026, B).
- **Festive-season fee and penalty revamp (Verified, B):** PTI via Outlook Business (25 Aug 2026) and Inc42 (27 Oct 2026). Amazon raised its closing fee from 7 Sep 2026 (Rs 1 on items up to Rs 500, Rs 3 or more above). Flipkart's logistics arm is "mulling" a fulfilment-fee revision, per unnamed sources; **Still unverified**. https://www.outlookbusiness.com/corporate/amazon-flipkart-restructure-seller-fees-penalties-ahead-of-festival-season ; https://inc42.com/features/why-this-festive-season-is-getting-more-expensive-for-ecommerce-sellers/
- **Penalties (Verified in pass 2, B; Flipkart's own policy not reached):**
  - Rs 30 per shipment if not handed over by the Dispatch-By Date.
  - Rs 60 per shipment for a seller-initiated cancellation.
  - Rs 90 per shipment if the order is delayed and then cancelled.
  - Three missed DBDs count as a cancellation.
  - Effective 23 Aug 2026. New sellers in their first three months are exempt.
  - Replaces the earlier DBD breach, which could lock a seller account for a period.
  - Sources: https://www.outlookbusiness.com/corporate/amazon-flipkart-restructure-seller-fees-penalties-ahead-of-festival-season (25 Aug 2026, B); https://inc42.com/features/why-this-festive-season-is-getting-more-expensive-for-ecommerce-sellers/ (27 Oct 2026, B).
  - Sellers say they cannot always show who caused a delay; Inc42 notes disputes are "cumbersome".
- **Shopsy (Corrected, B):** Inc42 (8 Jul 2026) says Flipkart extended the zero-commission benefit to all Shopsy products regardless of price, after a 2025 move for products under Rs 1,000. Search summary dates the Shopsy extension to about Dec 2025 (Business Standard; not fetched). The Aug 2021 Shopsy launch was a social-reseller model with commissions for resellers, not a 0% seller rate card. Old vs new: "0% since 2021" becomes "0% on all Shopsy products since a late-2025 change (B)".
- **Shopsy 0% vs Meesho 0%** (PATTERN): Shopsy is positioned as a value channel. Inc42 (8 Jul 2026) says Meesho pioneered zero commission in 2021.
- Older Flipkart commission changes and "flat 2% collection" blog claims: [C] https://www.gonukkad.com/blog/flipkart-seller-price-calculator. **Still unverified**; do not use as fact.
- Commission range 3-25% on Flipkart: [C] https://swcybernetics.in/knowledge-base/flipkart-shopsy-seller-guide-2026 (2026). **Still unverified**; not a Flipkart rate card.

### 3. Big Billion Days 2025 and 2026 results

- **BBD 2026 (Verified in pass 2, A, Flipkart newsroom, 9 Oct 2026):**
  - Early access opened at midnight on 8 Oct 2026 for Flipkart Plus, Black and co-brand card members; over 287 million sessions in early access.
  - The sale opened 9 Oct 2026 (13th edition). 6.3 million concurrent users in the opening hour. About 1 in 15 Indian online shoppers visited in the first hour; over 6x more shoppers than a regular hour; new customers up 34%.
  - Non-metros about 60% of demand. Nearly 1 in 2 first-hour visits from Tier 3 and beyond.
  - Tablets +73%, large appliances +30%, beauty +42% in the first hour.
  - Source: https://stories.flipkart.com/announcement/india-logs-on-for-the-big-billion-days-flipkart-records-63-million-concurrent-users-as-the-festive-season-opens (9 Oct 2026, A).
- **BBD 2026 full sale (Verified, A, 21 Oct 2026):** about 9 in 10 Indian online shoppers visited during the 11 days. Unique visitors up nearly 10%. Orders, units and buyers each up about 20-22% year on year. Nearly half of buyers were Gen Z; about 60% from Tier 2+. Beauty, grooming and general merchandise buyers up 40%. 31% of transacting sellers had 2x business-as-usual; Tier 2+ sellers grew 2.15x. Source: https://stories.flipkart.com/announcement/flipkarts-big-billion-days-brings-in-more-users-across-categories (21 Oct 2026, A).
- **Flipkart Minutes in BBD 2026 (Verified, A):** orders 3.5x in the first hour; new customers 11x in the first hour (both 9 Oct 2026). New Minutes customers 1.7x over the full sale vs regular days (21 Oct 2026). 3.4 minutes to deliver an iPhone 17 in New Delhi during early access.
- **BBD 2026 GMV: not disclosed** by Flipkart in either release. **Still unverified** for any value. Do not use third-party GMV claims.
- **Sellers in BBD 2026:** 51% of transacting sellers 2x business-as-usual on early-access day; Tier 2+ sellers grew 2.9x (9 Oct 2026). 31% over the full sale (21 Oct 2026). Both Verified, A.
- **BBD 2025 (partly unverified):**
  - Sale start conflicts: 23 Sep 2025 per Business Today preview (18 Sep 2025, B, https://www.businesstoday.in/amp/tech-today/news/story/this-could-be-one-of-the-best-bbd-sales-in-recent-years-says-flipkart-494629-2025-09-18) vs 21-22 Sep per a search summary citing Coresight and Business Today. **Unresolved.**
  - Official 2025 GMV and order totals: **not found**. Flipkart's own newsroom has no 2025 GMV release in the results.
  - Secondary figures, not verified and not used: Flipkart 7.3 million shipments in one day (secondary write-up); an undated Entrackr estimate of $1-1.1 bn GMV over 5 days (C, possibly not 2025).
- Claims of a "record $200 million single-day sale" on mirror pages: excluded; unreliable.

### 4. Myntra seller onboarding for brands, Myntra ranking, M-Now quick fashion

- **Myntra Rising Stars zero commission (Verified in pass 2, B):** Myntra introduced a zero-commission model for early-stage D2C brands under its Rising Stars programme. It applies to new fashion, beauty and lifestyle brands that mostly sell through their own sites or social channels. It followed a 2025 festive-season pilot. Duration and post-scale fees: not disclosed. Source: https://www.medianama.com/2026/01/223-myntra-zero-commission-model/ (13 Jan 2026, B, reporting Business Standard).
- **Myntra commission rates: Still unverified (conflicting, C).** One guide: 18-28% by category. Another: 15-30% plus operational charges. Another: 4-5%. A 2026 calculator: 22% for apparel. MediaNama (B analysis, 13 Jan 2026) describes such fees as "25-30%" for brands that cannot sustain standard fees. Other charges cited by C sources: return/RTO shipping Rs 50-150; TCS 1%. Myntra's partner portal was not reachable.
- **Onboarding documents (C, consistent across guides):** GST, PAN, bank details, business registration proof, brand authorisation where applicable, trademark details where applicable. https://unicommerce.com/blog/myntra-m-now-business-guide/ (page header April 2026); https://www.shiprocket.in/blog/how-to-sell-on-myntra-m-now-delhi/ (undated).
- **Onboarding timing: Still unverified (conflicting, C).** 4-8 weeks (swcybernetics, undated); 6-12 weeks for most brands (search summary, 2026); 10-15 working days (search summary). Application review: 3-5 days to 2-4 weeks. One source says Myntra rejects most requests and approves only a few. Treat as unverified.
- **Growth Enablement Fee (C, single source, 2025):** one-time fee deducted from first settlements; no registration fee. https://emerge.fibre2fashion.com/blogs/11138/myntra-seller-guide-2025-how-fashion-brands-can-win-on-india-s-top-fashion-marketplace . **Still unverified.**
- **M-Now launch (Dec 2024, B, not re-fetched in pass 2):** 30-minute fashion delivery, Bengaluru first. https://techcrunch.com/2024/12/05/myntra-pushes-into-india-quick-commerce-race-with-30-minute-fashion-delivery . Still correct as stated, but not re-checked.
- **M-Now expansion to Delhi-NCR, Mumbai and Hyderabad (C, 2026 guide):** https://emerge.fibre2fashion.com/blogs/11221/myntra-seller-success-guide-fwd-program-m-express-optimization-2026 . **Still unverified.**
- **Current M-Now commission: not found.**
- **Myntra ranking mechanics: not found** in any sourced form.

### 5. Flipkart Minutes (quick commerce) scale

- **Verified in pass 2 (A, self-reported, Flipkart newsroom, 11 Sep 2026):** 4x year-on-year growth; about 1,200 micro-fulfilment centres across 150+ cities; Tier 2+ customer base up about 25x; Gen Z customers up about 5x and over 45% of orders in several non-grocery categories; about 60% of customers return; more than 4 lakh direct and indirect jobs since launch; biggest single order Rs 6 lakh (five smartphones).
- **Partner ecosystem:** close to 500 D2C brands since Aug 2024 (A). Source: https://stories.flipkart.com/announcement/flipkart-minutes-marks-two-years-with-4x-growth-reaches-over-150-cities (11 Sep 2026).
- **Competition (B, search summary, Inc42 8 Jul 2026):** Minutes competes with Blinkit, Swiggy Instamart, Zepto and Amazon Now. An industry body (AICPDF) has asked the government to examine whether quick-commerce operations by Amazon and Flipkart comply with FDI rules. **Still unverified** as a government action; only the complaint is reported.
- **2026 GMV, dark-store count and city count from third parties: not found.** The Flipkart figures above are company-reported.

### 6. Flipkart IPO status 2026

- Not re-verified in pass 2 (outside the priority list). Pass-1 status stands as reported: bank pitches planned for April 2026 (Bloomberg, Mar 2026); reported deferral (Zerodha Z-Connect, 15 May 2026, C); no DRHP found in latest sources (C). **Still unverified** on this pass.

### 7. Market share: Flipkart vs Amazon vs Meesho

- **Redseer 2022 festive first week (old, B):** Flipkart Group about 62% of GMV, Amazon about 26%. https://inc42.com/buzz/festive-sales-ecommerce-firms-record-5-7-bn-gmv-in-week-1/ (Oct 2022). Old; do not use as current.
- **Redseer 2022 order share:** Flipkart Group about 49%, Meesho about 21%. Amazon disputed the report. https://startup.outlookindia.com/sector/e-commerce/amazon-india-terms-redseer-report-on-festive-season-speculative-news-6475 (2022).
- **2023 festive first week (B):** Meesho share of orders 25%, up from 21%. https://www.outlookbusiness.com/amp/story/news/e-commerce-firms-sales-rise-19-to-rs-47000-crore-in-1st-week-of-festive-season-sale (Oct 2023).
- **Meesho order-volume share by FY25 (B, new):** nearly 37% of India's e-commerce order volume by FY25, as cited by Inc42 (8 Jul 2026). https://inc42.com/buzz/flipkart-expands-zero-commission-policy-to-all-fashion-products/ . Secondary citation; the underlying source was not reached. **Still unverified at primary level.**
- **2026 festive projection (B, new):** Redseer projects festive e-commerce GMV of $15-16 bn in 2026, up about 25% from about $12.5 bn in 2025; online festive shoppers 180-185 million vs 160 million. Inc42 (27 Oct 2026), citing Redseer. https://inc42.com/features/why-this-festive-season-is-getting-more-expensive-for-ecommerce-sellers/
- **Flipkart's own scale (A, self-reported, 8 Jul 2026):** more than 500 million registered users; over 1.4 million sellers including Shopsy. https://stories.flipkart.com/announcement/flipkart-expands-zero-commission-across-fashion-empowering-sellers-and-accelerating-the-growth-of-india-s-fashion-ecosystem
- **Flipkart vs Amazon 2025 GMV split: not found.** Meesho's 2025 IPO prospectus (Redseer data) is the closest primary source; not reached this pass.

### 8. Seller sentiment, complaints, returns and penalties

- **Consumer complaints, 2025 (A for govt dashboard; pass 1 figures, not re-checked in pass 2):** Flipkart about 1.33 lakh on the National Consumer Helpline; Amazon 91,248; Meesho 29,284. https://consumerhelpline.gov.in/public/dashboard/companyNatureWise/454 . These are buyer complaints, not seller complaints.
- **Fashion return window (Corrected, partly):**
  - Verified: Flipkart cut the return window on most top-selling products from 30 to 10 days in June 2016 (Inc42, 6 Jun 2016, B). Source: https://inc42.com/flash-feed/flipkart-return-policy
  - Verified: Flipkart said in Apr 2017 that its policy had been unchanged since Apr 2016 (Inc42, 21 Apr 2017, B). Source: https://inc42.com/?p=90573
  - Corrected: the fraud-driven cut of fashion returns from 30 to 10 days (winter wear) is dated Jan 2020 by a search summary (FashionNetwork, 14 Jan 2020). Page blocked; **still unverified** at primary level. Pass 1 said "date unknown".
  - Current fashion return window: a 2026 affiliate guide says 10 days for lifestyle (C; https://zoutons.com/news/flipkart-return-replacement-policy-2026 blocked). **Still unverified** against Flipkart's own table.
- **Fraud enforcement (about 500 sellers acted against, 250 blacklisted):** [B, undated] https://inc42.com/flash-feed/flipkarts-secret-agents-report-fraud-sellers. **Still unverified** date.
- **Seller penalties:** verified in section 2 (Rs 30 / 60 / 90 per shipment, from 23 Aug 2026).
- **Consumer court order (Nov 2024):** Mumbai commission ordered Flipkart to pay Rs 10,000 plus refund over a fake-product return. [B, 2024] https://www.medianama.com/2024/11/223-consumer-forum-orders-flipkart-pay-rs-10000-refusing-return-fake-product/ . Not re-checked.
- **Seller-side payout disputes:** an unpaid dues notice of $2.9 m (Inc42, undated) and the 2016 seller revolt over policy changes (Business Insider, 2016). Old and undated; not re-checked.
- **Seller-side 2025 sentiment survey: not found.** Inc42 (27 Oct 2026) quotes sellers and FIRST India saying fee and penalty changes arrive mid-season with little notice (B, verified as a quote).

---

## Ranking / visibility mechanics

- **Organic search (PATTERN; C-sourced, consistent across vendor guides, not confirmed by Flipkart):** listing quality, sales velocity, conversion, rating, late dispatch, defect and cancellation rates. Tier changes placement and fees. Badge adds trust.
- **Money effect of dispatch and cancellations (Verified, B):** the new penalties make late dispatch and cancellation direct costs (Rs 30-90 per shipment) from 23 Aug 2026, separate from any search effect.
- **Paid (Verified, B and A):** PLA, PCA and recommended campaigns; credit option since Jul 2025; free AI campaign tool and agency partners from Aug 2026. CPC: not verified.
- **Fashion economics (Verified, A):** zero commission on fashion from 8 Jul 2026 changes margin for fashion sellers, while fixed, collection and shipping fees still apply.
- **Price as a ranking input:** not found in any sourced document.
- **Myntra ranking:** not verified.
- **Shopsy:** 0% commission on all products (Verified, B); visibility mechanics not sourced.

## What a small new D2C seller should do / avoid (PATTERN, labelled)

Do:
- Check Seller Hub's current rate card before pricing; fashion commission and Shopsy 0% are the two numbers most likely to change margin. (FACT that they moved, verified; recommendation is PATTERN.)
- Set dispatch and cancellation discipline from day one. A Rs 90 penalty per order is now real money for low-price items. (FACT on the penalty, verified; PATTERN on the action.)
- Log every penalty and settlement deduction, and keep dispatch evidence to contest wrongful charges. (PATTERN; Inc42 27 Oct 2026 quotes sellers saying disputes are cumbersome.)
- Use Flipkart's free Saarthi AI tool and/or the credit option only after measuring ROAS on a small set of SKUs. (PATTERN; C-sourced CPC ranges are not reliable.)
- For Myntra: get GST, PAN, bank, business registration and brand authorisation ready before applying. Expect a multi-week wait. (Documents are C, consistent across guides; timing is unverified.)
- If you are a fashion D2C brand on your own site, the Myntra Rising Stars zero-commission route is worth asking about, but get the duration and post-scale fee terms in writing. (FACT that the programme exists, verified via B; PATTERN on the advice.)

Avoid:
- Do not price Flipkart fashion items on the assumption that only the commission is zero; the fixed, collection and shipping fees still apply and their amounts are unverified. (PATTERN.)
- Do not rely on tier-upgrade consultancies' claims about payout days or fee discounts. (C.)
- Do not use the 2022 Redseer share split as current. (Old data.)
- Do not treat third-party BBD GMV claims as official; Flipkart reports growth percentages only. (Verified.)
- Do not expect Flipkart IPO news to change seller economics in the short term. (PATTERN.)

---

## Open questions and conflicting claims

- **Fashion fixed, collection and shipping amounts (Still unverified):** no primary source; seller.flipkart.com returned HTTP 529. Two conflicting C-sourced sets of figures (Rs 8-35 fixed plus about 2% collection; or about Rs 20 fixed, Rs 13 collection, Rs 70-90 shipping). Retry seller.flipkart.com when it is back.
- **Seller tier rules and payout days by tier (Still unverified):** no primary Flipkart page reached.
- **Flipkart Ads CPC (Still unverified):** four conflicting C figures; none from Flipkart. advertising.flipkart.com was blocked (403).
- **Flipkart fulfilment-fee revision (Still unverified):** reported only as "mulling", per unnamed sources (Inc42, 27 Oct 2026, B).
- **Penalty exemption wording:** the release says new sellers are exempt for three months; one search summary says "first 90 days". Consistent with each other. Outlook/PTI and Inc42 both say three months.
- **Penalty effect on accounts:** Outlook (PTI) says the new regime replaces the old account-lock regime; one search summary said penalties do not lock accounts. Consistent with the PTI report; Flipkart's policy page not reached.
- **Shopsy extension date:** Inc42 (8 Jul 2026) confirms the current 0% on all Shopsy products; the search summary's about-Dec-2025 date is not verified.
- **BBD 2025 sale start:** 23 Sep 2025 (Business Today preview) vs 21-22 Sep (search summary). Unresolved.
- **BBD 2025 and 2026 GMV:** not disclosed by Flipkart for 2026 (growth % only); not found for 2025.
- **Market share 2025:** only Meesho order-share (about 37% by FY25, secondary) and the 2026 festive GMV projection. No Flipkart vs Amazon 2025 split.
- **Myntra commission:** 4-5% vs 15-30% vs 18-28% vs 22% (apparel). Unresolved. MediaNama cites 25-30% as typical for such brands (B analysis).
- **Myntra onboarding timing:** 4-8 weeks vs 6-12 weeks vs 10-15 working days; selectivity claim unverified.
- **Myntra Rising Stars duration:** not disclosed (MediaNama 13 Jan 2026).
- **Fashion return window (current):** 10 days for lifestyle per a 2026 affiliate guide (C); 2020 fraud-driven change dated by a search summary; both unverified against Flipkart.
- **Flipkart Minutes GMV and store count (2026):** not found; company reports "1,200 micro-fulfilment centres" and "150+ cities" only.
- **Not reached this pass:** seller.flipkart.com, advertising.flipkart.com, myntra.com, partners.myntra.com, freepressjournal.in, thenewsminute.com, yourstory.com (penalty article), theweek.in, trak.in, fashionnetwork.com, gonukkad.com, zoutons.com.

---

## Sources

Ratings and dates are as defined in the rules. "Fetched" = read in full by curl in pass 2 (copy saved in /tmp/d2c-fetch/ where noted). "Search summary" = seen only in a search result, not fetched.

1. https://stories.flipkart.com/announcement/flipkart-expands-zero-commission-across-fashion-empowering-sellers-and-accelerating-the-growth-of-india-s-fashion-ecosystem (8 Jul 2026; A; fetched; /tmp/d2c-fetch/fk_fashion_zero_commission_2026-07-08.txt)
2. https://inc42.com/buzz/flipkart-expands-zero-commission-policy-to-all-fashion-products/ (8 Jul 2026; B; fetched; /tmp/d2c-fetch/inc42_fashion_zc_2026-07-08.txt)
3. https://stories.flipkart.com/announcement/flipkart-minutes-marks-two-years-with-4x-growth-reaches-over-150-cities (11 Sep 2026; A; fetched; /tmp/d2c-fetch/fk_minutes_2yr_2026-09-11.txt)
4. https://stories.flipkart.com/announcement/india-logs-on-for-the-big-billion-days-flipkart-records-63-million-concurrent-users-as-the-festive-season-opens (9 Oct 2026; A; fetched; /tmp/d2c-fetch/fk_bbd2026_day1_2026-10-09.txt)
5. https://stories.flipkart.com/announcement/flipkarts-big-billion-days-brings-in-more-users-across-categories (21 Oct 2026; A; fetched; /tmp/d2c-fetch/fk_bbd2026_result_2026-10-21.txt)
6. https://stories.flipkart.com/announcement/flipkart-ads-launches-saarthi-to-help-sellers-grow-with-ai-powered-tools-and-expert-advertising-support (27 Aug 2026; A; fetched; /tmp/d2c-fetch/fk_saarthi_2026-08-27.txt)
7. https://www.outlookbusiness.com/corporate/amazon-flipkart-restructure-seller-fees-penalties-ahead-of-festival-season (PTI, 25 Aug 2026; B; fetched; /tmp/d2c-fetch/outlook_penalties_2026-08-25.txt)
8. https://inc42.com/features/why-this-festive-season-is-getting-more-expensive-for-ecommerce-sellers/ (27 Oct 2026; B; fetched; /tmp/d2c-fetch/inc42_festive_fees_2026-10-27.txt)
9. https://www.storyboard18.com/advertising/flipkart-rolls-out-credit-led-advertisement-initiative-to-boost-seller-visibility-75147.htm (17 Jul 2025; B; fetched; /tmp/d2c-fetch/storyboard18_anpl_2025-07-17.txt)
10. https://www.medianama.com/2026/01/223-myntra-zero-commission-model/ (13 Jan 2026; B; fetched; /tmp/d2c-fetch/medianama_myntra_2026-01-13.txt)
11. https://inc42.com/flash-feed/flipkart-return-policy (6 Jun 2016; B; fetched; /tmp/d2c-fetch/inc42_return_2016-06-06.txt)
12. https://inc42.com/?p=90573 (21 Apr 2017; B; fetched; /tmp/d2c-fetch/inc42_return_denial_2017-04-21.txt)
13. https://www.medianama.com/2017/11/223-flipkart-sellers-policy-changes/ (Nov 2017; B; outdated; fetched, 200 OK)
14. https://www.businesstoday.in/amp/tech-today/news/story/this-could-be-one-of-the-best-bbd-sales-in-recent-years-says-flipkart-494629-2025-09-18 (18 Sep 2025; B; not fetched)
15. https://inc42.com/buzz/festive-sales-ecommerce-firms-record-5-7-bn-gmv-in-week-1/ (Oct 2022; B; old; not re-fetched)
16. https://startup.outlookindia.com/sector/e-commerce/amazon-india-terms-redseer-report-on-festive-season-speculative-news-6475 (2022; B; old; not re-fetched)
17. https://www.outlookbusiness.com/amp/story/news/e-commerce-firms-sales-rise-19-to-rs-47000-crore-in-1st-week-of-festive-season-sale (Oct 2023; B; old; not re-fetched)
18. https://consumerhelpline.gov.in/public/dashboard/companyNatureWise/454 (2025 data; A; pass 1, not re-checked)
19. https://www.medianama.com/2024/11/223-consumer-forum-orders-flipkart-pay-rs-10000-refusing-return-fake-product/ (Nov 2024; B; pass 1, not re-checked)
20. https://techcrunch.com/2024/12/05/myntra-pushes-into-india-quick-commerce-race-with-30-minute-fashion-delivery (5 Dec 2024; B; pass 1, not re-checked)
21. https://unicommerce.com/blog/myntra-m-now-business-guide/ (page header Apr 2026; C; search-summary era, not fetched)
22. https://www.shiprocket.in/blog/how-to-sell-on-myntra-m-now-delhi/ (undated; C; not fetched)
23. https://emerge.fibre2fashion.com/blogs/11138/myntra-seller-guide-2025-how-fashion-brands-can-win-on-india-s-top-fashion-marketplace (2025; C; not fetched)
24. https://emerge.fibre2fashion.com/blogs/11221/myntra-seller-success-guide-fwd-program-m-express-optimization-2026 (2026; C; not fetched)
25. https://swcybernetics.in/knowledge-base/flipkart-shopsy-seller-guide-2026 (2026; C; not fetched)
26. https://www.gonukkad.com/blog/flipkart-account-management-checklist (undated; C; not fetched; blocked 403 in this pass)
27. https://www.gonukkad.com/blog/flipkart-ads-worth-it (undated; C; not fetched; blocked 403 in this pass)
28. https://emerge.fibre2fashion.com/blogs/11136/amazon-vs-flipkart-2026-where-should-you-focus-your-product-listings (2026; C; not fetched)
29. https://thegstco.com/kn/blogs/ecommerce/10-proven-strategies-to-boost-your-sales-performance-on-flipkart (undated; C; not fetched)
30. https://inc42.com/flash-feed/flipkarts-secret-agents-report-fraud-sellers (undated; B; not re-fetched)
31. https://www.freepressjournal.in/business/flipkart-expands-zero-commission-fashion-policy-removes-1000-cap-to-boost-seller-margins (2026; B; not reachable this pass)
32. https://in.fashionnetwork.com/news/Flipkart-tightens-returns-policy-for-clothing-and-lifestyle-goods-on-fraud-suspicions,1175076.html (14 Jan 2020 per search summary; B; blocked 403)
33. https://zoutons.com/news/flipkart-return-replacement-policy-2026 (2026; C; blocked 403)
34. https://www.theweek.in/news/biz-tech/2026/08/25/why-amazon-flipkart-will-penalise-sellers-more-this-festive-season.html (25 Aug 2026; B; not reachable this pass)
35. https://yourstory.com/2026/08/amazon-flipkart-restructure-seller-fees-penalties-ahead-of-festival-season (Aug 2026; B; blocked 403)
36. https://www.indianretailer.com/news/flipkart-rolls-out-0-pc-commission-rate-card-across-shopsy (undated; B; search result only)
37. Business Standard report on the Shopsy 0% extension (search summary dates it about 8 Dec 2025; article URL not captured; not fetched)
38. https://emerge.fibre2fashion.com/blogs/11209/how-to-increase-flipkart-sales-in-2026-10-proven-strategies (2026; C; not fetched)
39. https://ipocentral.in/meesho-ipo-10-key-points-investors-should-know/ (Oct 2025; C; not re-fetched)
