<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const ctx = composerState("ComposerModelLabel");
</script>

<div class={cn(ctx.styles.menuLabel(), classProp)} {...rest}>{@render children?.()}</div>
