---
title: Reasoning
description: Collapsible chain-of-thought panel with optional steps, sources and images; opens while thinking and closes when done.
component: reasoning
category: agents
tags: [reasoning, thinking, ai, steps]
---

Opens on its own while the model is reasoning and closes when it finishes, unless the
reader has toggled it; then their choice wins. Pass `open` to control it outright.

Children can be plain text or `ReasoningSteps`. Each `ReasoningStep` takes a `status`:
pending steps stay hidden, the active one's label previews under the collapsed title,
and done steps show a check. Nest `ReasoningStepDetails`, `ReasoningStepSources` and
`ReasoningStepImage` inside a step for detail.

`duration` is a prop, not a timer: the caller knows how long the model thought.

## Not a live region

Reasoning is supplementary to the answer. Marking it `aria-live` would have a screen
reader read the model's scratch work over the actual response.
