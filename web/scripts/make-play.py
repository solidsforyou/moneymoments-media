#!/usr/bin/env python3
"""Builds public/play/ from the design preview (a page fragment): wraps it in a full page,
applies the latest mascot names, and adds a banner that says plainly it's an old demo with
made-up people, pointing to the real apps.

  python3 scripts/make-play.py ../app-kit/design/opensource-everything-preview.html
"""
import os, subprocess, sys, tempfile
frag = open(sys.argv[1], encoding='utf-8').read()
banner = ('<div style="position:sticky;top:0;z-index:999;background:#0B0B0F;color:#FBFBFE;padding:10px 16px;'
          'font:600 14px/1.4 -apple-system,Inter,sans-serif;text-align:center">Old design demo. The people, chats and '
          'numbers here are made up. The real apps: <a href="/openprep/" style="color:#9DB7FF">OpenPrep</a>, '
          '<a href="/goodhabit/" style="color:#9DB7FF">GoodHabit</a>, <a href="/tomorrow/" style="color:#9DB7FF">Tomorrow</a>.</div>')
doc = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
       '<meta name="robots" content="noindex"></head><body>' + banner + frag + '</body></html>')
with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as t:
    t.write(doc); tmp = t.name
subprocess.run([sys.executable, '../videos/explainer/names.py', tmp, 'public/play/index.html'], check=True)
os.remove(tmp)
