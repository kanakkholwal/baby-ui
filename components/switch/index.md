---
title: Switch
description: On/off control whose thumb travels rather than teleports.
component: switch
category: base
tags: [switch, toggle, setting]
---

`role="switch"` with `aria-checked`, not a checkbox. The distinction is real: a switch
takes effect immediately, a checkbox waits for a submit. If your control needs a save
button, it is a checkbox.

## The travel is the point

The thumb moves over 200ms on the shared out curve, the same window as the checkbox and radio
fill, and the track colour changes over it so the two land together. A thumb that teleports gives you
no sense that the control was actuated; a thumb that takes 400ms makes the setting feel
like it is still saving.

## Sizes sit beside the checkbox and radio

The track is the checkbox and radio box plus 4px (18, 20, 24 and 28px tall at `sm` to `xl`),
1.8 times as wide. The pill thumb and the round thumb stop flush at the track's inner edge at
every size, and the `sm` size matches a 32px field in a settings row.
