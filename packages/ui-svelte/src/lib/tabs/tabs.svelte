<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

type Tab = { id: string; label: string };

let {
	tabs,
	value = $bindable(""),
	variant = "pill",
	class: classProp,
	panel,
}: {
	tabs: Tab[];
	value?: string;
	variant?: "pill" | "underline";
	class?: string;
	panel?: Snippet<[string]>;
} = $props();

let list = $state<HTMLDivElement>();
let rects = $state<Record<string, { left: number; width: number }>>({});

const active = $derived(value || tabs[0]?.id || "");

function measure() {
	if (!list) return;
	const next: Record<string, { left: number; width: number }> = {};
	for (const el of list.querySelectorAll<HTMLElement>("[data-tab]")) {
		const id = el.dataset.tab;
		if (id) next[id] = { left: el.offsetLeft, width: el.offsetWidth };
	}
	rects = next;
}

$effect(() => {
	void tabs;
	measure();
});

$effect(() => {
	if (!list) return;
	const observer = new ResizeObserver(measure);
	observer.observe(list);
	return () => observer.disconnect();
});

const pill = $derived(rects[active] ?? { left: 0, width: 0 });

const clips = $derived.by(() => {
	const out: Record<string, string> = {};
	for (const [id, r] of Object.entries(rects)) {
		const l = Math.max(0, pill.left - r.left);
		const rr = Math.max(0, r.left + r.width - (pill.left + pill.width));
		out[id] = `inset(0 ${rr}px 0 ${l}px)`;
	}
	return out;
});

function move(delta: number) {
	const i = tabs.findIndex((t) => t.id === active);
	const next = tabs[(i + delta + tabs.length) % tabs.length];
	if (next) value = next.id;
}

function onkeydown(event: KeyboardEvent) {
	if (event.key === "ArrowRight") {
		event.preventDefault();
		move(1);
	} else if (event.key === "ArrowLeft") {
		event.preventDefault();
		move(-1);
	} else if (event.key === "Home") {
		event.preventDefault();
		value = tabs[0]?.id ?? active;
	} else if (event.key === "End") {
		event.preventDefault();
		value = tabs[tabs.length - 1]?.id ?? active;
	}
}
</script>

<div class={classProp}>
	<div
		bind:this={list}
		role="tablist"
		class={cn(
			"relative inline-flex items-center",
			variant === "pill" ? "gap-1 rounded-full bg-card p-1" : "gap-1 border-border border-b",
		)}
	>
		<span
			aria-hidden="true"
			style:transform="translateX({pill.left}px)"
			style:width="{pill.width}px"
			class={cn(
				"pointer-events-none absolute transition-[transform,width] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
				variant === "pill"
					? "top-1 bottom-1 left-0 rounded-full bg-primary"
					: "-bottom-px left-0 h-0.5 bg-foreground",
			)}
		></span>

		{#each tabs as tab (tab.id)}
			<button
				type="button"
				role="tab"
				data-tab={tab.id}
				id="tab-{tab.id}"
				aria-selected={active === tab.id}
				aria-controls="panel-{tab.id}"
				tabindex={active === tab.id ? 0 : -1}
				onclick={() => (value = tab.id)}
				{onkeydown}
				class={cn(
					"relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap px-3.5 py-1.5 font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
					variant === "pill" ? "rounded-full" : "rounded-md",
				)}
			>
				{tab.label}
				<span
					aria-hidden="true"
					style:clip-path={clips[tab.id] ?? "inset(0 100% 0 0)"}
					class={cn(
						"pointer-events-none absolute inset-0 inline-flex items-center justify-center transition-[clip-path] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
						variant === "pill" ? "text-primary-foreground" : "text-foreground",
					)}
				>
					{tab.label}
				</span>
			</button>
		{/each}
	</div>

	{#if panel}
		<div id="panel-{active}" role="tabpanel" aria-labelledby="tab-{active}" class="mt-4">
			{@render panel(active)}
		</div>
	{/if}
</div>
