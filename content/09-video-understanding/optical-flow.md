---
title: Optical Flow
slug: video-understanding/optical-flow
description: Concise guide to Optical Flow in Video Understanding.
area: video-understanding
topics:
  - optical-flow
level: intermediate
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
# Optical Flow

## Summary

Optical flow estimates apparent pixel motion between frames. It represents how image locations move over time and is useful for motion analysis, tracking, and older two-stream video models.

## Step-by-step example

In a driving video, optical flow highlights the relative motion of nearby cars, lane markings, and pedestrians between consecutive frames.

## Common failure modes

- Evaluating Optical Flow only with clip labels while temporal boundaries, identity continuity, or streaming latency fail.
- Sampling frames in a way that misses short actions, occlusion, fast motion, or camera changes.
- Reporting aggregate accuracy without reviewing false triggers and missed events on real videos.

- Sampling frames in a way that misses short actions or delays streaming decisions.
- Reporting aggregate accuracy without inspecting occlusion, viewpoint, speed, and crowded-scene failures.
