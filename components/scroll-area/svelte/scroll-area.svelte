<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import {
	readEdges,
	SCROLL_FADE,
	type ScrollAreaFade,
	type ScrollAreaGutter,
	type ScrollAreaOrientation,
	type ScrollAreaScrollbar,
	scrollArea,
	writeFade,
} from "../variants";

let {
	children,
	maxHeight = "16rem",
	scrollbar = "auto",
	gutter = "overlay",
	orientation = "vertical",
	fade = "mask",
	fadeSize = SCROLL_FADE,
	fadeOffset = 0,
	class: classProp,
	viewportRef = $bindable(null),
	viewportProps,
	...rest
}: Omit<ScrollAreaPrimitive.RootProps, "type" | "orientation"> & {
	children: Snippet;
	maxHeight?: string;
	/** `auto` always shows the bar, `hover` and `scroll` reveal it when needed, `hidden` removes it. */
	scrollbar?: ScrollAreaScrollbar;
	/** `reserve` pads the content so the bar never overlaps it. */
	gutter?: ScrollAreaGutter;
	orientation?: ScrollAreaOrientation;
	/** How the clipped ends read: `mask` fades the content, `blur` softens it, `none` cuts it. */
	fade?: ScrollAreaFade;
	/** Length in px over which a `mask` fade ramps in as the content scrolls. */
	fadeSize?: number;
	/** Px the content must scroll before a fade starts. */
	fadeOffset?: number;
	/** Exposes the actual scrollable element, for callers that need to drive its scroll
	 * position themselves (e.g. Conversation's auto-follow). */
	viewportRef?: HTMLDivElement | null;
	/** Escape hatch for props that must land on the real scrollable element, not the
	 * outer root (role, aria-*, tabindex, extra scroll/pointer listeners). */
	viewportProps?: Omit<ScrollAreaPrimitive.ViewportProps, "children" | "ref">;
} = $props();

const styles = $derived(scrollArea({ scrollbar, gutter, orientation, fade }));

let edges = $state({ start: false, end: false });
let scrolling = $state(false);
let idle: ReturnType<typeof setTimeout> | undefined;

// Fades tell the reader there is more; a styled scrollbar alone does not on touch.
function measure() {
	if (!viewportRef) return;
	writeFade(viewportRef, orientation, fadeSize, fadeOffset);
	edges = readEdges(viewportRef, orientation);
}

$effect(() => {
	if (!viewportRef) return;
	void [orientation, fadeSize, fadeOffset];
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(viewportRef);
	return () => observer.disconnect();
});

$effect(() => () => clearTimeout(idle));

const showVertical = $derived(orientation !== "horizontal");
const showHorizontal = $derived(orientation !== "vertical");
</script>

{#snippet bar(direction: "vertical" | "horizontal")}
	<ScrollAreaPrimitive.Scrollbar
		data-slot="scroll-area-scrollbar"
		orientation={direction}
		forceMount
		class={styles.scrollbar()}
	>
		<ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" class={styles.thumb()} />
	</ScrollAreaPrimitive.Scrollbar>
{/snippet}

<ScrollAreaPrimitive.Root
	type="always"
	data-slot="scroll-area"
	data-scrollbar={scrollbar}
	data-scrolling={scrolling}
	class={cn(styles.root(), classProp)}
	{...rest}
>
	<ScrollAreaPrimitive.Viewport
		{...viewportProps}
		bind:ref={viewportRef}
		onscroll={(event) => {
			measure();
			scrolling = true;
			clearTimeout(idle);
			idle = setTimeout(() => (scrolling = false), 900);
			viewportProps?.onscroll?.(event);
		}}
		data-slot="scroll-area-viewport"
		style="max-height: {maxHeight}"
		class={cn(styles.viewport(), viewportProps?.class)}
	>
		{@render children()}
	</ScrollAreaPrimitive.Viewport>
	{#if scrollbar !== "hidden"}
		{#if showVertical}{@render bar("vertical")}{/if}
		{#if showHorizontal}{@render bar("horizontal")}{/if}
		{#if orientation === "both"}<ScrollAreaPrimitive.Corner />{/if}
	{/if}

	{#if fade === "blur"}
		<span
			aria-hidden="true"
			style:opacity={edges.start ? 1 : 0}
			class={styles.fadeStart()}
		></span>
		<span aria-hidden="true" style:opacity={edges.end ? 1 : 0} class={styles.fadeEnd()}></span>
	{/if}
</ScrollAreaPrimitive.Root>
