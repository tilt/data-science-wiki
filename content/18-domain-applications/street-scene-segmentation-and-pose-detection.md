---
title: Street Scene Segmentation and Pose Detection
slug: domain-applications/street-scene-segmentation-and-pose-detection
description: "Road-scene pixel labeling and human pose estimation for spatial understanding in traffic environments."
area: domain-applications
topics:
  - street-scene-segmentation-and-pose-detection
level: intermediate
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../08-computer-vision/semantic-segmentation.md
  - ../08-computer-vision/pose-estimation.md
  - ../08-computer-vision/object-detection.md
  - ../08-computer-vision/detection-and-segmentation-metrics.md
  - ../08-computer-vision/domain-shift.md
  - ../09-video-understanding/person-tracking-and-track-aggregation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Street Scene Segmentation and Pose Detection

Street-scene segmentation and pose detection convert road imagery into spatial understanding: drivable surface, lanes, vehicles, riders, pedestrians, signs, traffic lights, and human keypoints or orientation. Inputs are camera frames, calibration, timestamps, ego-motion, optional lidar, and scenario metadata. Targets are pixel classes, instance masks, boxes, keypoints, and tracks used by planning or mapping.

## Framing

The segmentation side is [semantic segmentation](../08-computer-vision/semantic-segmentation.md); the human-structure side is [pose estimation](../08-computer-vision/pose-estimation.md). In a road stack, both interact with [object detection](../08-computer-vision/object-detection.md) and [person tracking and track aggregation](../09-video-understanding/person-tracking-and-track-aggregation.md). Evaluation should include mIoU, boundary quality, small-object recall, keypoint error, latency, and scenario slices such as rain, night, glare, occlusion, and new cities. Cityscapes is the canonical street-scene segmentation artifact: the paper reports stereo video from 50 cities, 5,000 finely annotated images, and 20,000 additional coarse annotations.

## Worked Segmentation Check

This 4x4 mask example computes IoU for road, car, and person classes:

| class | intersection pixels | union pixels | IoU |
| --- | ---: | ---: | ---: |
| road | 6 | 6 | 1.000 |
| car | 6 | 7 | 0.857 |
| person | 3 | 4 | 0.750 |

The mean IoU is $(1.000+0.857+0.750)/3=0.869$. The mean looks high, but person IoU is the weakest class. For safety-sensitive perception, [detection and segmentation metrics](../08-computer-vision/detection-and-segmentation-metrics.md) should be inspected per class and per scenario, not averaged away.

## Failure Modes

Road-scene models fail under [domain shift](../08-computer-vision/domain-shift.md): new city geometry, rare signs, weather, camera exposure, construction layouts, and unusual pedestrian poses. Pose detection also fails when bodies are truncated or occluded by vehicles. Use targeted test sets for vulnerable road users and keep uncertain outputs from silently feeding a planner.

## References

- [Cordts et al., The Cityscapes Dataset for Semantic Urban Scene Understanding](https://arxiv.org/abs/1604.01685)
- [Cityscapes Dataset](https://www.cityscapes-dataset.com/)
