<script lang="ts">
import { cn } from "../lib/cn";
import {
	type LayeredStackAspect,
	type LayeredStackColumns,
	type LayeredStackItem,
	layeredStack,
	nextIndex,
	spreadDelay,
	stackOffsets,
	stackRotation,
} from "./variants";

let {
	items,
	open = $bindable(),
	defaultOpen = false,
	onOpenChange,
	tilt = 10,
	columns,
	aspect,
	label = "Card stack",
	class: className,
}: {
	items: readonly LayeredStackItem[];
	/** Controlled spread state: true lays cards out in the grid. */
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Largest resting tilt of a stacked card, in degrees. */
	tilt?: number;
	columns?: LayeredStackColumns;
	aspect?: LayeredStackAspect;
	/** Accessible name of the group. */
	label?: string;
	class?: string;
} = $props();

let root = $state<HTMLDivElement>();
let offsets = $state<{ x: number; y: number }[]>([]);
let focusIndex = $state(0);
let hovered = false;
let focused = false;
const isOpen = $derived(open ?? defaultOpen);
const s = $derived(
	layeredStack({ columns, aspect, state: isOpen ? "spread" : "stacked" }),
);
const count = $derived(items.length);

function request(next: boolean) {
	if (next === isOpen) return;
	open = next;
	onOpenChange?.(next);
}
const sync = () => request(hovered || focused);

$effect(() => {
	void columns;
	const el = root;
	if (!el || count === 0) return;
	const resize = new ResizeObserver(() => {
		offsets = stackOffsets(el);
	});
	resize.observe(el);
	return () => resize.disconnect();
});

function onkeydown(event: KeyboardEvent) {
	if (event.key === "Escape") return request(false);
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		return request(!isOpen);
	}
	const next = nextIndex(event.key, focusIndex, count);
	if (next === undefined) return;
	event.preventDefault();
	focusIndex = next;
	root?.querySelectorAll<HTMLElement>("[data-layered-card]")[next]?.focus();
	request(true);
}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	bind:this={root}
	role="group"
	aria-label={label}
	data-slot="layered-stack"
	data-state={isOpen ? "open" : "closed"}
	class={cn(s.root(), className)}
	onmouseenter={() => {
		hovered = true;
		sync();
	}}
	onmouseleave={() => {
		hovered = false;
		sync();
	}}
	onfocusin={() => {
		focused = true;
		sync();
	}}
	onfocusout={(event) => {
		if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
		focused = false;
		sync();
	}}
	{onkeydown}
>
	{#each items as item, i (`${item.src}-${i}`)}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<figure
			data-layered-card=""
			tabindex={i === focusIndex ? 0 : -1}
			aria-label={item.alt}
			class={s.card()}
			onfocus={() => (focusIndex = i)}
			style="z-index: {100 - i}; transition-delay: {isOpen ? spreadDelay(i, count) : 0}ms; --layered-x: {offsets[i]?.x ?? 0}px; --layered-y: {offsets[i]?.y ?? 0}px; --layered-r: {stackRotation(i, tilt)}deg"
		>
			<img src={item.src} alt="" class={s.image()} draggable="false" />
		</figure>
	{/each}
</div>
