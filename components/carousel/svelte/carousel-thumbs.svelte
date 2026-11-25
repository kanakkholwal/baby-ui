<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { getCarousel, setThumbs } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const ctx = getCarousel();
let strip = $state<HTMLDivElement>();
let reduced = $state(false);
let next = 0;
setThumbs({ register: () => next++ });

$effect(() => {
	const query = matchMedia("(prefers-reduced-motion: reduce)");
	const sync = () => (reduced = query.matches);
	sync();
	query.addEventListener("change", sync);
	return () => query.removeEventListener("change", sync);
});

// Scrolls the strip itself, never the page, so mounting cannot move the viewport.
$effect(() => {
	void ctx.index;
	const active = strip?.querySelector<HTMLElement>("[aria-current=true]");
	if (!strip || !active) return;
	strip.scrollTo({
		left: active.offsetLeft - (strip.clientWidth - active.clientWidth) / 2,
		behavior: reduced ? "auto" : "smooth",
	});
});
</script>

<div
	{...rest}
	bind:this={strip}
	data-slot="carousel-thumbs"
	role="group"
	aria-label={ctx.labels.thumbnails}
	class={cn(ctx.s.thumbs(), classProp)}
>
	{@render children?.()}
</div>
