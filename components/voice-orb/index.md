---
title: Voice Orb
description: "A grainy liquid sphere for voice agents: its folds open and its outline ripples with the speaker's level, from a number or your audio analyser."
component: voice-orb
category: agents
tags: [voice, audio, assistant, webgl]
---

Pass `activity` from 0 to 1 when your speech engine reports a level, or pass an `analyser` from
your Web Audio graph and the orb reads it each frame. It never asks for the microphone; you own
the audio. Set `active={false}` to hold it still while muted.

Pair it with a line of text such as Listening or Speaking, so the state is not carried by motion
alone.
