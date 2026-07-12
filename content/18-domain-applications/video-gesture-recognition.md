---
title: Video Gesture Recognition
slug: domain-applications/video-gesture-recognition
description: "Temporal recognition of hand and body gestures for interaction, accessibility, and control systems."
area: domain-applications
topics:
  - video-gesture-recognition
level: intermediate
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../09-video-understanding/gesture-recognition.md
  - ../09-video-understanding/temporal-localization.md
  - ../09-video-understanding/sliding-window-inference.md
  - ../08-computer-vision/pose-estimation.md
  - ../09-video-understanding/optical-flow.md
  - ../09-video-understanding/real-time-video-understanding.md
historical_context: false
last_reviewed: 2026-07-11
---
# Video Gesture Recognition

Video gesture recognition identifies meaningful hand, arm, body, or device gestures over time. Inputs may be RGB frames, depth, hand landmarks, body keypoints, optical flow, tracked objects, and temporal windows. Targets can be isolated gesture class, continuous gesture interval, or a control action. The decision may trigger a smart-TV command, accessibility interface, robot instruction, or sign-language support.

## Framing

The canonical concept is [gesture recognition](../09-video-understanding/gesture-recognition.md), but applications usually need [temporal localization](../09-video-understanding/temporal-localization.md), not just clip classification. A deliberate swipe and an incidental arm movement can share static poses, so [optical flow](../09-video-understanding/optical-flow.md), [pose estimation](../08-computer-vision/pose-estimation.md), and [sliding-window inference](../09-video-understanding/sliding-window-inference.md) are common building blocks. Evaluate by gesture class, person, camera angle, lighting, background, latency, false triggers, and missed commands.

The real-time hand-gesture CNN paper is a useful public reference because it frames the hard parts explicitly: no reliable start/end cue, each gesture should fire once, and memory and power budgets constrain the architecture.

## Executed Artifact

This executed interval example compared a predicted swipe window with ground truth and counted a separate false trigger.

```python
gt = (12, 28)
pred = (10, 25)
false_trigger = (40, 48)

def temporal_iou(a, b):
    intersection = max(0, min(a[1], b[1]) - max(a[0], b[0]))
    union = max(a[1], b[1]) - min(a[0], b[0])
    return intersection / union

score = temporal_iou(gt, pred)

print("temporal_iou_swipe", round(score, 3))
print("false_trigger_frames", false_trigger[1] - false_trigger[0])
print("accepted_at_tiou_0_5", score >= 0.5)
```

Observed output:

```text
temporal_iou_swipe 0.722
false_trigger_frames 8
accepted_at_tiou_0_5 True
```

The swipe passes a temporal-IoU threshold of 0.5, but the extra eight-frame false trigger would still be bad for a command interface. That is why gesture systems need event-level metrics from [real-time video understanding](../09-video-understanding/real-time-video-understanding.md), not only per-frame accuracy.

## Failure Modes

Failures come from occluded hands, mirrored viewpoints, multi-person scenes, motion blur, cultural variation in gestures, and lab-to-home distribution shift. Debouncing and confirmation thresholds reduce false commands but increase delay. For accessibility use, missed gestures and false activations should be reviewed with users, not optimized only on a public benchmark.

## References

- [Kopuklu et al., Real-time Hand Gesture Detection and Classification Using CNNs](https://arxiv.org/abs/1901.10323)
- [Wan et al., ChaLearn Looking at People: IsoGD and ConGD](https://arxiv.org/abs/1907.12193)
