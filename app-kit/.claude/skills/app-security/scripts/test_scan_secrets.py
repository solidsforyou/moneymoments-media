"""Tests for scan_secrets.py. Run: python3 -m pytest -q this_file.

Fake secrets are built by joining pieces at runtime so this file itself
never contains one and the scanner stays quiet on it.
"""

import base64
import json
import subprocess
import sys
from pathlib import Path

SCRIPT = Path(__file__).with_name("scan_secrets.py")


def jwt(payload):
    def b64(d):
        return base64.urlsafe_b64encode(json.dumps(d).encode()).decode().rstrip("=")
    return ".".join([b64({"alg": "HS256", "typ": "JWT"}), b64(payload), "s" * 43])


def scan(tmp_path, *extra):
    p = subprocess.run([sys.executable, str(SCRIPT), str(tmp_path), "--json", *extra],
                       capture_output=True, text=True)
    return p.returncode, json.loads(p.stdout)


def whats(report, severity=None):
    return [f["what"] for f in report["findings"] if severity is None or f["severity"] == severity]


def test_clean_repo_passes(tmp_path):
    (tmp_path / "app.ts").write_text("const key = process.env.API_KEY;\nexport const n = 1;\n")
    (tmp_path / ".env.example").write_text("API_KEY=your_api_key_here\n")
    code, r = scan(tmp_path)
    assert code == 0 and r["findings"] == []


def test_real_looking_keys_fail(tmp_path):
    aws = "AKIA" + "Q" * 16
    gh = "ghp_" + "a1B2" * 9
    (tmp_path / "config.ts").write_text(f'const a = "{aws}";\nconst b = "{gh}";\n')
    code, r = scan(tmp_path)
    assert code == 1
    found = " ".join(whats(r, "high"))
    assert "AWS access key" in found and "GitHub token" in found
    assert aws not in json.dumps(r)  # values are masked


def test_private_key_and_env_file(tmp_path):
    (tmp_path / "key.txt").write_text("-----BEGIN " + "RSA PRIVATE KEY-----\nabc\n")
    (tmp_path / ".env").write_text("DB_PASSWORD=" + "hunter2hunter2\n")
    code, r = scan(tmp_path)
    assert code == 1
    found = " ".join(whats(r, "high"))
    assert "private key" in found and "committed env file" in found
    assert any("DB_PASSWORD" in w for w in whats(r, "medium"))


def test_supabase_keys_by_role(tmp_path):
    (tmp_path / "a.ts").write_text(f'const anon = "{jwt({"role": "anon"})}";\n')
    code, r = scan(tmp_path)
    assert code == 0 and "anon key" in whats(r, "info")[0]
    (tmp_path / "b.ts").write_text(f'const admin = "{jwt({"role": "service_role"})}";\n')
    code, r = scan(tmp_path)
    assert code == 1 and "service_role" in whats(r, "high")[0]


def test_public_prefix_with_secret_name(tmp_path):
    (tmp_path / "x.ts").write_text("const k = process.env.NEXT_PUBLIC_" + "STRIPE_SECRET_KEY;\n")
    code, r = scan(tmp_path)
    assert code == 1 and "public env variable" in whats(r, "high")[0]


def test_assignment_and_placeholders(tmp_path):
    (tmp_path / "c.py").write_text(
        'client_secret = "' + "k9Fz2LmQ8vR4tW7y" + '"\n'
        'api_key = "your_api_key_here"\n'
        'password = "changeme123456"\n'
        'token = os.environ["TOKEN"]\n')
    code, r = scan(tmp_path)
    assert code == 1
    assert len(whats(r, "medium")) == 1 and "client_secret" in whats(r, "medium")[0]


def test_allow_comment_and_glob(tmp_path):
    aws = "AKIA" + "Q" * 16
    (tmp_path / "a.ts").write_text(f'const a = "{aws}"; // secret-scan: allow\n')
    (tmp_path / "fixtures").mkdir()
    (tmp_path / "fixtures" / "b.ts").write_text(f'const b = "{aws}";\n')
    code, r = scan(tmp_path, "--allow", "fixtures/*")
    assert code == 0 and r["findings"] == []


def test_skips_dependencies_and_binaries(tmp_path):
    aws = "AKIA" + "Q" * 16
    (tmp_path / "node_modules" / "pkg").mkdir(parents=True)
    (tmp_path / "node_modules" / "pkg" / "i.js").write_text(f'"{aws}"')
    (tmp_path / "logo.png").write_bytes(b"\x89PNG" + aws.encode())
    code, r = scan(tmp_path, "--all-files")
    assert code == 0


def test_git_mode_respects_gitignore(tmp_path):
    aws = "AKIA" + "Q" * 16
    subprocess.run(["git", "init", "-q"], cwd=tmp_path, check=True)
    (tmp_path / ".gitignore").write_text("secret.ts\n")
    (tmp_path / "secret.ts").write_text(f'"{aws}"')
    code, r = scan(tmp_path)
    assert code == 0
    code, r = scan(tmp_path, "--all-files")
    assert code == 1


def test_keystore_file(tmp_path):
    (tmp_path / "release.keystore").write_bytes(b"\x00\x01")
    code, r = scan(tmp_path)
    assert code == 1 and "Android keystore" in whats(r, "high")[0]


def test_url_with_password_and_paths(tmp_path):
    (tmp_path / "db.ts").write_text(
        'const db = "postgres://app:' + 'Zq81mWx2@db.prod-cluster.net:5432/app";\n'
        'const pwd = "/Users/someone/projects";\n'
        'const ok = "https://example.com/path";\n')
    code, r = scan(tmp_path)
    assert code == 1
    assert [w.split(":")[0] for w in whats(r)] == ["URL with a password"]


def test_example_urls_are_ignored(tmp_path):
    (tmp_path / "README.md").write_text(
        "redis://user:pass@localhost:6379\nhttps://abc:xyz@example.com\nhttp://[user:pwd]@domain.tld:port\n")
    code, r = scan(tmp_path)
    assert code == 0 and r["findings"] == []
