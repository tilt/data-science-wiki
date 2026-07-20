---
title: Relational Modelling
slug: data-engineering/relational-modelling
description: "Table design with keys, constraints, and relationships that preserve data integrity."
area: data-engineering
topics:
  - relational-modelling
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - sql.md
  - dimensional-modelling.md
  - data-warehouses.md
  - data-contracts.md
  - data-quality.md
historical_context: false
last_reviewed: 2026-07-11
---

# Relational Modelling

Relational modelling chooses tables, keys, and constraints so facts are stored once and relationships are enforced by the database. It is the integrity layer beneath [SQL](sql.md), [data-warehouses](data-warehouses.md), and many [data-contracts](data-contracts.md).

## Constraint mechanism

The core contract is: primary keys identify rows, foreign keys enforce parent-child relationships, `not null` protects required fields, and `unique` prevents duplicate business identifiers. The example below creates a parent `customers` table, a child `orders` table, and then attempts two invalid writes:

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE customers (
  customer_id integer PRIMARY KEY,
  email text NOT NULL UNIQUE
);

CREATE TABLE orders (
  order_id integer PRIMARY KEY,
  customer_id integer NOT NULL REFERENCES customers(customer_id)
);

INSERT INTO customers VALUES (1, 'a@example.com');
INSERT INTO orders VALUES (100, 1);

-- Rejected: duplicate business identifier.
INSERT INTO customers VALUES (2, 'a@example.com');

-- Rejected: order points at a customer that does not exist.
INSERT INTO orders VALUES (101, 99);
```

Expected constraint failures:

```text
IntegrityError UNIQUE constraint failed: customers.email
IntegrityError FOREIGN KEY constraint failed
```

The database rejects both a duplicate email and an orphan order. A downstream [data-quality](data-quality.md) check can detect these problems after loading, but a relational model prevents them at write time.

## Modelling choice

Operational schemas often normalize entities to reduce update anomalies: customer attributes live in `customers`, not repeated across every order. Analytical schemas may intentionally denormalize into [dimensional-modelling](dimensional-modelling.md) stars for simpler queries. The design question is not "normalized or not" but which grain each table owns and which invariants the system can enforce.

## Failure modes

Surrogate keys without unique natural-key constraints allow duplicate entities. Nullable foreign keys silently weaken relationships. Missing indexes on foreign-key columns can make deletes, updates, and joins expensive even when the model is logically correct.

## References

- [PostgreSQL documentation: Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [SQLite documentation: Foreign Key Support](https://www.sqlite.org/foreignkeys.html)

> [!nav]
> **Section** — [Data Engineering](index.md)
>
> [SQL →](sql.md)
