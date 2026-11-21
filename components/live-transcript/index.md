---
title: Live Transcript
description: "Streaming transcript with settled and tentative text, pinned to the newest line."
component: live-transcript
category: agents
tags: [transcript, speech, captions, streaming]
---

Pass the settled words as `committed` and the engine's current guess as `tentative`. The body
follows the newest line until the reader scrolls up. Add `LiveTranscriptStatus` while the engine
is working and `LiveTranscriptNotice` for errors that should not hide the text.
