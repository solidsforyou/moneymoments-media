#!/usr/bin/env python3
"""OpenContentMachine planner: builds the posting calendar for every page.

Each page starts at one reel a day and adds one more every 4 days until it reaches its
target. Every reel gets a repost slot 90 days later, to be re-edited from its insights.

  python3 content/ocm/planner.py --start 2026-10-31 --days 14 --out content/ocm/calendar-14d.csv
  python3 content/ocm/planner.py --start 2026-10-31 --days 14 --summary
"""
import argparse, csv, datetime as dt, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
# posting times (IST) for up to 4 slots a day; spread so the API never bunches posts
SLOTS = ["08:30", "13:00", "18:30", "21:15"]


def per_day(page, day, ramp):
    n = ramp["start_per_day"] + ramp["step"] * (day // ramp["step_every_days"])
    return min(n, page["target_per_day"])


def plan(cfg, start, days):
    rows = []
    for page in cfg["pages"]:
        k = 0  # rotates through the page's pillars
        for d in range(days):
            date = start + dt.timedelta(days=d)
            for s in range(per_day(page, d, cfg["ramp"])):
                pillar = page["pillars"][k % len(page["pillars"])]; k += 1
                rid = f"{page['id']}-{date:%m%d}-{s + 1}"
                rows.append({
                    "id": rid, "date": date.isoformat(), "time_ist": SLOTS[s], "page": page["id"],
                    "app": page["app"], "pillar": pillar,
                    "source": f"clip of {page['clip_of']}" if page.get("clip_of") else "original",
                    "status": "to make",
                    "repost_on": (date + dt.timedelta(days=cfg["repost_after_days"])).isoformat(),
                })
    return sorted(rows, key=lambda r: (r["date"], r["time_ist"], r["page"]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", required=True)
    ap.add_argument("--days", type=int, default=14)
    ap.add_argument("--config", default=os.path.join(HERE, "pages.json"))
    ap.add_argument("--out")
    ap.add_argument("--summary", action="store_true")
    a = ap.parse_args()
    cfg = json.load(open(a.config))
    rows = plan(cfg, dt.date.fromisoformat(a.start), a.days)
    if a.out:
        with open(a.out, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0]))
            w.writeheader(); w.writerows(rows)
        print(f"wrote {a.out}: {len(rows)} reels")
    if a.summary or not a.out:
        by_day = {}
        for r in rows:
            by_day.setdefault(r["date"], {}).setdefault(r["page"], 0)
            by_day[r["date"]][r["page"]] += 1
        print("date        total  " + "  ".join(p["id"][:10].ljust(10) for p in cfg["pages"]))
        for d, m in by_day.items():
            print(f"{d}  {sum(m.values()):5}  " + "  ".join(str(m.get(p['id'], 0)).ljust(10) for p in cfg["pages"]))
        print(f"total reels: {len(rows)}; originals: {sum(r['source'] == 'original' for r in rows)}; clips: {sum(r['source'] != 'original' for r in rows)}")


if __name__ == "__main__":
    main()
