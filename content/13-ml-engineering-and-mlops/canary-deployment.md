---
title: Canary Deployment
slug: ml-engineering-and-mlops/canary-deployment
description: Concise guide to Canary Deployment in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - canary-deployment
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

A canary deployment releases a new model or service version to a small slice of traffic before full rollout. It reduces blast radius while exposing the new version to real production conditions.

## Core idea

The canary receives controlled traffic, usually by percentage, user segment, region, or feature flag. Operators compare health, latency, error rates, model-output distributions, and business guardrails against the stable version. If the canary behaves well, traffic increases; if it fails, routing returns to the previous version.

## Example rollout

A ranking model is deployed to 1 percent of eligible traffic. The team checks request latency, empty recommendation rate, score distribution, and key engagement metrics for one hour. If guardrails hold, the rollout moves to 5 percent, then 25 percent, then 100 percent. Each step has an explicit rollback condition.

## Failure modes

Canaries fail when the sample is too small to reveal segment-specific harm, when sticky assignment is missing, or when metrics arrive too slowly for useful action. A canary is not a substitute for offline validation; it is a production safety mechanism.
