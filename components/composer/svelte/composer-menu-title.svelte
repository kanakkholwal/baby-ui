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
const ctx = composerState("ComposerMenuTitle");
</script>

<span class={cn(ctx.styles.menuTitle(), classProp)} {...rest}>{@render children?.()}</span>
