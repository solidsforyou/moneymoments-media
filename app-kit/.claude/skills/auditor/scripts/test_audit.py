"""Tests for audit.py. Run: python3 -m pytest -q this_file"""

import json
import os
import subprocess
import sys
from pathlib import Path

SCRIPT = Path(__file__).with_name("audit.py")


def sh(*args, cwd):
    return subprocess.run(list(args), cwd=cwd, capture_output=True, text=True, check=True).stdout


def audit(cwd, *args, stdin=None):
    env = dict(os.environ, CLAUDE_PROJECT_DIR=str(cwd))
    p = subprocess.run([sys.executable, str(SCRIPT), *args], cwd=cwd, capture_output=True, text=True,
                       input=stdin, env=env)
    return p.returncode, p.stdout + p.stderr


def commit(cwd, name):
    (Path(cwd) / name).write_text(name)
    sh("git", "add", name, cwd=cwd)
    sh("git", "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", f"add {name}", cwd=cwd)
    return sh("git", "rev-parse", "HEAD", cwd=cwd).strip()


def repo(tmp_path):
    sh("git", "init", "-q", "-b", "main", cwd=tmp_path)
    commit(tmp_path, "old.txt")
    return tmp_path


def test_no_ledger_means_hooks_stay_quiet(tmp_path):
    repo(tmp_path)
    code, _ = audit(tmp_path, "hook", "stop", stdin="{}")
    assert code == 0
    code, out = audit(tmp_path, "check")
    assert code == 1 and "init" in out


def test_baseline_then_unaudited_then_audited(tmp_path):
    repo(tmp_path)
    assert audit(tmp_path, "init")[0] == 0
    assert audit(tmp_path, "check")[0] == 0          # history before the baseline is not demanded
    a = commit(tmp_path, "a.txt")
    b = commit(tmp_path, "b.txt")
    code, out = audit(tmp_path, "status")
    assert code == 1 and "Unaudited commits: 2" in out
    code, out = audit(tmp_path, "brief")
    assert a[:10] in out and "a.txt" in out
    code, out = audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "looks right")
    assert code == 0 and "A-0001 PASS" in out and "2 commit(s)" in out
    assert audit(tmp_path, "check")[0] == 0
    rows = (Path(tmp_path) / "audit" / "ledger.csv").read_text()
    assert a in rows and b in rows


def test_fail_stays_open_until_resolved(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    code, out = audit(tmp_path, "add", "--verdict", "FAIL", "--kind", "code", "--summary", "rounding bug",
                      "--counts", "0,1,0,0")
    assert code == 0 and "--resolves A-0001" in out
    assert audit(tmp_path, "check")[0] == 1            # commit audited, but the FAIL is open
    fix = commit(tmp_path, "fix.txt")
    code, out = audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "fixed",
                      "--commit", fix, "--resolves", "A-0001")
    assert code == 0
    assert audit(tmp_path, "check")[0] == 0


def test_verdict_and_counts_must_agree(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    assert audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "x", "--counts", "0,0,1,0")[0] == 2
    assert audit(tmp_path, "add", "--verdict", "NOTES", "--kind", "code", "--summary", "x", "--counts", "0,1,0,0")[0] == 2
    assert audit(tmp_path, "add", "--verdict", "MAYBE", "--kind", "code", "--summary", "x")[0] == 2
    assert audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "x", "--resolves", "A-0099")[0] == 2


def test_scope_only_audit_for_non_commit_work(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    code, out = audit(tmp_path, "add", "--verdict", "NOTES", "--kind", "research", "--summary", "partner shortlist",
                      "--scope", "chat reply: gateway shortlist", "--counts", "0,0,1,1")
    assert code == 0 and "A-0001 NOTES" in out


def test_stop_hook_blocks_until_audited_and_never_loops(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    code, out = audit(tmp_path, "hook", "stop", stdin=json.dumps({"stop_hook_active": False}))
    assert code == 2 and "unaudited" in out
    code, _ = audit(tmp_path, "hook", "stop", stdin=json.dumps({"stop_hook_active": True}))
    assert code == 0
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "ok")
    assert audit(tmp_path, "hook", "stop", stdin="{}")[0] == 0


def test_prepush_hook_only_blocks_pushes(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    push = json.dumps({"tool_name": "Bash", "tool_input": {"command": "git push -u origin main"}})
    other = json.dumps({"tool_name": "Bash", "tool_input": {"command": "git status"}})
    assert audit(tmp_path, "hook", "prepush", stdin=push)[0] == 2
    assert audit(tmp_path, "hook", "prepush", stdin=other)[0] == 0


def test_merge_commits_are_not_demanded(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    sh("git", "checkout", "-qb", "side", cwd=tmp_path)
    commit(tmp_path, "s.txt")
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "side ok")
    sh("git", "checkout", "-q", "main", cwd=tmp_path)
    commit(tmp_path, "m.txt")
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "main ok")
    sh("git", "-c", "user.email=t@t", "-c", "user.name=t", "merge", "-q", "--no-edit", "side", cwd=tmp_path)
    assert audit(tmp_path, "check")[0] == 0


def test_committing_the_ledger_does_not_need_an_audit(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "ok")
    sh("git", "add", "audit", cwd=tmp_path)
    sh("git", "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "Audit A-0001", cwd=tmp_path)
    assert audit(tmp_path, "check")[0] == 0
