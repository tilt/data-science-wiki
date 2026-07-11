---
title: Person Tracking and Track Aggregation
slug: video-understanding/person-tracking-and-track-aggregation
description: Concise guide to Person Tracking and Track Aggregation in Video Understanding.
area: video-understanding
topics:
  - person-tracking-and-track-aggregation
level: intermediate
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
# Person Tracking and Track Aggregation

## Summary

Person tracking links detections of the same person across frames. Track aggregation then summarizes frame-level evidence into person-level or event-level predictions.

## Step-by-step example

In retail analytics, detections become tracks, tracks collect dwell time and movement features, and aggregation estimates whether a person interacted with a display.

## Common failure modes

- Evaluating Person Tracking and Track Aggregation only with clip labels while temporal boundaries, identity continuity, or streaming latency fail.
- Sampling frames in a way that misses short actions, occlusion, fast motion, or camera changes.
- Reporting aggregate accuracy without reviewing false triggers and missed events on real videos.

- Sampling frames in a way that misses short actions or delays streaming decisions.
- Reporting aggregate accuracy without inspecting occlusion, viewpoint, speed, and crowded-scene failures.
