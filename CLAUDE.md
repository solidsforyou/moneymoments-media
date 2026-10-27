# moneymoments-media

Instagram page Unicorn ka Hisab (@unicornkahisab): motion-graphics reels about Indian
startups, built and posted from this repo. README.md covers the Instagram API client.

## SOLIDS FOR YOU Master is on

The SOLIDS FOR YOU skills are copied into `.claude/skills/` (from
github.com/Founderwithabs/SOLIDSFORYOU, MIT, see `.claude/skills/SOLIDSFORYOU-LICENSE.md`),
so they also work in cloud sessions where the plugins aren't installed.

- Before the first task in a session, read `.claude/skills/master/toolbox.md` (once) and
  route every task as it says. Video work follows `.claude/skills/master/workflows/video.md`.
- Humanizer is always on for anything going public (captions, scripts, bios, replies).
- Copied by relevance: master, careful-mode, economy-mode, harsh-buyer-review,
  motion-design-taste, audio-review, social-media, humanizer, ai-visuals,
  competitor-research, transcriber. Left out: clipper (no clipping on this page),
  linkedin, ecom. If a head needs one of those, follow its prompt from the
  SOLIDS FOR YOU repo as `master.md` section 1 describes.
- To update the copies, re-copy `plugins/<tool>/skills/<tool>/` from that repo.

## Memory

`memory/memory.csv` holds the founder's facts, decisions and preferences. Before asking
the founder anything, run
`python3 .claude/skills/economy-mode/scripts/memory.py --file memory/memory.csv pinned`
(and `search "key words"` as needed). Save new decisions with its `add` command.
