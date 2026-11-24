<script lang="ts">
import { IconChevronDown } from "@baby-ui/icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	TableOfContents,
} from "@baby-ui/svelte";
import type { Heading } from "#lib/docs-nodes.js";

let { title, items }: { title: string; items: Heading[] } = $props();

const RADIUS = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// A heading above this line counts as read: the sticky header plus this bar.
const READ_LINE = 112;

let bar = $state<HTMLElement>();
let open = $state(false);
let progress = $state(0);
let activeId = $state("");

// The section being read; the page title until the first heading is reached.
const current = $derived(items.find((item) => item.id === activeId)?.label ?? title);

// Scroll progress and the section being read, measured at most once a frame.
$effect(() => {
	const ids = items.map((item) => item.id);
	let frame = 0;
	const read = () => {
		frame = 0;
		const room = document.documentElement.scrollHeight - window.innerHeight;
		progress = room > 0 ? Math.min(1, Math.max(0, window.scrollY / room)) : 0;
		let found = "";
		for (const id of ids) {
			const top = document.getElementById(id)?.getBoundingClientRect().top;
			if (top !== undefined && top <= READ_LINE) found = id;
		}
		activeId = found;
	};
	const onScroll = () => {
		if (!frame) frame = requestAnimationFrame(read);
	};
	read();
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", onScroll, { passive: true });
	return () => {
		cancelAnimationFrame(frame);
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("resize", onScroll);
	};
});

// Links jump to an anchor on this page, so the popover gets out of the way.
function closeOnLink(event: MouseEvent) {
	if (event.target instanceof Element && event.target.closest("a[href]")) open = false;
}
</script>

<!-- Decision (code): a click-only popover, not a hover card. Touch has no hover, and the list is
     something you pick from, so it needs to stay put while you aim. Sticky under the site header. -->
<div
	bind:this={bar}
	data-slot="outline-bar"
	class="sticky top-(--header-h) z-30 mt-3 -mx-4 bg-background/85 px-4 backdrop-blur-md xl:hidden"
>
	<Popover bind:open>
		<PopoverTrigger
			class="flex h-10 w-full items-center gap-3 rounded-lg text-left text-base text-muted-foreground outline-none transition-colors duration-(--duration-fast) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
		>
			<svg viewBox="0 0 20 20" aria-hidden="true" class="size-5 shrink-0 -rotate-90">
				<circle cx="10" cy="10" r={RADIUS} fill="none" stroke="currentColor" stroke-width="2" class="text-foreground/15" />
				<circle
					cx="10"
					cy="10"
					r={RADIUS}
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-dasharray={CIRCUMFERENCE}
					stroke-dashoffset={CIRCUMFERENCE * (1 - progress)}
					class="text-foreground"
				/>
			</svg>
			<span class="min-w-0 flex-1 truncate">{current}</span>
			<IconChevronDown
				size={16}
				class={[
					"shrink-0 transition-[rotate] duration-(--duration-press) motion-reduce:transition-none",
					open && "rotate-180",
				]}
			/>
		</PopoverTrigger>
		<!-- Anchored to the whole bar, not the trigger: the list drops down at full width under a soft shadow. -->
		<PopoverContent
			customAnchor={bar}
			align="start"
			sideOffset={0}
			class="max-h-[min(70dvh,28rem)] w-(--bits-floating-anchor-width) max-w-none overflow-y-auto rounded-t-none rounded-b-xl bg-background px-4 pt-1 pb-4 shadow-[0_12px_24px_-16px_rgb(0_0_0/0.22)]"
		>
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -- delegation only; the links handle keys -->
			<div onclick={closeOnLink}>
				<TableOfContents {items} variant="straight" indicator={false} label="On this page" />
			</div>
		</PopoverContent>
	</Popover>
</div>
