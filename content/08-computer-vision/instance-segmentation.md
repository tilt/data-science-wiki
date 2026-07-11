---
title: Instance Segmentation
slug: computer-vision/instance-segmentation
description: Concise guide to Instance Segmentation in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - instance-segmentation
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

Instance segmentation predicts a separate mask for each object instance. It answers both "what class is this?" and "which pixels belong to this specific object?"

## Difference from semantic segmentation

Semantic segmentation labels every pixel by class, but does not separate two objects of the same class. Instance segmentation separates individual objects, such as two adjacent people or overlapping cells.

## Example

In retail shelf analysis, instance segmentation can count each product package and estimate its visible area. Semantic segmentation may identify package pixels but cannot reliably count individual packages when they touch.

## Evaluation

Evaluate mask quality, object detection quality, small-object performance, occlusion, and crowded scenes. Visual inspection is important because masks can have plausible aggregate metrics while failing at boundaries.

## Failure modes

Common failures include merging nearby objects, splitting one object into fragments, missing small instances, and producing masks that do not align with object edges.
