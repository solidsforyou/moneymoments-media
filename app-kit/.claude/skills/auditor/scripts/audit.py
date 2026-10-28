#!/usr/bin/env python3
"""The auditor's ledger: what was audited, the verdict, and what still isn't.

Every audit is a row in audit/ledger.csv (reports in audit/reports/). The
ledger knows which commits each audit covered, so it can list commits
nobody has audited yet and FAIL verdicts nobody has fixed. Hooks use it to
stop a session from ending, or a push from happening, with unaudited work.

Commands:
  init [--from REF]          start the ledger; commits up to REF (default HEAD) count as the baseline
  add  --verdict PASS|NOTES|FAIL --kind KIND --summary TEXT
       [--commits A..B | --commit SHA ...] [--scope TEXT] [--counts C,H,M,L]
       [--report PATH] [--auditor agent|self] [--resolves ID]
                             record one audit; with no commits/scope it covers all unaudited commits
  status [--json]            unaudited commits, open FAILs, last audits
  check                      exit 1 if anything is unaudited or an open FAIL exists (CI, preflight)
  brief                      what to audit next: the commit range, files changed, and the agent prompt
  hook stop|prepush          for Claude Code hooks (reads the hook's JSON on stdin; exit 2 blocks)

Kinds: code, copy, design, decision, research, data, release, sweep, other.
Run from anywhere inside the repo. Exit codes: 0 ok, 1 something to audit, 2 bad input / blocked by hook.
"""

import argparse
import csv
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

FIELDS = ["id", "created", "kind", "verdict", "auditor", "scope", "commits", "critical", "high", "medium", "low",
          "summary", "report", "resolves"]
VERDICTS = {"PASS", "NOTES", "FAIL"}
KINDS = {"baseline", "code", "copy", "design", "decision", "research", "data", "release", "sweep", "other"}


def git(*args, cwd=None):
    p = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True)
    if p.returncode != 0:
        raise RuntimeError(p.stderr.strip() or f"git {' '.join(args)} failed")
    return p.stdout.strip()


def repo_root():
    start = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
    try:
        return Path(git("rev-parse", "--show-toplevel", cwd=start))
    except RuntimeError:
        return None


def ledger_path(root):
    return root / "audit" / "ledger.csv"


def read_rows(root):
    p = ledger_path(root)
    if not p.exists():
        return None
    with open(p, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write_row(root, row):
    p = ledger_path(root)
    new = not p.exists()
    p.parent.mkdir(parents=True, exist_ok=True)
    with open(p, "a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        if new:
            w.writeheader()
        w.writerow({k: row.get(k, "") for k in FIELDS})


def next_id(rows):
    nums = [int(r["id"].split("-")[1]) for r in rows if re.fullmatch(r"A-\d+", r.get("id", ""))]
    return f"A-{(max(nums) + 1) if nums else 1:04d}"


def covered(rows):
    out = set()
    for r in rows:
        out.update(r.get("commits", "").split())
    return out


def baseline(rows):
    for r in rows:
        if r.get("kind") == "baseline":
            return r["commits"].split()[0]
    return None


def unaudited(root, rows):
    """Non-merge commits on HEAD after the baseline that no audit covers, oldest first."""
    base = baseline(rows)
    rng = f"{base}..HEAD" if base else "HEAD"
    try:
        shas = git("rev-list", "--no-merges", "--reverse", rng, cwd=root).split()
    except RuntimeError:
        return []
    done = covered(rows)
    return [s for s in shas if s not in done and not only_audit_files(root, s)]


def only_audit_files(root, sha):
    """Commits that only record audits (audit/...) don't need an audit themselves."""
    try:
        files = git("diff-tree", "--no-commit-id", "--name-only", "-r", "--root", sha, cwd=root).split()
    except RuntimeError:
        return False
    return bool(files) and all(f.startswith("audit/") for f in files)


def open_fails(rows):
    resolved = {r["resolves"] for r in rows if r.get("resolves") and r.get("verdict") in ("PASS", "NOTES")}
    return [r for r in rows if r.get("verdict") == "FAIL" and r["id"] not in resolved]


def expand_commits(root, spec_list):
    shas = []
    for spec in spec_list:
        if ".." in spec:
            shas += git("rev-list", "--no-merges", "--reverse", spec, cwd=root).split()
        else:
            shas.append(git("rev-parse", "--verify", spec + "^{commit}", cwd=root))
    return shas


def cmd_init(a, root):
    rows = read_rows(root)
    if rows is not None:
        print(f"Ledger already exists: {ledger_path(root)}")
        return 0
    ref = a.from_ref or "HEAD"
    try:
        sha = git("rev-parse", "--verify", ref + "^{commit}", cwd=root)
    except RuntimeError:
        sha = ""  # empty repo: everything from the first commit is audited
    write_row(root, {"id": "A-0000", "created": now(), "kind": "baseline", "verdict": "PASS", "auditor": "self",
                     "scope": f"baseline at {ref}", "commits": sha,
                     "summary": "Ledger started; commits up to here were not audited by this ledger."})
    (root / "audit" / "reports").mkdir(parents=True, exist_ok=True)
    print(f"Ledger started at {ledger_path(root)} (baseline {sha[:10] or 'empty repo'}).")
    return 0


def now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")


def cmd_add(a, root):
    rows = read_rows(root)
    if rows is None:
        print("No ledger yet: run `audit.py init` first.", file=sys.stderr)
        return 2
    if a.verdict not in VERDICTS or a.kind not in KINDS - {"baseline"}:
        print(f"verdict must be one of {sorted(VERDICTS)}; kind one of {sorted(KINDS - {'baseline'})}", file=sys.stderr)
        return 2
    counts = [0, 0, 0, 0]
    if a.counts:
        try:
            counts = [int(x) for x in a.counts.split(",")]
            assert len(counts) == 4 and min(counts) >= 0
        except (ValueError, AssertionError):
            print("--counts is critical,high,medium,low, e.g. 0,1,2,0", file=sys.stderr)
            return 2
    if a.verdict == "PASS" and (counts[0] or counts[1] or counts[2] or counts[3]):
        print("A PASS has no findings: use NOTES for medium/low, FAIL for critical/high.", file=sys.stderr)
        return 2
    if a.verdict == "NOTES" and (counts[0] or counts[1]):
        print("Critical or high findings make it a FAIL.", file=sys.stderr)
        return 2
    if a.resolves and a.resolves not in {r["id"] for r in rows}:
        print(f"--resolves {a.resolves}: no such audit", file=sys.stderr)
        return 2
    try:
        commits = expand_commits(root, a.commit or []) if a.commit else []
    except RuntimeError as e:
        print(f"Bad commit: {e}", file=sys.stderr)
        return 2
    if not commits and not a.scope:
        commits = unaudited(root, rows)
        if not commits:
            print("Nothing unaudited: give --scope for non-commit work (a reply, a design, research).", file=sys.stderr)
            return 2
    aid = next_id(rows)
    report = a.report or ""
    if report and not (root / report).exists() and not Path(report).exists():
        print(f"Report file not found: {report}", file=sys.stderr)
        return 2
    scope = a.scope or (f"{commits[0][:10]}..{commits[-1][:10]} ({len(commits)} commit(s))" if commits else "")
    write_row(root, {"id": aid, "created": now(), "kind": a.kind, "verdict": a.verdict, "auditor": a.auditor,
                     "scope": scope, "commits": " ".join(commits), "critical": counts[0], "high": counts[1],
                     "medium": counts[2], "low": counts[3], "summary": a.summary, "report": report,
                     "resolves": a.resolves or ""})
    print(f"{aid} {a.verdict}: {scope}: {a.summary}")
    if a.verdict == "FAIL":
        print(f"Open until fixed and re-audited with: audit.py add ... --resolves {aid}")
    return 0


def summary(root, rows):
    un = unaudited(root, rows)
    fails = open_fails(rows)
    last = [r for r in rows if r.get("kind") != "baseline"][-5:]
    return un, fails, last


def cmd_status(a, root):
    rows = read_rows(root)
    if rows is None:
        print("No ledger yet: run `audit.py init`.")
        return 1
    un, fails, last = summary(root, rows)
    if a.json:
        print(json.dumps({"unaudited_commits": un, "open_fails": fails, "recent": last}, indent=2))
        return 1 if un or fails else 0
    print(f"Unaudited commits: {len(un)}")
    for s in un[:20]:
        print(f"  {s[:10]} {git('log', '-1', '--format=%s', s, cwd=root)[:70]}")
    print(f"Open FAILs: {len(fails)}")
    for r in fails:
        print(f"  {r['id']} {r['scope']}: {r['summary'][:70]}")
    print("Recent audits:")
    for r in last:
        print(f"  {r['id']} {r['verdict']:<5} {r['kind']:<8} {r['scope'][:40]}: {r['summary'][:50]}")
    return 1 if un or fails else 0


def cmd_check(a, root):
    rows = read_rows(root)
    if rows is None:
        print("No audit ledger: run `audit.py init`.")
        return 1
    un, fails, _ = summary(root, rows)
    if un or fails:
        print(f"Audit needed: {len(un)} unaudited commit(s), {len(fails)} open FAIL(s). Run audit.py brief.")
        return 1
    print("Everything is audited.")
    return 0


def cmd_brief(a, root):
    rows = read_rows(root)
    if rows is None:
        print("No ledger yet: run `audit.py init`.")
        return 1
    un, fails, _ = summary(root, rows)
    if not un and not fails:
        print("Nothing to audit.")
        return 0
    if un:
        first, last = un[0], un[-1]
        files = git("diff", "--stat", f"{first}^..{last}", cwd=root)
        print(f"Audit range: {first[:10]}^..{last[:10]} ({len(un)} commit(s))")
        print(git("log", "--no-merges", "--format=  %h %s", f"{first}^..{last}", cwd=root))
        print("\nFiles:\n" + files)
    for r in fails:
        print(f"\nOpen FAIL {r['id']}: {r['summary']} (report: {r['report'] or 'none'}): re-audit after the fix with --resolves {r['id']}")
    print("\nAsk the auditor agent: \"Audit commits "
          + (f"{un[0][:10]}^..{un[-1][:10]}" if un else "for the open FAILs")
          + " against the request, docs/spec.md, brief.md, the memory sheet and the matching skills. "
            "Write the report to audit/reports/<id>.md and record it with audit.py add.\"")
    return 1


def cmd_hook(a, root):
    try:
        data = json.load(sys.stdin) if not sys.stdin.isatty() else {}
    except json.JSONDecodeError:
        data = {}
    if root is None:
        return 0
    rows = read_rows(root)
    if rows is None:
        return 0  # ledger not started in this repo: nothing to enforce
    if a.event == "stop":
        if data.get("stop_hook_active"):
            return 0  # already continuing because of this hook: don't loop
        un, fails, _ = summary(root, rows)
        if un or fails:
            print(f"Auditor: {len(un)} unaudited commit(s) and {len(fails)} open FAIL(s). Before finishing, "
                  "run `python3 .claude/skills/auditor/scripts/audit.py brief`, have the auditor agent audit them, "
                  "and record the result with audit.py add. If the founder said to skip the audit, record that "
                  "with audit.py add --verdict NOTES --auditor self --summary \"skipped at founder's request\".",
                  file=sys.stderr)
            return 2
        return 0
    if a.event == "prepush":
        cmd = ((data.get("tool_input") or {}).get("command") or "")
        if not re.search(r"\bgit\s+push\b", cmd):
            return 0
        un, fails, _ = summary(root, rows)
        if un or fails:
            print(f"Auditor: push blocked: {len(un)} unaudited commit(s), {len(fails)} open FAIL(s). "
                  "Audit first (audit.py brief), record it, then push.", file=sys.stderr)
            return 2
        return 0
    return 0


def main():
    ap = argparse.ArgumentParser(description="The auditor's ledger.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("init"); p.add_argument("--from", dest="from_ref")
    p = sub.add_parser("add")
    p.add_argument("--verdict", required=True, type=str.upper)
    p.add_argument("--kind", required=True)
    p.add_argument("--summary", required=True)
    p.add_argument("--commit", "--commits", action="append")
    p.add_argument("--scope")
    p.add_argument("--counts")
    p.add_argument("--report")
    p.add_argument("--auditor", default="agent", choices=["agent", "self"])
    p.add_argument("--resolves")
    p = sub.add_parser("status"); p.add_argument("--json", action="store_true")
    sub.add_parser("check")
    sub.add_parser("brief")
    p = sub.add_parser("hook"); p.add_argument("event", choices=["stop", "prepush"])
    a = ap.parse_args()

    root = repo_root()
    if a.cmd == "hook":
        return cmd_hook(a, root)
    if root is None:
        print("Not inside a git repo.", file=sys.stderr)
        return 2
    return {"init": cmd_init, "add": cmd_add, "status": cmd_status, "check": cmd_check, "brief": cmd_brief}[a.cmd](a, root)


if __name__ == "__main__":
    sys.exit(main())
