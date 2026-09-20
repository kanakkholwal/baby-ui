<script lang="ts">
import { cn } from "../lib/cn";

export type NavLink = { href: string; label: string };

let {
	links,
	open = $bindable(false),
	title = "Menu",
	class: classProp,
}: { links: NavLink[]; open?: boolean; title?: string; class?: string } = $props();

const id = $props.id();
let panel = $state<HTMLDivElement>();

$effect(() => {
	if (!open) return;
	panel?.querySelector<HTMLElement>("a")?.focus();
	const previous = document.body.style.overflow;
	document.body.style.overflow = "hidden";
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") open = false;
	};
	window.addEventListener("keydown", onKey);
	return () => {
		document.body.style.overflow = previous;
		window.removeEventListener("keydown", onKey);
	};
});
</script>

{#if open}
	<div
		bind:this={panel}
		role="dialog"
		aria-modal="true"
		aria-labelledby={id}
		class={cn("fullscreen-nav fixed inset-0 z-50 flex flex-col bg-background", classProp)}
	>
		<div class="flex h-14 items-center justify-between px-4 md:px-6">
			<h2 {id} class="font-semibold text-foreground text-sm">{title}</h2>
			<button
				type="button"
				aria-label="Close"
				onclick={() => (open = false)}
				class="grid size-9 place-items-center rounded-2xl border border-border text-muted-foreground transition-colors hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>

		<nav class="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
			{#each links as link, i (link.href)}
				<a
					href={link.href}
					onclick={() => (open = false)}
					style:animation-delay="{60 + i * 45}ms"
					class="fullscreen-nav-link font-heading font-semibold text-4xl text-foreground tracking-tight transition-colors hover:text-muted-foreground sm:text-5xl"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
{/if}
