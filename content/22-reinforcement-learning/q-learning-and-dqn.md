---
title: Q-Learning and DQN
slug: reinforcement-learning/q-learning-and-dqn
description: Value-based reinforcement learning from tabular Q-learning to deep Q-networks.
area: reinforcement-learning
topics:
  - reinforcement-learning
  - q-learning
  - dqn
  - value-based-rl
level: intermediate
status: draft
page_type: algorithm
aliases:
  - "Q-Learning"
  - "Deep Q-Network"
  - "DQN"
prerequisites:
  - "value-functions-and-bellman-equations.md"
related:
  - "policy-gradients-and-actor-critic.md"
  - "offline-and-model-based-reinforcement-learning.md"
  - "../06-deep-learning/convolutional-neural-networks.md"
historical_context: false
last_reviewed: 2026-07-13
---
# Q-Learning and DQN

Q-learning is a value-based control method. It learns $Q(s,a)$, the expected return after taking action $a$ in state $s$ and then acting well afterward. A policy can then choose the action with the largest estimated value.

## Tabular Update

For a transition $(s,a,r,s')$, tabular Q-learning updates

$$
Q(s,a)\leftarrow Q(s,a)+\alpha\left[r+\gamma\max_{a'}Q(s',a')-Q(s,a)\right].
$$

The bracketed term is the temporal-difference error. It compares the current estimate $Q(s,a)$ with a one-step bootstrap target.

## Worked Calculation

Assume $Q(s,a)=5$, reward $r=2$, discount $\gamma=0.9$, next-state best action value $\max_{a'}Q(s',a')=8$, and learning rate $\alpha=0.1$. The target is

$$
2+0.9\cdot 8=9.2.
$$

The temporal-difference error is $9.2-5=4.2$, so the updated value is

$$
5+0.1\cdot 4.2=5.42.
$$

The estimate moves toward the better-than-expected transition but does not jump all the way because the learning rate is $0.1$.

## Deep Q-Networks

DQN replaces a table with a neural network $Q_\theta(s,a)$. For high-dimensional observations such as images, the network maps the observation to one value per action. The usual squared Bellman loss is

$$
L(\theta)=\mathbb{E}\left[
\left(r+\gamma\max_{a'}Q_{\theta^-}(s',a')-Q_\theta(s,a)\right)^2
\right],
$$

where $\theta^-$ are target-network parameters held fixed for several updates. DQN also uses experience replay: transitions are stored and sampled later so training batches are less correlated.

| Mechanism | Why it helps |
| --- | --- |
| Replay buffer | reuses transitions and reduces correlation between adjacent samples |
| Target network | makes the bootstrap target less volatile |
| $\epsilon$-greedy exploration | sometimes tries non-greedy actions to discover better returns |
| Value output per action | turns action selection into an argmax over predicted values |

## Caveats

Value-based methods fit naturally when the action set is discrete. Continuous control often needs policy-gradient or actor-critic methods. DQN can also overestimate values because the same estimates select and evaluate actions; variants such as Double DQN reduce this bias.

## Connections

- [Value Functions and Bellman Equations](value-functions-and-bellman-equations.md) define the target Q-learning tries to satisfy.
- [Policy Gradients and Actor-Critic Methods](policy-gradients-and-actor-critic.md) are often better suited to continuous actions and stochastic policies.
- [Offline and Model-Based RL](offline-and-model-based-reinforcement-learning.md) adds stronger constraints when the data comes from a fixed logged dataset.

## References

- [Watkins and Dayan, 1992, Q-learning](https://link.springer.com/article/10.1007/BF00992698)
- [Mnih et al., 2013, Playing Atari with Deep Reinforcement Learning](https://arxiv.org/abs/1312.5602)
- [van Hasselt et al., 2015, Deep Reinforcement Learning with Double Q-learning](https://arxiv.org/abs/1509.06461)
