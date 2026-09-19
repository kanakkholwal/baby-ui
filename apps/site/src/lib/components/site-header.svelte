<script lang="ts">
import { page } from "$app/state";
import ThemeToggle from "./theme-toggle.svelte";

const NAV = [
	{ href: "/components/base/button", label: "Components", match: "/components" },
	{ href: "/docs", label: "Docs", match: "/docs" },
	{ href: "/llms.txt", label: "Agents", match: "/llms" },
];

let scrolled = $state(false);

$effect(() => {
	const onScroll = () => (scrolled = window.scrollY > 8);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
	return () => window.removeEventListener("scroll", onScroll);
});
</script>

<header
	class={[
		"fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300",
		scrolled
			? "border-border border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150"
			: "border-transparent border-b bg-transparent",
	]}
>
	<div
		class="relative flex h-14 w-full items-center justify-between gap-4 px-4 md:px-6 xl:px-8"
	>
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
						class={[
							"rounded-md px-1.5 py-1.5 text-sm transition-colors lg:px-3",
							page.url.pathname.startsWith(item.match)
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
			<button
				type="button"
				class="hidden h-9 items-center gap-2 rounded-2xl border border-border bg-card/20 px-3 text-muted-foreground text-xs transition-colors hover:border-border-strong hover:text-foreground sm:flex lg:w-44"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<circle cx="7.2" cy="7.2" r="4.2" stroke="currentColor" stroke-width="1.4" />
					<path d="m10.4 10.4 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
				</svg>
				<span class="hidden lg:inline">Search</span>
				<kbd
					class="ml-auto hidden rounded border border-border px-1 font-mono text-[10px] lg:inline"
				>
					⌘K
				</kbd>
			</button>

			<ThemeToggle />

			<a
				href="https://github.com/kanakkholwal"
				rel="noreferrer noopener"
				target="_blank"
				class="hidden h-9 items-center gap-1.5 rounded-2xl border border-border bg-card/20 px-3 font-medium text-foreground text-xs transition-colors hover:border-border-strong sm:inline-flex"
			>
				<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="size-3.5">
					<path
						d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"
					/>
				</svg>
				GitHub
			</a>

			<a
				href="/components"
				class="rainbow-ring group inline-flex h-9 items-stretch overflow-hidden rounded-2xl p-0.5 font-medium text-xs transition-transform duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]"
			>
				<span
					class="inline-flex flex-1 items-center gap-1.5 rounded-[calc(1rem-2px)] bg-background px-3 text-foreground transition-colors group-hover:bg-card"
				>
					Browse
					<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3">
						<path d="M4 10 10 4M10 4H5M10 4v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</span>
			</a>
		</nav>
	</div>
</header>
