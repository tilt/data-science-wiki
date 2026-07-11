---
title: Vision Transformers
slug: computer-vision/vision-transformers
description: Concise guide to Vision Transformers in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - vision-transformers
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
# Vision Transformers

## Summary

Vision transformers apply transformer blocks to image patches instead of word tokens. They trade convolutional locality for attention over patch sequences.

## Step-by-step example

An image is split into patches, each patch becomes an embedding, positional information is added, and transformer layers mix patch information for classification or dense prediction.

## Common failure modes

- Using too little data or augmentation for a ViT variant that was designed for large-scale pretraining.
- Forgetting that patch size controls the smallest spatial detail the model can directly represent.
- Comparing against CNNs without matching resolution, augmentation, training length, and parameter budget.
- Ignoring quadratic attention cost when image resolution or video length grows.
