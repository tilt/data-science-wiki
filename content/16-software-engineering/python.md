---
title: Python
slug: software-engineering/python
description: Python engineering practices for maintainable data, ML, and backend systems.
area: software-engineering
topics:
  - python
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - testing.md
related:
  - "testing.md"
  - "api-design.md"
  - "sql.md"
  - "javascript-application-architecture.md"
  - "refactoring.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Python

Python is the dominant language in data science because it connects numerical libraries, notebooks, orchestration, and service code. Production Python needs stronger boundaries than exploratory work: isolated environments, typed interfaces, deterministic functions, explicit configuration, and [testing](testing.md) around data and service contracts.

## Engineering Contract

Keep notebook exploration outside importable library code. Put reusable transformations in modules, expose training and backfill workflows through CLIs, keep configuration in typed objects, and make database access explicit through [sql](sql.md) adapters. Type hints do not prove correctness, but they make [API design](api-design.md) reviewable at module boundaries.

## Executed Artifact

This snippet parses a typed dataclass configuration and raises a validation error when the feature window is invalid.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class FeatureConfig:
    name: str
    window_minutes: int
    default: float = 0.0

def parse_config(raw: dict) -> FeatureConfig:
    cfg = FeatureConfig(**raw)
    if cfg.window_minutes <= 0:
        raise ValueError("window_minutes must be positive")
    return cfg

print(parse_config({"name": "tickets_last_60m", "window_minutes": 60}))
try:
    parse_config({"name": "bad", "window_minutes": 0})
except ValueError as exc:
    print(type(exc).__name__, str(exc))
```

Observed output:

```text
FeatureConfig(name='tickets_last_60m', window_minutes=60, default=0.0)
ValueError window_minutes must be positive
```

The dataclass gives a small immutable configuration contract. In a service, this object can be tested without reading environment variables or starting a framework. In a mixed stack, keep this boundary as explicit as the state boundary in [javascript application architecture](javascript-application-architecture.md).

## Failure Modes

Common failures are hidden global state, unpinned dependencies, imports that depend on the current working directory, mutable default values, and code paths that silently change dtype or timezone semantics. During [refactoring](refactoring.md), protect behavior with golden examples before moving notebook logic into modules.

## References

- [Python tutorial: Virtual Environments and Packages](https://docs.python.org/3/tutorial/venv.html)
- [Python documentation: dataclasses](https://docs.python.org/3/library/dataclasses.html)
- [Python documentation: typing](https://docs.python.org/3/library/typing.html)
