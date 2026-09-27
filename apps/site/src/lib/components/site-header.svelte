<script lang="ts">
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	ThemeToggle,
	type ThemeToggleValue,
} from "@baby-ui/svelte";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconMenu2 from "@tabler/icons-svelte/icons/menu-2";
import IconSettings from "@tabler/icons-svelte/icons/settings";
import { mode, setMode } from "mode-watcher";
import { page } from "$app/state";
import Logo from "$lib/components/logo.svelte";
import SidebarToggleIcon from "$lib/components/sidebar-toggle-icon.svelte";
import SiteSearch from "$lib/components/site-search.svelte";
import { docsSidebar } from "$lib/docs-sidebar.svelte";
import { mobileNav } from "$lib/mobile-nav.svelte";
import { prefs } from "$lib/preferences.svelte";
import { COLLECTIONS, categoryHref, siteNav, TOP_LEVEL } from "$lib/registry";

const NAV = $derived(siteNav(page.data.categories ?? []));

// The header's own hamburger only opens something on routes that render a SiteSidebar.
const SIDEBAR_ROUTES = [
	"/components",
	...TOP_LEVEL.map(categoryHref),
	...Object.keys(COLLECTIONS).map((id) => `/${id}`),
	"/docs",
];
const hasSidebar = $derived(
	SIDEBAR_ROUTES.some((route) => page.url.pathname.startsWith(route)),
);

// Set the class in the same tick as mode-watcher: the reveal snapshots the DOM when this returns.
function pickMode(next: ThemeToggleValue) {
	document.documentElement.classList.toggle("dark", next === "dark");
	setMode(next);
}

let scrolled = $state(false);

$effect(() => {
	const onScroll = () => (scrolled = window.scrollY > 8);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
	return () => window.removeEventListener("scroll", onScroll);
});

function active(match: string[]) {
	const path = page.url.pathname;
	return match.some((m) => path === m || path.startsWith(`${m}/`));
}
</script>

<header
	class={[
		"fixed inset-x-0 top-0 z-40",
		// The blur layer is always composited; scrolling only fades its opacity.
		"before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-border before:border-b before:bg-background/70 before:backdrop-blur-xl before:backdrop-saturate-150",
		"before:transition-opacity before:duration-[var(--duration-dropdown)] before:ease-[var(--ease-out)] motion-reduce:before:transition-none",
		scrolled ? "before:opacity-100" : "before:opacity-0",
	]}
>
	<div class="relative flex h-14 w-full items-center justify-between gap-4 px-4 md:px-6 xl:px-8">
		<div class="flex items-center gap-3">
			{#if hasSidebar}
				<button
					type="button"
					onclick={() => (mobileNav.open = true)}
					aria-label="Open navigation"
					class="grid size-9 shrink-0 place-items-center rounded-2xl border border-border bg-card/20 text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground md:hidden"
				>
					<IconMenu2 size={17} stroke={1.6} />
				</button>
				<button
					type="button"
					onclick={() => (docsSidebar.current = !docsSidebar.current)}
					aria-expanded={docsSidebar.current}
					aria-controls="docs-sidebar"
					aria-label={docsSidebar.current ? "Close navigation" : "Open navigation"}
					class="hidden size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid"
				>
					<SidebarToggleIcon open={docsSidebar.current} class="size-[18px]" />
				</button>
			{/if}
			<a
				href="/"
				class="group flex items-center gap-2.5 font-semibold text-foreground text-sm tracking-tight"
			>
				<Logo class="size-6 text-foreground" />
				<span class="font-semibold font-display whitespace-nowrap">Baby UI</span>
			</a>

			<NavigationMenu aria-label="Main" class="hidden md:flex">
				<NavigationMenuList>
					{#each NAV as item (item.href)}
						{@const current = active(item.match)}
						{#if item.menu}
							<NavigationMenuItem value={item.href}>
								<NavigationMenuTrigger
									aria-current={current ? "page" : undefined}
									class="px-1.5 lg:px-3"
								>
									{item.label}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<div class="grid w-max grid-cols-[repeat(2,minmax(9rem,auto))] gap-x-2 gap-y-3">
										{#each item.menu as group, i (group.heading ?? i)}
											<div class="flex flex-col gap-0.5">
												{#if group.heading}
													<p class="px-3 pt-1 pb-0.5 font-medium text-muted-foreground text-xs">
														{group.heading}
													</p>
												{/if}
												{#each group.links as link (link.href)}
													<NavigationMenuLink href={link.href} active={page.url.pathname === link.href}>
														{link.label}
													</NavigationMenuLink>
												{/each}
											</div>
										{/each}
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
						{:else}
							<NavigationMenuItem>
								<NavigationMenuLink
									href={item.href}
									active={current}
									class={navigationMenuTriggerStyle({ class: "px-1.5 lg:px-3" })}
								>
									{item.label}
								</NavigationMenuLink>
							</NavigationMenuItem>
						{/if}
					{/each}
				</NavigationMenuList>
			</NavigationMenu>
		</div>

		<nav aria-label="Site tools" class="flex items-center gap-2">
			<SiteSearch />

			<ThemeToggle
				theme={mode.current === "dark" ? "dark" : "light"}
				onThemeChange={pickMode}
				variant="rectangle"
				start="bottom-up"
				class="size-9 rounded-xl text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
				iconClass="size-4"
			/>

			<button
				type="button"
				onclick={() => (prefs.open = true)}
				aria-label="Settings"
				class="gear flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
			>
				<IconSettings size={17} stroke={1.6} />
			</button>

			<a
				href="https://github.com/kanakkholwal/baby-ui"
				rel="noreferrer noopener"
				target="_blank"
				class="hidden h-9 items-center gap-1.5 rounded-2xl border border-border bg-card/20 px-3 font-medium text-foreground text-xs transition-colors hover:border-border-strong sm:inline-flex"
			>
				<IconBrandGithub size={15} stroke={1.6} />
				GitHub
			</a>

		</nav>
	</div>
</header>

<style>
	.gear :global(svg) {
		transition: transform var(--duration-dropdown) var(--ease-out);
	}

	@media (hover: hover) and (pointer: fine) {
		.gear:hover :global(svg) {
			transform: rotate(90deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gear :global(svg) {
			transition: none;
		}
	}
</style>
