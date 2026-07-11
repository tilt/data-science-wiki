---
title: Detection and Segmentation Metrics
slug: computer-vision/detection-and-segmentation-metrics
description: Metrics for object detection and segmentation, including IoU, Dice, precision, recall, and boundary errors.
area: computer-vision
topics:
  - detection-and-segmentation-metrics
level: intermediate
status: draft
page_type: reference
aliases:
  - IoU
  - Dice coefficient
  - Detection metrics
  - Segmentation metrics
prerequisites:
  - object-detection.md
  - semantic-segmentation.md
related:
  - object-detection.md
  - semantic-segmentation.md
historical_context: false
last_reviewed: 2026-07-11
references: []
---
# Detection and Segmentation Metrics

## Summary

Detection and segmentation metrics measure whether a vision model found the right object, localized it accurately, and avoided extra predictions. Always inspect examples alongside aggregate scores.

## Intersection over union

Intersection over union, or IoU, measures overlap between a predicted region $A$ and ground-truth region $B$:

$$
\mathrm{IoU} = \frac{|A \cap B|}{|A \cup B|}
$$

For object detection, IoU is computed on bounding boxes. For segmentation, it is computed on masks.

## Dice coefficient

The Dice coefficient is common in medical segmentation:

$$
\mathrm{Dice} = \frac{2|A \cap B|}{|A| + |B|}
$$

Dice is sensitive to overlap and is often easier to interpret for small structures than raw pixel accuracy.

## Detection precision and recall

Detection precision asks: of predicted boxes, how many matched real objects? Detection recall asks: of real objects, how many were found? Both depend on a confidence threshold and an IoU matching threshold.

## Mean average precision

Mean average precision summarizes precision-recall behavior across thresholds, classes, and sometimes IoU thresholds. It is useful for benchmark comparison but can hide rare-class or safety-critical failures.

## Boundary errors

Segmentation masks can have high overlap while still having clinically or operationally important boundary errors. For medical and measurement workflows, inspect boundary distance metrics and qualitative examples.
