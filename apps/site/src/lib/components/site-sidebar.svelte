<script lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/svelte";
import { page } from "$app/state";
import type { SidebarGroup } from "$lib/registry";

let { groups, onNavigate }: { groups: SidebarGroup[]; onNavigate?: () => void } =
	$props();

const GUIDES = [
	{ href: "/docs", name: "Introduction" },
	{ href: "/docs/installation", name: "Installation" },
	{ href: "/docs/theming", name: "Theming" },
	{ href: "/docs/changelog", name: "Changelog" },
];

let open = $state<Record<string, boolean>>({});
let root = $state<HTMLElement>();

// The rail is one border on the list; each row overlaps it so the active mark sits on it.
function linkClass(active: boolean) {
	return [
		"-ml-px relative block border-l py-1.5 pl-4 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
		active
			? "border-foreground font-medium text-foreground"
			: "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground",
	];
}

const sectionTrigger =
	"mb-2 w-full justify-start gap-1.5 px-3 py-0 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider hover:text-foreground";

// Keeps the active link in view regardless of which ancestor actually scrolls (the fixed
// desktop rail or the mobile drawer's own scroll container) — scrollIntoView walks up to it.
$effect(() => {
	page.url.pathname;
	root?.querySelector('a[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
});
</script>

<aside aria-label="Site navigation" bind:this={root}>
	<nav class="flex flex-col gap-5">
		<Collapsible
			bind:open={() => (open.guides ?? true), (v) => (open.guides = v)}
			class="w-full"
		>
			<CollapsibleTrigger class={sectionTrigger}>Getting Started</CollapsibleTrigger>
			<CollapsibleContent class="px-0 pb-0 duration-300">
				<div class="ml-3 border-border border-l">
					{#each GUIDES as item (item.href)}
						{const active = page.url.pathname === item.href}
						<a
							href={item.href}
							onclick={onNavigate}
							aria-current={active ? "page" : undefined}
							class={linkClass(active)}
						>
							{item.name}
						</a>
					{/each}
				</div>
			</CollapsibleContent>
		</Collapsible>

		{#each groups as group (group.category)}
			<Collapsible
				bind:open={
					() => (open[group.category] ?? true), (v) => (open[group.category] = v)
				}
				class="w-full"
			>
				<CollapsibleTrigger class={sectionTrigger}>
					{group.label}
					<span
						class="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground/[0.06] px-1 font-medium text-[10px] text-muted-foreground tabular-nums"
					>
						{group.items.length}
					</span>
				</CollapsibleTrigger>
				<CollapsibleContent class="px-0 pb-0 duration-300">
					<div class="ml-3 border-border border-l">
						{#each group.items as item (item.slug)}
							{const active = page.url.pathname === item.href}
							<a
								href={item.href}
								onclick={onNavigate}
								aria-current={active ? "page" : undefined}
								class={linkClass(active)}
							>
								<span class="flex items-center justify-between gap-2 pr-3">
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
				</CollapsibleContent>
			</Collapsible>
		{/each}
	</nav>
</aside>
