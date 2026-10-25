# Instagram API: status (25 Oct 2026)

Account: @unicornkahisab (Professional, Digital creator, public).
Meta app: "UKH Publisher", use case "Manage messaging & content on
Instagram" (Instagram API with Instagram Login), Development mode.

Done by the founder:
- OAuth redirect URI `https://localhost/` saved.
- @unicornkahisab added as Instagram tester and invite accepted.
- Permissions ready for testing: instagram_business_basic,
  instagram_business_content_publish, instagram_business_manage_comments,
  instagram_business_manage_insights, instagram_business_manage_messages.
- Access token generated in the dashboard and saved, with the app ID,
  app secret and redirect URI, as environment secrets:
  `IG_ACCESS_TOKEN`, `IG_APP_ID`, `IG_APP_SECRET`, `IG_REDIRECT_URI`.
  They reach new sessions only. Never print them or paste them in chat.

Verified 25 Oct 2026 (read-only): API returns username unicornkahisab,
account_type MEDIA_CREATOR, user_id 17841423062814788; publishing quota
100 posts per 24 hours, 0 used. The secrets also reach the current session.

Next:
1. Read-only check, no posting:
   `curl -s "https://graph.instagram.com/v24.0/me?fields=user_id,username,account_type&access_token=$IG_ACCESS_TOKEN"`
   should return username unicornkahisab. Don't echo the token.
2. The client code is on branch `claude/solids-instagram-api-setup-w33sos`
   (`sfy_instagram/`). It expects a token file from its `login` command;
   teach it to use `IG_ACCESS_TOKEN` when set.
3. Dashboard tokens last about 60 days; refresh before then
   (`refresh_access_token` endpoint) and record the expiry date here.
4. Before any automatic posting: check whether the API can set Meta's AI
   label. Until then the founder posts by hand with the label on.
5. Publishing needs the video at a public HTTPS URL Instagram can fetch.
