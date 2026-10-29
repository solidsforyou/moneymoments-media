#!/usr/bin/env python3
"""The auditor's ledger: what was audited, the verdict, and what still isn't.

Every audit is a row in audit/ledger.csv (reports in audit/reports/). The
ledger knows which commits each audit covered, so it can list commits
nobody has audited yet and FAIL verdicts nobody has fixed. Hooks use it to
stop a session from ending, or a push from happening, with unaudited work.

Commands:
  init [--from REF]          start the ledger; commits up to REF (default HEAD) count as the baseline
  add  --verdict PASS|NOTES|FAIL --kind KIND --summary TEXT
       (--commit SHA|A..B ... | --all-unaudited | --scope TEXT) [--counts C,H,M,L]
       [--report PATH] [--auditor agent|self] [--resolves ID]
                             record one audit of exactly what was read
  status [--json]            unaudited commits, open FAILs, last audits
  check                      exit 1 if anything is unaudited or an open FAIL exists (CI, preflight)
  brief                      what to audit next: the commit range, files changed, and the agent prompt
  hook stop|prepush          for Claude Code hooks (reads the hook's JSON on stdin; exit 2 blocks).
                             stop: blocks while files are uncommitted, commits unaudited or a FAIL open.
                             prepush: blocks common forms of `git push` and the GitHub write tools until
                             audited; .githooks/pre-push (enabled by init) catches every push.
                             Any internal error blocks too (fail closed).

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
    """The commit the ledger started at, or None (ledger started in an empty repo: audit everything)."""
    for r in rows:
        if r.get("kind") == "baseline":
            shas = (r.get("commits") or "").split()
            return shas[0] if shas else None
    return None


def dirty(root):
    """Uncommitted changes outside audit/ (work nobody can have audited yet)."""
    p = subprocess.run(["git", "status", "--porcelain", "--untracked-files=all"], cwd=root, capture_output=True, text=True)
    if p.returncode != 0:
        raise RuntimeError(f"git status failed: {p.stderr.strip()}")  # can't tell: the caller fails closed
    # Porcelain lines are "XY path" (or "XY old -> new"); don't strip them, the status letters can be spaces.
    files = [line[3:].split(" -> ")[-1].strip('"') for line in p.stdout.splitlines() if len(line) > 3]
    return [f for f in files if not f.startswith("audit/")]


GIT_OPTS_WITH_VALUE = {"-C", "-c", "--git-dir", "--work-tree", "--namespace", "--exec-path"}
PUSH_TOOLS = re.compile(r"^mcp__github__(?:push_files|create_or_update_file|delete_file|merge_pull_request|create_branch"
                        r"|update_pull_request_branch)$")
WRAPPERS = {"sudo", "command", "exec", "time", "env", "nohup", "nice", "stdbuf", "timeout", "xargs", "builtin", "then",
            "else", "do", "if", "while", "until", "!", "{", "elif"}
SHELLS = {"sh", "bash", "zsh", "dash", "ksh"}
WRAPPER_OPTS_WITH_VALUE = {"-u", "-g", "-k", "-s", "-n", "-C", "-D", "-o", "--user", "--group", "--signal", "--kill-after", "--chdir"}


def is_push(command: str, depth: int = 0) -> bool:
    """True if a shell command runs `git ... push` in its common forms: git options before
    `push`, after ; && || | ( {, behind wrappers (sudo, env, timeout N, nohup, xargs...),
    inside if/then/do, and inside `sh -c '...'` or `eval ...`. Aliases and computed
    commands can still hide a push: the git pre-push hook in .githooks/ catches those."""
    if depth > 3:
        return False
    import shlex
    try:
        lexer = shlex.shlex(command, posix=True, punctuation_chars=";&|()")
        lexer.whitespace_split = True
        tokens = list(lexer)
    except ValueError:
        return bool(re.search(r"\bgit\b.*\bpush\b", command))
    i, start = 0, True  # start: this token is where a command begins
    while i < len(tokens):
        tok = tokens[i]
        if tok and all(ch in ";&|()" for ch in tok):
            start = True
            i += 1
            continue
        if start and (re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*=.*", tok) or tok in WRAPPERS
                      or (tok.startswith("-") and i > 0 and (tokens[i - 1] in WRAPPERS or tokens[i - 1].startswith("-")))
                      or (i > 0 and tokens[i - 1] in WRAPPER_OPTS_WITH_VALUE and i > 1 and (tokens[i - 2] in WRAPPERS or tokens[i - 2].startswith("-")))
                      or (re.fullmatch(r"\d+[smhd]?", tok) and i > 0 and tokens[i - 1] in ("timeout", "-k"))):
            i += 1  # VAR=value, wrappers and their options/durations still come before the command
            continue
        if start and os.path.basename(tok) in SHELLS:
            rest = tokens[i + 1:]
            if "-c" in rest and rest.index("-c") + 1 < len(rest) and is_push(rest[rest.index("-c") + 1], depth + 1):
                return True
        if start and tok == "eval" and is_push(" ".join(tokens[i + 1:]), depth + 1):
            return True
        if not start:
            i += 1
            continue
        start = False
        if os.path.basename(tok) == "git":
            j = i + 1
            while j < len(tokens) and tokens[j].startswith("-"):
                j += 2 if tokens[j] in GIT_OPTS_WITH_VALUE else 1
            if j < len(tokens) and tokens[j] == "push":
                return True
        i += 1
    return False


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
    hooks_dir = root / ".githooks"
    if (hooks_dir / "pre-push").exists():
        try:
            current = git("config", "--get", "core.hooksPath", cwd=root)
        except RuntimeError:
            current = ""
        if not current:
            git("config", "core.hooksPath", ".githooks", cwd=root)
            print("git pre-push hook enabled (core.hooksPath = .githooks): every push form is checked.")
        elif current != ".githooks":
            print(f"Note: core.hooksPath is {current!r}; add .githooks/pre-push to it to check every push.")
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
    if a.all_unaudited:
        commits = unaudited(root, rows)
        if not commits:
            print("Nothing unaudited.", file=sys.stderr)
            return 2
    if not commits and not a.scope:
        print("Say what was audited: --commit SHA or A..B (the commits you actually read), "
              "--all-unaudited (only if you audited every one `brief` listed), or --scope for non-commit work.",
              file=sys.stderr)
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
    except (json.JSONDecodeError, ValueError):
        data = {}
    if not isinstance(data, dict):
        data = {}
    # Decide what's at stake before touching the ledger, so a broken ledger can't trap a session:
    if a.event == "stop" and data.get("stop_hook_active"):
        return 0  # already continuing because of this hook: never loop
    if a.event == "prepush":
        tool = str(data.get("tool_name") or "")
        cmd = str((data.get("tool_input") or {}).get("command") or "")
        if not (PUSH_TOOLS.match(tool) or is_push(cmd)):
            return 0  # not a push: never block ordinary commands
    try:
        return hook_inner(a, root, data)
    except Exception as e:  # fail closed, but only for a push or one stop attempt
        print(f"Auditor hook error ({type(e).__name__}: {e}). The audit can't be checked, so this is blocked; "
              "tell the founder, and fix .claude/skills/auditor/scripts/audit.py or the ledger.", file=sys.stderr)
        return 2


def hook_inner(a, root, data):
    if root is None:
        return 0
    rows = read_rows(root)
    if rows is None:
        return 0  # ledger not started in this repo: nothing to enforce
    if a.event == "stop":
        un, fails, _ = summary(root, rows)
        wip = dirty(root)
        if wip:
            print(f"Auditor: {len(wip)} uncommitted file(s) ({', '.join(wip[:5])}) haven't been audited. Tell the founder "
                  "what is uncommitted and whether it's finished; finished work gets committed (when the founder wants "
                  "commits) and audited before it's called done.", file=sys.stderr)
            return 2
        if un or fails:
            print(f"Auditor: {len(un)} unaudited commit(s) and {len(fails)} open FAIL(s). Before finishing, "
                  "run `python3 .claude/skills/auditor/scripts/audit.py brief`, have the auditor agent audit them, "
                  "and record the result with audit.py add. If the founder said to skip the audit, record that "
                  "with audit.py add --verdict NOTES --auditor self --summary \"skipped at founder's request\".",
                  file=sys.stderr)
            return 2
        return 0
    if a.event == "prepush":  # cmd_hook already established this is a push
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
    p.add_argument("--all-unaudited", action="store_true")
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
