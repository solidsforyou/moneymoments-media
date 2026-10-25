// Renders an HTML scene that defines window.renderFrame(t) to MP4, frame by frame.
// Usage: node videos/render.cjs scene.html out.mp4 [--fps 30] [--width 1080] [--height 1920]
//        [--from 0] [--to 60] [--audio track.mp3 --audio-start 24]
const { spawn } = require("child_process");
const path = require("path");
const { chromium } = require("playwright");

const args = process.argv.slice(2);
const pos = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const [page, out] = pos;
const fps = Number(opt("fps", 30)), width = Number(opt("width", 1080)), height = Number(opt("height", 1920));

(async () => {
  const browser = await chromium.launch();
  const tab = await browser.newPage({ viewport: { width, height } });
  const [file, query] = page.split("?");   // keep ?story=... out of the path
  await tab.goto("file://" + path.resolve(file) + (query ? "?" + query : ""));
  await tab.evaluate(() => document.fonts.ready);
  const duration = Number(opt("to", await tab.evaluate(() => window.DURATION)));
  const from = Number(opt("from", 0));
  const n = Math.round((duration - from) * fps);

  const ff = ["-y", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-"];
  const audio = opt("audio");
  if (audio) ff.push("-ss", String(Number(opt("audio-start", 0)) + from), "-t", String(duration - from), "-i", audio);
  ff.push("-c:v", "libx264", "-crf", "17", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", String(fps));
  if (audio) ff.push("-c:a", "aac", "-b:a", "192k", "-shortest");
  ff.push("-movflags", "+faststart", out);
  const enc = spawn("ffmpeg", ff, { stdio: ["pipe", "inherit", "inherit"] });

  for (let i = 0; i < n; i++) {
    const t = from + i / fps;
    await tab.evaluate((tt) => window.renderFrame(tt), t);
    const buf = await tab.screenshot({ type: "jpeg", quality: 95 });
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once("drain", r));
    if (i % 150 === 0) console.log(`frame ${i}/${n}`);
  }
  enc.stdin.end();
  await new Promise((r) => enc.on("close", r));
  await browser.close();
  console.log("wrote", out);
})();
