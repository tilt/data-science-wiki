---
title: Reward Design and Shaping
slug: reinforcement-learning/reward-design-and-shaping
description: Specifying rewards that induce the behavior you actually want, potential-based shaping that preserves optimal policies, and the failure mode of reward hacking.
area: reinforcement-learning
topics:
  - reinforcement-learning
  - reward-design
  - reward-shaping
  - reward-hacking
  - specification-gaming
level: intermediate
status: complete
page_type: concept
aliases:
  - "Reward Design"
  - "Reward Shaping"
  - "Reward Hacking"
  - "Specification Gaming"
prerequisites:
  - "markov-decision-processes.md"
related:
  - "reinforcement-learning-from-human-feedback.md"
  - "offline-and-model-based-reinforcement-learning.md"
  - "../18-responsible-ai-safety-and-governance/human-oversight.md"
historical_context: false
last_reviewed: 2026-07-14
---

# Reward Design and Shaping

The reward function is the objective an RL agent optimizes, and the agent will optimize exactly what is written, not what was intended. Most RL failures in practice are reward-specification failures rather than algorithmic ones. Reward design is the work of turning a fuzzy goal into a scalar signal that induces the desired behavior without exploitable shortcuts.

## Sparse Versus Dense Rewards

A **sparse** reward pays out only at a goal (for example, +1 on task success). It is unambiguous but gives the agent almost no gradient of feedback, making exploration hard. A **dense** reward gives frequent intermediate signal (for example, distance reduced toward the goal). Dense rewards accelerate learning but risk encoding the designer's assumptions about _how_ to solve the task, which the agent may exploit or which may be wrong.

## Potential-Based Reward Shaping

The safe way to densify a reward is potential-based shaping. Given a potential function $\Phi(s)$ over states, add:

$$
F(s,a,s')=\gamma\,\Phi(s')-\Phi(s).
$$

Ng, Harada, and Russell (1999) proved that adding $F$ to the reward leaves the set of optimal policies unchanged, for any bounded $\Phi$. Intuitively, the shaping terms telescope over a trajectory and cancel except for boundary terms, so they guide learning without moving the optimum. A good $\Phi$ is an estimate of state value: shaping then hands the agent a head start it would otherwise have to learn.

Shaping that is **not** potential-based (an arbitrary bonus for subgoals) can and often does change the optimal policy, which is how well-meaning bonuses produce bizarre behavior.

## Worked Example

Let $\gamma=0.9$ and a potential $\Phi$ with $\Phi(s)=3$ and $\Phi(s')=5$. The shaping reward for the transition is

$$
F=0.9\cdot 5 - 3 = 1.5,
$$

a positive nudge for moving to a higher-potential state. Over a full trajectory that starts at $s_0$ and ends at an absorbing state with $\Phi=0$, the shaping contributions sum to $-\Phi(s_0)$ (discounting aside), a constant that does not depend on the path taken.

## Reward Hacking and Specification Gaming

Reward hacking occurs when a policy scores highly on the specified reward while violating the designer's intent. Classic patterns:

| Pattern                | Example                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| Proxy exploitation     | rewarding "boat race points" leads to looping to collect items instead of finishing |
| Sensor tampering       | the agent manipulates the measurement that defines the reward                       |
| Reward gaming at edges | exploiting states the designer never anticipated                                    |
| Wireheading            | seizing control of the reward channel itself                                        |

Mitigations include using potential-based shaping, validating against held-out objectives, penalizing side effects, learning rewards from human preferences, and keeping a human in the loop for consequential actions.

## Learned Rewards

When a good scalar reward is hard to write, it can be learned. Inverse RL infers a reward from expert demonstrations, and [RLHF](reinforcement-learning-from-human-feedback.md) trains a reward model from human preference comparisons. Learned rewards move the specification problem into the data and the labeling process, where over-optimization against an imperfect reward model becomes the central risk.

## Connections

- [Reinforcement Learning from Human Feedback](reinforcement-learning-from-human-feedback.md) replaces a hand-written reward with a preference-trained reward model.
- [Human Oversight](../18-responsible-ai-safety-and-governance/human-oversight.md) is a safeguard against reward misspecification in deployed systems.
- [Exploration in Reinforcement Learning](exploration-in-reinforcement-learning.md) adds intrinsic bonuses that must be designed to avoid distorting the true objective.

## References

- [Ng, Harada, and Russell, 1999, Policy Invariance Under Reward Transformations](https://people.eecs.berkeley.edu/~russell/papers/icml99-shaping.pdf)
- [Amodei et al., 2016, Concrete Problems in AI Safety](https://arxiv.org/abs/1606.06565)
- [Krakovna et al., 2020, Specification Gaming: The Flip Side of AI Ingenuity](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)

> **Section — [Reinforcement Learning](index.md):** ← [Exploration in Reinforcement Learning](exploration-in-reinforcement-learning.md) · [Offline and Model-Based Reinforcement Learning](offline-and-model-based-reinforcement-learning.md) →
