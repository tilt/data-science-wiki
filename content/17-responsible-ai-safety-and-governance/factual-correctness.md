---
title: Factual Correctness
slug: responsible-ai-safety-and-governance/factual-correctness
description: Concise guide to Factual Correctness in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - factual-correctness
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

Factual correctness is the degree to which model outputs agree with reliable evidence. It is especially important for generative systems, where fluent text can contain unsupported claims.

## Core idea

A factuality control defines what counts as evidence, how outputs should use that evidence, and how unsupported claims are detected. In retrieval-augmented systems, factual correctness depends on retrieval quality, context construction, citation behavior, and answer generation. In predictive systems, it depends on valid data and calibrated interpretation.

## Example

A medical benefits assistant should answer from approved plan documents. If the documents do not state whether a procedure is covered, the system should say it cannot determine coverage rather than infer from similar procedures. The evaluation set should include answerable, unanswerable, conflicting, and outdated-document cases.

## Controls

Use source-grounded prompts, abstention rules, citation checks, human review for high-impact outputs, and regression tests on known tricky questions. Track errors by type: unsupported claim, contradicted evidence, outdated source, wrong entity, or overconfident uncertainty.

## Failure modes

Factuality fails when systems reward confident prose, retrieve stale documents, merge evidence from different entities, or evaluate only easy answerable examples.
