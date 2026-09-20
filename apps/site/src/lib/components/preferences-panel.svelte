<script lang="ts">
import type { Framework } from "@baby-ui/registry-schema";
import { ACCENTS, type Appearance, type Dialect, prefs } from "$lib/preferences.svelte";

const APPEARANCE: { id: Appearance; label: string; path: string }[] = [
	{
		id: "light",
		label: "Light",
		path: "M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1m11-5-1.1 1.1M5.1 10.9 4 12m8 0-1.1-1.1M5.1 5.1 4 4",
	},
	{
		id: "dark",
		label: "Dark",
		path: "M13.5 9.4A5.8 5.8 0 0 1 6.6 2.5 5.8 5.8 0 1 0 13.5 9.4Z",
	},
	{
		id: "system",
		label: "System",
		path: "M2.5 3.5h11v7h-11zM5.5 13.5h5M8 10.5v3",
	},
];

const FRAMEWORKS: { id: Framework; label: string; path: string }[] = [
	{
		id: "react",
		label: "React",
		path: "M8 9.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z",
	},
	{ id: "svelte", label: "Svelte", path: "M10.5 3.2 5.9 6a3 3 0 0 0 3.2 5l1.4-.9" },
];

const DIALECTS: { id: Dialect; label: string; path: string }[] = [
	{
		id: "ts",
		label: "TypeScript",
		path: "M4 6.5h4M6 6.5V11m3-1.2c.4.9 3 1.3 3-.3 0-1.4-2.6-1-2.6-2.3 0-1.2 2-1.2 2.5-.4",
	},
	{
		id: "js",
		label: "JavaScript",
		path: "M7 6.5v3.2c0 1-1.3 1.2-1.8.4m3.3-.3c.4.9 3 1.3 3-.3 0-1.4-2.6-1-2.6-2.3 0-1.2 2-1.2 2.5-.4",
	},
];

const row =
	"flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-colors";

function close() {
	prefs.open = false;
}

$effect(() => {
	if (!prefs.open) return;
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") close();
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

{#snippet option(label: string, path: string, active: boolean, onclick: () => void)}
	<button
		type="button"
		{onclick}
		aria-pressed={active}
		class="{row} {active
			? 'border-border-strong bg-card text-foreground'
			: 'border-border text-foreground hover:bg-card'}"
	>
		<span class="flex items-center gap-2.5">
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4 text-muted-foreground">
				{#if label === "React"}
					<ellipse cx="8" cy="8" rx="6.6" ry="2.6" stroke="currentColor" stroke-width="1.1" />
					<ellipse cx="8" cy="8" rx="6.6" ry="2.6" stroke="currentColor" stroke-width="1.1" transform="rotate(60 8 8)" />
					<ellipse cx="8" cy="8" rx="6.6" ry="2.6" stroke="currentColor" stroke-width="1.1" transform="rotate(120 8 8)" />
				{:else if label === "Svelte"}
					<path d={path} stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
					<path d="M5.5 12.8 10.1 10a3 3 0 0 0-3.2-5l-1.4.9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
				{:else}
					<path d={path} stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
					{#if label === "Light"}<circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.3" />{/if}
					{#if label === "TypeScript" || label === "JavaScript"}
						<rect x="1.8" y="1.8" width="12.4" height="12.4" rx="2.4" stroke="currentColor" stroke-width="1.1" />
					{/if}
				{/if}
			</svg>
			{label}
		</span>
		{#if active}
			<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-4 text-foreground">
				<path d="M3 7.4 5.6 10 11 4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		{/if}
	</button>
{/snippet}

{#if prefs.open}
	<div class="fixed inset-0 z-50">
		<button
			type="button"
			aria-label="Close settings"
			onclick={close}
			class="absolute inset-0 bg-black/40"
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-label="Settings"
			class="drawer absolute inset-y-0 right-0 flex w-[min(22rem,100vw)] flex-col gap-7 overflow-y-auto border-border border-l bg-background p-6"
		>
			<div class="flex items-center justify-between">
				<h2 class="font-semibold text-foreground text-sm">Settings</h2>
				<button
					type="button"
					onclick={close}
					aria-label="Close"
					class="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
						<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				</button>
			</div>

			<section>
				<p class="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
					Appearance
				</p>
				<div class="mt-3 flex flex-col gap-2">
					{#each APPEARANCE as item (item.id)}
						{@render option(item.label, item.path, prefs.appearance === item.id, () =>
							prefs.set("appearance", item.id),
						)}
					{/each}
				</div>
			</section>

			<section>
				<p class="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
					Accent
				</p>
				<div class="mt-3 flex flex-wrap items-center gap-2.5">
					{#each ACCENTS as swatch (swatch.id)}
						<button
							type="button"
							onclick={() => prefs.set("accent", swatch.id)}
							aria-pressed={prefs.accent === swatch.id}
							aria-label={swatch.name}
							title={swatch.name}
							style:background={swatch.accent}
							class="grid size-6 place-items-center rounded-full ring-offset-2 ring-offset-background transition-shadow aria-pressed:ring-2 aria-pressed:ring-foreground/40"
						>
							{#if prefs.accent === swatch.id}
								<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3 text-black/70">
									<path d="M3 7.4 5.6 10 11 4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							{/if}
						</button>
					{/each}
				</div>
				<p class="mt-2.5 text-muted-foreground text-xs">
					Writes <code class="font-mono">--accent</code> on the document, so every component
					picks it up.
				</p>
			</section>

			<section>
				<p class="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
					Framework
				</p>
				<div class="mt-3 flex flex-col gap-2">
					{#each FRAMEWORKS as item (item.id)}
						{@render option(item.label, item.path, prefs.framework === item.id, () =>
							prefs.set("framework", item.id),
						)}
					{/each}
				</div>
			</section>

			<section>
				<p class="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
					Language
				</p>
				<div class="mt-3 flex flex-col gap-2">
					{#each DIALECTS as item (item.id)}
						{@render option(item.label, item.path, prefs.dialect === item.id, () =>
							prefs.set("dialect", item.id),
						)}
					{/each}
				</div>
				<p class="mt-2.5 text-muted-foreground text-xs">
					Applies to every code block and install command on the site.
				</p>
			</section>
		</div>
	</div>
{/if}

<style>
	.drawer {
		animation: drawer-in var(--duration-drawer) var(--ease-drawer);
	}

	@keyframes drawer-in {
		from {
			transform: translateX(100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.drawer {
			animation: none;
		}
	}
</style>
