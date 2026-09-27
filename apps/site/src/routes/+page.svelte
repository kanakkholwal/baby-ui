<script lang="ts">
import HomeCta from "$lib/components/home-cta.svelte";
import HomeShowcase from "$lib/components/home-showcase.svelte";
import InstallCommand from "$lib/components/install-command.svelte";
import LandingHero from "$lib/components/landing-hero.svelte";
import Seo from "$lib/components/seo.svelte";
import SiteFooter from "$lib/components/site-footer.svelte";
import { componentCountLabel } from "$lib/registry";
import {
	DEFAULT_KEYWORDS,
	organizationLd,
	softwareApplicationLd,
	websiteLd,
} from "$lib/seo";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
const total = $derived(data.total ?? 0);

const DESCRIPTION = $derived(
	`Animated, accessible React and Svelte components on one token layer. Install any of ${componentCountLabel(total)} components with the shadcn CLI, in TypeScript or JavaScript.`,
);
</script>

<Seo
	title="Baby UI: Animated React & Svelte Components"
	description={DESCRIPTION}
	tag="{componentCountLabel(total)} components"
	jsonLd={[
		organizationLd(),
		websiteLd(DESCRIPTION),
		softwareApplicationLd({
			description: DESCRIPTION,
			keywords: DEFAULT_KEYWORDS,
			componentCount: total,
		}),
	]}
/>

<main class="relative">
	<LandingHero />

	<HomeShowcase items={data.grid} />

	<section aria-labelledby="home-install-heading" class="mx-auto max-w-2xl px-4 pb-24">
		<h2 id="home-install-heading" class="mb-4 text-center text-muted-foreground text-sm">
			One command per component. It lands in your project as source.
		</h2>
		<InstallCommand slug="line-chart" />
		<p class="mt-4 text-center text-muted-foreground text-xs">
			New here? <a
				href="/docs/installation"
				class="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
			>Read the install guide</a>.
		</p>
	</section>

	<HomeCta count={total} />

	<SiteFooter />
</main>
