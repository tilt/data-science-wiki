---
title: Code Review
slug: software-engineering/code-review
description: Human review of correctness, maintainability, and operational risk before merge.
area: software-engineering
topics:
  - code-review
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - testing.md
related:
  - "testing.md"
  - "refactoring.md"
  - "documentation.md"
  - "requirements-engineering.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Code Review

Code review is a change-control mechanism for catching defects that automated checks do not understand yet. In data and ML systems, that includes feature semantics, leakage risk, metric definitions, rollout behavior, and operational ownership. A reviewer should read the intent first, then inspect contracts, tests, data assumptions, and failure handling before style details.

## Review Contract

A useful review separates blockers from preferences. Block on wrong behavior, missing tests for risky paths, broken [API design](api-design.md), security or privacy regressions, migrations without rollback, and undocumented changes to user-visible behavior. Prefer comments such as "this changes the time window from rolling 24 hours to UTC calendar day; please update the feature contract and backtest by region" over vague comments such as "seems risky."

## Executed Artifact

This snippet reproduces a semantic review issue: a feature changed from rolling 24 hours to UTC calendar day.

```python
from datetime import datetime, timezone, timedelta

now = datetime(2026, 7, 11, 12, 0, tzinfo=timezone.utc)
events = [
    datetime(2026, 7, 10, 13, 0, tzinfo=timezone.utc),
    datetime(2026, 7, 10, 23, 30, tzinfo=timezone.utc),
    datetime(2026, 7, 11, 8, 0, tzinfo=timezone.utc),
]
last_24h = [e for e in events if now - e <= timedelta(hours=24)]
calendar_day = [e for e in events if e.date() == now.date()]
print("last_24h_count", len(last_24h))
print("utc_calendar_day_count", len(calendar_day))
print("semantic_change", len(last_24h) != len(calendar_day))
```

Observed output:

```text
last_24h_count 3
utc_calendar_day_count 1
semantic_change True
```

The diff might look like a harmless SQL cleanup, but the product behavior changed. Review should ask for an updated [documentation](documentation.md) contract, a [testing](testing.md) fixture for the boundary condition, and a separate [refactoring](refactoring.md) commit if cleanup is mixed with behavior change.

## Failure Modes

Reviews fail when one expert becomes the only quality gate, when comments are mostly taste, or when large pull requests hide the important change. Repeated review comments should migrate into linters, tests, templates, or [requirements engineering](requirements-engineering.md) checklists so humans spend attention on new risks.

## References

- [Google Engineering Practices: How to do a code review](https://google.github.io/eng-practices/review/reviewer/)
- [pytest documentation: assertions](https://docs.pytest.org/en/stable/how-to/assert.html)
