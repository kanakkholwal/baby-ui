<script lang="ts">
import { IconArrowRight, IconRefresh } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
import { type CatalogItem, loadCatalog } from "#lib/registry.js";
import { page } from "$app/state";

const status = $derived(page.status);
const notFound = $derived(status === 404);
const path = $derived(page.url.pathname);

// A mistyped slug is the likeliest 404, so rank real components by shared prefix and letters.
let catalog = $state<CatalogItem[]>([]);
$effect(() => {
	if (notFound) void loadCatalog().then((items) => (catalog = items));
});

const suggestions = $derived.by(() => {
	if (!notFound) return [];
	const wanted = path.split("/").filter(Boolean).pop()?.toLowerCase() ?? "";
	if (!wanted) return catalog.slice(0, 4);
	return catalog
		.map((spec) => {
			const shared = [...new Set(wanted)].filter((ch) => spec.slug.includes(ch)).length;
			const prefix = spec.slug.startsWith(wanted.slice(0, 3)) ? 10 : 0;
			return { spec, score: shared + prefix };
		})
		.sort((a, b) => b.score - a.score)
		.slice(0, 4)
		.map((s) => s.spec);
});

const title = $derived(notFound ? "This page isn't here" : "Something broke");
const subtitle = $derived(notFound ? "One block never landed." : "We're on it.");
const message = $derived(
	notFound
		? "It may have been renamed, or never existed."
		: (page.error?.message ??
				"This page failed to render. Try again, or head back home."),
);
</script>

<svelte:head>
	<title>{status} · Baby UI</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- Quiet and centred like the home hero, with the figure explaining what went missing. -->
<main class="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-3xl flex-col items-center justify-center px-4 py-8 text-center">
	<!-- The figure's box is reserved, so the copy never shifts when it loads. -->
	<div class="pointer-events-none -mb-4 aspect-[620/440] w-full max-w-72">
		{#await import("#lib/components/missing-figure.svelte") then { default: MissingFigure }}
			<MissingFigure />
		{/await}
	</div>

	<span class="rounded-full border border-border px-2.5 py-0.5 font-mono text-muted-foreground text-xs tabular-nums">
		Error {status}
	</span>
	<h1 class="m-0 mt-4 text-balance font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl">
		{title}
		<span class="block text-muted-foreground">{subtitle}</span>
	</h1>
	<p class="mt-3 max-w-md text-pretty text-muted-foreground">{message}</p>
	{#if notFound}
		<p class="mt-2 max-w-full truncate font-mono text-muted-foreground text-xs">{path}</p>
	{/if}

	<div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
		{#if !notFound}
			<Button size="lg" variant="dark" class="rounded-full px-5" onclick={() => location.reload()}>
				<IconRefresh />
				Try again
			</Button>
		{/if}
		<Button href="/" size="lg" variant={notFound ? "dark" : "secondary"} class="rounded-full px-5">
			Back home
		</Button>
		<Button href="/components" size="lg" variant="secondary" class="group rounded-full px-5">
			Browse components
			<IconArrowRight
				aria-hidden="true"
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</Button>
	</div>

	<!-- The catalog loads after the page, so the row folds open instead of popping in. -->
	<div
		data-open={suggestions.length > 0}
		class="grid w-full grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-(--duration-collapse) ease-(--ease-ui-out) data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100 motion-reduce:transition-none"
	>
		<nav aria-label="Suggested components" class="min-h-0 overflow-hidden">
			<div class="flex flex-wrap items-center justify-center gap-2 pt-6">
				<span class="text-muted-foreground text-xs">Were you looking for</span>
				{#each suggestions as spec (spec.slug)}
					<a
						href={spec.href}
						class="rounded-full border border-border px-3 py-1 text-foreground text-xs outline-none transition-colors hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring"
					>
						{spec.name}
					</a>
				{/each}
			</div>
		</nav>
	</div>
</main>
