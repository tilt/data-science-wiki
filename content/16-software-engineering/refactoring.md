---
title: Refactoring
slug: software-engineering/refactoring
description: Behavior-preserving structural change backed by characterization checks.
area: software-engineering
topics:
  - refactoring
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - testing.md
related:
  - "testing.md"
  - "code-review.md"
  - "design-patterns.md"
  - "documentation.md"
  - "python.md"
historical_context: false
last_reviewed: 2026-07-11
---

# Refactoring

Refactoring changes internal structure without intentionally changing external behavior. It is not cleanup as a side quest; it is a controlled change with a behavior contract. The usual loop is capture current behavior, make one small structural move, run checks, then continue. [Code review](code-review.md) should reject refactors that smuggle in product changes without tests.

## Mechanism

Characterization tests are the safety net when the existing code has unclear intent. They record what the system currently does on representative inputs. Once the checks exist, common moves include extract function, replace conditional with polymorphism, introduce parameter object, or split side effects from pure logic. Those moves often reveal when a [design pattern](design-patterns.md) is useful rather than decorative.

## Executed Artifact

This snippet compares a legacy order-total function with a refactored version across golden cases to verify behavior stayed unchanged.

```python
def legacy_total(order):
    total = 0
    for item in order["items"]:
        total += item["cents"] * item["qty"]
    if order.get("vip"):
        total = round(total * 0.9)
    return total

def line_total(item):
    return item["cents"] * item["qty"]

def apply_customer_discount(total, order):
    return round(total * 0.9) if order.get("vip") else total

def refactored_total(order):
    return apply_customer_discount(sum(line_total(i) for i in order["items"]), order)

golden = [
    {"items": [{"cents": 500, "qty": 2}], "vip": False},
    {"items": [{"cents": 999, "qty": 1}], "vip": True},
    {"items": [], "vip": True},
]
print([legacy_total(o) for o in golden])
print([refactored_total(o) for o in golden])
print("same_behavior", all(legacy_total(o) == refactored_total(o) for o in golden))
```

Observed output:

```text
[1000, 899, 0]
[1000, 899, 0]
same_behavior True
```

The refactor made pricing rules easier to name without changing results on the golden cases. Add or update [documentation](documentation.md) if the extracted names become part of the team vocabulary, and add [testing](testing.md) around edge cases before changing the discount rule itself.

## Failure Modes

Refactors fail when they mix behavior changes with structure changes, expand scope opportunistically, or rely on manual inspection for behavior that can be checked. For ML code, "same behavior" may mean same schema, same selected model version, or score distribution within tolerance rather than byte-for-byte equality.

## References

- [Martin Fowler: Refactoring, second edition](https://martinfowler.com/books/refactoring.html)
- [pytest documentation: assertions](https://docs.pytest.org/en/stable/how-to/assert.html)

> **Section — [Software Engineering](index.md):** ← [Code Review](code-review.md) · [Software Architecture](software-architecture.md) →
