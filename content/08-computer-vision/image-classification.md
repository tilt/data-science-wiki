---
title: Image Classification
slug: computer-vision/image-classification
description: Concise guide to Image Classification in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - image-classification
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
## Summary

Image classification assigns one or more labels to an entire image. It is appropriate when the image-level category matters more than object location or shape.

## Core idea

A classifier maps an image to class probabilities. It may use a CNN, vision transformer, or pretrained embedding plus a classifier head. Multi-label classification allows several labels per image.

## Example

A plant-disease classifier predicts whether a leaf image shows rust, mildew, nutrient deficiency, or no visible disease. If the task also needs lesion location, segmentation or detection is more appropriate.

## Evaluation

Evaluate per class, not only average accuracy. Inspect confusion pairs, rare classes, calibration, and domain slices such as lighting or camera type.

## Failure modes

Classifiers can rely on background cues, watermarks, acquisition artifacts, or dataset shortcuts. They also cannot explain where an object is unless paired with localization methods.
