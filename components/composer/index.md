---
title: Composer
description: "Chat input that grows with content, sends on Enter, and composes an actions menu, a model picker and send or stop."
component: composer
category: agents
tags: [composer, prompt, chat, input]
---

Enter sends, Shift+Enter breaks the line. This is the convention every chat client uses,
and inverting it strands anyone writing more than a sentence. A composing Enter, the one
that commits an IME conversion, never submits.

The send button is disabled while empty, disabled, or `loading` rather than hidden, so its
position never shifts under the cursor. `loading` swaps it to a Stop button wired to
`onStop`; there's no internal timer pretending a send is in flight, that state is entirely
yours. Height follows content with no easing, for the same reason as Textarea: an eased
grow lags the caret.

## Parts

- `ComposerInput` is the field; `minRows` and `maxRows` bound its height.
- `ComposerToolbar` holds `ComposerActions` (a plus button on the real DropdownMenu),
  `ComposerModelSelect` (on the real Select, locked while `loading`) and `ComposerSubmit`.
- Leave a part out and it is not there; there are no fictional default lists.

## Migrating

Before parts, `Composer` took `placeholder`, `minRows`, `maxRows`, `models` and `actions`
itself, and `onSubmit` received the model too. Move the field props to `ComposerInput`, the
lists to `ComposerActions` and `ComposerModelSelect`, add `ComposerSubmit`, and read the
model from your own state.
