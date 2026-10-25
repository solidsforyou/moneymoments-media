from unittest.mock import MagicMock

import pytest

from sfy_instagram import InstagramAPIError, InstagramClient
from sfy_instagram.auth import extract_code


def _resp(data, status=200):
    r = MagicMock(status_code=status)
    r.json.return_value = data
    return r


def _client(responses):
    session = MagicMock()
    session.request.side_effect = [_resp(d) for d in responses]
    return InstagramClient("tok", "123", session=session), session


def test_publish_image_waits_then_publishes(monkeypatch):
    monkeypatch.setattr("time.sleep", lambda s: None)
    c, s = _client([{"id": "c1"}, {"status_code": "IN_PROGRESS"}, {"status_code": "FINISHED"}, {"id": "m1"}])
    assert c.publish_image("https://x/img.jpg", "hi") == "m1"
    last = s.request.call_args_list[-1]
    assert last.args == ("POST", "https://graph.instagram.com/v24.0/123/media_publish")
    assert last.kwargs["data"]["creation_id"] == "c1"


def test_container_error_raises():
    c, _ = _client([{"id": "c1"}, {"status_code": "ERROR", "status": "bad video"}])
    with pytest.raises(InstagramAPIError, match="bad video"):
        c.publish_reel("https://x/v.mp4")


def test_api_error_raises():
    c, _ = _client([{"error": {"message": "Invalid token"}}])
    with pytest.raises(InstagramAPIError):
        c.profile()


def test_media_insights_flattens():
    c, _ = _client([{"data": [{"name": "views", "values": [{"value": 42}]}]}])
    assert c.media_insights("m1") == {"views": 42}


def test_extract_code():
    assert extract_code("https://localhost/?code=abc123#_") == "abc123"
    assert extract_code("abc123#_") == "abc123"
