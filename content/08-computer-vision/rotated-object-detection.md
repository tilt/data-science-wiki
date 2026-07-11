---
title: Rotated Object Detection
slug: computer-vision/rotated-object-detection
description: Concise guide to Rotated Object Detection in Computer Vision and
  Medical Imaging.
area: computer-vision
topics:
  - rotated-object-detection
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

Rotated object detection predicts oriented bounding boxes rather than axis-aligned boxes. It is useful when object angle carries important spatial information or axis-aligned boxes include too much background.

## Core idea

A rotated box adds an angle parameter to location, width, and height. This better fits objects such as text lines, ships, aerial-view vehicles, shelves, or long industrial parts.

## Example

In aerial imagery, ships may appear at arbitrary angles. A rotated detector can tightly localize each ship, while an axis-aligned box may overlap nearby objects or water area.

## Failure modes

Rotated detectors can suffer from angle discontinuities, inconsistent labels for symmetric objects, and poor transfer from standard detection datasets.
