<script lang="ts">
import IconAccessible from "@tabler/icons-svelte/icons/accessible";
import IconBrandReact from "@tabler/icons-svelte/icons/brand-react";
import IconColorSwatch from "@tabler/icons-svelte/icons/color-swatch";
import IconWaveSine from "@tabler/icons-svelte/icons/wave-sine";
import ShowcaseDots from "./showcase-dots.svelte";

const FEATURES = [
	{
		icon: IconBrandReact,
		title: "React and Svelte",
		body: "Every component ships in both, with the same props and the same markup.",
	},
	{
		icon: IconColorSwatch,
		title: "One token layer",
		body: "Colour, radius and motion come from shadcn-compatible CSS variables.",
	},
	{
		icon: IconAccessible,
		title: "Accessible primitives",
		body: "Built on Base UI and bits-ui, so focus, keyboard and ARIA come for free.",
	},
	{
		icon: IconWaveSine,
		title: "Motion that listens",
		body: "CSS-only animation that honours reduced motion, no runtime to install.",
	},
];
</script>

<section aria-labelledby="home-features-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<h2
		id="home-features-heading"
		class="font-normal text-[clamp(1.1rem,3.4vw,1.85rem)] text-foreground tracking-[-0.05em]"
	>
		Built once, shipped twice.
	</h2>
	<div class="relative mt-8 border-border border-t border-l">
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_oklch,var(--muted-foreground)_28%,transparent)_1px,transparent_1px)] bg-size-[14px_14px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
		></div>
		<div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			{#each FEATURES as feature, i (feature.title)}
				{@const Icon = feature.icon}
				<div
					class="group/feature flex min-h-52 flex-col gap-3 border-border border-r border-b p-6 transition-colors duration-200 hover:bg-foreground/[0.02] motion-reduce:transition-none"
				>
					<div class="mb-4 flex items-center justify-between">
						<span
							class="grid size-10 place-items-center rounded-xl border border-border bg-background text-foreground shadow-xs transition-transform duration-200 group-hover/feature:-translate-y-0.5 motion-reduce:transition-none"
						>
							<Icon size={20} stroke={1.6} />
						</span>
						<span class="font-mono text-[11px] text-muted-foreground tabular-nums">0{i + 1}</span>
					</div>
					<h3 class="font-medium text-base text-foreground">{feature.title}</h3>
					<p class="text-foreground/70 text-sm leading-relaxed">{feature.body}</p>
				</div>
			{/each}
		</div>
		<ShowcaseDots weights={[1, 1, 1, 1]} class="hidden lg:block" />
	</div>
</section>
