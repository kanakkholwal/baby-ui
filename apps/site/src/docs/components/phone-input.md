---
title: Phone Input
description: Phone number field with a searchable country picker, per-country grouping as you type and an E.164 value.
component: phone-input
category: base
tags: [phone, country code, form, e164]
---

The value is E.164 (`+14155552671`), ready to store or send to an SMS provider. The country is
its own prop because some dial codes are shared: +1 covers the US and Canada.

## Countries

A built-in table covers 22 common regions with light grouping per numbering plan. Pass
`countries` to narrow or extend it; each entry is `{ iso, name, dial, pattern }` with `#` for
a digit. It formats, it does not validate a number against a full numbering plan.
