---
title: Image Representation
slug: computer-vision/image-representation
description: Concise guide to Image Representation in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - image-representation
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

Image representation defines how visual data is stored and interpreted: pixels, channels, color spaces, tensors, patches, features, or embeddings. The representation shapes what algorithms can learn.

## Core forms

Raw images are arrays with height, width, and channels. Preprocessing may change resolution, normalize values, convert color spaces, or divide images into patches. Learned systems may represent images as feature maps or embedding vectors.

## Example

A grayscale medical scan, RGB street image, and multispectral satellite image have different channel semantics. Treating them as interchangeable three-channel pictures can destroy important information.

## Failure modes

Representation mistakes include wrong channel order, inconsistent normalization, aspect-ratio distortion, lossy resizing, and ignoring metadata such as spacing in medical images.
