<script lang="ts">
import { Pricing01 } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { PRICING_PERIODS, PRICING_PLANS_01 } from "../data/pricing";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Pricing01>>(props));

let period = $state("monthly");
let chosen = $state<string | null>(null);
</script>

<div class="flex w-full flex-col gap-2">
	<Pricing01
		plans={PRICING_PLANS_01}
		periods={PRICING_PERIODS}
		bind:period
		onSelect={(id, p) => (chosen = `${id}, ${p}`)}
		eyebrow="Pricing"
		title="A plan for every stage."
		description="Start for free, then move up when your work needs more room. Every plan includes the essentials to ship something great."
		variant={p.variant ?? "default"}
	/>
	<p aria-live="polite" class="text-center text-muted-foreground text-xs">
		{chosen ? `Chose ${chosen}` : ""}
	</p>
</div>
