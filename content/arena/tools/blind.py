#!/usr/bin/env python3
"""Independent answer check for a bank sheet.

  blind.py export <name> [frac]     writes content/arena/check/<name>.questions.csv (no answers);
                                    frac (e.g. 0.2) exports a fixed random sample, spread over chapters and bands
  blind.py compare <name>           compares content/arena/check/<name>.answers.csv
                                    (columns: qid, answer, confidence) with the bank and
                                    prints every disagreement; writes <name>.report.csv
The checker answers the exported sheet without ever opening the bank."""
import csv, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
CHECK = os.path.join(ROOT, 'check')


def bank(name):
    with open(os.path.join(ROOT, 'bank', name + '.csv'), newline='', encoding='utf-8') as f:
        return [r for r in csv.DictReader(f) if r.get('selected') == 'Y']


def export(name, frac=None):
    os.makedirs(CHECK, exist_ok=True)
    rows = bank(name)
    if frac:
        import random
        rnd, groups = random.Random(name), {}
        for r in rows:
            groups.setdefault((r['chapter_no'], r['difficulty']), []).append(r)
        keep = set()
        for g in groups.values():
            keep.update(r['qid'] for r in rnd.sample(g, max(1, round(len(g) * float(frac)))))
        rows = [r for r in rows if r['qid'] in keep]
    p = os.path.join(CHECK, name + '.questions.csv')
    with open(p, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['qid', 'chapter', 'question', 'A', 'B', 'C', 'D'])
        for r in rows:
            w.writerow([r['qid'], r['chapter'], r['question'], r['a'], r['b'], r['c'], r['d']])
    print(p, len(rows), 'questions')


def compare(name):
    rows = {r['qid']: r for r in bank(name)}
    with open(os.path.join(CHECK, name + '.answers.csv'), newline='', encoding='utf-8') as f:
        got = {r['qid']: r for r in csv.DictReader(f)}
    rows = {q: r for q, r in rows.items() if q in got} or rows  # a sample checks only what was exported
    out, missing = [], [q for q in rows if q not in got]
    for qid, r in rows.items():
        g = got.get(qid)
        if g and g['answer'].strip().upper() != r['answer']:
            out.append({'qid': qid, 'key': r['answer'], 'checker': g['answer'].strip().upper(), 'confidence': g.get('confidence', ''), 'question': r['question'], 'a': r['a'], 'b': r['b'], 'c': r['c'], 'd': r['d'], 'why': r['why']})
    with open(os.path.join(CHECK, name + '.report.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=['qid', 'key', 'checker', 'confidence', 'question', 'a', 'b', 'c', 'd', 'why'])
        w.writeheader(); w.writerows(out)
    print(f'{name}: {len(rows)} served, {len(rows) - len(missing)} answered, {len(out)} disagreements, {len(missing)} unanswered')
    for o in out:
        print(f"  {o['qid']}: key {o['key']} vs {o['checker']} ({o['confidence']}) | {o['question'][:90]}")


if __name__ == '__main__':
    {'export': export, 'compare': compare}[sys.argv[1]](*sys.argv[2:4])
