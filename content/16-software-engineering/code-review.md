---
title: Code Review
slug: software-engineering/code-review
description: Human review of correctness, maintainability, and operational risk before merge.
area: software-engineering
topics:
  - code-review
level: foundational
status: complete
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
last_reviewed: 2026-07-23
---

# Code Review

Code review is a change-control mechanism for catching defects that automated checks do not understand yet. In data and ML systems, that includes feature semantics, leakage risk, metric definitions, rollout behavior, and operational ownership. A reviewer should read the intent first, then inspect contracts, tests, data assumptions, and failure handling before style details.

## Blockers, preferences, and semantic risk

A useful review separates blockers from preferences. Block on wrong behavior, missing tests for risky paths, broken [API design](api-design.md), security or privacy regressions, migrations without rollback, and undocumented changes to user-visible behavior. Prefer comments such as "this changes the time window from rolling 24 hours to UTC calendar day; please update the feature contract and backtest by region" over vague comments such as "seems risky."

## Worked review case

This review case reproduces a semantic issue: a feature changed from rolling 24 hours to UTC calendar day. With `now = 2026-07-11 12:00 UTC`, the three events are:

| event time           | included in rolling 24 hours? | included in UTC calendar day? |
| -------------------- | ----------------------------: | ----------------------------: |
| 2026-07-10 13:00 UTC |                           yes |                            no |
| 2026-07-10 23:30 UTC |                           yes |                            no |
| 2026-07-11 08:00 UTC |                           yes |                           yes |

The rolling window counts 3 events, while the calendar-day version counts 1. The diff might look like a harmless SQL cleanup, but the product behavior changed. Review should ask for an updated [documentation](documentation.md) contract, a [testing](testing.md) fixture for the boundary condition, and a separate [refactoring](refactoring.md) commit if cleanup is mixed with behavior change.

## Failure modes

Reviews fail when one expert becomes the only quality gate, when comments are mostly taste, or when large pull requests hide the important change. Repeated review comments should migrate into linters, tests, templates, or [requirements engineering](requirements-engineering.md) checklists so humans spend attention on new risks.

## References

- [Google Engineering Practices: How to do a code review](https://google.github.io/eng-practices/review/reviewer/)
- [pytest documentation: assertions](https://docs.pytest.org/en/stable/how-to/assert.html)

> [!nav]
> **Section** — [Software Engineering](index.md)
>
> [← Testing](testing.md) [Refactoring →](refactoring.md)
