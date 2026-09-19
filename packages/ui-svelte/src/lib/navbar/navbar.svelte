<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn.js";

type Link = { href: string; label: string };

type Props = {
	links: Link[];
	active?: string;
	brand?: Snippet;
	actions?: Snippet;
	class?: string;
	sticky?: boolean;
	blur?: boolean;
};

let {
	links,
	active,
	brand,
	actions,
	class: classProp,
	sticky = true,
	blur = true,
}: Props = $props();

let scrolled = $state(false);
let sheetOpen = $state(false);
let list = $state<HTMLDivElement>();
let sheet = $state<HTMLDivElement>();
let pill = $state({ left: 0, width: 0 });

$effect(() => {
	if (!sticky) return;
	const onScroll = () => (scrolled = window.scrollY > 8);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
	return () => window.removeEventListener("scroll", onScroll);
});

function measure() {
	const el = list?.querySelector<HTMLElement>('[aria-current="page"]');
	pill = el ? { left: el.offsetLeft, width: el.offsetWidth } : { left: 0, width: 0 };
}

$effect(() => {
	void active;
	void links;
	measure();
});

$effect(() => {
	if (!list) return;
	const observer = new ResizeObserver(measure);
	observer.observe(list);
	return () => observer.disconnect();
});

// Focus moves into the sheet on open so Escape and Tab behave as the spec says.
$effect(() => {
	if (!sheetOpen) return;
	sheet?.querySelector<HTMLElement>("a")?.focus();
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") sheetOpen = false;
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

<header
	class={cn(
		"inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300",
		sticky && "sticky",
		scrolled
			? blur
				? "border-border border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150"
				: "border-border border-b bg-background"
			: "border-transparent border-b bg-transparent",
		classProp,
	)}
>
	<nav
		aria-label="Main"
		class="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6"
	>
		<div class="flex items-center gap-4">
			{@render brand?.()}

			<div bind:this={list} class="relative hidden items-center gap-0.5 md:flex">
				<span
					aria-hidden="true"
					class="pointer-events-none absolute inset-y-1 left-0 rounded-md bg-foreground/[0.06] transition-[transform,width,opacity] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
					style:transform="translateX({pill.left}px)"
					style:width="{pill.width}px"
					style:opacity={pill.width ? 1 : 0}
				></span>
				{#each links as link (link.href)}
					<a
						href={link.href}
						aria-current={active === link.href ? "page" : undefined}
						class="relative z-10 rounded-md px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground aria-[current=page]:text-foreground"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>

		<div class="flex items-center gap-2">
			{@render actions?.()}
			<button
				type="button"
				aria-label="Open menu"
				aria-expanded={sheetOpen}
				onclick={() => (sheetOpen = true)}
				class="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="M2.5 5h11M2.5 11h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>
	</nav>
</header>

{#if sheetOpen}
	<div class="fixed inset-0 z-50 md:hidden">
		<button
			type="button"
			aria-label="Close menu"
			onclick={() => (sheetOpen = false)}
			class="absolute inset-0 bg-black/40"
		></button>
		<div
			bind:this={sheet}
			role="dialog"
			aria-modal="true"
			aria-label="Menu"
			class="nav-sheet absolute inset-x-0 bottom-0 rounded-t-2xl border-border border-t bg-card p-4"
		>
			<div class="mx-auto mb-3 h-1 w-10 rounded-full bg-border"></div>
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={active === link.href ? "page" : undefined}
					onclick={() => (sheetOpen = false)}
					class="block rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground aria-[current=page]:bg-foreground/[0.06] aria-[current=page]:text-foreground"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
{/if}
