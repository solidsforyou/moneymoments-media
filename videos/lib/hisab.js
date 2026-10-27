// The Unicorn ka Hisab signature, as one continuous camera move (founder, 27 Oct 2026).
//
// The reel is a single horizontal world: scene i is a 1080x1920 panel at x = i * 1080.
// One Hisab line runs through the whole world and a ₹ coin rides it. The coin drops onto the
// line in the first frame, then never stops: it drifts slowly while a panel is on screen and
// rolls quickly into the next panel at each change. The camera keeps the coin dead centre, so
// the camera is always moving and nothing ever cuts.
//
// A scene file provides:
//   CUES    [[start, end], ...] in seconds, one per panel
//   SHAPES  one function per panel, (u, t) -> y, for u = 0..1 across that panel
//   panels  elements with class "panel" inside #world, in order
// and calls Hisab.frame(t) at the top of its renderFrame(t). Helpers: Hisab.lineAt(worldX, t),
// Hisab.place(el, panel, u, dy, t) to pin a label above the line, Hisab.coinX(t).
// Needs ../lib/motion.js (tween, ease, clamp, $) loaded first.

const Hisab = (() => {
  const W = 1080, H = 1920;
  const DRIFT = 46;        // px/s the coin (and camera) moves while a panel is on screen
  const BLEND = 0.42;      // s either side of a cue change for the roll into the next panel
  const R = 46;            // coin radius, for the roll angle
  let cfg = null;

  function init(o) {
    cfg = Object.assign({ coinY: -52, drop: { at: 0.0, dur: 0.5, from: 1100 }, endRise: 120, endScale: 1.4 }, o);
    document.querySelectorAll("#world .panel").forEach((p, i) => { p.style.left = `${i * W}px`; });
  }

  // Coin x in world space: a slow linear drift through each panel's centre, blended into the next.
  const lin = (i, t) => {
    const [a, b] = cfg.cues[i];
    return i * W + W / 2 + DRIFT * (t - (a + b) / 2);
  };
  function coinX(t) {
    const cues = cfg.cues, n = cues.length;
    let i = cues.findIndex(([a, b]) => t < b); if (i < 0) i = n - 1;
    let x = lin(i, t);
    const last = n - 1;
    if (i === last) {   // end card: ease to a stop at the panel centre
      const [a, b] = cues[last];
      const from = lin(last, a + BLEND);
      x = t < a + BLEND ? x : from + (last * W + W / 2 - from) * ease.outCubic(clamp((t - a - BLEND) / 0.8, 0, 1));
    }
    // blend with the neighbouring panel's drift around each cue change (continuous speed)
    if (i > 0) { const a = cues[i][0]; if (t < a + BLEND) { const k = (t - (a - BLEND)) / (2 * BLEND); const s = k * k * (3 - 2 * k); x = lin(i - 1, t) * (1 - s) + x * s; } }
    if (i < last) { const b = cues[i][1]; if (t > b - BLEND) { const k = (t - (b - BLEND)) / (2 * BLEND); const s = k * k * (3 - 2 * k); x = x * (1 - s) + lin(i + 1, t) * s; } }
    return x;
  }

  // Line height at a world x: each panel's shape, cross-faded over 150 px either side of a seam.
  function lineAt(wx, t) {
    const n = cfg.shapes.length;
    const p = clamp(Math.floor(wx / W), 0, n - 1);
    const f = (q) => cfg.shapes[q](clamp((wx - q * W) / W, 0, 1), t);
    const seam = Math.round(wx / W), d = wx - seam * W;
    if (seam > 0 && seam < n && Math.abs(d) < 150) {
      const k = (d + 150) / 300, s = k * k * (3 - 2 * k);
      return f(seam - 1) * (1 - s) + f(seam) * s;
    }
    return f(p);
  }

  let camX = 0;
  function frame(t) {
    const cx = coinX(t);
    camX = cx - W / 2;
    $("world").style.transform = `translateX(${-camX}px)`;

    // the line, drawn in screen space across the visible part of the world
    let d = "";
    for (let s = 0; s <= 120; s++) {
      const x = -30 + s * ((W + 60) / 120);
      d += (s ? "L" : "M") + x.toFixed(1) + " " + lineAt(camX + x, t).toFixed(1);
    }
    $("line").setAttribute("d", d);

    // the coin: drops in on frame 0, rides the line, rolls as it travels
    const last = cfg.cues.length - 1, [ea] = cfg.cues[last];
    let y = lineAt(cx, t) + cfg.coinY;
    y -= tween(t, cfg.drop.at, cfg.drop.dur, cfg.drop.from, 0, ease.outBack);
    if (cfg.hop) y -= cfg.hop(t);
    const rise = tween(t, ea + 0.4, 0.6, 0, 1, ease.outBack);
    y -= cfg.endRise * Math.min(rise, 1);
    const roll = ((cx - W / 2) / R) * 57.2958 * (1 - Math.min(rise, 1));   // stops upright on the end card
    const sc = (1 + cfg.endScale * rise) * (1 + 0.05 * pulse(t));
    $("coin").style.transform = `translate(${W / 2}px, ${y}px) scale(${sc})`;
    $("coinFace").style.transform = `rotate(${roll}deg)`;
    return { camX, coinX: cx, coinY: y };
  }

  // Pin an element above the line at panel-relative u (world space; it scrolls with the panel).
  function place(el, panel, u, dy, t) {
    const wx = panel * W + u * W;
    el.style.left = `${u * W}px`;
    el.style.top = `${lineAt(wx, t) - dy}px`;
    return el;
  }

  return { init, frame, coinX, lineAt, place, W, H };
})();
