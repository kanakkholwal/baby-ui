<script lang="ts">
import {
	Badge,
	Swappable,
	SwappableHandle,
	SwappableItem,
	SwappableSlot,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import {
	DASHBOARD_SLOTS,
	KANBAN_CARDS,
	KANBAN_COLUMNS,
	KANBAN_MAP,
	LIST_ITEMS,
	SALES,
	type SlotMap,
	TODOS,
} from "../data/swappable";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Swappable>>(props));

const shared = $derived({
	variant: p.variant ?? "card",
	animation: p.animation ?? "dynamic",
	swapMode: p.swapMode ?? "hover",
	enabled: p.enabled ?? true,
	dragOnHold: p.dragOnHold ?? false,
});

const DASHBOARD_CARDS = ["date", "todos", "sales", "subscribers"];
const now = new Date();

let kanban = $state<SlotMap>(KANBAN_MAP);
let list = $state<SlotMap>(
	LIST_ITEMS.map((entry, i) => ({ slot: String(i), item: entry.id })),
);
</script>

{#snippet dashboardCard(id: string)}
	{#if id === "date"}
		<div class="flex h-full flex-col justify-between p-4">
			<div class="flex justify-between text-muted-foreground text-xs">
				<span>{now.toLocaleString("en", { month: "long" })}</span>
				<span>{now.getFullYear()}</span>
			</div>
			<span class="text-center font-light text-5xl text-primary">{now.getDate()}</span>
		</div>
	{:else if id === "todos"}
		<div class="flex h-full flex-col gap-2 p-4">
			<span class="text-muted-foreground text-xs">My todos</span>
			{#each TODOS as todo (todo)}
				<span class="flex items-center gap-2 text-sm">
					<svg viewBox="0 0 16 16" class="size-4 shrink-0 text-primary" aria-hidden="true">
						<circle cx="8" cy="8" r="7" fill="currentColor" />
						<path d="m5 8.2 2 2 4-4.4" fill="none" stroke="var(--primary-foreground)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					{todo}
				</span>
			{/each}
		</div>
	{:else if id === "sales"}
		<div class="relative flex h-full flex-col overflow-hidden p-4">
			<span class="text-muted-foreground text-xs">Sales</span>
			<svg viewBox="0 0 300 80" preserveAspectRatio="none" class="absolute inset-x-0 bottom-0 h-3/5 w-full text-primary" aria-hidden="true">
				<path d={SALES} fill="currentColor" fill-opacity="0.12" />
				<path d={SALES.replace(/ L300 80 L0 80 Z$/, "")} fill="none" stroke="currentColor" stroke-width="2.5" />
			</svg>
		</div>
	{:else}
		<div class="flex h-full flex-col justify-end gap-1 p-4">
			<span class="text-muted-foreground text-xs">New subscribers</span>
			<span class="font-semibold text-4xl text-primary tabular-nums">700+</span>
		</div>
	{/if}
{/snippet}

{#if props.layout === "kanban"}
	<!-- Rendered from data: `manualSwap`, and each swap hands back the slot map to render from. -->
	<Swappable
		{...shared}
		manualSwap
		onSwap={(e) => (kanban = e.newSlotItemMap.asArray)}
		class="grid w-full max-w-3xl gap-3 sm:grid-cols-3"
	>
		{#each KANBAN_COLUMNS as column (column.id)}
			{@const slots = kanban.filter((entry) => entry.slot.startsWith(`${column.id}-`))}
			<section aria-label={column.label} class="flex flex-col gap-2 rounded-2xl border border-border p-2">
				<header class="flex items-center justify-between px-1.5 pt-0.5 font-medium text-sm">
					{column.label}
					<span class="text-muted-foreground text-xs tabular-nums">
						{slots.filter((entry) => entry.item).length}
					</span>
				</header>
				{#each slots as { slot, item } (slot)}
					{@const card = KANBAN_CARDS.find((c) => c.id === item)}
					<SwappableSlot id={slot} class={card ? "min-h-20" : "min-h-20 border border-border border-dashed"}>
						{#if card}
							{#key card.id}
								<SwappableItem id={card.id} class="flex flex-col gap-2 p-3">
									<span class="font-medium text-sm">{card.title}</span>
									<Badge size="sm" variant="secondary" class="w-fit">{card.tag}</Badge>
								</SwappableItem>
							{/key}
						{/if}
					</SwappableSlot>
				{/each}
			</section>
		{/each}
	</Swappable>
{:else if props.layout === "list"}
	<!-- Handles only: the rows stay selectable and drag along one axis. -->
	<Swappable
		{...shared}
		manualSwap
		dragAxis="y"
		onSwap={(e) => (list = e.newSlotItemMap.asArray)}
		class="flex w-full max-w-sm flex-col gap-2"
	>
		{#each list as { slot, item } (slot)}
			{@const row = LIST_ITEMS.find((entry) => entry.id === item)}
			<SwappableSlot id={slot}>
				{#if row}
					{#key row.id}
						<SwappableItem id={row.id} class="flex items-center gap-2 px-2 py-2.5 text-sm">
							<SwappableHandle class="size-6" />
							{row.label}
						</SwappableItem>
					{/key}
				{/if}
			</SwappableSlot>
		{/each}
	</Swappable>
{:else}
	<!-- Static content: Swapy moves the DOM itself, so nothing here needs to re-render. -->
	<Swappable {...shared} class="grid w-full max-w-2xl gap-3 sm:auto-rows-[9rem] sm:grid-cols-3">
		{#each DASHBOARD_SLOTS as slot, i (slot.id)}
			<SwappableSlot id={slot.id} class={slot.span}>
				<SwappableItem id={DASHBOARD_CARDS[i] ?? slot.id}>
					{@render dashboardCard(DASHBOARD_CARDS[i] ?? "")}
				</SwappableItem>
			</SwappableSlot>
		{/each}
	</Swappable>
{/if}
