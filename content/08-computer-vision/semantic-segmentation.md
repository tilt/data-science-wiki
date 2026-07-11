---
title: Semantic Segmentation
slug: computer-vision/semantic-segmentation
description: Concise guide to Semantic Segmentation in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - semantic-segmentation
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
## Summary

Semantic segmentation assigns a class label to each pixel. It is used when location and shape matter, but individual object identities do not need to be separated.

## Core idea

The model maps an image to a dense label mask. Every pixel might be labelled as road, sky, building, tumor, background, or another class. The output is spatial, not just one image-level label.

## Example

In satellite imagery, semantic segmentation can mark water, buildings, vegetation, and roads. The result supports area measurement and map updates, but it does not distinguish two adjacent buildings unless instance-level separation is added.

## Evaluation

Evaluate per-class performance, boundary quality, rare classes, and visually representative failures. Class imbalance is common because background or large regions dominate pixel counts.

## Failure modes

Segmentation fails at thin structures, ambiguous boundaries, occlusion, rare classes, and domain shift. Post-processing can clean masks but cannot recover missing evidence.
