---
title: Waveform Trim
description: "A waveform with draggable trim handles, hatched cut-away audio and a playhead."
component: waveform-trim
category: agents
tags: [audio, waveform, trim, editor]
---

Compose `WaveformTrimTrack` and `WaveformTrimTimes` inside `WaveformTrim`. Pass loudness `peaks`
you computed, keep the kept `range` in your state, and feed `position` from your player. Pass
`onSeek` to make the track a seek target.
