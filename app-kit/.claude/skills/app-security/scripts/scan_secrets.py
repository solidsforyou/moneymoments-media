#!/usr/bin/env python3
"""Find secrets committed to an app repo before they leak.

Scans the files git tracks plus new files git doesn't ignore (or every file
outside build and dependency folders when the folder isn't a git repo) for
API keys, private keys, tokens, passwords in code, committed .env files and
server secrets exposed through public env prefixes (NEXT_PUBLIC_,
EXPO_PUBLIC_, VITE_).

Severities:
  high    a real secret or a secret file: rotate it, then remove it
  medium  looks like a secret assigned in code: move it to an env secret
  info    public by design (Firebase web keys, Supabase anon keys,
          Razorpay key ids): fine in app code, listed so you know

Values are masked in the output. To accept a finding on purpose, add the
comment `secret-scan: allow` on that line, or pass --allow GLOB.

Usage:
  python3 scan_secrets.py [PATH] [--allow GLOB ...] [--json] [--all-files]

Exit code 1 when any high or medium finding remains, else 0.
"""

import argparse
import base64
import fnmatch
import json
import os
import re
import subprocess
import sys
from pathlib import Path

SKIP_DIRS = {".git", "node_modules", "dist", "build", ".next", ".expo", ".turbo", "vendor",
             "coverage", ".venv", "venv", "__pycache__", "Pods", ".gradle", "DerivedData", "out"}
SKIP_FILES = {"package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb", "bun.lock",
              "Podfile.lock", "poetry.lock", "Cargo.lock"}
BINARY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".mp4", ".mov", ".mp3", ".wav", ".m4a",
              ".pdf", ".zip", ".gz", ".tar", ".woff", ".woff2", ".ttf", ".otf", ".eot", ".jar", ".aar",
              ".so", ".dylib", ".dll", ".exe", ".class", ".pyc", ".lottie", ".riv"}
MAX_BYTES = 2_000_000
ALLOW_MARK = "secret-scan: allow"

# (name, regex, severity). Severity "jwt" means: decode and decide.
PATTERNS = [
    ("private key", r"-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY(?: BLOCK)?-----", "high"),
    ("AWS access key", r"\b(?:AKIA|ASIA)[0-9A-Z]{16}\b", "high"),
    ("GitHub token", r"\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{60,}\b", "high"),
    ("Slack token", r"\bxox[abposr]-[A-Za-z0-9-]{10,}\b", "high"),
    ("Stripe secret key", r"\b(?:sk|rk)_live_[A-Za-z0-9]{20,}\b", "high"),
    ("Anthropic API key", r"\bsk-ant-[A-Za-z0-9_\-]{20,}", "high"),
    ("OpenAI API key", r"\bsk-(?:proj-|svcacct-|admin-)?[A-Za-z0-9_\-]{20,}T3BlbkFJ[A-Za-z0-9_\-]{20,}|\bsk-proj-[A-Za-z0-9_\-]{40,}", "high"),
    ("SendGrid API key", r"\bSG\.[A-Za-z0-9_\-]{22}\.[A-Za-z0-9_\-]{43}\b", "high"),
    ("Twilio API key", r"\bSK[0-9a-f]{32}\b", "high"),
    ("Google OAuth client secret", r"\bGOCSPX-[A-Za-z0-9_\-]{28}\b", "high"),
    ("Razorpay live key id", r"\brzp_live_[A-Za-z0-9]{14}\b", "info"),
    ("Google API key (public if restricted)", r"\bAIza[0-9A-Za-z_\-]{35}\b", "info"),
    ("URL with a password", r"\b[a-z][a-z0-9+.\-]*://[^/\s:@\"'\[]+:(?P<pw>[^/\s:@\"'$<{\]]{3,})@(?P<host>[A-Za-z0-9.\-]+)", "url"),
    ("JWT", r"\beyJ[A-Za-z0-9_\-]{10,}\.eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}", "jwt"),
]
PATTERNS = [(n, re.compile(r), s) for n, r, s in PATTERNS]

SECRET_NAME = r"(?:secret|password|passwd|pwd|api[_\-]?key|apikey|access[_\-]?token|auth[_\-]?token|private[_\-]?key|client[_\-]?secret|service[_\-]?role(?:[_\-]?key)?|webhook[_\-]?secret|signing[_\-]?key)"
ASSIGN = re.compile(
    r"(?i)(?P<name>[A-Za-z0-9_.\-]*" + SECRET_NAME + r"[A-Za-z0-9_\-]*)[\"']?\s*(?::|=|=>|:=)\s*[\"'](?P<value>[^\"'\s]{12,})[\"']")
ENV_LINE = re.compile(r"(?i)^\s*(?:export\s+)?(?P<name>[A-Z0-9_]*" + SECRET_NAME + r"[A-Z0-9_]*)\s*=\s*(?P<value>[^\s#]{8,})")
PUBLIC_PREFIX = re.compile(r"\b(?P<name>(?:NEXT_PUBLIC|EXPO_PUBLIC|VITE|REACT_APP)_[A-Z0-9_]*(?:SECRET|SERVICE_ROLE|PRIVATE|PASSWORD)[A-Z0-9_]*)\b")
NAME_HINTS = ("secret", "pass", "pwd", "key", "token", "role", "signing")
EXAMPLE_PW = {"pass", "password", "passwd", "pwd", "secret", "xyz", "bar", "pass123", "password123", "p%40ss", "pa%24%24word"}
EXAMPLE_HOST = re.compile(r"(?i)(?:^|\.)(?:example\.(?:com|org|net)|domain\.tld|host|hostname|your-?host[\w.\-]*)$")
PLACEHOLDER = re.compile(r"(?i)^(?:[./~]|https?://)|^(?:x+|\*+|\.+|<.*>|\$\{.*\}|\{\{.*\}\}|%.*%)$|your[_\-]|example|placeholder|changeme|change[_\-]me|dummy|fake|sample|redacted|xxxx|test[_\-]?(?:key|secret|token)|replace|todo|process\.env|import\.meta\.env|os\.environ|getenv|env\(")
ENV_FILE = re.compile(r"(?:^|/)\.env(?:\.[A-Za-z0-9_\-]+)?$")
ENV_OK = re.compile(r"\.(?:example|sample|template|defaults|dist)$")
SECRET_FILE_EXT = {".pem": "private key file", ".key": "private key file", ".p12": "certificate bundle",
                   ".pfx": "certificate bundle", ".jks": "Java keystore", ".keystore": "Android keystore",
                   ".p8": "Apple private key", ".mobileprovision": "iOS provisioning profile"}


def mask(v: str) -> str:
    v = v.strip()
    return v[:4] + "…" + v[-2:] if len(v) > 10 else "…"


def jwt_role(token: str):
    try:
        part = token.split(".")[1]
        data = json.loads(base64.urlsafe_b64decode(part + "=" * (-len(part) % 4)))
        return data.get("role") if isinstance(data, dict) else None
    except Exception:
        return None


def list_files(root: Path, all_files: bool):
    if not all_files:
        p = subprocess.run(["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard"],
                           cwd=root, capture_output=True)
        if p.returncode == 0:
            for rel in p.stdout.decode(errors="replace").split("\0"):
                if rel:
                    yield rel
            return
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for f in filenames:
            yield os.path.relpath(os.path.join(dirpath, f), root)


def scan_file(root: Path, rel: str):
    findings = []
    path = root / rel
    name = path.name
    if ENV_FILE.search(rel) and not ENV_OK.search(rel):
        findings.append(("high", rel, 0, "committed env file", "move values to environment secrets, delete the file, add it to .gitignore"))
    ext = path.suffix.lower()
    if ext in SECRET_FILE_EXT:
        findings.append(("high", rel, 0, SECRET_FILE_EXT[ext], "never commit this; store it as a secret (EAS credentials, CI secret)"))
        return findings
    if name in SKIP_FILES or ext in BINARY_EXT or any(part in SKIP_DIRS for part in Path(rel).parts[:-1]):
        return findings
    try:
        if not path.is_file() or path.stat().st_size > MAX_BYTES:
            return findings
        text = path.read_text(errors="replace")
    except OSError:
        return findings
    if "\0" in text[:4096]:
        return findings
    is_env = bool(ENV_FILE.search(rel))
    for no, line in enumerate(text.splitlines(), 1):
        if ALLOW_MARK in line or len(line) > 5000:
            continue
        hit_spans = []
        for label, rx, sev in PATTERNS:
            for m in rx.finditer(line):
                val = m.group(0)
                if sev == "url":
                    pw = m.group("pw")
                    if pw.lower() in EXAMPLE_PW or PLACEHOLDER.search(pw) or EXAMPLE_HOST.search(m.group("host")):
                        continue
                    sev = "high"
                if sev == "jwt":
                    role = jwt_role(val)
                    if role == "service_role":
                        sev2, label2, fix = "high", "Supabase service_role key", "server only; rotate it in the Supabase dashboard"
                    elif role == "anon":
                        sev2, label2, fix = "info", "Supabase anon key (public by design)", "fine in the app if row level security is on for every table"
                    else:
                        sev2, label2, fix = "medium", "JWT", "check whether this token grants access; tokens belong in env secrets"
                else:
                    sev2, label2 = sev, label
                    fix = ("public by design; restrict it (API and app restrictions) in its console" if sev == "info"
                           else "rotate it now, then remove it from code and history")
                findings.append((sev2, rel, no, f"{label2}: {mask(val)}", fix))
                hit_spans.append(m.span())
        m = PUBLIC_PREFIX.search(line)
        if m:
            findings.append(("high", rel, no, f"server secret in a public env variable: {m.group('name')}",
                             "public prefixes ship to every user's device; keep this server-side"))
        low = line.lower()
        if not any(h in low for h in NAME_HINTS):
            continue
        for rx in ((ENV_LINE, ASSIGN) if is_env else (ASSIGN,)):
            m = rx.search(line)
            if not m:
                continue
            value = m.group("value").strip().strip("\"'")
            if PLACEHOLDER.search(value) or any(s[0] <= m.start("value") < s[1] for s in hit_spans):
                continue
            if re.fullmatch(r"[a-z]+(?:[_\-.][a-z]+)*", value):  # an identifier, not a secret
                continue
            findings.append(("medium", rel, no, f"{m.group('name')} = {mask(value)}",
                             "move it to an environment secret and read it from the environment"))
            break
    return findings


def main():
    ap = argparse.ArgumentParser(description="Scan an app repo for committed secrets.")
    ap.add_argument("path", nargs="?", default=".")
    ap.add_argument("--allow", action="append", default=[], help="glob of paths to ignore (repeatable)")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--all-files", action="store_true", help="ignore git and walk every file")
    a = ap.parse_args()

    root = Path(a.path).resolve()
    if not root.is_dir():
        print(f"Not a folder: {root}", file=sys.stderr)
        return 2
    findings, scanned = [], 0
    for rel in list_files(root, a.all_files):
        if any(fnmatch.fnmatch(rel, g) for g in a.allow):
            continue
        scanned += 1
        findings.extend(scan_file(root, rel))

    order = {"high": 0, "medium": 1, "info": 2}
    findings.sort(key=lambda f: (order[f[0]], f[1], f[2]))
    blocking = [f for f in findings if f[0] != "info"]
    if a.json:
        print(json.dumps({"ok": not blocking, "files_scanned": scanned, "findings": [
            {"severity": s, "file": f, "line": n, "what": w, "fix": x} for s, f, n, w, x in findings]}, indent=2))
    else:
        for s, f, n, w, x in findings:
            loc = f"{f}:{n}" if n else f
            print(f"{s.upper():<7}{loc}  {w}\n       fix: {x}")
        counts = {k: sum(1 for f in findings if f[0] == k) for k in order}
        print(f"\nScanned {scanned} files: {counts['high']} high, {counts['medium']} medium, {counts['info']} info.")
        if blocking:
            print("A secret that was ever pushed is leaked: rotate it first, then remove it.")
    return 1 if blocking else 0


if __name__ == "__main__":
    sys.exit(main())
