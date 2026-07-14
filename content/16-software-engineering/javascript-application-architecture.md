---
title: JavaScript Application Architecture
slug: software-engineering/javascript-application-architecture
description: Client-side and full-stack JavaScript boundaries for testable product behavior.
area: software-engineering
topics:
  - javascript-application-architecture
level: intermediate
status: review
page_type: system-design
aliases:
  - Frontend architecture
prerequisites:
  - api-design.md
related:
  - "api-design.md"
  - "web-backends.md"
  - "testing.md"
  - "python.md"
  - "production-integration.md"
historical_context: false
last_reviewed: 2026-07-11
---

# JavaScript Application Architecture

JavaScript application architecture separates rendering, state, domain logic, network clients, and side effects so product behavior can evolve without turning every component into a special case. For AI products, this boundary has to handle streaming tokens, cancellation, citation state, partial failure, telemetry, and retry decisions from [web backends](web-backends.md).

## Architecture Contract

A practical layout is: UI components render state and emit events; a state store owns workflow transitions; domain modules validate objects such as citations and uploads; API clients own `fetch` calls and error mapping; telemetry modules record latency and failure classes. This mirrors [API design](api-design.md): the frontend should consume a contract rather than infer behavior from incidental JSON.

## Executed Artifact

```javascript
class ChatStore {
  constructor() {
    this.state = { status: "idle", tokens: [] }
  }
  start(requestId) {
    this.controller = new AbortController()
    this.state = { status: "pending", requestId, tokens: [] }
  }
  receive(token) {
    this.state = { ...this.state, status: "receiving", tokens: [...this.state.tokens, token] }
  }
  cancel() {
    this.controller.abort()
    this.state = { ...this.state, status: "cancelled" }
  }
}

const store = new ChatStore()
store.start("req-7")
store.receive("hello")
store.cancel()
console.log(store.state)
console.log("aborted", store.controller.signal.aborted)
```

Observed `node -e` output:

```text
{ status: 'cancelled', requestId: 'req-7', tokens: [ 'hello' ] }
aborted true
```

The state machine makes cancellation explicit instead of leaving it as a browser side effect. [Testing](testing.md) can exercise the store without a DOM, while integration tests can focus on streaming and backend errors. The same separation helps mixed [python](python.md) and JavaScript stacks because each side owns a small contract.

## Failure Modes

Common failures are global mutable state, business rules embedded in JSX, untyped response objects, and no cancellation path for long-running requests. A streaming UI needs states for pending, receiving, complete, failed, and cancelled; otherwise [production integration](production-integration.md) bugs appear as stuck spinners.

## References

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [React documentation: Managing State](https://react.dev/learn/managing-state)
