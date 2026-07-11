---
title: Design Patterns
slug: software-engineering/design-patterns
description: Concise guide to Design Patterns in Software Engineering.
area: software-engineering
topics:
  - design-patterns
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Design patterns are named solutions to recurring design problems. They are useful when they simplify communication and reduce coupling, but harmful when applied mechanically to problems that do not need them.

## Core idea

A pattern captures a tradeoff. Strategy separates interchangeable algorithms; Adapter hides incompatible interfaces; Factory centralizes object creation; Repository isolates persistence; Observer broadcasts state changes. The value is not the name, but the boundary it creates.

In ML systems, common pattern uses include:

- Strategy for choosing rankers, embedders, or scoring policies;
- Adapter for switching hosted and local model providers;
- Pipeline for feature processing and validation steps;
- Facade for exposing a stable inference API over complex internals;
- Circuit breaker for unreliable external model or search services.

## Step-by-step example

Suppose a service supports BM25, dense retrieval, and hybrid retrieval. Instead of scattering conditionals through the request path, define a retriever interface with `retrieve(query, filters)`. Each retrieval method implements the interface, and routing logic chooses a strategy from configuration. Tests can then compare retrieval behavior without booting the whole service.

## Failure modes

Pattern misuse adds abstraction without reducing real complexity. Warning signs include interfaces with only one implementation, factories that hide simple constructors, and inheritance hierarchies used where composition would be clearer.
