#!/usr/bin/env python3
"""Check Arena research/bank/syllabus sheets, fill score and selected, print a summary.

usage: check.py <csv file or folder> [...]   (folders are searched recursively)
Exit code 1 if any sheet has errors."""
import csv, os, sys, re
from collections import defaultdict

COLS = {
    'syllabus': ['chapter_no', 'chapter', 'topics', 'book', 'edition', 'source_url'],
    'research': ['ref_id', 'chapter_no', 'chapter', 'topic', 'difficulty', 'source_id', 'source_url', 'gist', 'qtype', 'skill', 'est_seconds', 'fit', 'quality', 'relevance'],
    'bank': ['qid', 'chapter_no', 'chapter', 'topic', 'difficulty', 'hardness', 'est_seconds', 'quality', 'relevance', 'question', 'a', 'b', 'c', 'd', 'answer', 'why', 'modelled_on'],
}
EXTRA = {'research': ['score', 'selected'], 'bank': ['score', 'selected']}
TOP = {'research': 5, 'bank': 6}
SOURCES = {'NCERT', 'NCERT-EXEMPLAR', 'CBSE', 'PW', 'BYJUS', 'VEDANTU', 'LEARNCBSE', 'TIWARI', 'EMBIBE', 'CAREERS360', 'CL', 'IMS', 'TIME', 'CRACKU', '2IIM', 'IIM-CAT', 'SEBI', 'RBI', 'NCFE', 'NISM', 'CERTIN', 'MEITY', 'OTHER'}
BANDS = ['easy', 'medium', 'hard']
NAME = re.compile(r'^(school-(0[1-9]|1[0-2])-(maths|evs|science|english|physics|chemistry|biology)|cat-00-(qa|dilr|varc)|money-00-money|digital-00-digital)\.csv$')


def num(v, lo, hi, cast=int):
    try:
        x = cast(v)
    except (TypeError, ValueError):
        return None
    return x if lo <= x <= hi else None


def kind_of(path):
    for k in COLS:
        if f'{os.sep}{k}{os.sep}' in os.sep + os.path.relpath(path):
            return k
    return None


def check(path):
    kind, errs, name = kind_of(path), [], os.path.basename(path)
    if not kind:
        return [f'{path}: not inside syllabus/, research/ or bank/'], None
    if not NAME.match(name):
        errs.append(f'{name}: file name must look like school-07-maths.csv (see README)')
    with open(path, newline='', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))
        f.seek(0)
        header = next(csv.reader(f), [])
    missing = [c for c in COLS[kind] if c not in header]
    if missing:
        return [f'{name}: missing columns {missing}'], None
    seen, out = set(), []
    for i, r in enumerate(rows, start=2):
        at = f'{name}:{i}'
        for c in COLS[kind]:
            if c not in ('modelled_on', 'source_url' if kind == 'syllabus' else '_') and not (r.get(c) or '').strip():
                errs.append(f'{at}: empty {c}')
        if num(r['chapter_no'], 1, 40) is None:
            errs.append(f'{at}: chapter_no must be 1-40')
        if kind == 'syllabus':
            out.append(r)
            continue
        key = r['ref_id' if kind == 'research' else 'qid']
        if key in seen:
            errs.append(f'{at}: duplicate id {key}')
        seen.add(key)
        if r['difficulty'] not in BANDS:
            errs.append(f'{at}: difficulty must be easy, medium or hard')
        if num(r['est_seconds'], 5, 600) is None:
            errs.append(f'{at}: est_seconds must be 5-600')
        q, rel = num(r['quality'], 1, 5), num(r['relevance'], 1, 5)
        if q is None or rel is None:
            errs.append(f'{at}: quality and relevance must be 1-5')
        if kind == 'research':
            fit = num(r['fit'], 1, 10)
            if fit is None:
                errs.append(f'{at}: fit must be 1-10')
            if r['source_id'] not in SOURCES:
                errs.append(f'{at}: unknown source_id {r["source_id"]}')
            if not r['source_url'].startswith('http'):
                errs.append(f'{at}: source_url must be a link')
            if len(r['gist'].split()) > 25:
                errs.append(f'{at}: gist over 25 words; summarise in your own words')
            r['score'] = round((fit or 0) / 10 * 40 + (q or 0) / 5 * 30 + (rel or 0) / 5 * 30)
        else:
            if num(r['hardness'], 1, 10) is None:
                errs.append(f'{at}: hardness must be 1-10')
            opts = [r[k].strip() for k in 'abcd']
            if len(set(o.lower() for o in opts)) < 4:
                errs.append(f'{at}: the 4 options must all be different')
            if r['answer'] not in ('A', 'B', 'C', 'D'):
                errs.append(f'{at}: answer must be A, B, C or D')
            r['score'] = round((q or 0) / 5 * 50 + (rel or 0) / 5 * 50)
        out.append(r)
    if kind != 'syllabus':
        groups = defaultdict(list)
        for r in out:
            g = (r['chapter_no'], r['topic'] if kind == 'research' else '', r['difficulty'])
            groups[g].append(r)
        for g in groups.values():
            g.sort(key=lambda r: (-int(r['score']), int(r['est_seconds'] or 0)))
            for j, r in enumerate(g):
                r['selected'] = 'Y' if j < TOP[kind] else 'N'
        with open(path, 'w', newline='', encoding='utf-8') as f:
            w = csv.DictWriter(f, fieldnames=COLS[kind] + EXTRA[kind], extrasaction='ignore')
            w.writeheader()
            w.writerows(out)
    return errs, (kind, out)


def main(args):
    files = []
    for a in args or ['content/arena']:
        if os.path.isdir(a):
            for d, _, fs in os.walk(a):
                files += [os.path.join(d, f) for f in fs if f.endswith('.csv') and kind_of(os.path.join(d, f))]
        else:
            files.append(a)
    bad = 0
    for p in sorted(files):
        errs, res = check(p)
        if errs:
            bad += 1
            print(f'FAIL {p}')
            for e in errs[:30]:
                print('   ', e)
            if len(errs) > 30:
                print(f'    ... {len(errs) - 30} more')
            continue
        kind, rows = res
        if kind == 'syllabus':
            print(f'ok   {p}: {len(rows)} chapters')
            continue
        per = defaultdict(int)
        for r in rows:
            per[r['difficulty']] += 1
        chapters = len({r['chapter_no'] for r in rows})
        srcs = len({r['source_id'] for r in rows}) if kind == 'research' else None
        print(f'ok   {p}: {len(rows)} rows, {chapters} chapters, ' + ', '.join(f'{b} {per[b]}' for b in BANDS) + (f', {srcs} sources' if srcs else ''))
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main(sys.argv[1:])
