<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import LogoColumn from "./logo-column.svelte";

const CYCLE_INTERVAL_MS = 1600;
const STAGGER_MS = 125;

let {
	items,
	logo,
	columnCount = 4,
	direction = "ltr",
	class: className,
}: {
	/** Distributed round-robin across `columnCount` columns. */
	items: unknown[];
	/** Renders one logo from an `items` entry. */
	logo: Snippet<[unknown]>;
	columnCount?: number;
	/** Which edge the per-column stagger counts from. */
	direction?: "ltr" | "rtl";
	class?: string;
} = $props();

function distribute(list: unknown[], count: number): unknown[][] {
	const n = Math.min(count, list.length);
	const columns: unknown[][] = Array.from({ length: n }, () => []);
	list.forEach((item, index) => {
		columns[index % n]?.push(item);
	});
	return columns;
}

const columns = $derived(distribute(items, columnCount));

let containerEl = $state<HTMLDivElement>();
let inView = $state(false);
$effect(() => {
	const el = containerEl;
	if (!el) return;
	const observer = new IntersectionObserver(
		([entry]) => {
			inView = entry?.isIntersecting ?? false;
		},
		{ rootMargin: "100px" },
	);
	observer.observe(el);
	return () => observer.disconnect();
});

let reduced = $state(false);
$effect(() => {
	const query = window.matchMedia("(prefers-reduced-motion: reduce)");
	reduced = query.matches;
	const onChange = () => {
		reduced = query.matches;
	};
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
});

let pageVisible = $state(true);
$effect(() => {
	const onChange = () => {
		pageVisible = document.visibilityState === "visible";
	};
	onChange();
	document.addEventListener("visibilitychange", onChange);
	return () => document.removeEventListener("visibilitychange", onChange);
});

const shouldPlay = $derived(inView && pageVisible && !reduced);

// svelte-ignore state_referenced_locally -- one-time seed, resized lazily by the tick below
let indices = $state<number[]>(columns.map(() => 0));

$effect(() => {
	if (!shouldPlay) return;
	const id = setInterval(() => {
		indices = columns.map((col, i) => ((indices[i] ?? 0) + 1) % Math.max(1, col.length));
	}, CYCLE_INTERVAL_MS);
	return () => clearInterval(id);
});
</script>

<div
	bind:this={containerEl}
	data-slot="logo-carousel"
	class={cn("grid", className)}
	style="grid-template-columns: repeat({columns.length}, minmax(0, 1fr));"
>
	{#each columns as col, i (i)}
		{@const activeIndex = col.length > 0 ? (indices[i] ?? 0) % col.length : 0}
		{@const delayMs = reduced ? 0 : (direction === "rtl" ? columns.length - 1 - i : i) * STAGGER_MS}
		<LogoColumn items={col} {logo} {activeIndex} {delayMs} {reduced} />
	{/each}
</div>
