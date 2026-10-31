# GoodGuy video workflow: two Claudes, one video

How OpenPrep videos get made. Every video is GoodGuy (the mascot, a 3D character) standing
beside a TV. The TV plays animated cards about the topic, and the camera moves between GoodGuy
and the screen. Two Claude Code sessions build each video side by side, each owning one layer,
and a shared kit lets their work snap together.

This sits on top of the video workflow in `.claude/skills/master/workflows/video.md`. That
workflow still applies: careful brief, taste review, harsh buyer review, audio review, quality
bar. This file only adds how the work is split.

## The idea in one picture

```
                    ┌──────────── shared kit (reused by every video) ────────────┐
                    │ GoodGuy model, gestures, mouth shapes, personality          │
                    │ the set: room, TV, camera rig                               │
                    │ screen archetypes: one beautiful template per video type    │
                    └─────────────────────────────────────────────────────────────┘
                                              │
  1 Lead: brief → script → voiceover → word timings → timeline.json (frozen)
                                              │
             ┌────────────────────────────────┴───────────────────────────────┐
             ▼                                                                ▼
  2A Claude A: GoodGuy                                          2B Claude B: Screen
     gestures, lip-sync to the voiceover,                          picks the archetype, fills it,
     where he looks, camera moves                                  animates the cards on the beats,
     → guy/performance.json                                        checks every number in code
                                                                   → screen/screen.html
             └────────────────────────────────┬───────────────────────────────┘
                                              ▼
  3 Merge: the set loads the screen inside the TV → one render → sound mix
                                              ▼
  4 Review (video workflow stages 5–8) → fixes → final.mp4
                                              ▼
  5 Anything new (a gesture, an archetype) goes back into the kit
```

## Who does what

| Role | Owns | Never touches |
|---|---|---|
| **Lead** (Claude A doubles as lead) | The brief, script, voiceover, `timeline.json`, the merge, the final review and sign-off | Nothing is off-limits, but it changes the timeline only before the split or with Claude B's agreement |
| **Claude A: GoodGuy** | `guy/`: GoodGuy's performance (gestures, mouth, eyes, body), the camera, the set | Anything inside `screen/` |
| **Claude B: Screen** | `screen/`: the TV content, built from an archetype | Anything inside `guy/`, the set, the camera |
| **You** (the founder) | Approve the script before the voiceover is made, and approve the final video | |

The two Claudes talk only through files: the frozen `timeline.json`, and an append-only
`requests.md` in the episode folder for anything one needs from the other ("hold the
equation on screen 1 second longer at beat 7"). Neither edits the other's folder.

## The kit (built once, reused forever)

```
videos/goodguy/
  WORKFLOW.md                    this file
  kit/
    personality.md               who GoodGuy is and how he talks (below)
    style.md                     subject colours, fonts, motion vocabulary, sound palette
    goodguy/                     the character: model, gesture library, mouth shapes
      gestures.json              named moves: point-at-screen, think, celebrate, careful, wave…
    set/
      set.html                   the room, the TV and the camera rig; renders with renderFrame(t)
    archetypes/
      <archetype-id>/
        screen.html              the most complex, beautiful version of this video type
        params.schema.json       what changes from video to video
        example.params.json      the reference video's values
  episodes/
    <episode-id>/
      brief.md  script.md  vo.mp3  vo.alignment.json  timeline.json  requests.md
      guy/      performance.json, preview renders
      screen/   params.json, screen.html, preview renders
      out/      draft.mp4, final.mp4, review.md
```

Reusable pieces that are also useful outside OpenPrep (GoodGuy renders, the set, sound beds)
get a row in `assets/README.md`, as the project's CLAUDE.md asks.

### GoodGuy's personality (`kit/personality.md`)

GoodGuy is there to help you. He's fun, gets to the point, cares about you and thinks about
you. He feels like a smart, friendly senior, never a kids' cartoon, and never preachy. He
encourages without guilt-tripping. He's clearly a character, so nobody mistakes him for a real
teacher. Every script is read against this before the voiceover is made.

### Screen archetypes

One archetype per type of video, for example:

| Archetype | Used for |
|---|---|
| `calc-walkthrough` | A calculation solved step by step (Quant) |
| `concept-cards` | One idea explained in 3–5 cards |
| `formula-reveal` | A formula built term by term, then applied |
| `geometry-figure` | A figure drawn, labelled and reasoned about |
| `seating-arrangement` | A DILR puzzle solved as a game board |
| `table-chart-set` | A DILR data set read and solved |
| `rc-breakdown` | A reading-comprehension passage, mapped and questioned (Verbal) |
| `para-jumble` | Sentences dragged into order |
| `news-explainer` | A current-affairs story with its source on screen |
| `quiz-check` | A practice question, pause, then the answer |

Each archetype is built once, at the highest quality we can make, then reused: the next
video of that type changes only `params.json`. That's where the roughly 90% cost cut comes
from. Each archetype has a few dials (layout variants, transition set, colour moment) so a
series doesn't look like photocopies. Subject colours come from `style.md`: Quant in cobalt
and electric blue, Verbal clean and white, Reasoning like a video game.

## Step 1: Lead prepares the episode (before the split)

1. **Brief.** Write `brief.md` as the video workflow's stage 2 asks: goal, audience, subject,
   archetype, length, language, which reel or long video it is.
2. **Script.** Write `script.md` with numbered lines (`L01`, `L02`, …). Mark each line with
   its focus: `guy` (GoodGuy talking to you) or `screen` (watch the TV). Run it through the
   humanizer skill (channel `script`) and against `personality.md`. **Every number, answer
   and step is computed in code and checked before anything else happens.** A wrong answer
   in a teaching video is the most expensive mistake this workflow can make.
3. **You approve the script.**
4. **Voiceover.** Generate `vo.mp3` with ElevenLabs, and save word-level timings in
   `vo.alignment.json`. Use the timestamp output, or a forced aligner if the API call doesn't
   return them.
5. **Timeline.** Build `timeline.json` from the script and the alignment, in code. Beats are
   keyed by script line, so a new language only re-times them:

```json
{
  "episode": "quant-percentages-01",
  "fps": 30, "width": 1080, "height": 1920, "duration": 62.4,
  "subject": "quant", "archetype": "calc-walkthrough", "language": "hinglish",
  "screen": { "width": 1600, "height": 900 },
  "beats": [
    { "id": "B01", "line": "L01", "start": 0.0,  "end": 3.2,  "focus": "guy",    "shot": "wide",         "intent": "hook" },
    { "id": "B02", "line": "L02", "start": 3.2,  "end": 9.8,  "focus": "screen", "shot": "zoom-screen",  "intent": "show question" },
    { "id": "B03", "line": "L03", "start": 9.8,  "end": 18.1, "focus": "screen", "shot": "zoom-screen",  "intent": "step 1" },
    { "id": "B04", "line": "L04", "start": 18.1, "end": 21.0, "focus": "guy",    "shot": "zoom-guy",     "intent": "careful moment" }
  ]
}
```

6. **Freeze the timeline.** Commit it. From here on, its times change only through
   `requests.md` with both Claudes agreeing, because both layers are timed against it.

## Step 2A: Claude A builds GoodGuy

Input: `timeline.json`, `vo.mp3`, `vo.alignment.json`, the kit. Output: `guy/performance.json`
and a preview.

1. **Mouth.** Mouth shapes per frame from the voiceover audio, using a lip-sync tool or the
   alignment. Keep GoodGuy's mouth style simple so every language lip-syncs automatically.
2. **Gestures.** Pick from `gestures.json` per beat, matched to `intent` (point at the screen
   when focus moves there, think before a tricky step, celebrate an answer, "careful" on traps).
   No new gesture unless the library truly lacks one; a new one goes into the kit.
3. **Eyes and body.** Look at the viewer when focus is `guy`, glance at the TV when it's
   `screen`, small idle motion so he never freezes.
4. **Camera.** One move per beat from the shot: `wide`, `zoom-screen`, `zoom-guy`. Ease
   every move in and out, cut on the voice's rhythm, and never move during a number the
   viewer needs to read.
5. **Preview.** Render the set with a placeholder TV (grey, showing beat ids and timecode) and
   check lip-sync and timing before handing over.

`performance.json` lists, per frame range, the gesture, mouth cue, look target and camera
transform. The set's `renderFrame(t)` reads it, so the same time always gives the same frame.

## Step 2B: Claude B builds the screen

Input: `timeline.json`, the archetype, the script. Output: `screen/params.json`,
`screen/screen.html` and a preview.

1. **Fill the archetype.** Copy `kit/archetypes/<id>/screen.html`, write `params.json` against
   its schema: the question, steps, figure, cards, colours from the subject.
2. **Animate on the beats.** Every card change lands on a beat start from `timeline.json`. One
   idea per card, one visual change per spoken line, readable on a phone.
3. **Check every number in code.** Every value, step and answer shown on screen is computed
   by a script and compared with `script.md`. Any mismatch stops the episode and goes back to
   the lead.
4. **The contract.** `screen.html` exposes `window.renderScreen(t)` and draws at exactly
   `screen.width × screen.height`. Times are the episode's own clock, deterministic, with no
   CSS animations or timers, the same rules as `renderFrame(t)`.
5. **Preview.** Render the screen alone at TV size and inspect it.

## Step 3: Merge

The lead loads `screen/screen.html` inside the TV element of `kit/set/set.html`. On every
frame, `renderFrame(t)` calls `renderScreen(t)` first, then applies GoodGuy's performance and
the camera transform to the whole set. So the screen zooms with the camera naturally and
there's only one render:

```
node videos/render.cjs videos/goodguy/kit/set/set.html?episode=<episode-id> \
  videos/goodguy/episodes/<episode-id>/out/draft.mp4 --fps 30 --width 1080 --height 1920 --audio mix.wav
```

Sound: voiceover plus effects and a music bed from the video workflow's sound library, mixed
with `sfx_mix.py` to -14 LUFS.

## Step 4: Review and finish

Run stages 5 to 8 of the video workflow on `draft.mp4`: harsh buyer review, motion-design
taste review, the fix list, careful review, and up to three regeneration rounds until the
quality bar is met. The reviewer files each fix to the right owner: GoodGuy and camera fixes
to Claude A, screen fixes to Claude B, timing fixes to the lead. You approve `final.mp4`.

## Step 5: Feed the kit

Anything new that worked, such as a gesture, a camera move, an archetype dial or a sound cue,
goes back into the kit, so the next video is cheaper. The first video of each archetype is the
expensive one; later ones mostly change `params.json` and the voiceover.

## Languages (Hinglish first, English next, regional packages later)

Same episode, new language:

1. Translate `script.md` line by line (same line ids), checked by a native speaker once per
   archetype, especially maths terms.
2. New voiceover and alignment, then re-time `timeline.json` from it in code.
3. Claude A redoes only the mouth cues. Claude B swaps only the on-screen text strings.
4. Re-render.

## Running the two sessions

- Open two Claude Code sessions in this repo. Give each its role prompt below, plus the episode
  id.
- The lead finishes step 1 and commits the frozen timeline before either session starts step 2.
- Each session works only in its own folder and commits there, so their changes never collide.
- When both previews pass, the lead merges, renders and reviews.

**Claude A prompt:** "You are Claude A, GoodGuy's performer for episode `<id>`. Follow
`videos/goodguy/WORKFLOW.md` step 2A. Work only in `episodes/<id>/guy/` and the kit's GoodGuy
and set folders. The timeline is frozen; ask for changes in `requests.md`. Deliver
`performance.json` and a preview with a placeholder TV."

**Claude B prompt:** "You are Claude B, the screen animator for episode `<id>`. Follow
`videos/goodguy/WORKFLOW.md` step 2B. Work only in `episodes/<id>/screen/`. The timeline is
frozen; ask for changes in `requests.md`. Check every number in code. Deliver `screen.html`
exposing `renderScreen(t)` and a preview at TV size."
