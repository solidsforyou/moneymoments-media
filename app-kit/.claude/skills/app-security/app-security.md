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
