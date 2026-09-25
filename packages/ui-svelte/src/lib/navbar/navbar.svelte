<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { type NavbarVariant, navbar } from "./variants";

type Link = { href: string; label: string };

type Props = {
	links: Link[];
	active?: string;
	brand?: Snippet;
	actions?: Snippet;
	class?: string;
	sticky?: boolean;
	blur?: boolean;
	variant?: NavbarVariant;
};

let {
	links,
	active,
	brand,
	actions,
	class: classProp,
	sticky = true,
	blur = true,
	variant = "solid",
}: Props = $props();

let scrolled = $state(false);
let sheetOpen = $state(false);
let list = $state<HTMLDivElement>();
let sheet = $state<HTMLDivElement>();
// Kept mounted after the first open so the sheet can slide out as well as in.
let sheetMounted = $state(false);
let pill = $state({ left: 0, width: 0 });
const styles = $derived(
	navbar({
		variant,
		sticky,
		surface: scrolled ? (blur ? "blurred" : "opaque") : "clear",
	}),
);

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
	sheetMounted = true;
	sheet?.querySelector<HTMLElement>("a")?.focus();
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") sheetOpen = false;
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

<header data-slot="navbar" data-variant={variant} class={cn(styles.header(), classProp)}>
	<nav aria-label="Main" class={styles.nav()}>
		<div class="flex items-center gap-4">
			{@render brand?.()}

			<div bind:this={list} class={styles.links()}>
				<span
					aria-hidden="true"
					class={styles.pill()}
					style:transform="translateX({pill.left}px)"
					style:width="{pill.width}px"
					style:opacity={pill.width ? 1 : 0}
				></span>
				{#each links as link (link.href)}
					<a
						href={link.href}
						aria-current={active === link.href ? "page" : undefined}
						class={styles.link()}
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
				class={styles.menuButton()}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="M2.5 5h11M2.5 11h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>
	</nav>
</header>

{#if sheetMounted}
	<div
		class={styles.layer()}
		data-state={sheetOpen ? "open" : "closed"}
		inert={!sheetOpen}
	>
		<button
			type="button"
			aria-label="Close menu"
			data-state={sheetOpen ? "open" : "closed"}
			onclick={() => (sheetOpen = false)}
			class={styles.veil()}
		></button>
		<div
			bind:this={sheet}
			role="dialog"
			aria-modal="true"
			aria-label="Menu"
			data-state={sheetOpen ? "open" : "closed"}
			class={styles.sheet()}
		>
			<div class="mx-auto mb-3 h-1 w-10 rounded-full bg-border"></div>
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={active === link.href ? "page" : undefined}
					onclick={() => (sheetOpen = false)}
					class={styles.sheetLink()}
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
{/if}
