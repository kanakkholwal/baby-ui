---
title: Task Steps
description: "An agent plan of steps that are pending, active, done or failed, as a timeline or rows that open onto their details, with progress and retry."
component: task-steps
category: agents
tags: [tasks, steps, agent, plan, rows]
---

`variant="timeline"` ticks down a connector. `capsules` and `list` turn each step into a row
with a `meta` figure and a status pill that opens onto its `TaskStepDetails`. Each step's
`status` and `progress` come from you: there are no timers inside. A failed step shows retry
when you pass `onRetry`.

Put `TaskStepsHeader` above the list for a title with "2 of 4" and a bar.

Four states, each with its own icon and colour, and each with the status also present as
visually hidden text. A red circle and a green circle are the same circle to a
significant number of readers.

## Announced once

The list is `aria-live="polite"`, so a step changing status is announced on its own
rather than re-reading the entire plan. Putting the live region on each row instead
produces a pile-up when several steps settle at once.

## Only the active step moves

Exactly one spinner turns at a time. Animating pending steps too would suggest work is
happening on all of them, which is the opposite of what a sequential plan means.

## Migrating

Before parts, `TaskSteps` took a `steps` array, `onToggle` and `onRetry(id)`. Render a
`TaskStep` per item with its `label` and `status`, move `details` into `TaskStepDetails`, and
pass `onRetry` and `onOpenChange` to each step.
