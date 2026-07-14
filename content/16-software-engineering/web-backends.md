---
title: Web Backends
slug: software-engineering/web-backends
description: HTTP services, persistence, jobs, and integrations behind product behavior.
area: software-engineering
topics:
  - web-backends
level: foundational
status: review
page_type: concept
aliases:
  - HTTP backends
prerequisites:
  - api-design.md
related:
  - "api-design.md"
  - "production-integration.md"
  - "sql.md"
  - "javascript-application-architecture.md"
  - "software-architecture.md"
  - "../14-ml-engineering-and-mlops/model-serving.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Web Backends

Web backends expose product behavior through HTTP APIs, persistence, queues, background jobs, and integration services. In AI products they also coordinate retrieval, model calls, streaming responses, authorization, audit logs, and [model serving](../14-ml-engineering-and-mlops/model-serving.md). The backend is where client intent becomes an enforceable system contract.

## Backend Mechanism

A backend request path should validate input, authenticate and authorize, call domain logic, persist state, map errors, emit telemetry, and return a stable response shape. Long-running model calls need timeouts, cancellation, partial failure handling, and idempotency when actions can be repeated. Database work should go through [sql](sql.md) queries that enforce server-side ownership.

## Executed Artifact

This snippet defines a small FastAPI endpoint and uses a test client to compare the authorized response with the forbidden response.

```python
from fastapi import FastAPI, Header, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/tickets/{ticket_id}")
def read_ticket(ticket_id: str, x_user: str = Header()):
    if x_user != "u1":
        raise HTTPException(
            status_code=403,
            detail={"code": "not_authorized", "ticket_id": ticket_id},
        )
    return {
        "ticket_id": ticket_id,
        "status": "open",
        "trace_fields": ["model_version", "latency_ms"],
    }

client = TestClient(app)
print(client.get("/tickets/T1", headers={"x-user": "u1"}).status_code,
      client.get("/tickets/T1", headers={"x-user": "u1"}).json())
print(client.get("/tickets/T1", headers={"x-user": "u2"}).status_code,
      client.get("/tickets/T1", headers={"x-user": "u2"}).json())
```

Observed output:

```text
200 {'ticket_id': 'T1', 'status': 'open', 'trace_fields': ['model_version', 'latency_ms']}
403 {'detail': {'code': 'not_authorized', 'ticket_id': 'T1'}}
```

The endpoint demonstrates a backend responsibility that [javascript application architecture](javascript-application-architecture.md) must not own: authorization. [Testing](testing.md) can verify both the 200 and 403 contracts without a browser, and [production integration](production-integration.md) can require the trace fields before launch.

## Failure Modes

Common failures are leaking authorization to the frontend, doing background work inside request handlers, returning unversioned response shapes, and collapsing provider failures into anonymous 500 errors. A backend that wraps model calls should expose typed fallbacks and telemetry, not just pass through provider responses.

## References

- [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [RFC 7807: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
