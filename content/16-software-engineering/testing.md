---
title: Testing
slug: software-engineering/testing
description: Testing strategy for software, data, ML, and generative-AI systems.
area: software-engineering
topics:
  - "testing"
  - "quality"
  - "regression"
level: intermediate
status: review
page_type: concept
aliases:
  - "Automated testing"
prerequisites:
  - "software-architecture.md"
related:
  - "behaviour-driven-development.md"
  - "code-review.md"
  - "refactoring.md"
  - "documentation.md"
  - "../17-experimentation-and-evaluation/golden-datasets.md"
  - "../14-ml-engineering-and-mlops/ci-cd-for-ml.md"
historical_context: false
last_reviewed: 2026-07-11
---

# Testing

Testing is executable evidence about a system boundary. In ordinary software that boundary may be a function, HTTP contract, database transaction, or browser workflow. In ML and AI systems it also includes data validation, prompt and retrieval fixtures, model-version behavior, and [golden datasets](../17-experimentation-and-evaluation/golden-datasets.md). The point is not to have many tests; it is to make important regressions cheap to detect before [production integration](production-integration.md).

## Test Layers

Unit tests isolate deterministic logic. Integration tests exercise a real boundary between components, such as a service calling a payment gateway adapter or a RAG endpoint calling retrieval and validation. Property tests check invariants across many inputs, for example "a discount never makes a price negative." End-to-end tests cover user-visible workflows, but they are expensive and should not carry checks that a unit or contract test could catch faster. [Behaviour-driven development](behaviour-driven-development.md) is useful when the expected behavior must be negotiated with non-engineers before the test is automated.

## Executed Artifact

This snippet defines unit, integration, and property-style pytest tests for checkout logic and shows the expected test run result.

```python
import pytest

def discount(total_cents, percent):
    if total_cents < 0:
        raise ValueError("total_cents must be non-negative")
    if not 0 <= percent <= 100:
        raise ValueError("percent must be between 0 and 100")
    return round(total_cents * (100 - percent) / 100)

class FakeGateway:
    def __init__(self):
        self.charges = []
    def charge(self, cents):
        self.charges.append(cents)
        return {"status": "authorized", "charged_cents": cents}

def checkout(cart, gateway):
    subtotal = sum(item["cents"] * item["qty"] for item in cart)
    due = discount(subtotal, 10)
    receipt = gateway.charge(due)
    return {"subtotal_cents": subtotal, **receipt}

def test_unit_discount_rounds_and_rejects_bad_input():
    assert discount(999, 10) == 899
    with pytest.raises(ValueError):
        discount(-1, 10)

def test_integration_checkout_uses_gateway_contract():
    gateway = FakeGateway()
    result = checkout([{"cents": 1200, "qty": 2}], gateway)
    assert gateway.charges == [2160]
    assert result == {"subtotal_cents": 2400, "status": "authorized", "charged_cents": 2160}

def test_property_discount_is_bounded_and_monotone():
    for total in [0, 1, 99, 100, 101, 999, 12345]:
        previous = total
        for percent in range(0, 101, 5):
            value = discount(total, percent)
            assert 0 <= value <= total
            assert value <= previous
            previous = value
```

Observed `python -m pytest -q` output:

```text
...                                                                      [100%]
3 passed in 0.00s
```

When the implementation used `int(...)` instead of `round(...)`, the rounding test produced this real failure excerpt:

```text
F                                                                        [100%]
=================================== FAILURES ===================================
__________________________ test_discount_rounds_cents __________________________

    def test_discount_rounds_cents():
>       assert discount(995, 10) == 896
E       assert 895 == 896
E        +  where 895 = discount(995, 10)
```

That failure is exactly why [refactoring](refactoring.md) needs characterization checks: a small internal rewrite changed a money contract. [Code review](code-review.md) should inspect whether the test is attached to the behavior that matters, not only whether the diff is formatted.

## Failure Modes

Slow suites get ignored, so keep fast deterministic checks close to the code and isolate slow model/provider tests behind explicit markers. Flaky tests should be treated as observability signals until proven otherwise. Snapshot tests for generated text are brittle unless they assert structured fields, citations, or risk labels; pair them with [documentation](documentation.md) that explains what the fixture is protecting.

## References

- [pytest documentation: assertions](https://docs.pytest.org/en/stable/how-to/assert.html)
- [Python documentation: unittest](https://docs.python.org/3/library/unittest.html)
- [Hypothesis documentation: quickstart](https://hypothesis.readthedocs.io/en/latest/quickstart.html)

> **Section — [Software Engineering](index.md):** ← [SQL](sql.md) · [Code Review](code-review.md) →
