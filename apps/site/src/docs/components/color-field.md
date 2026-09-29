---
title: Color Field
description: "Hex colour input with a swatch that opens the full Color Picker."
component: color-field
category: base
tags: [color, hex, input]
---

A text field for hex colours, with the Color Picker one click away.

- Type `#rgb` or `#rrggbb`, with or without the `#`; it commits on blur or Enter.
- An unparseable draft marks the field invalid and reverts on blur or Escape.
- Arrow keys step the colour by 1, Page keys by 16.
- The swatch opens the Color Picker in a popover; set `picker={false}` for a plain preview.
