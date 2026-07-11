---
title: AWS Fundamentals
slug: cloud-and-distributed-systems/aws-fundamentals
description: Concise guide to AWS Fundamentals in Cloud and Distributed Systems.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

AWS fundamentals are the core cloud primitives used to build, deploy, and operate data and AI systems on Amazon Web Services: identity, networking, compute, storage, databases, observability, and managed ML services.

## Core primitives

Most AWS architectures combine IAM for permissions, VPC networking, object storage such as S3, compute through EC2, containers, or serverless functions, managed databases, queues, logs, metrics, and deployment automation. ML systems add artifact storage, batch jobs, feature pipelines, model endpoints, and GPU capacity where needed.

## Example architecture

A batch training pipeline may read data from S3, transform it with Spark or a managed job service, train on GPU instances, write model artifacts back to S3, register the model, and deploy an inference container behind a load-balanced endpoint. IAM roles define which component can read or write each artifact.

## Failure modes

AWS projects fail when teams treat managed services as architecture, ignore IAM design, skip cost alarms, or deploy stateful workloads without backup and recovery plans.
