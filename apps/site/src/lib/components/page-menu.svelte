<script lang="ts">
import type { Framework } from "@baby-ui/registry-schema";

let {
	frameworks,
	framework = $bindable(),
	dialect = $bindable(),
	markdownUrl,
	copyText,
}: {
	frameworks: Framework[];
	framework: Framework;
	dialect: string;
	markdownUrl: string;
	copyText: string;
} = $props();

let open = $state(false);
let copied = $state(false);
let root = $state<HTMLDivElement>();
let timer: ReturnType<typeof setTimeout>;

$effect(() => {
	if (!open) return;
	const onPointer = (e: PointerEvent) => {
		if (root && !root.contains(e.target as Node)) open = false;
	};
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") open = false;
	};
	window.addEventListener("pointerdown", onPointer);
	window.addEventListener("keydown", onKey);
	return () => {
		window.removeEventListener("pointerdown", onPointer);
		window.removeEventListener("keydown", onKey);
	};
});

async function copyPage() {
	await navigator.clipboard.writeText(copyText);
	copied = true;
	clearTimeout(timer);
	timer = setTimeout(() => (copied = false), 1600);
}

const row =
	"flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground";
</script>

<div bind:this={root} class="relative shrink-0">
	<div class="flex items-center rounded-2xl border border-border bg-card/20">
		<button
			type="button"
			onclick={copyPage}
			class="inline-flex h-9 items-center gap-2 rounded-l-2xl px-3 font-medium text-foreground text-xs transition-colors hover:bg-foreground/[0.06]"
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
				<rect x="5.5" y="5.5" width="8" height="8" rx="1.8" stroke="currentColor" stroke-width="1.3" />
				<path d="M10.5 2.5H3.6A1.6 1.6 0 0 0 2 4.1V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
			</svg>
			{copied ? "Copied" : "Copy Page"}
		</button>
		<button
			type="button"
			aria-label="Page options"
			aria-expanded={open}
			onclick={() => (open = !open)}
			class="grid h-9 w-8 place-items-center rounded-r-2xl border-border border-l text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
		>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden="true"
				class="size-3.5 transition-transform duration-[var(--duration-dropdown)] ease-[var(--ease-out)]"
				style:transform={open ? "rotate(180deg)" : "none"}
			>
				<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>

	{#if open}
		<div
			class="menu absolute top-full right-0 z-50 mt-2 w-60 rounded-2xl border border-border bg-popover p-1.5 shadow-2xl"
		>
			<p class="px-2.5 pt-1.5 pb-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
				Framework
			</p>
			{#each frameworks as f (f)}
				<button type="button" class={row} onclick={() => (framework = f)}>
					<span class="grid size-4 place-items-center">
						{#if framework === f}
							<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5 text-foreground">
								<path d="M3 7.4 5.6 10 11 4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						{/if}
					</span>
					{f === "react" ? "React" : "Svelte"}
				</button>
			{/each}

			<div class="my-1.5 border-border/60 border-t"></div>

			<p class="px-2.5 pt-1.5 pb-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
				Language
			</p>
			{#each [{ id: "ts", label: "TypeScript" }, { id: "js", label: "JavaScript" }] as option (option.id)}
				<button type="button" class={row} onclick={() => (dialect = option.id)}>
					<span class="grid size-4 place-items-center">
						{#if dialect === option.id}
							<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5 text-foreground">
								<path d="M3 7.4 5.6 10 11 4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						{/if}
					</span>
					{option.label}
				</button>
			{/each}

			<div class="my-1.5 border-border/60 border-t"></div>

			<a href={markdownUrl} class={row}>
				<span class="grid size-4 place-items-center">
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
						<path d="M9 1.5H4A1.5 1.5 0 0 0 2.5 3v10A1.5 1.5 0 0 0 4 14.5h8a1.5 1.5 0 0 0 1.5-1.5V6L9 1.5zM9 1.5V6h4.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
					</svg>
				</span>
				View as Markdown
			</a>
		</div>
	{/if}
</div>

<style>
	.menu {
		transform-origin: top right;
		animation: menu-in var(--duration-dropdown) var(--ease-out);
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.menu {
			animation: none;
		}
	}
</style>
