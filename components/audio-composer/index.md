---
title: Audio Composer
description: Prompt box for generating audio, with a length control and a style choice.
component: audio-composer
category: agents
tags: [audio, prompt, composer, generate]
---

Built on Composer. Place `ComposerInput`, then a `ComposerToolbar` holding `AudioComposerDuration`,
`AudioComposerStyle` and an `AudioComposerTools` group that ends in `ComposerSubmit`. `onSubmit`
receives the prompt, the length in seconds and the chosen style.

## Length

`AudioComposerDuration` is a minus and plus around the value; the value snaps to `step`. It is 36px tall, so it lines up with the style select. While `loading` is on, the length and style lock.

## Controlled

`duration` and `preset` are controlled, or use `defaultDuration` and `defaultPreset` to let the
component hold them. Read them from `onSubmit`, or from `useAudioComposer` inside the parts.
