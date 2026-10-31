# 06 Quick commerce in India (2025-2026) and what it means for D2C brands

Research date: 30 Oct 2026. Pass 1: 30 Oct 2026. Pass 2 (verification): 30-31 Oct 2026.
Coverage: Blinkit (Eternal), Zepto, Swiggy Instamart, Flipkart Minutes, Amazon Now, BigBasket BB Now, Myntra M-Now, Slikk.

## Verification status (read first)

Pass 2 used two access routes. WebFetch failed DNS for every host, so pages were fetched with curl through Bash (method in RULES.md, "How to fetch pages on pass 2"). Saved text for this pass is in /tmp/d2c-fetch/.

Tags used below:
- [PV] = verified in pass 2 from a primary or fetched page (the page named in the same bullet). Use only where the page was actually read.
- [PV-press] = confirmed from a fetched press article that reports the company document. The company document itself was not opened.
- [CORR] = corrected in pass 2 (old value and new value shown).
- [CS] = corroborated by search-result snippets only; page not fetched.
- [SU] = still unverified.
- Source ratings as in pass 1: A official, B reputable press or analyst firm, C blog, agency, vendor, YouTube.

NOT REACHED in pass 2 (curl returns no connection for these hosts, so none of their content is verified):
- Eternal Q2 FY27 shareholder letter (eternal.com).
- Swiggy Q2 FY27 shareholder letter and Q1 FY27 letter PDF (swiggy.com).
- Blinkit seller and brand pages (blinkit.com, seller.blinkit.com).
- Zepto's DRHP on SEBI (sebi.gov.in), CCI (cci.gov.in), PIB (pib.gov.in), FSSAI (fssai.gov.in), and Zepto's own site.
- Amazon India's own release on Amazon Now (aboutamazon.in was reachable but did not carry it; the announcement is confirmed via a fetched trade article).
- Several news pages returned 403 or empty bodies (Business Standard, YourStory, Financial Express, Open Magazine, TradingView, Upstox).

Within those limits, the shareholder-letter figures below come from fetched press articles that quote the letters (Medianama, Business Today, Storyboard18). They are [PV-press], not [PV].

## Key takeaways (after pass 2, most important first)

1. Q2 FY27 is out, not Q1. Eternal reported on 21 Oct 2026 and Swiggy on 22 Oct 2026. [CORR, PV-press]
2. Blinkit Q2 FY27: net order value (NOV) Rs 20,940 cr, up 79% YoY; revenue Rs 19,152 cr, up 94% YoY, partly from the inventory-led model; adjusted EBITDA Rs 184 cr = 0.9% of NOV (against an adjusted EBITDA loss of Rs 156 cr in Q2 FY26); 2,751 stores after 308 net additions. [PV-press: Medianama, Business Today, 22-23 Oct 2026]
3. Blinkit NOV growth is slowing every quarter: 137% (Sep 2025 qtr), 121%, 95%, 86%, then 79% in Q2 FY27 (Business Today). Management expects growth to pick up from the December quarter as new stores open. [PV-press]
4. Blinkit stores: the company now expects more than 3,500 stores by March 2027 (up from 3,000 earlier) and about 5,000 by March 2028, most in smaller cities. [CORR, PV-press]
5. Eternal consolidated Q2 FY27: net profit Rs 125 cr (up 92% from Rs 65 cr); revenue Rs 24,138 cr (up 78%). [PV-press: Medianama, 22 Oct 2026]
6. Instamart Q2 FY27 (Storyboard18, 22 Oct 2026): GOV Rs 9,230 cr, up 31.4% YoY; NOV Rs 6,594 cr, up 13.4% QoQ (the Rs 6,954 cr figure is rejected); adjusted EBITDA loss Rs 895 cr (up Rs 118 cr QoQ), about 9.7% of GOV; contribution margin -1.0% of GOV; 1,240 stores across 133 cities (+69 in the quarter); 130 mn orders, up 29.3% YoY. [CORR, PV-press]
7. Swiggy says Instamart's adjusted EBITDA losses "peaked" in Q2 FY27 and guides to about 100 bps margin improvement in the December quarter. The "peaked" wording comes from search summaries of the letter, and the letter itself is not verified. [CS]
8. Instamart is moving to own its inventory. Shareholders approved a 49.5% foreign-holding cap so it qualifies as Indian-owned and controlled; the switch is due over the next few quarters, with a net margin benefit of about 80 bps (Storyboard18). [CORR, PV-press]
9. Zepto FY26 (updated DRHP, filed about 8-9 June 2026, as reported by Storyboard18 and others): advertising revenue Rs 1,635.7 cr, up 151% from Rs 651.1 cr in FY25, about 7.2% of operating revenue; operating revenue Rs 22,624 cr; restated net loss Rs 5,905.19 cr. The pass 1 "14% ad share" figure is rejected. [PV-press]
10. Market share (DRHP as reported): Blinkit 46%, Zepto 29% of quick commerce, Zepto the fastest-growing by orders FY24-FY26. Replaces the conflicting pass 1 share estimates. [PV-press]
11. Zepto's IPO is on hold: SEBI observation letter 8 May 2026, updated DRHP June 2026 (fresh issue Rs 8,010 cr), no listing date set; reports point to a listing window of Feb-May 2027. [CS]
12. Market size (primary): Bain's 2026 edition says quick commerce reached USD 10-11 bn GMV in 2025, 16-17% of e-retail GMV, doubled annually since 2023, and is projected to reach USD 65-70 bn by 2030. Redseer and Google (Oct 2026, report executive summary) project about USD 13 bn in FY26 rising to about USD 90 bn by FY31P (41-48% a year), with metros about 60% of incremental GMV. [PV]
13. Redseer's report puts non-metro reach at 12-16 mn monthly transacting users today against 180-200 mn addressable shoppers, and sets 55-60 mn monthly transacting users by FY31. The pass 1 figure of 40-44 mn today and 100 mn+ is an aspiration in the report, not the forecast. [CORR, PV]
14. Brands' economics have moved from commission to wholesale. Blinkit notified sellers from 1 Sept 2025 that it would buy inventory; Blinkit's revenue now runs near NOV (Rs 19,152 cr vs Rs 20,940 cr), so the FY25 18.9% take rate no longer describes what a brand pays. [CORR, CS for the 1 Sept date, PV-press for the revenue-model shift]
15. Blinkit publishes no seller or brand rate card. Its 2025 price-band commission (2% under Rs 500, 6% for Rs 500-700, 18% for Rs 1,200 and above) took effect 13 March 2025 (Business Standard, Mar 2025). 2026 band tables from agency blogs conflict. [CORR, CS]
16. The Rs 25,000-per-SKU Blinkit listing fee is still NOT confirmed (guides disagree: charged and credited to an ad wallet, or no fee). Do not budget it. [SU]
17. Regulation in 2026 is state-led food-safety action, not a central competition ruling. Maharashtra FDA inspected 86 establishments on 13 Aug 2026 and suspended 14 licences; Telangana suspended four dark-store licences on 30 Sep 2026 (one tracker source); FSSAI is considering e-commerce food rules. No 2026 CCI order was found. [PV-press for Maharashtra; CS for the rest]
18. Amazon Now is in more than 120 cities after an announcement on 1 Oct 2026, with close to 800 micro and urban fulfilment centres and a target of 300+ cities (Indian Retailer, 1 Oct 2026). It was in three cities in late 2025. [CORR, PV-press]
19. Flipkart Minutes: about 1,000 micro-fulfilment centres in about 130 cities (June 2026, as reported); target 1,500 by end-2026. [CS]
20. Fashion on quick commerce is small and mostly metro: Myntra M-Now (launched Dec 2024) is in about 10 cities; Slikk (Bengaluru, 60-minute fashion) raised a USD 10 mn Series A; Blinkit dropped its "10-minute" tagline by Jan 2026. No fashion-on-QC GMV figure and no Zepto fashion data found. [C]
21. BB Now: a tracker counts 664 BigBasket dark stores in 108 cities (July 2026); BigBasket said about 850 in late 2025. Conflict unresolved. No BB Now onboarding terms found. [C, conflict]
22. Ranking and visibility on the apps: still unverified. No platform document found; vendor sources say stock at the nearest dark store and paid placement drive visibility. [C, SU]

## Findings by sub-question

### 1. Market size and growth

- PV: Bain, "How India Shops Online 2026" (fetched from bain.com/insights/how-india-shops-online-2026/): quick commerce "scaling to $10-11 billion GMV" in 2025; "16%-17% of e-retail GMV"; "doubled annually since 2023"; projected "$65-70 billion by the end of the decade" and "45%-50% of incremental e-retail GMV". The micro-fulfilment network reached over 7,000 centres in more than 200 cities; two-thirds of new centres are in the top ten cities. Essentials (household) make up 85-90% of QC GMV. Bain puts 2025 e-retail GMV at $65-66 bn. [PV, B]
- CORR: Pass 1 cited a regional Bain URL (/ru/). The canonical page is the URL above.
- PV: Redseer and Google, "Think Quick Commerce: Unlocking the $90Bn Opportunity" (fetched from redseer.com report page, Oct 2026): "scale from ~USD 13 Bn in FY26 to ~USD 90 Bn by FY31P, a 5-7x growth", taking the channel from about 1% to 4-5% of Indian retail. Growth "41-48% a year". Metros about 60% of incremental GMV, non-metros about 40%. QC is about 6% of metro retail spend today. Quick commerce held "over 40% of the hyperlocal market". Aims: 55-60 mn monthly transacting users by FY31, with a "100 Mn+" ambition. [PV, B]
- CS: Redseer's separate FY26 analysis: QC about USD 13-14 bn, about 17% of online retail GMV; 25-30% of online retail GMV by FY30 (search summary only). [CS]
- CS: other forecasts: Anand Rathi about USD 60 bn for FY31; Inc42 Datalabs about USD 68 bn by 2031. [CS]
- SU: CareEdge: Rs 64,000 cr in FY25; Rs 2 lakh cr by FY28 (pass 1, not re-checked). [SU]
- SU, low weight: Markntel (USD 5.6 bn 2025), Coherent (USD 1.7 bn 2025), Ken Research (about USD 10-11 bn 2025). [SU]
- PATTERN: Bain and Redseer now anchor the range; the pass 1 outliers are not used.

### 2. Platform share and standing

- PV-press: Zepto's DRHP (as reported by Storyboard18, 10 Jun 2026) says Zepto held about 29% of India's quick-commerce market, behind Blinkit at 46%, and was the fastest-growing player by order volume FY24-FY26. [PV-press]
- CS: Bain says Blinkit, Instamart, Zepto and Flipkart Minutes had presence in cities with the MFC network counted in its Nov-Dec 2025 data; Bain counts 7,000+ centres across 200+ cities. [PV]
- CORR: Blinkit stores. Pass 1 gave 1,816 (stale). Blinkit had 2,443 at June 2026 (Inc42, pass 1) and 2,751 at end Sept 2026 after 308 net additions (Medianama and Business Today, PV-press). The two numbers reconcile.
- CORR: Instamart stores. Pass 1 gave 1,102. Swiggy's disclosure: 1,171 at end June 2026 (Q1 FY27, 131 cities); 1,240 at end Sept 2026 (Q2 FY27, 133 cities, +69 net). [CORR, PV-press: Storyboard18, 22 Oct 2026]
- CS: Flipkart Minutes about 1,000 micro-fulfilment centres in about 130 cities (June 2026); target 1,500 by end-2026; a CLSA report (Aug 2026) counts Minutes at 627 dark stores in the top 10 cities vs Instamart's 615. Later "150+ cities / 1,200 centres" unverified. [CS]
- SU: Pass 1 share estimates (49/29/29; 46/35/19; BofA above 50%; Motilal early 2025 47/29/24) are superseded by the DRHP figure (46/29). [CORR, PV-press]
- C/conflict: BB Now (BigBasket): tracker count 664 dark stores in 108 cities (July 2026); BigBasket chief buying officer stated about 850 dark stores late 2025 (Business Standard, Dec 2025 interview, CS). [C, conflict]

### 3. Profitability and losses

- PV-press, Blinkit Q2 FY27 (Medianama 22 Oct 2026; Business Today 23 Oct 2026): consolidated Eternal net profit Rs 125 cr (up 92% from Rs 65 cr); Blinkit revenue Rs 19,152 cr (up 94%), "partly because it has moved to an inventory-led model"; NOV Rs 20,940 cr (up 79%); "EBITDA profit of Rs 184 crore against an adjusted EBITDA loss of Rs 156 crore in Q2 FY26" (Medianama). Adjusted EBITDA as 0.9% of NOV against a steady-state target of about 6% (Business Today). [PV-press]
- PV-press: Eternal consolidated revenue Rs 24,138 cr, up 78% (Medianama). [PV-press]
- SU: Blinkit Q1 FY27 adjusted EBITDA about Rs 102 cr (Inc42, pass 1) vs Rs 365 cr (IndiaInfoline). Not resolved; needs Eternal's Q1 filing. [SU]
- PV-press, Instamart Q2 FY27 (Storyboard18, 22 Oct 2026): GOV Rs 9,230 cr, +31.4% YoY; adjusted EBITDA loss Rs 895 cr, up Rs 118 cr QoQ (the -9.7% of GOV figure checks: 895 / 9,230 = 9.7%); contribution margin -1.0% of GOV, "within the range indicated earlier by the company"; NOV Rs 6,594 cr, +13.4% QoQ (Q1 NOV Rs 5,817 cr, so the QoQ figure checks: 5,817 x 1.134 = 6,596); orders 130 mn, +29.3%; 14.8 mn users (+23%). [CORR, PV-press]
- CS: Swiggy's letter says losses "peaked out in Q2FY27" and guides about 100 bps margin improvement in the December quarter; break-even needs about 2.3x current scale (search summaries of the letter). [CS, letter not fetched]
- SU: Instamart Q2 NOV Rs 6,954 cr (pass 1 snippet) is rejected in favour of Rs 6,594 cr (QoQ check above). [CORR]
- PV-press, Swiggy consolidated Q2 FY27: net loss Rs 922 cr (down from Rs 1,092 cr); revenue about Rs 7,571 cr (+36%); food delivery GOV Rs 10,054 cr (+17.7%) with a record adjusted EBITDA of Rs 341 cr (Storyboard18 and search summaries). [CS for consolidated; PV-press for food]
- CORR: Instamart contribution margin. Pass 1 showed -0.2% and +0.2% for Q1 FY27; Q2 FY27 is -1.0% of GOV (PV-press). Q1 sign still disputed. [CORR, SU for Q1]
- PV-press, Zepto FY26 (updated DRHP, as reported by Storyboard18, 10 Jun 2026): advertising revenue Rs 1,635.7 cr, up 151% from Rs 651.1 cr; ad spend about Rs 1,389 cr in FY26 (one analysis, CS). [PV-press]
- SU: Zepto total expenses (Rs 29,026 cr), net loss Rs 5,905 cr (restated, confirmed in pass 2 snippets) and loss per order (Rs 136.1, Rs 78.8, Rs 59.4) from pass 1. Loss per order not re-checked. [SU]

### 4. How a brand gets listed (onboarding, distributors, margins, fees, ads)

- CORR: Blinkit price-band commission took effect 13 March 2025: 2% for items under Rs 500, 6% for Rs 500-700, 18% for Rs 1,200 and above (Business Standard, Mar 2025; CS). [CORR]
- C: 2026 bands from agency guides: 2% / 6% / 13% (Rs 700-900) / 16% (Rs 900-1,200) / 18% above; another says category commissions of 8-22%; another says all-in take of 22-38%. These conflict and are not platform disclosures. [C, SU]
- PV-press, inventory-led model: Blinkit's revenue now includes the full value of goods it sells, unlike the marketplace commission model (Medianama, Business Today). Blinkit is "picking products directly from brand warehouses and stocking them in its own mother warehouses" to serve smaller cities (Medianama, Q2 FY27 letter, PV-press). [PV-press]
- CS: Blinkit notified sellers that from 1 Sept 2025 it would buy inventory; sellers who did not opt in had stock returned with reverse-logistics costs deducted; about 90% of NOV was own inventory by Q3 FY26 (secondary, B/C). [CS]
- PV-press: Blinkit will not launch a private label. CEO Albinder Dhindsa: "We don't want to become both the platform and a competitor to the brands on the platform," and the ad income "allows us to earn advertising revenue as the brands grow" (Medianama, Oct 2026, from the letter). CFO Akshant Goyal: private labels are not something Eternal has "competence in" (call). [PV-press]
- CS: Instamart will own inventory after a 49.5% foreign-holding cap is approved to qualify as Indian-owned and controlled; transition over the next few quarters; about 80 bps net margin benefit (Storyboard18). [CS / PV-press]
- PV-press: Zepto ad revenue Rs 1,635.7 cr (FY26) is the only platform ad-revenue disclosure found. Blinkit and Instamart did not disclose ad revenue in pass 2. [PV-press]
- C: Blinkit seller registration (seller.blinkit.com) said to be free; recurring fees of about Rs 50 per unit fulfilment, Rs 5 inwarding, Rs 1 per unit per day storage, plus 18% GST; TCS 1%; onboarding 14-21 days (agency guides). Blooprint says Blinkit publishes no rate card (Sept 2026). [C, SU]
- SU: Rs 25,000 per SKU per state listing fee credited to an ad wallet; contested. [SU]
- SU: Inc42's claim that Instamart may raise commission to 20-22% from 15%. Date unclear. [SU]
- B, pass 1: D2C sellers describe delayed payment cycles and ask for performance-linked ad models (Storyboard18, undated). [B, SU for pass 2]
- SU: distributor route terms, official seller rate card, whether brands can list directly or must go through distributors or aggregators. [SU]

### 5. Ranking and visibility on the apps

- C (several vendor sources agree): search ranking weighs stock at the nearest dark store. [C, unchanged]
- C (agree): sponsored search at the top for specific queries; category pages and homepage banners are paid; Zepto has a paid track and an organic track. [C]
- C (one source): ad spend can rise while organic rank falls. [C]
- PV-press: Blinkit's CEO says it will keep spending to onboard consumers and that ad income grows as brands grow. The marketing-spend figures in that Storyboard18 piece look like a year-old quarter. [PV-press, date not confirmed]
- SU: official platform documentation on ranking, auction, brand shops or category placement. [SU]
- PATTERN (inference): visibility depends on (a) stock in enough dark stores, (b) paid spend, (c) sales velocity feeding organic rank. Under the inventory-led model, Blinkit buys the stock, so placement may depend more on Blinkit's own buying and ad spend than on the brand's listing choices. [PATTERN, not confirmed]

### 6. Categories growing beyond grocery

- B, pass 1: Redseer 2026 category growth for total online (not QC): fashion 17-20%; beauty and personal care 16-18%; mobiles 16-18%; electronics 2-3% forecast vs 20-22% claimed rebound. [B, SU for electronics]
- PV (Redseer): non-grocery categories (beauty and personal care, home essentials, electronics) grow from about USD 3 bn in FY26 to USD 21-27 bn FY31P, per a search summary of the report; the report's executive summary confirms the non-metro and non-grocery frontier framing. [CS for the USD 21-27 bn figure, PV for the framing]
- CS (B): Redseer on beauty: QC about 15% of online beauty sales today, about 40% by 2030 (pass 1; primary not opened). [CS]
- FASHION:
  - Myntra M-Now (30-minute fashion, from Dec 2024 per TechCrunch, 5 Dec 2024): about 10 cities mid-2026 (one guide); plans 15-20 cities by end-2026; about 10% of Myntra orders in its markets in year one (one analysis). Style count disputed. [C, CS for launch]
  - Slikk (Bengaluru, 60-minute fashion delivery): USD 10 mn Series A led by Nexus Venture Partners and Lightspeed; plans new cities and beauty, accessories, footwear. Round date disputed; about 100 deliveries a day (one report). Returns "40-50% lower" is self-reported. [CS for funding, C for operations]
  - Blinkit fashion: dropped its "10-minute" tagline by Jan 2026 after gig-worker strikes and government talks (search summary). Fashion push not covered. [C, SU]
  - Zepto fashion: nothing found. [SU]
  - Other fashion-first QC players named: KNOT, Zilo, Zulu Club, Amazon Now. [C]
  - Fashion QC GMV: not quantified. [SU]
- Legacy FMCG QC share (Britannia and Tata Consumer above 70%; Dabur 75%) from pass 1, not re-checked, not a D2C benchmark. [SU]

### 7. Expansion of other players (Flipkart, Amazon, BB Now, Myntra)

- PV-press: Amazon Now expanded to more than 120 cities, announced 1 Oct 2026 (Indian Retailer, 1 Oct 2026, fetched). "Leveraging nearly 800 micro-fulfilment and urban fulfilment centres"; plans to scale to more than 300 cities. Amazon's own release was not fetched. Counts elsewhere: 750 stores (one report) with a goal of about 1,300 by April 2027. [CORR, PV-press]
- CS: Late-2025 position (Business Standard, 1 Dec 2025): about two new dark stores a day, 300 by year-end, three cities first (Bengaluru, Delhi, Mumbai). [CS]
- CS: Flipkart Minutes: 1,000 MFCs in about 130 cities (June 2026); target 1,500 by end-2026; UBS expects dark-store footprint to double by 2027 (CIOL). [CS]
- C/conflict: BB Now (BigBasket): 664 dark stores in 108 cities (tracker, July 2026, C) vs about 850 dark stores (company, Dec 2025, CS). Croma and 1mg outlets are reportedly used as dark stores for BigBasket (CS). No onboarding terms found. [C, conflict]
- PV-press: BusinessToday (24 Feb 2026, fetched) lists Blinkit, Instamart, Zepto, BigBasket, Amazon Now, Flipkart Minutes and JioMart racing on dark stores. [PV-press]
- C: Myntra M-Now: see section 6.

### 8. Regulation and disputes (2026 focus)

- PV-press, Maharashtra FDA (Inc42, 14 Aug 2026; Storyboard18, 16 Aug 2026; both fetched): state-wide inspection drive on 13 Aug 2026 covered 86 establishments storing, selling and delivering food through online platforms; 14 food-business licences suspended; 60 improvement notices; one facility ordered to stop operations. Inc42 names five Blinkit, five Zepto and two Instamart outlets (12 platform-linked); the remaining two are not named in Inc42 (one search summary names Bhagwati Stores and Swinsta Ent Pvt Ltd). Violations include food on the floor at an Instamart facility in Andheri and cockroach infestation at a Blinkit facility in Malad West. No licence permanently cancelled. [CORR, PV-press]
- C, tracker: Telangana food-safety authority suspended four dark-store licences across Instamart, Flipkart and Zepto on 30 Sep 2026, with notices to eight others (blacklisted.co.in). Karnataka Rs 25,000 penalty on a Zepto warehouse in Hoskote (same tracker). Neither order was found published. [C, SU]
- CS, FSSAI: penalised Amazon, BigBasket, Flipkart, Instamart and Zepto for food-safety lapses (dates not confirmed; the pass 1 Inc42 article was undated). Regulator's CEO said prosecutions rose at least 5-6x in the past year (search summary). ISB professor: dark stores are not a separate category under food law; action is largely state-driven. [CS]
- SU: FSSAI e-commerce food rules for quick commerce and cloud kitchens (manufacturing date, expiry and batch display; tighter dark-store checks, including frozen storage). No draft text found. [SU]
- CS: CCI, AICPDF complaint filed March 2025 (predatory pricing, deep discounting, possible FDI breaches on inventory and pricing control, distributor issues), naming Blinkit, Instamart and Zepto (The Tech Portal, 6 Mar 2025). No 2026 CCI order or ruling found. [CS for 2025 filing; 2026 status SU]
- CS: AICPDF asked SEBI (Dec 2025) to pause or tighten IPO approvals for loss-making quick-commerce firms, naming Zepto (Business Standard, 30 Dec 2025 by URL). No SEBI action found. [CS]
- FDI rule (pass 1, B): marketplace-model entities with foreign investment cannot own inventory or influence pricing; whether dark-store stock counts is open. The Blinkit and Instamart moves to own inventory are the relevant change; the legal status is not confirmed. [B, SU]
- SU: CCI cost-of-production regulations (May 2025), pass 1, not re-checked. [SU]
- SU: government probes into dark-store ownership structures (pass 1, undated). [SU]
- SU: CAIT accused platforms of heavy influence over vendor operations (pass 1). [SU]

### 9. D2C founders on QC share of sales

- SU: no clean D2C brand-level share-of-sales figure found. [SU]
- C, anecdotal: founders report their own website sales dipping after QC listing. [C, SU]
- B, pass 1: ChrysCapital's Rajiv Batra says owned-channel share (D2C or offline) will be key to category leadership. [B] https://inc42.com/?p=558124 (undated)

## Ranking / visibility mechanics

- Confirmed by sources (B and company filings as reported): paid placements exist (sponsored search, category and homepage banners, in-app video). Zepto's ad revenue is large and growing. Blinkit's CEO describes ad income as growing with brands.
- Agreed by vendor sources (C): nearest-dark-store stock matters for rank; paid and organic tracked separately.
- Not confirmed: ranking formula, relevance weights, auction design, brand-shop rules, category placement rules.
- PATTERN (inference): as Blinkit and Instamart buy more stock themselves, brand leverage shifts from listing terms towards wholesale price, sell-through and ad spend. Not confirmed.

## What a small new D2C seller should do / avoid (PATTERN, my inference)

- Do: get written terms from each platform before signing. For Blinkit and Instamart this means wholesale or purchase-order terms and margin, since they buy stock. Blinkit publishes no public rate card.
- Do: model margin on the full stack: buy-in margin or commission, ad spend, warehousing and last-mile where they apply, payment cycle and returns. Do not use FY25's 18.9% take rate.
- Do: check food-licence requirements before a dark-store listing. In 2026 enforcement is state-led (Maharashtra, Telangana, Karnataka), and food is the highest-risk category.
- Do: test one platform first. Stock and store coverage differ by platform and city; Flipkart and Amazon are expanding fastest into smaller cities.
- Do: track paid and organic performance separately.
- Avoid: committing to any listing or activation fee (including the reported Rs 25,000 per SKU) until it is in writing.
- Avoid: assuming QC volume transfers to your own site; channel cannibalisation is anecdotal.
- Watch: FSSAI e-commerce food rules; the AICPDF CCI and SEBI complaints; Zepto IPO timing; Blinkit's and Instamart's inventory models and any change to their commission bands.

## Open questions and conflicting claims (after pass 2)

- Market size: Bain USD 10-11 bn (2025) and Redseer USD 13 bn (FY26) are the anchor pair. Markntel and Coherent are outliers. [PV for the anchors]
- Blinkit Q1 FY27 adjusted EBITDA: Rs 102 cr (Inc42) vs Rs 365 cr (IndiaInfoline). Needs Eternal's Q1 filing. [SU]
- Blinkit Q2 FY27 consolidated adjusted EBITDA: Rs 666 cr vs Rs 750 cr across sources (definitions). [SU]
- Instamart Q1 FY27 consolidated adjusted EBITDA loss: Rs 651 cr vs Rs 770 cr across sources. [SU]
- Instamart contribution margin Q1 FY27: -0.2% vs +0.2%. Q2 FY27 is -1.0% (PV-press). [SU for Q1]
- Blinkit 2026 commission bands: conflicting agency tables; no official rate card. [SU]
- Blinkit listing fee Rs 25,000 per SKU: contested. [SU]
- Zepto loss per order (pass 1): not re-checked. [SU]
- Zepto IPO: on hold, no date; reports of Feb-May 2027 listing window. [CS]
- Amazon Now city count: 120+ (Indian Retailer, Oct 2026) vs about 750 stores (one report). [PV-press, count disputed]
- Flipkart Minutes: 130 cities (June 2026) vs 150+ cities (undated). [SU for the later figure]
- BB Now: 664 stores in 108 cities (tracker) vs about 850 stores (company, Dec 2025). [C, conflict]
- Maharashtra: 14 licences vs 12 platform-linked outlets named in Inc42. [CORR, PV-press; two outlets not named]
- Electronics online growth: 2% vs 20-22%. [SU]
- Gaps still open: Eternal and Swiggy shareholder letters (not reachable); Blinkit and Zepto seller terms (not reachable); CCI status for 2026; FSSAI draft rules; fashion-on-QC GMV; Zepto and Blinkit fashion; D2C share-of-sales.

## Sources

Ratings as in pass 1. "Fetched" means read with curl in pass 2 (text saved to /tmp/d2c-fetch/). "Search" means search-result snippet only.

1. https://www.bain.com/insights/how-india-shops-online-2026/ (2026; B; fetched)
2. https://redseer.com/reports/think-quick-commerce-unlocking-the-90bn-opportunity/ (Oct 2026; B; fetched, executive summary)
3. https://www.medianama.com/2026/10/223-eternal-125-crore-profit-q2fy27/ (22 Oct 2026; B; fetched)
4. https://www.medianama.com/2026/10/223-eternal-q2-fy27-results-ai-strategy/ (22 Oct 2026; B; fetched)
5. https://www.businesstoday.in/technology/artificial-intelligence/story/blinkit-is-eternals-proven-bet-darkai-is-the-next-gamble-563252-2026-10-23 (23 Oct 2026; B; fetched)
6. https://www.storyboard18.com/amp/brand-marketing/swiggy-q2-gov-grows-as-instamart-losses-widen-ws-l-113177.htm (22 Oct 2026; B; fetched)
7. https://www.storyboard18.com/brand-marketing/zepto-ad-revenue-jumps-151-percent-in-fy26-ahead-of-ipo-debut-ws-l-100656.htm (10 Jun 2026; B; fetched; DRHP as reported)
8. https://inc42.com/buzz/maharashtra-fda-suspends-licences-of-14-dark-stores-of-blinkit-zepto-instamart/ (14 Aug 2026; B; fetched)
9. https://www.storyboard18.com/brand-marketing/expired-food-pest-infestation-maharashtra-fda-suspends-14-blinkit-zepto-instamart-licences-ws-l-107785.htm (16 Aug 2026; B; fetched)
10. https://www.indianretailer.com/news/amazon-now-expands-120-cities-across-india-doubles-reach-two-weeks (1 Oct 2026; B-trade; fetched)
11. https://www.businesstoday.in/magazine/deep-dive/story/quick-commerce-firms-go-big-on-dark-stores-517751-2026-02-24 (24 Feb 2026; B; fetched)
12. https://www.business-standard.com/industry/news/quick-commerce-who-inspects-dark-stores-food-safety-india-126062500904_1.html (25 Jun 2026; B; not fetched, 403)
13. https://www.business-standard.com/industry/news/quick-commerce-blinkit-zepto-commission-structure-revenue-growth-125030700154_1.html (Mar 2025; B; search)
14. https://www.business-standard.com/companies/news/amazon-now-dark-stores-expansion-2025-quick-commerce-125120100985_1.html (1 Dec 2025; B; search)
15. https://www.business-standard.com/companies/news/quick-commerce-platform-bigbasket-targets-50-60-revenue-growth-in-fy26-125121400480_1.html (Dec 2025; B; search)
16. https://www.business-standard.com/markets/ipo/fmcg-distributors-body-writes-sebi-loss-making-quick-commerce-companies-ipo-125123000929_1.html (30 Dec 2025; B; search)
17. https://www.ciol.com/news/flipkart-minutes-may-double-its-dark-store-footprint-by-2027-ubs-12502102 (2026; B; search)
18. https://entrackr.com/news/flipkart-targets-over-1500-quick-commerce-dark-stores-by-2026-ubs-report-11461258 (2026; B; search)
19. https://thetechportal.com/2025/03/06/indias-quick-commerce-giants-face-antitrust-complaint/ (6 Mar 2025; B; search)
20. https://www.icle.in/resource/competition-in-digital-markets-making-sense-of-the-aicpdf-complaint-at-the-cci/ (2025; B; search)
21. https://blacklisted.co.in/food/notices/quick-commerce-actions-2026 (2026; C; search)
22. https://quickcommercemap.com/changelog/2026-07 (Jul 2026; C; search)
23. https://quickcommercemap.com/reports/india-quick-commerce-map-2026 (Jul 2026; C; search)
24. https://www.indiablooms.com/finance/blinkit-to-shift-to-inventory-led-model-from-sept-1-as-parent-gains-indian-ownership-report/details (2025; B/C; search)
25. https://www.logisticsinsider.in/explained-blinkits-new-inventory-led-model/ (2025; C; search)
26. https://inc42.com/features/blinkit-inventory-model-quick-commerce-cash-burn-problem/ (2025; B; search)
27. https://swcybernetics.in/guides/blinkit-seller-fees-2026 (Apr 2026; C; search)
28. https://ladya.in/guides/blinkit-commission-seller-economics (2026; C; search)
29. https://unicommerce.com/blog/how-to-sell-on-blinkit-seller-onboarding-guide-2026/ (2026; C; search)
30. https://blooprint.in/blog/blinkit-seller-fees-explained/ (2026; C; search; says no public rate card)
31. https://ecomhelp.in/blinkit/ (2026; C; search)
32. https://techcrunch.com/2024/12/05/myntra-pushes-into-india-quick-commerce-race-with-30-minute-fashion-delivery (5 Dec 2024; B; search)
33. https://zoutons.com/news/myntra-m-now-explained-30-minute-fashion-delivery-2026 (May 2026; C; search)
34. https://www.outlookbusiness.com/start-up/investors/slikk-raises-10-mn-to-expand-60-minute-fashion-delivery-in-urban-areas (date disputed; B; search)
35. https://indiantextilejournal.com/slikk-rebrands-with-a-bolder-identity-and-60-minute-delivery/ (2026; B/C; search)
36. https://www.firstresort.in/blogs/research/quick-commerce-fashion-india-2026 (2026; C; search)
37. https://bwmarketingworld.com/article/swiggy-instamarts-ad-push-drives-take-rate-to-152-in-q2-fy25-541098 (2025; B; pass 1)
38. https://www.storyboard18.com/brand-marketing/if-growth-continues-well-keep-spending-more-says-blinkit-ceo-albinder-dhindsa-on-rising-ad-costs-83008.htm (undated; B; search)
39. https://echai.ventures/d2c/d2c-quick-commerce/qcomm-ads-visibility-search-ranking (undated; C; pass 1)
40. https://confetti.design/blog/how-new-brands-get-visibility-on-zepto (undated; C; pass 1)
41. https://www.42signals.com/blog/visibility-on-quick-commerce-platforms/ (undated; C; pass 1)
42. https://www.redseer.com/articles/speed-in-metro-scale-in-bharat-indias-80-bn-online-retail-story/ (2026; B; search)
43. https://www.theweek.in/news/biz-tech/2026/09/18/india-festive-online-retail-growth.amp.html (18 Sep 2026; B; pass 1)
44. https://redseer.com/wp-content/uploads/2026/02/India-BPC-2030_Growth-Shifts-and-Opportunities_ExecReport_Redseer-2.pdf (Feb 2026; B; pass 1)
45. https://inc42.com/?p=558124 (undated; B; pass 1)
46. https://www.eternal.com/investor-relations/ (Q2 FY27 letter; NOT reached: DNS and curl fail)
47. https://www.swiggy.com/corporate/wp-content/uploads/2026/07/Q1-FY2027-Shareholder-letter.pdf (Q1 FY27 letter; NOT reached)
48. https://seller.blinkit.com/ (Blinkit seller; NOT reached)
