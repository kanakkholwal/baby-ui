<script lang="ts">
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconSettings from "@tabler/icons-svelte/icons/settings";
import { page } from "$app/state";
import SiteSearch from "$lib/components/site-search.svelte";
import { prefs } from "$lib/preferences.svelte";
import { navCategories } from "$lib/registry";

const NAV = [
	{ href: "/components", label: "Components", match: "/components" },
	...navCategories().filter((c) => c.label === "Agents"),
	{ href: "/docs", label: "Docs", match: "/docs" },
];

let scrolled = $state(false);

$effect(() => {
	const onScroll = () => (scrolled = window.scrollY > 8);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
	return () => window.removeEventListener("scroll", onScroll);
});

function active(match: string) {
	if (match === "/components") return page.url.pathname === "/components";
	return page.url.pathname.startsWith(match);
}
</script>

<header
	class={[
		"fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300",
		scrolled
			? "border-border border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150"
			: "border-transparent border-b bg-transparent",
	]}
>
	<div class="relative flex h-14 w-full items-center justify-between gap-4 px-4 md:px-6 xl:px-8">
		<div class="flex items-center gap-4">
			<a
				href="/"
				class="group flex items-center gap-2.5 font-semibold text-foreground text-sm tracking-tight"
			>
				<span
					class="grid size-6 place-items-center rounded-lg bg-foreground text-background"
					aria-hidden="true"
				>
					<span class="size-2.5 rounded-full border-2 border-current"></span>
				</span>
				<span>baby-ui</span>
			</a>

			<nav class="hidden items-center gap-0.5 md:flex">
				{#each NAV as item (item.href)}
					<a
						href={item.href}
						aria-current={active(item.match) ? "page" : undefined}
						class={[
							"rounded-md px-1.5 py-1.5 text-sm transition-colors lg:px-3",
							active(item.match)
								? "font-medium text-foreground"
								: "text-muted-foreground hover:text-foreground",
						]}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<nav class="flex items-center gap-2">
			<SiteSearch />

			<button
				type="button"
				onclick={() => (prefs.open = true)}
				aria-label="Settings"
				class="gear hidden size-9 items-center justify-center rounded-2xl border border-border bg-card/20 text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground sm:flex"
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

			<a
				href="/components"
				class="rainbow-ring group inline-flex h-9 items-stretch overflow-hidden rounded-2xl p-0.5 font-medium text-xs transition-[transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]"
			>
				<span
					class="inline-flex flex-1 items-center gap-1 rounded-[calc(1rem-2px)] bg-background px-3 text-foreground transition-colors group-hover:bg-card"
				>
					Browse
					<IconArrowUpRight size={14} stroke={1.8} />
				</span>
			</a>
		</nav>
	</div>
</header>

<style>
	.gear :global(svg) {
		transition: transform 420ms var(--ease-out);
	}

	.gear:hover :global(svg) {
		transform: rotate(90deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.gear :global(svg) {
			transition: none;
		}
	}
</style>
