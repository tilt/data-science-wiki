---
title: Road Scene Perception
slug: domain-applications/road-scene-perception
description: "Perception for road environments, including segmentation, detection, pose, tracking, and scene understanding."
area: domain-applications
topics:
  - application
  - road-scene-perception
level: intermediate
status: review
page_type: case-study
aliases:
  - Street Scene Segmentation and Pose Detection
prerequisites:
  - index.md
related:
  - ../09-computer-vision/semantic-segmentation.md
  - ../09-computer-vision/pose-estimation.md
  - ../09-computer-vision/object-detection.md
  - ../09-computer-vision/detection-and-segmentation-metrics.md
  - ../09-computer-vision/domain-shift.md
  - ../10-video-understanding/person-tracking-and-track-aggregation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Road Scene Perception

Road scene perception converts traffic-environment sensor data into spatial understanding: drivable surface, lanes, vehicles, riders, pedestrians, signs, traffic lights, human keypoints, orientation, and tracks. Inputs are camera frames, calibration, timestamps, ego-motion, optional lidar or radar, and scenario metadata. Targets are pixel classes, instance masks, boxes, keypoints, and tracks used by planning, mapping, safety review, or driver assistance.

## Framing

The segmentation side is [semantic segmentation](../09-computer-vision/semantic-segmentation.md); the actor and vulnerable-road-user side combines [object detection](../09-computer-vision/object-detection.md), [pose estimation](../09-computer-vision/pose-estimation.md), and [person tracking and track aggregation](../10-video-understanding/person-tracking-and-track-aggregation.md). Evaluation should include mIoU, boundary quality, small-object recall, keypoint error, latency, tracking continuity, and scenario slices such as rain, night, glare, occlusion, and new cities. Cityscapes is the canonical street-scene segmentation artifact: the paper reports stereo video from 50 cities, 5,000 finely annotated images, and 20,000 additional coarse annotations.

## Worked Segmentation Check

This 4x4 mask example computes IoU for road, car, and person classes:

| class  | intersection pixels | union pixels |   IoU |
| ------ | ------------------: | -----------: | ----: |
| road   |                   6 |            6 | 1.000 |
| car    |                   6 |            7 | 0.857 |
| person |                   3 |            4 | 0.750 |

The mean IoU is $(1.000+0.857+0.750)/3=0.869$. The mean looks high, but person IoU is the weakest class. For safety-sensitive perception, [detection and segmentation metrics](../09-computer-vision/detection-and-segmentation-metrics.md) should be inspected per class and per scenario, not averaged away.

## Failure Modes

Road-scene models fail under [domain shift](../09-computer-vision/domain-shift.md): new city geometry, rare signs, weather, camera exposure, construction layouts, and unusual pedestrian poses. Pose detection also fails when bodies are truncated or occluded by vehicles. Use targeted test sets for vulnerable road users and keep uncertain outputs from silently feeding a planner.

## References

- [Cordts et al., The Cityscapes Dataset for Semantic Urban Scene Understanding](https://arxiv.org/abs/1604.01685)
- [Cityscapes Dataset](https://www.cityscapes-dataset.com/)
