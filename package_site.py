#!/usr/bin/env python3
"""Package the complete static site using already present, verified image files."""
from pathlib import Path
import argparse
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, default=root.parent / 'armytek-hk-static.zip')
args = parser.parse_args()
assets = json.loads((root / 'ASSETS.json').read_text(encoding='utf-8'))
files = ['index.html', 'assets/css/styles.css', 'assets/js/app.js', 'DEPLOY.txt']
for asset in assets:
    rel = Path(asset['path'])
    if rel.is_absolute() or '..' in rel.parts:
        raise SystemExit('Unsafe asset path')
    file = root / rel
    if not file.is_file():
        raise SystemExit('Missing image: ' + str(rel))
    if hashlib.sha256(file.read_bytes()).hexdigest() != asset['sha256']:
        raise SystemExit('Image differs from supplied file: ' + str(rel))
    files.append(rel.as_posix())
for rel in files:
    if not (root / rel).is_file():
        raise SystemExit('Missing deployable file: ' + rel)
args.output.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(args.output, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for rel in sorted(files):
        archive.write(root / rel, rel)
with zipfile.ZipFile(args.output) as archive:
    bad = archive.testzip()
    if bad:
        raise SystemExit('ZIP integrity check failed: ' + bad)
print(json.dumps({'archive': str(args.output.resolve()), 'files': len(files), 'bytes': args.output.stat().st_size}))
