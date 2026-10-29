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
    code, out = audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "looks right", "--all-unaudited")
    assert code == 0 and "A-0001 PASS" in out and "2 commit(s)" in out
    assert audit(tmp_path, "check")[0] == 0
    rows = (Path(tmp_path) / "audit" / "ledger.csv").read_text()
    assert a in rows and b in rows


def test_fail_stays_open_until_resolved(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    code, out = audit(tmp_path, "add", "--verdict", "FAIL", "--kind", "code", "--summary", "rounding bug", "--all-unaudited",
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
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "ok", "--all-unaudited")
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
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "side ok", "--all-unaudited")
    sh("git", "checkout", "-q", "main", cwd=tmp_path)
    commit(tmp_path, "m.txt")
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "main ok", "--all-unaudited")
    sh("git", "-c", "user.email=t@t", "-c", "user.name=t", "merge", "-q", "--no-edit", "side", cwd=tmp_path)
    assert audit(tmp_path, "check")[0] == 0


def test_committing_the_ledger_does_not_need_an_audit(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "ok", "--all-unaudited")
    sh("git", "add", "audit", cwd=tmp_path)
    sh("git", "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "Audit A-0001", cwd=tmp_path)
    assert audit(tmp_path, "check")[0] == 0


def test_add_needs_an_explicit_scope(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    code, out = audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "x")
    assert code == 2 and "Say what was audited" in out


def test_ledger_started_in_an_empty_repo(tmp_path):
    sh("git", "init", "-q", "-b", "main", cwd=tmp_path)
    assert audit(tmp_path, "init")[0] == 0
    commit(tmp_path, "a.txt")
    code, out = audit(tmp_path, "status")
    assert code == 1 and "Unaudited commits: 1" in out
    assert audit(tmp_path, "hook", "stop", stdin="{}")[0] == 2
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "ok", "--all-unaudited")
    assert audit(tmp_path, "check")[0] == 0


def test_hook_fails_closed_on_internal_error(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    ledger = Path(tmp_path) / "audit" / "ledger.csv"
    ledger.unlink()
    ledger.mkdir()  # unreadable ledger
    code, out = audit(tmp_path, "hook", "stop", stdin="{}")
    assert code == 2 and "hook error" in out


def test_stop_hook_blocks_on_uncommitted_work(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    (Path(tmp_path) / "wip.txt").write_text("unfinished")
    code, out = audit(tmp_path, "hook", "stop", stdin="{}")
    assert code == 2 and "uncommitted" in out


def test_push_detection():
    sys.path.insert(0, str(SCRIPT.parent))
    from audit import is_push
    for cmd in ["git push", "git push -u origin main", "git -C . push", "git -c x=y push origin",
                "cd repo && git push", "echo hi; git --git-dir=.git push", "/usr/bin/git push"]:
        assert is_push(cmd), cmd
    for cmd in ["git commit -m 'then git push later'", "git status", "echo git push", "git log --format=push"]:
        assert not is_push(cmd), cmd


def test_prepush_blocks_github_write_tools(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    commit(tmp_path, "a.txt")
    tool = json.dumps({"tool_name": "mcp__github__push_files", "tool_input": {}})
    assert audit(tmp_path, "hook", "prepush", stdin=tool)[0] == 2
    read = json.dumps({"tool_name": "mcp__github__get_file_contents", "tool_input": {}})
    assert audit(tmp_path, "hook", "prepush", stdin=read)[0] == 0


def test_ledger_changes_are_not_uncommitted_work(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    sh("git", "add", "audit", cwd=tmp_path)
    sh("git", "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "ledger", cwd=tmp_path)
    commit(tmp_path, "a.txt")
    audit(tmp_path, "add", "--verdict", "PASS", "--kind", "code", "--summary", "ok", "--all-unaudited")
    # audit/ledger.csv is now modified (tracked): that alone must not block
    assert audit(tmp_path, "hook", "stop", stdin="{}")[0] == 0
    (Path(tmp_path) / "old.txt").write_text("changed")
    code, out = audit(tmp_path, "hook", "stop", stdin="{}")
    assert code == 2 and "old.txt" in out


def test_broken_ledger_never_traps_a_session(tmp_path):
    repo(tmp_path)
    audit(tmp_path, "init")
    ledger = Path(tmp_path) / "audit" / "ledger.csv"
    ledger.unlink()
    ledger.mkdir()
    assert audit(tmp_path, "hook", "stop", stdin=json.dumps({"stop_hook_active": True}))[0] == 0
    ls = json.dumps({"tool_name": "Bash", "tool_input": {"command": "ls -la"}})
    assert audit(tmp_path, "hook", "prepush", stdin=ls)[0] == 0
    push = json.dumps({"tool_name": "Bash", "tool_input": {"command": "git push"}})
    assert audit(tmp_path, "hook", "prepush", stdin=push)[0] == 2


def test_more_push_forms():
    sys.path.insert(0, str(SCRIPT.parent))
    from audit import is_push
    for cmd in ["sh -c 'git push'", 'bash -c "cd x && git push origin main"', "eval git push", "timeout 60 git push",
                "nohup git push &", "echo main | xargs git push origin", "if true; then git push; fi", "{ git push; }",
                "sudo -u me git push", "env GIT_TRACE=1 git push"]:
        assert is_push(cmd), cmd
    for cmd in ["sh -c 'git status'", "timeout 60 npm test", "eval echo push"]:
        assert not is_push(cmd), cmd


def test_git_pre_push_hook_blocks_real_pushes(tmp_path):
    kit = SCRIPT.parents[3].parent  # app-kit/
    remote = tmp_path / "remote.git"
    work = tmp_path / "work"
    sh("git", "init", "-q", "--bare", str(remote), cwd=tmp_path)
    work.mkdir()
    repo(work)
    import shutil
    shutil.copytree(kit / ".claude", work / ".claude")
    shutil.copytree(kit / ".githooks", work / ".githooks")
    sh("git", "add", "-A", cwd=work)
    sh("git", "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "kit", cwd=work)
    code, out = audit(work, "init")
    assert "pre-push hook enabled" in out
    sh("git", "remote", "add", "origin", str(remote), cwd=work)
    commit(work, "feature.txt")
    p = subprocess.run(["git", "push", "-q", "origin", "main"], cwd=work, capture_output=True, text=True)
    assert p.returncode != 0 and "blocked by the auditor" in p.stderr
    audit(work, "add", "--verdict", "PASS", "--kind", "code", "--summary", "ok", "--all-unaudited")
    p = subprocess.run(["git", "push", "-q", "origin", "main"], cwd=work, capture_output=True, text=True)
    assert p.returncode == 0, p.stderr
