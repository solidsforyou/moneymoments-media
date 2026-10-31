# Release test plan: <app> <version> (build <n>)

Date: <date>. Tester: <name / Claude>. Backend: <test / staging>.
Automated suite: <passed on commit <sha> / failed: ...>

Mark each row Pass, Fail (with bug link) or N/A (with reason). Never tick
a row you didn't run.

## Devices

| Device | OS version | Screen | Notes |
|---|---|---|---|
| Budget Android | <oldest supported> | <size> | <RAM> |
| Recent Android | <version> | <size> | |
| iPhone | <oldest supported iOS> | <size> | |

## Core flow and acceptance checks

| Check (from docs/spec.md) | Budget Android | Recent Android | iPhone |
|---|---|---|---|
| <story 1, check 1> | | | |

## Conditions

| Condition | Result | Notes |
|---|---|---|
| 360 px wide screen | | |
| Largest system font | | |
| Dark mode | | |
| Slow network (throttled) | | |
| Offline, then back online mid-action | | |
| Fresh install | | |
| Upgrade over the previous store version | | |
| Permissions denied, then granted in settings | | |
| Background, killed, restored mid-flow | | |
| Rotation (or locked, as designed) | | |
| Push notification arrives and opens the right screen | | |
| Hindi text / very long name | | |
| Sign out, then sign in as another user: no data from the first user | | |
| Account deletion | | |

## Bugs found

| Bug | Severity | Status |
|---|---|---|
| <title> | <Blocker/Major/Minor/Cosmetic> | <open / fixed in build n> |

## Verdict

<Ready / Not ready>. Open Blocker or Major bugs: <none / list, each accepted by the founder on <date>>.
