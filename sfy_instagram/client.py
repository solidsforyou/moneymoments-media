"""Thin wrapper over graph.instagram.com for profile, media, insights and publishing."""

import time

import requests

GRAPH = "https://graph.instagram.com"

MEDIA_FIELDS = "id,caption,media_type,media_product_type,media_url,permalink,timestamp,like_count,comments_count"
# Metrics valid for both feed posts and reels.
MEDIA_METRICS = "views,reach,likes,comments,shares,saved,total_interactions"


class InstagramAPIError(RuntimeError):
    pass


class InstagramClient:
    def __init__(self, access_token: str, user_id: str, api_version: str = "v24.0",
                 session: requests.Session | None = None):
        self.token = access_token
        self.user_id = user_id
        self.base = f"{GRAPH}/{api_version}"
        self.http = session or requests.Session()

    def _request(self, method: str, path: str, **params) -> dict:
        params["access_token"] = self.token
        kwargs = {"params": params} if method == "GET" else {"data": params}
        resp = self.http.request(method, f"{self.base}/{path}", timeout=60, **kwargs)
        data = resp.json()
        if resp.status_code >= 400 or "error" in data:
            raise InstagramAPIError(data.get("error", data))
        return data

    # --- Read ---

    def profile(self) -> dict:
        return self._request("GET", "me", fields="user_id,username,name,account_type,"
                                                  "followers_count,follows_count,media_count")

    def media(self, limit: int = 25) -> list[dict]:
        return self._request("GET", f"{self.user_id}/media", fields=MEDIA_FIELDS, limit=limit)["data"]

    def media_insights(self, media_id: str, metrics: str = MEDIA_METRICS) -> dict:
        data = self._request("GET", f"{media_id}/insights", metric=metrics)["data"]
        return {m["name"]: m["values"][0]["value"] for m in data}

    def account_insights(self, metrics: str = "reach,views,accounts_engaged,total_interactions,follows_and_unfollows",
                         period: str = "day") -> dict:
        data = self._request("GET", f"{self.user_id}/insights", metric=metrics,
                             period=period, metric_type="total_value")["data"]
        return {m["name"]: m.get("total_value", {}).get("value") for m in data}

    def publishing_limit(self) -> dict:
        return self._request("GET", f"{self.user_id}/content_publishing_limit",
                             fields="config,quota_usage")["data"][0]

    # --- Publish (container -> wait -> publish) ---

    def publish_image(self, image_url: str, caption: str = "") -> str:
        container = self._request("POST", f"{self.user_id}/media", image_url=image_url, caption=caption)["id"]
        return self._publish(container)

    def publish_reel(self, video_url: str, caption: str = "", cover_url: str | None = None,
                     share_to_feed: bool = True) -> str:
        params = {"media_type": "REELS", "video_url": video_url, "caption": caption,
                  "share_to_feed": str(share_to_feed).lower()}
        if cover_url:
            params["cover_url"] = cover_url
        container = self._request("POST", f"{self.user_id}/media", **params)["id"]
        return self._publish(container)

    def wait_until_ready(self, container_id: str, timeout: int = 600, interval: int = 10) -> None:
        deadline = time.time() + timeout
        while True:
            status = self._request("GET", container_id, fields="status_code,status")
            code = status.get("status_code")
            if code in ("FINISHED", "PUBLISHED"):
                return
            if code in ("ERROR", "EXPIRED"):
                raise InstagramAPIError(f"Container {container_id} {code}: {status.get('status')}")
            if time.time() > deadline:
                raise InstagramAPIError(f"Container {container_id} not ready after {timeout}s ({code})")
            time.sleep(interval)

    def _publish(self, container_id: str) -> str:
        self.wait_until_ready(container_id)
        return self._request("POST", f"{self.user_id}/media_publish", creation_id=container_id)["id"]
