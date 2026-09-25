---
title: Stat Card
description: "A KPI card whose headline, caption and trend follow the point under the chart."
component: stat-card
category: blocks
tags: [stat, kpi, metric, card, dashboard]
---

Composes `card`, `badge`, `counter` and the area or line chart. At rest it shows `value`,
`label` and `trend`; hovering or arrowing through the chart swaps in that row's value, its
month and its change from the previous row.

Pass `formatValue` for currency or units, and `locale` for the month and percent formats.
