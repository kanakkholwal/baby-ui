---
title: Input OTP
description: One-time-code field with joined slots, a drawn caret, and native paste and autofill.
component: input-otp
category: base
tags: [otp, 2fa, verification, form, auth]
---

A single real input sits under the slots. Paste a whole code, let the browser autofill it
from an SMS (`autocomplete="one-time-code"`), or type it: it all lands in one field, and a
screen reader hears one field too.

## Same names as shadcn

`InputOTP`, `InputOTPGroup`, `InputOTPSlot` and `InputOTPSeparator`, so shadcn blocks drop in.
React runs on [`input-otp`](https://github.com/guilhermerodz/input-otp) and passes a slot
`index`; Svelte runs on bits-ui's PinInput and passes each `cell` from the root's snippet.

## Wrong codes

Set `aria-invalid` on the slots and say what went wrong in text beside the field. The red
border alone is not enough for someone who can't see it.

## Verifying and verified

`status` is yours to set. Put `"verifying"` while your server checks the code: the slots shimmer
and typing locks. On success set `"success"` and place `InputOTPVerified` inside the field; the
slots fold into it. On a wrong code set `invalid`, show `InputOTPMessage`, then clear the value
so the next try starts fresh.

`InputOTPResend` counts down from `seconds`, which comes from your own clock, then offers Resend.
