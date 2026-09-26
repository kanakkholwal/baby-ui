---
title: Split Flap Display
description: A departures-board display whose cells flip through the character drum to each new value.
component: split-flap-display
category: animated
tags: [split flap, solari, departures, board, flip]
---

Each cell steps forward through its drum from the glyph it shows to the new one. Per step the old
top half folds down on `rotateX` and the new bottom half lands, all CSS keyframes. Cells start a
stagger apart, so a change rolls across the row.

`value` is the whole board: a newline starts a row, and rows pad or cut to `columns`. Change it from
your own state; the display only animates toward it. Reduced motion shows the new value at once.
