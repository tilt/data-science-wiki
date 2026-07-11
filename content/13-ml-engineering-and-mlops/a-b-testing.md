---
title: A/B Testing
slug: ml-engineering-and-mlops/a-b-testing
description: Concise guide to A/B Testing in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - a-b-testing
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

A/B testing compares product or model variants with randomized traffic. In ML systems it is the bridge between offline evaluation and measured user impact, because better validation metrics do not always produce better product outcomes.

## Core idea

Assign eligible users, requests, or entities to variants using a stable randomization key. Track a primary metric, guardrail metrics, exposure counts, and the exact treatment definition. The hard part is usually not computing a difference; it is keeping the experiment interpretable.

A defensible test specifies:

- the decision the experiment will support;
- the unit of randomization, such as user, session, account, or query;
- success and guardrail metrics before launch;
- exclusion rules, ramp schedule, and stopping criteria;
- checks for sample-ratio mismatch and logging defects.

## Example

For a recommender reranker, randomize users to the old ranker or a new diversity-aware ranker. Measure conversion as the primary metric, but also monitor latency, empty-result rate, complaint rate, and long-tail exposure. If conversion improves while latency and complaints remain stable, the treatment is a candidate for rollout. If conversion improves only for heavy users while new-user engagement falls, segment analysis should block a blanket launch.

## Failure modes

Common mistakes are peeking until a metric turns positive, randomizing by request when users carry memory across requests, changing the treatment mid-test, and ignoring interference between users. Marketplace, social, and recommender systems may need cluster-level or switchback designs rather than simple independent assignment.
