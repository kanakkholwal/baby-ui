<script lang="ts">
import type { Snippet } from "svelte";
import Button, { type ButtonProps } from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	label = "Start voice input",
	class: classProp,
	children,
	...rest
}: Omit<ButtonProps, "variant" | "size" | "children"> & {
	label?: string;
	children?: Snippet;
} = $props();
const ctx = composerState("ComposerVoice");
</script>

<!-- A round outline button for voice input. It renders only where you place it. -->
<Button
	type="button"
	variant="outline"
	size="icon"
	disabled={ctx.disabled || ctx.loading}
	aria-label={label}
	data-slot="composer-voice"
	class={cn(ctx.styles.voice(), classProp)}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3" />
		</svg>
	{/if}
</Button>
