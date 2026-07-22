---
title: Model Benchmarking
slug: computer-vision/model-benchmarking
description: "Comparing vision models by task metrics, slices, latency, memory, and qualitative errors."
area: computer-vision
topics:
  - model-benchmarking
level: foundational
status: complete
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - detection-and-segmentation-metrics.md
  - domain-shift.md
  - image-classification.md
  - object-detection.md
historical_context: false
last_reviewed: 2026-07-22
---

# Model Benchmarking

Computer-vision benchmarking compares models under the same data, preprocessing, metrics, and deployment constraints. It should connect task scores from [detection and segmentation metrics](detection-and-segmentation-metrics.md) to practical constraints such as latency, memory, calibration, and [domain shift](domain-shift.md).

## What a benchmark specifies

A benchmark should specify a tuple

$$
B=(D_{\mathrm{test}}, M, S, C),
$$

where $D_{\mathrm{test}}$ is a frozen dataset, $M$ is the metric set, $S$ is the slice taxonomy, and $C$ is the compute environment. Reporting only $\frac{1}{n}\sum_i \mathbf 1\{\hat y_i=y_i\}$ misses false-positive cost, recall requirements, and runtime.

## Worked benchmark comparison

On a 10-image binary benchmark with 5 positives, compare two candidate models:

| model | correct predictions | true positives found | false positives | latency |
| ----- | ------------------: | -------------------: | --------------: | ------: |
| fast  |             7 of 10 |               3 of 5 |               1 |   12 ms |
| slow  |             9 of 10 |               4 of 5 |               0 |   47 ms |

The resulting metrics are

| model |     accuracy |      recall | false positives | latency |
| ----- | -----------: | ----------: | --------------: | ------: |
| fast  | $7/10=0.700$ | $3/5=0.600$ |               1 |   12 ms |
| slow  | $9/10=0.900$ | $4/5=0.800$ |               0 |   47 ms |

The slow model is better on accuracy, recall, and false positives, but it is almost four times slower. If the product needs sub-20 ms inference, the fast model may still be the deployable choice even though its task metrics are worse.

## Caveats

Benchmark leakage is common: duplicate images, slices from the same patient, near-identical video frames, or training-set augmentations in the test set. For [object detection](object-detection.md), match image size and NMS settings; for [image classification](image-classification.md), report class imbalance and calibration.

## References

- [Speed/accuracy trade-offs for modern convolutional object detectors](https://arxiv.org/abs/1611.10012)
- [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Document Image Analysis and Field Extraction](document-image-analysis-and-field-extraction.md) [Domain Shift →](domain-shift.md)
