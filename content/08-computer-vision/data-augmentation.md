---
title: Data Augmentation
slug: computer-vision/data-augmentation
description: Concise guide to Data Augmentation in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - data-augmentation
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

Data augmentation creates transformed training examples to improve robustness and reduce overfitting. It is useful when the transformations match plausible deployment variation.

## Common augmentations

Image augmentations include crops, flips, rotations, color jitter, blur, noise, cutout, mixup, and synthetic backgrounds. The correct choice depends on which variations should not change the label.

## Example

Horizontal flips may be valid for animal classification but invalid for reading traffic signs or medical laterality markers. Augmentation must respect label semantics.

## Practical workflow

Start with simple augmentations, validate on clean and challenging slices, and inspect transformed images. Strong augmentation can improve robustness but also slow learning or create unrealistic samples.

## Failure modes

Bad augmentation teaches invariances that are false in deployment, hides annotation errors, or creates images outside the target distribution.
