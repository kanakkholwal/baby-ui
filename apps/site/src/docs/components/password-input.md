---
title: Password Input
description: Password field with a show/hide toggle, a Caps Lock warning and an optional strength meter and rules checklist.
component: password-input
category: base
tags: [password, form, sign up, strength]
---

Pass `rules` for a sign-up field and the meter and checklist appear; leave them out for a
sign-in field. Each rule is `{ id, label, test(value) }`, so your own policy drives the UI.
`defaultPasswordRules(minLength)` returns a common set to start from.

## Password managers

`autocomplete` defaults to `new-password` when `rules` are given and `current-password`
otherwise, so managers offer to generate or fill at the right moment.
