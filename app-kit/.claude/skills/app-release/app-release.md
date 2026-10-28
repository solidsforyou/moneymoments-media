# App release

You are the release manager. A release is not "upload and hope": it's a
version that passed its checks, a listing that won't get rejected, a
rollout small enough to stop, and someone watching the numbers after. The
stores have waiting periods that can't be rushed, so plan them from day
one.

Facts below were checked in October 2026. Official pages to re-check
before a first submission:
- Google Play target API: developer.android.com/google/play/requirements/target-sdk
- Play testing for new personal accounts: support.google.com/googleplay/android-developer/answer/14151465
- Play listing assets: support.google.com/googleplay/android-developer/answer/9866151
- Play account deletion: support.google.com/googleplay/android-developer/answer/13327111
- App Store Review Guidelines: developer.apple.com/app-store/review/guidelines
- App Store screenshot specs: developer.apple.com/help/app-store-connect (Screenshot specifications)

## 1. Plan the timeline early (the waits you can't skip)

| Step | Typical wait | Start it |
|---|---|---|
| Google Play developer account (personal: identity check; organisation: also a D-U-N-S number) | Days to 2 weeks | As soon as the spec is approved |
| **New personal Play accounts** (created after 13 Nov 2023): closed test with **at least 12 testers opted in for 14 days in a row** before production access is granted; then Google reviews the request | 3 weeks or more | As soon as there's a testable build. Line up 15+ real testers (friends, early users) who will actually open the app |
| Apple Developer Program (individual or organisation; organisation needs D-U-N-S) | Days to 2 weeks | With the Play account, if iPhone is in scope |
| App Store review | Usually 1 to 3 days per submission | Each release |
| Phone OTP: DLT registration of sender id and SMS templates (India) | 1 to 2 weeks | When OTP sign-in is chosen |
| Payment gateway KYC and live keys (Razorpay) | Days to weeks | When payments are in scope |
| Domain, privacy policy page, account deletion web page | A day | Before the first store submission |

An organisation account avoids Play's 12-tester rule but needs a
registered business. The founder decides which account type; list both
options with the trade-off.

## 2. Versions and builds

- **Version** (what users see) follows `MAJOR.MINOR.PATCH`: PATCH for
  fixes, MINOR for features, MAJOR for big redesigns or breaking changes.
- **Build number** (Android `versionCode`, iOS `buildNumber`) goes up by
  one for every upload, never reused. With Expo, let EAS manage it
  (`autoIncrement`) from the remote version source.
- **Environments:** development (your machine), preview/staging (test
  backend, internal testers), production (real users, real backend). Each
  has its own backend project and keys; a preview build never talks to
  production data.
- Tag each release in git (`v1.2.0`) and keep a short `CHANGELOG.md` in
  plain words.
- **Over-the-air updates** (EAS Update) can ship JavaScript and asset
  fixes without store review, to builds with the same runtime version.
  Native changes (new native modules, permissions, SDK upgrades) need a
  new store build. Never use OTA to change what the app does in ways the
  store review would care about.

## 3. Release checklist (every release)

1. **Scope:** the stories in this release are done per app-build's
   definition of done; the spec's change log is up to date.
2. **Checks:** app-build `preflight.py` full run passes on the release
   commit; CI green.
3. **Security:** app-security review for this release's changes; no
   Critical or High open; `scan_secrets.py` clean.
4. **Testing:** app-testing release pass filled in at
   `docs/test-plans/<version>.md`; no open Blocker or Major bug (or each
   accepted by the founder by name).
5. **UI:** every new or changed screen READY in app-ui-taste.
6. **Production config:** production backend migrations applied (and
   reversible), production keys in the build's secrets, analytics and
   crash reporting pointing at production, debug features off.
7. **Listing:** `check_listing.py` and `check_assets.py` pass; release
   notes written for users ("You can now…"), run through the humanizer.
8. **Founder approval** to upload and submit.
9. **Rollout** (section 7) and **watch** (section 8).

## 4. Google Play

- **Build:** Android App Bundle (`.aab`), signed through **Play App
  Signing**; keep the upload key in EAS credentials or a secret store,
  never in the repo.
- **Target API:** since 31 Aug 2026, new apps and updates must target
  **Android 16 (API level 36)** or higher (extension requests possible to
  1 Nov 2026). Expo SDKs set this; check the SDK's target before
  building. Apps targeting Android 15+ must also support **16 KB memory
  page sizes** (matters for native libraries; recent Expo / React Native
  versions handle it).
- **Testing tracks:** internal (up to 100 testers, minutes to publish) ->
  closed (the 12-tester / 14-day rule for new personal accounts) -> open
  (optional) -> production.
- **Forms in Play Console** (all must match the app's real behaviour):
  - Store listing (name 30, short description 80, full description
    4000 characters; icon 512x512; feature graphic 1024x500;
    screenshots: at least 2, up to 8 per device type, 4+ recommended).
  - Privacy policy URL.
  - **Data safety** form, including the **account deletion web link** if
    users can create accounts.
  - App access (give reviewers a working test login if the app needs
    sign-in; an OTP-only app needs a test number with a fixed code).
  - Ads declaration, content rating questionnaire, target audience and
    content (declaring under-18 audiences brings extra rules), news app
    declaration if relevant, **financial features** declaration for
    anything money-related (Indian lending apps have extra requirements),
    government app or health declarations if relevant.
  - Countries: India (and others only if the app is ready for them).
- **Title rules:** no emoji, no ALL CAPS (unless the brand), no "best",
  "#1", "free", "sale", "download now" style claims in the name or icon.
  `check_listing.py` enforces these.

## 5. App Store (iPhone)

- **Build:** with Expo, `eas build --platform ios` then `eas submit`;
  no Mac needed. Test through **TestFlight** first (internal testers right
  away; external testers after a short beta review).
- **App Store Connect fields:** name 30, subtitle 30, keywords 100
  (comma-separated, no spaces), promotional text 170, description 4000.
  Screenshots: one iPhone set at an accepted 6.9" size (1320x2868,
  1290x2796 or 1260x2736) and, if the app runs on iPad, a 13" iPad set
  (2064x2752 or 2048x2732). Smaller device sizes are scaled from these.
- **App Privacy** details (the "nutrition label"), built from the same
  data map as Play's Data safety form.
- **Review notes:** a working demo account (and how to get an OTP), what
  the app does in two lines, anything non-obvious.
- **Common rejections to design out:**
  - Account creation without **in-app account deletion** (5.1.1(v)).
  - Third-party sign-in (Google) for the main account without an
    equivalent privacy-friendly option such as **Sign in with Apple**
    (4.8).
  - Digital goods or subscriptions sold without **In-App Purchase**
    (3.1.1). Physical goods and real-world services use normal payments.
  - Crashes, broken links, placeholder content, or features that need a
    login reviewers can't get (2.1).
  - An app that is just a website in a wrapper with nothing app-like
    (4.2).
  - Mentions of Android or other platforms in the listing (2.3.10).
  - Asking for permissions without a clear purpose string.
- **When rejected:** read the cited guideline, fix what it says (or reply
  in Resolution Center with the facts if the reviewer misunderstood),
  and resubmit. Tell the founder the reason and the fix in plain words.

## 6. Web

- Production deploy from main through the host (Vercel) after CI passes;
  preview links for every branch.
- Custom domain with HTTPS; redirects from `www` or the bare domain.
- `robots.txt`, a sitemap, page titles and descriptions, social preview
  images for pages that should be shared or found.
- Cookie or analytics consent where the privacy policy needs it.

## 7. Rollout

- **Play:** staged rollout: 10% -> 25% -> 50% -> 100%, at least a day
  between steps (longer for a first release). Halt the rollout if the
  numbers in section 8 go bad.
- **App Store:** phased release over 7 days for updates; you can pause
  it.
- **Web:** deploy, then watch; roll back to the previous deployment in
  one click if needed.
- **Backend changes** ship before the app versions that need them, and
  stay compatible with the previous app version (users update slowly).
  Plan a forced-update screen for when an old version must stop working,
  and build it into v1 so it exists when you need it.

## 8. Watch (first 48 hours of every release, then weekly)

- **Crash-free users** (Sentry or Play/Firebase vitals): 99.5% or better.
  A new crash affecting more than 1% of sessions: halt the rollout, fix,
  ship a patch (OTA if it's JavaScript-only).
- **Play Android vitals:** user-perceived crash rate and ANR rate below
  Google's bad-behaviour thresholds (they hurt store visibility).
- **The spec's success numbers** and the core-flow funnel, compared with
  the previous version.
- **Reviews and ratings:** read every review in the first weeks; reply to
  the negative ones within a day, politely, with a fix or a way to reach
  you (run replies through the humanizer). Turn real problems into bug
  reports.
- **Rollback plan, written before rollout:** halt the staged rollout;
  republish the previous OTA update; roll the web deploy back; never
  roll back a database migration that has written new data without a
  tested plan.

## 9. After launch

- Hand the launch to the Marketing head (social-media for the launch
  plan, ai-visuals for store screenshots and promo images, humanizer for
  all copy).
- Store listing optimisation: test one change at a time (Play's store
  listing experiments; Apple's product page optimisation), starting with
  the first screenshot and the short description or subtitle.
- Keep a release rhythm (for example every 2 weeks) so fixes reach users
  and the stores see an active app.
- Save each release's outcome (crash-free %, success numbers, notable
  reviews) to the memory sheet (`--type number --topic "app release"`).

## 10. Output format

```
Release <version> (build <n>): <web / Play / App Store>
Checklist: <n>/9 done (missing: <list>)
Listing: check_listing <ok / errors>; check_assets <ok / errors>
Waiting on: <store review / 14-day test (day n of 14) / founder approval / nothing>
Rollout: <stage and %>; crash-free <x%>; success numbers <short>
Rollback plan: <one line>
```
