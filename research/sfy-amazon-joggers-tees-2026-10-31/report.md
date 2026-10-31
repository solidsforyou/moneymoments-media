# SFY tees and joggers on Amazon.in: competitor report

Collected 31 Oct 2026, 00:00-02:35 UTC. Depth: deep. 8 competitors (4 tee, 4 jogger) plus The
Souled Store (c9) and our rows (`us-`). 572 ledger rows, 193 reviews (all Flipkart). Row ids are
`ledger.csv` ids; "line N" is a `reviews.csv` line. Percentages computed by script.
Analysis only (no listing copy).

## 1. Answer

Five of the six Amazon.in bestseller entries checked sell at Rs 779-999, rated 3.7-4.2
[c1-003, c2-002, c4-002, c5-004, c8-002; c6-002 Rs 1,100 is the exception, unverified].
Top tee: Sleepynuts #14, Rs 944, 3.8 stars, 1,856 ratings [c1-002..005]. Top jogger: Jockey 9500
#3, Rs 999, 4.1 stars, 9,251 ratings [c5-004..007]. Our Rs 999 tee sits at the top of that band;
our Rs 1,499 jogger is above every jogger price found [us-001, us-002]. No product page states
GSM [c1-035, c3-011, c5-050, c9-100], so our 230 / 320 GSM would be the only stated weights.

## Update from founder screenshots (31 Oct, 09:35 IST)

- **Snitch IS on Amazon.in** (corrects "not found" below): oversized textured half-sleeve tee,
  Rs 551, MRP Rs 1,199 (54% off), 6 colours [c3-051..053]. Same price as on Flipkart (c3-002).
- **New closest rival, DaMENSCH (c10):** "Statement Solid Oversized T Shirt for Men,
  Heavyweight", Rs 1,199 (MRP 1,299, 8% off), 4.2 stars from 124 ratings, 9 colours
  [c10-001..006]. A heavyweight solid oversized tee, 20% above our Rs 999 tee. GSM and fabric
  not yet seen.
- **Ads on rivals' searches and pages:** DaMENSCH is a sponsored result on the "snitch oversized
  t-shirt" search [c10-007]; a Jockey 9930 vest ad (Rs 379, 4.2, 10,771 ratings) sits on a
  Snitch product page (founder screenshot). Brands buy placements on each other's searches.
- Founder reports listings claiming "100% pure cotton" while selling about 80% cotton, and a
  possible fake Snitch listing. Not yet evidenced in the ledger; needs the listing screenshots.

## Founder's Amazon.in screen recordings (31 Oct, 09:28-09:36 IST)

10 recordings transcribed into `recordings/out_v1..v10.csv` (342 rows; frames read by
helpers, key frames checked by Claude). Sources: Drive folder "Amazon research".

| Rec | Screen |
|---|---|
| v1 | Bestsellers, Women's T-Shirts #1-38 |
| v2 | Bestsellers, Women's Track Pants #1-23 |
| v4 | Bestsellers, Men's T-Shirts #1-21 |
| v5 | Bestsellers, Men's Track Pants #1-23 |
| v6 | Search: Sleepynuts tees |
| v3, v9 | Product pages: The Souled Store oversized tees |
| v7 | Product page: Veirdo 100% Pure Cotton oversized (plus size) |
| v8 | Product page: Jockey AM95 |
| v10 | Product page: Snitch satin shirt + Snitch search (luggage, perfume) |

What they show:
- **Bestseller price bands are lower than the ranks list suggested.** Men's tees mostly
  Rs 169-830 (Sleepynuts Rs 944 is the top price, v4); women's tees Rs 215-549 (Amazon's own
  Symbol brand holds 4 spots, v1); men's track pants from Rs 284, Pepe Jeans #1 at Rs 645,
  Boldfit wide-leg Rs 898 the top (v5); women's track pants mostly Rs 295-419 (v2). Our Rs 999
  tee and Rs 1,499 jogger sit above every bestseller list seen.
- **Rank isn't about review count:** women's tee #1 has 2 ratings (v1).
- **Baggy / wide-leg joggers recur** in the men's list (v5 #5, #6, #19).
- **Jockey AM95 (verified by Claude in frame s_v8/12):** Materials & Care says "Fabric Type:
  80% Cotton, 20% Polyester"; title says "Super Combed Cotton Rich" (not 100%). A 5-star review
  calls it "100% cotton fabric"; another says "very log GSM product". No GSM listed, only
  "Medium Weight". The product AI summary notes "several customers reporting that the brand
  is not genuine". Sold by Cocoblu Retail.
- **Veirdo:** title "100% Pure Cotton", specs only "Cotton" (no percentage); images claim "Quick
  Dry" and "Anti-Odour". Rs 479, MRP 1,099, 4.1 (268 reviews). Sold by Cocoblu Retail (v7).
- **Inflated MRPs are standard:** Veirdo carousel MRPs Rs 4,399 / 3,299 / 1,199 against
  Rs 1,099 / 849 / 379 (68-75% off) while its own listing uses MRP 1,099 (v7); Sleepynuts
  Rs 944 against MRP 2,999 (69% off) and Rs 849 against 2,799 (v6); Snitch luggage all
  anchored on MRP Rs 3,499 (v10).
- **First demand numbers:** Sleepynuts "100+ bought in past month" on top colours, "50+" on
  others (v6).
- **The Souled Store:** Rs 799 (MRP 899, 3.5 stars, 14 ratings) and Rs 539 (MRP 899, 40% off,
  16 reviews, "Only 1 left"); both "100% Cotton" with consistent specs. Pearl grey page has an
  XS chest of 44" in the bullet vs 36" in the size chart, a "Car & Motorbike" rank listed
  first, and an AI review summary about other products (v3, v9). Sold by Cocoblu Retail.
- **Resellers, not brands, own the Buy Box** on Jockey, Veirdo and The Souled Store (Cocoblu
  Retail, Ships from Amazon).
- **Ads everywhere:** Jockey sponsored strips sit on Snitch and Souled Store pages (v3, v10);
  sponsored carousels on every product page.
- **Pooled reviews:** Snitch colour variants share one count ("4.0 (446)" on four colours, v10).
- Not seen: GSM on any listing; star breakdowns; a listing whose own specs contradict a
  "100% cotton" title. The founder's "says 100%, sells 80%" is closest to Jockey AM95, whose
  listing doesn't claim 100% but buyers believe it is.

## 2. Data limits

- Amazon.in: only Bestseller lists loaded. Every /dp/ page hit a bot check; search pages 503.
  Not bypassed. Listing detail (images, A+, bullets, bought-past-month) is mostly blocked.
- Flipkart product and review pages are the stand-in for listings and reviews.
- Blocked: Myntra, Nykaa, every brand site (c1-057, c2-050, c3-050, c4-067, c6-032, c8-049, c9-099).
- Snitch tee (c3) and Snitch joggers (c7): not found on Amazon.in. The Souled Store (c9) has six
  solid oversized tee listings on Amazon.in in search (titles only, c9-090..095).
- Unverified: all Van Heusen (c6) and Snitch jogger (c7) rows except those spot-checked.
- Verification: 114 rows sampled, 0 value mismatches.
- `tables.md` is script output with these known errors (use this report's tables instead):
  Veirdo unit price (uses Flipkart single price over Amazon 3-pack; true Amazon figure Rs 283 a
  tee, c2-002); Sleepynuts rating vs count mix platforms (Amazon count 1,856, c1-005); Snitch tee
  shows one colourway; Snitch jogger and Bewakoof rows are closest-match Flipkart items, not the
  Amazon products; "bullets 0" where blocked; Souled Store title length is a search string.
- Avoid: `pages/c1|c2|c3|c7|c8/product/` are captures of unrelated Amazon items (bot pages).

## 3. Price ladder

| Item | Where | Selling (Rs) | MRP | Off | Rows |
|---|---|---|---|---|---|
| Jockey AM95 tee | Amazon BS #57 | 779 | - | - | c4-002 |
| Veirdo tee 3-pack | Amazon BS #72 | 849 (283 each) | - | - | c2-002, c2-006 |
| Sleepynuts tee | Amazon BS #14 | 944 | - | - | c1-003 |
| Souled Store oversized, pure cotton | Flipkart | 699 | 899 | 22.2% | c9-002, c9-003 |
| Veirdo single, pure cotton | Flipkart | 422 | 1,099 | 61.6% | c2-015, c2-016 |
| Sleepynuts | Flipkart | 490 | 999 | 51.0% | c1-027, c1-028 |
| Snitch oversized grey / beige | Flipkart | 551 / 537 | 1,199 / 1,499 | 54.0% / 64.2% | c3-002, c3-038 |
| Jockey AM95 black | Flipkart | 799 | - | - | c4-025 |
| Souled Store multicolour, pure cotton | Flipkart | 1,249 | 1,299 | 3.8% | c9-026, c9-027 |
| **SFY tee, 230 GSM pure cotton** | - | **999** | - | - | us-001 |
| Bewakoof women's jogger | Amazon BS #54 | 899 | - | - | c8-002 |
| Jockey 9500 jogger | Amazon BS #3 / Flipkart | 999 / 999 | 999 | 0% | c5-004, c5-023 |
| Van Heusen jogger | Amazon BS #57 | 1,100 | - | - | c6-002 (unverified) |
| Van Heusen blue / dark blue | Flipkart | 1,034 / 998 | 1,899 / 1,199 | 45.6% / 16.8% | c6-047, c6-069 |
| Snitch premium cotton jogger | search summary only | 1,199 | 1,499 | 20.0% | c7-039 (low) |
| **SFY jogger, 320 GSM pure cotton** | - | **1,499** | - | - | us-002 |

- **Tee at Rs 999:** 5.8% above Sleepynuts on Amazon, 28.2% above Jockey AM95, 42.9% above
  Souled Store's pure-cotton oversized tee (Flipkart). Rs 1 under the zero-referral line.
- **Jogger at Rs 1,499:** 50.1% above Jockey 9500, 36.3% above Van Heusen (Amazon), 45.0% above
  Van Heusen (Flipkart), 66.7% above Bewakoof, 25.0% above Snitch's search price.
- Fee: at 19% (Other Products, category unconfirmed) the jogger pays Rs 284.81 referral,
  leaving Rs 1,214.19 before other fees; at 23%, Rs 344.77.

## 4. Demand and trust

| Product | Amazon rating (count), rank | Flipkart rating (ratings; reviews) | Rows |
|---|---|---|---|
| Sleepynuts tee | 3.8 (1,856), #14 | 0 on navy page | c1-002..005, c1-044 |
| Veirdo tee | 4.0 (722), #72 | 3.9 (8,583; 351) | c2-001..004, c2-035 |
| Snitch tee | not on Amazon | 3.8-4.4 (8-23) | c3-028, c3-040 |
| Jockey AM95 tee | 4.2 (2,145), #57 | 4.2 (889; 67) | c4-002..005, c4-027 |
| Jockey 9500 jogger | 4.1 (9,251), #3 | 4.2 (15,050; 1,069) | c5-004..007, c5-027 |
| Van Heusen jogger | 3.7 (1,027), #57 | 4.2 (7,896; 606) | c6-001..004, c6-071 (unverified) |
| Bewakoof women's jogger | 4.1 (99), #54 | 4.2 (163; 7), closest match | c8-001..004, c8-022 |
| Souled Store tee | listed, rating blocked | 4.1 (29; 1) | c9-004..006 |

Rank doesn't track rating count (Bewakoof #54 on 99 ratings; Sleepynuts #14 on 1,856); the data
can't show what drives rank.

## 5. Fabric

- Pure cotton: Veirdo (c2-018), three Souled Store listings (c9-011, c9-034, c9-051).
- Cotton blend / cotton rich: Sleepynuts (c1-031), Snitch (c3-007), Jockey AM95 (c4-034),
  Jockey 9500 (c5-041), Souled Store white polo (c9-066). Modal: one Snitch colour (c3-043).
  Polyester: Snitch track pant (c7-018).
- **No jogger in the set is stated as pure cotton. No product page states GSM.** Only blog
  summaries give numbers (Snitch tee 230 or 190 GSM, conflicting; Snitch jogger 280 GSM, low).

## 6. What buyers say (193 Flipkart reviews)

| Theme | Complaint/mixed | Brands | Example lines |
|---|---|---|---|
| quality | 24 | 6 | 32, 33, 37, 54, 162-164, 193 |
| fit / size | 11 | 7 | 46 ("buy one size up"), 76 (loose neck), 105, 123 (too long) |
| material | 10 | 4 | 60, 145 (thin) |
| value | 8 | 4 | 25, 122, 185 |
| washing (fading, bleed, lint) | 8 | 3 | 56, 86, 93, 95, 159, 160 |
| durability | 7 | 3 | 26 (faded in 3 months), 96, 154 |

Veirdo says pure cotton and still gets fading and bleeding complaints (lines 26, 56): the
fabric claim alone doesn't prevent them. Praise centres on comfort, fit and value (Jockey 9500
lines 101-108; Souled Store line 178 "fabric is top notch").

## 7. Service norms (Flipkart)

10-day return on 16 listings (one 7-day). COD on 12, not on 5 (Souled Store, Snitch). Mostly
brand-fulfilled; Veirdo and Van Heusen use third parties. Big MRPs with 45-65% off are normal on
Flipkart (Veirdo, Sleepynuts, Snitch, Bewakoof); Jockey sells at MRP. Bank offers Rs 22-65.

## 8. One-on-one (judgement)

- **vs Sleepynuts:** buyer picks them today on 1,856 ratings and #14 rank. Our edge: pure cotton
  and stated GSM vs their cotton blend.
- **vs Veirdo:** they win on price (Rs 283 a tee in a 3-pack) and volume (8,583 ratings); both say
  pure cotton.
- **vs Jockey AM95:** they win on brand and 2,145 ratings at Rs 779; cotton blend.
- **vs Souled Store:** they win on price (Rs 699); fabric claims match in words. Biggest tee threat.
- **vs Snitch tee:** leaning us; not on Amazon.in, cotton blend/modal on Flipkart.
- **vs Jockey 9500:** price-first buyer picks Jockey (Rs 999, 9,251 ratings, national brand);
  fabric-first buyer may pick us (pure cotton, GSM stated). Biggest jogger threat.
- **vs Van Heusen:** they win on volume; we're 36-50% dearer.
- **vs Bewakoof (women's):** they win on price (Rs 899) on a thin base (99 ratings).
- **vs Snitch jogger:** undecided; price and fabric unverified, not on Amazon.in.

## 9. Opportunities and risks (judgement)

Openings:
1. The only pure-cotton jogger with a stated weight, on this evidence (us-005, us-006).
2. The only stated GSM on any listing (us-003, us-005), once backed by a supplier spec or test.
3. Fit and fading are the repeated complaints nobody answers in their listings.
4. Women's tees and joggers look thinly contested (only Bewakoof found); demand unknown.

Risks:
1. Jogger price: Rs 1,499 is 50% above the #3 bestseller and pays Rs 285-345 referral.
2. Tee: pure cotton is not rare under Rs 1,000 (Veirdo, Souled Store at Rs 699).
3. Zero reviews at launch against competitors with 1,000-9,000 ratings.
4. No official India ad-cost benchmark (d2c-india README section 2).

## 10. Decisions for the founder (ranked)

1. **Jogger price.** Keep Rs 1,499 and make the fabric case, or test lower. Under Rs 1,000 would
   also remove the referral fee.
2. **Get the GSM backed** (supplier spec or lab report) before stating it on the listing.
3. **Keep the tee at Rs 999.** Inside the zero-referral line; 5.8% above Sleepynuts.
4. **Answer fit and fading** in the listing: size guide and wash guidance.
5. **Fill the Amazon gaps** with screenshots, then run the harsh buyer review.

## 11. Open questions

- Amazon /dp/ pages for each competitor (price, MRP, images, A+, bought-past-month): screenshots.
- Joggers' Amazon fee category (19% or another rate): shown in the seller account.
- Our sizes, colours, website: from the founder.
- Women's tee competition on Amazon.in: the women's tee Bestseller page.
- Myntra, Nykaa and brand sites: need network access.
