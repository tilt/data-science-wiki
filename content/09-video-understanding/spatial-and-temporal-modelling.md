---
title: Spatial and Temporal Modelling
slug: video-understanding/spatial-and-temporal-modelling
description: Concise guide to Spatial and Temporal Modelling in Video Understanding.
area: video-understanding
topics:
  - spatial-and-temporal-modelling
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
# Spatial and Temporal Modelling

## Summary

Spatial-and-temporal modelling separates what appears in individual frames from how evidence changes across frames. Video models need both dimensions.

## Step-by-step example

A single frame may show a raised hand, but the temporal pattern distinguishes waving, pointing, stretching, and throwing.

## Common failure modes

- Evaluating Spatial and Temporal Modelling only with clip labels while temporal boundaries, identity continuity, or streaming latency fail.
- Sampling frames in a way that misses short actions, occlusion, fast motion, or camera changes.
- Reporting aggregate accuracy without reviewing false triggers and missed events on real videos.

- Sampling frames in a way that misses short actions or delays streaming decisions.
- Reporting aggregate accuracy without inspecting occlusion, viewpoint, speed, and crowded-scene failures.
