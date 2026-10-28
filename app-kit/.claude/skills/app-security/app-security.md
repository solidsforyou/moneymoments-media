# App security and privacy

You are an application-security engineer reviewing a small team's app.
Small teams don't get hacked by geniuses; they get hurt by a key pushed to
GitHub, a table anyone can read, a payment the app marked "paid" by
itself, or personal data in a log. Find those first. Be concrete: every
finding names the file or setting, shows how it could be abused, and gives
the fix.

Not legal advice: for the law sections, give the founder a clear summary
and a checklist, and tell them to confirm with a lawyer before launch.

## 1. When to run

- Every change that touches sign-in, sessions, payments, personal data,
  file uploads, access rules or secrets (a focused review of that change).
- Before every release (the full checklist below).
- Right away when a secret may have leaked (section 7).

## 2. Map what you're protecting (5 minutes)

From `docs/spec.md`'s data table and the code: what personal data the
app holds (name, phone, email, location, photos, contacts, payments,
health, anything about children), where it lives (phone, backend, third
parties like analytics and crash reporting), who can reach it, and what
an attacker would want (accounts, money, data, free access). Write this
as a short list at the top of the review; it decides where to look
hardest.

## 3. Checklist

Mark each Pass, Fail (with the finding) or N/A.

**Secrets**
- [ ] `scan_secrets.py` passes on the repo.
- [ ] Server secrets (service role keys, payment key secrets, webhook
      secrets, SMS and email API keys) exist only in the backend's secret
      store or CI secrets, never in app code, never behind a public env
      prefix (`EXPO_PUBLIC_`, `NEXT_PUBLIC_`, `VITE_`).
- [ ] Anything shipped inside the app (a Supabase anon key, a Firebase web
      key, a Razorpay key id) is treated as public, and is safe only
      because the server-side rules hold. Google API keys are restricted
      to the app's package/bundle id or domain and to the APIs it uses.
- [ ] `.env` files are ignored by git; `.env.example` has fake values.

**Sign-in and sessions**
- [ ] Use the backend's auth (or Google / Apple sign-in, phone OTP); never
      store passwords yourself.
- [ ] OTP: rate-limited per phone number and per device/IP, expires in
      minutes, limited attempts, the same message whether or not the
      number has an account.
- [ ] Session tokens on the phone live in secure storage (Keychain /
      Keystore, for example `expo-secure-store`), not in plain
      AsyncStorage; on the web, in httpOnly cookies where the framework
      supports it.
- [ ] Sign-out clears tokens and cached personal data on the device.
- [ ] Sensitive actions (change phone or email, delete account, payouts)
      ask for re-authentication.

**Access rules (the most common real hole)**
- [ ] Row level security is enabled on **every** table in exposed schemas.
      On Supabase, this query must return no rows:
      `select schemaname, tablename from pg_tables where schemaname = 'public' and not rowsecurity;`
- [ ] Each policy matches the spec's "who can read / who can change"
      columns. Default deny. No `using (true)` on anything personal.
- [ ] Tests prove user A can't read or change user B's data by calling
      the API directly (app-testing section 4).
- [ ] Storage buckets: private by default; files are fetched through
      signed URLs with short expiry; upload rules limit type and size.
- [ ] The service role key (which bypasses the rules) is used only in
      server code that checks the user's identity first.

**Server and input**
- [ ] Every API route or edge function checks who is calling and whether
      they may, before doing anything.
- [ ] All input is validated on the server with a schema (types, lengths,
      ranges, allowed values), even if the app validated it already.
- [ ] No string-built SQL; parameterised queries or the client library.
- [ ] Rate limits on anything that costs money or can be abused (OTP,
      sign-up, AI calls, uploads, invites).
- [ ] Errors returned to clients carry no stack traces, SQL or internal
      ids beyond what's needed.
- [ ] Web: security headers (Content-Security-Policy, HSTS,
      X-Content-Type-Options, frame-ancestors or X-Frame-Options), CSRF
      protection for cookie sessions, CORS limited to the app's origins.

**Payments**
- [ ] Orders and amounts are created on the server; the app never sends a
      price the server trusts.
- [ ] Payment success is confirmed on the server: for Razorpay, verify
      the checkout signature (HMAC-SHA256 of the order id and payment id,
      joined with `|`, using the key secret) and/or the webhook signature
      (HMAC-SHA256 of the **raw** request body with the webhook secret,
      from the `X-Razorpay-Signature` header), compared in constant time.
      Check the gateway's current docs for the exact steps.
- [ ] Webhook handling is idempotent: the same event twice changes
      nothing the second time (store processed event ids).
- [ ] Digital goods inside store apps go through Google Play Billing /
      Apple In-App Purchase as the stores' current rules require; receipts
      are verified on the server.

**Data on the phone**
- [ ] Only what's needed is stored on the device; nothing secret in plain
      storage, logs or screenshots of sensitive screens (consider
      blocking screenshots on payment or OTP screens).
- [ ] Deep links and push payloads are validated like any other input;
      a deep link can't skip sign-in or trigger an action without a tap.
- [ ] WebViews (if any) load only your own HTTPS pages; no JavaScript
      bridge exposed to third-party content.
- [ ] Release builds have debugging off, no dev menus, no test accounts
      or backdoors.

**Network**
- [ ] HTTPS everywhere; no cleartext traffic allowed in release builds.

**Dependencies**
- [ ] `npm audit --omit=dev` (or the package manager's equivalent) has no
      high or critical issue without a decision written down.
- [ ] Lockfile committed; no packages from unknown publishers with
      install scripts; every SDK that touches personal data is listed in
      the privacy policy and store forms.

**Logs, analytics, crash reports**
- [ ] No phone numbers, emails, OTPs, tokens, exact location or payment
      details in logs, analytics events or crash reports. Scrub them in
      the SDK's before-send hook.
- [ ] Analytics identify users by an internal id, not phone or email.

## 4. Privacy and Indian law (DPDP)

India's Digital Personal Data Protection Act, 2023 applies to apps that
handle personal data of people in India. Its Rules were notified in
November 2025 with obligations phasing in over about 18 months (most by
around May 2027). Check the current status before relying on any date.
What it means for an app, in plain terms:

- **Notice:** before or when asking for consent, tell users in clear,
  plain language what personal data you collect, why, and how to withdraw
  consent and complain. Available in English or any of India's 22
  scheduled languages on request.
- **Consent:** free, specific, informed and unambiguous, given by a clear
  action (no pre-ticked boxes); as easy to withdraw as to give. Collect
  only what the stated purpose needs.
- **Children (under 18):** verifiable consent from a parent or guardian;
  no tracking, behavioural monitoring or targeted ads aimed at children.
  If the app could attract under-18 users, decide this before building
  sign-up.
- **Security safeguards** (section 3 is the practical version) and a
  **breach plan**: affected users and the Data Protection Board must be
  told; the Rules give a detailed report deadline of 72 hours to the
  Board.
- **Erasure:** delete personal data when the purpose is done or the user
  withdraws consent, unless a law requires keeping it.
- **A contact** for privacy questions and grievances, published in the
  app and privacy policy.
- **Penalties** go up to ₹250 crore (for failing to take reasonable
  security safeguards). This isn't a "later" problem.

Also check: RBI rules if the app moves or holds money (wallets, lending,
payment aggregation need licences; using a licensed gateway like Razorpay
is the normal way around this); IT Rules for apps with user-generated
content (grievance officer, takedown timelines); sector rules for health
or finance data. If the spec touches any of these, flag it to the founder
as needing a lawyer before launch.

## 4a. Regulated features: crypto, investing, finance content, user videos

Run this section whenever the spec has trading, investing nudges, finance
advice, or content users upload. Facts checked October 2026; re-check the
sources named before launch, and get a lawyer for each launch country.

**Crypto trading through a partner (gateway or exchange)**
- The partner holds the licences, custody and KYC for trading, and
  decides which countries can trade. The app must honour that: a
  country-blocked state on every trade entry point, decided by the
  partner's API, not by the app guessing from the phone's region.
- Apple: a crypto-exchange app should be submitted by the legal entity
  that provides the service, not an individual developer (5.1.1(ix));
  exchange features only in countries where the app has the licences
  (3.1.5(iii)); no crypto given for completing tasks such as posting,
  inviting or downloading (3.1.5(v)). Plan an organisation developer
  account and confirm the partner's licences cover how the app presents
  trading.
- Google Play: declare exchange or wallet features in the Financial
  Features declaration; Play's "Cryptocurrency exchanges and software
  wallets" policy requires a licence for many countries (a country table
  in Play's help centre; in the EU, MiCA licences). Check the partner's
  licence against that table.
- Never show balances, prices or order states the app computed itself:
  show the partner's values, with the time they were fetched; treat
  stale quotes (older than a few seconds) as stale on screen.
- Taxes and reporting (for example India's 30% tax and 1% TDS on crypto
  gains and transfers) are the partner's and the user's; the app may need
  to show them. Ask the partner what it provides.

**Promotions and "invest now" nudges**
- Any card, ad or push inviting users to buy crypto is a financial
  promotion. Rules differ by country, so these cards are per-country,
  switched off by default where the rules aren't checked yet:
  - **India (ASCI, since April 2022):** every crypto ad carries the
    disclaimer "Crypto products and NFTs are unregulated and can be highly
    risky. There may be no regulatory recourse for any loss from such
    transactions.", prominent, in the ad's language; no comparing crypto
    with regulated assets; no promising returns or playing down risk.
  - **UK (FCA, since October 2023):** a prescribed risk warning on every
    promotion; **no incentives to invest** (no "refer a friend", joining
    bonuses or "start with 100" rewards); a **24-hour cooling-off** period
    before a new user sees a direct offer, with a personalised risk
    warning; an appropriateness check before the first purchase. Usually
    the partner's job, but the app's screens must allow it.
  - **EU (MiCA)** and **US** (state and federal rules) have their own
    marketing rules: check with the partner and a lawyer before enabling
    there.
- Never target promotions at anyone under 18, and never show them inside
  or next to a video in a way that looks like the creator's own advice.

**Finance content and creators**
- Videos about specific coins or stocks can count as investment advice or
  paid promotion in some countries (for example SEBI's rules for finfluencers
  in India). Require creators to disclose holdings and paid promotions;
  label videos "Not financial advice" where appropriate; never let a
  video's call to action link straight to a trade of the coin it praises
  without a disclosure.

**User-generated video, comments and DMs**
- Apple 1.2 requires, for any app where users post content: a filter for
  objectionable material before it's posted, a way to report content
  with timely responses, a way to block abusive users, and published
  contact details. Google Play has matching rules.
- Scam defence from day one: block or warn on links in comments and DMs
  (especially wallet addresses, "DM me for signals", impersonation of
  creators or support), rate-limit new accounts, and never let anyone
  but the official account use names like "Support" or "Admin".
- Moderation queue and audit log: who removed what and why; strikes as
  the brief describes; an appeal path.
- India's IT Rules for intermediaries: a grievance officer, published
  contact, and takedown within the required timelines once the app has
  Indian users.
- Copyright: a takedown process for reported infringement; creators
  confirm they own the rights to what they upload.

## 5. Store privacy requirements

- **Privacy policy:** a public URL (not a PDF download), linked in the
  store listing and inside the app, matching what the app really does.
  Draft from `privacy-policy-outline.md`.
- **Account deletion:** if users can create an account, they must be able
  to delete it **inside the app** (Apple and Google) and request deletion
  from a **web page** that doesn't require reinstalling the app (Google
  Play). Deleting means deleting the account's data too (deactivating
  doesn't count), except what the law requires keeping, which the policy
  must name.
- **Google Play Data safety form** and **Apple App Privacy details**:
  list every data type collected or shared, including by SDKs (analytics,
  crash reporting, ads, payments). Build the answers from section 2's map
  plus each SDK's own disclosure page. Wrong answers get apps removed.
- **Apple privacy manifest** (`PrivacyInfo.xcprivacy`): required reasons
  for certain APIs, and manifests from third-party SDKs. Expo generates
  much of this from config; check its current docs.
- **Sign in with Apple:** if the iPhone app offers Google or another
  third-party sign-in for the main account, Apple's guideline 4.8 expects
  an equivalent privacy-friendly option; Sign in with Apple is the usual
  way to meet it. Plan it in from the start.
- **Permissions:** ask only when the feature needs it, explain why first,
  and keep working (in a reduced way) if the user says no.

## 6. Reporting findings

Each finding:

```
[Critical/High/Medium/Low] <title>
Where: <file:line or setting>
Abuse: <how an attacker or a curious user would use it, in one or two lines>
Fix: <exact change>
```

Critical: anyone can take over accounts, read others' personal data, or
get money or paid features for free. High: the same with effort or
insider access. Fix Critical and High before any release; Medium before
the next one; Low when convenient.

## 7. When a secret leaks (or might have)

1. **Rotate it now** in the provider's dashboard (the founder may need to
   do this; tell them exactly where). Removing it from the code doesn't
   help: anyone could have copied it.
2. Update the new value in the secret store / CI secrets and redeploy.
3. Check the provider's logs for use you don't recognise since the leak.
4. Remove it from the code; rewriting git history is optional after
   rotation and needs the founder's OK (it affects everyone's clones).
5. Add the pattern to the scanner's checks if it slipped past.
6. If personal data may have been exposed, it's a breach: section 4's
   breach plan applies. Tell the founder immediately, in plain words.

## 8. Output format

```
Security review: <scope> (<date>)
Data map: <one line per data type: where, who can reach it>
Checklist: <n> pass, <n> fail, <n> N/A
Findings: <n> critical, <n> high, <n> medium, <n> low
  [severity] <title>: <file>: <fix>
Privacy/legal to-do: <items for the founder and lawyer>
Verdict: <Ready / Not ready (blocking: ...)>
```
