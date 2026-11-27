---
title: Poll Vote
description: "A one-tap poll: the ring fills, bars fill in a wave and each share counts up."
component: poll-vote
category: animated
tags: [poll, vote, survey, results, micro-interaction]
---

Before a vote the rows are plain pills. Tap one and its ring fills with a check, its bar fills
first and the others follow a beat apart, each share slides in and counts up, and the vote
total ticks over. Picking another option moves every bar at once; passing `value={null}` clears
the poll and drains the bars.

`options[].votes` is the count before the viewer's vote. The viewer's pick adds 1 to its share
and to the total, so the numbers you pass never change when they vote.

Leave `value` out to let the poll drive itself, or pass `value` and `onValueChange` to keep the
answer yourself (`bind:value` in Svelte). `labels` replaces any built-in string for translation.
