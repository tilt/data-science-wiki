---
title: Object Detection
slug: computer-vision/object-detection
description: Concise guide to Object Detection in Computer Vision and Medical Imaging.
area: computer-vision
topics:
  - object-detection
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

Object detection predicts object classes and locations, usually as bounding boxes. It is used when a system must know both what is present and where it is.

## Core idea

A detector outputs boxes, class labels, and confidence scores. Modern detectors may be one-stage, two-stage, anchor-based, anchor-free, or transformer-based, but all must solve classification and localization together.

## Example

A traffic-camera detector identifies pedestrians, cars, and cyclists with boxes. Evaluation should check small objects, occlusion, night scenes, and crowded intersections.

## Failure modes

Detectors can miss small objects, duplicate detections, confuse overlapping objects, or overfit to camera viewpoint.
