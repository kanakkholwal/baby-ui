<script lang="ts">
import { page } from "$app/state";

type NavItem = { href: string; name: string; status?: string };

let { items, onNavigate }: { items: NavItem[]; onNavigate?: () => void } = $props();

let hoveredIndex = $state<number | null>(null);
let hoverRect = $state<{ top: number; height: number } | null>(null);
let list = $state<HTMLDivElement>();

function onEnter(event: PointerEvent, index: number) {
	if (!list) return;
	const el = event.currentTarget as HTMLElement;
	const elRect = el.getBoundingClientRect();
	const listRect = list.getBoundingClientRect();
	hoveredIndex = index;
	hoverRect = { top: elRect.top - listRect.top, height: elRect.height };
}
</script>

<!-- One tick per row, not the reference's four-segment hatch: that reads fine across its own
     ~10-item nav, but across our 50+-item categories four lines per row turns into a wall
     of static noise. The tick still does the same job: grows on hover, yields to a solid
     bar when active. -->
<div
	bind:this={list}
	role="presentation"
	class="relative"
	onpointerleave={() => (hoveredIndex = null)}
>
	{#if hoverRect}
		<div
			aria-hidden="true"
			style:transform="translateY({hoverRect.top}px)"
			style:height="{hoverRect.height}px"
			class="pointer-events-none absolute inset-x-0 rounded-md bg-foreground/[0.06] transition-[transform,height] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
		></div>
	{/if}
	{#each items as item, index (item.href)}
		{@const active = page.url.pathname === item.href}
		{@const hovered = hoveredIndex === index}
		<div class="relative">
			<span
				aria-hidden="true"
				style:width="{active ? 20 : hovered ? 16 : 10}px"
				class={[
					"pointer-events-none absolute top-1/2 left-1 h-px -translate-y-1/2 transition-[width,background-color] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
					active ? "bg-foreground" : "bg-foreground/35",
				]}
			></span>

			<a
				href={item.href}
				onclick={onNavigate}
				onpointerenter={(e) => onEnter(e, index)}
				aria-current={active ? "page" : undefined}
				class={[
					"relative z-[1] flex items-center justify-between gap-2 py-1.5 pr-3 pl-7 text-sm outline-none transition-[color,opacity] duration-150 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none",
					active ? "font-medium text-foreground" : "text-foreground/70 hover:text-foreground",
					hoveredIndex !== null && !hovered && !active ? "opacity-60" : "",
				]}
			>
				<span class="truncate">{item.name}</span>
				{#if item.status && item.status !== "stable"}
					<span class="rounded border border-border px-1 py-px text-[10px] text-muted-foreground">
						{item.status}
					</span>
				{/if}
			</a>
		</div>
	{/each}
</div>
