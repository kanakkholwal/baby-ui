---
title: Code Block
description: Scrollable code surface with optional line numbers, filename bar and copy.
component: code-block
category: base
tags: [code, block]
---

Code is rendered as text nodes. There is no `innerHTML` anywhere, so a snippet from an
untrusted source cannot inject markup.

## No highlighting

Deliberately. Syntax highlighting belongs in a build step that bakes the markup in, not in
a component that ships a tokenizer to every visitor. This site highlights with Shiki
server-side and passes the result in.

Line numbers are `aria-hidden` and unselectable, so copying the block gives you code rather
than code with numbers down the left.
