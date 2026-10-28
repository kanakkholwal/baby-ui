<script lang="ts">
import { IconBookmark, IconSearch, IconTerminal2 } from "@baby-ui/icons";
import {
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	Input,
} from "@baby-ui/svelte";
import { SvelteSet } from "svelte/reactivity";
import { bookmarks } from "#lib/bookmarks.svelte.js";
import CardGallery from "#lib/components/card-gallery.svelte";
import PmCommand from "#lib/components/pm-command.svelte";
import Seo from "#lib/components/seo.svelte";
import { installArgs } from "#lib/install.js";
import { CATEGORY_LABEL } from "#lib/registry.js";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const bySlug = $derived(new Map(data.items.map((item) => [item.slug, item])));
const saved = $derived(
	bookmarks.slugs.map((slug) => bySlug.get(slug)).filter((item) => item !== undefined),
);
// Bookmarks of components this build no longer has: kept until the visitor clears them.
const missing = $derived(bookmarks.slugs.filter((slug) => !bySlug.has(slug)));

let query = $state("");
// Every typed word must appear in the title or description, case aside.
const shown = $derived.by(() => {
	const words = query.toLowerCase().split(/s+/).filter(Boolean);
	if (!words.length) return saved;
	return saved.filter((item) => {
		const text = `${item.name} ${item.description}`.toLowerCase();
		return words.every((word) => text.includes(word));
	});
});
const groups = $derived.by(() => {
	const map = new Map<string, typeof shown>();
	for (const item of shown)
		map.set(item.category, [...(map.get(item.category) ?? []), item]);
	return [...map].map(([category, items]) => ({
		category,
		label: CATEGORY_LABEL[items[0]?.category ?? "base"],
		items,
	}));
});

// Picking is optional: with nothing picked, the bar installs every free bookmark.
const picked = new SvelteSet<string>();
const selection = {
	has: (slug: string) => picked.has(slug),
	toggle: (slug: string) => (picked.has(slug) ? picked.delete(slug) : picked.add(slug)),
};
const free = $derived(saved.filter((item) => item.tier !== "pro"));
const chosen = $derived(
	picked.size ? free.filter((item) => picked.has(item.slug)) : free,
);
const proPicked = $derived(
	saved.filter((item) => item.tier === "pro" && picked.has(item.slug)),
);

function pickGroup(items: typeof shown) {
	const all = items.every((item) => picked.has(item.slug));
	for (const item of items) {
		if (all) picked.delete(item.slug);
		else picked.add(item.slug);
	}
}

let installOpen = $state(false);
let panel = $state<HTMLElement>();

// Opening hands focus to Copy, so Enter copies straight away.
function openInstall() {
	installOpen = true;
	// After the frame has widened and the panel has unfolded.
	setTimeout(
		() =>
			panel
				?.querySelector<HTMLElement>("[data-slot=copy-button], button[aria-label*='opy']")
				?.focus(),
		320,
	);
}
function closeInstall() {
	installOpen = false;
}

// The list is in this browser's storage, so the prerendered page waits for it before choosing a view.
let ready = $state(false);
$effect(() => {
	ready = true;
});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === "Escape" && installOpen) closeInstall();
	}}
/>

<Seo title="Bookmarks" description="Components you saved in this browser." noindex />

<!-- A full-height column, so the install island can rest at the bottom of the workspace. -->
<main class="flex min-h-[calc(100dvh-var(--header-h)-0.5rem)] w-full min-w-0 flex-col py-6 xl:col-span-2">
	<header class="flex flex-wrap items-end justify-between gap-4 pt-6 pb-6">
		<div class="flex flex-col gap-1.5">
			<h1 class="m-0 font-display font-medium text-3xl text-foreground tracking-tight">Bookmarks</h1>
			<p class="m-0 text-muted-foreground text-sm">
				Saved in this browser, no account needed. Pick cards to install a few, or all at once.
			</p>
		</div>
		{#if ready && saved.length > 6}
			<div class="relative w-full max-w-64">
				<IconSearch size={14} aria-hidden="true" class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
				<Input size="sm" bind:value={query} placeholder="Filter bookmarks" aria-label="Filter bookmarks" class="pl-8" />
			</div>
		{/if}
	</header>

	{#if ready}
		{#if missing.length}
			<div
				role="status"
				class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
			>
				<span class="text-muted-foreground">
					{missing.length === 1 ? "1 saved component is" : `${missing.length} saved components are`}
					no longer on the site.
				</span>
				<Button variant="secondary" size="sm" onclick={() => bookmarks.keepOnly(new Set(bySlug.keys()))}>
					Remove {missing.length === 1 ? "it" : "them"}
				</Button>
			</div>
		{/if}

		{#if saved.length}
			<div class="flex flex-col gap-10">
				{#each groups as group (group.category)}
					{@const all = group.items.every((item) => picked.has(item.slug))}
					<section aria-labelledby="group-{group.category}" class="flex flex-col gap-3">
						<div class="flex items-center justify-between gap-3">
							<h2 id="group-{group.category}" class="m-0 flex items-baseline gap-2 font-medium text-base text-foreground tracking-tight">
								{group.label}
								<span class="text-muted-foreground text-xs tabular-nums">{group.items.length}</span>
							</h2>
							<Button variant="ghost" size="sm" onclick={() => pickGroup(group.items)}>
								{all ? "Unselect" : "Select all"}
							</Button>
						</div>
						<CardGallery items={group.items} mode="grid" {selection} />
					</section>
				{:else}
					<p class="m-0 text-muted-foreground text-sm">No bookmark matches "{query}".</p>
				{/each}
			</div>

			<!-- A floating island with one action. Install widens it first, then unfolds the command above. -->
			<div class="pointer-events-none sticky bottom-6 z-40 mt-auto flex justify-center pt-10">
				<div
					data-open={installOpen || undefined}
					role="region"
					aria-label="Install bookmarks"
					class={[
						"pointer-events-auto w-[min(19rem,100%)] rounded-[1.75rem] border border-border bg-card p-1 shadow-(--overlay-shadow)",
						"transition-[width,border-radius] delay-(--duration-dropdown) duration-(--duration-dropdown) ease-(--ease-ui-out)",
						"data-[open]:w-[min(44rem,100%)] data-[open]:rounded-2xl data-[open]:delay-0 motion-reduce:transition-none",
					]}
				>
					<div
						class={[
							"grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] delay-0 duration-(--duration-dropdown) ease-(--ease-ui-out)",
							"[[data-open]>&]:grid-rows-[1fr] [[data-open]>&]:opacity-100 [[data-open]>&]:delay-(--duration-dropdown) motion-reduce:transition-none",
						]}
					>
						<div bind:this={panel} class="min-h-0 overflow-hidden" inert={!installOpen}>
							<div class="mb-1 flex flex-col gap-2">
								<PmCommand kind="dlx" args={installArgs(chosen.map((item) => item.slug))} highlight={chosen.map((item) => item.slug).join(" ")} />
								<div class="flex min-h-8 items-center justify-between gap-3 px-2 text-muted-foreground text-xs">
									<span>
										{#if proPicked.length}
											{proPicked.length} Pro {proPicked.length === 1 ? "pick installs" : "picks install"} from
											<a href="/account/downloads" class="text-foreground underline decoration-foreground/30 underline-offset-2 hover:decoration-foreground">Downloads</a>.
										{:else}
											Run it in a project with components.json.
										{/if}
									</span>
									<Button variant="ghost" size="sm" class="rounded-full" disabled={!picked.size} onclick={() => picked.clear()}>
										Clear picks
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-3 ps-4">
						<span class="min-w-0 truncate text-muted-foreground text-sm tabular-nums">
							<span class="font-medium text-foreground">{picked.size ? chosen.length : free.length}</span>
							{picked.size ? "selected" : free.length === 1 ? "bookmark" : "bookmarks"}
						</span>
						<Button
							size="sm"
							variant={installOpen ? "ghost" : "dark"}
							class="rounded-full"
							aria-expanded={installOpen}
							disabled={!installOpen && chosen.length === 0}
							onclick={() => (installOpen ? closeInstall() : openInstall())}
						>
							{#if !installOpen}<IconTerminal2 aria-hidden="true" />{/if}
							{installOpen ? "Close" : picked.size ? "Install selected" : "Install all"}
						</Button>
					</div>
				</div>
			</div>
		{:else}
			<Empty class="rounded-2xl border border-border border-dashed py-16">
				<EmptyHeader>
					<EmptyMedia variant="icon"><IconBookmark aria-hidden="true" /></EmptyMedia>
					<EmptyTitle>Nothing saved yet</EmptyTitle>
					<EmptyDescription>
						Use the bookmark on any component card or page to keep it here.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button href="/components" size="sm">Browse components</Button>
				</EmptyContent>
			</Empty>
		{/if}
	{/if}
</main>
