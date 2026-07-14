---
title: SQL
slug: software-engineering/sql
description: Application SQL as a safe, testable, transactional software interface.
area: software-engineering
topics:
  - sql
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - python.md
related:
  - "python.md"
  - "web-backends.md"
  - "api-design.md"
  - "testing.md"
  - "../13-data-engineering/sql.md"
  - "../13-data-engineering/relational-modelling.md"
historical_context: false
last_reviewed: 2026-07-11
---
# SQL

SQL in software engineering is an application contract: which records a user may see, which transaction boundary protects a change, and which query shape stays stable under load. The deeper SQL-language and warehouse-pattern discussion belongs in [data engineering SQL](../13-data-engineering/sql.md); this page focuses on using SQL safely from services.

## Mechanism

Application SQL should use parameter binding, explicit authorization predicates, pagination, indexes aligned with access paths, and transaction scopes around multi-step changes. Query success is not enough: the returned rows must be authorized and semantically correct for the [API design](api-design.md) contract.

## Executed Artifact

```python
import sqlite3

conn = sqlite3.connect(":memory:")
conn.execute("create table tickets(id text primary key, owner text, title text)")
conn.executemany(
    "insert into tickets values (?, ?, ?)",
    [("T1", "u1", "refund"), ("T2", "u2", "outage")],
)
conn.commit()
print(conn.execute(
    "select title from tickets where id = ? and owner = ?", ("T1", "u1")
).fetchall())
print(conn.execute(
    "select title from tickets where id = ? and owner = ?", ("T1' OR '1'='1", "u1")
).fetchall())
try:
    with conn:
        conn.execute("insert into tickets values (?, ?, ?)", ("T3", "u1", "draft"))
        raise RuntimeError("simulate downstream failure")
except RuntimeError:
    pass
print("ticket_count_after_rollback", conn.execute("select count(*) from tickets").fetchone()[0])
```

Observed output:

```text
[('refund',)]
[]
ticket_count_after_rollback 2
```

The malicious-looking ticket ID is data, not executable SQL, because placeholders bind parameters separately from the statement. The rollback also proves why [testing](testing.md) should cover failed transaction paths, not only successful queries. [Web backends](web-backends.md) should enforce the owner predicate server-side; the frontend must not be trusted to filter records.

## Failure Modes

Common failures are string-concatenated queries, forgotten authorization predicates, unbounded result sets, hidden business logic in unreadable nested SQL, and migrations that assume no concurrent traffic. For data products, align service SQL with [relational modelling](../13-data-engineering/relational-modelling.md) and document null semantics in [documentation](documentation.md).

## References

- [Python documentation: sqlite3](https://docs.python.org/3/library/sqlite3.html)
- [PEP 249: Python Database API Specification v2.0](https://peps.python.org/pep-0249/)
- [PostgreSQL documentation: Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
