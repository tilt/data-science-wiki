#!/usr/bin/env python3
"""Run selected Markdown python fences and compare with following Observed output."""

from __future__ import annotations

import pathlib
import re
import subprocess
import sys
import tempfile


ROOT = pathlib.Path(__file__).resolve().parents[1]


def first_python_with_output(path: pathlib.Path) -> tuple[str, str]:
    text = path.read_text()
    pattern = re.compile(
        r"```python\n(?P<code>.*?)\n```\n\nObserved output:\n\n```text\n(?P<out>.*?)\n```",
        re.S,
    )
    match = pattern.search(text)
    if not match:
        raise ValueError(f"no python fence followed by Observed output in {path}")
    return match.group("code"), match.group("out")


def main(paths: list[str]) -> int:
    failures = 0
    for rel in paths:
        path = ROOT / rel
        code, expected = first_python_with_output(path)
        with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as handle:
            handle.write(code)
            script = pathlib.Path(handle.name)
        try:
            result = subprocess.run(
                [sys.executable, str(script)],
                cwd=ROOT,
                text=True,
                capture_output=True,
                timeout=30,
                check=False,
            )
        finally:
            script.unlink(missing_ok=True)
        actual = result.stdout.rstrip("\n")
        expected = expected.rstrip("\n")
        if result.returncode != 0:
            failures += 1
            print(f"FAIL {rel}: exit {result.returncode}", file=sys.stderr)
            print(result.stderr, file=sys.stderr)
        elif actual != expected:
            failures += 1
            print(f"FAIL {rel}: output mismatch", file=sys.stderr)
            print("--- expected ---", file=sys.stderr)
            print(expected, file=sys.stderr)
            print("--- actual ---", file=sys.stderr)
            print(actual, file=sys.stderr)
        else:
            print(f"PASS {rel}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
