---
title: Shadow Deployment
slug: ml-engineering-and-mlops/shadow-deployment
description: Concise guide to Shadow Deployment in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - shadow-deployment
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

A shadow deployment runs a new model or service version on production traffic without exposing its output to users. It tests integration and behavior under real load before user-visible rollout.

## Core idea

Requests go to the current production path and are copied to the shadow path. The system records shadow outputs, latency, errors, and resource usage, but the production response still comes from the stable version. This reveals compatibility problems that offline tests miss.

## Example

Before replacing a search reranker, route live queries to both old and new rerankers. Users see the old ranking. Engineers compare latency, timeout rate, score distributions, and offline relevance judgments from logged shadow outputs. If the shadow path crashes on long queries, the issue is caught before exposure.

## Limits

Shadow deployments cannot measure user reaction because users never see the shadow output. They also require care around side effects: a shadow path must not send emails, charge cards, update records, or trigger external actions.

## Failure modes

Common failures are copying only easy traffic, forgetting to disable side effects, under-provisioning the shadow path, and treating shadow success as proof of product impact.
