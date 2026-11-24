---
title: Button Group
description: Buttons, inputs and selects joined into one control with squared inner corners and short dividers.
component: button-group
category: base
tags: [button, group, toolbar, split button]
---

The same parts as shadcn/ui: `ButtonGroup`, `ButtonGroupText` and `ButtonGroupSeparator`. Put a
`ButtonGroupSeparator` between filled buttons: it adds no gap, and draws a short hairline on the
seam. Outline buttons share their border instead and need no separator.

For the soft pill look, set `roundness="full"` on every button in the group. The outer ends keep
their curve and the inner corners square off.

## Actions

Counts, reactions and split buttons: a label with a chevron, a count in a `Badge`, or an icon-only
button beside a label.

::example{name="actions"}

## Selection

::example{name="selection"}

## Sizes

Every button takes the group's `size`. `roundness="soft"` keeps the radius proportional to the
height at each step, so a small group is not rounder than a large one.

::example{name="sizes"}
