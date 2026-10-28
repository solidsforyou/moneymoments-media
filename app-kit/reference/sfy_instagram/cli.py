import argparse
import json

from . import auth
from .client import InstagramClient
from .config import Config


def _client(cfg: Config) -> InstagramClient:
    tok = auth.load_token(cfg)
    return InstagramClient(tok["access_token"], tok["user_id"], cfg.api_version)


def _print(obj) -> None:
    print(json.dumps(obj, indent=2, ensure_ascii=False))


def main(argv: list[str] | None = None) -> None:
    p = argparse.ArgumentParser(prog="sfy_instagram", description="Solids For You Instagram API tools")
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("login", help="Authorize the SFY Instagram account and cache a 60-day token")
    sub.add_parser("refresh", help="Refresh the cached long-lived token")
    sub.add_parser("me", help="Show account profile")
    m = sub.add_parser("media", help="List recent posts")
    m.add_argument("--limit", type=int, default=10)
    i = sub.add_parser("insights", help="Insights for a post/reel, or the account if no id given")
    i.add_argument("media_id", nargs="?")
    sub.add_parser("limit", help="Show content publishing quota usage (100 posts / 24h)")
    pi = sub.add_parser("publish-image", help="Publish a feed image from a public URL")
    pi.add_argument("url")
    pi.add_argument("--caption", default="")
    pr = sub.add_parser("publish-reel", help="Publish a reel from a public video URL")
    pr.add_argument("url")
    pr.add_argument("--caption", default="")
    pr.add_argument("--cover")
    pr.add_argument("--no-feed", action="store_true", help="Reels tab only, don't share to feed")
    args = p.parse_args(argv)

    cfg = Config.from_env()
    if args.cmd == "login":
        print("1. Open this URL logged in as the Solids For You Instagram account:\n")
        print(auth.authorize_url(cfg))
        print("\n2. Approve, then paste the full URL you were redirected to (or just the code):")
        record = auth.exchange_code(cfg, auth.extract_code(input("> ")))
        print(f"Saved long-lived token for user {record['user_id']} to {cfg.token_file}")
    elif args.cmd == "refresh":
        record = auth.refresh(cfg, auth.load_token(cfg, auto_refresh=False))
        print(f"Refreshed; expires_at={record['expires_at']}")
    elif args.cmd == "me":
        _print(_client(cfg).profile())
    elif args.cmd == "media":
        _print(_client(cfg).media(args.limit))
    elif args.cmd == "insights":
        c = _client(cfg)
        _print(c.media_insights(args.media_id) if args.media_id else c.account_insights())
    elif args.cmd == "limit":
        _print(_client(cfg).publishing_limit())
    elif args.cmd == "publish-image":
        print("Published media id:", _client(cfg).publish_image(args.url, args.caption))
    elif args.cmd == "publish-reel":
        media_id = _client(cfg).publish_reel(args.url, args.caption, args.cover, not args.no_feed)
        print("Published media id:", media_id)
