<script lang="ts">
import { sidebarGroups } from "$lib/registry";

const groups = sidebarGroups();
const total = groups.reduce((n, g) => n + g.items.length, 0);
</script>

<svelte:head><title>baby-ui — multi-framework component registry</title></svelte:head>

<main class="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
	<div class="flex flex-col gap-4">
		<h1 class="font-semibold text-4xl tracking-tight">One spec, two frameworks.</h1>
		<p class="text-lg text-muted-foreground leading-relaxed">
			Every component is a spec first: props, motion behaviour, and keyboard contract. The
			React and Svelte implementations both satisfy it and share one token layer, so the two
			renders match without hand-tuning either.
		</p>
	</div>

	<div class="flex flex-wrap gap-3 text-sm">
		<a
			href="/components"
			class="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-transform duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]"
		>
			Browse {total} components
		</a>
		<a
			href="/docs"
			class="rounded-md border border-border px-4 py-2 transition-colors duration-150 hover:bg-accent"
		>
			Getting started
		</a>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		{#each groups as group (group.category)}
			<section class="rounded-xl border border-border p-4">
				<h2 class="font-medium text-sm">{group.label}</h2>
				<ul class="mt-2 flex flex-col gap-1 text-muted-foreground text-sm">
					{#each group.items as item (item.slug)}
						<li><a href={item.href} class="hover:text-foreground">{item.name}</a></li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</main>
