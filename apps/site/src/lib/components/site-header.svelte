<script lang="ts">
import {
	MegaMenu,
	type MegaMenuGroup,
	type MegaMenuItem,
	ThemeToggle,
	type ThemeToggleValue,
} from "@baby-ui/svelte";
import IconBackground from "@tabler/icons-svelte/icons/background";
import IconBook from "@tabler/icons-svelte/icons/book";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconChartBar from "@tabler/icons-svelte/icons/chart-bar";
import IconComponents from "@tabler/icons-svelte/icons/components";
import IconFileText from "@tabler/icons-svelte/icons/file-text";
import IconForms from "@tabler/icons-svelte/icons/forms";
import IconLayoutGrid from "@tabler/icons-svelte/icons/layout-grid";
import IconMail from "@tabler/icons-svelte/icons/mail";
import IconMenu2 from "@tabler/icons-svelte/icons/menu-2";
import IconPalette from "@tabler/icons-svelte/icons/palette";
import IconPhoto from "@tabler/icons-svelte/icons/photo";
import IconRobot from "@tabler/icons-svelte/icons/robot";
import IconSettings from "@tabler/icons-svelte/icons/settings";
import IconSparkles from "@tabler/icons-svelte/icons/sparkles";
import IconStack2 from "@tabler/icons-svelte/icons/stack-2";
import IconTable from "@tabler/icons-svelte/icons/table";
import IconTerminal2 from "@tabler/icons-svelte/icons/terminal-2";
import IconTypography from "@tabler/icons-svelte/icons/typography";
import { mode, setMode } from "mode-watcher";
import { page } from "$app/state";
import Logo from "$lib/components/logo.svelte";
import SidebarToggleIcon from "$lib/components/sidebar-toggle-icon.svelte";
import SiteSearch from "$lib/components/site-search.svelte";
import { docsSidebar } from "$lib/docs-sidebar.svelte";
import { mobileNav } from "$lib/mobile-nav.svelte";
import { prefs } from "$lib/preferences.svelte";
import {
	COLLECTIONS,
	categoryHref,
	type NavIcon,
	siteNav,
	TOP_LEVEL,
} from "$lib/registry";

const NAV = $derived(siteNav(page.data.categories ?? []));

const ICONS: Record<NavIcon, typeof IconBook> = {
	agents: IconRobot,
	data: IconTable,
	forms: IconForms,
	charts: IconChartBar,
	base: IconComponents,
	text: IconTypography,
	animated: IconSparkles,
	backgrounds: IconBackground,
	blocks: IconLayoutGrid,
	advanced: IconStack2,
	"og-images": IconPhoto,
	emails: IconMail,
	intro: IconBook,
	install: IconTerminal2,
	theming: IconPalette,
	llms: IconFileText,
};

// Menu items become MegaMenu groups; plain links (Pricing) sit beside them.
const GROUPS = $derived<MegaMenuGroup[]>(
	NAV.filter((item) => item.menu).map((item) => ({
		label: item.label,
		href: item.href,
		footer: item.footer,
		items: (item.menu ?? []).map((link) => ({
			href: link.href,
			label: link.label,
			description: link.description,
		})),
	})),
);
const LINKS = $derived(NAV.filter((item) => !item.menu));
const iconFor = $derived(
	new Map(
		NAV.flatMap((item) => item.menu ?? []).map((link) => [link.href, ICONS[link.icon]]),
	),
);

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

			<nav aria-label="Main" class="hidden items-center gap-1 md:flex">
				<MegaMenu groups={GROUPS} active={page.url.pathname}>
					{#snippet itemIcon(item: MegaMenuItem)}
						{@const Icon = iconFor.get(item.href)}
						{#if Icon}<Icon stroke={1.6} aria-hidden="true" />{/if}
					{/snippet}
				</MegaMenu>
				{#each LINKS as link (link.href)}
					{@const current = active(link.match)}
					<a
						href={link.href}
						aria-current={current ? "page" : undefined}
						class={[
							"inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-sm transition-colors motion-reduce:transition-none",
							current ? "text-foreground" : "text-muted-foreground hover:text-foreground",
						]}
					>
						{link.label}
					</a>
				{/each}
			</nav>
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
