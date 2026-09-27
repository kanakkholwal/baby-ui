---
title: Currency Input
description: Money field that groups and formats by locale and currency as you type, with the value kept in minor units.
component: currency-input
category: base
tags: [currency, money, amount, form]
---

The value is an integer in minor units: `1999` is $19.99, and ¥1999 is `1999` because yen has
no decimals. Integers avoid floating-point drift, and the number of decimals follows the
currency through `Intl.NumberFormat`.

## Typing

While focused the field keeps what you type, including a half-typed decimal like `12.`, and
groups thousands as you go. On blur it shows the full format.
