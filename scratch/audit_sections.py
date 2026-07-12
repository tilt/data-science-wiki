#!/usr/bin/env python3
"""Lightweight content audit for section-depth acceptance signals."""

from __future__ import annotations

import pathlib
import re
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]
LINK_RE = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
REF_RE = re.compile(r"^- \[[^\]]+\]\((https?://[^)]+)\)", re.M)


def frontmatter(text: str) -> str:
    if not text.startswith("---\n"):
        return ""
    end = text.find("\n---\n", 4)
    return text[4:end] if end != -1 else ""


def related_count(fm: str) -> int:
    lines = fm.splitlines()
    count = 0
    in_related = False
    for line in lines:
        if line.startswith("related:"):
            in_related = True
            continue
        if in_related:
            if line.startswith("  - "):
                val = line[4:].strip()
                if val and val != "index.md":
                    count += 1
            elif line and not line.startswith(" "):
                break
    return count


def body(text: str) -> str:
    end = text.find("\n---\n", 4) if text.startswith("---\n") else -1
    return text[end + 5 :] if end != -1 else text


def body_link_count(text: str) -> int:
    refs_started = text.find("\n## References")
    candidate = text if refs_started == -1 else text[:refs_started]
    return sum(
        1
        for href in LINK_RE.findall(candidate)
        if not href.startswith("http") and "index.md" not in href
    )


def has_mechanism(text: str) -> bool:
    return bool(re.search(r"\$|## Defining|## Mechanism|## Concrete artifact|## Executed artifact", text))


def has_artifact(text: str) -> bool:
    return bool(re.search(r"## (Worked example|Executed artifact|Concrete artifact)|Observed output", text))


def audit(section: pathlib.Path) -> tuple[int, dict[str, int], list[str]]:
    pages = sorted(p for p in section.glob("*.md") if p.name != "index.md")
    counts = {"mechanism": 0, "artifact": 0, "links": 0, "related": 0, "refs": 0}
    failures: list[str] = []
    for path in pages:
        text = path.read_text()
        fm = frontmatter(text)
        b = body(text)
        checks = {
            "mechanism": has_mechanism(b),
            "artifact": has_artifact(b),
            "links": body_link_count(b) >= 3,
            "related": related_count(fm) >= 3,
            "refs": len(REF_RE.findall(text)) >= 1,
        }
        for key, ok in checks.items():
            counts[key] += int(ok)
            if not ok:
                failures.append(f"{path.relative_to(ROOT)} missing {key}")
    return len(pages), counts, failures


def main(args: list[str]) -> int:
    exit_code = 0
    for arg in args:
        total, counts, failures = audit(ROOT / arg)
        print(f"{arg}: pages={total} " + " ".join(f"{k}={v}" for k, v in counts.items()))
        for failure in failures:
            print(f"  FAIL {failure}")
        if failures:
            exit_code = 1
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
