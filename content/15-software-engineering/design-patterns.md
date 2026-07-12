---
title: Design Patterns
slug: software-engineering/design-patterns
description: Named object and module boundaries that solve recurring design problems.
area: software-engineering
topics:
  - design-patterns
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - software-architecture.md
related:
  - "software-architecture.md"
  - "technical-decision-records.md"
  - "refactoring.md"
  - "api-design.md"
  - "python.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Design Patterns

Design patterns are named boundaries for recurring design problems. The useful part is not the name; it is the dependency direction the pattern creates. Strategy separates interchangeable algorithms, Adapter hides incompatible interfaces, Factory centralizes construction, Repository isolates persistence, and Facade gives callers a smaller API over a complex subsystem.

## Mechanism

In data and AI products, Strategy is common when the same request path may use BM25, dense retrieval, hybrid retrieval, or a fallback policy. Instead of scattering `if ranker == ...` across a [web backend](web-backends.md), define one scoring interface and inject the implementation. That keeps [testing](testing.md) focused on behavior and keeps [technical decision records](technical-decision-records.md) honest about why an implementation was selected.

## Executed Artifact

```python
from dataclasses import dataclass
from typing import Protocol

@dataclass(frozen=True)
class Document:
    id: str
    text: str
    age_days: int

class Scorer(Protocol):
    def score(self, query: str, doc: Document) -> float: ...

class KeywordScorer:
    def score(self, query, doc):
        return sum(doc.text.lower().count(t) for t in query.lower().split())

class FreshnessScorer:
    def score(self, query, doc):
        return 1 / (1 + doc.age_days)

def rank(query, docs, scorer: Scorer):
    return [d.id for d in sorted(docs, key=lambda d: scorer.score(query, d), reverse=True)]

docs = [Document("A", "refund refund policy", 9), Document("B", "outage summary", 0)]
print("keyword", rank("refund", docs, KeywordScorer()))
print("freshness", rank("refund", docs, FreshnessScorer()))
```

Observed output:

```text
keyword ['A', 'B']
freshness ['B', 'A']
```

The caller does not change when the scoring policy changes. That is a real reduction in coupling. If the project has only one scorer and no planned alternative, the interface may be premature; [refactoring](refactoring.md) can introduce it later when duplication appears.

## Failure Modes

Pattern misuse adds vocabulary without reducing complexity. Warning signs are interfaces with one implementation, factories that hide simple constructors, inheritance trees used where composition would work, and architecture diagrams that say "adapter" but still leak provider-specific fields into [API design](api-design.md).

## References

- [Python documentation: typing Protocol](https://docs.python.org/3/library/typing.html)
- [Python documentation: abc](https://docs.python.org/3/library/abc.html)
