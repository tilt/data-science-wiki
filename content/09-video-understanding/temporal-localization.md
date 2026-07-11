---
title: Temporal Localization
slug: video-understanding/temporal-localization
description: Concise guide to Temporal Localization in Video Understanding.
area: video-understanding
topics:
  - temporal-localization
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
# Temporal Localization

## Summary

Temporal localization identifies when an event starts and ends in an untrimmed video. It is harder than clip classification because the model must find boundaries as well as labels.

## Step-by-step example

In a sports broadcast, temporal localization can mark the start and end of each goal attempt, foul, or replay segment.

## Common failure modes

- Evaluating Temporal Localization only with clip labels while temporal boundaries, identity continuity, or streaming latency fail.
- Sampling frames in a way that misses short actions, occlusion, fast motion, or camera changes.
- Reporting aggregate accuracy without reviewing false triggers and missed events on real videos.

- Sampling frames in a way that misses short actions or delays streaming decisions.
- Reporting aggregate accuracy without inspecting occlusion, viewpoint, speed, and crowded-scene failures.
