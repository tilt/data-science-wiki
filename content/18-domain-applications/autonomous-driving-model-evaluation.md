---
title: Autonomous Driving Model Evaluation
slug: domain-applications/autonomous-driving-model-evaluation
description: "Scenario, slice, and risk-weighted evaluation for autonomous-driving perception and behavior models."
area: domain-applications
topics:
  - autonomous-driving-model-evaluation
level: advanced
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../16-experimentation-and-evaluation/offline-evaluation.md
  - ../16-experimentation-and-evaluation/risk-weighted-error-taxonomies.md
  - ../16-experimentation-and-evaluation/golden-datasets.md
  - ../08-computer-vision/object-detection.md
  - ../08-computer-vision/detection-and-segmentation-metrics.md
  - ../03-classical-machine-learning/calibration.md
historical_context: false
last_reviewed: 2026-07-11
---
# Autonomous Driving Model Evaluation

Autonomous-driving evaluation measures whether perception, prediction, planning, and control behave acceptably under road scenarios that matter for safety. Inputs include camera, lidar, radar, maps, ego-motion, annotations, scenario tags, simulation results, and disengagement or intervention logs. Targets include object boxes, tracks, segmentation, predicted trajectories, planned maneuvers, and policy-level outcomes.

## Framing

Perception evaluation uses [object detection](../08-computer-vision/object-detection.md), tracking, and [detection and segmentation metrics](../08-computer-vision/detection-and-segmentation-metrics.md), but aggregate mAP is not enough. A safety review should combine [offline evaluation](../16-experimentation-and-evaluation/offline-evaluation.md), curated [golden datasets](../16-experimentation-and-evaluation/golden-datasets.md), simulation, replay, and on-road review. Use [risk-weighted error taxonomies](../16-experimentation-and-evaluation/risk-weighted-error-taxonomies.md) for vulnerable road users, occlusions, night, rain, construction, emergency vehicles, and unusual signs. Probabilities should be checked with [calibration](../03-classical-machine-learning/calibration.md) before downstream planning consumes them.

nuScenes is a public benchmark anchor: the paper reports 1,000 scenes, each 20 seconds long, with 6 cameras, 5 radars, 1 lidar, 360-degree coverage, and 3D annotations for 23 classes and 8 attributes.

## Worked Scenario Slice

This scenario table shows how aggregate recall can hide a high-risk slice:

| scenario | detected | total | recall | risk weight |
| --- | ---: | ---: | ---: | ---: |
| day clear | 940 | 982 | 0.957 | 1 |
| night rain | 35 | 50 | 0.700 | 8 |
| occluded pedestrian | 7 | 12 | 0.583 | 20 |

The aggregate recall is $(940+35+7)/(982+50+12)=0.941$. The risk-weighted miss rate is 0.372 because the occluded-pedestrian miss rate is high and its risk weight is large. The overall recall looks strong, but occluded-pedestrian recall is only 58.3%. That slice should drive model review before deployment even if the aggregate benchmark improves.

## Failure Modes

Long-tail events dominate safety risk. Evaluation fails when logs overrepresent easy daylight driving, when simulation assets are unrealistic, or when labels miss ambiguous intent. Models can also trade false positives for braking discomfort, so system-level metrics must include planner consequences, not perception scores alone.

## References

- [Caesar et al., nuScenes: A multimodal dataset for autonomous driving](https://arxiv.org/abs/1903.11027)
- [nuScenes dataset](https://www.nuscenes.org/)
