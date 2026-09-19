<script lang="ts">
import { page } from "$app/state";
import type { SidebarGroup } from "$lib/registry";

let { groups }: { groups: SidebarGroup[] } = $props();

const GUIDES = [{ href: "/docs", name: "Getting started" }];

function linkClass(active: boolean) {
	return [
		"relative block rounded-lg px-3 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
		active
			? "bg-foreground/[0.06] font-medium text-foreground"
			: "text-muted-foreground hover:text-foreground",
	];
}
</script>

<aside aria-label="Site navigation">
	<nav class="flex flex-col gap-8">
		<div>
			<p
				class="mb-2 block px-3 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider"
			>
				Guides
			</p>
			{#each GUIDES as item (item.href)}
				<a href={item.href} class={linkClass(page.url.pathname === item.href)}>
					{item.name}
				</a>
			{/each}
		</div>

		{#each groups as group (group.category)}
			<div>
				<p
					class="mb-2 flex items-center gap-2 px-3 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider"
				>
					{group.label}
					<span
						class="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground/[0.06] px-1 font-medium text-[10px] text-muted-foreground tabular-nums"
					>
						{group.items.length}
					</span>
				</p>
				{#each group.items as item (item.slug)}
					<a href={item.href} class={linkClass(page.url.pathname === item.href)}>
						<span class="flex items-center justify-between gap-2">
							<span class="truncate">{item.name}</span>
							{#if item.status !== "stable"}
								<span
									class="rounded border border-border px-1 py-px text-[10px] text-muted-foreground"
								>
									{item.status}
								</span>
							{/if}
						</span>
					</a>
				{/each}
			</div>
		{/each}
	</nav>
</aside>
