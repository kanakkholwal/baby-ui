---
title: Chat Composer
description: "Interactive chat panel with switchable topic tabs, scripted replies, and a composer."
component: chat-composer
category: agents
tags: [chat, composer, conversation, agent]
---

A fixed-height chat panel: topic tabs, a scrollable conversation region, and a composer.
Sending a prompt reveals that topic's `messages` one at a time on a short delay, so the
reply sequence reads as the agent actually working rather than appearing all at once.

## Header controls

Every header control is wired to real state, not decorative:

- **Topic tabs** switch between `topics`: each has its own starting prompt and scripted
  replies, like separate threads.
- **New** clears the active topic back to an empty composer, ready for a fresh prompt.
- **Prompt history** lists prompts sent so far this session; picking one re-sends it.
- **More actions** copies the visible conversation to the clipboard.

## Data shape

```tsx
type ChatTopic = {
  key: string;
  label: string;
  initialPrompt: string;
  messages: ChatMessage[];
};

type ChatMessage = {
  label: string;
  sub: string;
  time: string;
  body: string;
};
```

Only the first two messages in a topic are ever shown (one at a time, in sequence); this
is a scripted demo panel, not a full conversation history.
