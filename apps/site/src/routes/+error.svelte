<script lang="ts">
import { page } from "$app/state";
import { specs } from "@baby-ui/registry-schema/components";

const status = $derived(page.status);
const notFound = $derived(status === 404);

// A wrong slug is the likeliest 404 here, so offer the nearest real components.
const suggestions = $derived.by(() => {
	if (!notFound) return [];
	const wanted = page.url.pathname.split("/").filter(Boolean).pop() ?? "";
	const scored = specs
		.map((spec) => {
			const a = spec.slug;
			const shared = [...wanted].filter((ch) => a.includes(ch)).length;
			return { spec, score: a.startsWith(wanted.slice(0, 3)) ? shared + 10 : shared };
		})
		.sort((x, y) => y.score - x.score);
	return scored.slice(0, 4).map((s) => s.spec);
});

const message = $derived(
	notFound
		? "That page does not exist. It may have been renamed, or the component may not be ported yet."
		: (page.error?.message ?? "Something went wrong while rendering this page."),
);
</script>

<svelte:head><title>{status}· Baby UI</title></svelte:head>

<main class="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-20">
	<p
		class="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em]"
		aria-hidden="true"
	>
		Error {status}
	</p>

	<h1 class="mt-4 font-heading font-semibold text-5xl tracking-tight sm:text-6xl">
		{notFound ? "Not found" : "Something broke"}
	</h1>

	<p class="mt-4 max-w-md text-muted-foreground leading-relaxed">{message}</p>

	{#if notFound && suggestions.length}
		<section class="mt-10">
			<p class="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
				Were you looking for
			</p>
			<ul class="mt-3 flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border">
				{#each suggestions as spec (spec.slug)}
					<li>
						<a
							href="/components/{spec.category}/{spec.slug}"
							class="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-foreground/[0.03]"
						>
							<span class="min-w-0">
								<span class="block font-medium text-foreground text-sm">{spec.name}</span>
								<span class="mt-0.5 block truncate text-muted-foreground text-xs">
									{spec.description}
								</span>
							</span>
							<span class="shrink-0 font-mono text-[10px] text-muted-foreground uppercase">
								{spec.category}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<div class="mt-10 flex flex-wrap gap-3 text-sm">
		<a
			href="/"
			class="inline-flex min-h-10 items-center rounded-full bg-primary px-4 font-medium text-primary-foreground transition-[transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]"
		>
			Back home
		</a>
		<a
			href="/components"
			class="inline-flex min-h-10 items-center rounded-full border border-border px-4 font-medium transition-colors hover:bg-card"
		>
			Browse components
		</a>
	</div>
</main>
