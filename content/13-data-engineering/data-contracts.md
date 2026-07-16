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

This minimal contract says `payments` must carry required fields, allowed currencies, and non-negative amounts:

```yaml
dataset: payments
owner: billing-platform
fields:
  payment_id: string
  amount_cents: integer
  currency: string
required:
  - payment_id
  - amount_cents
  - currency
quality:
  currency_in: [USD, EUR]
  amount_cents_min: 0
change_policy: backward-compatible unless consumers approve
```

| Record                                                | Currency rule        | Amount rule           | Verdict |
| ----------------------------------------------------- | -------------------- | --------------------- | ------- |
| `{payment_id: p1, amount_cents: 1200, currency: USD}` | allowed              | non-negative          | pass    |
| `{payment_id: p2, amount_cents: -5, currency: GBP}`   | `GBP` is not allowed | `-5` is below minimum | fail    |

The second record violates both a semantic domain rule and a numeric rule. A real contract should also name freshness expectations, expected consumers, and escalation behavior when a breaking change is needed.

## Operating model

Contracts belong at source boundaries and high-value curated tables. They should be versioned with [data-pipelines](data-pipelines.md), emitted into [data-lineage](data-lineage.md), and tied to [reproducibility](reproducibility.md) so a run can explain which contract version it enforced.

## Failure modes

Contracts fail when they document fields but do not block incompatible changes. They also fail when ownership is generic, such as "data team", because incidents need a producer who can explain source semantics.

## References

- [Open Data Contract Standard repository](https://github.com/bitol-io/open-data-contract-standard)
- [dbt documentation: About data tests property](https://docs.getdbt.com/reference/resource-properties/data-tests)

> **Section — [Data Engineering](index.md):** ← [Data Quality](data-quality.md) · [Data Lineage](data-lineage.md) →
