---
title: Introduction
description: A registry of React and Svelte components built from one specification.
---

baby-ui is a component registry, not a component library. Nothing is installed at
runtime: the CLI copies source into your project, where you own it and can change
anything.

## One spec, two ports

Every component starts as a `ComponentSpec`: its props, its variants, its motion
contract and its accessibility notes. The React and the Svelte implementation are both
written against that spec, by hand. Neither is generated from the other, because a
transpiled Svelte component is a bad Svelte component.

What keeps them honest is the build. `registry-build` fails if a spring value drifts
between the two ports, if a spec lists a file that does not exist, or if a doc page
claims a category its spec disagrees with.

## Shared tokens, shared motion

Both ports read the same token layer, so a component looks the same in either without
per-port tuning. Anything animated that both ports must match lives as a shared class
in the tokens package rather than in either framework's file, so the timing has exactly
one home.

## Drop-in for shadcn

Base components that share a slug with shadcn/ui use shadcn's part names, its
`data-slot` values and its class shape. Adding one over an existing shadcn component
replaces the file without touching a single call site.
