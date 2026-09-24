<script lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/svelte";
import { page } from "$app/state";
import type { SidebarGroup } from "$lib/registry";
import SidebarNavList from "./sidebar-nav-list.svelte";

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

// pl-1.5 (not px-3): the chevron (14px) + gap-2 (8px) from CollapsibleTrigger's own
// base classes already eats 22px, so 6px here lines the label up with item rows' pl-7.
const sectionTrigger =
	"mb-2 w-full justify-start gap-1.5 pl-1.5 pr-3 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider hover:text-foreground";

// Whichever ancestor actually scrolls: the fixed desktop rail and the mobile drawer both
// wrap this component differently, so find the real scroll container instead of assuming one.
function scrollParent(el: HTMLElement): HTMLElement | null {
	let node = el.parentElement;
	while (node) {
		const style = getComputedStyle(node);
		if (
			(style.overflowY === "auto" || style.overflowY === "scroll") &&
			node.scrollHeight > node.clientHeight
		) {
			return node;
		}
		node = node.parentElement;
	}
	return null;
}

// Centers the active link in its scroll container instead of just nudging it into view,
// and only when it's meaningfully off-center, so an already-visible link doesn't jump.
$effect(() => {
	page.url.pathname;
	const active = root?.querySelector<HTMLElement>('a[aria-current="page"]');
	if (!active) return;
	requestAnimationFrame(() => {
		const viewport = scrollParent(active);
		if (!viewport) {
			active.scrollIntoView({ block: "nearest" });
			return;
		}
		const viewportRect = viewport.getBoundingClientRect();
		const activeRect = active.getBoundingClientRect();
		const offset =
			activeRect.top - viewportRect.top - viewportRect.height / 2 + activeRect.height / 2;
		if (Math.abs(offset) > 40) viewport.scrollBy({ top: offset, behavior: "smooth" });
	});
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
				<SidebarNavList items={GUIDES} {onNavigate} />
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
					<SidebarNavList items={group.items} {onNavigate} />
				</CollapsibleContent>
			</Collapsible>
		{/each}
	</nav>
</aside>
