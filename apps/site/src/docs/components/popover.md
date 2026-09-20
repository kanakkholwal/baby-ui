---
title: Popover
description: Anchored panel that flips and shifts to stay on screen, dismissed by Escape or an outside click.
component: popover
category: base
tags: [popover, overlay]
---

Positioning comes from floating-ui: the panel flips to the opposite side when it runs
out of room and shifts along its axis to stay clear of the viewport edge. Both ports call
the same `anchor()` helper, so they cannot disagree about where the panel goes.

## Why the origin moves

`transform-origin` is set from whichever side the flip settled on, so the panel always
grows out of the trigger. A popover that scales from a fixed corner reads as unrelated to
the thing you clicked, which is the whole point of anchoring it.

## Dismissal

Outside `pointerdown` is captured, not bubbled. Without capture, the click that closes
the popover also activates whatever was underneath it, which is how you end up deleting
something by dismissing a menu.
