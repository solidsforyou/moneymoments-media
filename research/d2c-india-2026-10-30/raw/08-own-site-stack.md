# Own D2C website stack in India (2025-2026): platforms, checkout, COD/RTO, logistics, UPI, WhatsApp/SMS, conversion, returns

Researcher: helper 08. Pass 1: 30 Oct 2026. Pass 2 (verification): 30 Oct 2026.

## Pass 2 method and status (read first)

- **Primary sources could not be opened in this session.** Every WebFetch to an official host failed with a DNS error (`getaddrinfo ENOTFOUND`): www.shopify.com (pricing), developers.facebook.com (WhatsApp pricing), www.npci.org.in (UPI statistics), www.shiprocket.in (rate card), www.delhivery.com, razorpay.com (Magic Checkout), www.gokwik.co, www.trai.gov.in. Secondary sites also failed: sociolabs.in, shipprime.live, hillteck.com, ecorpit.com. The session's network allowlist does not include these hosts. The session asked that they be allowed before retrying, so no further fetch attempts were made.
- **What worked:** WebSearch only (standard mode, 11 queries in pass 2). Results are search snippets, not full pages. Snippets were cross-checked across several vendors where possible.
- **Consequence:** Nothing in this file is "Verified in pass 2" from a primary page. Claims that several independent search results agree on are tagged **[Cross-checked, secondary]**. Anything still resting on one vendor or on the official page that could not be reached is **[Still unverified]**.
- The proxy log also shows 403 policy denials for several Indian press hosts (indianretailer.com, cxotoday.com, cbre.co.in, scconline.com, fonearena.com). Those were not retried, per the proxy guidance.

Tag key: **[Cross-checked, secondary]** = two or more search results agree, none is primary. **[Corrected]** = pass 1 figure changed (old → new shown). **[Still unverified]** = not confirmed. Ratings as in RULES.md: A official, B press, C vendor/blog.

---

## Key takeaways

1. **COD RTO is the core cost problem for an own site, but no independent India-wide figure exists.** Vendor and logistics blogs quote COD RTO between roughly 25% and 40%, with the commonest band at 25-35%. A 2026 search turned up a COD share of 45% of D2C orders (down from 55% in 2024), attributed to Growww Tech data. The source is a vendor. [C, cross-checked, secondary; see Findings 3]
2. **Prepaid RTO is quoted at 2-8%.** Sources differ: 2-3% (ShipPrime, pass 1), 4-8% (several vendors, pass 2), and one outlier putting prepaid at 20-30%. Treat it as low single digits to high single digits. [C, conflict]
3. **Shopify India Basic is about ₹1,499/month on annual billing or ₹1,994/month on monthly billing, before 18% GST.** Two separate search results agree. The official pricing page could not be opened. A third result (Socio Labs, pass 2) lists Basic at about ₹3,240/month, which conflicts. [Cross-checked, secondary; Still unverified against shopify.com]
4. **Shopify Payments is reported as not live in India, so Basic carries a 2% fee on third-party gateways.** This is a single-vendor claim, not checked against Shopify. It matters for the cost model. [C, Still unverified]
5. **Checkout tools sell uplift figures with no control group.** Razorpay's headline (40% conversion, 50% RTO reduction) is unattributed. The GoKwik Shopify listing shows a 2.5% extra charge on prepaid orders through the GoKwik gateway. Its COD fee is not confirmed: one search result gives 0.5% after a free tier, which vendor blogs state and the listing does not. [B/C; listing fee partly cross-checked]
6. **Shipping rates are indicative only, and no official rate card for Shiprocket or Delhivery is public.** Shiprocket is quoted from about ₹20 per 500g by aggregator guides and from ₹23 on a plugin page. Its own help page says the rate card is inside the logged-in dashboard (Tools → Rate Card). COD fees are quoted at ₹25-50 or 1.5-2.5% of order value, whichever is higher, in one July 2026 guide. [C; Still unverified against Shiprocket]
7. **UPI dominates digital payments, and the latest NPCI-derived figures are confirmed.** September 2026: about 24.07 bn transactions (-1.8% MoM, +23% YoY), value about ₹29.37 lakh crore (-1.5% MoM, +18% YoY), average 802 million a day. August 2026 was the record at 24.51 bn. Two search results agree. [Cross-checked, secondary; NPCI page not opened]
8. **WhatsApp marketing messages cost about ₹0.8631 each in India from 1 Jan 2026 (up from ~₹0.7846).** Several sources agree. Utility and authentication are about ₹0.115 on most sources, but one provider lists ₹0.145 and another says a 1 Oct 2026 card date. Meta's India INR billing deadline is 31 Dec 2026. Meta's own page was not opened. [Cross-checked, secondary; Still unverified against Meta]
9. **Cart-recovery templates are likely Marketing, which costs about 3-5x Utility.** No search result gave Meta policy text. Plan the budget on Marketing rates. [C, pattern; Still unverified]
10. **SMS DLT and variable pre-tagging are live compliance gates.** The TRAI direction is Press Release No. 133/2025, dated 18 Nov 2025, requiring pre-tagged variables such as URLs, app links and callback numbers. Sources disagree on the deadline: a 60-day window for existing templates versus templates created after 14 Jan 2026 needing pre-tags (a Fast2SMS claim). Check with the DLT operator. [B/C, conflict]
11. **Conversion and AOV benchmarks disagree and none is verified for India.** Global e-commerce conversion is quoted at 1.4% (Littledata, pass 1), 1.7% (IRP, Apr 2026) and about 1.8% (late 2025, pass 2). ClickPost category AOVs are ₹1,586 (new-age fashion) and ₹1,854 (traditional fashion). Neither is a D2C-wide figure. [C]
12. **COD confirmation and deposits are the most-cited RTO fixes, but the evidence is anecdote and vendor case studies.** Deposit plus OTP is claimed at 5-8% RTO, against 25-35% for unverified full COD. A COD-to-prepaid nudge within 30 minutes is claimed to convert 8-12% of COD orders. [C, anecdotal]
13. **Unicommerce's April 2026 post cites a 58% COD return rate at the festive peak.** Only the headline was seen. It may be a return rate, not RTO; the full report was not read. [C, Still unverified]
14. **Open questions:** Redseer and Unicommerce primary reports; Shiprocket, Delhivery and Shadowfax rate cards; GoKwik and Simpl COD fees; Shopify India pricing and payments; Meta's rate card; India-only AOV and conversion.

---

## Findings by sub-question

### 1. Platform choices and market share

- **Shopify India plans (2026):** Five tiers from about ₹399/month (Starter) to about ₹1,75,000/month (Plus, multi-year term), before GST. Basic: ₹1,499/month on annual billing, ₹1,994/month on monthly billing, 2% fee on third-party payment providers. Pass 2 confirmed the Basic pair across two search results. [Cross-checked, secondary; sources: https://indiapost.org/shopify-pricing-india (date not shown), https://irpr.agency/shopify-pricing-plans-india-2026 (2026 per URL), https://payglocal.in/blog/shopify-price-india-guide (date not shown)]
  - **Conflict (pass 2):** the Socio Labs guide lists Basic at roughly ₹3,240/month with about ₹2,410 on annual billing, and says INR values move with USD/INR. The search snippet said so; the page was not opened. [C; https://sociolabs.in/shopify-pricing-india-2026-plans-costs-guide/ (2026 per URL)]
  - **Promotion (pass 2):** a ₹20/month for three months offer appears in some articles. [C, Still unverified]
  - **Pass 1 conflict, still open:** older pages list Basic at ₹1,994 and Plus at ₹1,52,000 (likely pre-revision). Plus at ₹1,75,000 is not confirmed. [Still unverified]
  - **Official check:** https://www.shopify.com/in/pricing failed with a DNS error in both passes. [A source, NOT FETCHED]
- **Shopify India payments:** Pass 2 search reports that Shopify Payments is not live in India, so Basic uses a third-party gateway with a 2% fee. [Corrected: pass 1 said "not verified", pass 2 gives one vendor claim, Still unverified]
- **Platform market share in India:** Sources disagree by about 2x.
  - WooCommerce about 43%, Shopify about 38%, Wix about 3% of sites. [C; https://www.digitaldawn.in/shopify-woocommerce-custom-guide-2025/ (2025)]
  - WooCommerce 45.13%, Shopify 28.61% of stores. [C; date not shown]
  - Shopify about 20-21% of Indian e-commerce sites, Wix about 9%. [C; date not shown]
  - Treat as rough. [Still unverified]
- **Positioning:** Commentary favours Shopify for COD tooling and checkout ecosystem, and WooCommerce for cost. [C; https://www.digitaldawn.in/shopify-woocommerce-custom-guide-2025/ (2025), https://prateeksha.com/blog/shopify-vs-woocommerce-india-2026 (2026 per URL)]
- **Dukaan and Wix:** No share figure for Dukaan. Wix is framed as a website builder rather than a D2C platform. [not found; C]

### 2. Checkout tools and conversion claims

- **GoKwik (Kwik COD & Checkout Shopify app):**
  - Shopify listing (pass 2 snippet): free to install with a free trial. Paid tiers listed in USD: $9.99/month Basic and $29.99/month for merchants over 500 orders a month. Both add a 2.5% charge on prepaid orders through the GoKwik Payment Gateway. Listing text varies by locale. [B/C, search snippet; https://apps.shopify.com/kwikcheckout (date not shown). Listing not opened. Still unverified]
  - **Corrected:** pass 1 said the listing notes "a 2.5% transaction fee on prepaid payments". Pass 2 adds the USD subscription tiers and the 500-order threshold. The subscription figures are still unverified.
  - **COD fee (conflict):** third-party comparison sites say 0.5% commission after a free tier of 1,000 COD orders a month, or zero for the first three months. The official listing snippet did not show this. [C, conflict]
  - 2024 YourStory piece: no GoKwik charges for the first three months, on Basic and Shopify plans only. [B; https://yourstory.com/2024/08/shopify-spotlights-new-app-kwik-cod (2024)]
  - Scale claim: 10k+ brands; network data on 120 million shoppers (2025 interview, republished 18 Aug 2026). [C; https://www.medianews4u.com/in-2025-were-doubling-down-on-two-fronts-innovation-and-expansion-joyeeta-ghosal-gokwik/]
  - RTO: contained RTO at 25% during a pre-festive sale that saw a 21% rise in COD orders. Company claim. [C; https://cxotoday.com/media-coverage/e-commerce-enabler-gokwik-says-over-3-4th-of-pre-festive-d2c-sales-on-came-from-tier-23-cities/ (date not shown; host returned 403 via proxy)]
  - Client claims (vendor case studies): Boult cut RTO 40.21%; Attitudist saw 2.5x prepaid conversions. [C; https://www.casestudies.com/company/gokwik (date not shown)]
  - 2026 financials or audited RTO data: not found.
- **Razorpay Magic Checkout:** Headline 40% conversion growth and 50% RTO reduction, unattributed. Kalakaar case: 75% rise in order conversion, prepaid share 30% to 70%. Other case studies: Blue Tokai 5%, Root Deep 30%, Alphonso Mango 25%, Reload Casuals 57.91%. Single-page checkout: 20-40 bps conversion lift. Single-page mobile checkout gives 12-17% over multi-page (Razorpay's own benchmark). [C; https://razorpay.com/magic, https://razorpay.com/blog/category/magic-checkout/magic-checkout-case-studies, https://razorpay.com/blog/magic-checkouts-new-single-page-checkout/, https://razorpay.com/blog/high-converting-checkout-experience-guide/ (all dates not shown)]
  - Pricing: not found in pass 2 (razorpay.com failed DNS). [Still unverified]
- **Simpl:** No Simpl-specific checkout data. [not found]
- **Shiprocket Checkout:** Only the GoKwik comparison (Shiprocket blog, Aug 2026 per snippet). Pricing not found. [C; https://checkout.shiprocket.in/blog/gokwik-vs-fastrr-by-shiprocket-detailed-comparison/]
- **Pattern:** Checkout vendors cite conversion uplifts that are mostly self-reported, with no control group or baseline. [pattern]

### 3. COD share and RTO rates by tier, costs, and fixes

- **COD share of D2C orders:** 45% in 2026, down from 55% in 2024 (Growww Tech data, cited by a vendor blog in a pass 2 search; URL not captured). [C, single source, Still unverified]
  - Tier-level COD share: not found.
- **COD RTO baseline (conflicting ranges):**
  - ClickPost-cited benchmark: COD RTO 25-40%. [C; https://www.clickpost.ai/blog/top-10-best-ecommerce-shipping-companies-in-india (date not shown)]
  - ShipPrime estimate 2026: 25-30% average, up to 40% in fashion, footwear and general merchandise. [C; https://shipprime.live/resources/blogs/cod-vs-prepaid-rto-profitability (date not shown; host failed DNS in pass 2)]
  - Shipmozo: COD RTO 20-40% in high-return categories; prepaid return rate 5-10%; healthy RTO below 10-15%. [C; https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics (2026 per title)]
  - Pass 2 search: COD RTO 25-35% vs prepaid under 4-8%; COD 25-30% vs prepaid 4-8%; COD 30-40% vs prepaid 20-30%. [Cross-checked on COD band, C; conflict on prepaid]
  - Hillteck: D2C average 18-32% (2026). [C; https://hillteck.com/blog/rto-trends-2026-indian-d2c.html (2026 per URL), not reopened in pass 2]
  - Base.com category ranges: FMCG 15-22%; tier-3 and rural 38-50% for COD. [C; https://base.com/en-IN/blog/india-ecommerce-benchmarks-2026-how-brands-reduce-rto-in-india-and-hit-accuracy-sla-targets (2026 per URL)]
  - **Corrected:** pass 1 said the prepaid RTO figure was "about 2-3%" (ShipPrime only). Pass 2 shows vendors quoting 4-8% and one quoting 20-30%. The range is now 2-8%, with a conflict.
  - **Unicommerce, April 2026 post:** "58% COD return rate at festive peak", with 34% order volume growth. Only the headline was seen. This may be a return rate rather than RTO. [C; https://unicommerce.com/india-d2c-report-2026-april/ (Apr 2026); Still unverified]
  - **Independent or government RTO data:** none found. Redseer's report, pass 2 search, gave only shipment volumes (FY25 e-commerce shipments of 4.8-5.5 bn) and no RTO figure. [C, via ClickPost]
- **Time sensitivity:** Hillteck says offers sent 24+ hours after an order convert at about one-third the rate of offers sent immediately. [C; https://hillteck.com/blog/reduce-rto-ecommerce.html (2026 per URL)]
- **Fixes and claimed effects (all vendor-sourced):**
  - Partial COD deposit (e.g. ₹50): one Delhi fashion store cut RTO 35% to 12% in a month. Single anecdote. [C; https://easysellapp.com/blogs/wiki/cod-partial-payment-deposit-reduce-rto-shopify-2026 (2026 per URL)]
  - Deposit plus OTP: RTO 5-8%, vs 25-35% for unverified full COD. [C; vendor blog]
  - OTP alone: 15-20% RTO reduction claimed, no source. [C; https://www.bot.space/blog/how-to-convert-cod-orders-to-prepaid-shopify (date not shown)]
  - IVR calls: 10-15% RTO reduction claimed, no source. [C]
  - WhatsApp confirmation: RTO fell from 30-35% to 18-22% within a month, citing a 2025 Unicommerce report. Not confirmed. [C; https://blog.campaignhq.co/?p=3687 (date not shown). The Unicommerce 2025 report itself was not found.]
  - COD fee: ₹50-100 suggested to deter casual orders. One footwear brand reportedly moved to prepaid after a ₹60 charge. [C; https://www.bot.space/blog/what-is-cod-verification-ecommerce (date not shown)]
  - COD-to-prepaid nudge within 30 minutes of placement: 8-12% of COD orders converted. [C, single vendor claim, pass 2 search]
  - Warning: aggressive prepaid pushes may cut total order volume 25-40%. [C; vendor blog, date not shown]
- **Costs:** COD remittance and fee structures are not detailed. The COD fee guide quoted in pass 2 gives ₹25-50 flat or 1.5-2.5% of order value, whichever is higher (July 2026 guide). [C, Still unverified]

### 4. Logistics aggregators (rates, indicative only)

- **Official rate cards:** Shiprocket publishes its rate card only inside the logged-in dashboard (Tools → Rate Card), per Shiprocket's own support page. [B/self-reported; https://support.shiprocket.in/support/solutions/152000000171-can-i-see-all-shiprocket-rates-in-one-place- (date not shown)]. Delhivery and Shadowfax: not found. Pass 2 searches did not return rate cards. [not found]
- **Shiprocket:** From about ₹20 per 500g (2026 aggregator guide); a WordPress plugin page says from ₹23/500g. Zone categories are local, zonal, metro, ROI and special. No per-zone table found. [C; https://shipprime.live/resources/blogs/11-best-shiprocket-alternatives-in-2026-for-d2c-brands (2026 per URL); https://so.wordpress.org/plugins/?p=53660 (date not shown)]
  - **Corrected:** pass 1 gave ₹20/500g as the rate. Pass 2 confirms the "from" figure only, and the ₹23 figure is a conflict.
- **NimbusPost:** Entry rate near ₹17 per 500g (most sources); other comparisons ₹19-26 by tier, no plan fee, T+3 COD at no extra cost. [C; https://wiserreview.com/blog/metaport-alternatives/ and https://www.shiprocket.in/blog/shiprocket-vs-nimbuspost/ (dates not shown)]
- **Shadowfax:** Its 360 platform is pitched as one flat rate with no COD or RTO surcharge and D+2 payouts (vendor claim). No published 500g rate. [C; https://shadowfax.in/blogs/ecommerce-shipping-charges-india-shadowfax-360 (date not shown)]
- **Delhivery:** A pass 1 rate table listed ₹32 under an unlabelled column, so it is unusable. No reliable per-500g rate. [not found]
- **Caveat:** Quoted prices usually exclude COD fees and 18% GST, and vary by origin and zone. Shipping cost formula cited in pass 2: chargeable weight × zone rate slab + COD fee + 18% GST. [C]

### 5. UPI share and new UPI features for commerce

- **Volume and value (NPCI-derived, via secondary press):**
  - July 2026: 23.66 bn transactions; value about ₹29.88 lakh crore. [B/C; https://www.outlookmoney.com/banking/upi-transaction-value-rises-19-per-cent-to-rs-2988-lakh-crore-in-july]
  - August 2026: 24.51 bn (record), value about ₹29.8 lakh crore. [B/C; https://www.outlookbusiness.com/news/upi-transactions-near-record-level-of-298-lakh-cr-in-aug-volume-at-all-time-high-of-2451-bn; https://startuptalky.com/india-upi-transactions-august-2026-record-volume/]
  - **September 2026 (pass 2, cross-checked):** 24.07 bn transactions (-1.8% MoM, +23% YoY); value about ₹29.37 lakh crore (-1.5% MoM, +18% YoY); average 802 million a day, the first month above 800 million. [Cross-checked, B/C; https://www.outlookmoney.com/banking/upi-processes-2407-billion-transactions-worth-rs-2937-lakh-crore-in-september; https://startuptalky.com/upi-transactions-september-2026/; https://ddindia.co.in/2026/10/upi-transactions-surge-23-to-24-07-billion-in-september-npci/ (Oct 2026)]
  - **Corrected:** pass 1 gave the value as "about ₹29.9 lakh crore peak in May and July". September value is ₹29.37 lakh crore. The earlier figure stands for the peak months only.
  - App shares (August 2026): PhonePe about 45.6%, Google Pay about 32.3%, Paytm about 8.0%. Pass 2 says the latest app-wise data is August. [C; StartupTalky family; NPCI not opened]
  - October 2026 data: not yet out.
- **Share of digital payments:** 80% vs 85% of digital transactions, by volume. Still conflicting. [C]
- **UPI Autopay (recurring mandates):** Pre-debit notifications required before each debit. Limit conflict: ₹15,000 standard (Razorpay 2026 guide) vs up to ₹1 lakh without AFA for specified categories (Cashfree, citing Dec 2023 RBI circular). [C; https://razorpay.com/blog/upi-autopay-vs-card-e-mandates/ (date not shown); https://docs.zuora.com/... (date not shown)]. Verify on rbi.org.in. [Still unverified]
- **Credit on UPI:** A June 2026 RBI circular (RBI/2026-27/152) requires UPI credit lines to follow the prudential norms of the underlying loan. Primary RBI text not opened. [B/C; https://www.taxmann.com/post/blog/rbi-issues-prudential-norms-for-upi-linked-credit-facilities/ (2026); https://www.angelone.in/news/rbi-allows-pre-approved-upi-credit-access-to-small-finance-banks (Feb 2025); https://www.indianpaycalculator.in/govt-news/rbi-upi-credit-line-is-a-loan-june-2026 (June 2026)]. No 2026 product change to checkout behaviour found.

### 6. WhatsApp commerce, email and SMS

- **WhatsApp per-message pricing (Meta, per BSP and provider sources):**
  - Per-message billing from 1 July 2025 (BSP sources). [C; https://authkey.io/blogs/?p=1840 (2026 per URL)]
  - Marketing rate India: ₹0.8631 per message from 1 Jan 2026, up from ₹0.7846. Several sources agree (Montymobile, Robylon range ₹0.78-0.88). [Cross-checked, secondary; https://montymobile.com/blogs/whatsapp-business-api-pricing-in-india-inr-rates-gst-and-the-2026-currency-migration-deadline (2026 per URL); https://www.robylon.ai/blog/whatsapp-business-api-pricing-india]
  - Utility and authentication: ₹0.115 per message on most sources (ecorpit, instantdm); ₹0.145 on AiSensy, likely provider markup; utility rates fall with volume (baat.ai). [C, conflict; https://ecorpit.com/whatsapp-business-api-cost-india-d2c-2026/ ; https://instantdm.com/blog/whatsapp-business-api-pricing-2026-india-october-update ; https://m.aisensy.com/blog/whatsapp-business-pricing/]
  - **Conflict (pass 2):** instantdm says the INR card is effective 1 Oct 2026, while others say 1 Jan 2026. CampaignHQ's utility ₹0.35 per conversation looks outdated. [C, conflict]
  - All-in marketing rate with BSP markup: ~₹0.95 (MyOperator) to ₹1.09 (AiSensy). Pass 1 said markups of 10-30%. [C; https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026 ; https://m.aisensy.com/blog/whatsapp-business-pricing/]
  - Currency migration: eligible India accounts must move to INR billing by 31 Dec 2026. [Cross-checked, C; baat.ai and Montymobile snippets]
  - GST: 18% applies to provider invoices in India. [C]
  - **Meta's official pricing page:** not opened (DNS failure in both passes). [A source, NOT FETCHED; Still unverified]
- **WhatsApp for abandoned carts:** Two sources say cart-recovery is usually Marketing by default, costing roughly 3-5x Utility. [C; https://chakrahq.com/id/article/whatsapp-abandoned-cart-recovery-d2c (date not shown); https://www.go4whatsup.com/guides/whatsapp-for-ecommerce/ (2026 per title)]. Meta policy text not found. [Still unverified]
  - Open rates: vendor claims 95-98% WhatsApp vs 18-25% email. No independent measure. [C]
  - Recovery claims: 15-25% (Go4WhatsUp); 25-30% within 30 minutes (CampaignHQ); up to 27% (Edesy). One Indian D2C case: about 12% of lost carts returned. [C]
- **DLT and SMS rules:**
  - Three registrations: entity, sender header, content template. Brand name required in SMS. [C; https://msg91.com/help/dlt-registration-in-india/dlt-template-scrubbing-filtering-rules (date not shown)]
  - Promotional SMS cannot go to DND numbers without digital consent. [C; vendor help page]
  - **Variable pre-tagging (pass 2):** TRAI Press Release No. 133/2025, dated 18 Nov 2025, requires pre-tagged variables (URLs, app links, callback numbers) in commercial SMS templates. Non-compliant messages on non-compliant templates are rejected after the compliance window. [B; https://www.etvbharat.com/en/technology/trai-mandates-pre-tagging-of-variables-in-sms-content-templates-to-curb-fraud-enn25111805468 ; https://www.azbpartners.com/bank/trai-issues-direction-to-mandate-pre-tagging-of-variables-in-sms-content-templates-to-curb-their-misuse-in-commercial-communication/ (Jan 30 2026 per page)]
  - **Corrected:** pass 1 said "transition window for templates registered before 15 Jan 2026". Pass 2 shows a 60-day window to modify existing templates, and one vendor (Fast2SMS) says templates created after 14 Jan 2026 must carry pre-tagged values. The two do not match. [C, conflict; https://www.fast2sms.com/help/?p=16124]
  - **Six tag types:** one vendor says six approved tag types; another lists {#numeric#}, {#url#}, {#cbn#}. Not confirmed. [C, Still unverified]
  - Grace-period delivery: one vendor says mis-tagged messages may still deliver with warnings during the grace period. Not confirmed. [C, Still unverified]
  - **BSE advisory dated 6 Oct 2026 (pass 1):** not re-checked in pass 2. [B; https://teamleaseregtech.com/updates/article/60117/bse-advises-members-to-ensure-compliance-with-trai-directions-on-sms-c/ (2026 per snippet). Still unverified]
  - OTP template draft: comment deadline 30 Sep 2026, now closed. [B; https://teamleaseregtech.com/updates/article/59776/... (2026); not re-checked]
  - Scrubbing charge about ₹0.25 per SMS (reseller claim). [C]
  - Service Explicit to Promotional migration from March 2026: single vendor, unconfirmed. [C, Still unverified]
  - TRAI primary PDF: https://trai.gov.in/sites/default/files/2025-11/Directions_18112025_0.PDF (A, not opened; host failed DNS)

### 7. Typical own-site conversion rates and AOV in India

- **Conversion (global, Shopify and others):**
  - Littledata Shopify average 1.4%; top 20% above 3.2%; top 10% above 4.7%. [C; https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026 (2026 per URL)]
  - IRP Commerce: 1.70%, April 2026. [C]
  - Global e-commerce average about 1.8% (late 2025, pass 2 search). [C]
  - Dynamic Yield: 2.66% (date not shown). [C]
  - Definitions differ; not directly comparable.
- **India-specific conversion:** upGrowth "Conversion Rate Benchmarks for Indian Startups" (April 2026) exists, but its extracted table is garbled in both passes. [C, not usable; https://upgrowth.in/wp-content/uploads/2026/04/conversion-rate-benchmarks-for-indian-startups-slides-1.pdf]
- **AOV:**
  - ClickPost FY2026 category AOVs: new-age fashion ₹1,586; traditional fashion ₹1,854. Categories, not D2C-wide. [C; https://www.clickpost.ai/india-e-commerce-trends-report-2026 (2026)]
  - Shopify-wide about $85-95 (one source); TrueProfit $185 global, $255 desktop vs $164 mobile. [C]
  - No D2C-wide rupee AOV for India found. [not found]
- **Pattern:** Indian D2C economics are thin-margin and logistics-heavy, so AOV growth is treated as necessary. No India-wide number.

### 8. Returns and exchange tools

- **Return Prime:** Shopify returns app, 4.9 from 77 reviews. Acquired by GoKwik in September 2024 (third-party page). Listing and third-party pages differ on company base. [C; https://apps.shopify.com/return-prime (date not shown); https://www.cahoot.ai/return-prime-pros-cons/ (date not shown)]. Not re-checked on primary.
- **Shiprocket exchange feature:** Added November 2024. 2026 pricing not found. [B/C; https://www.shiprocket.in/blog/product-updates-november-2024 (Nov 2024)]
- **Other:** Shipway offers returns services in India (pin-code coverage limited). [C; https://blog.shipway.com/best-return-prime-alternatives/ (date not shown)]
- **Returnkart:** No 2026 information. [not found]

---

## Ranking / visibility mechanics

Not applicable in the marketplace sense. An own site is found through its own traffic: paid, social, WhatsApp, search. No SEO or ad-platform ranking claims were in scope. One GoKwik statement says more than three-quarters of pre-festive D2C sales came from Tier 2 and 3 cities (CXOToday, date not shown; company claim, C). Not checked against independent data.

---

## What a small new D2C seller should do / avoid (pattern, labelled as inference)

- **Do:** Launch with prepaid and COD both. A/B test a small COD deposit or OTP confirmation on your own orders. Measure confirmation rate, RTO and false cancellations together. [pattern]
- **Do:** Budget WhatsApp at Marketing rates (about ₹0.86 base plus BSP markup) until a template is approved as Utility. Migrate to INR billing before 31 Dec 2026. [pattern, from C sources]
- **Do:** Register DLT entity, headers and templates before going live with SMS. Pre-tag variables in any template with a link or phone number, and confirm the deadline with your DLT operator. [pattern; B sources]
- **Do:** Get logistics quotes for your own origin and destination pincodes from two or three aggregators, including COD fees and GST. Shiprocket quotes come from the logged-in rate card. [pattern]
- **Do:** Confirm the Shopify plan price and whether Shopify Payments is available in India before you budget. [pattern]
- **Do:** Treat checkout-tool uplift claims as hypotheses. Ask each vendor for a control group and baseline. [pattern]
- **Avoid:** Pushing prepaid so hard that total volume falls (one vendor warns of a 25-40% volume loss). [C]
- **Avoid:** Any single RTO benchmark for planning. Figures run from about 18% to 40% depending on source and category. [pattern]
- **Avoid:** Assuming a WhatsApp utility rate for cart-recovery messages until Meta confirms the category. [pattern]

---

## Open questions and conflicting claims

1. **Shopify India pricing and payments:** official page not reachable in either pass. Basic price agrees across two sources; Socio Labs conflicts (₹3,240/mo). Plus price and the ₹20 promo are unverified. Whether Shopify Payments is available in India is a single-vendor claim.
2. **Meta WhatsApp rate card:** developers.facebook.com not reachable. Marketing rate agrees across sources. Utility ₹0.115 vs ₹0.145; effective date 1 Jan vs 1 Oct 2026. Cart-recovery category unresolved.
3. **COD RTO baseline:** ranges still conflict (25-35%, 25-30%, 18-32% average, 30-40%). No government or audited source found.
4. **Prepaid RTO:** 2-3%, 4-8%, or 20-30% depending on the source. Conflict is unresolved.
5. **COD share of D2C orders:** 45% in 2026 (Growww Tech via a vendor). Single source. Tier-level data not found.
6. **GoKwik fees:** 2.5% prepaid charge on the listing (snippet) vs 0.5% COD commission on blogs. Subscription tiers are in USD on the listing.
7. **Shiprocket, Delhivery, Shadowfax rate cards:** not public. Shiprocket "from" price ₹20 vs ₹23 per 500g. Shiprocket says the card is only in the logged-in dashboard.
8. **Redseer and Unicommerce:** Redseer gave no RTO data in pass 2. Unicommerce's 58% "COD return rate" headline needs the full report to tell return from RTO.
9. **Platform share:** WooCommerce vs Shopify leadership conflicts across sources.
10. **UPI share of digital payments:** 80% vs 85% by volume. NPCI primary data not reachable. October 2026 data not yet out.
11. **UPI Autopay limit:** ₹15,000 (Razorpay) vs ₹1 lakh for specified categories (Cashfree, citing a Dec 2023 circular). Verify on rbi.org.in.
12. **TRAI pre-tagging dates:** 60-day modification window vs "after 14 Jan 2026" (Fast2SMS). Six tag types unconfirmed. Check the press release 133/2025 and the DLT operator.
13. **BSE advisory (6 Oct 2026) and OTP draft:** pass 1 only; not re-checked.
14. **Return Prime ownership and base:** GoKwik acquisition (Sept 2024) and company location conflict across listings.
15. **Conversion and AOV for India:** no verified India-wide figure. upGrowth report exists but is unreadable here.

---

## Sources

Rating: A = official (none reachable this session); B = reputable press or regulator news; C = vendors, blogs, aggregators. Dates are those visible in search output; "date not shown" means no date was shown.

**Not reachable in pass 2 (DNS failure, session allowlist):**
1. https://www.shopify.com/in/pricing - A - NOT FETCHED (DNS)
2. https://developers.facebook.com/docs/whatsapp/pricing - A - NOT FETCHED (DNS)
3. https://www.npci.org.in/what-we-do/upi/upi-ecosystem-statistics - A - NOT FETCHED (DNS)
4. https://www.shiprocket.in/shipping-rates/ - A - NOT FETCHED (DNS)
5. https://www.delhivery.com/shipping-rates/ - A - NOT FETCHED (DNS)
6. https://razorpay.com/magic/ - A/C - NOT FETCHED (DNS)
7. https://www.gokwik.co/pricing - A/C - NOT FETCHED (DNS)
8. https://www.trai.gov.in/ - A - NOT FETCHED (DNS)
9. https://sociolabs.in/shopify-pricing-india-2026-plans-costs-guide/ - C - NOT FETCHED (DNS)
10. https://shipprime.live/resources/blogs/cod-vs-prepaid-rto-profitability - C - NOT FETCHED (DNS)
11. https://hillteck.com/blog/rto-trends-2026-indian-d2c.html - C - NOT FETCHED (DNS)
12. https://ecorpit.com/whatsapp-business-api-cost-india-d2c-2026/ - C - NOT FETCHED (DNS)
13. https://cxotoday.com/media-coverage/e-commerce-enabler-gokwik-says-over-3-4th-of-pre-festive-d2c-sales-on-came-from-tier-23-cities/ (GoKwik pre-festive; proxy returned 403 on this host in pass 2, so the item was cited from pass 1 only) - B/C - date not shown

**Opened in pass 1 or cited from search snippets in pass 2 (not opened in full):**
14. https://indiapost.org/shopify-pricing-india - C - date not shown
15. https://irpr.agency/shopify-pricing-plans-india-2026 - C - 2026 per URL
16. https://payglocal.in/blog/shopify-price-india-guide - C - date not shown
17. https://www.zoko.io/post/shopify-india-pricing-explained - C - date not shown
18. https://www.digitaldawn.in/shopify-woocommerce-custom-guide-2025/ - C - 2025
19. https://prateeksha.com/blog/shopify-vs-woocommerce-india-2026 - C - 2026 per URL
20. https://apps.shopify.com/kwikcheckout - B/C - listing snippet, pass 2; date not shown
21. https://www.medianews4u.com/in-2025-were-doubling-down-on-two-fronts-innovation-and-expansion-joyeeta-ghosal-gokwik/ - C - interview 2025, page 18 Aug 2026
22. https://cxotoday.com/media-coverage/e-commerce-enabler-gokwik-says-over-3-4th-of-pre-festive-d2c-sales-on-came-from-tier-23-cities/ - B/C - date not shown
23. https://www.casestudies.com/company/gokwik - C - date not shown
24. https://checkout.shiprocket.in/blog/gokwik-vs-fastrr-by-shiprocket-detailed-comparison/ - C - Aug 2026 per snippet
25. https://razorpay.com/blog/category/magic-checkout/magic-checkout-case-studies - C - date not shown
26. https://razorpay.com/blog/upi-autopay-vs-card-e-mandates/ - C - date not shown
27. https://www.clickpost.ai/blog/top-10-best-ecommerce-shipping-companies-in-india - C - date not shown
28. https://www.clickpost.ai/india-e-commerce-trends-report-2026 - C - 2026
29. https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics - C - 2026 per title
30. https://hillteck.com/blog/reduce-rto-ecommerce.html - C - 2026 per URL
31. https://easysellapp.com/blogs/wiki/cod-partial-payment-deposit-reduce-rto-shopify-2026 - C - 2026 per URL
32. https://www.bot.space/blog/how-to-convert-cod-orders-to-prepaid-shopify - C - date not shown
33. https://www.bot.space/blog/what-is-cod-verification-ecommerce - C - date not shown
34. https://blog.campaignhq.co/?p=3687 - C - date not shown
35. https://base.com/en-IN/blog/india-ecommerce-benchmarks-2026-how-brands-reduce-rto-in-india-and-hit-accuracy-sla-targets - C - 2026 per URL
36. https://unicommerce.com/india-d2c-report-2026-april/ - C - Apr 2026 (headline only)
37. https://www.shiprocket.in/blog/shiprocket-vs-nimbuspost/ - C - date not shown
38. https://wiserreview.com/blog/metaport-alternatives/ - C - 2026 per title
39. https://so.wordpress.org/plugins/?p=53660 - C - date not shown
40. https://support.shiprocket.in/support/solutions/152000000171-can-i-see-all-shiprocket-rates-in-one-place- - B (company help page) - date not shown
41. https://shadowfax.in/blogs/ecommerce-shipping-charges-india-shadowfax-360 - C - date not shown
42. https://www.outlookmoney.com/banking/upi-processes-2407-billion-transactions-worth-rs-2937-lakh-crore-in-september - B - Oct 2026 (NPCI-derived)
43. https://startuptalky.com/upi-transactions-september-2026/ - B/C - Oct 2026
44. https://ddindia.co.in/2026/10/upi-transactions-surge-23-to-24-07-billion-in-september-npci/ - B/C - Oct 2026
45. https://www.outlookmoney.com/banking/upi-transaction-value-rises-19-per-cent-to-rs-2988-lakh-crore-in-july - B/C - Jul 2026
46. https://www.outlookbusiness.com/news/upi-transactions-near-record-level-of-298-lakh-cr-in-aug-volume-at-all-time-high-of-2451-bn - B/C - Aug 2026
47. https://startuptalky.com/india-upi-transactions-august-2026-record-volume/ - B/C - Aug 2026
48. https://authkey.io/blogs/?p=1840 - C - 2026 per URL
49. https://montymobile.com/blogs/whatsapp-business-api-pricing-in-india-inr-rates-gst-and-the-2026-currency-migration-deadline - C - 2026 per URL
50. https://www.robylon.ai/blog/whatsapp-business-api-pricing-india - C - date not shown
51. https://instantdm.com/blog/whatsapp-business-api-pricing-2026-india-october-update - C - date not shown (lists 1 Oct 2026 card)
52. https://m.aisensy.com/blog/whatsapp-business-pricing/ - C - 2026 per URL
53. https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026 - C - 2026 per URL
54. https://baat.ai/blog/whatsapp-api-pricing-india - C - date not shown
55. https://chakrahq.com/id/article/whatsapp-abandoned-cart-recovery-d2c - C - date not shown
56. https://www.go4whatsup.com/guides/whatsapp-for-ecommerce/ - C - 2026 per title
57. https://msg91.com/help/dlt-registration-in-india/dlt-template-scrubbing-filtering-rules - C - date not shown
58. https://www.etvbharat.com/en/technology/trai-mandates-pre-tagging-of-variables-in-sms-content-templates-to-curb-fraud-enn25111805468 - B - Nov 2025 (press coverage of TRAI direction)
59. https://www.azbpartners.com/bank/trai-issues-direction-to-mandate-pre-tagging-of-variables-in-sms-content-templates-to-curb-their-misuse-in-commercial-communication/ - B - Jan 30 2026 per page
60. https://www.fast2sms.com/help/?p=16124 - C - 2026 (contradicts B on date)
61. https://teamleaseregtech.com/updates/article/60117/bse-advises-members-to-ensure-compliance-with-trai-directions-on-sms-c/ - B - 6 Oct 2026 per snippet (pass 1 only)
62. https://teamleaseregtech.com/updates/article/59776/bse-clearing-ltd-issued-a-draft-trai-direction-on-minimum-information- - B - 2026 (pass 1 only)
63. https://trai.gov.in/sites/default/files/2025-11/Directions_18112025_0.PDF - A - 18 Nov 2025 per filename; NOT OPENED
64. https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026 - C - 2026 per URL
65. https://upgrowth.in/wp-content/uploads/2026/04/conversion-rate-benchmarks-for-indian-startups-slides-1.pdf - C - Apr 2026; table unreadable
66. https://videowise.com/conversion-optimization/scaling-average-order-value-india-a-revenue-guide-for-shopify-brands - C - date not shown
67. https://trueprofit.io/blog/shopify-benchmarks - C - date not shown
68. https://www.cahoot.ai/return-prime-pros-cons/ - C - date not shown
69. https://apps.shopify.com/return-prime - C - date not shown
70. https://www.shiprocket.in/blog/product-updates-november-2024 - B/C - Nov 2024
71. https://blog.shipway.com/best-return-prime-alternatives/ - C - date not shown
72. https://www.taxmann.com/post/blog/rbi-issues-prudential-norms-for-upi-linked-credit-facilities/ - B/C - 2026 per URL
73. https://www.angelone.in/news/rbi-allows-pre-approved-upi-credit-access-to-small-finance-banks - B/C - Feb 2025
74. https://www.indianpaycalculator.in/govt-news/rbi-upi-credit-line-is-a-loan-june-2026 - C - June 2026
75. https://yourstory.com/2024/08/shopify-spotlights-new-app-kwik-cod - B - 2024
