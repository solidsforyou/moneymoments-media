import os
from dataclasses import dataclass

from dotenv import load_dotenv

SCOPES = [
    "instagram_business_basic",
    "instagram_business_content_publish",
    "instagram_business_manage_insights",
    "instagram_business_manage_comments",
]


@dataclass(frozen=True)
class Config:
    app_id: str
    app_secret: str
    redirect_uri: str
    api_version: str
    token_file: str

    @classmethod
    def from_env(cls) -> "Config":
        load_dotenv()
        missing = [k for k in ("IG_APP_ID", "IG_APP_SECRET", "IG_REDIRECT_URI") if not os.getenv(k)]
        if missing:
            raise SystemExit(f"Missing env vars: {', '.join(missing)} (see .env.example)")
        return cls(
            app_id=os.environ["IG_APP_ID"],
            app_secret=os.environ["IG_APP_SECRET"],
            redirect_uri=os.environ["IG_REDIRECT_URI"],
            api_version=os.getenv("IG_API_VERSION", "v24.0"),
            token_file=os.getenv("IG_TOKEN_FILE", ".sfy_token.json"),
        )
