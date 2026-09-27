---
title: Date Range Picker
description: Range trigger with a two-month calendar, a presets rail and optional Apply.
component: date-range-picker
category: base
tags: [date range picker, range, presets, report filter, booking, form]
---

Built for report filters and bookings. The trigger shows the range in the locale's own
format; the popover pairs a presets rail with Range Calendar.

## Presets

Presets are functions of today, so "Last 7 days" stays correct after midnight. Pass your
own `presets` to change the list, or `[]` to hide the rail. Picking one moves the calendar to
the range's first month.

## Apply or commit

By default each click commits. Set `confirm` to hold the pick in a draft until Apply, which
suits filters that refetch data on every change.

## Months

Two months show from 640px up and one below, so the popover never overflows a phone.
