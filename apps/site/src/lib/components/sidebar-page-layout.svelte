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

const nav = siteNav();
// Split gives a component page's preview half the content area; other pages keep the rail.
const split = $derived(prefs.layout === "split" && Boolean(page.params.slug));
const outline = $derived(outlineSidebar.current);
// Transitions start after mount, so a stored "closed" doesn't animate on load.
let ready = $state(false);
$effect(() => {
	requestAnimationFrame(() => (ready = true));
});

// FLIP: the column snaps in one layout, then the content slides from where it was. Animating the
// width itself relaid out every chart and canvas on each frame.
let grid = $state<HTMLElement>();
let lefts = new Map<Element, number>();
let was = { docs: docsSidebar.current, outline: outlineSidebar.current };
$effect.pre(() => {
	void docsSidebar.current;
	void outlineSidebar.current;
	if (!grid) return;
	lefts = new Map(
		[...grid.children].slice(1).map((el) => [el, el.getBoundingClientRect().left]),
	);
});
$effect(() => {
	const now = { docs: docsSidebar.current, outline: outlineSidebar.current };
	const opening = (now.docs && !was.docs) || (now.outline && !was.outline);
	was = now;
	if (
		!grid ||
		!untrack(() => ready) ||
		matchMedia("(prefers-reduced-motion: reduce)").matches
	)
		return;
	const css = getComputedStyle(grid);
	const duration = Number.parseFloat(
		css.getPropertyValue(opening ? "--duration-drawer" : "--duration-overlay"),
	);
	const easing = css.getPropertyValue("--ease-drawer").trim() || "ease-out";
	for (const [el, left] of lefts) {
		const dx = left - el.getBoundingClientRect().left;
		if (Math.abs(dx) > 0.5)
			el.animate([{ translate: `${dx}px 0` }, { translate: "0 0" }], {
				duration,
				easing,
			});
	}
});

function active(match: string) {
	if (match === "/components") return page.url.pathname === "/components";
	return page.url.pathname.startsWith(match);
}
</script>

<!-- The header's toggle drives docsSidebar; closed collapses the column and slides the panel out. -->
<div
	bind:this={grid}
	data-ready={ready || undefined}
	class={[
		"grid min-w-0 grid-cols-[minmax(0,1fr)] px-4 [--right-sidebar-width:20rem] md:gap-4 md:px-6 xl:gap-8 xl:px-8",
		// Literal columns, not an inherited variable: toggling one would restyle the whole page.
		docsSidebar.current ? "md:grid-cols-[15rem_minmax(0,1fr)]" : "md:grid-cols-[0rem_minmax(0,1fr)]",
		{
			"xl:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)]": docsSidebar.current && split,
			"xl:grid-cols-[0rem_minmax(0,1fr)_minmax(0,1fr)]": !docsSidebar.current && split,
			"xl:grid-cols-[15rem_minmax(0,1fr)_20rem]": docsSidebar.current && !split && outline,
			"xl:grid-cols-[0rem_minmax(0,1fr)_20rem]": !docsSidebar.current && !split && outline,
			"xl:grid-cols-[15rem_minmax(0,1fr)_0rem]": docsSidebar.current && !split && !outline,
			"xl:grid-cols-[0rem_minmax(0,1fr)_0rem]": !docsSidebar.current && !split && !outline,
		},
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
				docsSidebar.current
					? "translate-x-0 duration-[var(--duration-drawer)]"
					: "-translate-x-[17rem] duration-[var(--duration-overlay)]",
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
				{#each nav as item (item.href)}
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
