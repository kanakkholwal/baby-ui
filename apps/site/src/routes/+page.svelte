<script lang="ts">
import { specs } from "@baby-ui/registry-schema/components";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import ComponentCard from "$lib/components/component-card.svelte";
import InstallCommand from "$lib/components/install-command.svelte";
import LandingHero from "$lib/components/landing-hero.svelte";
import SiteFooter from "$lib/components/site-footer.svelte";

const featured = specs.slice(0, 8);
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
		<p class="mb-5 text-center text-muted-foreground text-sm">
			One ComponentSpec. Distributed via shadcn and shadcn-svelte.
		</p>
		<InstallCommand slug={featured[0]?.slug ?? "button"} />
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
					class="ml-1 transition-transform group-hover:translate-x-0.5"
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
