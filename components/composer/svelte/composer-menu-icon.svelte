<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();
const ctx = composerState("ComposerMenuIcon");
</script>

<span aria-hidden="true" class={cn(ctx.styles.menuIcon(), classProp)} {...rest}>{@render children?.()}</span>
