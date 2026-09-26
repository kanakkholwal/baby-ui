<script lang="ts">
import {
	Badge,
	Button,
	GibberishText,
	ShowcaseGrid,
	ShowcasePanel,
} from "@baby-ui/svelte";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import { page } from "$app/state";
import { type CatalogItem, loadCatalog } from "$lib/registry";

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

const title = $derived(notFound ? "Page not found" : "Something broke");
const message = $derived(
	notFound
		? "Nothing lives at this address. It may have been renamed, or never existed."
		: (page.error?.message ??
				"This page failed to render. Try again, or head back home."),
);
</script>

<svelte:head>
	<title>{status} · Baby UI</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-5xl flex-col justify-center px-4 py-16 md:px-10">
	<ShowcaseGrid>
		<ShowcasePanel span={notFound ? 7 : 12} class="min-h-64 md:min-h-80">
			<div class="flex w-full flex-col items-start gap-5 self-stretch md:justify-center">
				<Badge variant="outline">Error {status}</Badge>
				<p
					aria-hidden="true"
					class="font-mono font-semibold text-7xl text-foreground tracking-tighter tabular-nums sm:text-8xl"
				>
					<GibberishText text={String(status)} speedMs={40} class="text-inherit" />
				</p>
				<div>
					<h1 class="font-semibold text-2xl text-foreground tracking-tight">{title}</h1>
					<p class="mt-2 max-w-md text-muted-foreground text-sm leading-relaxed">{message}</p>
					{#if notFound}
						<p class="mt-3 truncate font-mono text-muted-foreground text-xs">{path}</p>
					{/if}
				</div>
			</div>
		</ShowcasePanel>

		{#if notFound}
			<ShowcasePanel span={5} class="min-h-64 md:min-h-80">
				<nav aria-label="Suggested components" class="flex w-full flex-col gap-3 self-stretch">
					<p class="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
						Were you looking for
					</p>
					<ul class="flex flex-col gap-1">
						{#each suggestions as spec (spec.slug)}
							<li>
								<a
									href={spec.href}
									class="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 outline-none transition-colors hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring"
								>
									<span class="min-w-0">
										<span class="block font-medium text-foreground text-sm">{spec.name}</span>
										<span class="block truncate text-muted-foreground text-xs">{spec.description}</span>
									</span>
									<IconArrowRight
										size={14}
										stroke={1.6}
										class="shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
									/>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</ShowcasePanel>
		{/if}

		<ShowcasePanel span={12} class="min-h-0 md:min-h-24">
			<div class="flex w-full flex-wrap items-center justify-center gap-3">
				{#if !notFound}
					<Button onclick={() => location.reload()}>
						<IconRefresh stroke={1.7} />
						Try again
					</Button>
				{/if}
				<Button href="/" variant={notFound ? "default" : "outline"}>Back home</Button>
				<Button href="/components" variant="outline">Browse components</Button>
				<Button href="/docs" variant="ghost">Read the docs</Button>
			</div>
		</ShowcasePanel>
	</ShowcaseGrid>
</main>
