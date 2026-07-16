---
title: AWS Fundamentals
slug: cloud-and-distributed-systems/aws-fundamentals
description: "AWS account, IAM, network, compute, and storage primitives for data and ML systems."
area: cloud-and-distributed-systems
topics:
  - aws-fundamentals
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - google-cloud-fundamentals.md
  - managed-compute.md
  - managed-storage.md
  - cost-management.md
  - reliability.md
  - ../14-ml-engineering-and-mlops/training-pipelines.md
historical_context: false
last_reviewed: 2026-07-11
---

# AWS Fundamentals

AWS is a control plane around accounts, regions, IAM, networking, compute, storage, and managed services. A useful AWS design is not a list of services; it is a contract for which principal can call which API on which resource in which region, with logging, recovery, and cost ownership attached. That makes this page the provider-specific companion to [Google Cloud fundamentals](google-cloud-fundamentals.md).

## Architecture contract

For a batch training workload, the core path is usually:

```text
IAM role -> VPC/subnet/security group -> managed compute -> S3 data/artifacts -> CloudWatch logs/metrics
```

The mechanism is IAM evaluation plus service APIs. An EC2, ECS, EKS, Batch, or SageMaker job assumes a role; that role receives temporary credentials; S3, CloudWatch Logs, KMS, and other APIs authorize calls against identity policies and resource policies. [Managed compute](managed-compute.md) chooses how the container or VM starts, while [managed storage](managed-storage.md) decides whether the dataset is an S3 object prefix, an FSx file system, an EBS volume, or a database.

## Executed policy check

This minimal training-role policy was parsed locally to verify the statement count, allowed actions, and resource scope.

```python
policy = {
  "Version": "2012-10-17",
  "Statement": [
    {"Effect": "Allow", "Action": ["s3:GetObject"],
     "Resource": "arn:aws:s3:::wiki-training-data/raw/*"},
    {"Effect": "Allow", "Action": ["s3:PutObject"],
     "Resource": "arn:aws:s3:::wiki-model-artifacts/prod/*"},
    {"Effect": "Allow", "Action": ["logs:CreateLogStream", "logs:PutLogEvents"],
     "Resource": "arn:aws:logs:us-east-1:123456789012:log-group:/ml/training:*"}
  ]
}
print("statements", len(policy["Statement"]))
print("actions", sorted(a for s in policy["Statement"] for a in s["Action"]))
for s in policy["Statement"]:
    print(s["Resource"])
```

Observed output:

```text
statements 3
actions ['logs:CreateLogStream', 'logs:PutLogEvents', 's3:GetObject', 's3:PutObject']
arn:aws:s3:::wiki-training-data/raw/*
arn:aws:s3:::wiki-model-artifacts/prod/*
arn:aws:logs:us-east-1:123456789012:log-group:/ml/training:*
```

The artifact shows the AWS habit worth keeping: read access to raw data, write access to model artifacts, and log-write permissions are separate. If the same role can delete buckets, launch arbitrary GPUs, and read production secrets, [cost management](cost-management.md), security review, and [reliability](reliability.md) all become harder.

## Caveats

AWS account boundaries are strong but not magic. Shared VPCs, cross-account roles, bucket policies, KMS keys, and organization service-control policies can interact in ways that are hard to debug. Region choice also binds latency, quotas, data residency, and accelerator availability; for example, a [GPU systems](gpu-systems.md) design that depends on P4 capacity is a capacity-planning problem, not just an EC2 instance-type choice.

## References

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
- [What is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

> **Section — [Cloud and Distributed Systems](index.md):** [Google Cloud Fundamentals](google-cloud-fundamentals.md) →
