<script lang="ts">
import type { DockSpring } from "@baby-ui/svelte";
import { Dock, DockItem, DockSeparator } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const size = $derived(Number(props.size ?? 44));
const magnification = $derived(Number(props.magnification ?? 72));
const distance = $derived(Number(props.distance ?? 140));
const spring = $derived((props.spring as DockSpring) ?? "gentle");

const items = [
	{
		id: "home",
		label: "Home",
		d: "M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1z",
	},
	{
		id: "search",
		label: "Search",
		d: "M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12zm4.5-1.5L17 17",
	},
	{
		id: "files",
		label: "Files",
		d: "M3 6a1 1 0 0 1 1-1h3.6l1.4 2H16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
	},
	{
		id: "settings",
		label: "Settings",
		d: "M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 2v2M10 16v2M2 10h2M16 10h2",
	},
];

let active = $state("home");
</script>

<Dock {size} {magnification} {distance} {spring}>
	{#each items as item (item.id)}
		<DockItem
			active={active === item.id}
			onclick={() => (active = item.id)}
			aria-label={item.label}
			class="hover:bg-foreground/[0.06]"
		>
			<svg
				viewBox="0 0 20 20"
				fill="none"
				aria-hidden="true"
				class="size-[45%] text-foreground/80"
			>
				<path
					d={item.d}
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</DockItem>
	{/each}
	<DockSeparator />
	<DockItem aria-label="Profile" class="hover:bg-foreground/[0.06]">
		<span
			class="grid size-[55%] place-items-center rounded-full bg-primary/15 font-medium text-[0.7em] text-foreground"
		>
			KK
		</span>
	</DockItem>
</Dock>
