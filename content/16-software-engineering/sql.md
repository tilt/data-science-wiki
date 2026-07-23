---
title: SQL
slug: software-engineering/sql
description: Application SQL as a safe, testable, transactional software interface.
area: software-engineering
topics:
  - sql
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - "python.md"
  - "web-backends.md"
  - "api-design.md"
  - "testing.md"
  - "../13-data-engineering/sql.md"
  - "../13-data-engineering/relational-modelling.md"
historical_context: false
last_reviewed: 2026-07-23
---

# SQL

SQL in software engineering is an application contract: which records a user may see, which transaction boundary protects a change, and which query shape stays stable under load. The deeper SQL-language and warehouse-pattern discussion belongs in [data engineering SQL](../13-data-engineering/sql.md); this page focuses on using SQL safely from services.

## Safe application SQL

Application SQL should use parameter binding, explicit authorization predicates, pagination, indexes aligned with access paths, and transaction scopes around multi-step changes. Query success is not enough: the returned rows must be authorized and semantically correct for the [API design](api-design.md) contract.

| Concern       | Good service SQL practice                          | Failure it prevents                         |
| ------------- | -------------------------------------------------- | ------------------------------------------- |
| Injection     | bind parameters instead of concatenating strings   | user input becoming executable SQL          |
| Authorization | include server-side tenant or owner predicates     | returning records the user should not see   |
| Consistency   | wrap multi-step writes in transactions             | partial updates after downstream failures   |
| Performance   | design indexes for access paths and pagination     | queries that pass tests but fail under load |
| Evolvability  | keep migrations backward compatible during deploys | old code reading a half-migrated schema     |

## Prepared statement and rollback example

This SQL artifact uses a prepared statement to keep user input separate from executable SQL, includes the server-side owner predicate, and demonstrates rollback for a failed multi-step change:

```sql
CREATE TABLE tickets (
  id text PRIMARY KEY,
  owner text NOT NULL,
  title text NOT NULL
);

INSERT INTO tickets VALUES
  ('T1', 'u1', 'refund'),
  ('T2', 'u2', 'outage');

PREPARE list_ticket(text, text) AS
SELECT title
FROM tickets
WHERE id = $1
  AND owner = $2;

EXECUTE list_ticket('T1', 'u1');
EXECUTE list_ticket('T1'' OR ''1''=''1', 'u1');

BEGIN;
INSERT INTO tickets VALUES ('T3', 'u1', 'draft');
ROLLBACK;

SELECT count(*) AS ticket_count_after_rollback
FROM tickets;
```

Result:

```text
title
refund

-- second EXECUTE returns no rows

ticket_count_after_rollback
2
```

The malicious-looking ticket ID is data, not executable SQL, because the prepared statement binds parameters separately from the statement text. The rollback also proves why [testing](testing.md) should cover failed transaction paths, not only successful queries. [Web backends](web-backends.md) should enforce the owner predicate server-side; the frontend must not be trusted to filter records.

## Service boundary

SQL should not leak upward as arbitrary query access from the client. A backend endpoint should expose task-specific operations such as "list my tickets" or "close ticket" and keep row-level predicates inside the service. This makes the [API design](api-design.md) reviewable: reviewers can see which user, tenant, status, or time-window constraints are enforced for each operation.

For analytical workloads, query flexibility belongs in governed data tools or warehouses. For application services, stable query shapes are a reliability feature because they can be indexed, tested, rate-limited, and audited.

## Failure modes

Common failures are string-concatenated queries, forgotten authorization predicates, unbounded result sets, hidden business logic in unreadable nested SQL, and migrations that assume no concurrent traffic. For data products, align service SQL with [relational modelling](../13-data-engineering/relational-modelling.md) and document null semantics in [documentation](documentation.md).

## References

- [PostgreSQL documentation: PREPARE](https://www.postgresql.org/docs/current/sql-prepare.html)
- [PostgreSQL documentation: Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)

> [!nav]
> **Section** — [Software Engineering](index.md)
>
> [← Python](python.md) [Testing →](testing.md)
