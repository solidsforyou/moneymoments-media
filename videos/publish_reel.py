#!/usr/bin/env python3
"""Publishes a reel to the Instagram account behind IG_ACCESS_TOKEN.

  python3 videos/publish_reel.py VIDEO_URL CAPTION_FILE [--thumb-ms 2500] [--dry-run]
  python3 videos/publish_reel.py --publish CONTAINER_ID   (publish a container made by --dry-run)

VIDEO_URL must be a public HTTPS link Instagram can fetch. --dry-run creates and
processes the container but does not publish it. The token is never printed.
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

API = "https://graph.instagram.com/v24.0"
IG_USER = "17841423062814788"   # @unicornkahisab


def call(method, path, **params):
    token = os.environ["IG_ACCESS_TOKEN"]
    data = urllib.parse.urlencode(params).encode() if method == "POST" else None
    url = f"{API}/{path}" + ("" if method == "POST" else "?" + urllib.parse.urlencode(params))
    req = urllib.request.Request(url, data=data, method=method, headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"Instagram API error {e.code}: {e.read().decode()[:500]}")


def publish(cid):
    m = call("POST", f"{IG_USER}/media_publish", creation_id=cid)
    info = call("GET", m["id"], fields="permalink,timestamp")
    print("published", m["id"], info.get("permalink"), info.get("timestamp"))


def main():
    if len(sys.argv) == 3 and sys.argv[1] == "--publish":
        return publish(sys.argv[2])
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    video_url, caption_file = sys.argv[1], sys.argv[2]
    dry = "--dry-run" in sys.argv
    extra = {}
    if "--thumb-ms" in sys.argv:   # frame used as the cover
        extra["thumb_offset"] = sys.argv[sys.argv.index("--thumb-ms") + 1]
    caption = open(caption_file, encoding="utf-8").read().strip()
    c = call("POST", f"{IG_USER}/media", media_type="REELS", video_url=video_url, caption=caption, share_to_feed="true", **extra)
    cid = c["id"]
    print("container", cid)
    for _ in range(60):   # up to 10 minutes
        s = call("GET", cid, fields="status_code,status")
        if s.get("status_code") == "FINISHED":
            break
        if s.get("status_code") in ("ERROR", "EXPIRED"):
            sys.exit(f"processing failed: {s}")
        time.sleep(10)
    else:
        sys.exit("processing timed out")
    print("processed")
    if dry:
        print("dry run: not published")
        return
    publish(cid)


if __name__ == "__main__":
    main()
