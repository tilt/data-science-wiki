---
title: TWO Stream Models
slug: video-understanding/two-stream-models
description: Concise guide to TWO Stream Models in Video Understanding.
area: video-understanding
topics:
  - two-stream-models
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# TWO Stream Models

## Summary

Two-stream models process appearance and motion through separate pathways, traditionally RGB frames and optical flow. They were an important bridge between image CNNs and end-to-end video models.

## Step-by-step example

One stream recognizes objects and scene context; the other recognizes movement. Their predictions are fused for action recognition.

## Common failure modes

- Evaluating TWO Stream Models only with clip labels while temporal boundaries, identity continuity, or streaming latency fail.
- Sampling frames in a way that misses short actions, occlusion, fast motion, or camera changes.
- Reporting aggregate accuracy without reviewing false triggers and missed events on real videos.

- Sampling frames in a way that misses short actions or delays streaming decisions.
- Reporting aggregate accuracy without inspecting occlusion, viewpoint, speed, and crowded-scene failures.
