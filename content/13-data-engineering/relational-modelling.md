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

The core contract is: primary keys identify rows, foreign keys enforce parent-child relationships, `not null` protects required fields, and `unique` prevents duplicate business identifiers. I ran this SQLite example with foreign keys enabled:

```python
import sqlite3

con = sqlite3.connect(":memory:")
con.execute("pragma foreign_keys=on")
con.executescript("""
create table customers(customer_id integer primary key, email text not null unique);
create table orders(order_id integer primary key, customer_id integer not null references customers(customer_id));
insert into customers values (1,'a@example.com');
insert into orders values (100,1);
""")
for stmt in ["insert into customers values (2,'a@example.com')", "insert into orders values (101,99)"]:
    try:
        con.execute(stmt)
    except sqlite3.IntegrityError as e:
        print(type(e).__name__, str(e))
```

Observed output:

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
