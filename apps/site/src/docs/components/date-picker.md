---
title: Date Picker
description: Typed date field with a calendar popover that parses what you type on blur.
component: date-picker
category: base
tags: [date picker, datepicker, date input, calendar popover, form]
---

A text field first, a calendar second. People who know the date type it; people who don't
open the calendar. Built from Input Group, Popover, Calendar and Field.

## Typing

The field reads numbers in the locale's own order, so `3/12/2026` is March 12 in `en-US`
and 3 December in `en-GB`. ISO dates and month names also work. It parses on blur or Enter,
never while you type. An invalid or out-of-range date shows a Field error, linked to the
input with `aria-describedby`.

## Values

React takes and returns a `Date` (or `null`). Svelte uses `@internationalized/date` values,
the same type bits-ui's calendar uses, and binds with `bind:value`. `min` and `max` bound
both the calendar and typed input.
