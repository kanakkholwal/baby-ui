<script lang="ts">
import { page } from "$app/state";

const NAV = [
	{ href: "/components/base/button", label: "Components", match: "/components" },
	{ href: "/docs", label: "Docs", match: "/docs" },
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
					class="grid h-6 w-6 place-items-center rounded-lg bg-primary text-[11px] text-primary-foreground"
					aria-hidden="true">b</span
				>
				<span>baby-ui</span>
			</a>
			<nav class="hidden items-center gap-0.5 md:flex">
				{#each NAV as item (item.href)}
					<a
						href={item.href}
						class={[
							"rounded-md px-1.5 py-1.5 text-sm transition-colors lg:px-3",
							page.url.pathname.startsWith(item.match)
								? "text-foreground"
								: "text-muted-foreground hover:text-foreground",
						]}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<nav class="flex items-center gap-2">
			<a
				href="/llms.txt"
				class="group inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card/20 px-3 py-2 font-medium text-foreground text-xs hover:border-ring"
			>
				llms.txt
			</a>
		</nav>
	</div>
</header>
