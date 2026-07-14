---
title: Data Contracts
slug: data-engineering/data-contracts
description: "Producer-consumer agreements for schema, semantics, quality, ownership, and service levels."
area: data-engineering
topics:
  - data-contracts
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-quality.md
  - data-lineage.md
  - data-pipelines.md
  - relational-modelling.md
  - reproducibility.md
historical_context: false
last_reviewed: 2026-07-11
---
# Data Contracts

A data contract is an explicit agreement between a producer and consumers about what a dataset means and how it may change. It extends [relational-modelling](relational-modelling.md) constraints with ownership, freshness, allowed values, compatibility rules, and [data-quality](data-quality.md) gates.

## Contract artifact

This minimal contract says `payments` must carry required fields, allowed currencies, and non-negative amounts. I executed a tiny validator against two records:

```python
contract = {
  "dataset": "payments",
  "fields": {"payment_id": "string", "amount_cents": "integer", "currency": "string"},
  "required": ["payment_id", "amount_cents", "currency"],
  "quality": {"currency_in": ["USD", "EUR"], "amount_cents_min": 0},
}
records = [
  {"payment_id": "p1", "amount_cents": 1200, "currency": "USD"},
  {"payment_id": "p2", "amount_cents": -5, "currency": "GBP"},
]
violations = []
for i, r in enumerate(records, 1):
    for key in contract["required"]:
        if key not in r or r[key] is None:
            violations.append((i, key, "required"))
    if r.get("currency") not in contract["quality"]["currency_in"]:
        violations.append((i, "currency", "not_allowed"))
    if r.get("amount_cents", 0) < contract["quality"]["amount_cents_min"]:
        violations.append((i, "amount_cents", "below_min"))
print(violations)
```

Observed output:

```text
[(2, 'currency', 'not_allowed'), (2, 'amount_cents', 'below_min')]
```

The second record violates both a semantic domain rule and a numeric rule. A real contract would also name owner, SLA, change policy, and expected consumers.

## Operating model

Contracts belong at source boundaries and high-value curated tables. They should be versioned with [data-pipelines](data-pipelines.md), emitted into [data-lineage](data-lineage.md), and tied to [reproducibility](reproducibility.md) so a run can explain which contract version it enforced.

## Failure modes

Contracts fail when they document fields but do not block incompatible changes. They also fail when ownership is generic, such as "data team", because incidents need a producer who can explain source semantics.

## References

- [Open Data Contract Standard repository](https://github.com/bitol-io/open-data-contract-standard)
- [dbt documentation: About data tests property](https://docs.getdbt.com/reference/resource-properties/data-tests)
