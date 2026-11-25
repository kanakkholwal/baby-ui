<script lang="ts">
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../../lib/cn";
import PopoverTrigger from "../../popover/svelte/popover-trigger.svelte";
import { composerState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: Omit<ComponentProps<typeof PopoverTrigger>, "children"> & {
	children?: Snippet;
} = $props();
const ctx = composerState("ComposerModelTrigger");
</script>

<!-- The chip that opens the picker; it locks while a reply is being written. -->
<PopoverTrigger disabled={ctx.disabled || ctx.loading} class={cn(ctx.styles.modelTrigger(), classProp)} {...rest}>
	{@render children?.()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4 shrink-0"><path d="m6 9 6 6 6-6" /></svg>
</PopoverTrigger>
