---
title: Conversation
description: Transcript viewport that follows new turns only when the reader is at the bottom.
component: conversation
category: agents
tags: [conversation]
---

Auto-scroll is suspended the moment you scroll up, and a jump-to-latest control appears.
Pulling someone back to the bottom while they are reading an earlier message is the single
most common bug in a chat transcript, and it is infuriating.

"At the bottom" means within 24px, which tolerates sub-pixel scroll rounding without
feeling loose.
