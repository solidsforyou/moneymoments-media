#!/usr/bin/env python3
"""Run every check an app repo has, in one go, before a commit or push.

Finds the project's own scripts in package.json (format check, lint,
typecheck, test, build) and runs the ones that exist, with the right package
manager. Then scans the changes for leftovers (focused or skipped tests,
debugger statements, console.log, merge markers) and, if the app-security
skill is next to this one, scans the repo for committed secrets.

Usage:
  python3 preflight.py [PROJECT_DIR] [--quick] [--no-build] [--base BRANCH]
                       [--timeout SECONDS] [--json]

  --quick      skip the build step (and any e2e script)
  --no-build   skip only the build step
  --base       branch to compare changes against (default: origin/main,
               then main, then the last commit)
  --json       print a JSON summary instead of the table

Exit code 0 when every step passed (skipped steps don't fail the run),
1 when any step failed, 2 for a usage problem.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

# Script names tried for each step, first match wins.
STEPS = [
    ("format", ["format:check", "fmt:check", "prettier:check"]),
    ("lint", ["lint"]),
    ("typecheck", ["typecheck", "type-check", "tsc", "types"]),
    ("test", ["test", "test:unit"]),
    ("build", ["build"]),
    ("e2e", ["test:e2e", "e2e"]),
]
EXPECTED = {"lint", "typecheck", "test"}  # missing ones are reported as warnings

LOCKFILES = [
    ("pnpm-lock.yaml", "pnpm"),
    ("yarn.lock", "yarn"),
    ("bun.lockb", "bun"),
    ("bun.lock", "bun"),
    ("package-lock.json", "npm"),
]

CODE_EXT = {".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".py", ".vue", ".svelte"}
LEFTOVERS = [
    (re.compile(r"\b(?:it|test|describe)\.only\s*\("), "focused test (.only) skips every other test"),
    (re.compile(r"\b(?:fit|fdescribe)\s*\("), "focused test (fit/fdescribe)"),
    (re.compile(r"\b(?:it|test|describe)\.skip\s*\(|\bx(?:it|describe)\s*\("), "skipped test"),
    (re.compile(r"^\s*debugger\s*;?\s*$"), "debugger statement"),
    (re.compile(r"\bconsole\.log\s*\("), "console.log left in"),
    (re.compile(r"^(?:<{7}|>{7}|={7})(?:\s|$)"), "merge conflict marker"),
]


def detect_pm(root: Path) -> str:
    for name, pm in LOCKFILES:
        if (root / name).exists():
            return pm
    return "npm"


def run_cmd(pm: str, script: str) -> list:
    if pm == "npm":
        return ["npm", "run", "--silent", script]
    if pm == "yarn":
        return ["yarn", "run", script]
    return [pm, "run", script]


ANSI = re.compile(r"\x1b\[[0-9;?]*[A-Za-z]")


def tail(text: str, n: int = 40) -> str:
    lines = ANSI.sub("", text).rstrip().splitlines()
    return "\n".join(lines[-n:])


def run_step(cmd, cwd, timeout):
    env = dict(os.environ, CI="true", FORCE_COLOR="0", NO_COLOR="1")  # CI=true stops test watch mode
    start = time.time()
    try:
        p = subprocess.run(cmd, cwd=cwd, env=env, capture_output=True, text=True, timeout=timeout)
        out = (p.stdout or "") + (p.stderr or "")
        return ("pass" if p.returncode == 0 else "fail"), out, time.time() - start
    except subprocess.TimeoutExpired as e:
        out = ((e.stdout or b"").decode(errors="replace") if isinstance(e.stdout, bytes) else (e.stdout or ""))
        return "fail", out + f"\nTimed out after {timeout} s", time.time() - start
    except FileNotFoundError:
        return "fail", f"Command not found: {cmd[0]} (is it installed?)", time.time() - start


def git(args, cwd):
    p = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True)
    return p.returncode, p.stdout


def changed_lines(root: Path, base):
    """Added lines (file, line_no, text) since the base branch plus uncommitted work."""
    code, _ = git(["rev-parse", "--is-inside-work-tree"], root)
    if code != 0:
        return None, "not a git repo"
    candidates = [base] if base else ["origin/main", "main", "origin/master", "master", "HEAD~1"]
    ref = None
    for c in candidates:
        if git(["rev-parse", "--verify", "--quiet", c], root)[0] == 0:
            ref = c
            break
    if ref is None:
        ref = "HEAD"
    if ref != "HEAD":
        mb_code, mb = git(["merge-base", "HEAD", ref], root)
        if mb_code == 0 and mb.strip():
            ref = mb.strip()
    _, diff = git(["diff", "--unified=0", "--no-color", ref], root)
    _, untracked = git(["ls-files", "--others", "--exclude-standard"], root)

    out, current, line_no = [], None, 0
    for line in diff.splitlines():
        if line.startswith("+++ "):
            path = line[4:]
            current = path[2:] if path.startswith("b/") else None
        elif line.startswith("@@"):
            m = re.search(r"\+(\d+)", line)
            line_no = int(m.group(1)) if m else 0
        elif line.startswith("+") and current:
            out.append((current, line_no, line[1:]))
            line_no += 1
    for f in untracked.splitlines():
        p = root / f
        if p.suffix in CODE_EXT and p.is_file() and p.stat().st_size < 1_000_000:
            for i, text in enumerate(p.read_text(errors="replace").splitlines(), 1):
                out.append((f, i, text))
    return out, ref


def is_test_file(path: str) -> bool:
    return bool(re.search(r"(\.|_|/)(test|spec)s?(\.|/|_)|(^|/)(tests?|__tests__|e2e)/", path))


def scan_leftovers(lines):
    found = []
    for path, no, text in lines:
        if Path(path).suffix not in CODE_EXT:
            continue
        for rx, why in LEFTOVERS:
            if not rx.search(text):
                continue
            if why == "console.log left in" and (is_test_file(path) or "scripts/" in path):
                continue
            found.append(f"{path}:{no}: {why}: {text.strip()[:100]}")
    return found


def main():
    ap = argparse.ArgumentParser(description="Run the app repo's checks before a commit or push.")
    ap.add_argument("project", nargs="?", default=".")
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--no-build", action="store_true")
    ap.add_argument("--base")
    ap.add_argument("--timeout", type=int, default=900)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    root = Path(a.project).resolve()
    if not root.is_dir():
        print(f"Not a folder: {root}", file=sys.stderr)
        return 2

    results = []  # (step, status, detail, seconds, output)
    pkg = root / "package.json"
    scripts = {}
    if pkg.exists():
        try:
            scripts = json.loads(pkg.read_text()).get("scripts", {}) or {}
        except json.JSONDecodeError as e:
            results.append(("package.json", "fail", f"invalid JSON: {e}", 0, ""))
    pm = detect_pm(root)

    if pkg.exists() and not (root / "node_modules").exists():
        results.append(("install", "fail", f"node_modules missing: run `{pm} install` first", 0, ""))
    elif pkg.exists():
        for step, names in STEPS:
            if step == "build" and (a.quick or a.no_build):
                results.append((step, "skip", "skipped (--quick/--no-build)", 0, ""))
                continue
            if step == "e2e" and a.quick:
                results.append((step, "skip", "skipped (--quick)", 0, ""))
                continue
            name = next((n for n in names if n in scripts), None)
            if name is None:
                detail = "no script in package.json" + (": add one" if step in EXPECTED else "")
                results.append((step, "missing" if step in EXPECTED else "skip", detail, 0, ""))
                continue
            if re.search(r"--watch(?:All)?(?!=false)\b", scripts[name]):
                results.append((step, "fail", f'"{name}" runs in watch mode ({scripts[name]}) and would never finish: '
                                "drop --watch/--watchAll (vitest: `vitest run`)", 0, ""))
                continue
            cmd = run_cmd(pm, name)
            status, out, secs = run_step(cmd, root, a.timeout)
            results.append((step, status, " ".join(cmd), secs, out))
    elif (root / "pyproject.toml").exists() or (root / "requirements.txt").exists():
        for step, cmd in (("lint", ["ruff", "check", "."]), ("test", [sys.executable, "-m", "pytest", "-q"])):
            status, out, secs = run_step(cmd, root, a.timeout)
            if "Command not found" in out or "No module named pytest" in out:
                results.append((step, "missing", f"{cmd[0]} not installed", 0, out))
            else:
                results.append((step, status, " ".join(cmd), secs, out))
    else:
        results.append(("project", "fail", "no package.json or pyproject.toml found", 0, ""))

    lines, ref = changed_lines(root, a.base)
    if lines is None:
        results.append(("leftovers", "skip", ref, 0, ""))
    else:
        found = scan_leftovers(lines)
        results.append(("leftovers", "fail" if found else "pass",
                        f"{len(found)} found in changes since {ref[:12]}", 0, "\n".join(found)))

    scanner = Path(__file__).resolve().parents[2] / "app-security" / "scripts" / "scan_secrets.py"
    if scanner.exists():
        status, out, secs = run_step([sys.executable, str(scanner), str(root)], root, a.timeout)
        results.append(("secrets", status, "app-security scan_secrets.py", secs, out))
    else:
        results.append(("secrets", "skip", "app-security skill not found next to app-build", 0, ""))

    failed = [r for r in results if r[1] == "fail"]
    missing = [r for r in results if r[1] == "missing"]

    if a.json:
        print(json.dumps({
            "ok": not failed,
            "package_manager": pm,
            "steps": [{"step": s, "status": st, "detail": d, "seconds": round(t, 1),
                       "output_tail": tail(o) if st == "fail" else ""} for s, st, d, t, o in results],
        }, indent=2))
    else:
        print(f"Preflight: {root}  (package manager: {pm})\n")
        for s, st, d, t, _ in results:
            mark = {"pass": "PASS", "fail": "FAIL", "skip": "skip", "missing": "MISSING"}[st]
            secs = f"{t:5.1f}s" if t else "      "
            print(f"  {mark:<8}{s:<11}{secs}  {d}")
        for s, st, d, t, o in failed:
            print(f"\n--- {s}: last lines ---\n{tail(o)}")
        print()
        if failed:
            print(f"FAILED: {', '.join(r[0] for r in failed)}. Fix these before committing.")
        elif missing:
            print(f"The checks that exist passed, but {', '.join(r[0] for r in missing)} "
                  "{} missing: add them (app-stack section 4).".format("is" if len(missing) == 1 else "are"))
        else:
            print("All checks passed.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
