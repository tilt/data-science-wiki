---
title: Image Classification
slug: computer-vision/image-classification
description: "Assigning image-level labels with calibrated class probabilities and slice-aware evaluation."
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
  - image-representation.md
  - cnn-architectures.md
  - vision-transformers.md
  - model-benchmarking.md
historical_context: false
last_reviewed: 2026-07-11
---

# Image Classification

Image classification maps an entire image to one or more labels. It is appropriate when the image-level category is the deliverable; if the user needs object location, use [object detection](object-detection.md) or [semantic segmentation](semantic-segmentation.md) instead.

## Defining math

For single-label classification, a model computes logits $z=f_\theta(x)\in\mathbb R^K$ and class probabilities

$$
p_k=\frac{\exp(z_k)}{\sum_{j=1}^K\exp(z_j)}.
$$

Here $x$ is the image, $f_\theta$ is the model, $K$ is the number of classes, and $z_k$ is the unnormalized score for class $k$. Softmax converts all logits into probabilities that sum to one, so increasing one class probability necessarily lowers others.

Training usually minimizes cross-entropy,

$$
L(x,y)=-\log p_y.
$$

The label $y$ names the correct class and $p_y$ is the probability assigned to it. The loss is small only when the model puts high probability on the correct class.

The same contract can be implemented by a [CNN architecture](cnn-architectures.md), a [vision transformer](vision-transformers.md), or frozen [feature extraction](feature-extraction.md) plus a smaller classifier.

## Worked example

The code treats handwritten digits as small images, fits a simple classifier, and reports both probability quality and class confusions rather than only top-line accuracy.

```python
from sklearn.datasets import load_digits
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, log_loss
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_digits(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, test_size=.25, random_state=8)
clf = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000, random_state=8)).fit(Xtr, ytr)
pred = clf.predict(Xte)
proba = clf.predict_proba(Xte)
print("accuracy", round(accuracy_score(yte, pred), 3), "log_loss", round(log_loss(yte, proba), 3))
print("confusion_3x3")
print(confusion_matrix(yte, pred)[:3, :3])
print("first5_pred", pred[:5].tolist(), "first5_true", yte[:5].tolist())
```

Observed output:

```text
accuracy 0.964 log_loss 0.117
confusion_3x3
[[45  0  0]
 [ 0 43  0]
 [ 0  1 43]]
first5_pred [4, 2, 2, 4, 7] first5_true [4, 2, 2, 4, 7]
```

Accuracy is high, but the confusion slice matters: classes 1 and 2 have at least one confusion even in this small digit task.

## Caveats

Classifiers can learn background, acquisition device, border artifacts, or watermarks instead of the object. Multi-label tasks need independent sigmoid heads rather than a single softmax. For deployment, report calibration and segment-level performance in [model benchmarking](model-benchmarking.md), not only top-1 accuracy.

## References

- [scikit-learn example: Recognizing hand-written digits](https://scikit-learn.org/stable/auto_examples/classification/plot_digits_classification.html)
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Data Augmentation](data-augmentation.md) [Object Detection →](object-detection.md)
