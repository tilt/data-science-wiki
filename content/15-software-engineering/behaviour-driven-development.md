---
title: Behaviour Driven Development
slug: software-engineering/behaviour-driven-development
description: Concise guide to Behaviour Driven Development in Software Engineering.
area: software-engineering
topics:
  - behaviour-driven-development
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

Behaviour-driven development expresses requirements as observable examples. It is useful when product, engineering, and data science teams need a shared description of how the system should behave before implementation details are chosen.

## Core idea

BDD turns vague requirements into scenarios written in business language, often using Given-When-Then structure. The goal is not ceremony; it is to expose ambiguity early. A scenario should name the initial state, the action, and the expected externally visible result.

Example:

- Given a user has opted out of personalized recommendations;
- When the home feed is requested;
- Then the ranking service must not use user-level behavioral features.

For ML systems, BDD is most effective around deterministic boundaries: authorization, routing, policy enforcement, data eligibility, fallback behavior, and workflow state transitions. It is less useful for asserting exact model scores, where statistical tests and evaluation datasets are better tools.

## Practical workflow

Start with the riskiest behavior, write three to five examples with stakeholders, translate them into executable tests where possible, and keep the examples close to the code or decision record. When the system changes, update the scenario before changing the implementation.

## Failure modes

BDD fails when scenarios restate implementation details, when every edge case becomes a slow end-to-end test, or when examples are written after the code as documentation theatre. Keep scenarios few, stable, and tied to decisions users actually notice.
