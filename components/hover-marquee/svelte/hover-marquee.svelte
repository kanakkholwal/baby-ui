<script lang="ts" module>
import type { HTMLAttributes } from "svelte/elements";
import type { HoverMarqueeVariant } from "../variants";

export type HoverMarqueeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
	text: string;
	variant?: HoverMarqueeVariant;
	pixelsPerSecond?: number;
};
</script>

<script lang="ts">
import { cn } from "../../lib/cn";
import { DEFAULT_PIXELS_PER_SECOND, marqueeSeconds, overflowOf } from "../marquee";
import { hoverMarquee } from "../variants";

let {
	text,
	variant = "ellipsis",
	pixelsPerSecond = DEFAULT_PIXELS_PER_SECOND,
	class: classProp,
	onpointerenter,
	onpointerleave,
	onfocus,
	onblur,
	...rest
}: HoverMarqueeProps = $props();

let box = $state<HTMLSpanElement>();
let inner = $state<HTMLSpanElement>();
let shift = $state(0);
let seconds = $state(0.25);
let active = $state(false);
let reduced = $state(false);
const slots = $derived(hoverMarquee({ variant }));

function start() {
	if (!box || !inner) return;
	reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (reduced) return;
	const overflow = overflowOf(box, inner);
	if (!overflow) return;
	seconds = marqueeSeconds(overflow, pixelsPerSecond);
	active = true;
	// Next frame lets the inline-block settle so the slide has a start to move from.
	requestAnimationFrame(() => (shift = -overflow));
}

function stop() {
	seconds = 0.25;
	shift = 0;
	active = false;
}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_no_noninteractive_tabindex -->
<span
	bind:this={box}
	data-slot="hover-marquee"
	data-active={active ? "" : undefined}
	tabindex="0"
	title={reduced ? text : undefined}
	class={cn(slots.root(), classProp)}
	onpointerenter={(event) => {
		onpointerenter?.(event);
		start();
	}}
	onpointerleave={(event) => {
		onpointerleave?.(event);
		stop();
	}}
	onfocus={(event) => {
		onfocus?.(event);
		start();
	}}
	onblur={(event) => {
		onblur?.(event);
		stop();
	}}
	{...rest}
><span
		bind:this={inner}
		class={active ? slots.inner() : undefined}
		style={active ? `--marquee-shift:${shift}px;--marquee-duration:${seconds}s` : undefined}
	>{text}</span></span>
