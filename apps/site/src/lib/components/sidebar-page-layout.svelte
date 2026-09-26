<script lang="ts">
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@baby-ui/svelte";
import type { Snippet } from "svelte";
import { page } from "$app/state";
import { docsSidebar } from "$lib/docs-sidebar.svelte";
import { mobileNav } from "$lib/mobile-nav.svelte";
import { prefs } from "$lib/preferences.svelte";
import { type SidebarGroup, siteNav } from "$lib/registry";
import SiteSidebar from "./site-sidebar.svelte";

let { groups, children }: { groups: SidebarGroup[]; children: Snippet } = $props();

const nav = siteNav();
// Split gives a component page's preview half the content area; other pages keep the rail.
const split = $derived(prefs.layout === "split" && Boolean(page.params.slug));
// Transitions start after mount, so a stored "closed" doesn't animate on load.
let ready = $state(false);
$effect(() => {
	requestAnimationFrame(() => (ready = true));
});

function active(match: string) {
	if (match === "/components") return page.url.pathname === "/components";
	return page.url.pathname.startsWith(match);
}
</script>

<!-- The header's toggle drives docsSidebar; closed collapses the column and slides the panel out. -->
<div
	data-ready={ready || undefined}
	class={[
		"grid min-w-0 grid-cols-[minmax(0,1fr)] px-4 [--right-sidebar-width:20rem] md:grid-cols-[var(--left-sidebar-width)_minmax(0,1fr)] md:gap-4 md:px-6 xl:grid-cols-[var(--left-sidebar-width)_minmax(0,1fr)_var(--right-sidebar-width)] xl:gap-8 xl:px-8",
		"data-[ready]:transition-[--left-sidebar-width] data-[ready]:duration-[380ms] data-[ready]:ease-[var(--ease-out)] motion-reduce:transition-none",
		docsSidebar.current ? "[--left-sidebar-width:15rem]" : "[--left-sidebar-width:0rem]",
		split && "xl:[--right-sidebar-width:minmax(0,1fr)]",
	]}
>
	<div class="hidden min-w-0 md:block">
		<div
			id="docs-sidebar"
			inert={!docsSidebar.current}
			class="docs-sidebar-panel scrollbar-hide fixed top-14 bottom-0 w-60 overflow-y-auto bg-background py-6 pr-4"
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
