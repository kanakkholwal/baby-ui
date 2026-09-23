---
title: Roll Text
description: "Stacked text layers that roll vertically on hover, like a flip-clock digit."
component: roll-text
category: text
tags: [text, roll, hover, flip]
---

Two stacked copies of the label: the top slides up out of view, the bottom rises in to
replace it. `stagger` splits the roll across words or characters instead of moving the
whole label as one unit. `groupHover` plays it from a `[data-roll-group]` ancestor's
hover/focus instead of the element's own -- useful inside a card link.
