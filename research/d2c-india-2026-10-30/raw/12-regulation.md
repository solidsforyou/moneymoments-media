# 12 - Regulation: rules a D2C brand selling online in India must follow (as of 30 Oct 2026)

## Pass 2 status (read first)

- Pass 1 was built from search snippets. Pass 2 (this rewrite) re-checked the main claims through WebSearch, plus WebFetch where a host resolved.
- WebFetch fails DNS in this session for government and most official hosts. Per the coordinator's note in RULES.md, pass 2 switched to curl via Bash for primary pages.
- **Read from the primary source via curl in pass 2:** BIS gazette PDFs S.O. 3037(E) and S.O. 3038(E), dated 12 June 2026 (bis.gov.in, reachable); ASCI press release PDF of 28 April 2025 (ascionline.in, reachable).
- **Still unreachable via curl (000 or DNS fail):** consumeraffairs.nic.in, pib.gov.in, egazette.gov.in, doca.gov.in, dpiit.gov.in, cbic-gst.gov.in, ey.com. The e-commerce G.S.R. 789(E), Legal Metrology G.S.R. 128(E), FEMA S.O. 4870(E) and the DPDP Rules gazette text were therefore NOT read. A meity.gov.in guessed PDF link also failed; the meity homepage has no DPDP link. The ascionline.in guidelines page returned 404 for the URL tried.
- Tags used below: "Verified in pass 2 (gazette)" = read from the official gazette PDF. "Verified in pass 2 (primary press release)" = read from the official release. "Confirmed (secondary, 2+ agree)" = not read from primary, but two or more independent secondary sources agree. "Single source" = one secondary source. "Unresolved" = conflicting.
- Source ratings follow RULES.md. A = official, B = reputable press or filings, C = law-firm explainers, blogs, aggregators. Law-firm explainers are rated C even when they are good, because they are summaries.

## Key takeaways

1. **Consumer Protection (E-Commerce) Amendment Rules, 2026.** Notified 9 Sept 2026 as G.S.R. 789(E) (Gazette of India, Extraordinary, Part II, Sec 3(i)), under s.101(2)(zg) of the Consumer Protection Act 2019. Takes effect 1 Jan 2027. Confirmed (secondary, 2+ agree: PwC citation, Corpseed, Manorama 11 Sept 2026, digital policy trackers). Content verified only in part: grievance officer must acknowledge a complaint within 48 hours and resolve within one month; platforms must show legal identity and grievance-officer details; platforms must join the National Consumer Helpline convergence. Rule 5 changes not found. [C, search summaries]
   - Correction: pass 1 said "contents not verified, rule numbers unknown". Now dated and numbered (G.S.R. 789(E)), effective date confirmed as 1 Jan 2027.
2. **Dark patterns are enforced now, with small fines.** CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 (notified 30 Nov 2023) list 13 practices. 2026 penalty orders found: McAfee Rs 1 lakh (20 May 2026, subscription renewal screen), PhysicsWallah Rs 5 lakh (1 June 2026; also ordered to remove dark patterns and file a compliance report in 15 days), McAfee Rs 1 lakh again (a second order, date unclear), SpiceJet Rs 1 lakh (reported July 2026, membership renewal, "Trick Question" and "Interface Interference"). Zepto was fined Rs 7 lakh earlier. A roundup headline lists nine platforms fined, including IndiGo, Zepto and BookMyShow (date not confirmed). Orders cite Rule 4(9) of the E-Commerce Rules 2020 (explicit affirmative consumer action). [Single source per order, B/C: search summaries of medianama, spicyip, Punjab Kesari, Outlook Business, newsonair; primary orders not read]
3. **CCPA advisory, 5 June 2025.** Under s.18(1) of the CPA 2019, e-commerce platforms were told to self-audit interfaces for dark patterns within three months and eliminate them. Whether a self-declaration is mandatory or voluntary is still unresolved. [B, storyboard18 2025; C, indialaw, FoxMandal]
4. **Enforcement claim not re-confirmed.** Pass 1's "notices to 11 platforms and a joint working group" is still single-source (storyboard18) and was not found in pass 2 search results. Treat as unconfirmed. [C, single source]
5. **Fake reviews: IS 19000:2022 is still voluntary as far as found.** Effective 25 Nov 2022 (BIS, Dept of Consumer Affairs). Covers platforms and sellers who collect reviews from their own customers. Government said it may make it mandatory if fake reviews persist. Commentary from 2025-2026 still calls it voluntary. No mandatory notification found. [B, Business Today 13 Dec 2022; Outlook Business; 2025-26 commentary, C]
6. **Legal Metrology country-of-origin filter for imported goods.** Legal Metrology (Packaged Commodities) Amendment Rules, 2026: G.S.R. 128(E), dated 13 Feb 2026. Inserts sub-rule **6(10A)** (not 6(10)) into Rule 6 of the 2011 Rules. E-commerce entities selling imported products must offer a searchable and sortable country-of-origin filter. In force 1 July 2026 (Digital Policy Alert). Confirmed (secondary, 2+ agree on the rule and 13 Feb date; the 1 July 2026 effective date is from one tracker). [C, SCC Online 21 Feb 2026; Digital Policy Alert; Mondaq]
   - Correction: pass 1 said rule 6(10) or 6(10A) and effective 1 Feb 2026 or 1 July 2026. Now: 6(10A), dated 13 Feb 2026, effective 1 July 2026. The "1 Feb 2026" date was wrong.
7. **Legal Metrology Second Amendment Rules, 2026: unresolved.** One source (TeamLease) says issued 27 April 2026 and substitutes sub-rule 6(10A), with effect from 1 July 2027. Cliniexperts gives the same 2027 date. The "Second Amendment Rules 2025, 2 Dec 2025, changing Rule 26(a)" claim from pass 1 was NOT re-found in pass 2. Treat the 2025 item as unverified. [C, single-to-two sources, conflicting]
8. **Unit sale price / MRP / net quantity rules: no 2025-26 change found.** Base text remains the Legal Metrology (Packaged Commodities) Rules 2011, plus the 2023 exemption for combination/multi-piece packs from unit-price declaration. [C, TeamLease 2023]
9. **QCOs for footwear: the 2024 orders are in force, and a June 2026 amendment extended the deadline. Verified in pass 2 (gazette).** On 12 June 2026, DPIIT issued S.O. 3037(E) (rubber and polymeric footwear) and S.O. 3038(E) (leather and other materials footwear), amending the 2024 QCOs (principal orders S.O. 1422(E) and S.O. 1421(E), 15 March 2024). Clause 2 proviso changed from "31st July 2026" to "31st July 2027". In force on publication in the Gazette. Adds an R&D/non-commercial import exemption: up to 4,500 pairs a year, not to be sold commercially, marked "NOT FOR SALE", disposed of as scrap, with year-wise records. The 2020 footwear QCO was rescinded in 2022 (the "rescinded" headline). [B/A: BIS gazette PDFs, bis.gov.in, 12 June 2026]
   - Correction: the 4,500-pair cap was "unverified" in pass 1 and in the Agile Regulatory blog. It is now verified in the gazette.
   - Correction: "Footwear QCO 2020 rescinded, status conflicting" becomes "2020 order rescinded 2022; 2024 orders in force; amended 12 June 2026, deadline 31 July 2027".
10. **Textile QCOs: a lot has changed, and the apparel picture is still open.**
   - 12 Nov 2025: 14 product QCOs withdrawn (polyester and petrochemical inputs). [B, The Week 14 Nov 2025; not re-read in pass 2]
   - 18 Nov 2025: VSF QCO dropped. [B, Business Today 18 Nov 2025]
   - Cotton Bales QCO 2023: conflicting. One source says rescinded by S.O. 2956(E) (June 2026). Another says the amended rule takes effect 27 Aug 2026. Unresolved.
   - Gujarat HC, 4 May 2026: stayed removal of QCOs on FDY and POY yarn. [C, textileexcellence]
   - Labelling and marking QCO covering textiles, apparel and made-ups: one source gives a draft dated 16 July 2026 with BIS Act 2016 penalties. Final notification not confirmed. This is the one to check for apparel sellers. [C, single source]
   - Draft QCO for dyed knitted/crochet fabric from synthetic fibres (WTO notification Oct 2024): not confirmed as final. [C]
11. **GST TCS under s.52 CGST Act: 0.5%, no change found.** 0.5% of net value of taxable supplies (0.25% CGST + 0.25% SGST intra-state, or 0.5% IGST inter-state) since 10 July 2024 (Notification 15/2024-CT, after the 53rd GST Council, 22 June 2024). Operator files GSTR-8 monthly, due the 10th of the next month. Mid-2026 guides still show 0.5%. One clevercoins page still says 1% (stale). [Confirmed (secondary, 2+ agree); CBIC notification not read]
12. **GST registration for goods sellers on platforms (s.24(ix)).** Registration is compulsory regardless of turnover for sellers making supplies through e-commerce operators that collect TCS. The 2023 intra-state exemption (Notification 34/2023-CT) covers only purely intra-state sales; it lapses for inter-state shipping. Rule 14A (optional simplified registration, effective 1 Nov 2025 per Notification 18/2025) is a separate route. One source reports a 57th GST Council (8 Oct 2026) recommendation for a Rule 14B for small e-commerce sellers. Not confirmed as law. [C, multiple law-firm summaries; intra-state exemption: 2+ agree; Rule 14B: Single source]
13. **DPDP Rules 2025: dates the same, shortening not notified.** DPDP Rules notified 13 Nov 2025 (14 Nov in some sources). Consent-manager rules (Rule 4) apply about mid-Nov 2026. Substantive duties (Rules 3, 5-16) apply about 13 May 2027. The I&B/IT minister has said the 18-month timeline will be shortened, and industry talks were reported. No notification shortening it was found. Mid-2026 sources still give May 2027. [B/C, Business Today 19 Nov 2025 (pass 1); Storyboard18 and Exchange4media (talks/minister, 2026); LKS; search summaries]
14. **ASCI: April 2025 update is the last confirmed change. A May 2026 AI-labelling draft is in consultation.** Verified in pass 2 (primary press release, 28 April 2025): ASCI updated Addendum 2 of the Influencer Guidelines for health and finance influencers. Influencers need declared qualifications only where they give technical or expert advice, not for generic promotions or public-service messages. This is a qualifications rule, not a disclosure-timing rule. A May 2026 draft on AI-generated advertising content: virtual influencers are high-risk; proposed labels such as "Audio/Video created using AI" or "Audio/Video enhanced using AI"; consultation closed 13 June 2026. Final version not confirmed. The 2026 claims from SansaLegal (verbal disclosure in the first 10 seconds, NAMS monitoring, prominence rules) are NOT found in other coverage. Treat as unverified. [B, search summaries of Mondaq and Storyboard18 on the draft; C for the SansaLegal claims]
15. **FDI Press Note 3 (2026 Series), dated 23 July 2026.** Adds para 5.2.15.2.5 to the Consolidated FDI Policy. Allows FDI-backed e-commerce entities to run inventory-based models only for exporting goods made or produced in India. Domestic B2C inventory-model FDI is still barred. Marketplace model remains automatic-route. Effect depends on a FEMA notification. Several sources cite the FEMA (NDI) Fourth Amendment Rules, 2026, S.O. 4870(E), dated 2 Sept 2026. Pass 1's "conflicting, pending FEMA" is now largely resolved to "notified 2 Sept 2026 (one source-cited citation, not verified in the gazette)". [Confirmed (secondary, 2+ agree on press note content and 23 July date); FEMA citation: Single source]
16. **CCI antitrust case v Amazon and Flipkart: date correction, and still unresolved.** Pass 1 said the CCI asked the SC in late 2025 to hear 23 petitions. Correction: the Supreme Court transferred the petitions to the Karnataka High Court on **6 January 2025** (Oka and Bhuyan JJ.). It directed that related pending HC petitions be heard together by a single Karnataka HC judge, preferably at the Bengaluru principal bench. The Karnataka HC had earlier stayed CCI proceedings. No 2026 hearing or ruling was found. [B/C, LiveLaw, Bar & Bench, Outlook Business, Inc42 (search summaries; LiveLaw and Inc42 headline dates support 6 Jan 2025)]
   - Correction: the 2021 SC refusal to stop the CCI inquiry and the 27 Sept 2024 Karnataka HC stay are not re-verified in pass 2 but are consistent with the transfer story. Keep as "per one source".
17. **Export hubs (DEH, ECEH).** DEH: 770+ districts (Jan 2026 figure); 249 of 590 district export plans formally adopted (Mar 2026). ECEH under FTP 2023 Chapter 9. Amazon-DGFT MoU extended Aug 2025. Not re-checked in pass 2 (PIB unreachable). [C; B for Amazon release]

## Findings by sub-question

### 1. Consumer Protection (E-Commerce) Rules 2020 and 2026 amendment
- Amendment notified 9 Sept 2026 as G.S.R. 789(E), under s.101(2)(zg) CPA 2019. Effective 1 Jan 2027. Confirmed (secondary, 2+ agree). [C, PwC citation via search summary, Corpseed, Manorama Yearbook 11 Sept 2026: https://www.manoramayearbook.in/current-affairs/india/2026/09/11/govt-amends-e-commerce-rules.html ; https://www.pwc.in/research-insights/news_alert/regulatory-insights/central_government_amends_existing_regulatory_framework_to_further_strengthen_ecommerce_consumer_protection.html (not reachable)]
- One outlier (Chronicle India) gives 10 Sept 2026. Most sources say notified 9 Sept, which probably matches the gazette date. Gazette date not checked.
- Grievance officer: acknowledge within 48 hours; provide a copy of the recorded complaint; redress within one month. Platform to show legal identity and grievance officer details. Platforms to join National Consumer Helpline convergence. [Single source each, C; Rule 3/4 numbering unverified]
- Rule 5 changes: not found.
- 2021 draft items (cross-selling, fall-back liability, flash-sale definitions, nodal officer): not confirmed as in final text. [C, older, flagged possibly outdated]
- Gazette text not read. egazette.gov.in unreachable via curl in pass 2. Action: pull G.S.R. 789(E) once that host is allowed.

### 2. CCPA dark patterns (2023 Guidelines, 2025-2026 enforcement)
- 2023 Guidelines notified 30 Nov 2023; 13 practices as unfair trade practices. [B, storyboard18 summary, June 2025; B, search summary of 2026 coverage]
- 5 June 2025 advisory under s.18(1) CPA 2019: self-audit within three months; eliminate dark patterns. Self-declaration status unresolved. [B: https://www.storyboard18.com/digital/ccpa-warns-e-comm-firms-over-dark-patterns-self-audit-within-3-months-69249.htm (June 2025); C: https://www.indialaw.in/blog/civil/ccpas-dark-patterns-mandates-self-audit/ ; C: https://foxmandal.in/news/dark-patterns-back-in-spotlight-as-new-advisory-calls-for-self-audits/]
- 2026 penalty orders (single source per order, B/C):
  - McAfee Rs 1 lakh, 20 May 2026, subscription renewal screen.
  - PhysicsWallah Rs 5 lakh, 1 June 2026. Orders: stop all dark patterns across platform, website, apps; pay penalty; compliance report in 15 days.
  - McAfee Rs 1 lakh, second order, about three weeks later. Date unconfirmed.
  - SpiceJet Rs 1 lakh, membership renewal, July 2026 reporting. Cited "Trick Question" and "Interface Interference".
  - Zepto Rs 7 lakh (earlier, date not in snippet).
  - Roundup: nine platforms fined including IndiGo, Zepto, BookMyShow (date unconfirmed). IndiGo reportedly corrected wording on notice and got no penalty. [C/B search summaries: medianama June 2026, spicyip July 2026, Punjab Kesari, Angel One, Outlook Business, News On Air 3 June 2026]
- One report says 2026 amendments add annual dark-pattern audits for e-commerce platforms. Single source, unverified. Do not rely on it.
- Criticism that remedies are weak: [C, internetfreedom.in, date not shown]
- Note: "CCPA" here is the Central Consumer Protection Authority, not California's privacy law.

### 3. Fake review rules (IS 19000:2022)
- Effective 25 Nov 2022. Scope covers platforms that publish reviews, and sellers that collect reviews from their own customers. [B, Business Today 13 Dec 2022; C, J.Sagar; B, Outlook Business (search summary)]
- Status: voluntary; government may make it mandatory if fake reviews persist. BIS conformity assessment for review-hosting websites planned. [B/C; 2025-26 commentary still says voluntary]
- Not found: mandatory notification as of 30 Oct 2026. Standard text not read.

### 4. Legal Metrology (Packaged Commodities) for online listings
- Amendment Rules 2026: G.S.R. 128(E), 13 Feb 2026. Inserts Rule 6(10A). Searchable, sortable country-of-origin filter for imported products sold by e-commerce entities. Effective 1 July 2026. [C: https://www.scconline.com/blog/post/2026/02/21/legal-metrology-packaged-commodities-amendment-rules-2026-explained/ ; C: https://digitalpolicyalert.org/change/18569-legal-metrology-packaged-commodities-amendment-rules-2026 ; C: https://www.mondaq.com/india/commoditiesderivativesstock-exchanges/1749842/regulatory-update-%7c-legal-metrology-packaged-commodities-amendment-rules-2026]
- Second Amendment Rules 2026 (27 Apr 2026 per TeamLease): substitutes 6(10A), effective 1 July 2027. Conflicts with the 1 July 2026 date. Unresolved. [C: https://teamleaseregtech.com/updates/article/55254/legal-metrology-packaged-commodities-second-amendment-rules-2026/ ; C: https://cliniexperts.com/regulatory-update/lm-pc-second-amendment-rules-2026/]
- "Second Amendment Rules 2025 (2 Dec 2025, Rule 26(a))" from pass 1: not re-found. Unverified.
- Unit sale price: 2023 exemption for combination/group/multi-piece packs. No 2025-26 unit-price change found. [C, TeamLease 2023]
- MRP, net quantity, manufacturer details: no change found in 2025-26 search results. Base text 2011 Rules.

### 5. BIS / QCO
- 12 Nov 2025: 14 QCOs withdrawn (polyester and petrochemical inputs). [B, The Week 14 Nov 2025]
- 18 Nov 2025: VSF QCO dropped. [B, Business Today 18 Nov 2025]
- Committee (Gauba) recommended reconsidering QCOs on plastics, polymers, base metals, steel, electronics, footwear and intermediates. [C, Swarajya, late 2025]
- Footwear: **Verified in pass 2 (gazette).** 2020 orders rescinded in 2022 (Aleph India). 2024 orders in force. Amended 12 June 2026 (S.O. 3037(E) rubber/polymeric; S.O. 3038(E) leather). Deadline 31 July 2027 (from 31 July 2026). R&D/non-commercial imports exempt up to 4,500 pairs a year, with conditions (verified in gazette). [A: https://www.bis.gov.in/wp-content/uploads/2026/06/Footwear-made-from-All-Rubber-and-all-Polymeric-Material-and-its-Components-Quality-Control-Amendment-Order-2026.pdf ; https://www.bis.gov.in/wp-content/uploads/2026/06/Footwear-made-from-Leather-and-other-Material-Quality-Control-Amendment-Order-2026.pdf] [C: https://www.tribuneindia.com/news/business/footwear-industry-gets-relief-as-centre-extends-quality-control-order-deadline-to-july-2027/ ; C: https://www.taxtmi.com/news?id=73734 ; C: https://apparelresources.com/business-news/policy/centre-extends-footwear-qco-deadline-one-year-allows-limited-imports-rd ; C: https://www.agileregulatory.com/latest-updates/footwear-qco-amendment-2026-msme-deadline-extended-and-r-d-import-relief-introduced ; C: https://bis.alephindia.in/latest-update/quality-control-orders-for-leather-and-rubber-foot/294]
- Textile / MMF: Gujarat HC 4 May 2026 stayed removal of FDY/POY QCOs (notice returnable 3 July 2026). [C: https://textileexcellence.com/single-news/6936/gujarat-high-court-stays-removal-of-quality-control-orders-on-fdy-and-poy]
- Cotton Bales QCO 2023: conflicting (rescinded June 2026 per one source; amended rule effective 27 Aug 2026 per another). Unresolved. [C: https://www.agileregulatory.com/latest-updates/government-rescinds-cotton-bales-quality-control-order-2023-what-this-means-for-the-textile-industry ; C: https://www.corpseed.com/law-update/bis-updates-cotton-bales-qco-for-2026]
- Labelling and marking QCO for textiles, apparel and made-ups: draft dated 16 July 2026 per one source; final not confirmed. [C, single source]
- Dyed knitted/crochet synthetic-fabric QCO: WTO notification Oct 2024 (draft). Final not confirmed. [C]
- Finished apparel QCO in force: not confirmed. The labelling draft above is the nearest item. Still open.

### 6. GST for e-commerce sellers
- TCS s.52: 0.5% since 10 July 2024 (Notification 15/2024-CT). No 2026 change found. [Confirmed (secondary, 2+ agree): https://www.taxaj.com/learn/gst-on-e-commerce-operators-tcs-under-section-52-step-by-step-guide/ ; search summaries of 2026 guides (taxgarden, clevercoins—stale 1%)]
- GSTR-8 monthly, due 10th of following month. [C, search summary]
- Registration for goods sellers via e-commerce operators: s.24(ix), regardless of turnover. 2023 intra-state exemption (Notification 34/2023-CT) for purely intra-state sales only. Confirmed by 2+ summaries. [C: https://www.gonukkad.com/blog/gst-requirements-for-marketplace-seller-india ; https://legaldev.in/blog/gst-registration-for-ecommerce-sellers ; https://www.compliancecalendar.in/learn/gst-registration-for-e-commerce-sellers]
- Rule 14A (optional simplified registration, effective 1 Nov 2025, Notification 18/2025): scope described differently by two sources. C.
- Proposed Rule 14B for small cross-state e-commerce sellers (57th GST Council, 8 Oct 2026): single source, not confirmed as law. [C: https://www.taxscan.in/gst/gst-registration-for-e-commerce-sellers-know-the-changes-proposed-at-the-57th-gst-council-meeting — listed; date not confirmed]

### 7. DPDP Act 2023 and DPDP Rules 2025
- Notified 13 Nov 2025 (14 Nov in some sources). [B: https://www.businesstoday.in/amp/tech-today/news/story/final-dpdp-rules-2025-notified-global-tech-platforms-to-face-stricter-obligations-higher-penalties-502827-2025-11-19 (19 Nov 2025); B: EY alert Nov 2025 (not reachable in pass 2)]
- Consent-manager registration (Rule 4): about mid-Nov 2026. [C, search summary]
- Substantive duties (Rules 3, 5-16): about 13 May 2027. Many organisations use 13 May 2027 as the working deadline. [C: https://www.lkslaw.com/insights/articles/dpdp-act-and-rules-a-ticking-compliance-timeline ; C: https://uniqus.com/digital-personal-data-protection-act-timelines/ (pass 1)]
- Shortening: minister reported as saying the 18-month timeline will be shortened; industry talks reported. No notification found. [B: https://www.storyboard18.com/amp/how-it-works/govt-to-shorten-dpdp-rules-18-month-compliance-timeline-ib-minister-ashwini-vaishnaw-84323.htm ; B: https://www.exchange4media.com/digital-news/govt-in-talks-with-industry-to-shorten-dpdp-act-compliance-deadlines-149420.html]

### 8. ASCI influencer guidelines
- April 2025 update, Addendum 2 (health and finance influencers): **Verified in pass 2 (primary press release, dated 28 April 2025).** Qualifications required only where technical information or advice is given; not needed for generic or public-service promotions. [A: https://www.ascionline.in/wp-content/uploads/2025/04/Press-Release_Influencer-Guidelines-Update.pdf (28 Apr 2025, read via curl)]
- May 2026 draft AI-labelling guidelines for advertising: virtual influencers are high-risk, and an ad in that category violates the Code even with an AI label. Proposed labels e.g. "Audio/Video created using AI" or "enhanced using AI". Consultation to 13 June 2026. Not confirmed as final. [B, Mondaq "AI in advertising: ASCI's new draft disclosure guidelines": https://www.mondaq.com/india/advertising-marketing-branding/1790884/ai-in-advertising-ascis-new-draft-disclosure-guidelines ; B, Storyboard18 (search summary)]
- 2021 rule still applies: virtual-influencer creators must disclose that the audience is not interacting with a real human. [C, search summary]
- SansaLegal 2026 claims (verbal disclosure in first 10 seconds; NAMS monitoring; prominence and persistence): not found in other coverage. Unverified. [C: https://www.sansalegal.com/post/asci-influencer-advertising-guidelines-2026-disclosure-rules-for-paid-content-and-ai-influencers]
- Disclosure must not be buried in hashtags or links. [C, legal analysis, pass 1]

### 9. FDI rules for marketplaces and the inventory model
- Baseline: automatic-route FDI in marketplace model; inventory model barred for FDI. [C/B]
- Press Note 3 (2026 Series), issued 23 July 2026 by DPIIT. Adds para 5.2.15.2.5 to the Consolidated FDI Policy. Inventory model allowed for FDI-backed e-commerce only for exporting goods made or produced in India. Exempts export transactions from B2C and inventory restrictions. Domestic inventory model unchanged. [Confirmed (secondary, 2+ agree): EY alert (listed; not reachable): https://www.ey.com/en_in/technical/alerts-hub/2026/09/dpiit-permits-foreign-investment-in-export-oriented ; https://www.indialaw.in/blog/regulatory/press-note-3-2026-fdi-e-commerce-exports-india/ ; https://www.mondaq.com/india/international-trade-investment/1823682/press-note-3-2026-series-the-regulatory-shift-enabling-fdi-backed-export-e-commerce-in-india ; https://www.india-briefing.com/news/india-fdi-inventory-based-e-commerce-exports-rule-change-46324.html/]
- Legal effect: needs a FEMA notification. Cited as the FEMA (NDI) Fourth Amendment Rules, 2026, S.O. 4870(E), dated 2 Sept 2026. Single source for the citation. Not verified in the gazette. Treat as "probably in force from 2 Sept 2026, verify". [Single source; C]
- DGFT framework from August 2026 reportedly in force, with registration open. [C, single source]

### 10. CCI antitrust probe on Amazon / Flipkart
- SC refused to halt the CCI preliminary inquiry (Aug 2021). [B, LiveLaw; pass 1]
- Karnataka HC interim stay of CCI proceedings (27 Sept 2024 per one source). [B/C, Outlook Business (listed; not reachable)]
- SC transferred all related petitions to the Karnataka HC on **6 Jan 2025** (Oka and Bhuyan JJ.), to be heard together by one single judge, preferably at the Bengaluru principal bench. Earlier (13 Dec 2024) the bench had refused a division-bench transfer and stayed HC proceedings in the meantime; reports differ on this. [B: LiveLaw (search summary): https://www.livelaw.in/amp/top-stories/supreme-court-indicates-transfer-of-amazon-flipkart-sellers-petitions-against-cci-probe-to-karnataka-hc-stays-hc-proceedings-until-jan-6-278517 ; B: Bar & Bench: https://www.barandbench.com/news/litigation/supreme-court-transfers-amazon-flipkart-cases-karnataka-high-court-cci-plea ; B: Inc42: https://inc42.com/?p=493665]
- Pass 1's "CCI asked the SC in late 2025 to hear 23 petitions" was wrong on date. The CCI's application was filed 3 Dec (2024). The transfer order was 6 Jan 2025. The Pakistan Today page dated Jan 2026 is a stale page, not a new 2026 filing.
- 2026 status: no hearing or ruling found. Unresolved.

### 11. E-commerce export hubs
- DEH: 770+ districts (Jan 2026); 249 of 590 district export plans adopted (Mar 2026). [C, not re-checked in pass 2]
- ECEH under FTP 2023 Ch. 9. Pilot approvals reported; count not confirmed. [C; PIB doc not reachable]
- Amazon-DGFT MoU extended Aug 2025. [B, Amazon press: https://press.aboutamazon.com/in/news/company-news/2025/8/amazon-and-dgft-extend-their-collaboration-to-accelerate-ecommerce-exports-from-india]

## Ranking / visibility mechanics
- Regulation does not set ranking. It shapes listing content. Country-of-origin filter (for imported goods) makes origin a searchable attribute from 1 July 2026. [C, pattern]
- Dark-pattern enforcement touches listing UI: urgency badges, countdowns, "only N left" and drip-priced fees. [PATTERN, from 2023 Guidelines and 2026 orders]
- IS 19000 makes review moderation and paid-review disclosure a compliance matter, even while voluntary. [PATTERN]

## What a small new D2C seller should do / avoid (PATTERN, inference)
- Do: check MRP, net quantity, manufacturer and country-of-origin fields on every listing against the 2011 Rules and the 2026 amendment. Imported goods need the filter from 1 July 2026. [PATTERN]
- Do: avoid countdowns, "only N left" and other urgency claims that aren't true. Show all-in price at first display. Check subscription and renewal flows for "Trick Question" and "Interface Interference". [PATTERN from 2023 Guidelines and 2026 CCPA orders]
- Do: prepare for the e-commerce amendment effective 1 Jan 2027: grievance officer with 48-hour acknowledgement and one-month resolution, legal identity and grievance details on the store, NCH convergence. [PATTERN, from single-source summaries; verify G.S.R. 789(E)]
- Do: keep TCS (0.5%, GSTR-8) and GST registration in planning. Assume inter-state sales need registration regardless of turnover. Confirm the intra-state exemption and Rule 14A with a CA. [PATTERN]
- Do: for apparel, check the textile labelling QCO draft (16 July 2026) before listing. For footwear, the 2024 QCOs apply, with legacy stock allowed until 31 July 2027. [PATTERN]
- Do: map DPDP obligations now. Consent-manager date about mid-Nov 2026. Substantive duties about 13 May 2027. [PATTERN]
- Do: keep influencer paid-partnership labels visible, not buried in hashtags. For AI-generated or virtual-influencer content, follow the May 2026 draft even if not final. [PATTERN, ASCI 2025 and 2026 draft]
- Avoid: buying or incentivising reviews. Treat IS 19000 as the bar even while voluntary. [PATTERN]
- Avoid: relying on any single 2026 rule in this file until the gazette is read. [PATTERN]

## Open questions and conflicting claims
- Consumer Protection (E-Commerce) Amendment 2026: full text not read. Rule 5 changes unknown. Whether the 2021 draft items are in force: unknown. Gazette G.S.R. 789(E) not checked.
- Legal Metrology country-of-origin: 6(10A) effective 1 July 2026 (first amendment) vs Second Amendment substituting 6(10A) effective 1 July 2027. Unresolved; gazette not read.
- Legal Metrology "Second Amendment Rules 2025, Rule 26(a), 2 Dec 2025": not re-found. Unverified.
- Footwear QCO: resolved. 2020 order rescinded 2022; 2024 orders in force; amended 12 June 2026, deadline 31 July 2027. Primary BIS PDF not read.
- Cotton Bales QCO 2023: rescinded (June 2026) vs amended, effective 27 Aug 2026. Unresolved.
- Textile labelling and marking QCO (draft 16 July 2026): final status unknown.
- IS 19000 binding status: voluntary per all 2025-26 sources found. No mandatory notice found.
- CCPA self-audit: mandatory vs voluntary self-declaration. Unresolved.
- CCPA enforcement: 2026 orders are confirmed as single-source per order. The "11 notices" claim from pass 1 is unconfirmed.
- Dark-pattern annual audit (2026 amendment): single source, unverified.
- GST intra-state exemption: 2+ sources agree it is limited to purely intra-state sales. Rule 14A scope described differently. Rule 14B (57th GST Council, 8 Oct 2026): single source, unconfirmed.
- FDI Press Note 3: in effect pending FEMA notification. FEMA citation S.O. 4870(E), 2 Sept 2026: single source.
- CCI v Amazon/Flipkart: transfer 6 Jan 2025 (corrected from late 2025). No 2026 status found.
- DPDP: notification 13 vs 14 Nov 2025; consent-manager ~mid-Nov 2026; substantive ~13 May 2027. Shortening announced by minister, not notified.
- ASCI 2026 AI draft: final not confirmed. SansaLegal's 2026 claims (10-second verbal disclosure, NAMS): unverified.
- Apparel-specific QCO for finished garments in force: not found. Labelling draft is the nearest item.
- Unit price rules 2025: not found.

## Sources
1. https://www.manoramayearbook.in/current-affairs/india/2026/09/11/govt-amends-e-commerce-rules.html - 11 Sept 2026 (C, search-verified)
2. https://www.pwc.in/research-insights/news_alert/regulatory-insights/central_government_amends_existing_regulatory_framework_to_further_strengthen_ecommerce_consumer_protection.html - 2026 (C, not reachable; citation via search summary)
3. https://www.corpseed.com/law-update/consumer-protection-e-commerce-amendment-rules-2026-online-businesses - 2026 (C, not reachable; search summary)
4. https://conventuslaw.com/report/india-consumer-protection-e-commerce-amendment-rules-2026-key-changes-for-online-platforms-and-sellers/ - 2026 (C, not reachable; search summary)
5. https://www.storyboard18.com/digital/ccpa-warns-e-comm-firms-over-dark-patterns-self-audit-within-3-months-69249.htm - June 2025 (B)
6. https://www.indialaw.in/blog/civil/ccpas-dark-patterns-mandates-self-audit/ - 2025 (C)
7. https://foxmandal.in/news/dark-patterns-back-in-spotlight-as-new-advisory-calls-for-self-audits/ - 2025 (C)
8. https://www.medianama.com/2026/06/223-consumer-protection-authority-fines-physicswallah-and-mcafee-for-dark-patterns-what-counts-as-consent-now/ - June 2026 (B, search summary; not reachable)
9. https://spicyip.com/2026/07/small-fines-big-platforms-the-ccpa-on-physicswallah-mcafee-and-the-cost-of-getting-caught-part-i.html - July 2026 (C, search summary)
10. https://www.angelone.in/news/market-updates/ccpa-imposes-penalties-on-indigo-zepto-bookmyshow-and-6-other-platforms-over-dark-patterns - date unconfirmed (C)
11. https://www.livelaw.in/amp/top-stories/supreme-court-indicates-transfer-of-amazon-flipkart-sellers-petitions-against-cci-probe-to-karnataka-hc-stays-hc-proceedings-until-jan-6-278517 - Jan 2025 (B, search summary)
12. https://www.barandbench.com/news/litigation/supreme-court-transfers-amazon-flipkart-cases-karnataka-high-court-cci-plea - date unconfirmed (B, search summary)
13. https://inc42.com/?p=493665 - Dec 2024/Jan 2025 (B, search summary)
14. https://www.scconline.com/blog/post/2026/02/21/legal-metrology-packaged-commodities-amendment-rules-2026-explained/ - 21 Feb 2026 (C, search summary)
15. https://digitalpolicyalert.org/change/18569-legal-metrology-packaged-commodities-amendment-rules-2026 - 2026 (C)
16. https://www.mondaq.com/india/commoditiesderivativesstock-exchanges/1749842/regulatory-update-%7c-legal-metrology-packaged-commodities-amendment-rules-2026 - 2026 (C)
17. https://teamleaseregtech.com/updates/article/55254/legal-metrology-packaged-commodities-second-amendment-rules-2026/ - 27 Apr 2026 per source (C)
18. https://cliniexperts.com/regulatory-update/lm-pc-second-amendment-rules-2026/ - 2026 (C)
19. https://www.tribuneindia.com/news/business/footwear-industry-gets-relief-as-centre-extends-quality-control-order-deadline-to-july-2027/ - June 2026 (B, search summary)
20. https://www.taxtmi.com/news?id=73734 - June 2026 (C)
21. https://apparelresources.com/business-news/policy/centre-extends-footwear-qco-deadline-one-year-allows-limited-imports-rd - June 2026 (B/C)
22. https://www.agileregulatory.com/latest-updates/footwear-qco-amendment-2026-msme-deadline-extended-and-r-d-import-relief-introduced - June 2026 (C)
23. https://bis.alephindia.in/latest-update/quality-control-orders-for-leather-and-rubber-foot/294 - 2022 (C)
24. https://textileexcellence.com/single-news/6936/gujarat-high-court-stays-removal-of-quality-control-orders-on-fdy-and-poy - May 2026 (C)
25. https://www.agileregulatory.com/latest-updates/government-rescinds-cotton-bales-quality-control-order-2023-what-this-means-for-the-textile-industry - June 2026 (C)
26. https://www.corpseed.com/law-update/bis-updates-cotton-bales-qco-for-2026 - 2026 (C, search summary)
27. https://www.mondaq.com/india/advertising-marketing-branding/1790884/ai-in-advertising-ascis-new-draft-disclosure-guidelines - May 2026 (B, search summary)
28. https://www.ascionline.in/wp-content/uploads/2025/04/Press-Release_Influencer-Guidelines-Update.pdf - Apr 2025 (A, not reachable)
29. https://www.sansalegal.com/post/asci-influencer-advertising-guidelines-2026-disclosure-rules-for-paid-content-and-ai-influencers - undated (C)
30. https://www.taxaj.com/learn/gst-on-e-commerce-operators-tcs-under-section-52-step-by-step-guide/ - undated (C)
31. https://www.gonukkad.com/blog/gst-requirements-for-marketplace-seller-india - undated (C)
32. https://legaldev.in/blog/gst-registration-for-ecommerce-sellers - undated (C)
33. https://www.compliancecalendar.in/learn/gst-registration-for-e-commerce-sellers - undated (C)
34. https://www.taxscan.in/gst/gst-registration-for-e-commerce-sellers-know-the-changes-proposed-at-the-57th-gst-council-meeting - date unconfirmed (C)
35. https://www.lkslaw.com/insights/articles/dpdp-act-and-rules-a-ticking-compliance-timeline - 2026 (C, search summary)
36. https://www.businesstoday.in/amp/tech-today/news/story/final-dpdp-rules-2025-notified-global-tech-platforms-to-face-stricter-obligations-higher-penalties-502827-2025-11-19 - 19 Nov 2025 (B)
37. https://uniqus.com/digital-personal-data-protection-act-timelines/ - undated (C, pass 1)
38. https://www.storyboard18.com/amp/how-it-works/govt-to-shorten-dpdp-rules-18-month-compliance-timeline-ib-minister-ashwini-vaishnaw-84323.htm - 2026 (B, search summary)
39. https://www.exchange4media.com/digital-news/govt-in-talks-with-industry-to-shorten-dpdp-act-compliance-deadlines-149420.html - 2026 (B, search summary)
40. https://www.indialaw.in/blog/regulatory/press-note-3-2026-fdi-e-commerce-exports-india/ - 2026 (C, search summary)
41. https://www.mondaq.com/india/international-trade-investment/1823682/press-note-3-2026-series-the-regulatory-shift-enabling-fdi-backed-export-e-commerce-in-india - 2026 (C, search summary)
42. https://www.india-briefing.com/news/india-fdi-inventory-based-e-commerce-exports-rule-change-46324.html/ - 2026 (B/C, search summary)
43. https://www.ey.com/en_in/technical/alerts-hub/2026/09/dpiit-permits-foreign-investment-in-export-oriented - Sept 2026 (B, not reachable)
44. https://www.livelaw.in/amp/top-stories/amazon-flipkart-supreme-court-refuses-to-stop-cci-probe-against-amazon-flipkart-under-competition-act-179154 - 2021 (B, pass 1)
45. https://www.outlookbusiness.com/start-up/explainers/amazons-legal-woes-a-timeline-of-ccis-investigation-and-court-battles - undated (B, not reachable)
46. https://www.policyedge.in/p/districts-as-export-hubs-covers-770-districts-but-only-249-export-plans-formally-adopted - 2026 (C, pass 1)
47. https://press.aboutamazon.com/in/news/company-news/2025/8/amazon-and-dgft-extend-their-collaboration-to-accelerate-ecommerce-exports-from-india - Aug 2025 (B)
48. https://www.storyboard18.com/how-it-works/e-commerce-platforms-told-to-self-audit-and-eliminate-dark-patterns-in-new-consumer-advisory-76047.htm - 2025 (B, pass 1)
49. https://businesstoday.in/latest/trends/story/fake-online-reviews-bis-releases-new-standard-for-online-consumer-reviews-356195-2022-12-13 - 13 Dec 2022 (B, pass 1)
50. https://www.theweek.in/wire-updates/business/2025/11/14/dcm61-biz-qco-textiles.amp.html - 14 Nov 2025 (B, pass 1)
51. https://www.businesstoday.in/amp/industry/story/centre-drops-vsf-qco-in-key-textile-reform-amid-wider-quality-norm-rollbacks-502684-2025-11-18 - 18 Nov 2025 (B, pass 1)
