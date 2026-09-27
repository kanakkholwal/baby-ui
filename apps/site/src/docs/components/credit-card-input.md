---
title: Credit Card Input
description: Card number, expiry and CVC fields that group digits as you type, detect the brand and validate with Luhn.
component: credit-card-input
category: base
tags: [credit card, payment, checkout, form]
---

The value is digits only: `{ number, expiry: "MMYY", cvc }`. `onValueChange` also hands you
`{ brand, number, expiry, cvc, valid }`, so enabling a Pay button is one check.

## Formatting

Numbers group 4-4-4-4, or 4-6-5 for Amex, and the caret stays put while spaces appear.
Backspace over a space or the expiry slash removes the digit before it. The CVC length follows
the brand.

## When errors show

Errors wait until a field loses focus, so a half-typed number is never flagged.

Only collect card data this way if your payment provider allows it. Most hosted checkouts
want their own fields so card numbers never touch your server.
