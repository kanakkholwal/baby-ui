<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

export type TabItem = { id: string; label: string };
export type TabsVariant = "pill" | "underline" | "segment";
export type TabsSize = "sm" | "md" | "lg" | "xl";

let {
	tabs,
	value = $bindable(""),
	variant = "pill",
	size = "md",
	class: classProp,
	panel,
}: {
	tabs: TabItem[];
	value?: string;
	variant?: TabsVariant;
	size?: TabsSize;
	class?: string;
	panel?: Snippet<[string]>;
} = $props();

const LIST: Record<TabsVariant, string> = {
	pill: "gap-1 rounded-full bg-card p-1",
	segment: "gap-0.5 rounded-lg bg-card p-0.5",
	underline: "gap-1 border-border border-b",
};

const TRIGGER: Record<TabsSize, string> = {
	sm: "h-7 px-2.5 text-xs",
	md: "h-8 px-3.5 text-sm",
	lg: "h-10 px-4 text-sm",
	xl: "h-12 px-5 text-base",
};

const RADIUS: Record<TabsVariant, string> = {
	pill: "rounded-full",
	segment: "rounded-md",
	underline: "rounded-md",
};

let root = $state<HTMLDivElement>();
let viewport = $state<HTMLDivElement>();
let list = $state<HTMLDivElement>();
let rects = $state<Record<string, { left: number; width: number }>>({});
let edges = $state({ overflow: false, left: false, right: false });

const active = $derived(value || tabs[0]?.id || "");
const indicator = $derived(rects[active] ?? { left: 0, width: 0 });

function measure() {
	if (!list || !viewport || !root) return;
	const next: Record<string, { left: number; width: number }> = {};
	for (const el of list.querySelectorAll<HTMLElement>("[data-tab]")) {
		const id = el.dataset.tab;
		if (id) next[id] = { left: el.offsetLeft, width: el.offsetWidth };
	}
	rects = next;

	// Overlay arrows sit above the viewport, so they never shrink its scroll range.
	const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
	const from = Math.max(0, Math.min(max, Math.abs(viewport.scrollLeft)));
	edges = {
		overflow: viewport.scrollWidth > root.clientWidth + 1,
		left: from > 1,
		right: from < max - 1,
	};
}

$effect(() => {
	void tabs;
	void size;
	measure();
});

$effect(() => {
	if (!root || !viewport || !list) return;
	const observer = new ResizeObserver(measure);
	observer.observe(root);
	observer.observe(list);
	viewport.addEventListener("scroll", measure, { passive: true });
	const port = viewport;
	return () => {
		observer.disconnect();
		port.removeEventListener("scroll", measure);
	};
});

/** Keep the selected tab clear of the arrows that overlay the faded edges. */
$effect(() => {
	const el = list?.querySelector<HTMLElement>(`[data-tab="${CSS.escape(active)}"]`);
	if (!el || !viewport || !edges.overflow) return;
	const frame = viewport.getBoundingClientRect();
	const item = el.getBoundingClientRect();
	const left = frame.left + (edges.left ? 36 : 0);
	const right = frame.right - (edges.right ? 36 : 0);
	const delta =
		item.left < left ? item.left - left : item.right > right ? item.right - right : 0;
	if (delta) viewport.scrollBy({ left: delta, behavior: "smooth" });
});

const clips = $derived.by(() => {
	const out: Record<string, string> = {};
	for (const [id, rect] of Object.entries(rects)) {
		const left = Math.max(0, indicator.left - rect.left);
		const right = Math.max(
			0,
			rect.left + rect.width - (indicator.left + indicator.width),
		);
		out[id] = `inset(0 ${right}px 0 ${left}px)`;
	}
	return out;
});

const mask = $derived(
	edges.overflow
		? `linear-gradient(to right, ${edges.left ? "transparent, black 40px" : "black, black 0"}, ${
				edges.right ? "black calc(100% - 40px), transparent" : "black 100%"
			})`
		: undefined,
);

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

function scroll(direction: number) {
	viewport?.scrollBy({
		left: direction * viewport.clientWidth * 0.8,
		behavior: "smooth",
	});
}

const ARROW =
	"absolute inset-y-0 z-20 inline-flex w-9 items-center justify-center text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-0";
</script>

<div class={classProp}>
	<div
		bind:this={root}
		class={cn(
			"relative isolate flex w-full min-w-0 max-w-full items-center",
			edges.overflow && variant === "pill" && "rounded-full bg-card",
			edges.overflow && variant === "segment" && "rounded-lg bg-card",
		)}
	>
		{#if edges.overflow}
			<button
				type="button"
				aria-label="Scroll tabs left"
				disabled={!edges.left}
				onclick={() => scroll(-1)}
				class={cn(ARROW, "left-0 rounded-l-full")}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="M10 3.5 5.5 8l4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		{/if}

		<div
			bind:this={viewport}
			style:mask-image={mask}
			style:-webkit-mask-image={mask}
			class={cn(
				"scrollbar-none w-full min-w-0 overflow-x-auto",
				edges.overflow && "[border-radius:inherit]",
			)}
		>
			<div
				bind:this={list}
				role="tablist"
				class={cn("relative inline-flex w-max items-center", LIST[variant])}
			>
				<span
					aria-hidden="true"
					style:transform="translateX({indicator.left}px)"
					style:width="{indicator.width}px"
					class={cn(
						"pointer-events-none absolute left-0 transition-[transform,width] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
						variant === "pill" && "top-1 bottom-1 rounded-full bg-primary",
						variant === "segment" && "top-0.5 bottom-0.5 rounded-md bg-primary",
						variant === "underline" && "-bottom-px h-0.5 rounded-full bg-primary",
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
							"relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
							variant === "underline" && "aria-selected:text-foreground",
							RADIUS[variant],
							TRIGGER[size],
						)}
					>
						{tab.label}
						{#if variant !== "underline"}
							<span
								aria-hidden="true"
								style:clip-path={clips[tab.id] ?? "inset(0 100% 0 0)"}
								class="pointer-events-none absolute inset-0 inline-flex items-center justify-center text-primary-foreground transition-[clip-path] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
							>
								{tab.label}
							</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		{#if edges.overflow}
			<button
				type="button"
				aria-label="Scroll tabs right"
				disabled={!edges.right}
				onclick={() => scroll(1)}
				class={cn(ARROW, "right-0 rounded-r-full")}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		{/if}
	</div>

	{#if panel}
		<div id="panel-{active}" role="tabpanel" aria-labelledby="tab-{active}" class="mt-4">
			{@render panel(active)}
		</div>
	{/if}
</div>
