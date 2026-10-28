#!/usr/bin/env python3
"""Total an app-ui-taste review in code and apply the audit's hard caps.

Input: a JSON file of the ten criterion scores (0 to 10 each), keyed by the
names in app-ui-taste.md section 3, optionally with a note per criterion:

  {"purpose": 8, "hierarchy": 7, "layout": 8, "type": 9, "colour": 7,
   "consistency": 8, "states": 6, "access": 7, "copy": 8, "platform": 8,
   "notes": {"states": "no empty state on Orders"}}

With --audit pointing at capture_screens.cjs's report.json, measured
failures cap the matching criterion, whatever the eye says:
  - tap targets under 24 px or form fields without a label -> access <= 6
  - text contrast below WCAG AA -> colour <= 6
  - sideways scrolling or cut-off text -> layout <= 6
  - text under 12 px -> type <= 6
  - a screen that failed to load or threw console errors -> states <= 5

Usage:
  python3 score_ui.py SCORES.json [--audit report.json] [--json]

Prints the total out of 100, each criterion, the caps applied and the
verdict: READY (85 or more and no criterion below 7) or NOT READY.
Exit code 0 for READY, 1 for NOT READY, 2 for bad input.
"""

import argparse
import json
import sys

CRITERIA = [
    ("purpose", "Clear purpose"),
    ("hierarchy", "Visual hierarchy"),
    ("layout", "Layout and spacing"),
    ("type", "Typography"),
    ("colour", "Colour and contrast"),
    ("consistency", "Consistency"),
    ("states", "States and feedback"),
    ("access", "Touch and accessibility"),
    ("copy", "Copy"),
    ("platform", "Platform fit and polish"),
]
BAR, FLOOR = 85, 7


def caps_from_audit(report):
    caps = {}

    def cap(key, limit, why):
        if key not in caps or limit < caps[key][0]:
            caps[key] = (limit, why)

    for r in report:
        f = r.get("findings") or {}
        where = f"{r.get('device')}{' dark' if r.get('scheme') == 'dark' else ''} {r.get('route')}"
        if r.get("loadError") or r.get("findings") is None:
            cap("states", 5, f"screen failed to load ({where})")
        if r.get("consoleErrors"):
            cap("states", 5, f"console errors ({where})")
        if f.get("tinyTargets"):
            cap("access", 6, f"{len(f['tinyTargets'])} tap target(s) under 24 px ({where})")
        if f.get("unlabeled"):
            cap("access", 6, f"{len(f['unlabeled'])} form field(s) without a label ({where})")
        if f.get("lowContrast"):
            cap("colour", 6, f"{len(f['lowContrast'])} text(s) below WCAG AA contrast ({where})")
        if f.get("overflowX"):
            cap("layout", 6, f"page scrolls sideways by {f['overflowX']} px ({where})")
        if f.get("clipped"):
            cap("layout", 6, f"{len(f['clipped'])} text(s) cut off ({where})")
        if f.get("smallText"):
            cap("type", 6, f"{len(f['smallText'])} text(s) under 12 px ({where})")
    return caps


def main():
    ap = argparse.ArgumentParser(description="Total an app-ui-taste review.")
    ap.add_argument("scores")
    ap.add_argument("--audit")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    try:
        data = json.load(open(a.scores))
        scores = {}
        for key, _ in CRITERIA:
            v = data[key]
            if not isinstance(v, (int, float)) or not 0 <= v <= 10:
                raise ValueError(f"{key} must be a number from 0 to 10, got {v!r}")
            scores[key] = float(v)
        report = json.load(open(a.audit)) if a.audit else []
    except (OSError, json.JSONDecodeError, KeyError, ValueError) as e:
        print(f"Bad input: {e}. Expected keys: {', '.join(k for k, _ in CRITERIA)}", file=sys.stderr)
        return 2

    caps = caps_from_audit(report)
    final = {}
    for key, _ in CRITERIA:
        final[key] = min(scores[key], caps[key][0]) if key in caps else scores[key]
    total = round(sum(final.values()), 1)
    low = [k for k, v in final.items() if v < FLOOR]
    ready = total >= BAR and not low

    if a.json:
        print(json.dumps({"total": total, "ready": ready, "scores": final,
                          "caps": {k: {"max": v[0], "why": v[1]} for k, v in caps.items()},
                          "below_floor": low}, indent=2))
    else:
        notes = data.get("notes", {}) or {}
        for key, name in CRITERIA:
            capped = f"  (capped from {scores[key]:g}: {caps[key][1]})" if key in caps and caps[key][0] < scores[key] else ""
            note = f"  - {notes[key]}" if notes.get(key) else ""
            print(f"  {name:<26}{final[key]:>4g}/10{capped}{note}")
        print(f"\nTotal: {total:g}/100")
        if ready:
            print("READY: 85 or more, no criterion below 7.")
        else:
            why = []
            if total < BAR:
                why.append(f"total under {BAR}")
            if low:
                why.append("below 7: " + ", ".join(dict(CRITERIA)[k] for k in low))
            print("NOT READY: " + "; ".join(why) + ".")
    return 0 if ready else 1


if __name__ == "__main__":
    sys.exit(main())
