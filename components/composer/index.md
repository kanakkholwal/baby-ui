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

Every part is optional and takes its own handlers; leave one out and it is not there.

- `ComposerFooter` is the strip above the card (branch, folder, agent, `ComposerContext`). Open, it becomes a tab behind the card's top edge.
- `ComposerFiles` holds `ComposerAttachment` tiles and folds shut when empty.
- `ComposerInput` is the field; `minRows` and `maxRows` bound its height.
- `ComposerToolbar` is the bottom row: `ComposerActions`, `ComposerMode` and `ComposerTools`.
- `ComposerActions` is the plus button and its menu. Fill it with `ComposerMenuLabel` and `ComposerMenuItem` rows, each built from `ComposerMenuIcon`, `ComposerMenuTitle` and `ComposerMenuHint`.
- `ComposerModelPicker` is a popover: `ComposerModelTrigger`, then `ComposerModelContent` with a `ComposerModelLabel`, a `ComposerModelGroup` of `ComposerModelItem` radios and a `ComposerEffort` slider.
- `ComposerVoice` and `ComposerSubmit` finish the row.

## Open and closed

At rest it is one pill. Focusing the field, typing, or adding an attachment opens it into a card: the footer slides up behind the card into a tab, the mode chip reveals beside the plus, and the tools settle into the bottom row. Clicking the plus, a chip or anywhere else does not open it. Set `expanded` to force either state. Reduced motion skips the slide.
