---
title: From CNN Video Models TO Video Transformers
slug: history-of-ai-and-machine-learning/from-cnn-video-models-to-video-transformers
description: Concise guide to From CNN Video Models TO Video Transformers in
  History of AI and Machine Learning.
area: history-of-ai-and-machine-learning
topics:
  - from-cnn-video-models-to-video-transformers
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: true
last_reviewed: 2026-07-11
---
# From CNN Video Models to Video Transformers

## Summary

Video modelling moved from hand-crafted motion features and convolutional architectures toward attention-based models that can represent longer-range temporal interactions.

## Timeline

- Classical video systems used optical flow, trajectories, and engineered motion descriptors.
- Two-stream and 3D convolutional models learned spatial and temporal features from clips.
- CNN video models encoded local space-time patterns efficiently but struggled with long-range dependencies.
- Video transformers used attention across frames or patches to model broader temporal context, usually with higher compute and data requirements.

## Historical mechanism

CNN video models encoded local space-time patterns with strong locality assumptions. Video transformers relaxed that assumption by letting distant frames or patches interact through attention, at the cost of heavier compute and stronger data requirements.
