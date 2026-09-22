<script lang="ts">
import type { Framework } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconBrandJavascript from "@tabler/icons-svelte/icons/brand-javascript";
import IconBrandReact from "@tabler/icons-svelte/icons/brand-react";
import IconBrandSvelte from "@tabler/icons-svelte/icons/brand-svelte";
import IconBrandTypescript from "@tabler/icons-svelte/icons/brand-typescript";
import ComponentCard from "$lib/components/component-card.svelte";
import InstallCommand from "$lib/components/install-command.svelte";
import LandingHero from "$lib/components/landing-hero.svelte";
import SegmentControl from "$lib/components/segment-control.svelte";
import SiteFooter from "$lib/components/site-footer.svelte";
import { type Dialect, prefs } from "$lib/preferences.svelte";

const featured = specs.slice(0, 8);

const FRAMEWORKS = [
	{ id: "react", label: "React", icon: IconBrandReact },
	{ id: "svelte", label: "Svelte", icon: IconBrandSvelte },
];
const DIALECTS = [
	{ id: "ts", label: "TS", icon: IconBrandTypescript },
	{ id: "js", label: "JS", icon: IconBrandJavascript },
];

// A few featured slugs, cycled so the terminal shows the CLI installing something new.
const SHOWCASE = featured.slice(0, 5).map((s) => s.slug);
let showcaseIndex = $state(0);
const showcaseSlug = $derived(SHOWCASE[showcaseIndex] ?? featured[0]?.slug ?? "button");

$effect(() => {
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const id = setInterval(() => {
		showcaseIndex = (showcaseIndex + 1) % SHOWCASE.length;
	}, 3500);
	return () => clearInterval(id);
});
</script>

<svelte:head>
	<title>
		Animated, accessible, and customizable components for React and Svelte. · Baby UI
	</title>
	<meta
		name="description"
		content="Copy-paste components for React and Svelte that share one token layer."
	/>
</svelte:head>

<div class="relative">
	<section class="relative isolate overflow-hidden px-4 pt-20 pb-20 md:pt-28">
		<LandingHero count={specs.length} />
	</section>

	<section class="mx-auto max-w-2xl px-4 pb-16">
		<div class="mb-5 flex flex-col items-center gap-3">
			<p class="text-center text-muted-foreground text-sm">
				Installs with the shadcn CLI, in either framework.
			</p>
			<div class="flex flex-wrap items-center justify-center gap-2">
				<SegmentControl
					options={FRAMEWORKS}
					current={prefs.framework}
					onPick={(id) => prefs.set("framework", id as Framework)}
				/>
				<SegmentControl
					options={DIALECTS}
					current={prefs.dialect}
					onPick={(id) => prefs.set("dialect", id as Dialect)}
				/>
			</div>
		</div>
		{#key showcaseSlug}
			<div class="starting:opacity-0 transition-opacity duration-300 motion-reduce:transition-none">
				<InstallCommand slug={showcaseSlug} />
			</div>
		{/key}
		<p class="mt-4 text-center text-muted-foreground text-xs">
			New here? <a
				href="/docs/installation"
				class="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
			>Read the install guide</a> or <a
				href="/docs"
				class="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
			>browse the docs</a>.
		</p>
	</section>

	<section class="mx-auto max-w-7xl px-4 pb-24 md:px-6 xl:px-8">
		<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<p
					class="font-medium text-[0.7rem] text-muted-foreground uppercase tracking-[0.22em]"
				>
					Components
				</p>
				<h2
					class="mt-3 font-heading font-semibold text-3xl leading-tight tracking-tight md:text-4xl"
				>
					Built once, shipped twice.
				</h2>
			</div>
			<a
				href="/components"
				class="group inline-flex items-center self-start font-medium text-muted-foreground text-sm transition-colors hover:text-foreground md:self-auto"
			>
				Browse all components
				<IconArrowRight
					size={14}
					stroke={1.7}
					class="ml-1 transition-[transform,scale,translate] group-hover:translate-x-0.5"
				/>
			</a>
		</div>

		<div class="grid grid-cols-1 gap-4 [grid-auto-rows:19rem] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each featured as spec (spec.slug)}
				<ComponentCard {spec} />
			{/each}
		</div>
	</section>

	<SiteFooter />
</div>
