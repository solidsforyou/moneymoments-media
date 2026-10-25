"""OAuth flow for Instagram API with Instagram Login, plus long-lived token caching."""

import json
import os
import time
from urllib.parse import parse_qs, urlencode, urlparse

import requests

from .config import SCOPES, Config

AUTHORIZE_URL = "https://www.instagram.com/oauth/authorize"
SHORT_TOKEN_URL = "https://api.instagram.com/oauth/access_token"
GRAPH = "https://graph.instagram.com"

# Long-lived tokens last 60 days; refresh once fewer than this many seconds remain.
REFRESH_WINDOW = 7 * 24 * 3600


def authorize_url(cfg: Config, state: str = "sfy") -> str:
    params = {
        "client_id": cfg.app_id,
        "redirect_uri": cfg.redirect_uri,
        "response_type": "code",
        "scope": ",".join(SCOPES),
        "state": state,
        "enable_fb_login": "false",
    }
    return f"{AUTHORIZE_URL}?{urlencode(params)}"


def extract_code(redirected_url_or_code: str) -> str:
    """Accept either the raw code or the full URL Instagram redirected to."""
    value = redirected_url_or_code.strip()
    if value.startswith("http"):
        value = parse_qs(urlparse(value).query).get("code", [""])[0]
    # Instagram appends "#_" to the code in the redirect.
    return value.removesuffix("#_")


def _check(resp: requests.Response) -> dict:
    data = resp.json()
    if resp.status_code >= 400 or "error" in data or "error_type" in data:
        raise RuntimeError(f"Instagram auth error: {data}")
    return data


def exchange_code(cfg: Config, code: str) -> dict:
    """Code -> short-lived token (1h) -> long-lived token (60d). Saves and returns the token record."""
    short = _check(requests.post(SHORT_TOKEN_URL, data={
        "client_id": cfg.app_id,
        "client_secret": cfg.app_secret,
        "grant_type": "authorization_code",
        "redirect_uri": cfg.redirect_uri,
        "code": code,
    }, timeout=30))
    long = _check(requests.get(f"{GRAPH}/access_token", params={
        "grant_type": "ig_exchange_token",
        "client_secret": cfg.app_secret,
        "access_token": short["access_token"],
    }, timeout=30))
    record = _record(long, user_id=str(short["user_id"]))
    save_token(cfg, record)
    return record


def refresh(cfg: Config, record: dict) -> dict:
    data = _check(requests.get(f"{GRAPH}/refresh_access_token", params={
        "grant_type": "ig_refresh_token",
        "access_token": record["access_token"],
    }, timeout=30))
    new = _record(data, user_id=record["user_id"])
    save_token(cfg, new)
    return new


def _record(data: dict, user_id: str) -> dict:
    return {
        "access_token": data["access_token"],
        "user_id": user_id,
        "expires_at": int(time.time()) + int(data.get("expires_in", 0)),
    }


def save_token(cfg: Config, record: dict) -> None:
    with open(cfg.token_file, "w") as f:
        json.dump(record, f, indent=2)
    os.chmod(cfg.token_file, 0o600)


def load_token(cfg: Config, auto_refresh: bool = True) -> dict:
    if not os.path.exists(cfg.token_file):
        raise SystemExit("No token yet. Run: python -m sfy_instagram login")
    with open(cfg.token_file) as f:
        record = json.load(f)
    remaining = record["expires_at"] - time.time()
    if remaining <= 0:
        raise SystemExit("Token expired. Run: python -m sfy_instagram login")
    if auto_refresh and remaining < REFRESH_WINDOW:
        record = refresh(cfg, record)
    return record
