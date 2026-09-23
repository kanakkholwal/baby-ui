---
title: Scrub Field
description: A number input whose label is a horizontal drag handle.
component: scrub-field
category: base
tags: [number, input, drag, scrub, stepper]
---

Drag the label left or right, use arrow keys (Shift for x10), or click in and type a
number directly. Built for compact property inspectors -- a layout panel, a design tool,
anywhere several numeric fields sit side by side.

## Controlled, not just callback

`value`/`onValueChange` is the only source of truth; there's no internal copy that can
drift from what the caller passed in. `defaultValue` seeds an uncontrolled instance for
simple cases.

## One primitive, one hand-rolled port

React rides Base UI's `NumberField` (`Root`/`ScrubArea`/`Input`), which gives the drag,
keyboard and wheel-scrub behaviour for free. bits-ui ships no equivalent, so the Svelte
port hand-rolls the same pointer-drag and keyboard model to match.
