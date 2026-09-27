---
title: Search Input
description: A search field with a clear button, a loading spinner, a focus shortcut and a debounced onSearch.
component: search-input
category: base
tags: [search input, search, debounce, shortcut]
---

`onSearch` runs once typing pauses for `debounceMs`, and at once on Enter or clear, so you can
call your endpoint straight from it. Set `loading` while the request runs. With `shortcut`, the
key combo focuses the field from anywhere on the page, and its hint shows while the field is
empty.
