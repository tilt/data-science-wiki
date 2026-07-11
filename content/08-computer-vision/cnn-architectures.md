---
title: CNN Architectures
slug: computer-vision/cnn-architectures
description: Concise guide to CNN Architectures in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - cnn-architectures
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
# CNN Architectures

## Summary

CNN architectures organize convolutional layers, pooling, normalization, residual connections, and heads for visual tasks. Their design controls receptive field, compute, and feature hierarchy.

## Step-by-step example

A ResNet block learns a residual correction around an identity path, making very deep CNNs easier to optimize than plain stacks.

## Common failure modes

- Assuming convolutional locality is enough for long-range structure without checking receptive field and feature-map resolution.
- Comparing architectures at different training budgets, augmentation policies, or input resolutions.
- Ignoring compute, memory, latency, and reproducibility constraints when choosing depth, width, and normalization.
