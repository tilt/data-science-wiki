---
title: Exploration in Reinforcement Learning
slug: reinforcement-learning/exploration-in-reinforcement-learning
description: How agents gather information in sequential decision problems, from epsilon-greedy and optimism to count-based bonuses, curiosity, and entropy regularization.
area: reinforcement-learning
topics:
  - reinforcement-learning
  - exploration
  - intrinsic-motivation
  - entropy-regularization
level: intermediate
status: complete
page_type: concept
aliases:
  - "Exploration"
  - "Exploration Strategies"
  - "Intrinsic Motivation"
prerequisites:
  - "markov-decision-processes.md"
related:
  - "q-learning-and-dqn.md"
  - "temporal-difference-learning.md"
  - "../04-recommendation-systems/exploration-versus-exploitation.md"
historical_context: false
last_reviewed: 2026-07-14
---

# Exploration in Reinforcement Learning

An agent only learns about actions it tries. If it always exploits its current best guess, it may never discover a better option; if it explores too much, it wastes reward. Managing this trade-off is the exploration problem. In the stateless case this is a [multi-armed bandit](../04-recommendation-systems/multi-armed-bandits.md); reinforcement learning adds the harder wrinkle that actions change future states, so an agent may need a long, deliberate sequence of exploratory actions before any reward appears.

## Why Sequential Exploration Is Harder

In a bandit, one pull reveals one reward. In an MDP, the informative reward can be many steps away, so the agent must explore _deeply_: commit to a novel region long enough to reach the states that carry signal. Naive per-step randomization struggles here because independent random actions rarely chain into a coherent novel trajectory.

## Common Strategies

| Strategy               | Idea                                                         | Strength                          | Weakness                               |
| ---------------------- | ------------------------------------------------------------ | --------------------------------- | -------------------------------------- |
| $\epsilon$-greedy      | act greedily, but pick a random action with prob. $\epsilon$ | trivial to implement              | shallow, undirected exploration        |
| Optimistic init        | start value estimates high so untried actions look good      | free, drives early coverage       | fades once estimates settle            |
| Upper confidence bound | add a bonus for uncertain actions                            | directed toward informative parts | needs usable uncertainty estimates     |
| Count-based bonus      | reward rarely visited states                                 | scales to large state spaces      | counting is hard with raw observations |
| Curiosity / prediction | reward states where a learned model errs                     | works from pixels                 | can chase noise (the "noisy TV")       |
| Entropy regularization | bonus for higher policy entropy                              | keeps stochasticity, easy to add  | not targeted at novelty                |

## Optimism and Bonuses

A general recipe augments the reward with an exploration bonus:

$$
r^{+}(s,a)=r(s,a)+\beta\, b(s,a),
$$

where $b(s,a)$ is large for uncertain or novel state-actions and $\beta$ controls exploration strength. Count-based methods set $b(s,a)=1/\sqrt{N(s,a)}$ using a visitation count $N$; in high-dimensional observation spaces this count is replaced by a learned density or hash. Curiosity methods set $b$ to the error of a learned dynamics model, so novel transitions are intrinsically rewarding.

## Entropy Regularization

Maximum-entropy RL adds a policy-entropy term to the objective:

$$
J(\pi)=\mathbb{E}\!\left[\sum_t r(s_t,a_t)+\alpha\,\mathcal{H}\big(\pi(\cdot\mid s_t)\big)\right],
$$

where $\mathcal{H}$ is entropy and $\alpha$ is a temperature. This keeps the policy stochastic, improves robustness, and is central to soft actor-critic. It encourages breadth of behavior rather than novelty-seeking specifically.

## Posterior Sampling

Instead of a per-step bonus, posterior (Thompson) sampling maintains a distribution over models or value functions, samples one, and acts greedily with respect to it for a whole episode. Sampling at the episode level induces the deep, temporally consistent exploration that per-step noise lacks.

## Caveats

Exploration bonuses change the effective objective, so they should be annealed or bounded to avoid distracting the agent from real reward. Curiosity can be captured by unpredictable but uncontrollable noise. In safety-critical systems, unconstrained exploration is unacceptable; exploration must respect [reward design](reward-design-and-shaping.md) constraints and often runs only in simulation.

## Connections

- [Exploration versus Exploitation](../04-recommendation-systems/exploration-versus-exploitation.md) covers the stateless bandit formulation this generalizes.
- [Q-Learning and DQN](q-learning-and-dqn.md) typically uses $\epsilon$-greedy exploration by default.
- [Reward Design and Shaping](reward-design-and-shaping.md) explains how added bonuses can distort the intended objective.

## References

- [Sutton and Barto, 2018, Reinforcement Learning: An Introduction (Chapter 2)](http://incompleteideas.net/book/the-book-2nd.html)
- [Bellemare et al., 2016, Unifying Count-Based Exploration and Intrinsic Motivation](https://arxiv.org/abs/1606.01868)
- [Pathak et al., 2017, Curiosity-Driven Exploration by Self-Supervised Prediction](https://arxiv.org/abs/1705.05363)
- [Osband et al., 2016, Deep Exploration via Bootstrapped DQN](https://arxiv.org/abs/1602.04621)

> [!nav]
> **Section** — [Reinforcement Learning](index.md)
>
> [← Proximal Policy Optimization](proximal-policy-optimization.md) [Reward Design and Shaping →](reward-design-and-shaping.md)
