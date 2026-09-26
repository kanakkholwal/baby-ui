<script lang="ts">
import { cn } from "../lib/cn";
import {
	flipTiming,
	type SwapTextMotion,
	type SwapTextSize,
	swapChars,
	swapText,
	swapTextFlip,
	swapTextSlide,
} from "./variants";

let {
	initialText,
	finalText,
	active: activeProp,
	defaultActive = false,
	onActiveChange,
	supportsHover = true,
	disableClick = false,
	durationMs = 1000,
	staggerMs = 44,
	size = "lg",
	motion = "slide",
	class: classProp,
}: {
	initialText: string;
	finalText: string;
	active?: boolean;
	defaultActive?: boolean;
	onActiveChange?: (active: boolean) => void;
	supportsHover?: boolean;
	disableClick?: boolean;
	/** How long the swap takes, in ms (per letter for `flip`). */
	durationMs?: number;
	/** Delay between neighbouring letters for `flip`, in ms. */
	staggerMs?: number;
	size?: SwapTextSize;
	motion?: SwapTextMotion;
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

const slide = $derived(swapTextSlide({ active, hover: supportsHover }));
const flip = (layer: "first" | "second") =>
	swapTextFlip({ layer, active, hover: supportsHover });
</script>

{#snippet letters(text: string, layer: "first" | "second")}
	{@const chars = swapChars(text)}
	<span aria-hidden="true" class={flip(layer).layer()}>
		{#each chars as c, i (i)}
			<span class={flip(layer).char()} style="--i: {i}; --n: {chars.length}">{c}</span>
		{/each}
	</span>
{/snippet}

{#if motion === "flip"}
	<div data-slot="swap-text" class={cn("relative text-foreground", classProp)}>
		<button
			type="button"
			disabled={disableClick}
			aria-label={active ? finalText : initialText}
			aria-pressed={active}
			onclick={() => !disableClick && setActive(!active)}
			class={cn(swapText({ size, motion }), "group/swap")}
		>
			<span
				class={flip("first").stage()}
				style="--swap-duration: {flipTiming(durationMs).letter}ms; --swap-stagger: {staggerMs}ms; --swap-lag: {flipTiming(durationMs).lag}ms"
			>
				{@render letters(initialText, "first")}
				{@render letters(finalText, "second")}
			</span>
		</button>
	</div>
{:else}

<div data-slot="swap-text" class={cn("relative overflow-hidden text-foreground", classProp)}>
	<button
		type="button"
		disabled={disableClick}
		aria-label={active ? finalText : initialText}
		aria-pressed={active}
		onclick={() => !disableClick && setActive(!active)}
		class={cn(swapText({ size }), "group/swap")}
	>
		<span
			aria-hidden="true"
			class={slide.first()}
			style="transition-duration: {durationMs}ms;"
		>
			{initialText}
			{#if longer}<span class="invisible h-0">{longer}</span>{/if}
		</span>
		<span
			aria-hidden="true"
			class={slide.second()}
			style="transition-duration: {durationMs}ms;"
		>
			{finalText}
		</span>
	</button>
</div>
{/if}
