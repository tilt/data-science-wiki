---
title: Offline and Model-Based Reinforcement Learning
slug: reinforcement-learning/offline-and-model-based-reinforcement-learning
description: Learning policies from logged data, learned dynamics, planning, and sequence models when online exploration is limited.
area: reinforcement-learning
topics:
  - reinforcement-learning
  - offline-rl
  - model-based-rl
  - decision-transformer
  - planning
level: advanced
status: draft
page_type: concept
aliases:
  - "Offline RL"
  - "Batch RL"
  - "Model-Based RL"
  - "Decision Transformer"
prerequisites:
  - "markov-decision-processes.md"
  - "value-functions-and-bellman-equations.md"
related:
  - "q-learning-and-dqn.md"
  - "policy-gradients-and-actor-critic.md"
  - "../19-domain-applications/autonomous-driving.md"
historical_context: false
last_reviewed: 2026-07-13
---
# Offline and Model-Based Reinforcement Learning

Online RL learns by trying actions in the environment. Many real systems cannot do that freely: a vehicle, medical workflow, recommender, or robot may have safety, cost, or user-impact constraints. Offline and model-based RL reduce direct exploration by learning from logged data, learned dynamics, simulators, or planning models.

## Offline RL

Offline RL learns a policy from a fixed dataset

$$
\mathcal{D}=\{(s_i,a_i,r_i,s'_i)\}_{i=1}^{N}
$$

collected by one or more behavior policies. The central risk is extrapolation: the learner may assign high value to actions that are rare or absent in the dataset because it has no reliable evidence about their consequences.

| Problem | Why it appears | Typical control |
| --- | --- | --- |
| Out-of-distribution actions | learned policy chooses actions unlike the logged policy | constrain policy close to data support |
| Value overestimation | bootstrapping amplifies uncertain high values | conservative value penalties or ensembles |
| Confounding | logged actions came from a nonrandom policy | careful logging, counterfactual evaluation, domain knowledge |
| Deployment shift | new policy changes the state distribution | staged rollout and monitoring |

## Model-Based RL

Model-based RL learns or uses a dynamics model

$$
\hat P_\phi(s'\mid s,a),\qquad \hat R_\phi(s,a,s')
$$

and plans through the model before acting. Planning can use tree search, trajectory optimization, model predictive control, or learned policies trained on imagined rollouts.

The advantage is sample efficiency: one real transition can train a model that supports many simulated rollouts. The danger is model bias. Small prediction errors can compound across long imagined horizons, especially when the policy finds actions that exploit the model rather than the real environment.

## Sequence-Model View

Decision Transformer reframes offline RL as conditional sequence modeling. Instead of explicit Bellman backups, it trains a transformer on sequences such as

$$
(\hat G_1,s_1,a_1,\hat G_2,s_2,a_2,\ldots),
$$

where $\hat G_t$ is a desired return-to-go. At inference time, the model is conditioned on a target return and recent history, then predicts the next action.

This view is useful when trajectories are plentiful and the desired behavior can be represented as conditional imitation from good examples. It is weaker when the dataset lacks high-return behavior or when safe improvement beyond the data support is required.

## Simulation and Digital Twins

Simulation makes RL practical when real exploration is expensive. The simulator should expose the policy to meaningful variation: sensor noise, behavior of other agents, weather, latency, rare events, and perturbations. Good simulation is not just visual realism; it must preserve the causal factors that determine reward and safety.

## Caveats

Offline scores can be misleading because the learned policy changes the action distribution. Before deployment, use off-policy evaluation, held-out scenarios, conservative constraints, and small staged rollouts. For safety-critical systems, RL is usually one component inside a larger assurance process rather than the sole decision-maker.

## Connections

- [Autonomous Driving](../19-domain-applications/autonomous-driving.md) uses simulation, planning, prediction, and sometimes learned policies under strict safety constraints.
- [Policy Gradients and Actor-Critic Methods](policy-gradients-and-actor-critic.md) often train on online or simulated rollouts; offline RL adds support constraints.
- [LLM Training](../11-generative-ai/llm-training.md) shares the sequence-model idea during pretraining but uses different objectives and evaluation.

## References

- [Levine et al., 2020, Offline Reinforcement Learning: Tutorial, Review, and Perspectives](https://arxiv.org/abs/2005.01643)
- [Janner et al., 2019, When to Trust Your Model: Model-Based Policy Optimization](https://arxiv.org/abs/1906.08253)
- [Chen et al., 2021, Decision Transformer: Reinforcement Learning via Sequence Modeling](https://arxiv.org/abs/2106.01345)
