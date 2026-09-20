---
title: Composer
description: Chat input that grows with content, sends on Enter and exposes a toolbar slot.
component: composer
category: agents
tags: [composer]
---

Enter sends, Shift+Enter breaks the line. This is the convention every chat client uses,
and inverting it strands anyone writing more than a sentence.

The send button is disabled while empty or in flight rather than hidden, so its position
never shifts under the cursor. Height follows content with no easing, for the same reason
as the textarea: an eased grow lags the caret.
