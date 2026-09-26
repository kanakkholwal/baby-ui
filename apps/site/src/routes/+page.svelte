<script lang="ts">
import type { Framework } from "@baby-ui/registry-schema";
import IconBrandJavascript from "@tabler/icons-svelte/icons/brand-javascript";
import IconBrandReact from "@tabler/icons-svelte/icons/brand-react";
import IconBrandSvelte from "@tabler/icons-svelte/icons/brand-svelte";
import IconBrandTypescript from "@tabler/icons-svelte/icons/brand-typescript";
import HomeCta from "$lib/components/home-cta.svelte";
import HomeFeatures from "$lib/components/home-features.svelte";
import HomeShowcase from "$lib/components/home-showcase.svelte";
import InstallCommand from "$lib/components/install-command.svelte";
import LandingHero from "$lib/components/landing-hero.svelte";
import SegmentControl from "$lib/components/segment-control.svelte";
import Seo from "$lib/components/seo.svelte";
import SiteFooter from "$lib/components/site-footer.svelte";
import { type Dialect, prefs } from "$lib/preferences.svelte";
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

const FRAMEWORKS = [
	{ id: "react", label: "React", icon: IconBrandReact },
	{ id: "svelte", label: "Svelte", icon: IconBrandSvelte },
];
const DIALECTS = [
	{ id: "ts", label: "TS", icon: IconBrandTypescript },
	{ id: "js", label: "JS", icon: IconBrandJavascript },
];

// A few featured slugs, cycled so the terminal shows the CLI installing something new.
const SHOWCASE = $derived(data.showcase.slice(0, 5).map((s) => s.slug));
let showcaseIndex = $state(0);
const showcaseSlug = $derived(SHOWCASE[showcaseIndex] ?? "button");

$effect(() => {
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const id = setInterval(() => {
		showcaseIndex = (showcaseIndex + 1) % SHOWCASE.length;
	}, 2400);
	return () => clearInterval(id);
});
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

<div class="relative">
	<section class="relative isolate overflow-x-clip px-4 pt-20 pb-20 md:pt-28 lg:pb-32">
		<LandingHero count={total} />
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
		<InstallCommand slug={showcaseSlug} cascade />
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

	<HomeShowcase items={data.showcase} />
	<HomeFeatures />
	<HomeCta count={total} />

	<SiteFooter />
</div>
