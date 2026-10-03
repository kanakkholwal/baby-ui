<script lang="ts">
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@baby-ui/svelte";
import { type Snippet, untrack } from "svelte";
import { docsSidebar, outlineSidebar } from "#lib/docs-sidebar.svelte.js";
import { mobileNav } from "#lib/mobile-nav.svelte.js";
import { prefs } from "#lib/preferences.svelte.js";
import { type SidebarGroup, siteNav } from "#lib/registry.js";
import { page } from "$app/state";
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
// Split and playground float the rail over a component page so its preview gets the width.
const componentPage = $derived(page.route.id === "/components/[category]/[slug]");
const split = $derived(prefs.layout === "split" && componentPage);
const playground = $derived(prefs.layout === "playground" && componentPage);
const floating = $derived(split || playground);
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
// The right column resizes in the same frames the rail slides, from resolved px tracks to px
// tracks; snapping it made the content width jump.
$effect(() => {
	const right = outlineSidebar.current ? "open" : "closed";
	const root = document.documentElement.dataset;
	if (root.rightRail === right && root.rightCol === right) return;
	const before = grid ? getComputedStyle(grid).gridTemplateColumns : "";
	root.rightRail = right;
	root.rightCol = right;
	if (!grid || !untrack(() => ready) || reduced()) return;
	const after = getComputedStyle(grid).gridTemplateColumns;
	if (before === after) return;
	const css = getComputedStyle(grid);
	grid.animate([{ gridTemplateColumns: before }, { gridTemplateColumns: after }], {
		duration: Number.parseFloat(
			css.getPropertyValue(right === "open" ? "--duration-drawer" : "--duration-overlay"),
		),
		easing: css.getPropertyValue("--ease-drawer").trim() || "ease-out",
	});
});

// Floating over the page, the rail closes like a popover: a press outside it, or Escape.
$effect(() => {
	if (!floating || !docsSidebar.current) return;
	const xl = matchMedia("(min-width: 1280px)");
	const onPointer = (event: PointerEvent) => {
		const inside =
			event.target instanceof Element &&
			event.target.closest('#docs-sidebar, [aria-controls="docs-sidebar"]');
		if (xl.matches && !inside) docsSidebar.current = false;
	};
	const onKey = (event: KeyboardEvent) => {
		if (xl.matches && event.key === "Escape" && !event.defaultPrevented) {
			docsSidebar.current = false;
		}
	};
	document.addEventListener("pointerdown", onPointer);
	document.addEventListener("keydown", onKey);
	return () => {
		document.removeEventListener("pointerdown", onPointer);
		document.removeEventListener("keydown", onKey);
	};
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
			? // The rail floats over the page in split, so the two halves get the full width.
				"xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]!"
			: playground
				? "xl:grid-cols-[minmax(0,1fr)]!"
				: // The right column is closed unless opened, so prerendered HTML matches the default.
				"xl:grid-cols-[15rem_minmax(0,1fr)_0rem] xl:[[data-left-rail=closed]_&]:grid-cols-[0rem_minmax(0,1fr)_0rem] xl:[[data-right-col=open]_&]:grid-cols-[15rem_minmax(0,1fr)_20rem] xl:[[data-left-rail=closed][data-right-col=open]_&]:grid-cols-[0rem_minmax(0,1fr)_20rem]",
	]}
>
	<!-- Floating, the wrapper drops out of the grid; its fixed panel overlays the page instead. -->
	<div class={["hidden min-w-0 md:block", floating && "xl:contents"]}>
		<!-- Closed: 15rem panel plus the widest page gutter, so it clears the viewport edge. -->
		<div
			id="docs-sidebar"
			inert={!docsSidebar.current}
			class={[
				"scrollbar-hide fixed top-(--header-h) bottom-0 w-60 overflow-y-auto bg-background py-6 pr-4",
				"ease-[var(--ease-drawer)] in-data-[ready]:transition-[translate] motion-reduce:transition-none",
				"translate-x-0 duration-[var(--duration-drawer)] [[data-left-rail=closed]_&]:-translate-x-[17rem] [[data-left-rail=closed]_&]:duration-[var(--duration-overlay)]",
				floating && [
					"xl:left-0 xl:z-30 xl:w-80 xl:bg-background/70 xl:pr-16 xl:pl-8 xl:backdrop-blur-xl",
					// Fades into the page on the right and at the bottom, so the overlay has no hard edge.
					"xl:[mask-composite:intersect] xl:[mask-image:linear-gradient(to_right,black_70%,transparent),linear-gradient(to_bottom,black_88%,transparent)]",
					"xl:[[data-left-rail=closed]_&]:-translate-x-full",
				],
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
