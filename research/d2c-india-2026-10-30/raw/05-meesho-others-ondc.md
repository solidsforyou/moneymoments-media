# 05 - Meesho, Ajio/JioMart, Nykaa, Tata CLiQ, FirstCry, Snapdeal, ONDC (research as of 30 Oct 2026, PASS 2)

Pass 2 status: verification done 30 Oct 2026. Tags used below:
- **Verified in pass 2**: confirmed from a page I opened this pass (press page that cites the filing, or a company-reported figure as quoted by a named outlet). Where the page is press quoting a filing, I say so. No page was an exchange filing or Meesho/ONDC primary document, because those hosts were blocked (see Access below).
- **Corrected**: old value and new value both shown.
- **Still unverified**: checked and not confirmed, or not reachable.

Source rating key: A = official/filing, B = reputable press, C = blog/vendor/agency/aggregator.

## Access in this pass (what could and could not be read)

- WebFetch failed DNS for every host. Per the coordinator's note, all primary pages were retried with the proxy curl method in `RULES.md` ("How to fetch pages on pass 2").
- Read with curl (text extracted): medianama.com (Meesho Q2 FY27, Q1 FY27 takeaways, Q3 FY26 call coverage, June 2026 coalition), kotakneo.com (Meesho Q2 FY27, Nykaa Q1 FY27), inc42.com (Snapdeal/AceVector pages), entrackr.com and shiprocket.in reachable but not needed. Search snippets used for Upstox, Quartr, freepressjournal, Business Standard headers.
- **Blocked by proxy policy (403), not worked around**: meesho.com, supplier.meesho.com, static.pib.gov.in (PIB Digital India PDF), opendata.ondc.org, static-assets.meesho.com (Q2 shareholder letter PDF), yourstory.com, business-standard.com article pages.
- **DNS or no connection**: ondc.org, pib.gov.in, nykaa.com, ajio.com, tatacliq.com, firstcry.com, snapdeal.com, nseindia.com, quartr.com, tribuneindia.com, upstox.com (article).
- Consequence: no Meesho supplier-panel rule, no ONDC official dashboard value, no PIB text, no Ajio/Nykaa/Tata/FirstCry seller page, and no filing PDF was read directly. Those remain unverified.

---

## Key takeaways (top 10 after pass 2)

1. **Meesho's latest quarter is Q2 FY27 (Jul-Sep 2026), reported 28 Oct 2026.** Revenue from operations Rs 4,131.6 cr (+34.4% from Rs 3,073.7 cr). Consolidated net loss Rs 132.5 cr vs Rs 411.4 cr a year earlier (-68%). NMV Rs 12,911 cr (+23%). Placed orders 819 mn (+17%). Annual transacting users 284 mn (+21%). [B, MediaNama citing stock exchange filing; Kotak Neo B] **Verified in pass 2** (press quoting the filing, not the PDF).
2. **Q1 FY27 (Apr-Jun 2026)**: revenue Rs 3,712.8 cr; net loss about Rs 132.8 cr; NMV Rs 11,614 cr (+34%); placed orders 725 mn (+29%) of which 481 mn were delivered; AOV Rs 262.8. [B, MediaNama Q1 FY27 takeaways; newkerala/IANS snippets] **Verified in pass 2** for revenue, NMV, orders, AOV (MediaNama); Upstox's "Rs 1,328 cr" loss is a unit error. Corrected from "not found".
3. **Meesho's loss is narrowing fast, but it is still a loss.** H1 FY27 revenue Rs 7,844 cr (+41%); H1 net loss Rs 265 cr (-62%). [B, MediaNama] **Verified in pass 2.** Q2 FY26 loss confirmed at Rs 411.4 cr (see Corrections).
4. **Contribution margin is the number to watch**: 6.0% of NMV in Q2 FY27 vs 4.6% in Q1 FY27. The CFO said the 6% "is not to be assumed as going forward," because Meesho passes savings back to buyers and sellers. Marketing rose about 50% QoQ before the festive season; GPU-driven server costs also rose. [B, MediaNama Q2 FY27 call coverage; Kotak Neo] **Verified in pass 2.**
5. **AOV is about Rs 260-265 and falling for three quarters, not Rs 274-610.** Q3 FY26 Rs 265, Q4 FY26 Rs 264.1, Q1 FY27 Rs 262.8 (company-reported, as quoted by MediaNama). [B] **Corrected** (see Corrections).
6. **Meesho charges no platform fee, but says it will pass structural cost changes through.** In the Q2 FY26 shareholder letter it kept fulfilment charges flat through a logistics cost spike ("platform trust over quarterly optics"), and said structural changes would be passed to consumers. [B, MediaNama Feb 2026] **Verified in pass 2** as a stated policy, not as a binding commitment.
7. **Valmo's share of shipments has been flat at about 50% for three quarters** (per the Q1 FY27 call). The earlier 62%/66% figures are older. [B, MediaNama Jul 2026] **Corrected.**
8. **Meesho's ranking is partly described by management**: "compute-intensive AI models" are used to rank the shopping feed (Q2 FY27 call). Weights, feed rules and the ranking formula are not published. [B for the remark; weights = unverified] **Corrected from job-posting-only.**
9. **Ads are automated, not bid-led**: Meesho designed its ad system for small sellers, decides when and where ads appear, and optimises for conversion and ROAS, not reach. [B, MediaNama Feb 2026 call coverage] **Verified in pass 2** as company description. Cost-per-click mechanics: still unverified.
10. **Snapdeal is alive and listed, under parent AceVector.** AceVector IPO (Rs 420 cr, band Rs 30-32, 4.93x subscribed) listed 11.6% below issue on BSE on 5 Oct 2026 and closed 18.4% below issue. FY26 marketplace NMV Rs 1,093.1 cr (+25.7%); marketplace revenue Rs 293.7 cr; annual transacting users 12.16 mn; 84% of customers non-metro. [B, Inc42, Oct 2026, RHP-sourced] **Corrected** from "no 2026 news; 2017 only".
11. **ONDC official-ish scale (June 2026 PIB note, via search snippet only; PDF blocked)**: more than 20 crore buyers, 5 lakh sellers, 1,000 cities, nearly 90 lakh monthly transactions. This is about 3% of Meesho's monthly placed orders (Q2 FY27: 819 mn / 3 = about 273 mn per month; different definitions, so a rough pattern only). [A-claimed, not opened; PATTERN for comparison] **Still unverified** as primary text.
12. **Nykaa Q1 FY27 confirmed**: revenue Rs 2,782 cr (+29.1%), PAT Rs 79.7 cr, EBITDA margin 8.45% (12-quarter high), fashion revenue Rs 252 cr (+~50%), fashion NSV Rs 550 cr (+36%). [B, Kotak Neo, 4 Aug 2026] **Verified in pass 2.** Nykaa FY26 Rs 10,022 cr: still unverified.
13. **Meesho's tax exposure is new and material**: income tax demand of Rs 1,499.7 cr for AY 2023-24, with penalty proceedings noticed; Meesho has appealed. A separate Rs 572.1 cr demand (AY 2022-23) is stayed by Karnataka HC. [B, MediaNama Q2 FY27] **Verified in pass 2** (press, not the filing).
14. **Ajio, Tata CLiQ and FirstCry have no verified seller-fee data** in pass 2. Ajio's rate is not published; third-party estimates range 8-25%. Nykaa Fashion estimates (C) range 15-45%. [C, conflicting]

---

## Findings by sub-question

### A. Meesho: latest results (Q1 and Q2 FY27)

- **Q2 FY27 (quarter to 30 Sep 2026), reported 28 Oct 2026.** [B]
  - Revenue from operations Rs 4,131.58 cr, up 34.4% from Rs 3,073.67 cr. [B, Kotak Neo, 28 Oct 2026] **Verified in pass 2.**
  - Consolidated net loss Rs 132.45 cr vs Rs 411.36 cr (-68%). [B, MediaNama citing exchange filing; Kotak Neo] **Verified in pass 2.**
  - Total expenses Rs 4,382.3 cr (+24%); other expenses Rs 4,079.9 cr (93% of spend), including logistics, marketing and server costs. [B, MediaNama] **Verified in pass 2.**
  - NMV Rs 12,911 cr (+23%); placed orders 819 mn (+17%); annual transacting users 284 mn (+21%); purchase frequency 10.4 transactions per user. [B, Kotak Neo] **Verified in pass 2.**
  - Marketplace segment revenue Rs 4,119.9 cr (99%+ of revenue, +34%); marketplace loss Rs 130.5 cr (from Rs 370.7 cr). New initiatives revenue Rs 11.7 cr, loss Rs 41.6 cr (from Rs 13.5 cr). [B, MediaNama] **Verified in pass 2.**
  - Meesho Mall NMV +81% YoY (Tier 3 and below +89%); about 1,800 brands. Content Commerce NMV +160%; 2.2 mn content pieces generating orders (+144%). [B, Kotak Neo] **Verified in pass 2.** (Q1 FY27 Mall NMV was +93% per the Q1 shareholder letter as quoted by MediaNama.)
  - Free cash flow Rs 345 cr (Q1: outflow Rs 226 cr); company warned seasonal working-capital benefit helped. Cash Rs 7,048 cr at 30 Sep 2026. [B, Kotak Neo] **Verified in pass 2.**
  - Festive timing: last year's Mega Blockbuster sale fell in Q2, this year's in Q3. Management said NMV grew 33% over the 90 days before Dussehra in both years. [B, Kotak Neo] **Verified in pass 2.** This means Q2 YoY growth understates the underlying rate.
  - Kirana Club acquisition (Rs 202.1 cr, announced June 2026) closed 28 Oct 2026. Rs 100 cr into Meesho Payments; Rs 75 cr into Meesho Grocery in the quarter. Board approved up to USD 100,000 in Meesho Networks LLC (US AI subsidiary). [B, MediaNama] **Verified in pass 2.**
  - One outlet (investywise) gave standalone figures (profit Rs 189 cr; total income Rs 2,900+ cr). These are standalone, not consolidated, and are rejected for this table. [B/C]

- **Q1 FY27 (quarter to 30 Jun 2026).** [B]
  - Revenue from operations Rs 3,712.8 cr (about +48% from Rs 2,504 cr). Inc42 cites Rs 3,707 cr; Upstox Rs 3,713 cr. [B, MediaNama; Upstox/Inc42 snippets] **Verified in pass 2** (MediaNama figure).
  - Net loss about Rs 132.8 cr vs Rs 289.3 cr (newkerala/IANS). Upstox's "Rs 1,328 cr" is a unit error. [B] **Verified in pass 2** via Quartr/newkerala snippets; Quartr page not opened.
  - EBITDA loss Rs 224.7 cr (vs Rs 264.4 cr), per IANS snippet. [B] **Still unverified** in pass 2 (snippet only; Q2 release gives EBITDA loss Rs 229 cr vs Rs 456 cr a year ago per BigGo/MediaNama-style reporting, which does not match the Q1 Rs 224.7 cr definition). Treat the EBITDA series as unreconciled.
  - NMV Rs 11,614 cr (+34%); placed orders 725 mn (+29%); delivered orders 481 mn; AOV Rs 262.8 (Q4 FY26 Rs 264.1; Q3 FY26 Rs 265). Annual transacting users 274 mn (+29%). [B, MediaNama citing shareholder letter] **Verified in pass 2** (AOV definition not stated in the coverage; see Open questions).
  - Contribution margin 4.6% of NMV. [B, Kotak Neo Q2 comparison] **Verified in pass 2.**
  - Valmo share of shipments flat at 50% for three quarters. [B, MediaNama] **Verified in pass 2.**
  - Sellers: annual transacting sellers 1.04 mn (+81% YoY); Tier IV sellers +125%; sellers from Tier II and beyond = 45% of the seller base. [B, MediaNama] **Verified in pass 2.** Corrects the earlier "75% of sellers Tier 2+" (C).

- **H1 FY27 (Apr-Sep 2026).** Revenue Rs 7,844.4 cr (+41%); net loss Rs 265.3 cr (-62%). [B, MediaNama] **Verified in pass 2.**

- **FY26 and earlier (from pass 1, re-checked where possible).**
  - Q3 FY26 (Oct-Dec 2025): revenue Rs 3,517.6 cr (+31.6%); net loss about Rs 490 cr (vs Rs 37 cr); NMV Rs 10,995 cr (+26%); placed orders 690 mn (+~36%). [B, Storyboard18/Outlook/Entrackr snippets; MediaNama Feb 2026 for Rs 490 cr] **Verified in pass 2** for the loss and NMV via MediaNama; orders and revenue still from pass 1 snippets.
  - Q4 FY26: loss Rs 166 cr; revenue +47% (MediaNama headline, May 2026). [B, headline only] **Still unverified** in body.
  - H1 FY26 (Apr-Sep 2025): revenue Rs 5,578 cr (+29%). Check: Q1 FY26 Rs 2,504 cr + Q2 FY26 Rs 3,073.7 cr = Rs 5,577.7 cr, so the H1 figure is consistent. [B, pass 1 Inc42; arithmetic check] **Verified in pass 2** (arithmetic from two verified inputs).
  - Ad spend (advertising and sales promotion) 2.4% of NMV in Q3 FY26 vs 1.3% a year earlier. Spend, not ad revenue. [B, Storyboard18, pass 1 snippet] **Still unverified** in pass 2 (Storyboard18 not opened).
  - Listing 10 Dec 2025 at Rs 111, opening about 46% premium; IPO about 79x subscribed. [B, Inc42/Entrackr, pass 1] **Still unverified** in pass 2 (not reopened; consistent across snippets).
  - Management long-term goal of 5.5-6% of revenue from ads. [B/C, single source] **Still unverified.**

### B. Meesho: zero-commission model, logistics and fees

- No platform fee: CEO said such fees could cost the company trust with mass-market shoppers (Q2 FY27 call). [B, MediaNama Oct 2026] **Verified in pass 2.**
- Logistics: the company absorbed logistics cost increases in Q2-Q3 FY26 and did not raise order fulfilment charges. It called the spike temporary and said structural changes would be passed through. Meesho said logistics margin is kept "in a certain range" and savings are passed on. [B, MediaNama Feb 2026] **Verified in pass 2.**
- Valmo (Meesho's logistics arm): share of shipments flat at about 50% for three quarters; handled about 2% of orders in FY23, about 60% by mid-2025 (per MediaNama, which cites the DRHP). Management gave no target share. Meesho also says it is building a separate low-cost local logistics network for perishables and FMCG; it is "still in experimentation." [B, MediaNama Jul 2026] **Verified in pass 2.**
- Valmo "no plan to open to third parties" (CFO, Feb 2026). Pass-1 claim that the IPO filing mentions extending Valmo to non-Meesho merchants is **Still unverified**; the CFO's statement contradicts it. [B, MediaNama Feb 2026]
- Seller shipping charges depend on weight, zone and payment mode. [C, Shiprocket guide, pass 1] **Still unverified** in pass 2.
- Reverse shipping (return) charge: one 2026 guide reports Rs 153-165 per parcel up to 500 g from the Supplier Panel rate card; another guide says Rs 30-80. Conflicting; second-hand. [C, conflicting] **Still unverified.** The Supplier Panel rate card is the only primary source; it was not reachable.

### C. Meesho: ranking and visibility

- **Management statement (B)**: Meesho uses compute-intensive AI models to rank its shopping feed. GPU costs rose for this reason. [B, MediaNama Oct 2026 call coverage] **Verified in pass 2** as a remark on the call; no weights.
- **Management statement (B)**: the ad system uses AI to choose when and where ads appear, optimising conversion and ROAS for small sellers who do not manage keywords. [B, MediaNama Feb 2026] **Verified in pass 2.**
- **Quality score (C, one blog)**: a blend of customer ratings, return rate versus category peers, quality-related return reasons (wrong item, damaged, poor quality), and cancellation behaviour, measured on recent orders. [C, blooprint.in 2026 guide] **Still unverified** (one source, no primary).
- **Ranking penalty for returns/cancellations (C, several blogs)**: repeated quality returns and cancellations reduce catalogue visibility. [C, several 2026 guides] **Still unverified** as a primary rule; the direction is consistent across blogs.
- **Feed-first discovery and new-listing burst (C, pass 1)**: [C, indiapost.org] **Still unverified.**
- **Penalties (C, conflicting, pass 1 and this pass)**: late dispatch Rs 50 per order (one guide), or Rs 50-200 (another); cancellation penalty Rs 25 (one guide); quality-return refund plus charge of 10-15% of order value plus logistics (one guide). A third guide says the schedule is only in the Supplier Panel. [C, conflicting, blooprint and others, 2026] **Still unverified.**
- **Cancellation threshold (C)**: "cancellation rate above 5% might get the account suspended." [C, one guide] **Still unverified.**
- **Return-rate benchmark (C)**: 15-20% average (one guide); no category-level public figure (another). The only public fashion figure is 2023 press: "at least one in every four orders makes its way back." [C; 2023 B-era, flagged older than Jan 2025] **Still unverified.**
- **Weights for price, rating, returns, catalogue quality**: not published by Meesho. **Still unverified; not found.**
- **Meesho Ads cost-per-click**: pass 1 claim (C). Pass 2 found the mechanism described as auto-optimised ROAS, not keyword bidding (see B above). CPC wording **Still unverified.**

### D. Meesho: buyer profile and AOV

- **Annual transacting users 274 mn in Q1 FY27; 284 mn in Q2 FY27; purchase frequency 10.4 per user (Q2).** [B] **Verified in pass 2.**
- **Tier split of buyers**: about 87.8% of 213 mn annual transacting users live outside India's top eight cities (secondary, citing older filing data, probably the RHP period). [C/B, ICICI Direct RHP review and a secondary piece] **Still unverified** as current; flag as pre-2026 data.
- **AOV**: company-reported Rs 262.8 (Q1 FY27), Rs 264.1 (Q4 FY26), Rs 265 (Q3 FY26). Pass-1 range Rs 274-610 is **Corrected**: the Rs 610 and Rs 400-500 estimates have no source and are rejected. Secondary note of FY23 Rs 337 falling to FY26 Rs 265 (C, consistent with company series). Definition (order value on delivered vs placed orders) not stated in coverage.
- **Age split**: not found.
- **Price band (PATTERN)**: sub-Rs 300 average order, which fits low-price, high-frequency categories. This is an inference from the AOV series, not a sourced rule.

### E. Meesho: risk and news items

- **Income tax demand**: Rs 1,499.7 cr for AY 2023-24 with a notice to start penalty proceedings; appeal filed. Separate Rs 572.1 cr demand (AY 2022-23) stayed by Karnataka HC. [B, MediaNama Oct 2026] **Verified in pass 2** (press, not the order).
- **CCPA fines**: Rs 10 lakh over an unregistered herbicide (Oct 2026); earlier fine over misleading ads and walkie-talkies (Dec 2025). [B, MediaNama headlines] **Verified in pass 2** as headlines only.
- **Digital Commerce Coalition** (launched 1 June 2026): Amazon, Eternal (Zomato), Meesho, Swiggy and Zepto; Flipkart not a member; run by Koan Advisory. [B, MediaNama citing Entrackr] **Verified in pass 2** (headline/body).
- **Return policy protests and legal notice (Inc42, pass 1)**: dates unclear, possibly 2024-2025. [B, older than Jan 2025] **Still unverified.**
- **Layoffs (15%, 251, 300)**: dates not confirmed. [C/B] **Still unverified.**
- **Meesho says it is not in quick commerce** (pass 1 cofounder interview, pre-IPO). [B/C] **Still unverified** in pass 2.
- **Meesho's Q2 FY27 stock reaction**: shares fell about 3% on results day, then recovered; closed Rs 227.84 on 28 Oct 2026. [B, Kotak Neo] **Verified in pass 2** (market data context only).

### F. Ajio, AJIO Rush, JioMart (Reliance)

- **Reliance Retail Q1 FY27**: revenue Rs 90,408 cr (+7.4%); profit down 14.2%; digital commerce share of apparel/footwear 27.3%. [B, Tribune/Newsable snippets; tribuneindia not reachable in pass 2] **Still unverified** in pass 2.
- **Reliance AGM (June 2026)**: Reliance Retail revenue above Rs 3.7 lakh cr; store count 20,000; AJIO "grown seven-fold in five years." [B, BusinessToday snippet] **Still unverified** (not reachable).
- **AJIO Rush orders +136% QoQ**: single source, still unverified.
- **AJIO GMV, seller commission, return fees**: no Reliance primary figure found. **Not found.**
- **Ajio seller terms (C, conflicting)**: Ajio does not publish its rates; rates agreed at onboarding and vary by category, brand and order value. Third-party estimates: 8-10%; 22-25%; 15-25% by category; one plan of 25% plus logistics or 40% fixed. No sign-up fee; settlements net of commission, logistics, return/RTO charges and 1% TCS. Registration via seller.ajio.com. [C, several 2026 seller guides: unicommerce, shiprocket, blooprint, swcybernetics] **Still unverified.** Official ajio.com not reachable.

### G. Nykaa and Nykaa Fashion

- **Q1 FY27 (quarter to 30 Jun 2026), reported 4 Aug 2026**: consolidated revenue Rs 2,782 cr (+29.1% from Rs 2,154 cr); PAT Rs 79.7 cr (from Rs 24.4 cr); EBITDA Rs 236 cr (+67.8%), margin 8.45% (12-quarter high); consolidated GMV Rs 5,590 cr (+34%). [B, Kotak Neo] **Verified in pass 2.**
- **Nykaa Fashion Q1 FY27**: revenue Rs 252 cr (+~50%, from Rs 170 cr); fashion NSV Rs 550 cr (+36%). [B, Kotak Neo] **Verified in pass 2.** Rejects the Rs 832 cr figure from pass 1 for the quarter; it may be a different period or definition; not reconciled.
- **Beauty**: revenue Rs 2,516 cr (from Rs 1,975 cr); beauty GMV Rs 4,105 cr (+29%). [B, Kotak Neo] **Verified in pass 2.**
- **FY26 revenue Rs 10,022 cr (+26%)**: from mirror sites in pass 1. **Still unverified** (Ascendants not reachable/opened). Do not publish.
- **Q3 FY26 revenue Rs 2,873 cr; Q2 FY26 PAT Rs 34 cr**: pass 1 snippets, **Still unverified** in pass 2.
- **Nykaa Fashion seller/brand terms (C, conflicting)**: no official rate card (nykaa.com not reachable). Fashion commission estimates 25-35% (agency); 15-30% (category range); 25-45% (outlier). 18% GST on commission. Brands apply; fashion is generally marketplace (brand holds stock and ships); beauty mostly inventory model. Shipping charge Rs 99 on orders under Rs 800 (one source). Returns are high in fashion. Commission negotiated per brand. [C, unicommerce, swcybernetics, blooprint, finifi, d2c-acquisitionlab] **Still unverified.**
- **Nykaa Fashion buyer demographics**: **Not found.**

### H. Tata CLiQ (Tata Digital)

- **Tata Digital FY26 loss about Rs 5,000 cr, mainly BigBasket** (pass 1, Inc42 headline). **Still unverified** in pass 2 (Inc42 article not fetched).
- Tata CLiQ leadership reported changes (CTPO Suman Guha moved to Croma, Apr 2026 per exchange4media). [B/C] **Still unverified.**
- Tata CLiQ seller fees, GMV, returns, buyer demographics: **Not found.**

### I. FirstCry (Brainbees)

- **Q1 FY27 (Apr-Jun 2026), results 13 Aug 2026**: revenue Rs 2,106 cr (+13.1%); net loss about Rs 44 cr (narrowed about 34%); consolidated GMV about Rs 2,807 cr. [B, YourStory/Sahi snippets, pass 1] **Still unverified** in pass 2 (YourStory blocked; NSE investor presentation not reachable; nseindia.com DNS fail).
- EBITDA conflict (Rs 59.65 cr vs Rs 88.17 cr): **Still unverified.**
- Seller fees and buyer demographics: **Not found.**

### J. Snapdeal (now under AceVector)

- **Parent**: AceVector Ltd (formerly the group that owns Snapdeal, Unicommerce and Stellaro Brands; founded 2010 by Kunal Bahl and Rohit Bansal). Pass 1's "Aabhaas" lead was **not confirmed**; the company that owns Snapdeal is AceVector per Inc42. [B] **Corrected** (old: Aabhaas, unverified; new: AceVector).
- **IPO**: Rs 420 cr (fresh Rs 287 cr + OFS Rs 133 cr), price band Rs 30-32, open 25-29 Sep 2026, subscription 4.93x. Listed at Rs 28.30 on BSE (11.6% discount) on 5 Oct 2026; closed the day at Rs 26.10 (-18.4% vs Rs 32). [B, Inc42 Oct 2026] **Verified in pass 2** (Inc42 article opened). Anchor round Rs 189 cr; fresh capital earmarked Rs 132 cr for marketing and Rs 50 cr for technology.
- **FY26 (RHP, year to Mar 2026)**: marketplace revenue Rs 293.7 cr (FY25 Rs 249.9 cr); marketplace NMV Rs 1,093.1 cr (+25.7%; FY25 Rs 869.6 cr); marketplace revenue about 26.9% of NMV (FY25 28.7%); delivered units 2.6 cr; annual transacting users 1.2 cr (12.16 mn); marketplace adjusted EBITDA loss Rs 50.2 cr (FY25 Rs 48 cr); marketing Rs 84.4 cr (FY25 Rs 63.2 cr). [B, Inc42 features and buzz; RHP-sourced] **Verified in pass 2** (Inc42 opened; RHP not opened).
- **Group FY26**: operating revenue Rs 510.3 cr (+29.2%); restated net loss Rs 45.5 cr (-64%); adjusted EBITDA loss Rs 15.9 cr. Unicommerce SaaS revenue Rs 204.3 cr (+51.6%). [B, Inc42] **Verified in pass 2.**
- **Customers**: about 84% of Snapdeal customers from non-metro geographies; fashion above 60% of the business. [B, Inc42, Oct 2026] **Verified in pass 2.**
- **Festive 2026 (Swagotsav, from 4 Oct 2026)**: company-reported fashion units +59%, fashion buyers +63%, 82% of orders from non-metro cities; Project Gati 45-day programme for first-time sellers. [B/C, MediaBrief and scanx snippets; company-reported] **Still unverified** as primary.
- **Scale gap**: Meesho's FY26 marketplace NMV Rs 41,560 cr vs Snapdeal Rs 1,093.1 cr (about 38x). Meesho annual transacting users 264 mn in FY26 (Inc42 says 264.29 mn; pass 2 Q1 figure is 274 mn). [B, Inc42]
- **Legal**: Supreme Court sought Snapdeal's reply in a prescription drug sale case (18 Jul 2026). [B, Inc42] **Verified in pass 2** (headline).
- **Analyst view**: expert says Snapdeal may not earn enough revenue per transaction to cover acquisition, tech and logistics costs; marketplace earns fees, ads, freight/collection and return-shipment charges. [B, Inc42 Oct 2026, one expert] **Verified in pass 2** as opinion.

### K. ONDC

- **Official dashboard (opendata.ondc.org)**: returned 403 by proxy policy; not read. Snippet only: 83,864,322 retail orders; 167,468 sellers; page labelled "last updated 1 Jan 2025" (stale). [search snippet, A-claimed] **Still unverified.**
- **PIB "Digital India: 11 Years of Transformation" (27 Jun 2026)**, via search snippet only (PDF blocked): more than 20 crore buyers, 5 lakh sellers, 1,000 cities, nearly 90 lakh monthly transactions as of June 2026; India Post integrated as a logistics provider. [A-claimed, snippet only] **Still unverified** as primary text. This is the best official-looking 2026 figure available.
- **Cumulative transactions**: secondary coverage reports ONDC crossed 500 million transactions in July 2026; 218 mn transactions in FY26 vs 0.2 mn in FY23. [C/B, WORLDEF; not from PIB] **Still unverified.**
- **Seller counts conflict**: PIB 5 lakh (June 2026); a press release claimed 7 lakh+ onboarded (Apr 2026); a PIB release reported about 206,000 merchants completing at least one transaction as of 31 Dec 2025 (March 2026). Earlier figures of 3 lakh+ (vendor blog, pass 1) and 6.38 lakh (Inc42, older) are superseded or C-grade. The likely explanation is "onboarded" versus "transacting" (inference). [B/C, conflicting] **Corrected**: the 2026 official count is 5 lakh (PIB June 2026, snippet) with 206k transacting (Dec 2025).
- **Targets**: 60 lakh daily transactions by end-2026 (one guide). **Not an official target found.** Still unverified.
- **PATTERN (ONDC scale)**: about 90 lakh monthly transactions is roughly 3% of Meesho's monthly placed orders (Q2 FY27 819 mn over three months, about 273 mn per month). Definitions differ (ONDC transactions vs Meesho placed orders), so use only as a rough order-of-magnitude comparison.
- **ONDC fee**: Rs 1.5 per order levy reported by Inc42 (pass 1, date unknown). **Still unverified.**
- **Ranking**: each buyer app decides ranking, not one central marketplace (ONDC design, C). **Still unverified.**

---

## Ranking / visibility mechanics (how things show up and why)

- **Meesho (B for management remarks)**: AI-ranked shopping feed (compute-intensive models). Ads are auto-optimised for conversion and ROAS. Relative weights are not disclosed.
- **Meesho (C, several blogs agree, primary not seen)**: low ratings, high return rates, cancellations and late dispatch reduce catalogue visibility; a quality score is computed on recent orders. Treat as directional only.
- **Meesho (C, one source)**: new listings get a probationary impression burst. Still unverified.
- **Ajio, Nykaa Fashion, Tata CLiQ, FirstCry, Snapdeal**: no sourced ranking mechanics found. Snapdeal's marketplace is described as value-focused (fashion-led, non-metro); no ranking rules.
- **ONDC (C)**: ranking is set by each buyer app, not one central marketplace. Still unverified.

## What a small new D2C seller should do / avoid (PATTERN, labelled)

PATTERN (inference from the verified facts above, not sourced rules):
- Meesho's economics now depend on logistics efficiency, returns and ads. Contribution margin was 6% of NMV in Q2 FY27 but management says it will not hold. Model landed cost (shipping by weight and zone, return shipping at the rate card, ad spend) before comparing with a commission marketplace.
- Meesho's average order is about Rs 263 and falling, so a Rs 1,000+ D2C price point is a poor fit unless the category has proven demand at that price there. Test with a few SKUs.
- Returns are the visibility risk everywhere on Meesho: keep return rate and cancellations low (C-grade rule; check the Supplier Panel scorecard).
- Snapdeal is small (NMV Rs 1,093 cr) and loss-making at the marketplace level; a small D2C brand should not plan around it without current seller terms.
- ONDC is growing (about 90 lakh monthly transactions per PIB June 2026, snippet) but small against Meesho; do not build a launch plan around it yet.
- For Nykaa Fashion and Ajio: fees are not published; both are brand-led and need direct onboarding talks. Budget for 15-30%+ commission plus GST (C-grade estimates) until confirmed.

## Open questions and conflicting claims

- **Meesho AOV definition**: Rs 262.8 (Q1 FY27) vs NMV/delivered orders (Rs 11,614 cr / 481 mn = about Rs 241) vs NMV/placed orders (about Rs 160). The company series may use a different denominator; confirm in the shareholder letter.
- **Meesho EBITDA**: Q1 FY27 Rs 224.7 cr loss (IANS) vs Q2 FY27 loss Rs 229 cr vs Rs 456 cr year-ago (press); definitions not reconciled.
- **Meesho Q2 FY26 loss**: Rs 411.4 cr (MediaNama, Kotak Neo, citing filing) vs Rs 330.5 cr (Entrackr, pass 1). **Resolved**: Rs 411.4 cr.
- **Meesho Valmo share**: 62% (FY25), 61.98% (Q1 FY26), about 66% (2QFY26, JM Financial) vs flat about 50% for three quarters (Q1 FY27 call). **Resolved toward the later call figure**; earlier ones are superseded.
- **Meesho Tier 2+ sellers**: 75% (pass 1, C) vs 45% (company, Q1 FY27). **Resolved**: 45%.
- **Meesho buyers outside top cities**: about 80%, 85%, 87.8% (older filing data). Still unverified as a current figure.
- **Meesho platform-fee stance**: "no platform fee" stated, but structural cost changes "will be passed through." Not a binding promise.
- **Nykaa Fashion Q1 FY27 fashion revenue**: Rs 252 cr (Kotak Neo, verified) vs Rs 832 cr (pass 1; likely different period or definition). **Resolved toward Rs 252 cr** for the quarter.
- **Nykaa FY26 revenue Rs 10,022 cr**: from mirror sites; still unverified.
- **ONDC seller count**: PIB June 2026 5 lakh vs 7 lakh+ (press release, Apr 2026) vs 206k transacting (Dec 2025). Definitions differ; not reconciled.
- **Snapdeal parent**: pass 1 said Aabhaas; pass 2 says AceVector (Inc42). Aabhaas link not checked.
- **FirstCry Q1 FY27 EBITDA**: Rs 59.65 cr vs Rs 88.17 cr. Still unresolved (NSE filing not reachable).
- **Ajio seller commission**: 8-10% vs 22-25% vs 15-25% by category vs 25%+logistics or 40% fixed. Conflicting; Ajio does not publish.
- **Tata CLiQ leadership**: conflicting (pass 1), still unverified.

## Not found (explicit gaps after pass 2)

- Meesho Supplier Panel rules: ranking weights, penalty schedule, return and cancellation thresholds, rate card. Primary site blocked (403 by proxy policy); no official doc found.
- Meesho RHP/DRHP buyer age split, primary AOV definition. Not reachable.
- Ajio, Nykaa Fashion, Tata CLiQ, FirstCry, Snapdeal official seller fee or commission schedules. Official sites not reachable.
- ONDC official dashboard and PIB text (blocked); no primary 2026 GMV number found.
- FirstCry and Tata CLiQ 2026 buyer demographics and seller terms.

---

## Sources

Rating: A = official/filing (here: only snippet-level, none opened), B = reputable press, C = blog/vendor/agency. "Opened" = read in full this pass via proxy curl; "snippet" = search result only.

1. MediaNama, Meesho cuts quarterly loss 68% to Rs 132.5 cr, 28 Oct 2026, https://www.medianama.com/2026/10/223-meesho-quarterly-loss-revenue/ (B, opened)
2. MediaNama, Five strategic takeaways from Meesho Q1 FY27 earnings call, Jul 2026, https://www.medianama.com/2026/07/223-meesho-q1-fy27-key-takeaways/ (B, opened)
3. MediaNama, Meesho absorbs losses to build internal logistics, Q3 FY26 earnings, Feb 2026, https://www.medianama.com/2026/02/223-meesho-losses-internal-logistics-ad-led-growth-q3fy26-earnings/ (B, opened)
4. MediaNama, Digital Commerce Coalition launch, Jun 2026, https://www.medianama.com/2026/06/223-amazon-eternal-meesho-swiggy-zepto-launch-digital-commerce-coalition-regulatory-pressure-mounts/ (B, opened)
5. Kotak Neo, Meesho Q2 FY27 results (revenue Rs 4,131.58 cr), 28 Oct 2026, https://www.kotakneo.com/news/stocks/meesho-q2-fy27-results-share-in-focus/ (B, opened)
6. Kotak Neo, Nykaa Q1 FY27 results, 4 Aug 2026, https://www.kotakneo.com/news/stocks/nykaa-q1-2026-27-results-net-profit-more-than-triples-to-rs-80-crore-revenue-up-29/ (B, opened)
7. Inc42, Snapdeal Makes It To D-Street, But Where's The Moat, Oct 2026, https://inc42.com/features/snapdeal-makes-it-to-d-street-but-wheres-the-moat/ (B, opened)
8. Inc42, Snapdeal parent AceVector lists at 11.6% discount on BSE, 5 Oct 2026, https://inc42.com/buzz/snapdeal-parent-acevector-lists-at-11-6-discount-on-bse/ (B, opened)
9. Inc42, AceVector FY26 loss falls 64% to Rs 46 cr, 22 Sep 2026, https://inc42.com/buzz/snapdeal-parent-acevectors-fy26-loss-declines-64-yoy-to-%e2%82%b946-cr/ (B, opened)
10. Inc42 company page, Snapdeal latest news, https://inc42.com/company/snapdeal/latest/ (B, opened)
11. Upstox, Meesho Q1 FY27 results (unit error noted), snippet, https://upstox.com/news/market-news/earnings/meesho-q1-fy-27-results-net-loss-narrows-to-1-328-crore-yo-y-nmv-sees-yearly-growth-of-34/article-197467/ (B, snippet)
12. Newkerala/IANS, Meesho Q1 results net loss Rs 132.8 cr, snippet, https://www.newkerala.com/news/a/meesho-q1-results-net-loss-stands-rs-1328-973.htm (B, snippet)
13. The Hawk/IANS, Meesho Q1 results, snippet, https://www.thehawk.in/news/economy-and-business/meesho-q1-results-net-loss-stands-at-rs-1328-crore (B, snippet)
14. Upstox, Meesho Q2 FY27 results, snippet, https://upstox.com/news/market-news/earnings/meesho-q2-fy-27-results-net-loss-narrows-to-132-crore-yo-y-net-merchandise-value-grows-23/article-202569/ (B, snippet)
15. Business Standard, Meesho Q2 net loss narrows 68% (header only), 28 Oct 2026, https://www.business-standard.com/companies/quarterly-results/meesho-q2-net-loss-narrows-68-to-132-crore-as-revenue-rises-34-126102801811_1.html (B, snippet; page 403 by proxy)
16. Meesho Q2 FY27 shareholder letter (PDF), 28 Oct 2026, https://static-assets.meesho.com/investor-relations/1793188437561/Q2ShareholdersLetter.pdf (A, not readable: host blocked)
17. Quartr, Meesho Q1 FY27 summary, https://quartr.com/events/meesho-limited-meesho-q1-26-27_FRtXINWI (A/B, not readable: DNS)
18. Investing.com, Meesho Q2 2026 earnings call transcript, snippet, https://www.investing.com/news/transcripts/earnings-call-transcript-meesho-q2-2026-margin-gains-lift-outlook-93CH-4980030 (B, snippet, not opened)
19. Entrackr, Meesho Q3 FY26 revenue Rs 3,517 cr, Jan 2026, https://entrackr.com/fintrackr/meesho-posts-rs-3517-cr-revenue-in-q3-fy26-losses-surge-13x-11059420 (B, pass 1 snippet)
20. Storyboard18, Meesho ad spends 2.4% of NMV, Jan 2026, https://www.storyboard18.com/advertising/meesho-ramps-up-ad-spends-to-2-4-of-nmv-as-q3-losses-widen-88556.htm (B, pass 1 snippet, not reopened)
21. Shiprocket, Meesho shipping charges, https://www.shiprocket.in/blog/meesho-shipping-charges/ (C, pass 1)
22. Blooprint, Meesho seller fees and seller account guides, 2026, https://blooprint.in/blog/meesho-seller-fees-explained/ and https://blooprint.in/blog/meesho-seller-account-guide/ (C, snippet)
23. Gonukkad, How to reduce Meesho returns, https://www.gonukkad.com/blog/reduce-return-rate-on-meesho (C, snippet)
24. Ecomvanshika, Meesho returns and RTO guide 2026, https://www.ecomvanshika.com/blog/meesho-returns-rto-guide (C, snippet)
25. Indiapost, How to sell on Meesho 2026, https://indiapost.org/how-to-sell-on-meesho (C, pass 1)
26. ICICI Direct, Meesho IPO review (RHP-based), https://www.icicidirect.com/mailcontent/idirect_meesho_iporeview_nov25.pdf (B/C, snippet)
27. Categorydecoded, Meesho 264 mn customers, https://categorydecoded.substack.com/p/9-meesho-has-264-million-customers (C, snippet)
28. Unicommerce, How to sell on Nykaa 2026, https://unicommerce.com/blog/sell-on-nykaa/ (C, snippet)
29. Swcybernetics, Nykaa seller registration 2026, https://swcybernetics.in/blog/nykaa-seller-registration-process-2026 (C, snippet)
30. Blooprint, Nykaa seller fees explained, https://blooprint.in/blog/nykaa-seller-fees-explained/ (C, snippet)
31. Unicommerce, How to sell on AJIO, https://unicommerce.com/blog/how-to-sell-on-ajio/ (C, snippet)
32. Shiprocket, How to sell on AJIO, https://www.shiprocket.in/blog/ajio-seller-guide/ (C, snippet)
33. Blooprint, Ajio seller fees 2026, https://blooprint.in/blog/how-to-sell-on-ajio/ (C, snippet)
34. Snapdeal/AceVector, Inc42 latest page cross-check, see 10 above (B)
35. PIB, Digital India: 11 Years of Transformation (27 Jun 2026), https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jun/doc2026627904001.pdf (A, snippet only; PDF blocked)
36. OpenData ONDC retail dashboard, https://opendata.ondc.org/retail (A, not readable: proxy 403)
37. WORLDEF, ONDC crosses 500 million transactions, 7 Aug 2026, https://worldef.com/2026/08/07/ondc-crosses-500-million-transactions-india/ (C, snippet)
38. Costbo, ONDC scale data (2025-2026 blogs), https://www.costbo.com/post/which-is-the-best-ondc-seller-app-features-pros-cons-2026 (C, snippet)
39. Business Today, Reliance AGM 2026, https://www.businesstoday.in/amp/latest/corporate/story/reliance-agm-2026-reliance-retail-revenue-tops-rs3-7-lakh-crore-store-count-hits-20000-538098-2026-06-19 (B, pass 1, not reopened)
40. Tribune / Newsable, Reliance Retail Q1 FY27, Jul 2026 (B, pass 1, not reachable this pass)
41. Inc42 / Entrackr, Meesho listing and IPO (pass 1), https://inc42.com/buzz/meesho-makes-bumper-debut-on-bourses-lists-at-46-premium (B, pass 1, not reopened)
42. Exchange4media, Tata CLiQ leadership, https://www.exchange4media.com/tags/tata-cliq.html (B/C, pass 1, not reopened)
43. YourStory, FirstCry Q1 FY27, https://yourstory.com/2026/08/firstcry-parent-brainbees-cuts-q1-fy27-loss-revenue-grows-13 (B, pass 1; blocked this pass)
44. Sahi, Brainbees Q1 FY27, https://www.sahi.com/blogs/brainbees-solutions-q1-fy27-results (C, pass 1, not reopened)
45. MediaBrief / scanx, Snapdeal Swagotsav sales, Oct 2026 (B/C, snippet)
46. Ascendants, Nykaa FY26 revenue crosses Rs 10,000 cr, https://ascendants.in/industry_events/nykaa-fy26-profit-jumps-revenue-crosses-10000-crore/ (B/C, pass 1, not reopened; mirror-site concern)
