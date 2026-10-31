#!/usr/bin/env python3
"""Downloads real-life stock photos (and Pixabay clips) for a reel, with a credits file.

  python3 videos/stock.py "delivery rider india" videos/blinkit/stock [--n 6] [--video]

Sources: Pixabay when PIXABAY_API_KEY is set (photos, or clips with --video; free for
commercial use, no credit needed), otherwise Openverse (no key; only licences that allow
commercial use and changes). Every file is listed in OUT_DIR/credits.json with its source,
creator and licence, so captions can credit the ones whose licence asks for it.
"""
import argparse
import json
import os
import urllib.parse
import urllib.request

UA = {"User-Agent": "moneymoments-media/1.0"}


def fetch_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        return json.load(r)


def pixabay(query, n, video):
    key = os.environ["PIXABAY_API_KEY"]
    base = "https://pixabay.com/api/videos/" if video else "https://pixabay.com/api/"
    q = {"key": key, "q": query, "per_page": max(n, 3), "safesearch": "true"}
    if not video:
        q.update(image_type="photo", orientation="horizontal")
    for h in fetch_json(base + "?" + urllib.parse.urlencode(q))["hits"][:n]:
        url = (h["videos"].get("large") or h["videos"]["medium"])["url"] if video else h["largeImageURL"]
        yield {"url": url, "page": h["pageURL"], "creator": h["user"], "license": "Pixabay Content License",
               "credit_required": False, "source": "pixabay"}


def openverse(query, n):
    q = {"q": query, "page_size": n * 2, "license_type": "commercial,modification", "aspect_ratio": "wide"}
    for r in fetch_json("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(q))["results"][:n]:
        yield {"url": r["url"], "page": r["foreign_landing_url"], "creator": r.get("creator") or "unknown",
               "license": f"CC {r['license'].upper()} {r.get('license_version') or ''}".strip(),
               "credit_required": r["license"] != "cc0" and r["license"] != "pdm", "source": "openverse"}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("query")
    ap.add_argument("out_dir")
    ap.add_argument("--n", type=int, default=6)
    ap.add_argument("--video", action="store_true", help="clips instead of photos (Pixabay only)")
    a = ap.parse_args()
    if a.video and "PIXABAY_API_KEY" not in os.environ:
        raise SystemExit("--video needs PIXABAY_API_KEY")
    items = pixabay(a.query, a.n, a.video) if "PIXABAY_API_KEY" in os.environ else openverse(a.query, a.n)

    os.makedirs(a.out_dir, exist_ok=True)
    credits_path = os.path.join(a.out_dir, "credits.json")
    credits = json.load(open(credits_path)) if os.path.exists(credits_path) else {}
    slug = "-".join(a.query.lower().split())[:30]
    for i, it in enumerate(items, 1):
        ext = os.path.splitext(urllib.parse.urlparse(it["url"]).path)[1].lower() or (".mp4" if a.video else ".jpg")
        name = f"{slug}-{i}{ext}"
        try:
            with urllib.request.urlopen(urllib.request.Request(it["url"], headers=UA), timeout=60) as r, \
                    open(os.path.join(a.out_dir, name), "wb") as f:
                f.write(r.read())
        except OSError as e:
            print("skipped", it["url"], e)
            continue
        credits[name] = {**it, "query": a.query}
        print(name, it["license"], "by", it["creator"])
    json.dump(credits, open(credits_path, "w"), indent=2)


if __name__ == "__main__":
    main()
