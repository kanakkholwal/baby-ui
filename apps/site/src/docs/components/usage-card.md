---
title: Usage Card
description: "A settings-page usage panel: one ring per metric, with a legend breakdown."
component: usage-card
category: charts
tags: [usage, quota, storage, ring, settings, card]
---

Composes `card`, the ring chart and its legend. Each row in `data` becomes one ring; `config`
supplies the label and colour per ring, keyed by `nameKey`. `layout` places the rings beside
the legend (`side`) or above it (`stacked`), for narrower panels.

Every legend entry is a real toggle, so hiding a metric works from the keyboard too.
