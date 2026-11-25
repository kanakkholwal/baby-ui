<script lang="ts">
import type { Snippet } from "svelte";
import { untrack } from "svelte";
import { cn } from "../../lib/cn";
import { createCarouselTrack } from "../track";
import {
	CAROUSEL_LABELS,
	type CarouselLabels,
	type CarouselProjection,
	type CarouselSize,
	type CarouselVariant,
	carousel,
} from "../variants";
import { setCarousel } from "./context";

let {
	label,
	children,
	index = $bindable(),
	defaultIndex = 0,
	onIndexChange,
	projection = "linear",
	visibleItems = 5,
	minScale = 0.58,
	arc,
	variant = "default",
	size = "default",
	loop = false,
	slideSize,
	slideLabel = (i: number, count: number) => `${i + 1} of ${count}`,
	labels: labelsProp,
	interval,
	autoplay = false,
	class: classProp,
}: {
	/** Names the carousel for assistive technology, e.g. "From the Harbour suites". */
	label: string;
	/** `CarouselContent` with its slides, plus any controls. */
	children: Snippet;
	/** Active slide; bindable, or pair with `onIndexChange`. */
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	/** Projects slides as a linear row or onto the inside/outside of a cylinder. */
	projection?: CarouselProjection;
	/** Approximate number of slides visible across a cylindrical projection. */
	visibleItems?: number;
	/** Scale at the cylinder's farthest point. */
	minScale?: number;
	/** Vertical curve depth in pixels; responsive when omitted. */
	arc?: number;
	/** Plain full-width slide, scaled neighbours (`peek`), a flat row, controls over the slide, or large media. */
	variant?: CarouselVariant;
	/** Scales controls and thumbnails; sets slide width for the peeking variants. */
	size?: CarouselSize;
	/** Arrows and keys wrap from the last slide to the first. */
	loop?: boolean;
	/** Width of one slide as a CSS length; `cqw` is a share of the carousel width. */
	slideSize?: string;
	/** Names each slide and its indicator. Defaults to "2 of 5". */
	slideLabel?: (index: number, count: number) => string;
	/** Overrides for the built-in control labels. */
	labels?: Partial<CarouselLabels>;
	/** Milliseconds per slide while `autoplay` is on; rotation pauses on hover, focus and drag, and never runs under reduced motion. */
	interval?: number;
	/** Rotates every `interval` ms while true. Off by default, so motion begins with the viewer; toggle it from your own state. */
	autoplay?: boolean;
	class?: string;
} = $props();

const uid = $props.id();
let count = $state(0);
// svelte-ignore state_referenced_locally -- seeds the uncontrolled index once
let own = $state(defaultIndex);
const last = $derived(Math.max(0, count - 1));
const current = $derived(Math.min(last, Math.max(0, index ?? own)));
// svelte-ignore state_referenced_locally -- the server places this slide before measuring
const startIndex = untrack(() => index ?? defaultIndex);
const s = $derived(carousel({ projection, variant, size }));

const labels = $derived({ ...CAROUSEL_LABELS, ...labelsProp });

setCarousel({
	get s() {
		return s;
	},
	id: uid,
	get index() {
		return current;
	},
	startIndex,
	get count() {
		return count;
	},
	get loop() {
		return wraps;
	},
	get dragging() {
		return dragging;
	},
	get labels() {
		return labels;
	},
	register: () => count++,
	attach: (viewportEl, trackEl) => {
		viewport = viewportEl;
		track = trackEl;
	},
	go: (to) => engine?.go(to),
	step,
	setHovered: (value) => (hovered = value),
	slideLabel: (i) => slideLabel(i, count),
	slideId: (i) => `${uid}-slide-${i}`,
});

let hovered = $state(false);
let focusPaused = $state(false);
let dragging = $state(false);
let inView = $state(true);
let pageVisible = $state(true);
let reduced = $state(false);
let announcement = $state("");
let root = $state<HTMLElement>();
let viewport = $state<HTMLElement>();
let track = $state<HTMLElement>();
let engine: ReturnType<typeof createCarouselTrack> | null = null;

const canRotate = $derived(Boolean(interval) && count > 1 && !reduced);
const wraps = $derived(loop || projection !== "linear");
const running = $derived(
	canRotate && autoplay && !hovered && !focusPaused && !dragging && inView && pageVisible,
);
const options = $derived({
	running,
	interval: interval ?? 0,
	onSelect: (next: number, announce: boolean) => {
		if (index === undefined) own = next;
		else index = next;
		onIndexChange?.(next);
		if (announce) announcement = slideLabel(next, count);
	},
	onDragChange: (value: boolean) => {
		dragging = value;
	},
	flat: variant !== "peek",
	loop: wraps,
	projection,
	visibleItems,
	minScale,
	arc,
});

$effect(() => {
	const query = matchMedia("(prefers-reduced-motion: reduce)");
	const sync = () => (reduced = query.matches);
	sync();
	query.addEventListener("change", sync);
	return () => query.removeEventListener("change", sync);
});

$effect(() => {
	const [rootEl, viewportEl, trackEl] = [root, viewport, track];
	if (!rootEl || !viewportEl || !trackEl) return;
	const created = untrack(() =>
		createCarouselTrack(rootEl, viewportEl, trackEl, current, options),
	);
	engine = created;
	return () => {
		created.destroy();
		engine = null;
	};
});

$effect(() => {
	engine?.update(options);
});

// Turning rotation off refills the active dot: the slide stays until the viewer moves on.
$effect(() => {
	if (!autoplay) untrack(() => engine?.resetDrain());
});

$effect(() => {
	const next = current;
	untrack(() => engine?.go(next));
});

$effect(() => {
	if (!interval || !root) return;
	const observer = new IntersectionObserver(([entry]) => {
		if (entry) inView = entry.isIntersecting;
	});
	observer.observe(root);
	const onVisibility = () => (pageVisible = document.visibilityState !== "hidden");
	document.addEventListener("visibilitychange", onVisibility);
	return () => {
		observer.disconnect();
		document.removeEventListener("visibilitychange", onVisibility);
	};
});

// Arrows wrap with `loop`; otherwise they stop at either end.
function step(delta: number) {
	const next = current + delta;
	if (wraps) engine?.go((next + count) % count);
	else if (next >= 0 && next <= last) engine?.go(next);
}
</script>

<section
	bind:this={root}
	data-slot="carousel"
	data-projection={projection}
	aria-roledescription="carousel"
	aria-label={label}
	class={cn(s.root(), classProp)}
	style:--carousel-start={startIndex}
	style:--carousel-slide={slideSize}
	onfocusin={(event) => {
		const target = event.target as HTMLElement;
		focusPaused = target.matches(":focus-visible");
	}}
	onfocusout={(event) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) focusPaused = false;
	}}
>
	{@render children()}
	<span class="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
</section>
