---
title: A/B Testing
slug: experimentation-and-evaluation/a-b-testing
description: Concise guide to A/B Testing in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - a-b-testing
level: foundational
status: draft
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# A/B Testing

## Summary

Software engineering practices make systems understandable, testable, maintainable, and safe to change. They are especially important when ML components behave probabilistically.

## Core idea

- Clear interfaces reduce hidden coupling between data, model, and product code.
- Tests should cover deterministic code, data contracts, model fixtures, and end-to-end workflows.
- Decision records preserve trade-offs that are otherwise lost as systems evolve.

## Worked example

For an ML API, define request and response schemas, validate inputs, version the contract, add integration tests, and document latency, failure modes, and rollback behavior.

## Practical checklist

- State the decision A/B Testing supports before choosing metrics or tests.
- Define units, slices, uncertainty method, and guardrails before looking at results.
- Inspect examples where the evaluation disagrees with user or domain judgment.

- Define the population, sample, metrics, slices, and minimum meaningful effect.
- Use paired comparisons or randomized experiments where possible.
- Report uncertainty, cost, latency, calibration, coverage, and abstention when relevant.
- Treat severe errors separately from average performance.

## Common failure modes

- Using an evaluation set that no longer represents the target population.
- Averaging together errors with very different user or business severity.
- Ignoring uncertainty, repeated sampling, or multiple-comparison effects.
