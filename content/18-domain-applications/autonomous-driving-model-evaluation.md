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

## Executed Artifact

This executed scenario table shows how aggregate recall can hide a high-risk slice.

```python
scenarios = {
    "day_clear": (940, 982, 1),
    "night_rain": (35, 50, 8),
    "occluded_pedestrian": (7, 12, 20),
}
aggregate_recall = sum(hit for hit, total, _ in scenarios.values()) / sum(
    total for _, total, _ in scenarios.values()
)
risk_weighted_miss_rate = sum(
    (1 - hit / total) * risk for hit, total, risk in scenarios.values()
) / sum(risk for _, _, risk in scenarios.values())

print("aggregate_recall", round(aggregate_recall, 3))
print("occluded_pedestrian_recall", round(scenarios["occluded_pedestrian"][0] / scenarios["occluded_pedestrian"][1], 3))
print("risk_weighted_miss_rate", round(risk_weighted_miss_rate, 3))
```

Observed output:

```text
aggregate_recall 0.941
occluded_pedestrian_recall 0.583
risk_weighted_miss_rate 0.372
```

The overall recall looks strong, but occluded-pedestrian recall is only 58.3%. That slice should drive model review before deployment even if the aggregate benchmark improves.

## Failure Modes

Long-tail events dominate safety risk. Evaluation fails when logs overrepresent easy daylight driving, when simulation assets are unrealistic, or when labels miss ambiguous intent. Models can also trade false positives for braking discomfort, so system-level metrics must include planner consequences, not perception scores alone.

## References

- [Caesar et al., nuScenes: A multimodal dataset for autonomous driving](https://arxiv.org/abs/1903.11027)
- [nuScenes dataset](https://www.nuscenes.org/)
