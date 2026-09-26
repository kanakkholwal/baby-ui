<script lang="ts">
type Tab = { id: string; label: string };
type Variant = "pill" | "segment" | "underline";

let {
	tabs,
	active = $bindable(),
	variant = "pill",
	controls = "panel",
	class: classProp,
}: {
	tabs: Tab[];
	active: string;
	variant?: Variant;
	/** Id prefix of each tab's panel (`panel-<id>`); null when the tabs switch content with no panel. */
	controls?: string | null;
	class?: string;
} = $props();

const radius = $derived(variant === "pill" ? "rounded-full" : "rounded-md");

let list = $state<HTMLDivElement>();
let rects = $state<Record<string, { left: number; width: number }>>({});

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

/**
 * Clip each duplicate label to the pill so the colour change travels with it.
 * Same duration as the pill, so the two never drift apart mid-slide.
 */
const clips = $derived.by(() => {
	const out: Record<string, string> = {};
	for (const [id, rect] of Object.entries(rects)) {
		const left = Math.max(0, pill.left - rect.left);
		const right = Math.max(0, rect.left + rect.width - (pill.left + pill.width));
		out[id] = `inset(0 ${right}px 0 ${left}px)`;
	}
	return out;
});

function move(delta: number) {
	const i = tabs.findIndex((t) => t.id === active);
	const next = tabs[(i + delta + tabs.length) % tabs.length];
	if (next) active = next.id;
}

function onkeydown(event: KeyboardEvent) {
	if (event.key === "ArrowRight") {
		event.preventDefault();
		move(1);
	} else if (event.key === "ArrowLeft") {
		event.preventDefault();
		move(-1);
	}
}
</script>

<div
	bind:this={list}
	role="tablist"
	class={[
		"relative inline-flex items-center",
		variant === "pill" && "gap-1 rounded-full bg-card p-1",
		variant === "segment" && "gap-0.5 rounded-lg p-0.5",
		variant === "underline" && "-mb-px gap-1 border-border border-b",
		classProp,
	]}
>
	<span
		aria-hidden="true"
		class={[
			"pointer-events-none absolute left-0 transition-[transform,scale,translate,width] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
			variant === "pill" && "top-1 bottom-1 rounded-full bg-primary",
			variant === "segment" && "top-0.5 bottom-0.5 rounded-md border border-border bg-background",
			variant === "underline" && "-bottom-px h-0.5 rounded-full bg-primary",
		]}
		style:transform="translateX({pill.left}px)"
		style:width="{pill.width}px"
	></span>

	{#each tabs as tab (tab.id)}
		<button
			type="button"
			role="tab"
			id="tab-{tab.id}"
			data-tab={tab.id}
			aria-selected={active === tab.id}
			aria-controls={controls ? `${controls}-${tab.id}` : undefined}
			tabindex={active === tab.id ? 0 : -1}
			onclick={() => (active = tab.id)}
			{onkeydown}
			class={[
				"relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-transparent font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
				radius,
				variant === "pill" && "px-3.5 py-1.5 text-sm",
				variant === "segment" && "h-7 px-2.5 text-xs aria-selected:text-foreground",
				variant === "underline" && "px-3 pt-1 pb-2.5 text-sm aria-selected:text-foreground",
			]}
		>
			{tab.label}
			{#if variant !== "underline"}
				<span
					aria-hidden="true"
					class={[
						"pointer-events-none absolute inset-0 inline-flex items-center justify-center transition-[clip-path] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
						radius,
						variant === "pill" ? "text-primary-foreground" : "text-foreground",
					]}
					style:clip-path={clips[tab.id] ?? "inset(0 100% 0 0)"}
				>
					{tab.label}
				</span>
			{/if}
		</button>
	{/each}
</div>
