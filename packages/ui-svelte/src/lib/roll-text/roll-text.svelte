<script lang="ts">
import { cn } from "../lib/cn";
import {
	ROLL_DONE,
	type RollStagger,
	type RollTextMotion,
	type RollTextSize,
	rollText,
} from "./variants";

let {
	text,
	groupHover = false,
	disabled = false,
	stagger = "none",
	staggerMs = 32,
	durationMs = 450,
	size = "md",
	motion = "slide",
	class: classProp,
}: {
	text: string;
	groupHover?: boolean;
	disabled?: boolean;
	stagger?: RollStagger;
	staggerMs?: number;
	durationMs?: number;
	size?: RollTextSize;
	motion?: RollTextMotion;
	class?: string;
} = $props();

type RollPhase = "closed" | "animating" | "open";
type RollSegment = { key: string; value: string; delay: number };

function splitSegments(t: string, s: RollStagger, step: number): RollSegment[] {
	if (s === "none") return [{ key: "whole", value: t, delay: 0 }];
	if (s === "word") {
		const words = t.trim().split(/\s+/);
		return words.map((word, i) => ({
			key: `${i}-${word}`,
			value: word,
			delay: i * step,
		}));
	}
	return [...t].map((char, i) => ({ key: `${i}-${char}`, value: char, delay: i * step }));
}

const segments = $derived(splitSegments(text, stagger, staggerMs));
let phase = $state<RollPhase>("closed");
let remaining = 0;
let reducedMotion = false;
let rootEl: HTMLSpanElement | undefined;

$effect(() => {
	if (disabled && phase !== "closed") phase = "closed";
});

$effect(() => {
	const media = window.matchMedia("(prefers-reduced-motion: reduce)");
	reducedMotion = media.matches;
	const onChange = (event: MediaQueryListEvent) => {
		reducedMotion = event.matches;
	};
	media.addEventListener("change", onChange);
	return () => media.removeEventListener("change", onChange);
});

function playOpen() {
	if (disabled || phase === "animating") return;
	if (reducedMotion) {
		phase = "open";
		return;
	}
	remaining = segments.length;
	if (phase === "open") {
		phase = "closed";
		requestAnimationFrame(() => requestAnimationFrame(() => (phase = "animating")));
		return;
	}
	phase = "animating";
}

$effect(() => {
	if (!groupHover || disabled || !rootEl) return;
	const group = rootEl.closest("[data-roll-group], .group\\/roll");
	if (!group) return;
	group.addEventListener("mouseenter", playOpen);
	group.addEventListener("focusin", playOpen);
	return () => {
		group.removeEventListener("mouseenter", playOpen);
		group.removeEventListener("focusin", playOpen);
	};
});

function onStackAnimationEnd(event: AnimationEvent) {
	if (phase !== "animating" || !ROLL_DONE.has(event.animationName)) return;
	remaining -= 1;
	if (remaining <= 0) phase = "open";
}

const classes = $derived(
	cn(
		rollText({ size, motion }),
		phase === "animating" && "roll-text--animating",
		phase === "open" && "roll-text--open",
		classProp,
	),
);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -- intentionally focusable for keyboard parity with hover; no action to give it a role for, matches the roll's own decorative purpose -->
<!-- svelte-ignore a11y_no_static_element_interactions -- same: the roll is a hover/focus-driven visual only, not a control -->
<span
	bind:this={rootEl}
	tabindex={groupHover ? undefined : 0}
	class={classes}
	onmouseenter={() => !groupHover && !disabled && playOpen()}
	onfocus={() => !groupHover && !disabled && playOpen()}
>
	<span class="sr-only">{text}</span>
	<span class="roll-text__track select-none" aria-hidden="true">
		{#each segments as segment, index (segment.key)}
			{#if stagger === "word" && index > 0}{" "}{/if}
			<span
				class="roll-unit"
				style="--roll-delay: {segment.delay}ms; --roll-unit-duration: {durationMs}ms"
			>
				<span class="roll-unit__sizer" aria-hidden="true">{segment.value}</span>
				<span class="roll-unit__stack" aria-hidden="true" onanimationend={onStackAnimationEnd}>
					<span class="roll-unit__line">{segment.value}</span>
					<span class="roll-unit__line">{segment.value}</span>
				</span>
			</span>
		{/each}
	</span>
</span>
