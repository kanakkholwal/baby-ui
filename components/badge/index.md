---
title: Badge
description: Compact label and indicator with semantic colours in soft, solid or ghost fills, an optional leading dot, and corner placement for counts and status dots.
component: badge
category: base
tags: [badge, chip, status, label, indicator]
---

Eight variants, three of which mean something. `success`, `warning` and `destructive`
carry state; `default`, `secondary` and `outline` are weight, not meaning.

## Fills

`fill` decides how a variant's colour lands. `soft` tints the surface, `solid` fills it
with the saturated colour, and `ghost` drops the surface and keeps the coloured text.
Use `solid` where the badge must win attention, `ghost` where it sits inside a busy row.

::example{name="fills"}

## Sizes

::example{name="sizes"}

## With icons

Icons size to the badge, so they sit inline with the label and need no sizing classes.

::example{name="icons"}

## Statuses

The optional `dot` inherits the variant's colour and is decorative. It helps a dense
table scan faster; it does not add information.

::example{name="statuses"}

## Placement

Wrap the host in `BadgeAnchor` and set `placement` to pin a badge to a corner. A badge with
no content is a status dot; give it an `aria-label` so the state is not colour alone.

::example{name="placements"}

## Indicators

Counts, short labels and icons grow the badge to fit and keep it round. A background ring
cuts it out of the host, so it reads on any avatar or icon button.

::example{name="indicators"}

## Colour is not the message

If a badge's colour is the only thing distinguishing "failed" from "passed", the badge
does not work for roughly one in twelve men. Put the state in the text as well. The
variant is there to make the text easier to scan, not to replace it.
