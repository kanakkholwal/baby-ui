---
title: Reasoning
description: Collapsible chain-of-thought panel with steps, sources, images or trace rows; opens while thinking and closes when done.
component: reasoning
category: agents
tags: [reasoning, thinking, ai, steps, trace, tools]
---

Opens on its own while the model is reasoning and closes when it finishes, unless the
reader has toggled it; then their choice wins. Pass `open` to control it outright.

## Parts

Every part is optional; compose the header you want.

- `Reasoning` holds the state: `thinking`, `duration` and `variant`.
- `ReasoningTrigger` is the 32px header row. Inside it: `ReasoningIcon` (a 3 x 3 pixel loader),
  `ReasoningTitle`, `ReasoningDuration`, `ReasoningPreview` and `ReasoningChevron`.
- `ReasoningTitle` shows `thinkingLabel` while thinking and its children once done, so the
  "Thought for 4s" wording is yours.
- `ReasoningContent` is the panel, indented to sit under the title. Put plain text,
  `ReasoningSteps` or `ReasoningRows` in it.

Each `ReasoningStep` takes a `status`: pending steps stay hidden, the active one's label previews
in the collapsed header, and done steps show a check. Nest `ReasoningStepDetails`,
`ReasoningStepSources` and `ReasoningStepImage` inside a step for detail. For a flat trace,
`ReasoningRows` takes `rows` and a `kind`: `steps`, `search` or `coding`.

`default` has no border or surface. `framed` sits on the card colour for a transcript that has none.

`duration` is a prop, not a timer: the caller knows how long the model thought.

## Not a live region

Reasoning is supplementary to the answer. Marking it `aria-live` would have a screen
reader read the model's scratch work over the actual response.
