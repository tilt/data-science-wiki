---
title: Markov Decision Processes
slug: reinforcement-learning/markov-decision-processes
description: The formal agent-environment model behind reinforcement learning.
area: reinforcement-learning
topics:
  - reinforcement-learning
  - markov-decision-processes
  - sequential-decision-making
level: foundational
status: draft
page_type: concept
aliases:
  - "MDP"
  - "Markov Decision Process"
prerequisites:
  - "../02-probability-and-statistics/markov-chains.md"
related:
  - "value-functions-and-bellman-equations.md"
  - "q-learning-and-dqn.md"
  - "../02-probability-and-statistics/markov-chains.md"
historical_context: false
last_reviewed: 2026-07-13
---

# Markov Decision Processes

A Markov decision process models sequential choice under uncertainty. At time $t$, an agent observes state $S_t$, chooses action $A_t$, receives reward $R_{t+1}$, and moves to a new state $S_{t+1}$.

## Defining Mechanism

An MDP is usually written as $(\mathcal{S},\mathcal{A},P,R,\gamma)$:

| Component        | Meaning                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| $\mathcal{S}$    | possible states                                                           |
| $\mathcal{A}$    | possible actions                                                          |
| $P(s'\mid s,a)$  | transition probability from state $s$ to next state $s'$ after action $a$ |
| $R(s,a,s')$      | expected immediate reward for that transition                             |
| $\gamma\in[0,1]$ | discount factor for future rewards                                        |

The Markov assumption says the next transition depends on the current state and action, not on the full history:

$$
P(S_{t+1}=s',R_{t+1}=r\mid S_t,A_t,S_{t-1},A_{t-1},\ldots)
=P(S_{t+1}=s',R_{t+1}=r\mid S_t,A_t).
$$

This does not mean the world has no memory. It means the state representation should contain the information needed for prediction and control.

## Return

The discounted return from time $t$ is

$$
G_t=R_{t+1}+\gamma R_{t+2}+\gamma^2R_{t+3}+\cdots
=\sum_{k=0}^{\infty}\gamma^kR_{t+k+1}.
$$

If $\gamma=0.9$, a reward one step away keeps full weight, a reward two steps away has weight $0.9$, and a reward three steps away has weight $0.81$. Lower $\gamma$ makes the agent more short-sighted; higher $\gamma$ makes delayed consequences matter more.

## Worked Scenario

In a lane-change decision, the state might include ego speed, adjacent-lane occupancy, distance to the lead vehicle, and road geometry. The actions are not labels; they change the future. Choosing "change left" affects the next state, which changes whether future acceleration is safe and whether the final route objective can be met.

| Time  | State summary                  | Action     |       Immediate reward | Future implication                |
| ----- | ------------------------------ | ---------- | ---------------------: | --------------------------------- |
| $t$   | slow lead car, left lane clear | move left  | small lane-change cost | opens a faster lane               |
| $t+1$ | centered in left lane          | accelerate |           speed reward | increases following distance risk |
| $t+2$ | faster speed, vehicle ahead    | hold speed |         comfort reward | avoids hard braking               |

The decision is sequential because the best action at $t$ depends on expected future rewards, not just the immediate reward.

## Caveats

The hardest modeling choice is the state. If important information is hidden, the process becomes partially observable and the policy may need memory, belief-state tracking, recurrent models, or history windows. If the reward omits safety or long-term cost, the optimal policy for the MDP can still be wrong for the real task.

## Connections

- [Value Functions and Bellman Equations](value-functions-and-bellman-equations.md) define expected return under an MDP.
- [Q-Learning and DQN](q-learning-and-dqn.md) learn action values from transitions.
- [Autonomous Driving](../19-domain-applications/autonomous-driving.md) often decomposes the full driving problem into perception, prediction, planning, and control rather than treating the whole stack as one unconstrained MDP.

## References

- [Sutton and Barto, 2018, Reinforcement Learning: An Introduction](http://incompleteideas.net/book/the-book-2nd.html)
