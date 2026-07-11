---
title: Documentation
slug: software-engineering/documentation
description: Concise guide to Documentation in Software Engineering.
area: software-engineering
topics:
  - documentation
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

Documentation preserves decisions, operating knowledge, and system boundaries. Good documentation helps a future reader decide what to do; it is not a transcript of everything the code already says.

## Types of documentation

Different documents serve different jobs:

- concept docs explain terms and mental models;
- API docs describe contracts, inputs, outputs, and errors;
- runbooks explain operational response;
- decision records explain why a design was chosen;
- tutorials teach a workflow through a concrete path;
- reference docs give complete lookup information.

ML projects also need dataset cards, model cards, evaluation reports, and experiment notes. These should name training data, known limitations, intended use, metric definitions, and release constraints.

## Example

For a feature pipeline, useful documentation states the feature owner, refresh cadence, source tables, null semantics, backfill process, downstream consumers, and known failure modes. A weak document says only "computes engagement features" and leaves readers to reverse-engineer meaning from SQL.

## Maintenance rules

Keep docs close to the thing they describe, link to canonical pages instead of duplicating explanations, and update docs in the same change that modifies behavior. Prefer short durable explanations over long prose that becomes stale.

## Failure modes

Documentation fails when it has no owner, mixes design intent with outdated behavior, or duplicates source-of-truth definitions. Treat stale docs as defects: mark them, fix them, or remove them.
