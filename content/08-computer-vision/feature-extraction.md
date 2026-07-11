---
title: Feature Extraction
slug: computer-vision/feature-extraction
description: Concise guide to Feature Extraction in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - feature-extraction
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

Feature extraction converts raw images into measurements or representations that downstream models can use. The feature definition determines what similarity, classification, or detection can notice.

## Classical features

Classical features include edges, corners, gradients, textures, color histograms, keypoints, and shape descriptors. They are interpretable and useful in constrained settings.

## Learned features

Deep networks learn features from data. Early layers often respond to local patterns; later layers capture higher-level structures. Embeddings from pretrained models are common starting points for retrieval or transfer learning.

## Example

For quality inspection, edge and texture features may detect scratches on a uniform surface. For open-domain image search, learned embeddings usually work better because the visual concepts are broader.

## Failure modes

Features can capture nuisance factors such as lighting, watermark, camera type, or background. Always inspect nearest neighbors and failure cases, not only aggregate scores.
