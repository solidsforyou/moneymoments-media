#!/usr/bin/env python3
"""Check store images (icons, feature graphic, screenshots) before upload.

Expects this folder layout (create it in the app repo, for example store/):

  store/play/icon.png                 512x512 PNG, max 1024 KB
  store/play/feature-graphic.png|jpg  1024x500, JPEG or PNG without alpha
  store/play/phone/*.png|jpg          2 to 8 screenshots
  store/play/tablet/*.png|jpg         optional (tablets and Chromebooks: 4 or more)
  store/appstore/icon.png             optional here (the build carries it): 1024x1024, no alpha
  store/appstore/iphone/*.png|jpg     1 to 10 screenshots at one accepted iPhone size
  store/appstore/ipad/*.png|jpg       required only with --ipad

Rules checked (Google Play and App Store Connect, as of October 2026):
  Play icon 512x512 32-bit PNG <= 1024 KB; feature graphic 1024x500 no
  alpha; screenshots JPEG or 24-bit PNG without alpha, each side 320 to
  3840 px, long side at most twice the short side, at least 2 in total,
  at most 8 per device type (recommended: at least 4 phone screenshots,
  1080x1920 or larger). App Store screenshots at an accepted size:
  6.9" iPhone 1320x2868, 1290x2796 or 1260x2736 (or 6.5" 1284x2778,
  1242x2688), either orientation; 13" iPad 2064x2752 or 2048x2732; all in
  one set the same size; PNG or JPEG; no alpha recommended.

Usage:
  python3 check_assets.py STORE_DIR [--ipad] [--json]

Exit code 1 when any error is found, 0 otherwise.
"""

import argparse
import json
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow is needed: pip install pillow", file=sys.stderr)
    sys.exit(2)

IMG_EXT = {".png", ".jpg", ".jpeg"}
IPHONE_SIZES = {(1320, 2868): '6.9"', (1290, 2796): '6.9"', (1260, 2736): '6.9"',
                (1284, 2778): '6.5"', (1242, 2688): '6.5"'}
IPAD_SIZES = {(2064, 2752): '13"', (2048, 2732): '13"'}


def info(path: Path):
    with Image.open(path) as im:
        has_alpha = im.mode in ("RGBA", "LA", "PA") or (im.mode == "P" and "transparency" in im.info)
        return {"w": im.width, "h": im.height, "format": im.format, "mode": im.mode,
                "alpha": has_alpha, "kb": round(path.stat().st_size / 1024)}


def images(folder: Path):
    if not folder.is_dir():
        return []
    return sorted(p for p in folder.iterdir() if p.suffix.lower() in IMG_EXT)


def find(folder: Path, stem: str):
    for ext in (".png", ".jpg", ".jpeg"):
        p = folder / f"{stem}{ext}"
        if p.exists():
            return p
    return None


def main():
    ap = argparse.ArgumentParser(description="Check store images before upload.")
    ap.add_argument("store_dir")
    ap.add_argument("--ipad", action="store_true", help="the iPhone app also runs on iPad")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    root = Path(a.store_dir)
    issues, checked = [], []

    def err(where, msg):
        issues.append(("error", where, msg))

    def warn(where, msg):
        issues.append(("warning", where, msg))

    def load(p: Path):
        try:
            i = info(p)
            checked.append((str(p.relative_to(root)), f"{i['w']}x{i['h']} {i['format']} {i['mode']} {i['kb']} KB"))
            return i
        except Exception as e:  # unreadable or not an image
            err(str(p.relative_to(root)), f"can't open as an image: {e}")
            return None

    play, apple = root / "play", root / "appstore"
    if not play.is_dir() and not apple.is_dir():
        err(str(root), "no play/ or appstore/ folder (see the layout in this script's help)")

    if play.is_dir():
        icon = play / "icon.png"
        if not icon.exists():
            err("play/icon.png", "missing (512x512 PNG)")
        elif (i := load(icon)):
            if (i["w"], i["h"]) != (512, 512):
                err("play/icon.png", f"{i['w']}x{i['h']}, must be 512x512")
            if i["format"] != "PNG":
                err("play/icon.png", f"{i['format']}, must be PNG")
            if i["kb"] > 1024:
                err("play/icon.png", f"{i['kb']} KB, max 1024 KB")
            if i["mode"] != "RGBA":
                warn("play/icon.png", f"mode {i['mode']}: Play asks for a 32-bit PNG (RGBA)")
        fg = find(play, "feature-graphic")
        if not fg:
            err("play/feature-graphic", "missing (1024x500 JPEG or PNG without alpha)")
        elif (i := load(fg)):
            if (i["w"], i["h"]) != (1024, 500):
                err(fg.name, f"{i['w']}x{i['h']}, must be 1024x500")
            if i["alpha"]:
                err(fg.name, "has an alpha channel: save as JPEG or 24-bit PNG")
        total = 0
        for device in ("phone", "tablet"):
            shots = images(play / device)
            total += len(shots)
            if len(shots) > 8:
                err(f"play/{device}", f"{len(shots)} screenshots, max 8")
            if device == "phone" and 0 < len(shots) < 4:
                warn("play/phone", f"{len(shots)} screenshots: Play recommends at least 4")
            if device == "tablet" and 0 < len(shots) < 4:
                warn("play/tablet", "tablets and Chromebooks need at least 4 to be shown there")
            for p in shots:
                i = load(p)
                if not i:
                    continue
                where = f"play/{device}/{p.name}"
                lo, hi = sorted((i["w"], i["h"]))
                if lo < 320 or hi > 3840:
                    err(where, f"{i['w']}x{i['h']}: each side must be 320 to 3840 px")
                if hi > 2 * lo:
                    err(where, f"{i['w']}x{i['h']}: the long side is more than twice the short side")
                if i["alpha"]:
                    err(where, "has an alpha channel: save as JPEG or 24-bit PNG")
                if device == "phone" and lo < 1080:
                    warn(where, f"{i['w']}x{i['h']}: 1080 px or more on the short side is recommended")
        if total < 2:
            err("play", f"{total} screenshots in total, at least 2 needed")

    if apple.is_dir():
        icon = apple / "icon.png"
        if icon.exists() and (i := load(icon)):
            if (i["w"], i["h"]) != (1024, 1024):
                err("appstore/icon.png", f"{i['w']}x{i['h']}, must be 1024x1024")
            if i["alpha"]:
                err("appstore/icon.png", "has an alpha channel: App Store icons can't be transparent")
        sets = [("iphone", IPHONE_SIZES, True), ("ipad", IPAD_SIZES, a.ipad)]
        for device, sizes, required in sets:
            shots = images(apple / device)
            if required and not shots:
                err(f"appstore/{device}", "missing: at least 1 screenshot needed")
            if len(shots) > 10:
                err(f"appstore/{device}", f"{len(shots)} screenshots, max 10")
            seen = set()
            for p in shots:
                i = load(p)
                if not i:
                    continue
                where = f"appstore/{device}/{p.name}"
                size = (min(i["w"], i["h"]), max(i["w"], i["h"]))
                if size not in sizes:
                    accepted = ", ".join(f"{w}x{h} ({n})" for (w, h), n in sizes.items())
                    err(where, f"{i['w']}x{i['h']} isn't an accepted size: {accepted}, portrait or landscape")
                else:
                    seen.add((i["w"], i["h"]))
                    if device == "iphone" and sizes[size] == '6.5"':
                        warn(where, '6.5" size: check App Store Connect still accepts it without a 6.9" set')
                if i["alpha"]:
                    warn(where, "has an alpha channel: flatten it to be safe")
            if len(seen) > 1:
                err(f"appstore/{device}", f"mixed sizes in one set: {sorted(seen)}")

    errors = [x for x in issues if x[0] == "error"]
    if a.json:
        print(json.dumps({"ok": not errors, "checked": [{"file": f, "info": d} for f, d in checked],
                          "issues": [{"severity": s, "where": w, "issue": m} for s, w, m in issues]}, indent=2))
    else:
        for f, d in checked:
            print(f"  {f:<40}{d}")
        print()
        for s, w, m in sorted(issues, key=lambda x: x[0] != "error"):
            print(f"  {s.upper():<8}{w}: {m}")
        print(("\nErrors found: fix them before uploading." if errors else "\nNo errors.")
              + (f" {len(issues) - len(errors)} warning(s)." if len(issues) > len(errors) else ""))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
