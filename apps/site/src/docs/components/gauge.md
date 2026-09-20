---
title: Gauge
description: Circular meter drawn as a three-quarter dial.
component: gauge
category: base
tags: [gauge]
---

`role="meter"`, not `progressbar`. A meter is a reading within a known range; a
progressbar is a task advancing toward completion. Swapping them tells assistive tech that
a static score is a task that will eventually finish.

The arc covers three quarters of a circle with the gap at the bottom, so it reads as a
dial. A full ring with a gap at an arbitrary angle reads as a ring that failed to close.

The number is always rendered as text: the arc is a second encoding, never the only one.
