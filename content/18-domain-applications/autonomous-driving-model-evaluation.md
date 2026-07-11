---
title: Autonomous Driving Model Evaluation
slug: domain-applications/autonomous-driving-model-evaluation
description: Concise guide to Autonomous Driving Model Evaluation in Domain Applications.
area: domain-applications
topics:
  - autonomous-driving-model-evaluation
level: advanced
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
# Autonomous Driving Model Evaluation

## Summary

Autonomous-driving model evaluation measures perception, prediction, planning, and safety behavior under realistic road conditions. Aggregate accuracy is not enough for safety-critical systems.

## Step-by-step example

A detection model must be evaluated for pedestrians at night, cyclists in occlusion, rare construction scenes, and false positives that affect planning.

## Scenario coverage

Autonomous-driving evaluation should be scenario-based as well as metric-based: night, rain, construction, vulnerable road users, unusual signs, occlusion, sensor degradation, and rare maneuvers. Aggregate perception metrics can hide failures that are safety-critical in one scenario.
