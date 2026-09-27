<script lang="ts">
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@baby-ui/svelte";
import { type Snippet, untrack } from "svelte";
import { page } from "$app/state";
import { docsSidebar, outlineSidebar } from "$lib/docs-sidebar.svelte";
import { mobileNav } from "$lib/mobile-nav.svelte";
import { prefs } from "$lib/preferences.svelte";
import { type SidebarGroup, siteNav } from "$lib/registry";
import SiteSidebar from "./site-sidebar.svelte";

let { groups, children }: { groups: SidebarGroup[]; children: Snippet } = $props();

const nav = $derived(siteNav(page.data.categories ?? []));
// The top row, then the four areas the library leads with, so both are one tap away on phones.
const drawerLinks = $derived([
	...nav.map(({ href, label, match }) => ({ href, label, match })),
	...nav
		.flatMap((item) => item.menu ?? [])
		.filter((link) => link.featured)
		.map(({ href, label }) => ({ href, label, match: [href] })),
]);
// Split gives a component page's preview half the content area; other pages keep the rail.
const split = $derived(prefs.layout === "split" && Boolean(page.params.slug));
// Transitions start after mount, so a stored "closed" doesn't animate on load.
let ready = $state(false);
$effect(() => {
	requestAnimationFrame(() => (ready = true));
});

// Columns and panels key off <html> attributes set from the persisted state while the boot screen
// still covers the page; toggling an attribute restyles only the grid, not the whole subtree.
let grid = $state<HTMLElement>();
$effect(() => {
	const left = docsSidebar.current ? "open" : "closed";
	const root = document.documentElement.dataset;
	if (root.leftRail === left) return;
	const main = grid?.children[1];
	const before = main?.getBoundingClientRect().left;
	root.leftRail = left;
	if (!main || before === undefined || !untrack(() => ready) || reduced()) return;
	// FLIP the content only: a transform on an aside would re-anchor its fixed rail.
	const dx = before - main.getBoundingClientRect().left;
	const css = getComputedStyle(main);
	main.animate([{ translate: `${dx}px 0` }, { translate: "0 0" }], {
		duration: Number.parseFloat(
			css.getPropertyValue(left === "open" ? "--duration-drawer" : "--duration-overlay"),
		),
		easing: css.getPropertyValue("--ease-drawer").trim() || "ease-out",
	});
});
// The column snaps; only the rail panel slides (OUTLINE_PANEL). Animating grid tracks
// re-laid out the whole page every frame, and main's left edge never moves anyway.
$effect(() => {
	const right = outlineSidebar.current ? "open" : "closed";
	const root = document.documentElement.dataset;
	root.rightRail = right;
	root.rightCol = right;
});

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function active(match: string[]) {
	const path = page.url.pathname;
	return match.some((m) => path === m || path.startsWith(`${m}/`));
}
</script>

<!-- The header's toggle drives docsSidebar; closed collapses the column and slides the panel out. -->
<div
	bind:this={grid}
	data-ready={ready || undefined}
	class={[
		"grid min-w-0 grid-cols-[minmax(0,1fr)] px-4 [--right-sidebar-width:20rem] md:gap-4 md:px-6 xl:gap-8 xl:px-8",
		"md:grid-cols-[15rem_minmax(0,1fr)] md:[[data-left-rail=closed]_&]:grid-cols-[0rem_minmax(0,1fr)]",
		split
			? "xl:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)]! xl:[[data-left-rail=closed]_&]:grid-cols-[0rem_minmax(0,1fr)_minmax(0,1fr)]!"
			: // The right column is closed unless opened, so prerendered HTML matches the default.
				"xl:grid-cols-[15rem_minmax(0,1fr)_0rem] xl:[[data-left-rail=closed]_&]:grid-cols-[0rem_minmax(0,1fr)_0rem] xl:[[data-right-col=open]_&]:grid-cols-[15rem_minmax(0,1fr)_20rem] xl:[[data-left-rail=closed][data-right-col=open]_&]:grid-cols-[0rem_minmax(0,1fr)_20rem]",
	]}
>
	<div class="hidden min-w-0 md:block">
		<!-- Closed: 15rem panel plus the widest page gutter, so it clears the viewport edge. -->
		<div
			id="docs-sidebar"
			inert={!docsSidebar.current}
			class={[
				"scrollbar-hide fixed top-14 bottom-0 w-60 overflow-y-auto bg-background py-6 pr-4",
				"ease-[var(--ease-drawer)] in-data-[ready]:transition-[translate] motion-reduce:transition-none",
				"translate-x-0 duration-[var(--duration-drawer)] [[data-left-rail=closed]_&]:-translate-x-[17rem] [[data-left-rail=closed]_&]:duration-[var(--duration-overlay)]",
			]}
		>
			<SiteSidebar {groups} connector="curve" rungs />
		</div>
	</div>
	{@render children()}
</div>

<Drawer bind:open={mobileNav.open}>
	<DrawerContent>
		<DrawerHeader>
			<DrawerTitle class="text-base">Menu</DrawerTitle>
		</DrawerHeader>
		<div class="scrollbar-hide mt-2 flex max-h-[70dvh] flex-col gap-5 overflow-y-auto px-1 pb-2">
			<nav class="flex flex-wrap gap-1">
				{#each drawerLinks as item (item.href)}
					<a
						href={item.href}
						onclick={() => (mobileNav.open = false)}
						class={[
							"rounded-md px-3 py-1.5 text-sm transition-colors",
							active(item.match)
								? "font-medium text-foreground"
								: "text-foreground/70 hover:text-foreground",
						]}
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<SiteSidebar {groups} connector="curve" rungs onNavigate={() => (mobileNav.open = false)} />
		</div>
	</DrawerContent>
</Drawer>
