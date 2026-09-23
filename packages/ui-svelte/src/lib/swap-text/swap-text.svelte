<script lang="ts">
import { cn } from "../lib/cn";
import { type SwapTextSize, swapText } from "./variants";

let {
	initialText,
	finalText,
	active: activeProp,
	defaultActive = false,
	onActiveChange,
	supportsHover = true,
	disableClick = false,
	durationMs = 1000,
	size = "lg",
	class: classProp,
}: {
	initialText: string;
	finalText: string;
	active?: boolean;
	defaultActive?: boolean;
	onActiveChange?: (active: boolean) => void;
	supportsHover?: boolean;
	disableClick?: boolean;
	/** How long the swap slide takes, in ms. */
	durationMs?: number;
	size?: SwapTextSize;
	class?: string;
} = $props();

// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useState(initialValue)
let internalActive = $state(defaultActive);
const active = $derived(activeProp ?? internalActive);
const longer = $derived(finalText.length > initialText.length ? finalText : null);

function setActive(next: boolean) {
	if (activeProp === undefined) internalActive = next;
	onActiveChange?.(next);
}

const LAYER = "block transition-transform ease-[var(--ease-out)]";
</script>

<div data-slot="swap-text" class={cn("relative overflow-hidden text-foreground", classProp)}>
	<button
		type="button"
		disabled={disableClick}
		onclick={() => !disableClick && setActive(!active)}
		class={cn(swapText({ size }), "group/swap")}
	>
		<span
			class={cn(LAYER, "flex flex-col", {
				"-translate-y-full": active,
				"group-hover/swap:-translate-y-full": supportsHover,
			})}
			style="transition-duration: {durationMs}ms;"
		>
			{initialText}
			{#if longer}<span class="invisible h-0">{longer}</span>{/if}
		</span>
		<span
			class={cn(LAYER, "absolute top-full", {
				"-translate-y-full": active,
				"group-hover/swap:-translate-y-full": supportsHover,
			})}
			style="transition-duration: {durationMs}ms;"
		>
			{finalText}
		</span>
	</button>
</div>
