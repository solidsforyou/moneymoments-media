# Own D2C website stack in India (2025-2026): platforms, checkout, COD/RTO, logistics, UPI, WhatsApp/SMS, conversion, returns

Researcher: helper 08. Date of research: 30 Oct 2026.
Method: WebSearch (standard mode, about 17 queries) and WebFetch. Two primary-source fetches failed because the hosts did not resolve in this session: `www.shopify.com` (pricing page) and `developers.facebook.com` (WhatsApp pricing page). One GoKwik search was rate-limited and was re-run successfully. Almost every figure below comes from search-result snippets, not from a page I opened in full. Where the search output did not show a page date, I write "date not shown". Nothing here is a verified primary figure unless labelled A.

---

## Key takeaways

1. **COD RTO is the core cost problem for an own site.** Cited COD return-to-origin rates run about 25-40% in vendor and logistics blogs (ClickPost-cited benchmark, ShipPrime 2026), with a D2C-wide average of 18-32% (Hillteck, 2026). Prepaid RTO is about 2-3% (ShipPrime). [C]
2. **No independent India-wide RTO figure was found.** Every RTO number comes from a company that sells RTO-reduction, logistics or checkout services. Treat the 25-40% band as the commonly quoted range, not a measured one. [C, pattern]
3. **Shopify India Basic is about ₹1,499/month on annual billing or ₹1,994/month on monthly billing, before 18% GST.** Only third-party roundups were found; the official pricing page could not be fetched. Plus pricing shows a conflict (about ₹1.75 lakh vs ₹1.52 lakh/month in older pages). [C]
4. **Checkout tools (GoKwik, Razorpay Magic Checkout, Shiprocket Checkout) sell their results with headline uplift numbers that have no control group.** Razorpay claims 40% higher conversion and 50% lower RTO, unattributed. The only quasi-independent comparison was a Razorpay single-page benchmark of 12-17%. Simpl data was not found. [C]
5. **Shipping rates are indicative only.** NimbusPost is quoted at about ₹17-26 per 500g by tier; Shiprocket at about ₹20/500g; Delhivery and Shadowfax have no reliable per-500g rate in the results. Quotes exclude GST and COD fees and vary by zone. Get a quote for your own pincodes. [C]
6. **UPI is the dominant digital payment rail.** NPCI-derived monthly data (via Entrackr, Inc42, StartupTalky): record 24.51 bn transactions in August 2026, 24.07 bn in September 2026 (-1.8% MoM, +23% YoY). Share of digital payments is 80-85% by volume, depending on the source. [B/C]
7. **WhatsApp marketing messages got more expensive on 1 Jan 2026.** Meta's India marketing rate is about ₹0.8631 per message (from ~₹0.7846), utility about ₹0.115, with BSP markups of 10-30% on top. Meta also requires INR billing migration by 31 Dec 2026. [C, rate figures from BSP sites]
8. **Abandoned-cart WhatsApp flows may not qualify as Utility.** Two vendor sources say cart-recovery templates are usually classed as Marketing, which costs roughly 3-5x more. Plan the budget on Marketing rates until Meta confirms otherwise. [C, pattern]
9. **DLT is a live compliance gate for SMS.** A BSE advisory dated 6 Oct 2026 pointed members to TRAI rules on pre-tagging, scrubbing and validating variable fields in SMS templates. Unregistered or mismatched templates are dropped. [B/C; the TRAI direction dated 18 Nov 2025 is the primary anchor]
10. **Conversion benchmarks disagree and none is India-specific.** Shopify-wide average is about 1.4% (Littledata), 1.70% in April 2026 (IRP), 2.66% global (Dynamic Yield). No verified rupee AOV benchmark was found. [C]
11. **COD confirmation and deposits are the most-cited RTO fixes, but the evidence is vendor case studies.** Examples: one store cut RTO from 35% to 12% with a ₹50 deposit (single anecdote); deposit plus OTP gives 5-8% RTO vs 25-35% for unverified full COD (vendor blog). [C, anecdotal]
12. **Returns tools are cheap to try.** Return Prime (Shopify app, 4.9 from 77 reviews per listing) was acquired by GoKwik in Sept 2024, per a third-party page; Shiprocket added an exchange feature in Nov 2024. 2026 pricing for both was not found. [C]
13. **A new D2C seller should run its own A/B test on COD vs prepaid, not copy vendor percentages.** Track confirmation rate, RTO and false cancellations together. [pattern]
14. **Open questions:** Simpl and Shiprocket Checkout data; Delhivery and Shadowfax rate cards; Dukaan share; India-only AOV and conversion; Meta's official 2026 rate card (not fetched).

---

## Findings by sub-question

### 1. Platform choices and market share

- **Shopify India plans (2026):** Five tiers from about ₹399/month (Starter) to about ₹1,75,000/month (Plus, multi-year term) before GST. Basic: ₹1,499/month annual, ₹1,994/month monthly, 2% fee on third-party payment providers, 3-day free trial, then ₹20/month for 3 months on select plans. Grow about ₹5,599 (annual); Advanced about ₹22,680 (annual). [C; sources: https://indiapost.org/shopify-pricing-india (date not shown), https://irpr.agency/shopify-pricing-plans-india-2026 (2026 per title), https://payglocal.in/blog/shopify-price-india-guide (date not shown), https://www.zoko.io/post/shopify-india-pricing-explained (date not shown), https://sociolabs.in/shopify-pricing-india-2026-plans-costs-guide/ (2026 per URL)]
  - Conflict: older pages list Basic at ₹1,994 and Plus at ₹1,52,000 (likely pre-revision).
  - Official check not done: https://www.shopify.com/in/pricing returned DNS failure in this session. Needs allowlisting before it can be verified.
- **Shopify India payments:** Shopify Payments availability in India was not verified in this run. [not found]
- **Platform market share in India:**
  - One ranking: WooCommerce about 43%, Shopify about 38%, Wix about 3% of sites. [C; page not identified in search output; candidates: https://www.digitaldawn.in/shopify-woocommerce-custom-guide-2025/ (2025), https://thed2cpulse.com/?p=738 (date not shown)]
  - Another estimate: WooCommerce 45.13% of stores, Shopify 28.61%. [C; date not shown]
  - Another: Shopify about 20-21% of Indian e-commerce sites, Wix about 9%. [C; date not shown]
  - Conflict: sources disagree on Shopify's share by roughly 2x. Treat as rough.
- **Positioning:** Commentary favours Shopify for COD tooling and checkout ecosystem and WooCommerce for cost. [C; https://www.digitaldawn.in/shopify-woocommerce-custom-guide-2025/ (2025), https://prateeksha.com/blog/shopify-vs-woocommerce-india-2026 (2026 per URL)]
- **Dukaan:** Mentioned only as an alternative. No market-share figure found. [not found]
- **Wix:** Framed by commentary as a website builder rather than a D2C-focused platform. [C; pattern]

### 2. Checkout tools and conversion claims

- **GoKwik (Kwik COD & Checkout Shopify app):** Listing says it can block COD through "70+ personalised interventions" and offers partial COD and prepaid bundles. One listing notes a 2.5% transaction fee on prepaid payments. Rating about 4.8 across locales. [B/C; https://apps.shopify.com/kwikcheckout (date not shown)]
  - Scale claim: 10k+ brands, network data on 120 million shoppers (2025 interview, republished on an August 2026 page). [C; https://www.medianews4u.com/in-2025-were-doubling-down-on-two-fronts-innovation-and-expansion-joyeeta-ghosal-gokwik/ (dated 18 Aug 2026 on page; interview from 2025)]
  - RTO performance: contained RTO at 25% despite a 21% jump in COD orders during a pre-festive sale. [B/C; https://cxotoday.com/media-coverage/e-commerce-enabler-gokwik-says-over-3-4th-of-pre-festive-d2c-sales-on-came-from-tier-23-cities/ (date not shown)]
  - Client claims (vendor case studies): Boult cut RTO 40.21%; Attitudist saw 2.5x prepaid conversions. [C; https://www.casestudies.com/company/gokwik (date not shown)]
  - Method (Shiprocket comparison): AI-based verification and COD risk scoring. [C; https://checkout.shiprocket.in/blog/gokwik-vs-fastrr-by-shiprocket-detailed-comparison/ (dated August 2026 per snippet)]
  - 2026 financials or audited RTO data: not found.
- **Razorpay Magic Checkout:**
  - Headline: 40% growth in conversion and 50% reduction in RTO. Unattributed. [C; https://razorpay.com/magic (date not shown)]
  - Kalakaar India case: 75% rise in order conversion, prepaid share 30% to 70%. [C; Razorpay case study via https://razorpay.com/blog/unlock-growth-with-razorpay-magic-checkout/ (date not shown)]
  - Other case studies listed on Razorpay's blog: Blue Tokai 5%, Root Deep 30%, Alphonso Mango 25%, Reload Casuals 57.91%. [C; https://razorpay.com/blog/category/magic-checkout/magic-checkout-case-studies (date not shown)]
  - Single-page checkout claim: 20-40 bps conversion lift, a far smaller figure than the headlines. [C; https://razorpay.com/blog/magic-checkouts-new-single-page-checkout/ (date not shown)]
  - Vendor benchmark: single-page mobile checkout gives 12-17% improvement over multi-page; proposed 60-67% conversion target for 2026. [C; https://razorpay.com/blog/high-converting-checkout-experience-guide/ (date not shown)]
  - Shopify app reviews: anecdotal uplift. [C; https://apps.shopify.com/razorpay-checkout (date not shown)]
- **Simpl:** No Simpl-specific checkout data found. [not found]
- **Shiprocket Checkout:** Not separately researched in this run beyond the GoKwik comparison above. [not found]
- **Pattern:** Checkout vendors all cite conversion uplifts that are mostly self-reported and lack baselines. No controlled test was found. [pattern]

### 3. COD share and RTO rates by tier, costs, and fixes

- **COD RTO (baseline):**
  - ClickPost-cited benchmark: COD RTO 25-40%. [C; https://www.clickpost.ai/blog/top-10-best-ecommerce-shipping-companies-in-india (ClickPost D2C trends report cited; date not shown)]
  - ShipPrime estimate for 2026: 25-30% average, fashion, footwear and general merchandise up to 40% in some categories. [C; https://shipprime.live/resources/blogs/cod-vs-prepaid-rto-profitability (date not shown)]
  - Shipmozo: COD RTO 20-40% in high-return categories; prepaid return rate 5-10%; healthy RTO below 10-15%. [C; https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics (2026 per title)]
  - Hillteck: average D2C RTO across Indian brands 18-32% (2026). [C; https://hillteck.com/blog/rto-trends-2026-indian-d2c.html (2026 per URL)]
  - Prepaid RTO about 2-3%. [C; ShipPrime, as above]
  - COD share of orders by tier: **not found.** No tier-level COD share or RTO breakdown was located.
- **Time sensitivity:** Hillteck says offers sent 24+ hours after an order convert at about one-third the rate of offers sent immediately. [C; https://hillteck.com/blog/reduce-rto-ecommerce.html (2026 per URL)]
- **Fixes and claimed effects:**
  - Partial COD deposit (e.g. ₹50): one Delhi fashion store cut RTO 35% to 12% in a month. Single anecdote. [C; https://easysellapp.com/blogs/wiki/cod-partial-payment-deposit-reduce-rto-shopify-2026 (2026 per URL); the ₹50-deposit store anecdote is from a vendor blog surfaced in the same search, exact URL not identified]
  - Deposits reduce RTO 25-40% across Indian brands (citing Shipway merchant data, not verified). [C]
  - Deposit plus OTP: RTO 5-8%, vs 25-35% for full COD with no verification. [C; vendor blog, same source as above]
  - OTP alone: 15-20% RTO reduction claimed, no source given. [C; https://www.bot.space/blog/how-to-convert-cod-orders-to-prepaid-shopify (date not shown)]
  - IVR calls: 10-15% RTO reduction claimed, no source. [C]
  - WhatsApp confirmation: RTO fell from 30-35% to 18-22% within a month, citing a 2025 Unicommerce report. Not independently confirmed. [C; https://blog.campaignhq.co/?p=3687 (date not shown)]
  - COD fee: ₹50-100 suggested to discourage casual orders. One footwear brand reportedly shifted to prepaid after a ₹60 charge. [C; https://www.bot.space/blog/what-is-cod-verification-ecommerce (date not shown)]
  - Warning: aggressive prepaid pushes may cut total order volume 25-40%. [C; vendor blog, date not shown]
  - Conflict: RTO baseline varies between 25-35% and 28-35% across sources. [C]
- **Costs:** COD remittance and fee structures are not detailed here; most COD-fee numbers are the suggestions above. [partial]

### 4. Logistics aggregators (rates, indicative only)

- **NimbusPost:** Most sources put entry rate near ₹17 per 500g; another comparison lists ₹25.50, ₹24 or ₹19 by volume tier with no plan fee, T+3 COD at no extra cost; another says ₹22-26 per 500g. [C; https://wiserreview.com/blog/metaport-alternatives/ and https://www.shiprocket.in/blog/shiprocket-vs-nimbuspost/ (date not shown)]
- **Shiprocket:** From about ₹20 per 500g (aggregator guide). [C; https://shipprime.live/resources/blogs/11-best-shiprocket-alternatives-in-2026-for-d2c-brands (2026 per URL)]
- **Shadowfax:** Its 360 platform is pitched as one flat rate with no COD or RTO surcharge and D+2 payouts (vendor claim). No published 500g rate found. Its blog says base rate depends on zone and chargeable weight. [C; https://shadowfax.in/blogs/ecommerce-shipping-charges-india-shadowfax-360 (date not shown)]
- **Delhivery:** A rate table from a shipping site lists ₹32 in a column whose header and weight/zone are not shown, so it cannot be used. Another comparison notes Delhivery per-shipment rates via aggregator (Shipyaari). [C; https://www.tekipost.com/shipping-rates (date not shown); https://edesy.in/blog/courier-charges-india-comparison-2026.md (2026 per URL)]
- **Official rate cards (Delhivery, Shadowfax):** not found.
- **Caveat:** Cited prices often exclude COD fees and 18% GST and vary by origin and destination zone. [C]

### 5. UPI share and new UPI features for commerce

- **Volume records (NPCI-derived):** July 2026 23.66 bn; August 2026 24.51 bn (record); September 2026 24.07 bn (-1.8% MoM, +23% YoY). [B/C; https://startuptalky.com/india-upi-transactions-august-2026-record-volume/ (Aug 2026); https://startuptalky.com/upi-transactions-september-2026/ (Sep 2026)]
- **Value:** about ₹29.9 lakh crore peak in May and July 2026. [C; same sources]
- **Share of digital payments:** conflicting. "85% of all digital transactions" (March 2026 report) vs "roughly 80% of retail digital payments by volume" (June 2026, The Hindu via Ease My Prep). [C; https://easemyprep.in/news/1752-upi-transactions-hit-record-high-of-299-lakh-crore-in-may (date not shown)]
- **App shares (August 2026):** PhonePe about 45.6%, Google Pay about 32.3%, Paytm about 8.0%. [C; same StartupTalky source family; primary NPCI app data not fetched]
- **October 2026 data:** not found (normally published early November).
- **UPI Autopay (recurring e-mandates):** Sets up a recurring mandate in the customer's UPI app. Extended to overdraft accounts and credit lines (Razorpay). Pre-debit notifications are required before each debit (Zuora docs). [C; https://razorpay.com/blog/upi-autopay-vs-card-e-mandates/ (date not shown); https://docs.zuora.com/en/zuora-payments/manage-payment-gateway-integrations-and-payment-methods/set-up-payment-gateway-integrations/ebanx-payment-gateway-integration/upi-for-ebanx-payment-gateway-integration (date not shown)]
  - Limit conflict: Razorpay 2026 guide says ₹15,000 standard limit with higher category caps; Cashfree cites a Dec 2023 RBI circular allowing up to ₹1 lakh without AFA for specific categories (mutual funds, insurance premiums, credit card bills). Verify against rbi.org.in. [C]
- **Credit on UPI:** Pre-sanctioned credit lines can be linked to UPI with customer consent (RBI circular Sept 2023; extended to small finance banks Feb 2025). A June 23, 2026 RBI circular (RBI/2026-27/152 DOR.STR.REC.128/21-07-001/2026-27) and matching SFB/commercial bank amendments require UPI credit lines to follow the same prudential norms as the underlying loan. [B/C; https://www.taxmann.com/post/blog/rbi-issues-prudential-norms-for-upi-linked-credit-facilities/ (2026); https://www.angelone.in/news/rbi-allows-pre-approved-upi-credit-access-to-small-finance-banks (Feb 2025); https://www.indianpaycalculator.in/govt-news/rbi-upi-credit-line-is-a-loan-june-2026 (June 2026)]
  - Primary RBI circular text not fetched. Treat as secondary.
  - No 2026 product launch that changes checkout behaviour was found. [pattern]

### 6. WhatsApp commerce, email and SMS

- **WhatsApp per-message pricing (Meta):**
  - Billing moved to per-message from 1 July 2025 (per BSP sources). [C; https://authkey.io/blogs/?p=1840 (2026 per URL); https://montymobile.com/blogs/whatsapp-business-api-pricing-in-india-inr-rates-gst-and-the-2026-currency-migration-deadline (2026 per URL)]
  - Marketing rate in India: about ₹0.8631 per message, from about ₹0.7846, effective 1 Jan 2026 (~10% rise). [C; Authkey and Montymobile, as above]
  - Utility and authentication: about ₹0.115 per message. [C; Montymobile rate table]
  - BSP markups: 10-30% reported (one source); all-in marketing rate quoted at about ₹0.95 (MyOperator) and ₹1.09 (AiSensy). [C; https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026 (2026); https://m.aisensy.com/blog/whatsapp-business-pricing/ (2026 per URL)]
  - Currency migration: eligible India accounts must move to INR billing by 31 Dec 2026. [C; Montymobile, as above]
  - Meta's official pricing page was not fetched (DNS failure). [A source needed]
- **WhatsApp for abandoned carts:**
  - Utility vs Marketing: two sources say cart-recovery is usually Marketing by default; Marketing costs roughly 3-5x Utility and may be rate-limited by quality rating. [C; https://chakrahq.com/id/article/whatsapp-abandoned-cart-recovery-d2c (date not shown); https://www.go4whatsup.com/guides/whatsapp-for-ecommerce/ (2026 per title)]
  - Open rates: vendor claims 95-98% for WhatsApp vs 18-25% for email. No independent measurement. [C; https://www.hillteck.com/blog/whatsapp-vs-email-vs-sms-open-rate-study-2026.html (2026 per URL)]
  - Recovery claims: 15-25% (Go4WhatsUp); 25-30% if sent within 30 min (CampaignHQ); up to 27% (Edesy). One Indian D2C case: about 12% of lost carts returned. [C; https://blog.campaignhq.co/?p=3746 (date not shown); https://edesy.in/whatsapp-crm/use-cases/ecommerce (date not shown)]
  - Pattern: the 25-30% recovery claims are vendor numbers; the only case-level figure is 12%.
- **DLT (SMS) rules:**
  - Three registrations required: entity, sender header, content template. Template types: transactional, promotional, service implicit, service explicit. Brand name compulsory in all SMS. [C; https://msg91.com/help/dlt-registration-in-india/dlt-template-scrubbing-filtering-rules (date not shown)]
  - Promotional SMS cannot go to DND numbers without digital consent. [C; vendor help page]
  - 2026 changes (reported): variable tagging (TRAI direction dated 18 Nov 2025, PDF at https://trai.gov.in/sites/default/files/2025-11/Directions_18112025_0.PDF) requires pre-declared variable slots, e.g. for links and phone numbers in bank texts; transition window for templates registered before 15 Jan 2026. [B/C]
  - Service Explicit migration to Promotional from March 2026: reported by one vendor only, unconfirmed. [C]
  - BSE advisory dated 6 Oct 2026 on pre-tagging, scrubbing and validation of variable fields. [B; https://teamleaseregtech.com/updates/article/60117/bse-advises-members-to-ensure-compliance-with-trai-directions-on-sms-c/ (2026 per snippet)]
  - OTP template draft direction: comment deadline 30 Sep 2026, now closed. [B; https://teamleaseregtech.com/updates/article/59776/bse-clearing-ltd-issued-a-draft-trai-direction-on-minimum-information-  (2026)]
  - Scrubbing charge about ₹0.25 per SMS (reseller claim). [C]
  - Category conflict: one source says only bank OTPs count as transactional. Verify against TRAI categories.

### 7. Typical own-site conversion rates and AOV in India

- **Conversion (global/Shopify):** Littledata Shopify average 1.4%; top 20% above 3.2%; top 10% above 4.7%. [C; Littledata figure as cited in https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026 (2026 per URL)]
  - IRP Commerce: 1.70% eCommerce conversion, April 2026. [C; date per snippet]
  - Dynamic Yield global benchmark: 2.66%. [C; date not shown]
  - Definitions differ (Shopify counts checkout-completing sessions; Dynamic Yield counts purchases per visitor). Not directly comparable.
- **India-specific conversion:** upGrowth "Conversion Rate Benchmarks for Indian Startups" (April 2026 PDF) exists, but its extracted table was garbled; figures not verified. [C; https://upgrowth.in/wp-content/uploads/2026/04/conversion-rate-benchmarks-for-indian-startups-slides-1.pdf (April 2026)]
- **AOV:** Shopify-wide about $85-95 (one source); TrueProfit cites $185 global and $255 desktop vs $164 mobile. No rupee AOV benchmark for India found. [C; https://videowise.com/conversion-optimization/scaling-average-order-value-india-a-revenue-guide-for-shopify-brands (date not shown); https://trueprofit.io/blog/shopify-benchmarks (date not shown)]
- **Pattern:** Indian D2C economics are described as thin-margin and logistics-heavy, so AOV growth is treated as necessary. No number.

### 8. Returns and exchange tools

- **Return Prime:** Shopify returns and exchanges app, 4.9 rating from 77 reviews. Acquired by GoKwik in September 2024 (third-party page; date of acquisition as reported). Integrates with Shiprocket and other carriers. A third-party review calls exchange features limited. [C; https://apps.shopify.com/return-prime (date not shown); https://www.cahoot.ai/return-prime-pros-cons/ (date not shown)]
  - Conflict: listing and third-party pages differ on company base (US vs Bengaluru).
- **Shiprocket exchange feature:** Added to dashboard November 2024. 2026 pricing not found. [C; https://www.shiprocket.in/blog/product-updates-november-2024 (Nov 2024)]
- **Other:** Shipway offers returns services in India (pin-code coverage limited). A guide cites nationwide reverse logistics across 27,000+ pin codes (provider unnamed). [C; https://blog.shipway.com/best-return-prime-alternatives/ (date not shown)]
- **Returnkart:** No 2026 information found. [not found]

---

## Ranking / visibility mechanics

Not applicable in the marketplace sense. An own site is found through its own traffic (paid, social, WhatsApp, search). No SEO or ad-platform ranking claims were in scope and none were researched here. The only visibility-adjacent finding: vendors claim that tier-2/3 cities drive most D2C sales. One GoKwik statement says more than 3/4 of pre-festive D2C sales came from Tier 2 and 3 cities (CXOToday, date not shown; company claim, C). This matches the COD-heavy profile reported above but was not checked against independent data. [C]

---

## What a small new D2C seller should do / avoid (pattern, labelled as inference)

- **Do:** Launch with prepaid and COD both, and A/B test a small COD deposit or OTP confirmation on your own orders. Measure confirmation rate, RTO and false cancellations together. [pattern]
- **Do:** Budget WhatsApp at Marketing rates (about ₹0.86 base plus BSP markup), not Utility, until a template is approved as Utility. Migrate to INR billing before 31 Dec 2026. [pattern, from C sources]
- **Do:** Register DLT entity, headers and templates before going live with SMS. Check variable-tagging compliance for any template with a link or phone number. [pattern; B-rated BSE advisory]
- **Do:** Get logistics quotes for your own origin and destination pincodes from two or three aggregators. Include COD fees and GST in comparisons. [pattern]
- **Do:** Treat checkout-tool uplift claims as hypotheses. Ask each vendor for a control group and baseline. [pattern]
- **Avoid:** Pushing prepaid so hard that total volume falls (one vendor warns of 25-40% volume loss). [C]
- **Avoid:** Using any single RTO benchmark for planning. Figures range from 18% to 40% depending on source and category. [pattern]
- **Avoid:** Assuming a Shopify plan price without checking the official page first; the fetch failed in this run. [pattern]

---

## Open questions and conflicting claims

1. **Shopify India pricing:** Official page not fetched (DNS failure for www.shopify.com). Third-party figures agree on Basic but conflict on Plus. Needs verification.
2. **Meta WhatsApp rate card:** Official page not fetched (developers.facebook.com DNS failure). Rates here are from BSP blogs.
3. **COD RTO baseline:** 18-40% range across sources; no government or audited source found. Conflict on whether the average is 25-30% or 18-32%.
4. **COD share of orders by tier:** Not found.
5. **GoKwik 2026 financial or RTO data:** Not found beyond one CXOToday report (date unclear) and vendor case studies.
6. **Simpl and Shiprocket Checkout:** No data.
7. **Shadowfax and Delhivery rate cards:** Not found. Shiprocket and NimbusPost quotes conflict by 20-50% across sources.
8. **Platform share:** WooCommerce vs Shopify leader conflicts across sources (WooCommerce 43-45% in some; Shopify 20-38% in others).
9. **Dukaan:** No share or pricing found.
10. **UPI share:** 80% vs 85% of digital payments by volume. October 2026 NPCI data not yet out.
11. **UPI Autopay limit:** ₹15,000 (Razorpay) vs ₹1 lakh for specific categories (Cashfree, citing Dec 2023 circular). Verify against RBI.
12. **Credit on UPI:** Primary RBI circular text not fetched; June 2026 details from secondary sites.
13. **WhatsApp abandoned cart category:** Whether Utility templates can be used for cart recovery is not settled in the sources. Meta's policy text was not fetched.
14. **Service Explicit to Promotional migration (March 2026):** single vendor source, unconfirmed.
15. **Conversion and AOV for India:** no verified India-specific figure. upGrowth report exists but was not readable.
16. **Return Prime ownership and base:** GoKwik acquisition (Sept 2024) and company location conflict across listings.

---

## Sources

Rating: A = official; B = reputable press; C = blogs, vendors, aggregators. Dates are those visible in the search output; "date not shown" means the snippet did not give one.

1. https://indiapost.org/shopify-pricing-india - C - date not shown
2. https://irpr.agency/shopify-pricing-plans-india-2026 - C - 2026 (per URL)
3. https://payglocal.in/blog/shopify-price-india-guide - C - date not shown
4. https://www.zoko.io/post/shopify-india-pricing-explained - C - date not shown
5. https://sociolabs.in/shopify-pricing-india-2026-plans-costs-guide/ - C - 2026 (per URL)
6. https://www.shopify.com/in/pricing - A - NOT FETCHED (DNS failure)
7. https://www.digitaldawn.in/shopify-woocommerce-custom-guide-2025/ - C - 2025 (per URL)
8. https://thed2cpulse.com/?p=738 - C - date not shown
9. https://prateeksha.com/blog/shopify-vs-woocommerce-india-2026 - C - 2026 (per URL)
10. https://apps.shopify.com/kwikcheckout - C - date not shown
11. https://www.medianews4u.com/in-2025-were-doubling-down-on-two-fronts-innovation-and-expansion-joyeeta-ghosal-gokwik/ - C - interview 2025, page dated 18 Aug 2026
12. https://cxotoday.com/media-coverage/e-commerce-enabler-gokwik-says-over-3-4th-of-pre-festive-d2c-sales-on-came-from-tier-23-cities/ - B/C - date not shown
13. https://www.casestudies.com/company/gokwik - C - date not shown
14. https://checkout.shiprocket.in/blog/gokwik-vs-fastrr-by-shiprocket-detailed-comparison/ - C - Aug 2026 (per snippet)
15. https://razorpay.com/magic - C - date not shown
16. https://razorpay.com/blog/unlock-growth-with-razorpay-magic-checkout/ - C - date not shown
17. https://razorpay.com/blog/category/magic-checkout/magic-checkout-case-studies - C - date not shown
18. https://razorpay.com/blog/magic-checkouts-new-single-page-checkout/ - C - date not shown
19. https://razorpay.com/blog/high-converting-checkout-experience-guide/ - C - date not shown
20. https://apps.shopify.com/razorpay-checkout - C - date not shown
21. https://www.clickpost.ai/blog/top-10-best-ecommerce-shipping-companies-in-india - C - date not shown (ClickPost report cited)
22. https://shipprime.live/resources/blogs/cod-vs-prepaid-rto-profitability - C - date not shown
23. https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics - C - 2026 (per title)
24. https://hillteck.com/blog/rto-trends-2026-indian-d2c.html - C - 2026 (per URL)
25. https://hillteck.com/blog/reduce-rto-ecommerce.html - C - 2026 (per URL)
26. https://easysellapp.com/blogs/wiki/cod-partial-payment-deposit-reduce-rto-shopify-2026 - C - 2026 (per URL)
27. https://www.bot.space/blog/how-to-convert-cod-orders-to-prepaid-shopify - C - date not shown
28. https://www.bot.space/blog/what-is-cod-verification-ecommerce - C - date not shown
29. https://blog.campaignhq.co/?p=3687 - C - date not shown
30. https://wiserreview.com/blog/metaport-alternatives/ - C - 2026 (per title)
31. https://www.shiprocket.in/blog/shiprocket-vs-nimbuspost/ - C - date not shown
32. https://shipprime.live/resources/blogs/11-best-shiprocket-alternatives-in-2026-for-d2c-brands - C - 2026 (per URL)
33. https://shadowfax.in/blogs/ecommerce-shipping-charges-india-shadowfax-360 - C - date not shown
34. https://www.tekipost.com/shipping-rates - C - date not shown
35. https://edesy.in/blog/courier-charges-india-comparison-2026.md - C - 2026 (per URL)
36. https://startuptalky.com/india-upi-transactions-august-2026-record-volume/ - C - Aug 2026
37. https://startuptalky.com/upi-transactions-september-2026/ - C - Sep 2026
38. https://easemyprep.in/news/1752-upi-transactions-hit-record-high-of-299-lakh-crore-in-may - C - date not shown (cites The Hindu, June 2026)
39. https://razorpay.com/blog/upi-autopay-vs-card-e-mandates/ - C - date not shown
40. https://docs.zuora.com/en/zuora-payments/manage-payment-gateway-integrations-and-payment-methods/set-up-payment-gateway-integrations/ebanx-payment-gateway-integration/upi-for-ebanx-payment-gateway-integration - C - date not shown
41. https://www.taxmann.com/post/blog/rbi-issues-prudential-norms-for-upi-linked-credit-facilities/ - C/B - 2026 (per URL)
42. https://www.angelone.in/news/rbi-allows-pre-approved-upi-credit-access-to-small-finance-banks - B/C - Feb 2025 (per snippet)
43. https://www.indianpaycalculator.in/govt-news/rbi-upi-credit-line-is-a-loan-june-2026 - C - June 2026 (per URL)
44. https://developers.facebook.com/docs/whatsapp/pricing - A - NOT FETCHED (DNS failure)
45. https://authkey.io/blogs/?p=1840 - C - 2026 (per URL)
46. https://montymobile.com/blogs/whatsapp-business-api-pricing-in-india-inr-rates-gst-and-the-2026-currency-migration-deadline - C - 2026 (per URL)
47. https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026 - C - 2026 (per URL)
48. https://m.aisensy.com/blog/whatsapp-business-pricing/ - C - 2026 (per URL)
49. https://chakrahq.com/id/article/whatsapp-abandoned-cart-recovery-d2c - C - date not shown
50. https://www.go4whatsup.com/guides/whatsapp-for-ecommerce/ - C - 2026 (per title)
51. https://www.hillteck.com/blog/whatsapp-vs-email-vs-sms-open-rate-study-2026.html - C - 2026 (per URL)
52. https://blog.campaignhq.co/?p=3746 - C - date not shown
53. https://edesy.in/whatsapp-crm/use-cases/ecommerce - C - date not shown
54. https://msg91.com/help/dlt-registration-in-india/dlt-template-scrubbing-filtering-rules - C - date not shown
55. https://trai.gov.in/sites/default/files/2025-11/Directions_18112025_0.PDF - A - 18 Nov 2025 (from filename; not opened)
56. https://teamleaseregtech.com/updates/article/60117/bse-advises-members-to-ensure-compliance-with-trai-directions-on-sms-c/ - B - 6 Oct 2026 (per snippet)
57. https://teamleaseregtech.com/updates/article/59776/bse-clearing-ltd-issued-a-draft-trai-direction-on-minimum-information- - B - 2026 (per snippet)
58. https://upgrowth.in/wp-content/uploads/2026/04/conversion-rate-benchmarks-for-indian-startups-slides-1.pdf - C - Apr 2026 (per URL; table not readable)
59. https://videowise.com/conversion-optimization/scaling-average-order-value-india-a-revenue-guide-for-shopify-brands - C - date not shown
60. https://trueprofit.io/blog/shopify-benchmarks - C - date not shown
61. https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026 - C - 2026 (per URL)
62. https://www.cahoot.ai/return-prime-pros-cons/ - C - date not shown
63. https://apps.shopify.com/return-prime - C - date not shown
64. https://www.shiprocket.in/blog/product-updates-november-2024 - B/C - Nov 2024
65. https://blog.shipway.com/best-return-prime-alternatives/ - C - date not shown
66. https://www.base.com/en-IN/blog/india-ecommerce-benchmarks-2026-how-brands-reduce-rto-in-india-and-hit-accuracy-sla-targets - C - 2026 (per URL; not opened, cited in search output only)
