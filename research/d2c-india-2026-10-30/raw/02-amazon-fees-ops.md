# 02 - Amazon.in seller economics and operations, 2025-2026

Research date: 30 Oct 2026. Sweep: India D2C, sub-topic Amazon.in fees and operations.

## Important limits of this run

- Amazon's own India pages (press.aboutamazon.com/in, sell.amazon.in, sellercentral.amazon.in fee pages) could not be fetched. The session's network returned "host does not resolve" for press.aboutamazon.com and sell.amazon.in. Some of their content was seen only as search-result titles and short search summaries, and those are marked below.
- The search tool hit its per-turn limit twice, so some sub-questions have fewer searches than planned.
- No official 2026 referral-fee table, closing-fee table, Easy Ship/Self Ship rate card or FBA fee card was retrieved. The fee tables below are therefore built from press releases seen in search results, secondary blogs and one seller-forum post. Treat every number as "verify in Seller Central fee calculator before pricing."
- Rating key (from RULES.md): A = official, B = reputable press, C = blog/agency/forum.

## Pass 2 status (30 Oct 2026), SUPERSEDED by the 31 Oct section below

## Pass 2, 31 Oct 2026 (official pages fetched with curl; supersedes the 30 Oct status above)

Method: curl through the proxy, as in RULES.md "How to fetch pages on pass 2". Rendered text is saved in /tmp/d2c-fetch/. Tags: **Verified in pass 2** = confirmed on an official page, **Corrected** = old claim changed, **Still unverified** = not reached. Official pages: sell.amazon.in/fees-and-pricing, /fees-and-pricing/fee-schedule, /shipping-and-fulfillment/fulfillment-by-amazon, /brand-registry, /seller-blog/a-to-z-gst-guide; press.aboutamazon.com/in/2026/3/...; aboutamazon.in (Karigar/Saheli/Launchpad, Jan 2026); cbic-gst.gov.in.

Blocked: the weight-handling rate tables on the fee schedule are images at m.media-amazon.com. The proxy returns 403 for that host, so those numbers are **Still unverified**. The apparel closing fee for each price band is not cleanly readable from the scraped text, so it is also **Still unverified** except where an official example gives it.

### Verified in pass 2
1. Zero referral fee on items under Rs 1,000, across 1,800+ categories, over 12.5 crore products, from 16 Mar 2026. Covers t-shirts, shoes, sarees, pet accessories and more. [A, press.aboutamazon.com/in/2026/3/amazon-announces-zero-referral-fees-on-over-12-5-crore-products-sellers-to-save-up-to-70-in-fees, Mar 2026; also fee-schedule page]
2. The Rs 300 vs Rs 1,000 conflict is resolved. **Corrected.** The 2026 referral threshold is Rs 1,000. Rs 300 belongs to two other rules: the 2025 referral waiver (under Rs 300), and the 2026 Easy Ship cut ("save Rs 15 per order for products under Rs 300 on Easy Ship: Rs 10 lower weight handling across slabs, Rs 5 lower closing fee"; press: Easy Ship fees cut by more than 20% for products under Rs 300). The Outlook Business snippet that said "referral 0% under Rs 300" for apparel is wrong. [A, press release and fee-schedule page, Mar 2026]
3. Referral fees above Rs 1,000 for apparel are official now, and they vary widely. **Corrected**: the 5-17% range in the earlier notes does not apply to Amazon.in apparel. The fee schedule (A, sell.amazon.in/fees-and-pricing/fee-schedule, current at fetch) gives these rates for price above Rs 1,000:

| Category (fee schedule name) | Referral % above Rs 1,000 |
|---|---|
| Apparel - Baby | 7.00 |
| Apparel - Sarees and Dress Materials | 15.00 (was 23.00 in the "current" column) |
| Apparel - Men's T-shirts (except polos, tank tops, full-sleeve tops) | 23.00 (23.00 in both columns) |
| Apparel - Shirts | 21.00 |
| Apparel - Dress | 19.00 |
| Apparel - Other products | 19.00 |
| Apparel - Sweat shirts and jackets | 18.00 |
| Apparel - Shorts | 24.00 |
| Apparel - Sleepwear / Other innerwear / Socks / Thermals | 19.00 / 18.50 / 19.00 / 19.00 |
| Apparel - Ethnic wear | 16.50 |
| Apparel - Accessories | 19.00 |

   The page's header says referral fees "dropped for products above Rs 1,000 ... 4% to 9.5%" for "select high-demand categories, including Apparel". The table shows cuts for some apparel rows (e.g. sarees) but not for T-shirts. Check the exact category in Seller Central before pricing. [A]
4. Closing fee change from **7 Sep 2026**. **Corrected**: the page says products up to Rs 500 get +Rs 1, and products above Rs 500 get +Rs 3. The change applies to **FC, Easy Ship and Seller Flex**. It is not stated for Self Ship. The page gives the reason as rising logistics costs. [A, fee-schedule page]
5. Official closing-fee examples (A, fees page and fee-schedule page):
   - FC: Beverages Rs 249 gives Rs 27 (0-300 band). Shorts Rs 450 gives Rs 15 (301-500 band, Group D).
   - Easy Ship: sandals Rs 299 gives Rs 2. Sandals Rs 450 gives Rs 23.
   - Self Ship: facewash Rs 299 gives Rs 20. Shirt (apparel) Rs 499 gives Rs 26. The page's "Self Ship closing fee" change shows Rs 45 to Rs 20 (under Rs 300) and Rs 35 to Rs 26 (Rs 300-500). The forum figure of Rs 26 for Rs 300-500 is confirmed for Self Ship. [A]
6. FC pick and pack: Rs 17 per unit for standard items up to 1 kg, Rs 5 for each extra kg up to 5 kg, Rs 2 for each further 5 kg. Heavy and bulky: Rs 26 per unit. Storage: Rs 50 per cubic foot per month. FC removal: Rs 10 standard, Rs 30 expedited, Rs 100 heavy and bulky (per unit). [A, fees page]
7. Easy Ship weight handling, text examples (A, fees page; date not shown): 800 g to a regional zone = Rs 68 (Rs 51 for the first 500 g + Rs 17 for the next 500 g). 350 g flat shipping = Rs 55 (example headphone). 3.5 kg = Rs 180 (Rs 112 + 2 x Rs 34). Self Ship has no Amazon shipping fee. [A, fees page]
8. Worked totals from Amazon's own press release, after 16 Mar 2026, all fees, under 500 g: T-shirt Rs 299 on Easy Ship, total fees Rs 71 to Rs 56. Necklace set Rs 999 on Easy Ship, Rs 324 to Rs 100. Earphones Rs 798 on FC, Rs 248 to Rs 109. [A]
9. FBA illustration (A, FBA page, Nokia 105, Rs 1,000, 300 g, national): referral Rs 50 (5%). Closing: Easy Ship Rs 30, FBA Rs 18. Weight handling: Easy Ship Rs 72, FBA Rs 61. FBA pick and pack Rs 11. FBA storage Rs 3 per unit (Rs 33 per cubic foot per month). Total: Easy Ship Rs 152 (15.2%), FBA Rs 153 (15.3%). An FBA offer waives inbound, storage and removal fees for the first 3 months or 100 units. [A, illustrative]
10. Payment cycle (A, fees page): "eligible to get paid for the order 7 days after the order is delivered", and deposits every 7 days, including Pay on Delivery orders. Faster cycles are available to eligible sellers. This applies to new sellers joining the "Standard" level of Amazon STEP. **Corrected**: the 14-day first payment in the earlier notes does not match this page. The DD+7 reserve reported from 12 Mar 2026 is consistent with "7 days after delivery", but the 2026 reserve wording did not appear on the page. [A for the 7-day rule; DD+7 still unverified]
11. Brand Registry eligibility (A, sell.amazon.in/brand-registry): you need "an active, registered trademark or a pending trademark application for your brand name or logo" issued by a designated government trademark office of a country with an Amazon store. You must be the trademark owner. The trademark text must match the brand name. You need the application or registration number. Enrolment is free, and you do not need to sell on Amazon.in first. Word or design marks are accepted. **Verified in pass 2** that a pending application is sufficient. The anecdote that a registered mark entered as "pending" is refused is **Still unverified**. [A]
12. GST composition and TCS. The CBIC-hosted text of the CGST Bill (as introduced in Lok Sabha, Bill No. 57 of 2017; https://cbic-gst.gov.in/pdf/CGST-bill-e.pdf) contains the clause that a person is not eligible for the composition scheme if "he is not engaged in making any supply of goods through an electronic commerce operator who is required to collect tax at source under section 52". This matches the earlier notes that cite Section 10. **Partly verified**: the enacted Act text was not reached (the CBIC pages for it returned 404). The CBIC composition-levy FAQ page has nothing on e-commerce. The TCS rate under s.52 is **Still unverified**. [A for the Bill text, a 2017 document]
13. Karigar, Saheli, Launchpad (A, aboutamazon.in, 16 Jan 2026): Karigar, launched 2017, supports artisan sellers (over 18 lakh artisans, 24 states and UTs). Saheli enables women entrepreneurs (70+ government, NGO and not-for-profit partners). Saheli Accelerate offers structured onboarding and mentorship for women-led startups. Launchpad offers assisted onboarding, optimised listings and brand consultation for emerging brands. **Still unverified**: enrolment criteria, and the "2.5x" and "1.7x" growth figures. [A]
14. Amazon Bazaar: the fee schedule notes a Rs 8 cut in Easy Ship weight handling for Bazaar sellers, up to 2 kg. [A]
15. Amazon GST guide page (A, sell.amazon.in/seller-blog/a-to-z-gst-guide) lists GST registration, returns, and invoicing for Easy Ship and Self Ship. It says nothing on composition. [A]

### Still unverified (not reached in this pass)
- Weight-handling rate cards (ES, FC, SF) as tables. Images blocked by the proxy.
- Closing-fee slab for each apparel price band on FC, Easy Ship and Self Ship (only the examples above are confirmed).
- Returns and cancellation fees for sellers (no fee text found on the fee pages).
- Prime badge criteria for India, Amazon Now and Bazaar seller terms, and seller count (20 lakh, 8 Sep 2026).
- DD+7 reserve wording (2026).
- Enacted CGST Act s.10(2)(d) and s.52 TCS rate.

### Fee table: Rs 499, Rs 799, Rs 1,299 apparel (inputs stated; calc script /tmp/d2c-fetch/fees_calc.py)

Assumptions: the item is an apparel item in a category named in the fee schedule. Buyer pays no shipping. GST is ignored. The Self Ship channel is used because it has the most confirmed closing-fee numbers. The example product for Rs 1,299 is a men's T-shirt (23%).

| Line | Rs 499 | Rs 799 | Rs 1,299 |
|---|---|---|---|
| Referral | 0 (official) | 0 (official) | 23% = Rs 298.77 (official rate, men's T-shirt). Range across apparel categories: Rs 90.93 (7%) to Rs 311.76 (24%) |
| Closing, Self Ship | Rs 26 (official example, shirt at Rs 499) | Not retrieved | Not retrieved |
| Closing, FC / Easy Ship from 7 Sep 2026 | Not retrieved for apparel group; +Rs 1 | Not retrieved; +Rs 3 | Not retrieved; +Rs 3 |
| Weight handling | Not retrieved (image blocked). Text example: Easy Ship 500 g regional = Rs 51 | Not retrieved | Not retrieved |
| Net after referral and Self Ship closing, before shipping | Rs 473.00 | Not computable (closing unknown) | Rs 1,000.23 before closing (closing not retrieved) |
| Press-release anchor | T-shirt Rs 299 on Easy Ship, all fees Rs 56 (under 500 g) | | |

Read the table this way: at Rs 499 and below, the fee cost is small and the sharpest cut is the zero referral. At Rs 1,000 and above, the category referral rate applies to the whole price, so the Rs 999 vs Rs 1,000 boundary matters. At Rs 1,299, a T-shirt pays about Rs 299 in referral alone. Only the Seller Central calculator can give the final closing and weight-handling figures for each SKU.

### Next step
Pass 2 is partly complete. Add sell.amazon.in/shipping-and-fulfillment/... and the weight-handling image host (m.media-amazon.com) to the session allow-list, and any Seller Central fee-calculator page that is public. Then fill the blocked rows.


Verification attempt: WebFetch returned DNS failure ("getaddrinfo ENOTFOUND") for sell.amazon.in,
press.aboutamazon.com, www.aboutamazon.in, cbic-gst.gov.in, yourstory.com, indiaseatradenews.com and
novadata.io. Nothing from those hosts was confirmed in this pass. Only the WebSearch snippets below
were available, and they are NOT verified. The sell.amazon.in, sellercentral.amazon.in and
press.aboutamazon.com allow-list needs to be opened for the session before a full pass 2 can run.

- Zero-fee cap of Rs 1,000 from 16 Mar 2026: "Verified by coordinator" (aboutamazon.in, per the brief). Not re-fetched in this pass.
- NEW snippet, UNVERIFIED: a search summary attributed to sell.amazon.in says Amazon India's 2026 blog reports
  referral fee cuts of "about 4% to 9.5%" across fashion and other key categories. Source URL not fetched. Use only as a candidate for the apparel rate, pending the official page.
- CONFLICT, UNRESOLVED: an Outlook Business snippet (1 Apr 2026) says zero referral on about 12 million products "under Rs 300", with clothing and shoes listed. This clashes with the Rs 1,000 cap. It may be a 2025 wording or a summary error. Not fetched.
- SNIPPET, UNVERIFIED: sell.amazon.in blog says self-ship closing fee cut from Rs 45 to Rs 20 for items under Rs 300.
- A search summary also pointed to a sell.amazon.in URL titled "...complete guide to seller fee change 2026" (the file's source 12 is the 2025 slug). Not fetched.
- Still unverified: every referral %, closing fee, weight handling, Easy Ship/Self Ship/FBA rate, payment cycle, DD+7 date, Brand Registry rule, GST composition rule (CBIC), Bazaar/Amazon Now seller terms, Prime criteria, Karigar/Saheli/Launchpad criteria.

### Illustrative fee table (apparel, Rs), computed in code

Inputs (all from this file, C-rated unless stated):
- Fee base = selling price. Buyer pays no shipping. GST on the price is ignored.
- Referral fee: 0 under Rs 1,000 (coordinator-verified). Above Rs 1,000: unknown %.
- Closing fee: third-party Easy Ship slab (Rs 9 for 251-500, Rs 30 for 501-1,000, Rs 50 for 1,001-5,000). Forum post says Rs 26 for Rs 300-500. The two conflict.
- Weight handling for a 500 g or lighter parcel: local zone Rs 29, national zone Rs 65 (Easy Ship, third-party table).

| Price | Referral | Closing (slab / forum) | Weight local / national | Net after fees, local / national |
|---|---|---|---|---|
| Rs 499 | 0 | 9 (slab) / 26 (forum) | 29 / 65 | 461 / 425 (slab); 444 / 408 (forum) |
| Rs 799 | 0 | 30 | 29 / 65 | 740 / 704 |
| Rs 1,299 | Unknown (%) | 50 | 29 / 65 | 1,220 / 1,184 before referral |
| Rs 1,299 at 5% (illustrative) | 64.95 | 50 | 29 / 65 | 1,155 / 1,119 |
| Rs 1,299 at 10% (illustrative) | 129.90 | 50 | 29 / 65 | 1,090 / 1,054 |
| Rs 1,299 at 17% (illustrative) | 220.83 | 50 | 29 / 65 | 999 / 963 |

Caveats: the 5%, 10% and 17% rates are not sourced for apparel on Amazon.in. The 5-17% range is an
unverified search summary. The 4%-9.5% snippet above is also unverified. Replace the Rs 1,299 row
with the Seller Central calculator output before pricing. The Rs 1,000 cliff matters: a Rs 999 item
pays no referral fee, but a Rs 1,000 item pays the full category %.

### Compute script

Scratch script: /tmp/claude-0/-home-user-moneymoments-media/ad9b2b69-e7ae-5485-a9a7-7925159fc4cb/scratchpad/fees.py


## Key takeaways

1. The zero-referral-fee policy is real, but the threshold in the premise is wrong. The 2025 waiver covered products under Rs 300 (announced 24 Mar 2025, live 7 Apr 2025, expanded Aug 2025 to 1.2 crore products). The 2026 expansion (effective 16 Mar 2026) covers products under Rs 1,000 across 1,800+ categories, about 12.5 crore products. No source supports a Rs 500 zero-fee threshold in 2025. [B/A, dates below]
2. Above Rs 1,000 the referral fee still applies as a percentage of (item price + shipping). Category percentages were not retrieved from an official table. One source gives a general range of 5% to 17%. [C, unverified]
3. Amazon India's own 2026 messaging says sellers "can save up to 70%" in fees. This is a headline figure from Amazon's marketing and does not describe a typical seller's saving. [A, press URL dated Mar 2026; body not fetched]
4. Easy Ship fees were cut in March 2026. Secondary reports say Easy Ship and Seller Flex national shipping fell from Rs 77 to Rs 65 and weight-handling fees for items under 1 kg fell by up to Rs 17. Easy Ship fees for items under Rs 300 were reported cut by more than 20%. [C/B, unverified against Amazon]
5. Some fee increases came later in 2026: a reported closing-fee rise effective 7 Sep 2026 (+Rs 1 and +Rs 3 for Easy Ship, Seller Flex and FBA; not clearly for Self Ship), and a revised cancellation-fee structure for Easy Ship and Self Ship effective 17 Aug 2026. Both are single-source reports. [B/C, Aug-Sep 2026]
6. Amazon India's seller base reached 20 lakh (2 million) per Amazon's announcement dated 8 Sep 2026, described as its strongest growth in three years. This is company-reported. [A, press URL dated Sep 2026; snippet only]
7. Returns are the largest unknown for apparel. Vendor and seller-forum estimates put fashion return rates at 25-40% on Amazon India, against roughly 10-15% described as "average" for other categories. No official Amazon return-rate data for India was found. [C]
8. Brand Registry: a pending Indian trademark application (with an IP India application number) appears to be sufficient to apply, but Amazon accepts or declines at its discretion. Forum posts say a mark that is already registered is refused when entered as "pending". [A via search summary of sell.amazon.in; C for the rest]
9. GST: sources agree that an Amazon seller cannot use the GST Composition Scheme for goods sold through an e-commerce operator, and that GST registration is needed regardless of turnover. The legal basis is said to be Section 10 of the CGST Act, and TCS under Section 52 applies. The statute was not checked on CBIC. [C, one source internally inconsistent; verify on CBIC]
10. Payment cycle changed in 2026. Amazon moved to a Delivery Date + 7 days (DD+7) reserve, with funds released 7 days after delivery, with full rollout reported from 12 Mar 2026. Before this, settlement was reported as 7-day or 14-day cycles depending on the source. Sources disagree on the base cycle. [B/C]
11. Amazon Now (quick commerce) passed $1 billion in annualised gross sales (reported Sep 2026). Its footprint is disputed: 60+ cities in a Sep 2026 report, and a June 2026 report of 15 locations. The 300-city figure is a target, not a count. [B]
12. Amazon Bazaar (value store) is reported as having no referral commission and reduced shipping charges, with 5x year-on-year growth claimed for 2026. These are single-source figures from a 2026 trade report. [B/C]
13. Amazon Global Selling (Oct 2025): Indian sellers passed $20 billion cumulative e-commerce exports (2015-2025), with about $7 billion in 2025 alone, and a target of $80 billion by 2030. Figures are company-reported. [A, press URL dated Oct 2025]

## Findings by sub-question

### 1. Referral fees (incl. zero-fee threshold and 2026 changes)

FACT, with sources:
- Mar 2025: Amazon India announced zero referral fees on products priced under Rs 300. [B: The Week wire, 24 Mar 2025, https://www.theweek.in/wire-updates/business/2025/03/24/dcm1-biz-amazon-seller-fee.html; also Entrackr snippet "Amazon India scraps referral fees for products under Rs 300", undated, https://entrackr.com/snippets/amazon-india-scraps-referral-fees-for-products-under-rs-300-8884397]
- Apr 2025: waiver live from 7 Apr 2025, reported to cover over 1.2 crore products in 135+ categories. [B, summary of Amazon release; date per search summary]
- Aug 2025: Amazon India press release "zero referral fees on over 1.2 crore products", URL dated 2025/8. [A, https://press.aboutamazon.com/in/news/small-business/2025/8/amazon-announces-zero-referral-fees-on-over-1-2-crore-products-move-aimed-at-boosting-growth-of-lakhs-of-sellers-across-india, Aug 2025; body not fetched]
- Mar 2026: zero referral fees extended to products priced under Rs 1,000 across 1,800+ categories, effective 16 Mar 2026, covering over 12.5 crore products. [A press URL dated 2026/3: https://press.aboutamazon.com/in/2026/3/amazon-announces-zero-referral-fees-on-over-12-5-crore-products-sellers-to-save-up-to-70-in-fees; B: Storyboard18 https://www.storyboard18.com/digital/amazon-india-eliminates-referral-fees-on-12-5-crore-products-priced-under-%E2%82%B91000-91071.htm; B: YourStory, Mar 2026 https://yourstory.com/2026/03/amazon-india-expands-zero-referral-fees-125-crore-products-flipkarts-commission-waiver]
- Above Rs 1,000: referral fee = (item price + shipping) x referral %. [C, search summary of secondary calculator; no official source retrieved]
- Aug 2024 (background): Amazon India cut selling fees ahead of festive season; the biggest cuts were for items under Rs 500. A single example reported: a Rs 299 t-shirt's referral fee fell from 13.5% to 2%. [A, press URL https://press.aboutamazon.com/in/2024/8/amazon-india-announces-significant-reduction-in-selling-fees-ahead-of-festive-season, Aug 2024; the Rs 299 example is from a search summary, C-level detail, not verified]

Not found: official category-wise referral % table for 2026; any 2025 zero fee for items under Rs 500.

Reference: a 2026 search summary said referral fees "traditionally range from 5% to 17% depending on category." Source not individually identified. [C, unverified]

### 2. Closing fees and weight handling

Fee table (all third-party, not verified against Amazon):

| Item | Value | Source | Rating | Date |
|---|---|---|---|---|
| Closing fee, items priced Rs 300-500 | Reported dropped from Rs 35 to Rs 26 | Seller Central India forum, https://sellercentral.amazon.in/seller-forums/discussions/t/5edc203d-8623-4838-8ed3-b3fc6289cb45 | C (forum, Amazon staff post in search summary) | Date not shown; likely 2026 |
| Easy Ship closing fee (single source, slab) | Rs 5 (0-250), Rs 9 (251-500), Rs 30 (501-1,000), Rs 50 (1,001-5,000), Rs 65 (>5,000) | Third-party comparison site (name not confirmed from search summary) | C | Undated; says based on Apr 2025 and Mar 2026 revisions |
| Easy Ship weight handling, local zone | Rs 29 (<500 g), Rs 39 (500 g-1 kg), Rs 55 (1-2 kg) | Same third-party site | C | As above |
| Easy Ship weight handling, national zone | Rs 65 (<500 g), Rs 75 (500 g-1 kg), Rs 90 (1-2 kg) | Same third-party site | C | As above |
| National shipping for Easy Ship and Seller Flex | Cut from Rs 77 to Rs 65 | Third-party report of Amazon's Mar 2026 announcement | C | Mar 2026 |
| Closing fee change, Easy Ship / Seller Flex / FBA | +Rs 1 (lower slab) and +Rs 3 (higher slab), effective 7 Sep 2026; Self Ship not clearly included | Single third-party report | C | Sep 2026 |
| Cancellation fee change, Easy Ship and Self Ship | Revised structure effective 17 Aug 2026 | IndiaSeaTradeNews, https://indiaseatradenews.com/amazon-india-revamps-fee-policy-for-marketplace-sellers/ | B/C | Aug 2026 |

Notes: the slab numbers for Easy Ship disagree between sources, and the source said the figures are indicative. The Rs 77 to Rs 65 cut and the closing fee increase are each from one report.

Not found: official FBA fulfilment fee card, official Easy Ship rate card, Self Ship rates, Seller Flex rates.

### 3. Fulfilment options: FBA vs Easy Ship vs Self Ship vs Seller Flex

- FBA: Amazon stores and ships. FBA products get the Prime badge. Requires nominating Amazon fulfilment centres as an additional place of business under GST. [A/secondary: Amazon India seller blog summary, https://sell.amazon.in/seller-blog/benefits-of-becoming-an-amazon-prime-seller, date not shown; C for the GST point]
- Easy Ship: Amazon collects and ships from the seller's location (pickup). Charged by weight slab and zone, plus closing fee; see table above. [C]
- Self Ship (FBM): seller ships own orders. Costs and Prime badge eligibility were not verified. [C]
- Seller Flex: seller-run warehousing with Amazon-delivered shipping, similar Prime benefit claimed. Its rates are not confirmed. [C]
- Pattern: FBA gives the Prime badge and fastest visibility; Easy Ship and Self Ship are cheaper upfront but lose the badge unless they meet Amazon's performance criteria. [Pattern, C-sourced]

FBA vs other channel cost comparison: not found from a source with a published table.

### 4. Amazon Bazaar (value store)

- Launched April 2024 as a value store, first on the Android app. Seller recruitment began February 2024 with promises of zero referral fees and "no extra charges." [B: YourStory, Apr 2024, https://ts.yourstory.com/2024/04/amazon-launches-bazaar-affordable-products-unbranded-lifestyle-home]
- 2026 report: Bazaar charges no commission, only reduced shipping charges; no returns allowed on products under Rs 99; 5x year-on-year growth claimed; listings being integrated into the main app. [B/C, Apparel Resources, 2026, https://apparelresources.com/business-news/retail/amazon-bazaar-records-5x-growth-amid-intense-value-e-commerce-competition/]
- What sellers need to join: not found from an official source. Probably the standard seller account; the process was not verified.

### 5. Amazon Now (quick commerce)

- Sep 2026: passed $1 billion annualised gross sales in India; orders doubling each quarter (company-reported). [B: YourStory, https://yourstory.com/2026/09/amazon-now-1b-annualised-sales-as-quick-commerce-moves-beyond-metros; B: Outlook Business https://www.outlookbusiness.com/corporate/amazon-now-crosses-1-billion-in-annualised-gross-sales-in-india]
- Plan: 100 cities from Apr 2026 with more than 1,000 micro-fulfilment centres [B: Business Standard, 27 Apr 2026, https://www.business-standard.com/industry/news/amazon-to-take-now-rapid-delivery-service-to-100-cities-in-india-126042700445_1.html per URL]. June 2026: CEO Andy Jassy announced expansion to 300+ cities [B: YourStory June 2026, https://yourstory.com/2026/06/amazon-ceo-andy-jassy-visits-india-company-expand-quick-commerce-network-300-cities; OpenTheMagazine https://openthemagazine.com/world/amazon-ceo-andy-jassy-announces-plan-to-expand-amazon-now-to-300-indian-cities].
- Investment: $3 billion over four years (B, search summary).
- Footprint conflict: June 2026 report says 15 locations; Sep 2026 report says 60+ cities. Treat as unresolved.
- Seller categories: groceries, produce, frozen, personal care, fashion, beauty, small appliances, home and kitchen, pet supplies. [C, unofficial guide]
- Seller onboarding requirements for Amazon Now: not found.

### 6. Prime eligibility

- FBA products get the Prime badge, per Amazon India seller pages (summary). [A-secondary]
- Seller-fulfilled Prime: the reported thresholds (90 days selling, 99% valid tracking, 97% on-time delivery) are from the US programme. India-specific numeric criteria not found.
- Amazon's forum post says Prime and badge criteria apply to all fulfilment channels and cover delivery speed, tracking, returns and customer service. [C, Seller Central Europe forum, date not shown]
- Badge can be revoked. [C]

### 7. Payment cycle

- Amazon India's seller blog: first payment roughly 14 days after start, then every 7 days. Date not shown; may predate 2026 change. [A-secondary, https://sell.amazon.in/seller-blog/how-payments-work-for-online-selling]
- Feedvisor: automated transfers every 14 days; a 7-day hold after delivery. [C, https://feedvisor.com/university/payments/]
- Gonukkad (2026): sources conflict between 7-day and 14-day cycles. [C, https://www.gonukkad.com/blog/amazon-india-seller-payment-cycle]
- DD+7 reserve (2026): funds released 7 days after delivery confirmation; full rollout reported from 12 Mar 2026. [C/B, https://www.payability.com/blog/2026/03/17 and https://novadata.io/resources/news/amazon-dd7-disbursement-reserve-march-2026]
- Feedvisor puts previous sale-to-bank window for FBA at 17-21 days; Payability estimates 10-20+ days under DD+7. [C]

### 8. Returns policy and cost (apparel)

- Return rate estimates on Amazon India: average 15-25%, fashion 30-40%. Below 10% excellent, 10-15% average, above 20% needs attention. [C, Swcybernetics, 2026, https://swcybernetics.in/knowledge-base/amazon-return-policy-sellers-guide-india-2026]
- Blended e-commerce return rate in India (COD-focused): 25-30%; fashion and apparel COD return rate 25-40%. [C, base.com 2026 report, https://base.com/en-IN/blog/cod-return-rates-by-product-category-in-india-2026-report/]
- Returns processing fee for ASINs above category return thresholds, from June 2024; FBA reimbursement claim window shortened to about two months. [C, Titan Network, https://titannetwork.com/amazon-fba-return-fee-guide/, undated]
- SAFE-T claim and returns processing change from Jan 2025, shifting risk to sellers. [C, undated]
- 2019 FashionUnited: apparel is top revenue category and highest return rate (old, flagged). https://fashionunited.in/news/retail/indian-online-apparel-retailers-face-size-issues-return-clause/2019092322722
- Cost per return (fees, reverse logistics, write-offs): not found from an India source with figures.

### 9. Brand Registry (India)

- Official Amazon India blog (search summary): once a trademark application is filed and an application number is issued, the brand may be eligible to apply. Acceptance is discretionary. [A-secondary, https://sell.amazon.in/seller-blog/how-to-register-trademark-in-india, date not shown]
- Amazon's own eligibility page found is for Canada (text or image mark, pending or registered; pending accepted in some offices). Not India-specific. [A but wrong country, https://brandservices.amazon.ca/eligibility]
- Several Indian sites say a pending IP India application is enough and Amazon changed its policy in 2024-25. Commercial sources, unverified. [C, Disytax 2026 guide https://disytax.com/trademark-registration-for-amazon-sellers/]
- Forum posts: a registered mark entered as "pending" was refused; design, word and device marks only (anecdotal). [C, Seller Central Europe forum]
- Applicant must be the trademark owner. [C, UK forum]

### 10. GST registration and composition scheme

- Sellers on Amazon cannot use the GST Composition Scheme for supplies through an e-commerce operator, citing Section 10 of the CGST Act. [C, Busy, https://busy.in/gst/gst-composition-scheme-rules-for-e-commerce-sellers-and-online-retailers/ (headline suggests otherwise; FAQ says ineligible), date not shown]
- GST registration is required regardless of turnover; Amazon collects TCS at 1% under Section 52 and files GSTR-8. [C, Disytax 2026 guide https://disytax.com/gst-for-amazon-sellers/]
- Old threshold references (Rs 1 crore composition limit from 2017) are outdated; the Rs 1.5 crore composition limit for goods is quoted by recent guides for non-e-commerce sellers. [C]
- Not verified: CBIC or GST Council primary text.

### 11. Amazon Karigar, Saheli, Launchpad, Global Selling

- Launchpad: core support for emerging brands. Karigar: artisan sellers, launched 2017. Saheli: women entrepreneurs. Saheli Accelerate: onboarding, mentorship, visibility for women-led startups. [A: Amazon India Startup India post, Jan 2026, https://www.aboutamazon.in/md/news/small-business/startup-india-entrepreneur-amazon-saheli-karigar]
- Global Selling: registered sellers across 28 states, 7 UTs and 200+ cities (Oct 2025). Top destinations: US, UK, Germany, Canada, UAE, France, Italy, Spain, Saudi Arabia. [A: Oct 2025 release, https://press.aboutamazon.com/in/news/amazon-global-selling/2025/10/amazon-surpasses-20-billion-milestone-for-ecommerce-exports-from-india-before-2025-deadline-targets-80-billion-by-2030]
- Karigar performance: 2.5x growth; Saheli: 1.7x (undated, from Small Business Day report). [B/C, undated; flag as dated]
- Eligibility and enrolment criteria for Karigar, Saheli and Launchpad: not found. Check Seller Central.
- New programmes in 2026 beyond the above: not found.

### 12. New-seller incentives in 2026

- Zero referral fee on items under Rs 1,000 (from 16 Mar 2026) is the largest 2026 change. [A/B, see section 1]
- Easy Ship and Seller Flex fee cuts (Mar 2026). [C]
- Seller Assistant AI tool: usage doubling every six months (Amazon claim). [B, T2 Online, Prime Day 2026 coverage, https://t2online.in/tech/tech-news/amazon-india-expands-ai-powered-seller-assistant-ahead-of-prime-day-2026/2005760]
- Specific new-seller onboarding credits or waivers in 2026: not found.

### 13. Seller count and growth

- 20 lakh (2 million) sellers, Sep 2026, "strongest growth in three years." [A: Amazon India press release, 8 Sep 2026, https://press.aboutamazon.com/in/2026/9/amazon-indias-seller-base-grows-to-20-lakh-marking-strongest-growth-in-three-years; snippet only]
- Seller base of about 5 lakh was cited in an earlier Amazon blog ("5 Lakh Amazon sellers... and counting"); date not shown. [A-secondary, https://sell.amazon.in/seller-blog/5-lakh-amazon-sellers-and-counting]
- Global Selling exports: over $20 billion cumulative (2015-2025), nearly $7 billion in 2025 alone; target $80 billion by 2030. [A: Oct 2025 release]
- Amazon India FY26 report card: loss up 48% YoY, revenue near Rs 40,000 crore. [B: Inc42, https://inc42.com/buzz/amazon-india-fy26-report-card-loss-balloons-48-yoy-revenue-inches-closer-to-₹40000-cr/, 2026; figures not checked in full]

## Fee tables with source and date

Referral fees (zero-fee thresholds only; percentages not found from official source):

| Period | Rule | Source | Rating | Date |
|---|---|---|---|---|
| 2024 festive cut | Cuts across fees, biggest for items under Rs 500 | Amazon India press release https://press.aboutamazon.com/in/2024/8/... | A | Aug 2024 |
| From Apr 2025 | Zero referral fee on items under Rs 300 (1.2 crore products) | The Week, https://www.theweek.in/wire-updates/business/2025/03/24/dcm1-biz-amazon-seller-fee.html; Amazon release https://press.aboutamazon.com/in/news/small-business/2025/8/... | B/A | Mar 2025 announced; Aug 2025 release |
| From 16 Mar 2026 | Zero referral fee on items under Rs 1,000 (12.5 crore products, 1,800+ categories) | Amazon press release https://press.aboutamazon.com/in/2026/3/...; Storyboard18; YourStory | A/B | Mar 2026 |
| Above Rs 1,000 | Price + shipping x category % | Secondary calculator summary | C | 2026 |

Closing and weight-handling fees: see the table in section 2 (all C-rated, indicative).

## Ranking / visibility mechanics

- Zero referral fee lets sellers under Rs 1,000 list at lower prices without losing margin; expect more competitors on those SKUs. [Pattern, derived from B/A facts]
- FBA gets the Prime badge; Prime badge and Amazon's Choice-type visibility depend on delivery and returns performance across channels. [C, Amazon forum summary]
- High return rates in fashion can hurt listing health and cost money through returns processing fees on ASINs above category thresholds. [C]
- Bazaar and Amazon Now run as separate surfaces with different economics; Bazaar listings are being folded into the main app per one 2026 report. [C/B]

## What a small new D2C seller should do / avoid (pattern, labelled)

Pattern, based on the facts above:
- Check the zero-referral-fee threshold (Rs 1,000) and price products to sit under it if the margin allows. Verify in the Seller Central fee calculator; do not use the Rs 500 figure in internal planning.
- Model fees with the calculator, not the blog tables. Re-check after each change: March 2026 cuts, August 2026 cancellation-fee change, September 2026 closing-fee rise.
- Plan fashion returns at 25-40% until your own data says otherwise; price the return cost into the margin before launch.
- Keep GST registration in place from day one; no composition scheme for e-commerce supplies; plan for TCS.
- File the trademark (IP India) before applying for Brand Registry; keep the application pending. Do not enter a registered mark as pending.
- Expect DD+7 payment reserve; keep 3-4 weeks of cash for working capital.
- Start with the Amazon programmes that fit (Launchpad or Global Selling if relevant), but check eligibility in Seller Central before planning around them.
- Avoid planning around Amazon Now and Bazaar fees until there is an official seller page for each.

## Open questions and conflicting claims

1. Zero-fee threshold: Rs 300 (2025) and Rs 1,000 (2026) are confirmed in several sources. A 2025 Rs 500 zero-fee claim was not found and is treated as wrong.
2. Payment cycle: 7-day vs 14-day base cycle conflicts across Amazon's blog, Feedvisor, Gonukkad and eVanik. The 2026 DD+7 change is reported by multiple secondary sources but not confirmed on an official page.
3. Easy Ship weight-handling slabs: slab figures differ across sources; the Rs 77 to Rs 65 national-rate cut is single-source.
4. September 2026 closing-fee rise: single third-party report; not confirmed.
5. Amazon Now city count: 15 locations (June 2026) vs 60+ cities (Sep 2026) vs 300-city target. Unresolved.
6. Brand Registry: whether a pending application is enough in India in 2026 is not settled. Amazon India's blog suggests yes; forum and blog claims vary.
7. GST composition: one busy.in article headline conflicts with its FAQ; weight of sources says ineligible. Statute not checked.
8. Return rates: 15-25% (general) and 25-40% (fashion) are blog estimates. No Amazon-published data.
9. Bazaar: the 2024 launch was described as fashion and lifestyle; the 2026 report describes a broader value-commerce store. Current seller fee terms unverified.
10. Not found in this run: official 2026 referral % table; FBA fulfilment fee card; Self Ship and Seller Flex rates; India Prime seller criteria; Amazon Karigar/Saheli/Launchpad enrolment criteria; new-seller incentives beyond the referral waiver.

## Sources

1. https://press.aboutamazon.com/in/2026/3/amazon-announces-zero-referral-fees-on-over-12-5-crore-products-sellers-to-save-up-to-70-in-fees - Amazon India press release, Mar 2026 (date from URL; body not fetched, host unreachable)
2. https://www.storyboard18.com/digital/amazon-india-eliminates-referral-fees-on-12-5-crore-products-priced-under-%E2%82%B91000-91071.htm - Storyboard18, Mar 2026 (B)
3. https://yourstory.com/2026/03/amazon-india-expands-zero-referral-fees-125-crore-products-flipkarts-commission-waiver - YourStory, Mar 2026 (B)
4. https://www.aboutamazon.in/md/news/small-business/amazon-seller-fee-reduction-zero-referral-march-2026 - Amazon India page, Mar 2026 (A; snippet only)
5. https://press.aboutamazon.com/in/news/small-business/2025/8/amazon-announces-zero-referral-fees-on-over-1-2-crore-products-move-aimed-at-boosting-growth-of-lakhs-of-sellers-across-india - Amazon India press release, Aug 2025 (A; snippet only)
6. https://www.theweek.in/wire-updates/business/2025/03/24/dcm1-biz-amazon-seller-fee.html - The Week, 24 Mar 2025 (B)
7. https://entrackr.com/snippets/amazon-india-scraps-referral-fees-for-products-under-rs-300-8884397 - Entrackr, 2025, date not shown (B)
8. https://press.aboutamazon.com/in/2024/8/amazon-india-announces-significant-reduction-in-selling-fees-ahead-of-festive-season - Amazon India press release, Aug 2024 (A; snippet only)
9. https://sellercentral.amazon.in/seller-forums/discussions/t/5edc203d-8623-4838-8ed3-b3fc6289cb45 - Seller Central India forum, date not shown (C)
10. https://indiaseatradenews.com/amazon-india-revamps-fee-policy-for-marketplace-sellers/ - India Sea Trade News, Aug 2026 (B/C)
11. https://indiaseatradenews.com/amazon-to-waive-referral-fees-on-these-products-cuts-shipping-rates/ - India Sea Trade News, 2026, date uncertain (C)
12. https://sell.amazon.in/seller-blog/reduce-your-amazon-selling-costs--complete-guide-to-seller-fee-change-2025 - Amazon India seller blog, 2025 (A; not fetched, host unreachable)
13. https://sell.amazon.in/seller-blog/how-payments-work-for-online-selling - Amazon India seller blog, date not shown (A; snippet only)
14. https://feedvisor.com/university/payments/ - Feedvisor, date not shown (C)
15. https://www.payability.com/blog/2026/03/17 - Payability, Mar 2026 (C)
16. https://novadata.io/resources/news/amazon-dd7-disbursement-reserve-march-2026 - Novadata, Mar 2026 (B/C)
17. https://www.gonukkad.com/blog/amazon-india-seller-payment-cycle - Gonukkad, 2026 (C)
18. https://swcybernetics.in/knowledge-base/amazon-return-policy-sellers-guide-india-2026 - SWCybernetics, 2026 (C)
19. https://base.com/en-IN/blog/cod-return-rates-by-product-category-in-india-2026-report/ - Base.com, 2026 (C)
20. https://titannetwork.com/amazon-fba-return-fee-guide/ - Titan Network, undated (C)
21. https://fashionunited.in/news/retail/indian-online-apparel-retailers-face-size-issues-return-clause/2019092322722 - FashionUnited, Sep 2019 (old, flagged)
22. https://sell.amazon.in/seller-blog/how-to-register-trademark-in-india - Amazon India seller blog, date not shown (A; snippet only)
23. https://brandservices.amazon.ca/eligibility - Amazon Brand Services, Canada, date not shown (A, wrong country)
24. https://disytax.com/trademark-registration-for-amazon-sellers/ - Disytax, 2026 (C)
25. https://busy.in/gst/gst-composition-scheme-rules-for-e-commerce-sellers-and-online-retailers/ - Busy, date not shown (C)
26. https://disytax.com/gst-for-amazon-sellers/ - Disytax, 2026 (C)
27. https://www.aboutamazon.in/md/news/small-business/startup-india-entrepreneur-amazon-saheli-karigar - Amazon India, Jan 2026 (A; snippet only)
28. https://press.aboutamazon.com/in/news/amazon-global-selling/2025/10/amazon-surpasses-20-billion-milestone-for-ecommerce-exports-from-india-before-2025-deadline-targets-80-billion-by-2030 - Amazon India, Oct 2025 (A; snippet only)
29. https://press.aboutamazon.com/in/2026/9/amazon-indias-seller-base-grows-to-20-lakh-marking-strongest-growth-in-three-years - Amazon India, 8 Sep 2026 (A; snippet only)
30. https://yourstory.com/2026/09/amazon-now-1b-annualised-sales-as-quick-commerce-moves-beyond-metros - YourStory, Sep 2026 (B)
31. https://www.outlookbusiness.com/corporate/amazon-now-crosses-1-billion-in-annualised-gross-sales-in-india - Outlook Business, date not shown (B)
32. https://www.business-standard.com/industry/news/amazon-to-take-now-rapid-delivery-service-to-100-cities-in-india-126042700445_1.html - Business Standard, Apr 2026 per URL (B)
33. https://yourstory.com/2026/06/amazon-ceo-andy-jassy-visits-india-company-expand-quick-commerce-network-300-cities - YourStory, Jun 2026 (B)
34. https://openthemagazine.com/world/amazon-ceo-andy-jassy-announces-plan-to-expand-amazon-now-to-300-indian-cities - OpenTheMagazine, 2026, date not shown (B)
35. https://ts.yourstory.com/2024/04/amazon-launches-bazaar-affordable-products-unbranded-lifestyle-home - YourStory, Apr 2024 (B)
36. https://apparelresources.com/business-news/retail/amazon-bazaar-records-5x-growth-amid-intense-value-e-commerce-competition/ - Apparel Resources, 2026 (B/C)
37. https://t2online.in/tech/tech-news/amazon-india-expands-ai-powered-seller-assistant-ahead-of-prime-day-2026/2005760 - T2, 2026 (B)
38. https://sell.amazon.in/seller-blog/5-lakh-amazon-sellers-and-counting - Amazon India seller blog, date not shown (A-secondary)
39. https://inc42.com/buzz/amazon-india-fy26-report-card-loss-balloons-48-yoy-revenue-inches-closer-to-₹40000-cr/ - Inc42, 2026 (B)
40. https://sellercentral-europe.amazon.com/seller-forums/discussions/t/cf767e5a630ea1179fc99b93dda00406 - Seller Central forum on Prime criteria, date not shown (C)
