<script lang="ts">
import { Spinner } from "@baby-ui/svelte";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import { demos } from "$lib/demos";
import type { CardItem } from "$lib/registry";
import HomeFormSample from "./home-form-sample.svelte";

let { items }: { items: CardItem[] } = $props();

type Tab = { id: string; label: string; blurb: string; slug: string; form?: boolean };

const TABS: Tab[] = [
	{
		id: "agents",
		label: "Agents",
		blurb: "Streaming messages, tool calls and task steps.",
		slug: "message",
	},
	{
		id: "data",
		label: "Data",
		blurb: "Sortable, filterable records with keyboard selection.",
		slug: "records-table",
	},
	{
		id: "forms",
		label: "Forms",
		blurb: "Labelled fields, tag input and inline validation.",
		slug: "input",
		form: true,
	},
	{
		id: "charts",
		label: "Charts",
		blurb: "Keyboard-readable charts with a data table for screen readers.",
		slug: "line-chart",
	},
];

let active = $state(0);
const tab = $derived(TABS[active]);
const item = $derived(items.find((i) => i.slug === tab.slug));
// Only the active tab loads and mounts its component.
const demo = $derived(tab.form ? undefined : demos[tab.slug]?.());

const tabs: HTMLButtonElement[] = $state([]);

// Tabs switch instantly: arrow keys repeat too fast for motion to help.
function onKey(event: KeyboardEvent) {
	const last = TABS.length - 1;
	const moves: Record<string, number> = {
		ArrowRight: active === last ? 0 : active + 1,
		ArrowLeft: active === 0 ? last : active - 1,
		Home: 0,
		End: last,
	};
	const next = moves[event.key] ?? -1;
	if (next < 0) return;
	event.preventDefault();
	active = next;
	tabs[next]?.focus();
}
</script>

<section aria-labelledby="home-categories-heading" class="mx-auto max-w-5xl px-4 pb-24 md:px-8">
	<div class="flex flex-col items-center gap-3 text-center">
		<h2
			id="home-categories-heading"
			class="font-normal text-[clamp(1.4rem,3.4vw,2rem)] text-foreground tracking-[-0.04em]"
		>
			Components for the screens you actually ship
		</h2>
		<div role="tablist" aria-label="Component areas" class="mt-3 inline-flex rounded-full border border-border p-1">
			{#each TABS as t, i (t.id)}
				<button
					bind:this={tabs[i]}
					type="button"
					role="tab"
					id="home-tab-{t.id}"
					aria-selected={i === active}
					aria-controls="home-panel"
					tabindex={i === active ? 0 : -1}
					onclick={() => (active = i)}
					onkeydown={onKey}
					class={[
						"min-h-9 rounded-full px-4 font-medium text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
						i === active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
					]}
				>
					{t.label}
				</button>
			{/each}
		</div>
	</div>

	<div
		id="home-panel"
		role="tabpanel"
		aria-labelledby="home-tab-{tab.id}"
		tabindex="0"
		class="mt-8 flex flex-col overflow-hidden rounded-3xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
	>
		<div class="flex h-[26rem] w-full min-w-0 items-center justify-center overflow-auto p-6 sm:p-10">
			{#if tab.form}
				<HomeFormSample />
			{:else if demo}
				{#await demo}
					<Spinner size="sm" label="Loading {tab.label}" class="text-muted-foreground" />
				{:then mod}
					{@const Demo = mod.default}
					<div class="flex w-full min-w-0 items-center justify-center">
						<Demo props={item?.defaults ?? {}} />
					</div>
				{/await}
			{/if}
		</div>
		<div class="flex flex-wrap items-center justify-between gap-3 border-border border-t px-6 py-4 text-sm">
			<p class="text-muted-foreground">{tab.blurb}</p>
			<a
				href={item?.href ?? "/components"}
				class="group inline-flex items-center gap-1.5 font-medium text-foreground"
			>
				View {item?.name ?? tab.label}
				<IconArrowRight
					size={15}
					stroke={1.7}
					class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
				/>
			</a>
		</div>
	</div>
</section>
