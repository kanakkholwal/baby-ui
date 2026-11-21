---
title: Speech Player
description: "Read-aloud controls with play, skip, speed and progress by chunk."
component: speech-player
category: agents
tags: [tts, speech, player, voice]
---

Split the text into chunks, pass the current one as `at` and the total as `count`, and wire the
handlers. `SpeechPlayer` renders the state you give it. To tie the speaking state to a Voice Orb,
pass `activity` while `state` is `playing`.
